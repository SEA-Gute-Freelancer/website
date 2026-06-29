import sharp from "sharp";
import { LOGO_FORMATS } from "./config";
import { logoFilenameFor, saveImage } from "./storage";
import { fetchAsBase64 } from "./scrape-visual";
import type { LogoAsset } from "./types";

// Bringt das gescrapte Marken-Logo auf die offiziellen PMax-Logo-Formate:
//   - 1:1 Square (1200×1200) — Pflicht
//   - 4:1 Landscape (1200×300) — empfohlen
//
// Strategie: weißes Canvas, Logo zentriert, max 85 % der Canvas-Fläche (15 %
// Sicherheitsabstand auf allen Seiten — Google empfiehlt padding damit das
// Logo in unterschiedlichen Placement-Slots nicht angeschnitten wird).
//
// Das Ergebnis ist das echte Marken-Logo in PMax-Spec — keine AI-Interpretation.
// Wenn kein Logo gefunden wurde oder Download fehlschlägt, liefern wir eine
// leere Liste zurück und das UI zeigt einen Hinweis.

const SAFE_AREA_RATIO = 0.85;

export async function refraimLogo(
  logoUrl: string | null,
  orderId: string
): Promise<LogoAsset[]> {
  if (!logoUrl) return [];

  let logoBuffer: Buffer;
  try {
    const fetched = await fetchAsBase64(logoUrl);
    logoBuffer = Buffer.from(fetched.data, "base64");
  } catch (err) {
    console.warn("Logo-Download fehlgeschlagen:", err instanceof Error ? err.message : err);
    return [];
  }

  const assets: LogoAsset[] = [];

  for (const [variant, spec] of Object.entries(LOGO_FORMATS) as [
    keyof typeof LOGO_FORMATS,
    (typeof LOGO_FORMATS)[keyof typeof LOGO_FORMATS]
  ][]) {
    try {
      const safeW = Math.round(spec.width * SAFE_AREA_RATIO);
      const safeH = Math.round(spec.height * SAFE_AREA_RATIO);

      // Logo auf Safe-Area skalieren (fit: inside bewahrt Aspect, rendert
      // niemals größer als safeW × safeH).
      const resizedLogo = await sharp(logoBuffer)
        .resize(safeW, safeH, { fit: "inside", withoutEnlargement: false })
        .png()
        .toBuffer();

      // Auf weißes Canvas in Zielgröße compositen, Logo zentriert.
      const composed = await sharp({
        create: {
          width: spec.width,
          height: spec.height,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      })
        .composite([{ input: resizedLogo, gravity: "center" }])
        .png({ compressionLevel: 9 })
        .toBuffer();

      const filename = logoFilenameFor(variant);
      const { path, publicUrl } = await saveImage(orderId, filename, composed);

      assets.push({
        variant,
        filename,
        path,
        publicUrl,
        width: spec.width,
        height: spec.height,
        source: "scraped",
      });
    } catch (err) {
      console.warn(
        `Logo-Refraiming für ${variant} fehlgeschlagen:`,
        err instanceof Error ? err.message : err
      );
    }
  }

  return assets;
}
