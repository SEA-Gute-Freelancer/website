#!/usr/bin/env node
// =====================================================================
//  Amir Teppiche — Kling Image-to-Video Renderer
//  Kling 2.x / 3.x via api-singapore.klingai.com
//
//  Liest <scene-folder>/KLING.txt (Motion-Prompt) + nimmt das letzte
//  still-vNN.jpg aus dem Scene-Folder als Start-Frame, polled die
//  Task-Queue und lädt das fertige MP4 als clip-vNN.mp4 ab.
//
//  Verwendung (vom Projekt-Root aus):
//      node amir-teppich-video/kling.mjs scene-01 --camera static
//      node amir-teppich-video/kling.mjs scene-01-wide --camera forward
//
//  Wichtige Args:
//      --from <file>     Start-Frame überschreiben (default: latest still-vNN.jpg)
//      --camera <preset> static | forward | back | up | down | left | right (default: static)
//      --mode <pro|std>  Quality (default: pro)
//      --duration <5|10> Sekunden (default: 5)
//      --model <name>    Kling-Modell (default: kling-v2-master, override z.B. kling-v1-6)
//      --aspect <ratio>  16:9 | 9:16 | 1:1 (default: aus Bild abgeleitet)
//      --cfg <0..1>      Prompt-Followthrough (default: 0.5)
//
//  Keys aus .env.local:
//      KLING_ACCESS_KEY
//      KLING_SECRET_KEY
//      KLING_API_BASE    (optional, default api-singapore.klingai.com)
// =====================================================================

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

// ───── CLI-Args ──────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function getOpt(name, dflt) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : dflt;
}
const SCENE_FOLDER_ARG = argv.find(
  (a, i) => !a.startsWith("--") && !argv[i - 1]?.startsWith("--")
);
if (!SCENE_FOLDER_ARG) {
  console.error("✗ Scene-Folder fehlt. Beispiel:");
  console.error("    node amir-teppich-video/kling.mjs scene-01 --camera static");
  process.exit(1);
}
const SCENE_DIR = path.resolve(__dirname, SCENE_FOLDER_ARG);
const FROM_FILE = getOpt("from", null);
const CAMERA_PRESET = getOpt("camera", "static");
const MODE = getOpt("mode", "pro");
const DURATION = getOpt("duration", "5");
const MODEL = getOpt("model", "kling-v2-master");
const ASPECT_OVERRIDE = getOpt("aspect", null);
const CFG = parseFloat(getOpt("cfg", "0.5"));

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

// ───── JWT-Signing (HS256, Node built-in crypto) ─────────────────────
function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function signJWT(accessKey, secretKey) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = { iss: accessKey, exp: now + 1800, nbf: now - 5 };
  const data = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const sig = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest();
  return `${data}.${b64url(sig)}`;
}

// ───── Kamerasteuerung-Presets ───────────────────────────────────────
// Kling Camera Control: type + config.{horizontal,vertical,pan,tilt,roll,zoom}
// Werte -10 bis +10. "simple" = AI folgt dem Prompt.
function buildCameraControl(preset) {
  const zero = { horizontal: 0, vertical: 0, pan: 0, tilt: 0, roll: 0, zoom: 0 };
  switch (preset) {
    case "static":
      // AI folgt Prompt aber alle Werte 0 → so still wie möglich
      return { type: "simple", config: { ...zero } };
    case "forward":
      // Slow Forward-Push via Zoom-In (Kling interpretiert das als forward dolly)
      return { type: "zoom", config: { ...zero, zoom: 4 } };
    case "forward-strong":
      return { type: "zoom", config: { ...zero, zoom: 8 } };
    case "back":
    case "pull-back":
      return { type: "zoom", config: { ...zero, zoom: -4 } };
    case "up":
      return { type: "vertical", config: { ...zero, vertical: 4 } };
    case "down":
      return { type: "vertical", config: { ...zero, vertical: -4 } };
    case "left":
      return { type: "horizontal", config: { ...zero, horizontal: -4 } };
    case "right":
      return { type: "horizontal", config: { ...zero, horizontal: 4 } };
    default:
      return { type: "simple", config: { ...zero } };
  }
}

