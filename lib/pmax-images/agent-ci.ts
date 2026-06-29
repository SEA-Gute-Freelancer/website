import Anthropic from "@anthropic-ai/sdk";
import { CLAUDE_MODELS } from "./config";
import { parseAgentJson } from "./parse-json";
import { fetchAsBase64 } from "./scrape-visual";
import type { CIBrief, VisualScrape } from "./types";

const SYSTEM = `Du bist Corporate-Identity-Analyst. Deine Aufgabe: Aus einem Website-Screenshot und kurzen Meta-Daten die visuelle Identität der Marke präzise extrahieren, damit ein Image-Generator markenkonforme Werbebilder erzeugen kann.

Du bekommst:
- Einen Screenshot der Website (oben).
- Titel, Meta-Beschreibung und Publisher-Name.
- Optional eine Palette aus dominanten Farben und ein Logo-URL.

Antworte AUSSCHLIESSLICH mit validem JSON in dieser Struktur:
{
  "primaryColors": ["#hex", "#hex"],      // 1-2 führende Markenfarben
  "accentColors": ["#hex", "#hex"],        // 1-3 Akzentfarben
  "fonts": "kurze Beschreibung der Typografie",
  "tone": "2-4 Adjektive",
  "visualStyle": "1 Satz zum visuellen Stil",
  "logoDescription": "visuelle Beschreibung des Logos — was ist drauf, wie wirkt es",
  "brandName": "Markenname wie er verwendet wird",
  "claim": "prägnanter Claim max 5 Wörter ODER null wenn keiner erkennbar"
}`;

export async function analyzeCI(
  visual: VisualScrape,
  apiKey: string
): Promise<CIBrief> {
  const client = new Anthropic({ apiKey });

  const screenshot = await fetchAsBase64(visual.screenshotUrl);
  const logo = visual.logoUrl
    ? await fetchAsBase64(visual.logoUrl).catch(() => null)
    : null;

  const userText = [
    `Titel: ${visual.title ?? "—"}`,
    `Beschreibung: ${visual.description ?? "—"}`,
    `Publisher: ${visual.publisher ?? "—"}`,
    visual.palette.length
      ? `Dominante Farben: ${visual.palette.join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const content: Anthropic.ContentBlockParam[] = [
    {
      type: "image",
      source: { type: "base64", media_type: screenshot.mediaType, data: screenshot.data },
    },
  ];

  if (logo) {
    content.push({
      type: "text",
      text: "Das nächste Bild ist das Logo:",
    });
    content.push({
      type: "image",
      source: { type: "base64", media_type: logo.mediaType, data: logo.data },
    });
  }

  content.push({ type: "text", text: userText });

  const message = await client.messages.create({
    model: CLAUDE_MODELS.analyst,
    max_tokens: 2000,
    system: SYSTEM,
    messages: [{ role: "user", content }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return parseAgentJson<CIBrief>("agent-ci", text);
}
