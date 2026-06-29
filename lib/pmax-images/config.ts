// Zentrale Konfiguration für die PMax-Bildpipeline.
// Alle Modellnamen, Bildgrößen und Thresholds liegen hier — so bleibt ein
// späteres Upgrade (z. B. Nano Banana 2 → 3) ein One-Line-Change.

// ─── Image-Generator (Google Gemini Nano Banana) ─────────────────────────────
// Wir nutzen die Gemini-Image-Generation-API (`:generateContent`), NICHT Imagen.
// Nano Banana 2 (gemini-3.1-flash-image-preview, März 2026) ist Google's
// aktuelles Flagship-Image-Modell: native Multi-Image-Referenzen, 14 Aspect
// Ratios inkl. extremer (1:4, 4:1), bessere Foto-Realistik + Text-Rendering
// als Imagen 4 Fast. Endpoint: generativelanguage.googleapis.com, gleicher
// API-Key wie vorher (GEMINI_API_KEY).

export const NANO_BANANA_MODELS = {
  flash2: "gemini-3.1-flash-image-preview", // Nano Banana 2 — Default
  flash1: "gemini-2.5-flash-image",          // Nano Banana Original — Fallback
} as const;

// Override per ENV `NANO_BANANA_QUALITY=flash1` wenn das 2er-Preview mal
// kippt. Default flash2.
export const NANO_BANANA_MODEL =
  process.env.NANO_BANANA_QUALITY === "flash1"
    ? NANO_BANANA_MODELS.flash1
    : NANO_BANANA_MODELS.flash2;

// Auflösung pro Bild. 2K = ~2048px Long-Side. Wir croppen danach auf exakte
// PMax-Dimensionen via sharp. 4K ist für den MVP overkill.
export const NANO_BANANA_RESOLUTION = "2K" as const;

// ─── Claude-Agent-Modelle ────────────────────────────────────────────────────

export const CLAUDE_MODELS = {
  analyst: "claude-haiku-4-5-20251001",
  promptEngineer: "claude-sonnet-4-6",
  qc: "claude-haiku-4-5-20251001",
} as const;

// ─── Google Ads PMax Asset-Formate ───────────────────────────────────────────

export const IMAGE_FORMATS = {
  square: { width: 1200, height: 1200, aspect: "1:1", label: "Square" },
  landscape: { width: 1200, height: 628, aspect: "1.91:1", label: "Landscape" },
  portrait: { width: 960, height: 1200, aspect: "4:5", label: "Portrait" },
} as const;

export type ImageFormat = keyof typeof IMAGE_FORMATS;

// Nano Banana 2 unterstützt 14 Aspect Ratios. Map PMax-Format → nächster
// nativer Ratio. Square und Portrait sind exakt, Landscape 1.91:1 hat keine
// native Entsprechung — 16:9 (1.78:1) ist am nächsten; wir croppen den Rest.
export const NANO_BANANA_ASPECT: Record<
  ImageFormat,
  "1:1" | "16:9" | "4:5"
> = {
  square: "1:1",
  landscape: "16:9",
  portrait: "4:5",
};

// ─── Copy-Zone pro Format ────────────────────────────────────────────────────
// Google PMax blendet Headlines + Descriptions DYNAMISCH ins Bild ein. Wenn
// keine natürliche Freifläche da ist, setzt Google hässliche weiße Companion-
// Boxen daneben. Lösung: jedes Bild bekommt eine BEWUSSTE Copy-Zone (soft
// bokeh, Himmel, Wand, Wasser), die wie Teil der Szene aussieht — nicht wie
// ein Loch. Diese Zonen gehen direkt in den Prompt jedes Formats.

export interface CopyZoneSpec {
  description: string;         // für den Prompt-Engineer (wird in den Prompt eingewebt)
  qcHint: string;              // für den QC-Agent (woran die Zone erkennbar ist)
}

