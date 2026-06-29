// Shared JSON-Parser für alle Claude-Agents.
//
// Claude hält sich nicht immer an "AUSSCHLIESSLICH JSON" — manchmal kommt
// noch Prosa hinterher ("…sonst solide Hero-Fotografie."). Deshalb suchen
// wir den ersten balancierten `{…}`- oder `[…]`-Block und parsen nur den.
// Bei Fehlschlag taggt der Error den Agent-Namen plus den letzten Ausschnitt
// des Rohtexts — so wissen wir sofort, welcher Agent betroffen war.

function extractJsonBlock(text: string): string | null {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const firstObj = cleaned.indexOf("{");
  const firstArr = cleaned.indexOf("[");
  const candidates = [firstObj, firstArr].filter((i) => i >= 0);
  if (!candidates.length) return null;

  const start = Math.min(...candidates);
  const openChar = cleaned[start];
  const closeChar = openChar === "{" ? "}" : "]";

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];

    if (escape) {
      escape = false;
      continue;
    }
    if (ch === "\\" && inString) {
      escape = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) return cleaned.slice(start, i + 1);
    }
  }
  return null;
}

export function parseAgentJson<T>(agentName: string, rawText: string): T {
  const block = extractJsonBlock(rawText);
  if (!block) {
    const preview = rawText.slice(0, 200);
    throw new Error(
      `[${agentName}] Kein JSON-Block gefunden. Anfang: "${preview}…"`
    );
  }

  try {
    return JSON.parse(block) as T;
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    const preview = block.slice(-200);
    throw new Error(
      `[${agentName}] JSON-Parse fehlgeschlagen: ${reason}. ` +
        `Länge ${block.length} Zeichen. Ende: "…${preview}"`
    );
  }
}
