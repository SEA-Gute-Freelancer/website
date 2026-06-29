import Anthropic from "@anthropic-ai/sdk";
import {
  CLAUDE_MODELS,
  COPY_ZONE_PER_FORMAT,
  FACES_POLICY_PROMPT,
  FORMATS_PER_MOTIF,
  IMAGE_FORMATS,
  MOTIFS_PER_PACKAGE,
  MOTIF_ARCHETYPES,
} from "./config";
import type { FacesPolicy } from "./config";
import { parseAgentJson } from "./parse-json";
import type { BrandContext, Cluster, ImagePrompt } from "./types";

// Prompt-Engineering für Nano Banana 2 (Gemini 3.1 Flash Image).
// Kernregeln laut Google's offiziellem Style-Guide (März 2026):
// - Natürliche Prosa-Paragraphen, KEINE Komma-Keyword-Listen
// - 5 Komponenten: Subject → Action → Location → Composition → Style
// - Prestigious Context Anchors ("Vanity Fair editorial", "Nat Geo cover")
// - BANNED keywords: "photorealistic", "8K", "4K", "masterpiece",
//   "ultra-detailed", "high resolution", "award-winning", "best quality"
// - KEINE Negative Prompts ("no X") — Gemini versteht das nicht. Stattdessen
//   positiv umformulieren ("clean, uncluttered") oder ALL-CAPS-"NEVER".

const SYSTEM = `You are a senior art director writing image-generation prompts for Google Nano Banana 2 (gemini-3.1-flash-image-preview). You follow Google's official March-2026 prompting guide precisely.

YOUR TASK
For one brand, produce a package of ${MOTIFS_PER_PACKAGE} visually and conceptually DISTINCT motifs, each in 3 formats (Square 1:1, Landscape 16:9, Portrait 4:5). That is ${MOTIFS_PER_PACKAGE * FORMATS_PER_MOTIF.length} prompts total.

ARCHETYPE POOL (choose ${MOTIFS_PER_PACKAGE} that best fit the brand)
${MOTIF_ARCHETYPES.map((a, i) => `${i + 1}. ${a}`).join("\n")}

Definitions:
- Product-in-Place — The product in sharp foreground with an authentic geographic/cultural context in soft background (e.g. Portuguese coastal cliffs, Douro valley vineyards, Azulejo-tiled facade, weathered wooden harbor). The background MUST be true to the product's origin — no generic "mediterranean".
- Product-Macro — Extreme close-up on material, label detail, texture, cork, pour stream, crystalline sediment. Craftsmanship storytelling through surface detail. Human skin/hands are NOT the subject.
- Product-in-Use — Product in an authentic usage moment (glass being poured, oil drizzled on bread, knife cutting cheese alongside the product). Usage context makes the product feel alive.
- Product-Tabletop — Still-life arrangement on a rustic regional surface (reclaimed wood, stone slab, linen cloth) with authentic local props (ceramics, fresh herbs, bread, fruits native to the origin). Daylight or window-light, editorial food-styling quality.

FORMAT-SPECIFIC COMPOSITION (each format gets its OWN composition, never a cropped version of another)
- 1:1 Square (1200×1200): medium shot, balanced — but off-center per the copy-zone rule below
- 16:9 Landscape (1200×628): wide establishing framing, environmental emphasis
- 4:5 Portrait (960×1200): vertical hero stance, product rises into upper frame

COPY-ZONE RULE (mandatory)
Google PMax overlays headlines dynamically on the image. If there is no natural empty zone, Google falls back to an ugly white companion box. Every prompt MUST build in a natural copy zone that reads as part of the scene (soft bokeh sky, atmospheric haze, plain weathered wall, calm water surface) — never as an empty gap. Per format:
- Square: ${COPY_ZONE_PER_FORMAT.square.description}
- Landscape: ${COPY_ZONE_PER_FORMAT.landscape.description}
- Portrait: ${COPY_ZONE_PER_FORMAT.portrait.description}

5-COMPONENT PROMPT CONSTRUCTION
Write each prompt as a NATURAL NARRATIVE PARAGRAPH in English (Gemini performs better on English prompts), 100-200 words. Build from these 5 components flowing together — DO NOT write them as a labeled list:

1. SUBJECT — Specific physical characteristics of the product: shape, bottle/package form, label colors, distinctive details. If the product category is "Portuguese red wine", be concrete: "a dark Burgundy-shape bottle of Portuguese red wine, deep ruby contents visible against the light, weathered paper label with traditional Portuguese typography".
2. ACTION / STATE — What is happening (being poured, standing, being lifted). Present-tense verbs.
3. LOCATION / CONTEXT — Specific real place, time of day, atmospheric conditions. Not "somewhere Mediterranean" — "standing on a sun-weathered stone wall above the Douro river valley at golden hour, terraced vineyards falling away into the haze below".
4. COMPOSITION — Camera perspective, framing, the copy-zone placement per format rule above.
5. STYLE — Name a real camera (Sony A7R IV, Canon EOS R5, Fujifilm X-T5, Leica Q3) + focal length + aperture. Name a prestigious publication anchor ("Kinfolk magazine editorial", "Monocle travel feature", "Architectural Digest still-life", "National Geographic cover"). Specify lighting source, direction, quality. NEVER the word "photorealistic" — describe the camera and film instead.

FACES POLICY (hard rule — applied to ALL ${MOTIFS_PER_PACKAGE * FORMATS_PER_MOTIF.length} prompts)
{{FACES_RULE}}

GOOGLE ADS PMAX HARD CONSTRAINTS
- NEVER include any visible text, written words, labels as OVERLAYS, quotes, or UI text in the image (product label text is allowed and desirable, but no additional copy baked in).
- NEVER include a corporate logo stamp or watermark.
- NEVER include price stamps, "SALE", "20% OFF", or promotional badges.
- The ${MOTIFS_PER_PACKAGE} selected archetypes must feel VISUALLY DIFFERENT from each other — different framings, different moods, different color emphasis — not variations of the same shot.

BANNED KEYWORDS (Google's guide explicitly penalises these — using them degrades output)
Never write: "photorealistic", "hyperrealistic", "ultra-realistic", "8K", "4K", "ultra HD", "high resolution", "masterpiece", "ultra detailed", "highly detailed", "best quality", "award-winning", "trending on artstation".
Instead: name the camera/lens/film stock, and use a prestigious publication anchor.

POSITIVE FRAMING (Gemini has NO negative-prompt support)
Instead of "no blur" write "tack-sharp". Instead of "no clutter" write "clean, uncluttered". Instead of "not dark" write "brightly lit". For critical exclusions use ALL CAPS "NEVER" emphasis inline.

RESPONSE FORMAT
Respond with ONLY valid JSON, exactly this schema:
{
  "selectedArchetypes": ["Product-in-Place", "Product-Macro", "Product-in-Use", "Product-Tabletop"],
  "prompts": [
    {
      "motifIndex": 0,
      "archetype": "Product-in-Place",
      "motifName": "short descriptive name, German ok",
      "format": "square",
      "concept": "1-line summary of what's shown",
      "prompt": "full English narrative prompt, 100-200 words, all 5 components fused naturally"
    }
    // ... 12 entries total: 4 motifs × (square, landscape, portrait)
  ]
}`;

