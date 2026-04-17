import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// ─── URL Validation ───────────────────────────────────────────────────────────

function isSafeUrl(raw: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
  const host = parsed.hostname.toLowerCase();
  if (host === "localhost") return false;
  // Block private / link-local IPv4 ranges and IPv6 loopback
  const privateV4 = /^(10\.|127\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/;
  if (privateV4.test(host)) return false;
  if (host === "::1" || host === "[::1]") return false;
  return true;
}

// ─── URL Fetcher via Jina AI Reader ──────────────────────────────────────────
// jina.ai/reader converts any URL to clean markdown text, bypassing bot protection

type ScrapeStatus = "success" | "fallback" | "failed";

async function fetchPageContent(url: string): Promise<{ content: string; status: ScrapeStatus }> {
  // Try Jina AI Reader first
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const res = await fetch(jinaUrl, {
      headers: { "Accept": "text/plain", "X-No-Cache": "true" },
      signal: AbortSignal.timeout(15000),
    });

    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 200) {
        const content = text.length > 8000 ? text.slice(0, 8000) + "\n[...]" : text;
        return { content, status: "success" };
      }
    }
  } catch { /* fall through */ }

  // Fallback: direct fetch
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "de,en;q=0.9",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      const html = await res.text();
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s{3,}/g, "\n")
        .trim();
      const content = text.length > 8000 ? text.slice(0, 8000) + "\n[...]" : text;
      return { content, status: "fallback" };
    }
  } catch { /* fall through */ }

  return {
    content: "[Seite konnte nicht geladen werden — Kampagne basiert auf Domainnamen und Branchenwissen]",
    status: "failed",
  };
}

// Simple in-memory rate limiting — only applied when using the default (free) key
const ipRequests: Record<string, { count: number; resetAt: number }> = {};
const MAX_PER_DAY = 1;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequests[ip];
  if (!record || now > record.resetAt) {
    ipRequests[ip] = { count: 1, resetAt: now + 86_400_000 };
    return true;
  }
  if (record.count >= MAX_PER_DAY) return false;
  record.count++;
  return true;
}

const SYSTEM_PROMPT = `You are an elite Google Ads Performance Max (PMax) campaign strategist with deep expertise in conversion psychology, audience segmentation, and Google Ads best practices.

Your task: Analyze the given landing page URL and build a complete, production-ready PMax campaign structure.

Return ONLY a valid JSON object — no markdown, no code fences, no extra text.

JSON structure:
{
  "analysis": "2-3 paragraph strategic analysis of the business, unique value proposition, and primary conversion goals",
  "clusters": [
    {
      "name": "Descriptive asset group name",
      "psychology": "The core psychological driver / buying motivation for this specific audience segment",
      "searchThemes": ["at least 15 highly specific, conversion-intent search themes"],
      "audiences": ["5 relevant Google Ads audience segments (in-market, affinity, or custom)"],
      "customUrls": ["5-8 URLs: competitor sites, industry portals, research sites, forums, or funding pages the audience visits during decision-making"],
      "copy": {
        "shortHeadlines": ["exactly 15 headlines — EACH MUST BE 30 CHARACTERS OR FEWER"],
        "longHeadlines": ["exactly 5 headlines — EACH MUST BE 90 CHARACTERS OR FEWER"],
        "descriptions": ["exactly 5 descriptions — EACH MUST BE 90 CHARACTERS OR FEWER"]
      }
    }
  ]
}

CRITICAL RULES:
- Generate exactly 5 asset groups
- shortHeadlines: max 30 characters each — count carefully
- longHeadlines: max 90 characters each
- descriptions: max 90 characters each
- searchThemes: minimum 15 per cluster, use natural language phrases not just keywords
- Make every copy variation unique — no repetition across clusters
- Respond in the language specified by the user`;

const USER_PROMPT = (url: string, audience: string, language: string, pageContent: string) =>
  `Create a complete PMax campaign for this landing page: ${url}
Target audience: ${audience}
Response language: ${language}

Here is the actual content scraped from the landing page — use this as your primary source of truth:
--- PAGE CONTENT START ---
${pageContent}
--- PAGE CONTENT END ---

Based on the real page content above, generate 5 highly differentiated asset groups with unique psychological angles, search themes, and ad copy. Ground every element in the actual product, service, and messaging found on the page.`;

async function callAnthropic(
  apiKey: string,
  url: string,
  audience: string,
  language: string,
  pageContent: string
): Promise<string> {
  const client = new Anthropic({ apiKey });
  const model =
    apiKey === process.env.ANTHROPIC_API_KEY
      ? "claude-haiku-4-5-20251001"
      : "claude-sonnet-4-6";

  const message = await client.messages.create({
    model,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: USER_PROMPT(url, audience, language, pageContent) }],
  });

  return message.content[0].type === "text" ? message.content[0].text : "";
}

async function callGemini(
  apiKey: string,
  url: string,
  audience: string,
  language: string,
  pageContent: string
): Promise<string> {
  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ parts: [{ text: USER_PROMPT(url, audience, language, pageContent) }] }],
    generationConfig: { responseMimeType: "application/json" },
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } }).error?.message ||
        `Gemini HTTP ${res.status}`
    );
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: {
    url: string;
    audience: string;
    language: string;
    userApiKey?: string;
    provider?: "anthropic" | "gemini";
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { url, audience, language, userApiKey, provider } = body;

  if (!url || !language) {
    return NextResponse.json(
      { error: "URL und Sprache sind erforderlich." },
      { status: 400 }
    );
  }

  if (!isSafeUrl(url)) {
    return NextResponse.json(
      { error: "Ungültige oder nicht erlaubte URL." },
      { status: 400 }
    );
  }

  // Rate limit only applies when using the free default key
  const usingOwnKey = Boolean(userApiKey);
  if (!usingOwnKey && !checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Tageslimit erreicht (1/Tag). Eigenen API Key nutzen für unlimitierten Zugriff." },
      { status: 429 }
    );
  }

  try {
    const effectiveKey =
      userApiKey || (process.env.ANTHROPIC_API_KEY ?? "");
    const effectiveProvider =
      usingOwnKey && provider === "gemini" ? "gemini" : "anthropic";

    if (!effectiveKey) {
      return NextResponse.json(
        { error: "Kein API Key konfiguriert." },
        { status: 500 }
      );
    }

    // Fetch actual page content before calling AI
    const { content: pageContent, status: scrapeStatus } = await fetchPageContent(url);

    const rawText =
      effectiveProvider === "gemini"
        ? await callGemini(effectiveKey, url, audience, language, pageContent)
        : await callAnthropic(effectiveKey, url, audience, language, pageContent);

    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const result = JSON.parse(cleaned);

    if (!result?.clusters || !Array.isArray(result.clusters)) {
      throw new Error("Ungültige Antwortstruktur von der KI.");
    }

    return NextResponse.json({ ...result, scrapeStatus });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
    console.error("PMax API error:", msg);
    return NextResponse.json(
      { error: `Generierung fehlgeschlagen: ${msg}` },
      { status: 500 }
    );
  }
}
