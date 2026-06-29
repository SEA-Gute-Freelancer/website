#!/usr/bin/env node
// =====================================================================
//  Amir Teppiche — Generic Scene Renderer
//  Nano Banana 2 (gemini-3.1-flash-image-preview) via Gemini REST API.
//
//  Liest <scene-folder>/PROMPT.txt + optional <scene-folder>/references/*
//  (Multi-Image-Referenzen für Charakter-Konsistenz) und speichert das
//  Ergebnis versioniert als <scene-folder>/still-vNN.jpg.
//
//  Multi-Image-Referenz: Nano Banana 2 nimmt bis zu 5 Eingabebilder als
//  Stil-/Charakter-Anker mit. Alle Bilder im references/ Subfolder werden
//  automatisch eingelesen. Zusätzlich via --ref <pfad> möglich.
//
//  Verwendung (vom Projekt-Root aus):
//      node amir-teppich-video/render.mjs scene-01
//      node amir-teppich-video/render.mjs scene-01-wide
//      node amir-teppich-video/render.mjs scene-01-wide --n 2
//      node amir-teppich-video/render.mjs scene-01-wide --ref amir-teppich-video/scene-01/still-v01-a.jpg
//      node amir-teppich-video/render.mjs scene-02 --aspect 21:9 --model flash1
// =====================================================================

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// ───── CLI-Args ──────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function getOpt(name, dflt) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : dflt;
}
function getAllOpts(name) {
  const out = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === `--${name}` && i + 1 < argv.length) out.push(argv[i + 1]);
  }
  return out;
}

const SCENE_FOLDER_ARG = argv.find((a) => !a.startsWith("--") && !argv[argv.indexOf(a) - 1]?.startsWith("--"));
const SCENE_FOLDER_REL = SCENE_FOLDER_ARG;
if (!SCENE_FOLDER_REL) {
  console.error("✗ Scene-Folder fehlt. Beispiel:");
  console.error("    node amir-teppich-video/render.mjs scene-01-wide");
  process.exit(1);
}

const SCENE_DIR = path.resolve(__dirname, SCENE_FOLDER_REL);
const ASPECT = getOpt("aspect", "16:9");
const MODEL_KEY = getOpt("model", "flash2");
const N_VARIANTS = parseInt(getOpt("n", "1"), 10);
const BASE_NAME = getOpt("base", "still");
const REQ_TIMEOUT_MS = parseInt(getOpt("timeout", "600000"), 10);
const CLI_REFS = getAllOpts("ref");

const MODEL_MAP = {
  flash2: "gemini-3.1-flash-image-preview", // Nano Banana 2
  flash1: "gemini-2.5-flash-image",          // Fallback
};
const MODEL = MODEL_MAP[MODEL_KEY] ?? MODEL_MAP.flash2;

// ───── Env laden ─────────────────────────────────────────────────────
async function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, ".env.local");
  try {
    const raw = await fs.readFile(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (!m) continue;
      const val = m[2].replace(/^["']|["']$/g, "");
      if (!process.env[m[1]]) process.env[m[1]] = val;
    }
  } catch {
    console.error(`! .env.local nicht gefunden (${envPath})`);
  }
}

// ───── Referenzbilder einsammeln ─────────────────────────────────────
async function collectReferences() {
  const refs = [];
  // 1. CLI-Refs (relativ zum PROJECT_ROOT)
  for (const rel of CLI_REFS) {
    const abs = path.resolve(PROJECT_ROOT, rel);
    refs.push(abs);
  }
  // 2. Auto-Pickup aus <scene-folder>/references/
  const refsDir = path.join(SCENE_DIR, "references");
  try {
    const files = await fs.readdir(refsDir);
    for (const f of files) {
      if (/\.(jpe?g|png|webp)$/i.test(f)) {
        refs.push(path.join(refsDir, f));
      }
    }
  } catch {
    // kein references/ Folder → ok
  }

  // Dedupe + max 5 (Nano Banana 2 Limit)
  const unique = [...new Set(refs)].slice(0, 5);

  // Lade Inhalt + Mime
  const out = [];
  for (const p of unique) {
    try {
      const data = await fs.readFile(p);
      const ext = path.extname(p).toLowerCase();
      const mime =
        ext === ".png" ? "image/png" :
        ext === ".webp" ? "image/webp" :
        "image/jpeg";
      out.push({ path: p, base64: data.toString("base64"), mime });
    } catch (e) {
      console.error(`  ! Referenz nicht lesbar: ${p} (${e.message})`);
    }
  }
  return out;
}

// ───── Versionierung ─────────────────────────────────────────────────
async function nextVersion(dir, base) {
  let files = [];
  try { files = await fs.readdir(dir); } catch {}
  const re = new RegExp(`^${base}-v(\\d+)`);
  const max = files
    .map((f) => f.match(re))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10))
    .reduce((a, b) => Math.max(a, b), 0);
  return max + 1;
}