function buildSystem(facesPolicy: FacesPolicy): string {
  return SYSTEM.replace("{{FACES_RULE}}", FACES_POLICY_PROMPT[facesPolicy]);
}

export async function generatePrompts(
  context: BrandContext,
  clusters: Cluster[],
  apiKey: string,
  facesPolicy: FacesPolicy
): Promise<ImagePrompt[]> {
  const client = new Anthropic({ apiKey });

  const clusterHints = clusters
    .slice(0, 5)
    .map(
      (c) =>
        `- ${c.name}: ${c.psychology} (Audiences: ${c.audiences.slice(0, 2).join(", ")})`
    )
    .join("\n");

  const userText = `BRAND BRIEF

Brand: ${context.ci.brandName}
Industry: ${context.products.industry}

VISUAL IDENTITY
  Primary brand colors (hex): ${context.ci.primaryColors.join(", ")}
  Accent colors (hex): ${context.ci.accentColors.join(", ")}
  Tone: ${context.ci.tone}
  Visual style: ${context.ci.visualStyle}

PRODUCTS
  Range: ${context.products.productRange}
  Hero products: ${context.products.heroProducts.join(" | ")}
  USPs: ${context.products.usps.join(" | ")}

AUDIENCE
  Demographics: ${context.audience.demographics}
  Psychographics: ${context.audience.psychographics}
  Usage context: ${context.audience.context}
  Visual mood they respond to: ${context.audience.visualMood}

EXISTING MARKETING ANGLES (inspiration, not binding):
${clusterHints || "—"}

FORMATS per motif (composed separately, NOT cropped from each other):
${FORMATS_PER_MOTIF.map(
  (f) =>
    `  - ${IMAGE_FORMATS[f].label} (${IMAGE_FORMATS[f].aspect}, ${IMAGE_FORMATS[f].width}×${IMAGE_FORMATS[f].height})`
).join("\n")}

Weave the brand's primary hex colors into the scene description where natural (e.g. through wall tones, light temperature, props, product label). Every prompt product-forward. Build in the copy-zone per format. Respect the faces policy strictly.

Now produce exactly ${MOTIFS_PER_PACKAGE * FORMATS_PER_MOTIF.length} prompts.`;

  const message = await client.messages.create({
    model: CLAUDE_MODELS.promptEngineer,
    max_tokens: 12000,
    system: buildSystem(facesPolicy),
    messages: [{ role: "user", content: userText }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const parsed = parseAgentJson<{
    selectedArchetypes: string[];
    prompts: ImagePrompt[];
  }>("agent-prompt-engineer", text);

  const expected = MOTIFS_PER_PACKAGE * FORMATS_PER_MOTIF.length;
  if (!Array.isArray(parsed.prompts) || parsed.prompts.length !== expected) {
    throw new Error(
      `Prompt-Engineer lieferte ${parsed.prompts?.length ?? 0}/${expected} Prompts`
    );
  }
  return parsed.prompts;
}
