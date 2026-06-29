# Amir Teppiche — Auftakt-Spot

**Brand:** Amir Teppiche (Teppichhändler seit 1963, jetzt E-Commerce)
**Kanal:** Google Ads (Video / YouTube / Display)
**Tonalität:** Augenzwinkernd, photoreal cinematic
**Format primär:** 16:9 (Crop 9:16 + 1:1 sekundär)
**Länge:** ~15–20 Sekunden

---

## Konzept in einem Satz

Ein ganz normaler Berliner Lieferant macht seinen Job — nur eben auf einem fliegenden Teppich. Der Kontrast macht's.

---

## Szene 1 — Close-Up Reveal (≈ 5s)

**Beat:** Wir sehen ein Gesicht aus nächster Nähe. Wind. Eyes squinted. Der Mann wirkt konzentriert wie ein DHL-Fahrer auf Tour.

**Frame 1 (Still v1):** Nahaufnahme männliches Gesicht, Berliner Alltagstyp (30-35), kurze dunkle Haare im Wind, dezente Bartstoppeln, neutraler Hoodie. Augen leicht zugekniffen gegen den Fahrtwind. Mund konzentriert geschlossen. Im Hintergrund: weiches Himmel-Bokeh mit Wolkenfetzen — Höhe wird angedeutet, aber NICHT verraten.

**Animation (Kling):** Wind verstärkt sich, Haare wehen, leichter Push-Back der Kamera (oder statisch, je nach Test). 5 Sekunden.

**Folgestill (Szene 1B, später):** Selber Mann, weite Aufnahme, sitzt im Schneidersitz auf einem aufgerollten Stapel Orientteppichen, der Teppich darunter schwebt über deutscher Landschaft (Felder, Wälder, Dorf von oben). Sonne tief.

---

## Szene 2 — Berlin-Approach (≈ 4s)

**Beat:** Kamera weitet sich. Der Teppich fliegt uns davon, in der Ferne erkennen wir die Berliner Skyline (Fernsehturm).

**Frame:** Drohnen-Look, hoch über Brandenburg, der fliegende Teppich als Silhouette mit Lieferant und Teppichrollen — fliegt entschlossen auf Berlin zu. Goldene Stunde, Berlin im Dunst.

---

## Szene 3 — Auslieferung Friedrichshain (≈ 5s)

**Beat:** Berliner Hinterhof, Altbau-Balkon. Der Teppichbote schwebt heran, übergibt einen gerollten Teppich an eine lachende Familie auf dem Balkon, fliegt weiter.

**Frame:** Mittlere Einstellung, Balkon mit Familie (Eltern + Kind), Teppich-Bote im Bildvordergrund auf Teppich schwebend, gibt Rolle ab. Geranien, typische Friedrichshain-Backsteinfassade.

---

## End-Card (≈ 2-3s)

**Super:**
> **Amir Teppiche**
> Seit 1963.
> Jetzt versandkostenfrei bestellen.

**Look:** Sauberes Logo-Lockup, warm-creme Hintergrund mit dezenter Teppich-Textur, Call-to-Action-Button (z.B. "amir-teppiche.de").

---

## Konsistenz-Anker (über alle Szenen)

- **Charakter:** Selber Mann (Alter, Haare, Outfit) in jeder Szene → Nano Banana 2 Multi-Image-Reference nutzen
- **Teppich-Design:** EIN charakteristisches Orient-Muster (rot/dunkelblau/gold) → einmal definieren, immer wiederverwenden
- **Lichtstimmung:** Goldene Stunde durchgehend (Wärme + Premium-Anmutung)
- **Farb-Grading:** Warmer Look, leichte Filmkörnung, ARRI-Alexa-Anmutung

---

## Workflow pro Szene

1. **Still generieren** (Nano Banana 2 via `generate.mjs`) — iterieren bis Look sitzt
2. **Charakter-Konsistenz prüfen** — Still gegen Vorgänger vergleichen
3. **Kling-Animation** (Image-to-Video, 5–10s)
4. **Voiceover / Sound** (optional, ElevenLabs)
5. **Cut** (lokal mit ffmpeg)
