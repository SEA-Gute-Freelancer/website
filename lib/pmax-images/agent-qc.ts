import Anthropic from "@anthropic-ai/sdk";
import {
  CLAUDE_MODELS,
  COPY_ZONE_PER_FORMAT,
  FACES_POLICY_PROMPT,
} from "./config";
import type { FacesPolicy } from "./config";
import { parseAgentJson } from "./parse-json";
import type { CIBrief, ImagePrompt } from "./types";

const SYSTEM = `Du bist Art Director und prüfst ein KI-generiertes Werbebild gegen sein Briefing. Bewerte streng aber fair — dieses Bild wird zahlenden Kunden ausgeliefert.

BEWERTUNGSKRITERIEN (je 1-10, nimm den Durchschnitt):
1. Fotorealismus — sieht das aus wie eine professionelle DSLR-Aufnahme, oder verrät es CGI/3D/AI-Aesthetic? (harte Abwertung bei AI-typischen Artefakten: plastische Haut, über-symmetrische Gesichter, "zu perfektes" Licht, verdrehte Finger, HDR-Look)
2. Produkt-Präsenz — ist DAS PRODUKT das klare Hauptmotiv? PMax-Pakete verlangen produkt-zentrische Kompositionen.
3. Markenkonformität — Farben, Stimmung, Stil passen zur CI; Hauptfarben organisch in der Szene integriert (nicht als Überlagerung).
4. Konzept-Treue — entspricht die Szene dem geplanten Archetyp + Konzept?
5. Komposition + Format-Tauglichkeit — klares Hauptmotiv, mobilfähig, aspect ratio richtig ausgenutzt.
6. Copy-Zone — ist eine NATÜRLICHE Freifläche für Google-PMax-Overlays vorhanden (siehe Briefing)? Ohne wirkt der Auto-Overlay später wie eine aufgeklebte Box.
7. Gesichter-Policy — Anzahl / Sichtbarkeit von Gesichtern gemäß Policy (siehe Briefing).

HARTE AUSSCHLUSSKRITERIEN (score ≤ 4 automatisch):
- Sichtbarer Text/Schrift im Bild (außer reales Produkt-Etikett)
- Sichtbares Zweit-Logo / Corporate-Stamp (Produkt-Label ist ok)
- Preis-Stamps / Sale-Banner
- Menschen mit deformiertem Körper (zu viele Finger, verdrehte Gliedmaßen)
- Verletzung der Gesichter-Policy (z.B. Gesicht da wo "none"/"anonymous" fordert, Crowd wo "one" fordert)
- Offensichtlicher CGI/Illustrations-Look statt Fotografie
- Keine erkennbare Copy-Zone → verhindert saubere Google-Overlay-Integration

Antworte AUSSCHLIESSLICH mit validem JSON:
{
  "score": 1-10 (Ganzzahl oder .5),
  "issues": ["kurze Liste konkreter Probleme — leer bei score >= 9"],
  "verdict": "accept" oder "retry",
  "promptAdjustment": "Wenn retry: konkrete Anpassung in 1-2 Sätzen (auf Englisch, da der Prompt auf Englisch ist). Bei accept: null"
}`;

export interface QCResult {
  score: number;
  issues: string[];
  verdict: "accept" | "retry";
  promptAdjustment: string | null;
}

export async function reviewImage(
  imageBuffer: Buffer,
  prompt: ImagePrompt,
  ci: CIBrief,
  apiKey: string,
  facesPolicy: FacesPolicy
): Promise<QCResult> {
  const client = new Anthropic({ apiKey });

  const base64 = imageBuffer.toString("base64");
  const briefing = `BRIEFING ZUM PRÜFEN:
Format: ${prompt.format}
Motiv: ${prompt.motifName} (Archetyp: ${prompt.archetype})
Konzept: ${prompt.concept}
Prompt (was das Bild zeigen sollte):
${prompt.prompt}

ERWARTUNGEN:
- Kein Overlay-Text, kein fremdes Logo, keine Preis-Stamps.
- Produkt-Etikett-Text ist OK und sogar erwünscht.
- Fotorealistisch (DSLR-Look), nicht CGI oder Illustration.
- Produkt ist Hauptmotiv, nicht Nebenrolle.

COPY-ZONE-ANFORDERUNG (${prompt.format}):
${COPY_ZONE_PER_FORMAT[prompt.format].qcHint}

GESICHTER-POLICY (aktuell "${facesPolicy}"):
${FACES_POLICY_PROMPT[facesPolicy]}

CI-KONTEXT:
Hauptfarben: ${ci.primaryColors.join(", ")}
Ton: ${ci.tone}
Visueller Stil: ${ci.visualStyle}

Bewerte das gezeigte Bild gegen diese Erwartungen.`;

  const message = await client.messages.create({
    model: CLAUDE_MODELS.qc,
    max_tokens: 1500,
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: "image/jpeg", data: base64 },
          },
          { type: "text", text: briefing },
        ],
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return parseAgentJson<QCResult>(`agent-qc[m${prompt.motifIndex}-${prompt.format}]`, text);
}