// ───── Generate (mit Retry) ──────────────────────────────────────────
async function generate(prompt, refs, apiKey, outPath) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  // Referenzbilder kommen ZUERST in den parts-Array, dann der Prompt.
  const parts = [];
  for (const ref of refs) {
    parts.push({ inlineData: { mimeType: ref.mime, data: ref.base64 } });
  }
  parts.push({ text: prompt });

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: ASPECT, imageSize: "2K" },
    },
  };

  const MAX_ATTEMPTS = 3;
  const t0 = Date.now();
  let res = null;
  let lastErr = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQ_TIMEOUT_MS),
      });
      if ((res.status === 429 || res.status >= 500) && attempt < MAX_ATTEMPTS) {
        const delay = 4000 * Math.pow(2, attempt - 1);
        console.log(`    ↻ HTTP ${res.status}, retry in ${delay / 1000}s …`);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      break;
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_ATTEMPTS) {
        // Backoff verlängert (8s/16s) — gibt Google's Endpoint mehr Luft,
        // wenn er gerade unter Last steht.
        const delay = 8000 * Math.pow(2, attempt - 1);
        console.log(`    ↻ ${e.message}, retry in ${delay / 1000}s …`);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw new Error(`fetch failed nach ${MAX_ATTEMPTS} Versuchen: ${e.message}`);
      }
    }
  }

  if (!res) throw lastErr ?? new Error("Kein Response");

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    if (res.status === 400 && txt.includes("FAILED_PRECONDITION")) {
      throw new Error(
        `Billing nicht aktiviert für diesen Gemini-Key. Aktivieren: https://aistudio.google.com/apikey`
      );
    }
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 400)}`);
  }

  const data = await res.json();
  if (data.promptFeedback?.blockReason) {
    throw new Error(`Prompt blockiert: ${data.promptFeedback.blockReason}`);
  }
  const cand = data.candidates?.[0];
  if (!cand) throw new Error(`Keine Candidates: ${data.error?.message ?? "?"}`);
  const fin = cand.finishReason;
  if (fin && fin !== "STOP" && fin !== "MODEL_LENGTH") {
    throw new Error(`Safety-Filter: ${fin}`);
  }
  const pts = cand.content?.parts ?? [];
  const img = pts.find((p) => p.inlineData?.data || p.inline_data?.data);
  const b64 = img?.inlineData?.data ?? img?.inline_data?.data;
  if (!b64) throw new Error(`Kein Bild in Response (finish=${fin ?? "?"})`);

  await fs.writeFile(outPath, Buffer.from(b64, "base64"));
  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`  → ${path.relative(PROJECT_ROOT, outPath)}  (${sec}s)`);
}

// ───── Main ──────────────────────────────────────────────────────────
async function main() {
  await loadEnv();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("✗ GEMINI_API_KEY fehlt in .env.local");
    process.exit(1);
  }

  // PROMPT lesen
  const promptPath = path.join(SCENE_DIR, "PROMPT.txt");
  let prompt;
  try {
    prompt = (await fs.readFile(promptPath, "utf8")).trim();
  } catch (e) {
    console.error(`✗ PROMPT.txt nicht gefunden: ${promptPath}`);
    process.exit(1);
  }

  // Referenzen einsammeln
  const refs = await collectReferences();

  console.log(`Szene:     ${SCENE_FOLDER_REL}`);
  console.log(`Modell:    ${MODEL}`);
  console.log(`Aspect:    ${ASPECT}`);
  console.log(`Prompt:    ${path.relative(PROJECT_ROOT, promptPath)}`);
  console.log(`Refs:      ${refs.length > 0
    ? refs.map((r) => path.relative(PROJECT_ROOT, r.path)).join(", ")
    : "(keine)"}`);
  console.log(`Varianten: ${N_VARIANTS}`);
  console.log("");

  const v = await nextVersion(SCENE_DIR, BASE_NAME);
  for (let i = 0; i < N_VARIANTS; i++) {
    const suffix = N_VARIANTS > 1 ? `-${String.fromCharCode(97 + i)}` : "";
    const out = path.join(
      SCENE_DIR,
      `${BASE_NAME}-v${String(v).padStart(2, "0")}${suffix}.jpg`
    );
    try {
      await generate(prompt, refs, apiKey, out);
    } catch (e) {
      console.error(`  ✗ Variante ${i + 1}: ${e.message}`);
    }
  }
}

main().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