export const COPY_ZONE_PER_FORMAT: Record<ImageFormat, CopyZoneSpec> = {
  square: {
    description:
      "Main subject placed right-of-center or lower-right; reserve the LEFT THIRD or UPPER-LEFT as a calm, natural copy zone (soft bokeh, sky, plain wall, atmospheric haze) that reads as part of the scene, not an empty gap.",
    qcHint:
      "linkes Drittel oder obere linke Ecke sollte ruhig und natürlich sein (keine harten Kanten, kein wichtiges Motiv)",
  },
  landscape: {
    description:
      "Main subject placed in the LEFT HALF to LEFT-CENTER; reserve the RIGHT 35-40% as a natural atmospheric field (sky gradient, out-of-focus environment, water surface) — open, uncluttered, but never obviously empty.",
    qcHint:
      "rechte Bildhälfte (35-40% Breite) sollte atmosphärisch ruhig sein, ohne Hauptmotiv",
  },
  portrait: {
    description:
      "Main subject in the LOWER TWO-THIRDS of the frame; reserve the TOP THIRD as sky, clean wall, or soft gradient — creating deliberate vertical breathing room overhead for text overlay.",
    qcHint:
      "obere Drittel sollte Himmel, Wand oder weiche Gradient-Fläche zeigen (ohne Hauptmotiv)",
  },
};

// ─── Motiv-Archetypen ────────────────────────────────────────────────────────
// Neu produkt-zentrisch: alle 4 Motive zeigen DAS PRODUKT als Hauptsubjekt,
// in unterschiedlichen Kontexten. Bisherige "Emotional-Story" und "Brand-
// Promise" raus — zu abstrakt für Performance-Max-Kleinbudget-Kampagnen.

export const MOTIF_ARCHETYPES = [
  "Product-in-Place",     // Produkt vorne scharf, echte geografische/kulturelle Kulisse im Bokeh
  "Product-Macro",        // Makro auf Etikett / Textur / Material — Craftsmanship
  "Product-in-Use",       // Produkt in authentischer Nutzungs-Situation (max. 1 Hand, keine Gesichter)
  "Product-Tabletop",     // Still-Life mit Produkt(en) auf rustikaler/regionaler Fläche, Tageslicht
] as const;

export type MotifArchetype = (typeof MOTIF_ARCHETYPES)[number];

// ─── Faces-Policy ────────────────────────────────────────────────────────────
// Zu viele Gesichter im letzten Testpaket — neues Kontrollinstrument. Default
// "anonymous" (Hände/Körperfragmente ok, keine Gesichter). Wird vom Prompt-
// Engineer + QC-Agent als harte Regel durchgesetzt.

export const FACES_POLICIES = ["none", "anonymous", "one", "any"] as const;
export type FacesPolicy = (typeof FACES_POLICIES)[number];
export const DEFAULT_FACES_POLICY: FacesPolicy = "anonymous";

export const FACES_POLICY_PROMPT: Record<FacesPolicy, string> = {
  none: "ABSOLUTELY NO people, no faces, no hands, no body parts anywhere in frame. Product-only composition.",
  anonymous:
    "NEVER show any faces. Hands, forearms, sleeves, or torso fragments are permitted only as supporting elements for the product (e.g., a hand pouring, holding, reaching). Never show eyes, mouths, or full heads.",
  one: "AT MOST ONE clearly visible face in the frame. Additional figures must be out-of-focus, cropped out, or silhouetted. Never a crowd.",
  any: "People may appear naturally; keep composition product-forward.",
};

// ─── Paket-Struktur ──────────────────────────────────────────────────────────

export const MOTIFS_PER_PACKAGE = 4;
export const FORMATS_PER_MOTIF: ImageFormat[] = ["square", "landscape", "portrait"];

// ─── Logo-Assets ─────────────────────────────────────────────────────────────

export const LOGO_FORMATS = {
  square: { width: 1200, height: 1200, aspect: "1:1", label: "Logo Square" },
  landscape: { width: 1200, height: 300, aspect: "4:1", label: "Logo Landscape" },
} as const;

export type LogoFormat = keyof typeof LOGO_FORMATS;

// ─── QC-Thresholds ───────────────────────────────────────────────────────────

export const QC_MIN_SCORE = 7;
export const QC_MAX_RETRIES = 3;

// ─── Storage ─────────────────────────────────────────────────────────────────

export const STORAGE_DIR = "public/generated";
export const PUBLIC_PREFIX = "/generated";
