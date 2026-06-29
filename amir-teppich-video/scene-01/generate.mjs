#!/usr/bin/env node
// Diese Datei ist DEPRECATED.
// Bitte den generischen Renderer am Top-Level verwenden:
//
//     node amir-teppich-video/render.mjs scene-01
//
// Vorteile von render.mjs:
//   - Funktioniert für alle Scenes (scene-01, scene-01-wide, scene-02, ...)
//   - Multi-Image-Referenzen für Charakter-Konsistenz (--ref oder references/-Folder)
//   - Default n=1, Timeout 240s, robusterer Retry

console.error("ℹ︎  Diese Datei ist deprecated. Bitte verwenden:");
console.error("");
console.error("     node amir-teppich-video/render.mjs scene-01");
console.error("");
process.exit(1);