// ───── Source-Bild finden ────────────────────────────────────────────
async function findSourceImage() {
  if (FROM_FILE) {
    const abs = path.resolve(PROJECT_ROOT, FROM_FILE);
    await fs.access(abs);
    return abs;
  }
  let files = [];
  try {
    files = await fs.readdir(SCENE_DIR);
  } catch {
    throw new Error(`Scene-Folder existiert nicht: ${SCENE_DIR}`);
  }
  const stills = files
    .filter((f) => /^still-v\d+/i.test(f) && /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (stills.length === 0) {
    throw new Error(`Kein Start-Frame in ${SCENE_DIR} (suche still-vNN.jpg)`);
  }
  return path.join(SCENE_DIR, stills[stills.length - 1]);
}

async function imageToBase64(filePath) {
  const data = await fs.readFile(filePath);
  return data.toString("base64");
}

// ───── Versionierung Output ──────────────────────────────────────────
async function nextClipVersion(dir) {
  let files = [];
  try { files = await fs.readdir(dir); } catch {}
  const max = files
    .map((f) => f.match(/^clip-v(\d+)\.mp4$/i))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10))
    .reduce((a, b) => Math.max(a, b), 0);
  return max + 1;
}

// ───── Kling API Calls ───────────────────────────────────────────────
async function createTask(apiBase, jwt, body) {
  const url = `${apiBase}/v1/videos/image2video`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.code !== 0) {
    throw new Error(
      `Kling POST HTTP ${res.status} code=${data.code} msg=${data.message ?? "?"}`
    );
  }
  return data.data;
}

async function pollTask(apiBase, jwt, taskId) {
  const url = `${apiBase}/v1/videos/image2video/${taskId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Kling GET HTTP ${res.status}: ${data.message ?? "?"}`);
  }
  return data.data;
}

async function downloadVideo(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(outPath, buf);
  return buf.length;
}

// ───── Pretty Logging ────────────────────────────────────────────────
function ts() {
  return new Date().toLocaleTimeString("de-DE", { hour12: false });
}

