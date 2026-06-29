import Anthropic from "@anthropic-ai/sdk";
import { CLAUDE_MODELS } from "./config";
import { parseAgentJson } from "./parse-json";
import type { AudienceBrief, Cluster, ProductBrief } from "./types";

const SYSTEM = `Du bist Zielgruppen-Stratege. Aus PMax-Cluster-Audience-Signalen und Produkt-Kontext formulierst du ein kompaktes Audience-Briefing, das ein Bildgenerator nutzen kann, um Menschen und Szenen authentisch darzustellen.

Antworte AUSSCHLIESSLICH mit validem JSON:
{
  "demographics": "1-2 Sätze: Alter, Einkommen, Lebenssituation, Geschlechter-Mix",
  "psychographics": "1-2 Sätze: Werte, Motivationen, Pain Points",
  "context": "1 Satz: Wo/wann/wie wird das Produkt genutzt — konkrete Szenen",
  "visualMood": "3-5 Adjektive die die ideale Bildstimmung beschreiben"
}

Wichtig: Vermeide Klischees. Denk an konkrete, glaubwürdige Menschen in realistischen Situationen.`;

export async function analyzeAudience(
  products: ProductBrief,
  clusters: Cluster[],
  apiKey: string
): Promise<AudienceBrief> {
  const client = new Anthropic({ apiKey });

  const audienceSignals = clusters
    .map((c) => `${c.name}: ${c.audiences.join(", ")}`)
    .join("\n");

  const userText = `Branche: ${products.industry}
Produktpalette: ${products.productRange}
USPs: ${products.usps.join(", ")}

Audience Signals aus den Assetgruppen:
${audienceSignals}

Formuliere das Audience-Briefing für Bildgenerierung.`;

  const message = await client.messages.create({
    model: CLAUDE_MODELS.analyst,
    max_tokens: 1500,
    system: SYSTEM,
    messages: [{ role: "user", content: userText }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return parseAgentJson<AudienceBrief>("agent-audience", text);
}
