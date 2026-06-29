# Motion- / Text-Animations-Referenzen (Envato Elements)

> Stil-Referenzen für künftige Text-/Motion-Arbeit (Amir-Spots, SGF, etc.).
> Gespeichert: 02.06.2026. Quelle: Envato Elements (Login/Abo zum Download nötig).

| Stil | Beschreibung | Link |
|---|---|---|
| **Kinetic Typography** ⭐ | **Wird demnächst genutzt.** Kinetische Typo-Animation — bewegter, rhythmischer Text. | https://elements.envato.com/kinetic-typography-A7RUM9B |
| Arabica — Animated Arabic Typeface | Animierte arabische/orientalische Schrift — passt thematisch zu Amir Teppiche / Orient-Look. | https://elements.envato.com/arabica-animated-arabic-typeface-VE4JGAR |
| Text Effect | Allgemeine Text-Effekt-Vorlage. | https://elements.envato.com/text-effect-VWSFZNV |

## Nutzungs-Workflow (wenn's losgeht)
1. Robert lädt die Vorlage(n) über sein Envato-Abo herunter (oder gibt Key-Frames/Screenshots).
2. Stil **präzise analysieren** (Typo, Layout, EINE Signature-Bewegung, Timing) — siehe `references/motion-design-remotion.md` der video-studio Skill.
3. In Remotion nachbauen/adaptieren (Composer: `/Users/robert.miler/OpenMontage/remotion-composer`).

> Hinweis: Direkter Download durch mich ist nicht möglich (Paywall/Login). Wenn du die Dateien
> bereitstellst oder mich per Chrome-Extension einloggst, kann ich sie analysieren und den Look bauen.

---

## Stil-Analyse: „Kinetic Titles" (ionestudio) — `refs-kinetic-typo/`

Preview-Render des AE-Templates (1920×1080, 50 fps, ~228 s, Watermark). Quelldatei +
Key-Frames in `refs-kinetic-typo/`. **AE-Projekt nicht direkt nutzbar (bräuchte After Effects)
→ wir bauen den Look in Remotion nach** (Brand-Farben, eigener Text, alle Formate, wiederverwendbar).

**Die Signatur des Looks:**
- **Backdrop:** dunkle, cinematische 3D-Umgebung — abstrakte „Häuserschlucht"/Tunnel aus dunkel-blaugrauen Blöcken in starker Perspektive, leichte Reflexionen, langsame Kamerafahrt/Push.
- **Typo:** schwere **VERSALIEN**, breiter/condensed Bold-Grotesk (Anton/Druk-Anmutung).
- **Farbsystem:** weiß als Basis + **EIN Akzentwort pro Zeile** in **Cyan/Teal** oder **Magenta/Pink**, mit **Neon-Glow** auf dem Akzent; dünne **Akzent-Unterstreichung**.
- **Bewegung (das Besondere):** Wörter fliegen in **3D-Winkeln mit Motion-Blur** + Rotation herein, rasten auf den Beat ein; 3-Zeilen-Stacks mit alternierendem Akzent; schnelles, punchiges Timing; Kamera bewegt sich durch den 3D-Raum.
- **Layouts:** (a) 3-Zeilen-Stack mit einer Akzentzeile, (b) Titel + Unterstrich + kursiver Subtitle (Lower-Third).

**Für SGF/Amir-Rebuild:** Akzent → **SGF-Blau `#3974f2`** (und/oder Amir-Terracotta `#9e3b2e`) statt
Cyan/Magenta; weiße Basis; Glow auf Akzent; dunkler Backdrop (SGF-Navy `#111a2d` oder dunkle
Teppich-Textur). Beat-synchrones Reveal + Motion-Blur als Kern-Move.

---

## Stil-Analyse: „Text Effect" (Outline Draw-on) — `refs-kinetic-typo/text-effect-outline-draw-preview.mp4`

960×540, 25 fps. Key-Frames: `texteffect_kf1.png` (easily), `texteffect_kf2.png` (OR).

**Die Signatur:** **Hohle Outline-Buchstaben (Kontur, kein Fill), die sich aufzeichnen** —
animierte **farbige Vorderkante** (rot/weiß) läuft die Kontur entlang („write-on"/`strokeDashoffset`).
Sauber, modern, minimal. Doppelkontur/Linien-Look, weicher Schlagschatten. Hintergründe: flache
Markenfläche ODER weicher **Gradient** (z. B. Orange→Magenta). Schrift: humanistische Sans, teils
kursiv. Sehr ruhig/edel — gut für kurze Claims/Einzelwörter.

**Rebuild (Remotion):** SVG-Text als `path`, `pathLength=1`, `strokeDashoffset` 1→0 animieren;
optional heller Leading-Edge-Dash. Brand-Gradient (SGF-Blau→Navy oder Amir-Terracotta→Creme).
→ Stilname-Vorschlag: **`OutlineDrawSpot`**.

---

## Stil-Analyse: „Arabica — Animated Arabic Typeface" — `refs-kinetic-typo/arabica-animated-arabic-typeface-preview.mp4`

960×540, 30 fps. Key-Frames: `arabica_kf1.png` (Logo+Ornamente), `arabica_kf2.png` (Glyphenset).

**Was es ist:** eine **animierte arabische Schrift** (kein After-Effects-Title, sondern ein
**Font-Produkt**) mit lateinischer Companion „Arabica". Farbwelt: **Plum/Aubergine-Hintergrund,
Terracotta/Gold-Glyphen**, dezente Eck-Ornamente (orange Flourishes). Wörter blenden mit leichtem
Motion-Blur ein. **Thematisch ideal für Amir Teppiche / Orient-Look.**

**Wichtig:** Um die arabischen Glyphen wirklich zu nutzen, braucht es die **Font-Dateien aus dem
Envato-Download** (im Paket enthalten) → in Remotion via `@font-face` einbinden. Die Farbwelt
(Plum + Gold/Terracotta + Ornamente) lässt sich auch ohne den Font als „Orient-Motiv" adaptieren.
→ Einsatz: Akzent-/Logo-Typo für Amir, nicht für SGF-Performance-Content.
