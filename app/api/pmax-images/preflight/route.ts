import { NextRequest, NextResponse } from "next/server";

import { analyzeCI } from "@/lib/pmax-images/agent-ci";
import { scrapeVisual } from "@/lib/pmax-images/scrape-visual";

// Pre-Flight-Check: prüft OB die URL rendert UND ob die CI-Analyse ein
// verwertbares Ergebnis liefert — BEVOR der Kunde zahlt. Ein einziger
// Claude-Call (CI-Analyst) + ein Microlink-Scrape. Kosten: ~0.5 Cent.
//
// Wird im UI vor "Paket generieren" ausgeführt. Später (Phase 3) auch als
// Gatekeeper VOR Stripe-Checkout: scheitert der Preflight, bieten wir dem
// Kunden einen manuellen Auftrag via E-Mail an statt ihn zahlen zu lassen
// und dann ein kaputtes Paket zu liefern.

export const runtime = "nodejs";
export const maxDuration = 120;

interface PreflightResult {
  ok: boolean;
  reason?: string;
  fallback?: "manual" | "retry";
  brand?: {
    brandName: string;
    primaryColors: string[];
    visualStyle: string;
    logoDetected: boolean;
  };
  screenshotUrl?: string;
}

export async function POST(request: NextRequest) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return NextResponse.json<PreflightResult>(
      { ok: false, reason: "ANTHROPIC_API_KEY nicht konfiguriert.", fallback: "manual" },
      { status: 500 }
    );
  }

  let body: { url: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<PreflightResult>(
      { ok: false, reason: "Ungültige Anfrage.", fallback: "retry" },
      { status: 400 }
    );
  }

  if (!body.url || typeof body.url !== "string") {
    return NextResponse.json<PreflightResult>(
      { ok: false, reason: "URL fehlt.", fallback: "retry" },
      { status: 400 }
    );
  }

  try {
    const parsed = new URL(body.url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Nur http/https erlaubt");
    }
  } catch {
    return NextResponse.json<PreflightResult>(
      { ok: false, reason: "Ungültige URL. Bitte mit https:// beginnen.", fallback: "retry" },
      { status: 400 }
    );
  }

  // 1) Scrape — Microlink rendert Seite, liefert Screenshot + Meta + Palette.
  // scrapeVisual() hat eingebaute Retries (5×) mit force=true ab Retry 1,
  // adblock + domcontentloaded. Wenn das hier scheitert, ist die Seite
  // wirklich nicht renderbar (Bot-Schutz, Cloudflare, etc).
  let visual;
  try {
    visual = await scrapeVisual(body.url);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json<PreflightResult>({
      ok: false,
      reason: msg,
      fallback: "manual",
    });
  }

  // 2) CI-Analyse — ein Claude-Call. Validiert dass wir aus dem Screenshot
  // markenrelevante Infos ziehen können. Ohne CI kein sinnvolles Paket.
  let ci;
  try {
    ci = await analyzeCI(visual, anthropicKey);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json<PreflightResult>({
      ok: false,
      reason: `CI-Analyse fehlgeschlagen: ${msg}`,
      fallback: "manual",
      screenshotUrl: visual.screenshotUrl,
    });
  }

  // 3) Sanity-Check: CI muss mindestens Farben + Markenname liefern, sonst
  // wird das Paket in der Full-Pipeline eh scheitern.
  if (!ci.primaryColors.length || !ci.brandName) {
    return NextResponse.json<PreflightResult>({
      ok: false,
      reason: "Aus dem Screenshot ließen sich keine verwertbaren Markeninformationen extrahieren. Bitte eine aussagekräftigere Seite (z.B. Startseite mit Logo + Hero-Bereich) verwenden.",
      fallback: "manual",
      screenshotUrl: visual.screenshotUrl,
    });
  }

  return NextResponse.json<PreflightResult>({
    ok: true,
    brand: {
      brandName: ci.brandName,
      primaryColors: ci.primaryColors,
      visualStyle: ci.visualStyle,
      logoDetected: Boolean(visual.logoUrl),
    },
    screenshotUrl: visual.screenshotUrl,
  });
}
