# Übergabe: 3 neue Motion-/Text-Stile → video-studio Skill + PMax-Builder

> Für den Chat, der den **PMax-Builder** bearbeitet. Ziel: drei von Robert ausgewählte
> Envato-Stile als wiederverwendbare **Remotion-Stile** in die Skill-Stilbibliothek aufnehmen
> und im PMax-Builder als auswählbare Text-/Title-Stile verfügbar machen.

## Kontext / wo was liegt
- **Referenzen (Videos + Key-Frames):** `260412-website-sgf/amir-teppich-video/refs-kinetic-typo/`
- **Ausführliche Stil-Analyse:** `260412-website-sgf/amir-teppich-video/motion-text-styles.md`
- **Remotion-Composer (Stilbibliothek):** `/Users/robert.miler/OpenMontage/remotion-composer/src`
  (bestehende Stile mit gemeinsamem `SpotProps`-Vertrag: KineticSpot, SplitFlapSpot,
  ScribbleFrameSpot, SoftPopSpot, StompSpot, KaraokePopSpot)
- **PMax-Builder:** `/Users/robert.miler/Sites/website SGF/260530_PMax_Builder/` (Video-Logik unter
  `lib/pmax-video/`)
- **Wichtig:** Die Envato-Dateien sind **watermarkte Preview-Renders**; die AE-Projekte sind nicht
  direkt nutzbar. → **Look in Remotion nachbauen** (gleicher `SpotProps`-Vertrag), nicht AE.

## Brand-Recolor (Default-Mapping)
- **SGF / Performance:** Akzent SGF-Blau `#3974f2`, Dunkel `#204fb5`, Navy-BG `#111a2d`, Text weiß.
- **Amir / Orient:** Akzent Terracotta `#9e3b2e`, Creme `#F2ECDB`, Plum-BG `#3a2230` (Arabica-Welt).
- Fonts vorhanden via `@remotion/google-fonts` (Anton/Druk-Ersatz: **Anton**; UI: Plus Jakarta Sans;
  Serif: Playfair Display).

---

## Stil 1 — „Kinetic Titles" → Komposition `KineticTitleSpot`
**Ref:** `refs-kinetic-typo/kinetic-titles-ionestudio-preview.mp4` + `keyframe_*.png`
- Dunkler cinematischer 3D-Backdrop (Häuserschlucht-Perspektive, langsamer Kamera-Push).
- Schwere **VERSALIEN** (Anton), weiß + **EIN Akzentwort/Zeile** (SGF-Blau) mit **Neon-Glow** +
  dünner Akzent-Unterstrich; 3-Zeilen-Stacks, alternierender Akzent.
- **Kern-Move:** Wörter fliegen in 3D-Winkeln mit **Motion-Blur** + Rotation herein, rasten auf den
  Beat ein.
- Rebuild: 2.5D — `perspective` + `rotateX/Y` Spring-Reveal pro Wort, `filter: blur()` auf Eingang,
  `textShadow`-Glow auf Akzent, Backdrop = parallax-Grid oder Loop-Video.

## Stil 2 — „Text Effect" (Outline Draw-on) → Komposition `OutlineDrawSpot`
**Ref:** `refs-kinetic-typo/text-effect-outline-draw-preview.mp4` + `texteffect_kf*.png`
- **Hohle Outline-Buchstaben (Kontur, kein Fill)**, zeichnen sich mit farbiger Vorderkante auf.
- Sauber/minimal, weicher Schlagschatten, flache Markenfläche ODER weicher Gradient.
- Rebuild: SVG-Text als `path`, `pathLength=1`, `strokeDashoffset` 1→0; heller Leading-Edge-Dash;
  Brand-Gradient (SGF-Blau→Navy / Amir-Terracotta→Creme). Gut für kurze Claims/Einzelwörter.

## Stil 3 — „Arabica" Animated Arabic Typeface → Orient-Akzent-Stil (nur Amir)
**Ref:** `refs-kinetic-typo/arabica-animated-arabic-typeface-preview.mp4` + `arabica_kf*.png`
- **Font-Produkt** (kein Title-Template): arabische Glyphen + lateinische Companion „Arabica".
- Farbwelt: **Plum/Aubergine-BG, Terracotta/Gold-Glyphen, Eck-Ornamente**.
- **Achtung:** Für die arabischen Glyphen werden die **Font-Dateien aus dem Envato-Download**
  gebraucht (in Remotion via `@font-face`). Ohne Font: nur die Farbwelt/Ornamentik als „Orient-Motiv"
  adaptieren. **Nur für Amir/Orient-Content, nicht für SGF-Performance.**

---

## Integrations-Checkliste (für den PMax-Builder-Chat)
1. Drei neue Kompositionen in `remotion-composer/src` anlegen (`SpotProps`-Vertrag: `backgroundSrc`,
   `supers[]`, `tagline`, `cta`, `brandName`, `accentColor`, `format`, `cleanPlate`), in `Root.tsx`
   registrieren (square/landscape/vertical via `calcMeta`).
3. Im PMax-Builder (`lib/pmax-video/`) die neuen Stil-IDs in den Style-Picker/Katalog aufnehmen
   (analog zu den bestehenden Stilen), inkl. Default-Accent je Brand.
4. video-studio Skill: `references/motion-design-remotion.md` „Motion technique cookbook" um die drei
   Stile ergänzen.
5. Audio-Leak-Schutz beachten (kein echtes Default-VO-File; Audio explizit setzen).
6. Pro Stil: 1:1 / 16:9 / 9:16 + `full`/`clean` rendern können.

> Robert nutzt **als nächstes die Kinetic Typography** (Stil 1) → die zuerst bauen.
