import sharp from "sharp";
import type { VisualScrape } from "./types";

// Microlink liefert Screenshot, Palette, Logo und Meta-Daten in einem Call.
// Free-Tier: 50 Requests/Tag, reicht für MVP-Testing und früh-operative Nutzung.
// Bei Bedarf einfach MICROLINK_API_KEY setzen → 1.000 Requests/Monat.

const MICROLINK_ENDPOINT = "https://api.microlink.io";

interface MicrolinkResponse {
  status: "success" | "fail";
  code?: string;
  data?: {
    title?: string;
    description?: string;
    publisher?: string;
    logo?: { url?: string };
    image?: { url?: string };
    screenshot?: { url?: string };
    palette?: string[];
  };
  message?: string;
}

function friendlyError(code: string | undefined, status: number, url: string): string {
  if (code === "EFATAL" || code === "ETIMEDOUT" || code === "ERENDER") {
    return `Die Zielseite konnte nicht gerendert werden (${code ?? `HTTP ${status}`}). Das passiert bei Seiten mit Bot-Schutz (Cloudflare, reCAPTCHA) oder sehr langsamem JavaScript. Probiere eine andere URL/Unterseite (z. B. direkt die Produktseite statt der Homepage) oder setze einen MICROLINK_API_KEY für den Pro-Tier.`;
  }
  return `Screenshot-Service unerreichbar (HTTP ${status}). Seite: ${url}`;
}

// Microlink Free-Tier ist zeitweise flaky — liefert Bursts von 500/EFATAL
// auch auf URLs die Sekunden später wieder gehen. 4 Retries (5 total)
// mit 2s→4s→8s→16s Backoff puffern solche Dips ab.
const SCRAPE_MAX_RETRIES = 4;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function scrapeVisual(url: string): Promise<VisualScrape> {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    palette: "true",
    "viewport.width": "1280",
    "viewport.height": "800",
    // waitUntil=domcontentloaded + adblock verhindert Hänger auf Sites
    // mit langlaufenden Tracking-/Ad-Scripts. Default networkidle0 und
    // auch `load` warten auf Ads/Tracker — das triggert EFATAL. Mit
    // domcontentloaded kommt der Screenshot 2s nach DOM-ready (ausreichend
    // für Hero-Bild + CSS-Rendering).
    waitUntil: "domcontentloaded",
    adblock: "true",
    waitForTimeout: "2000",
  });

  const headers: HeadersInit = { Accept: "application/json" };
  if (process.env.MICROLINK_API_KEY) {
    headers["x-api-key"] = process.env.MICROLINK_API_KEY;
  }

  let lastErr: string = "";
  let data: MicrolinkResponse | null = null;

  for (let attempt = 0; attempt <= SCRAPE_MAX_RETRIES; attempt++) {
    // Ab Retry 1 `force=true` setzen — Microlink cached auch fehlgeschlagene
    // Renders 7 Tage. Ohne force kriegen wir bei manchen URLs denselben
    // Cached-EFATAL in Endlosschleife. force=true erzwingt Neu-Render.
    const attemptParams = new URLSearchParams(params);
    if (attempt > 0) attemptParams.set("force", "true");

    try {
      const res = await fetch(`${MICROLINK_ENDPOINT}?${attemptParams.toString()}`, {
        headers,
        signal: AbortSignal.timeout(45_000),
      });

      if (res.status >= 500 && attempt < SCRAPE_MAX_RETRIES) {
        lastErr = `HTTP ${res.status}`;
        await sleep(2000 * (attempt + 1));
        continue;
      }

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        let code: string | undefined;
        try {
          code = (JSON.parse(body) as MicrolinkResponse).code;
        } catch {
          /* nicht-JSON-Response, ignorieren */
        }
        throw new Error(friendlyError(code, res.status, url));
      }

      data = (await res.json()) as MicrolinkResponse;
      break;
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err);
      if (attempt >= SCRAPE_MAX_RETRIES) throw err;
      await sleep(2000 * (attempt + 1));
    }
  }

  if (!data) {
    throw new Error(`Screenshot-Service nach ${SCRAPE_MAX_RETRIES + 1} Versuchen nicht erreichbar: ${lastErr}`);
  }

  if (data.status !== "success" || !data.data?.screenshot?.url) {
    throw new Error(friendlyError(data.code, 200, url));
  }

  return {
    screenshotUrl: data.data.screenshot.url,
    logoUrl: data.data.logo?.url ?? null,
    palette: data.data.palette ?? [],
    title: data.data.title ?? null,
    description: data.data.description ?? null,
    publisher: data.data.publisher ?? null,
  };
}

// Lädt ein Bild und normalisiert es zu PNG — Claude Vision akzeptiert nur
// jpeg/png/gif/webp. Microlink liefert Logos oft als ICO oder SVG, daher
// konvertieren wir via sharp auf PNG, egal was reinkommt.
export async function fetchAsBase64(
  url: string
): Promise<{ data: string; mediaType: "image/png" }> {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`Bild-Download fehlgeschlagen: HTTP ${res.status}`);

  const buffer = Buffer.from(await res.arrayBuffer());

  const png = await sharp(buffer, { failOn: "none" })
    .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer();

  return { data: png.toString("base64"), mediaType: "image/png" };
}