// ───── Main ──────────────────────────────────────────────────────────
async function main() {
  await loadEnv();
  const ACCESS_KEY = process.env.KLING_ACCESS_KEY;
  const SECRET_KEY = process.env.KLING_SECRET_KEY;
  const API_BASE =
    process.env.KLING_API_BASE || "https://api-singapore.klingai.com";

  if (!ACCESS_KEY || !SECRET_KEY) {
    console.error("✗ KLING_ACCESS_KEY / KLING_SECRET_KEY fehlen in .env.local");
    console.error("  Trag sie ein (siehe media-api-keys/api-keys.txt):");
    console.error("    KLING_ACCESS_KEY=...");
    console.error("    KLING_SECRET_KEY=...");
    process.exit(1);
  }

  // KLING.txt lesen
  const promptPath = path.join(SCENE_DIR, "KLING.txt");
  let prompt;
  try {
    prompt = (await fs.readFile(promptPath, "utf8")).trim();
  } catch {
    console.error(`✗ KLING.txt nicht gefunden: ${promptPath}`);
    process.exit(1);
  }

  // Negative-Prompt (optional KLING_NEGATIVE.txt, sonst Default)
  let negativePrompt =
    "face morphing, eye distortion, melting hands, extra fingers, logo appearing, text appearing, watermark, captions, subtitles, sudden aspect ratio change, jump cut, flickering, frame skipping, frame freezing";
  try {
    const negPath = path.join(SCENE_DIR, "KLING_NEGATIVE.txt");
    negativePrompt = (await fs.readFile(negPath, "utf8")).trim();
  } catch {}

  // Start-Frame
  const sourcePath = await findSourceImage();
  const imageB64 = await imageToBase64(sourcePath);

  // Output-Pfad
  const v = await nextClipVersion(SCENE_DIR);
  const outPath = path.join(SCENE_DIR, `clip-v${String(v).padStart(2, "0")}.mp4`);

  const camera = buildCameraControl(CAMERA_PRESET);

  const body = {
    model_name: MODEL,
    image: imageB64,
    prompt,
    negative_prompt: negativePrompt,
    cfg_scale: CFG,
    mode: MODE,
    duration: String(DURATION),
    camera_control: camera,
  };
  if (ASPECT_OVERRIDE) body.aspect_ratio = ASPECT_OVERRIDE;

  console.log(`Szene:     ${SCENE_FOLDER_ARG}`);
  console.log(`Modell:    ${MODEL}`);
  console.log(`Modus:     ${MODE}`);
  console.log(`Dauer:     ${DURATION}s`);
  console.log(`Kamera:    ${CAMERA_PRESET} (${camera.type}, zoom=${camera.config.zoom ?? 0})`);
  console.log(`Start:     ${path.relative(PROJECT_ROOT, sourcePath)}`);
  console.log(`Output:    ${path.relative(PROJECT_ROOT, outPath)}`);
  console.log(`Prompt:    ${prompt.slice(0, 100)}${prompt.length > 100 ? "…" : ""}`);
  console.log("");

  // JWT signieren
  const jwt = signJWT(ACCESS_KEY, SECRET_KEY);

  // Task erstellen
  console.log(`[${ts()}] Task wird angelegt…`);
  const created = await createTask(API_BASE, jwt, body);
  const taskId = created.task_id;
  console.log(`[${ts()}] Task ID: ${taskId}`);
  console.log(`[${ts()}] Status: ${created.task_status}`);

  // Poll-Loop (alle 10s, max 20 Min)
  const MAX_POLL_MS = 20 * 60 * 1000;
  const POLL_INTERVAL_MS = 10000;
  const t0 = Date.now();
  let lastStatus = created.task_status;

  while (Date.now() - t0 < MAX_POLL_MS) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    // JWT alle 25 Minuten neu signieren (30 Min Lebensdauer)
    // Hier nicht nötig weil Polling max 20 Min, aber für Robustheit
    let pollJwt = jwt;
    if (Date.now() - t0 > 25 * 60 * 1000) pollJwt = signJWT(ACCESS_KEY, SECRET_KEY);

    let task;
    try {
      task = await pollTask(API_BASE, pollJwt, taskId);
    } catch (e) {
      console.log(`[${ts()}] Poll-Fehler: ${e.message} — try again`);
      continue;
    }

    if (task.task_status !== lastStatus) {
      console.log(`[${ts()}] Status: ${task.task_status}`);
      lastStatus = task.task_status;
    } else {
      const elapsed = Math.round((Date.now() - t0) / 1000);
      process.stdout.write(`\r[${ts()}] Status: ${task.task_status} (${elapsed}s)   `);
    }

    if (task.task_status === "succeed") {
      console.log("");
      const videos = task.task_result?.videos ?? [];
      if (videos.length === 0) {
        throw new Error("Status succeed aber keine Video-URL");
      }
      const videoUrl = videos[0].url;
      console.log(`[${ts()}] Download: ${videoUrl}`);
      const bytes = await downloadVideo(videoUrl, outPath);
      console.log(
        `[${ts()}] ✓ ${path.relative(PROJECT_ROOT, outPath)}  (${(bytes / 1024 / 1024).toFixed(1)} MB)`
      );
      return;
    }

    if (task.task_status === "failed") {
      console.log("");
      const msg = task.task_status_msg ?? task.task_result?.error?.message ?? "?";
      throw new Error(`Task failed: ${msg}`);
    }
  }

  throw new Error(`Timeout nach ${MAX_POLL_MS / 60000} Min — Task läuft evtl. noch (ID: ${taskId})`);
}

main().catch((e) => {
  console.error("");
  console.error("✗", e.message);
  process.exit(1);
});
