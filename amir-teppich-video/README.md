# Amir Teppiche — Video-Workflow

Auftakt-Spot für Google Ads. Photoreal cinematic, augenzwinkernd, ~15–20s.

→ Konzept & Beats: [STORYBOARD.md](./STORYBOARD.md)

---

## Workflow

Pro Szene: **Still iterieren → Charakter-Konsistenz checken → Kling-Animation → schneiden.**

Alle Stills werden mit **Nano Banana 2** (`gemini-3.1-flash-image-preview`) generiert. API-Key wird aus `.env.local` im Projekt-Root gezogen.

---

## Image-to-Video mit Kling

Sobald ein Still sitzt, wird's mit **Kling** zum 5- oder 10-Sekunden-Clip animiert. Setup-Voraussetzung: Kling-Keys müssen in `.env.local` stehen:

```
KLING_ACCESS_KEY=...
KLING_SECRET_KEY=...
```

(Beide stehen in `media-api-keys/api-keys.txt`. Einmal rüberkopieren.)

Befehl pro Szene:

```bash
# Clip 1 — Close-Up, statische Kamera, Wind macht alles
node amir-teppich-video/kling.mjs scene-01 --camera static

# Clip 2 — Wide, langsamer Forward-Push
node amir-teppich-video/kling.mjs scene-01-wide --camera forward
```

Default-Settings: **Pro-Modus, 5 Sekunden, Kling v2-master**. Das Script nimmt automatisch das neueste `still-vNN.jpg` aus dem Scene-Folder als Start-Frame, polled die Kling-Queue alle 10s und lädt das fertige MP4 als `clip-vNN.mp4`.

### Camera-Presets

| Preset           | Effekt                                  |
|------------------|------------------------------------------|
| `static`         | Komplett still, AI folgt Motion-Prompt   |
| `forward`        | Sanfter Vorwärts-Push / Drohne-Catchup   |
| `forward-strong` | Aggressiver Push                          |
| `back`           | Pull-Back                                |
| `up` / `down`    | Tilt-Bewegung                            |
| `left` / `right` | Pan                                      |

### Andere Defaults überschreiben

```bash
node amir-teppich-video/kling.mjs scene-01-wide \
  --camera forward \
  --duration 10 \
  --mode std \
  --model kling-v1-6 \
  --from amir-teppich-video/scene-01-wide/still-v01.jpg
```

### Workflow zum Spot zusammenschneiden

Nach dem Kling-Run liegen `clip-vNN.mp4` in den jeweiligen Scene-Ordnern. Schnitt + Sound in DaVinci/Final Cut/Premiere — oder als Quick-Test direkt mit ffmpeg:

```bash
# Beide Clips hart zusammenschneiden (Concat)
ffmpeg -i amir-teppich-video/scene-01/clip-v01.mp4 \
       -i amir-teppich-video/scene-01-wide/clip-v01.mp4 \
       -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0" \
       amir-teppich-video/test-cut-v01.mp4
```

---

## Image-Rendering (alle Szenen)

Generischer Renderer am Top-Level. Vom Projekt-Root (`260412-website-sgf/`) aus:

```bash
node amir-teppich-video/render.mjs <scene-folder>
```

Default: 1 Variante, Timeout 240s, automatischer Retry bei transienten Fehlern.

### Charakter-Konsistenz über Szenen — Multi-Image-Referenzen

**Das ist der Schlüssel** zu einem konsistenten Look über alle Szenen. Nano Banana 2 nimmt bis zu **5 Referenzbilder** mit in den Prompt — Gesicht, Outfit, Carpet-Pattern etc. werden in Folgeszenen identisch übernommen.

Zwei Wege, eine Referenz mitzugeben:

```bash
# Variante 1: explizit per CLI-Argument (Pfad relativ zum Projekt-Root)
node amir-teppich-video/render.mjs scene-01-wide \
  --ref amir-teppich-video/scene-01/still-v01-a.jpg

# Variante 2: automatisches Pickup aus <scene-folder>/references/
# Lege Referenzbilder einfach in den references/-Subfolder, sie werden
# automatisch eingelesen.
mkdir -p amir-teppich-video/scene-01-wide/references
cp amir-teppich-video/scene-01/still-v01-a.jpg \
   amir-teppich-video/scene-01-wide/references/character-anchor.jpg
node amir-teppich-video/render.mjs scene-01-wide
```

### Mehrere Varianten

```bash
node amir-teppich-video/render.mjs scene-01-wide --n 2
```

### Andere Aspect Ratio

```bash
node amir-teppich-video/render.mjs scene-02 --aspect 21:9
```

Unterstützt von Nano Banana 2: `1:1`, `16:9`, `9:16`, `4:5`, `5:4`, `3:2`, `2:3`, `21:9`, u.a.

### Fallback auf altes Modell

```bash
node amir-teppich-video/render.mjs scene-01 --model flash1
```

### Längeren Timeout setzen (falls's hängt)

Default ist 10 Minuten (600000ms) pro Versuch — bei 3 Retries also bis zu ~30 Minuten gesamt. Wenn die API gerade richtig zäh ist, hochsetzen:

```bash
node amir-teppich-video/render.mjs scene-02 --timeout 900000   # 15 Minuten pro Versuch
```

---

## Iterationsschleife (mit Claude/Cowork)

1. **`node ... generate.mjs`** ausführen → Still wird in `scene-01/` abgelegt
2. **Cowork öffnet das Bild** und gibt Feedback
3. **Prompt in `PROMPT.txt` anpassen** (Claude macht das, du sagst nur was anders soll)
4. Neuer Run → nächste Version

Sobald ein Still sitzt, geht es weiter zu **Kling Image-to-Video**.

---

## Ordnerstruktur

```
amir-teppich-video/
├── README.md                ← du bist hier
├── STORYBOARD.md            ← alle 3 Szenen
├── render.mjs               ← generischer Renderer (alle Szenen)
├── scene-01/                ← Close-Up Gesicht (✓ fertig)
│   ├── PROMPT.txt
│   ├── still-v01-a.jpg      ← Hero-Still
│   └── still-v01-c.jpg, still-v02-a.jpg
├── scene-01-wide/           ← Wide-Reveal mit Cargo
│   ├── PROMPT.txt
│   ├── references/          ← Charakter-Anker (still-v01-a)
│   └── still-vNN.jpg
├── scene-02-berlin/         ← Approach Berlin (kommt)
└── scene-03-friedrichshain/ ← Auslieferung (kommt)
```

---

## Hinweise

- **Kosten:** Nano Banana 2 ist auf Paid-Tier ~$0.04 pro Bild bei 2K. 10 Varianten = ca. 40 Cent.
- **Rate-Limit:** ~5-15 Requests/Min. Bei 429 wartet das Script kurz und retryed.
- **Safety-Filter:** Wenn ein Prompt blockt (`PROHIBITED_CONTENT`), Prompt entschärfen — meist hilft Wegnehmen von zu spezifischen Gesichtsmerkmalen oder Markennamen.
