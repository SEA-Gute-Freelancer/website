import Anthropic from "@anthropic-ai/sdk";
import { CLAUDE_MODELS } from "./config";
import { parseAgentJson } from "./parse-json";
import type { Cluster, ProductBrief } from "./types";

const SYSTEM = `Du bist Produkt-Analyst. Aus Website-Inhalt und vorhandener PMax-Cluster-Struktur destillierst du, was die Firma verkauft — so präzise, dass ein Bildgenerator das Produkt glaubwürdig darstellen kann.

Antworte AUSSCHLIESSLICH mit validem JSON:
{
  "productRange": "1 Satz: was verkauft die Firma insgesamt",
  "heroProducts": ["Produkt oder Leistung 1", "...", "max 5"],
  "usps": ["USP 1", "USP 2", "max 4"],
  "industry": "Branche in 1-3 Wörtern, z. B. 'B2B-SaaS HR', 'Gastronomie', 'Handwerk Sanitär'"
}

Wichtig: heroProducts müssen visuell darstellbar sein. Statt "Beratung" besser "Berater im Gespräch mit Kundin in modernem Büro". Bei physischen Produkten: konkrete, visuell identifizierbare Items.`;

export async function analyzeProducts(
  pageContent: string,
  clusters: Cluster[],
  apiKey: string
): Promise<ProductBrief> {
  const client = new Anthropic({ apiKey });

  const clustersSummary = clusters
    .map(
      (c, i) =>
        `${i + 1}. ${c.name} — Psychology: ${c.psychology}\n   Search Themes: ${c.searchThemes.slice(0, 5).join(", ")}`
    )
    .join("\n");

  const userText = `Page-Inhalt (Ausschnitt):
--- PAGE START ---
${pageContent.slice(0, 5000)}
--- PAGE END ---

Bereits generierte Assetgruppen:
${clustersSummary}

Extrahiere die Produktpalette.`;

  const message = await client.messages.create({
    model: CLAUDE_MODELS.analyst,
    max_tokens: 1500,
    system: SYSTEM,
    messages: [{ role: "user", content: userText }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return parseAgentJson<ProductBrief>("agent-products", text);
}
