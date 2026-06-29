import type { ImageFormat, LogoFormat, MotifArchetype, FacesPolicy } from "./config";

export type { MotifArchetype, FacesPolicy };

// ─── Input aus der bestehenden PMax-Text-Generierung ─────────────────────────

export interface ClusterCopy {
  shortHeadlines: string[];
  longHeadlines: string[];
  descriptions: string[];
}

export interface Cluster {
  name: string;
  psychology: string;
  searchThemes: string[];
  audiences: string[];
  customUrls: string[];
  copy: ClusterCopy;
}

// ─── Visual Scrape ───────────────────────────────────────────────────────────

export interface VisualScrape {
  screenshotUrl: string;      // microlink CDN URL
  logoUrl: string | null;
  palette: string[];          // ["#112233", ...]
  title: string | null;
  description: string | null;
  publisher: string | null;
}

// ─── Analyse-Briefs ──────────────────────────────────────────────────────────

export interface CIBrief {
  primaryColors: string[];       // Hex, führende Markenfarben
  accentColors: string[];
  fonts: string;                 // z. B. "Modern sans-serif, bold headlines"
  tone: string;                  // z. B. "Seriös, hochwertig, ruhig"
  visualStyle: string;           // z. B. "Minimalistisch, viel Weißraum"
  logoDescription: string;       // visuelle Beschreibung des Logos
  brandName: string;
  claim: string | null;          // prägnanter Claim aus der Seite, max 5 Wörter
}

export interface ProductBrief {
  productRange: string;          // was verkauft die Firma
  heroProducts: string[];        // 3–5 Produkte/Leistungen die im Vordergrund stehen
  usps: string[];                // Unique Selling Points
  industry: string;
}

export interface AudienceBrief {
  demographics: string;          // Alter, Einkommen, Lebenssituation
  psychographics: string;        // Werte, Motivationen, Pain Points
  context: string;               // Wo/wann/wie nutzen sie das Produkt
  visualMood: string;            // Stimmung die das Publikum anspricht
}

export interface BrandContext {
  ci: CIBrief;
  products: ProductBrief;
  audience: AudienceBrief;
}

// ─── Prompts & Bilder ────────────────────────────────────────────────────────

export interface ImagePrompt {
  motifIndex: number;            // 0..3
  archetype: MotifArchetype;     // welcher Archetyp aus dem Pool
  motifName: string;             // sprechender Name, z.B. "Trail-Sonnenaufgang"
  format: ImageFormat;
  concept: string;               // 1-Zeilen-Zusammenfassung was auf dem Bild ist
  prompt: string;                // vollständiger englischer Imagen-Prompt inkl. Photo-Anchor
}

export interface GeneratedImage extends ImagePrompt {
  filename: string;              // z. B. "m1-square.jpg"
  path: string;                  // absoluter Pfad auf Disk
  publicUrl: string;             // /generated/{orderId}/m1-square.jpg
  qcScore: number;               // 1–10
  qcIssues: string[];
  attempts: number;
}

// Logo-Assets: existierendes Marken-Logo auf PMax-Spec-Canvas gebracht.
// source="scraped" → aus Microlink-Scrape, source="none" → kein Logo gefunden
// (Paket wird ohne Logo-Assets ausgeliefert, Hinweis im UI).
export interface LogoAsset {
  variant: LogoFormat;
  filename: string;
  path: string;
  publicUrl: string;
  width: number;
  height: number;
  source: "scraped" | "none";
}

export interface ImagePackage {
  orderId: string;
  brandContext: BrandContext;
  images: GeneratedImage[];
  logos: LogoAsset[];
  generatedAt: number;
}
