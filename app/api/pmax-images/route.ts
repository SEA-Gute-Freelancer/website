import { NextRequest, NextResponse } from "next/server";

import { analyzeCI } from "@/lib/pmax-images/agent-ci";
import { analyzeProducts } from "@/lib/pmax-images/agent-products";
import { analyzeAudience } from "@/lib/pmax-images/agent-audience";
import { generatePrompts } from "@/lib/pmax-images/agent-prompt-engineer";
import { generateImage } from "@/lib/pmax-images/imagen";
import { reviewImage } from "@/lib/pmax-images/agent-qc";
import { scrapeVisual } from "@/lib/pmax-images/scrape-visual";
import { refraimLogo } from "@/lib/pmax-images/logo-refraim";
import { filenameFor, saveImage } from "@/lib/pmax-images/storage";
import {
  DEFAULT_FACES_POLICY,
  FACES_POLICIES,
  QC_MAX_RETRIES,
  QC_MIN_SCORE,
} from "@/lib/pmax-images/config";
import type { FacesPolicy } from "@/lib/pmax-images/config";
import type {
  BrandContext,
  Cluster,
  GeneratedImage,
  ImagePrompt,
  LogoAsset,
} from "@/lib/pmax-images/types";
import { createOrder, logGenerationStep } from "@/lib/db/orders";

// SQLite + Bildgenerierung brauchen Node-Runtime (kein Edge).
export const runtime = "nodejs";
// 4 Motive × 3 Formate = 12 Bilder. Sequentiell bei ~30-60s pro Bild + QC
// = bis zu ~12 min. Auf Vercel Pro ist das Limit 300s, auf Enterprise 900s,
// self-hosted unbegrenzt. Async-Worker kommt in Sprint 2 — für jetzt geben
// wir dem Dev-Run die volle Enterprise-Grenze.
export const maxDuration = 900;

// Max gleichzeitige Imagen-Calls. Fresh Paid-Tier Quota ist eng (oft
// 5-10 RPM auf Imagen 4 Fast). Sequentiell (=1) ist robust. Sobald Google
// den Tier anhebt, auf 2-3 erhöhen für Speedup.
const IMAGE_CONCURRENCY = 1;

