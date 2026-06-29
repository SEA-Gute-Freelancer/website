import sharp from "sharp";
import {
  IMAGE_FORMATS,
  NANO_BANANA_ASPECT,
  NANO_BANANA_MODEL,
  NANO_BANANA_RESOLUTION,
} from "./config";
import type { ImageFormat } from "./config";

// Google Gemini Image Generation via `:generateContent` — Nano Banana 2.
// Doku: https://ai.google.dev/gemini-api/docs/image-generation
//
// Unterschied zu Imagen: Response-Parts sind inlineData-base64 in
// candidates[0].content.parts[] (statt `predictions[].bytesBase64Encoded`).
// Wir können jetzt responseModalities=["IMAGE"] setzen und imageConfig
// direkt mitgeben (aspectRatio + imageSize).

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

interface GenerateContentResponse {
  candidates?: {
    content?: {
      parts?: Array<{
        text?: string;
        inlineData?: { mimeType?: string; data?: string };
        inline_data?: { mime_type?: string; data?: string };
      }>;
    };
    finishReason?: string;
  }[];
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; code?: number; status?: string };
}

// Exponential Backoff bei 429. Nano Banana 2 Preview hat auf Fresh Paid-
// Tier ähnliche RPM-Limits wie Imagen (5-15 RPM). 6s → 12s → 24s → 48s → 96s.
const MAX_RATE_LIMIT_RETRIES = 5;
const BACKOFF_BASE_MS = 6000;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function generateImage(
  prompt: string,
  format: ImageFormat,
  apiKey: string
): Promise<Buffer> {
  const url = `${GEMINI_BASE}/${NANO_BANANA_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio: NANO_BANANA_ASPECT[format],
        imageSize: NANO_BANANA_RESOLUTION,
      },
    },
  };

  for (let attempt = 0; attempt <= MAX_RATE_LIMIT_RETRIES; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120_000),
    });

    if (res.status === 429 && attempt < MAX_RATE_LIMIT_RETRIES) {
      const delay = BACKOFF_BASE_MS * Math.pow(2, attempt);
      await sleep(delay);
      continue;
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      // 400 FAILED_PRECONDITION = Billing nicht aktiviert. Nicht retryen.
      if (res.status === 400 && errText.includes("FAILED_PRECONDITION")) {
        throw new Error(
          `Nano Banana: Billing nicht aktiviert. https://aistudio.google.com/apikey`
        );
      }
      throw new Error(
        `Nano Banana HTTP ${res.status}: ${errText.slice(0, 300)}`
      );
    }

    const data = (await res.json()) as GenerateContentResponse;

    // Prompt-Feedback (Safety-Block) landet vor Candidates
    const blockReason = data.promptFeedback?.blockReason;
    if (blockReason) {
      throw new Error(`Nano Banana: Prompt blockiert (${blockReason})`);
    }

    const candidate = data.candidates?.[0];
    if (!candidate) {
      throw new Error(
        `Nano Banana: Kein Kandidat zurückgegeben${
          data.error?.message ? ` — ${data.error.message}` : ""
        }`
      );
    }

    // finishReason IMAGE_SAFETY / PROHIBITED_CONTENT / SAFETY → nicht retry-bar
    const finish = candidate.finishReason;
    if (finish && finish !== "STOP" && finish !== "MODEL_LENGTH") {
      throw new Error(`Nano Banana Safety-Filter: ${finish}`);
    }

    const parts = candidate.content?.parts ?? [];
    // API gibt wahlweise camelCase (inlineData) oder snake_case (inline_data).
    // Wir akzeptieren beides, neue REST-Responses sind camelCase.
    const imagePart = parts.find(
      (p) => p.inlineData?.data || p.inline_data?.data
    );
    const base64 =
      imagePart?.inlineData?.data ?? imagePart?.inline_data?.data ?? null;

    if (!base64) {
      throw new Error(
        `Nano Banana: Kein Bild in Response (finishReason=${finish ?? "unknown"})`
      );
    }

    const raw = Buffer.from(base64, "base64");
    const target = IMAGE_FORMATS[format];
    // Auf exakte PMax-Pixel bringen: Nano Banana liefert 2K ≈ 2048px Long-
    // Side in der gewählten Aspect-Ratio. Cover-Crop + Resize auf Zielmaße.
    return sharp(raw)
      .resize(target.width, target.height, {
        fit: "cover",
        position: "attention",
      })
      .jpeg({ quality: 90, mozjpeg: true })
      .toBuffer();
  }

  throw new Error(`Nano Banana 429 nach ${MAX_RATE_LIMIT_RETRIES + 1} Versuchen`);
}
