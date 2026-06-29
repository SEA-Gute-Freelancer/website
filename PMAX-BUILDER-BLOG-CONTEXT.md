# Kontext: Blog-Artikel über den PMax Builder

## Was ist das?
Wir haben einen kostenlosen PMax Campaign Builder gebaut und auf unserer Website veröffentlicht:
👉 www.sea-gute-freelancer.de/pmax-builder

## Was macht das Tool?
- Nutzer gibt eine Landing Page URL ein
- Das Tool liest die Seite automatisch aus (via Jina AI Reader)
- Claude KI (Anthropic) analysiert den Inhalt und baut daraus eine vollständige Google Ads Performance Max Kampagnenstruktur
- Output: 5 Asset Groups mit je 15+ Search Themes, 15 Short Headlines (≤30 Zeichen), 5 Long Headlines (≤90 Zeichen), 5 Descriptions (≤90 Zeichen), Audience Signals, Custom Segment URLs
- Alles exportierbar als CSV für Google Ads
- Zeichenzähler pro Feld — damit nichts die Google-Limits sprengt
- Gratis, kein Account nötig

## Der witzige Kern des Artikels — "Keine SEA-gute PMax"
Das Tool läuft auf dem **günstigsten KI-Modell** (Claude Haiku). Es ist gut für einen ersten Entwurf — aber es ist ausdrücklich **keine SEA-gute PMax**. Das ist der selbstironische Twist: Wir, eine Google Ads Agentur, bauen ein Tool das bewusst nicht so gut ist wie unsere eigene Arbeit. Wer wirklich gute Ergebnisse will, kann entweder seinen eigenen API Key eingeben (dann läuft Sonnet — deutlich besser) oder uns beauftragen.

## Ton & Marke
- Website: SEA Gute Freelancer — Google Ads Kollektiv für den Mittelstand
- Ton: Ehrlich, direkt, ein bisschen frech, keine Agentur-Bullshit-Sprache
- Zielgruppe des Artikels: Marketing-Verantwortliche, Geschäftsführer KMU, SEA-Interessierte

## Technische Details (falls relevant für den Artikel)
- Gebaut mit: Next.js, Claude API (Anthropic), Jina AI Reader für URL-Scraping
- Kostet uns ~1,5 Cent pro Generierung (Haiku-Modell)
- Rate Limiting: 1x pro IP pro 24h (kostenloser Zugang)
- Eigener API Key: unbegrenzte Nutzung, besseres Modell (Sonnet), auch Gemini möglich
- Budget-Cap: $10/Monat über Anthropic Console

## Was der Artikel leisten soll
1. Traffic auf /pmax-builder bringen
2. Zeigen dass wir wissen was wir tun (wir bauen Tools, die andere nicht bauen)
3. Den "Keine SEA-gute PMax" Witz landen — ehrlich kommunizieren dass KI allein nicht reicht
4. Subtle CTA: Wer wirklich gute PMax will → uns kontaktieren

## Vorschlag für Artikel-Struktur
- Hook: "Wir haben ein Tool gebaut, das unsere eigene Arbeit schlechter macht"
- Was ist PMax überhaupt (kurz)
- Was das Tool kann
- Was das Tool NICHT kann (der ehrliche Teil)
- Wie es funktioniert (kurz, nicht zu technisch)
- CTA

## Länge & Format
- Blog-Artikel, ca. 400-600 Wörter
- Deutsch
- Markdown-Format (wird in Next.js Blog eingebaut)
- Keine Bullet-Point-Wüste — fließender Text mit Persönlichkeit