async function runLimited<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (true) {
      const i = nextIndex++;
      if (i >= items.length) return;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// Optionaler Test-Fetch des Page-Contents (für Produkt-Analyse)
async function fetchPageText(url: string): Promise<string> {
  try {
    const res = await fetch(`https://r.jina.ai/${url}`, {
      headers: { Accept: "text/plain", "X-No-Cache": "true" },
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) {
      const text = await res.text();
      return text.slice(0, 6000);
    }
  } catch {
    /* fällt durch */
  }
  return "[Seite konnte nicht gelesen werden — Analyse stützt sich auf Cluster + Visuals]";
}

// ─── Haupt-Pipeline ──────────────────────────────────────────────────────────

async function runPipeline(
  orderId: string,
  url: string,
  clusters: Cluster[],
  facesPolicy: FacesPolicy,
  anthropicKey: string,
  geminiKey: string
): Promise<{
  images: GeneratedImage[];
  logos: LogoAsset[];
  context: BrandContext;
}> {
  // 1) Visuelles Scraping (Screenshot + Logo + Palette + Meta)
  logGenerationStep(orderId, "scrape", "ok");
  const visual = await scrapeVisual(url);
  logGenerationStep(orderId, "scrape", "ok", { screenshot: visual.screenshotUrl });

  // 2) Page-Text für Produkt-Analyse
  const pageText = await fetchPageText(url);

  // 3) CI + Produkt-Analyse parallel, dann Audience auf deren Output
  const [ci, products] = await Promise.all([
    analyzeCI(visual, anthropicKey),
    analyzeProducts(pageText, clusters, anthropicKey),
  ]);
  logGenerationStep(orderId, "analysis-ci", "ok", ci);
  logGenerationStep(orderId, "analysis-products", "ok", products);

  const audience = await analyzeAudience(products, clusters, anthropicKey);
  logGenerationStep(orderId, "analysis-audience", "ok", audience);

  const context: BrandContext = { ci, products, audience };

  // 4) Sanity-Check auf CI
  if (!ci.primaryColors.length) {
    throw new Error("CI-Analyse lieferte keine verwertbaren Farben");
  }

  // 5) Logo-Refraiming parallel zur Prompt-Generierung (kein Claude-Call,
  // rein sharp-basiert, wirft das Paket aber nicht um wenn's scheitert)
  const [prompts, logos] = await Promise.all([
    generatePrompts(context, clusters, anthropicKey, facesPolicy),
    refraimLogo(visual.logoUrl, orderId),
  ]);
  logGenerationStep(orderId, "prompts", "ok", { count: prompts.length });
  logGenerationStep(orderId, "logos", logos.length ? "ok" : "fail", {
    count: logos.length,
    source: visual.logoUrl ?? "no-logo-scraped",
  });

  // 6) 12 Bilder generieren + QC-Schleife, sequentiell wegen Quota-Limits
  const images = await runLimited(prompts, IMAGE_CONCURRENCY, (p) =>
    generateWithQC(orderId, p, context, facesPolicy, geminiKey, anthropicKey)
  );

  return { images, logos, context };
}

async function generateWithQC(
  orderId: string,
  initialPrompt: ImagePrompt,
  context: BrandContext,
  facesPolicy: FacesPolicy,
  geminiKey: string,
  anthropicKey: string
): Promise<GeneratedImage> {
  let currentPrompt = initialPrompt.prompt;
  let attempts = 0;
  let lastScore = 0;
  let lastIssues: string[] = [];

  while (attempts <= QC_MAX_RETRIES) {
    attempts += 1;
    try {
      const buffer = await generateImage(currentPrompt, initialPrompt.format, geminiKey);
      const qc = await reviewImage(
        buffer,
        { ...initialPrompt, prompt: currentPrompt },
        context.ci,
        anthropicKey,
        facesPolicy
      );

      lastScore = qc.score;
      lastIssues = qc.issues;

      const accepted = qc.verdict === "accept" && qc.score >= QC_MIN_SCORE;
      const lastTry = attempts > QC_MAX_RETRIES;

      if (accepted || lastTry) {
        const filename = filenameFor(initialPrompt.motifIndex, initialPrompt.format);
        const saved = await saveImage(orderId, filename, buffer);
        logGenerationStep(
          orderId,
          `image-m${initialPrompt.motifIndex}-${initialPrompt.format}`,
          accepted ? "ok" : "fail",
          { score: qc.score, attempts, issues: qc.issues }
        );
        return {
          ...initialPrompt,
          prompt: currentPrompt,
          filename,
          path: saved.path,
          publicUrl: saved.publicUrl,
          qcScore: qc.score,
          qcIssues: qc.issues,
          attempts,
        };
      }

      // Retry mit angepasstem Prompt
      logGenerationStep(
        orderId,
        `image-m${initialPrompt.motifIndex}-${initialPrompt.format}`,
        "retry",
        { score: qc.score, issues: qc.issues, adjustment: qc.promptAdjustment }
      );
      if (qc.promptAdjustment) {
        currentPrompt = `${currentPrompt}\n\nAdjustments from previous attempt: ${qc.promptAdjustment}`;
      }
    } catch (err) {
      logGenerationStep(
        orderId,
        `image-m${initialPrompt.motifIndex}-${initialPrompt.format}`,
        "fail",
        { error: err instanceof Error ? err.message : String(err), attempts }
      );
      if (attempts > QC_MAX_RETRIES) throw err;
    }
  }

  throw new Error(
    `Bildgenerierung fehlgeschlagen nach ${attempts} Versuchen (Score ${lastScore}): ${lastIssues.join(", ")}`
  );
}

// ─── HTTP-Handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!anthropicKey || !geminiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY und GEMINI_API_KEY müssen konfiguriert sein." },
      { status: 500 }
    );
  }

  let body: { url: string; clusters?: Cluster[]; facesPolicy?: FacesPolicy };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!body.url) {
    return NextResponse.json({ error: "URL ist erforderlich." }, { status: 400 });
  }

  // Clusters sind optional: leeres Array bedeutet "keine Marketing-Angle-Hints".
  // analyzeProducts / analyzeAudience / generatePrompts degradieren sauber auf
  // CI + Products + Audience. Wird vom Images-Only-Dev-Flow genutzt, der den
  // Text-Asset-Schritt komplett überspringt.
  const clusters: Cluster[] = Array.isArray(body.clusters) ? body.clusters : [];

  const facesPolicy: FacesPolicy =
    body.facesPolicy && FACES_POLICIES.includes(body.facesPolicy)
      ? body.facesPolicy
      : DEFAULT_FACES_POLICY;

  // Phase 1: Order direkt anlegen (ohne Payment — kommt in Phase 3).
  // Email/Amount sind Platzhalter und werden bei Payment überschrieben.
  const orderId = createOrder({
    email: "pending@sgf",
    url: body.url,
    amountCents: 0,
    textAssets: clusters,
  });

  try {
    const { images, logos, context } = await runPipeline(
      orderId,
      body.url,
      clusters,
      facesPolicy,
      anthropicKey,
      geminiKey
    );

    return NextResponse.json({
      orderId,
      brandContext: context,
      images,
      logos,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
    console.error("PMax-Images pipeline error:", msg);
    logGenerationStep(orderId, "pipeline", "fail", { error: msg });
    return NextResponse.json(
      { error: `Bildgenerierung fehlgeschlagen: ${msg}`, orderId },
      { status: 500 }
    );
  }
}
