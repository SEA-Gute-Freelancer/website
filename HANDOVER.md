# PMax-Builder — Kontext-Übergabe

> **Snapshot-Datum:** 2026-05-05
> **Branch:** `main` lokal — viele uncommitted Changes — Prod hängt am letzten gepushten Commit `ba8acf2`
> **Lebenszyklus:** Pre-Launch. Layout + Auth-Gate sind fertig, **aber nichts davon ist deployed.** Stripe + reale Delivery-Mail + Cloud-DB stehen aus.

---

## TL;DR — die ersten 3 Minuten

1. **Live ≠ Lokal.** Die Live-Site `/pmax-builder` ist eine **alte** Version. Die ganze Arbeit dieser Session-Reihe (neues Hero-Wizard-Layout, SGF-Anker-Nav, Format-Grid, Animated-Banner-Demo, Color-Token-Sync, `proxy.ts`-Auth-Gate, `/api/pmax-test-email`, etc.) sitzt **uncommitted lokal**. `git status` zeigt das gesamte Delta.
2. **Auth-Gate ist halbfertig.** Vercel hat schon die Env-Vars (`PMAX_BUILDER_USER=demo`, `PMAX_BUILDER_PASS=SGF!GO!PMAX_0526`, target Production). Aber die `proxy.ts`, die diese vars liest, ist noch nicht im deployed Code. → Gate aktiviert sich beim nächsten Push.
3. **Zwei parallele Render-Pfade** für `/pmax-builder` im Code — siehe Pkt. „Architektur" weiter unten. Verwirrt sonst beim ersten Lesen.
4. **Don't push.** User reviewed Diffs vor jedem Live-Gang. Vercel auto-deployed `main`-Pushes.
5. **Keys liegen** in `.env.local` (lokal) und im User-Memory `~/.claude/projects/-Users-robert-miler-Desktop-website-260412-Website-SGF/memory/project_sea_freelancer.md`.

---

## Was ist genau gemacht (Stand 2026-05-05)

### ✅ Fertig & verifiziert (lokal)

1. **Inline Hero-Wizard** in `app/pmax-builder/landing.tsx`:
   - 4 Steps mit Progressive Disclosure: URL → Logos-Frage (Ja/Nein) → Infos (optional textarea) → E-Mail
   - Echter Preflight-Call gegen `/api/pmax-images/preflight` mit CI-Vorschau-Karte bei Erfolg, Manual-/Retry-Fallback bei Fehler
   - Submit feuert `PaymentPayload` an `PaymentModal` (kein zweites Modal/Detour)

2. **PaymentModal** mit Mock-Pay (1200 ms Timeout → fake `sgf-{rand}-{stamp}` Order-ID) + automatischem `/api/pmax-test-email` Resend-Call. Status-Banner: idle/sending/sent/failed.

3. **`/api/pmax-test-email/route.ts`** — Resend-Smoke-Test, ohne Anhänge. SGF-gebrandete HTML-Mail (Table-Layout für Outlook/Gmail-Kompat). Sandbox-Banner wenn From-Adresse `onboarding@resend.dev` enthält. Tags `product=pmax_builder, mode=test`.

4. **SGF-Brand-Anker im Nav** (Layout a):
   ```
   [SGF-Square] SEA GUTE FREELANCER  | pMax-Builder    [Anchor-Links]    [CTA]
   (klickbar nach /)                  (sub-brand)      (5 Anchors)       (gold)
   ```
   Footer hat denselben Brand-Block am oberen Rand + dezenten „← Zurück zur SGF-Hauptseite"-Link unten.

5. **Volle Section-Kette** im Artifact-Layout:
   `Hero → Trust-Bar → Problem (dark) → How-it-works → Formats (8 Cards) → Examples (MOCK_ADS) → Animated-Banner-Demo (728×90 Browser-Chrome) → Tutorial (dark) → Pricing (2 Cards) → FAQ → Footer`

6. **Floating-Sample-Banner** mit Scroll-Depth-Trigger (IntersectionObserver auf Sentinel über Problem-Section). Slideshow durch alle 5 MOCK_ADS, 3.4 s pro Slide, Spring-Slide-Animation, klickbar zum Scroll-to-Hero-Form.

7. **Color-Token-Sync** mit Live-CSS — alle Brand-Variablen in `app/globals.css` zeigen jetzt auf das **Cool-Blue-Schema** der Live-Site:

   | Token | Wert |
   |---|---|
   | `--gold` | `#3974f2` (vibrant blue) |
   | `--gold-dark` | `#204fb5` |
   | `--gold-light` | `#5c8ef3` |
   | `--cream` | `#ffffff` |
   | `--cream-dark` | `#f5f7f9` |
   | `--charcoal` | `#111a2d` (cool navy) |
   | `--warm-muted` | `#5f636c` (Name historisch) |

   Variablennamen blieben stabil aus Backwards-Compat — nicht umbenennen, sonst brechen alle Tailwind-Utilities (`bg-gold`, `text-charcoal`, etc.) projektweit.

8. **Hardcoded-Farben** im pmax-builder-Code, die NICHT auf Tokens zeigen, manuell auf den blauen Stand gezogen:
   - AnimatedBannerDemo: `bg-charcoal` (war `#1A1A17`), Gradient `#111a2d → #204fb5 → #111a2d`
   - 4× CTA-Buttons mit `bg-gold` jetzt `text-cream` (statt `text-charcoal` — Kontrast)
   - 4× alte gold-RGBA Glow/Pulse-Schatten → blaue RGBA `rgba(57,116,242,…)`
   - Section-BG `bg-[#F0F4F8]` → `bg-cream-dark`

9. **`proxy.ts`** (= Next.js-16-Edge-Middleware) im Project-Root:
   - HTTP Basic Auth Gate
   - Matcher: `/pmax-builder*`, `/api/pmax/*`, `/api/pmax-images/*`, `/api/pmax-test-email`
   - Wenn `PMAX_BUILDER_PASS` env unset → Gate offen (Local-Dev-Convenience)
   - Username default `demo`, sonst `PMAX_BUILDER_USER` env
   - Verifiziert mit curl: 401 ohne Auth, 200 mit korrekten Creds, 401 mit falschen
   - **Wichtig:** Datei heißt `proxy.ts`, nicht `middleware.ts`. Next.js 16 hat die Convention umbenannt.

10. **Vercel-Setup** für Production:
    - Env-Var `PMAX_BUILDER_USER=demo` (type=plain) gesetzt via API
    - Env-Var `PMAX_BUILDER_PASS=SGF!GO!PMAX_0526` (type=sensitive/encrypted) gesetzt
    - Production-Redeploy schon getriggert — aber wirkt erst, wenn `proxy.ts` im deployed Code lebt

### ❌ Noch offen / nicht gemacht

1. **Stripe-Integration** — PaymentModal hat aktuell ein Mock (CardField-Pseudo-Inputs, 1200 ms Timeout, Fake-Order-ID). Phase 5 soll das Stripe Payment Element einbetten plus Webhook-Handling.
2. **Reale Delivery-Mail** mit Download-Link (`/api/pmax-order` o.ä.) — `/api/pmax-test-email` ist nur die Test-Variante ohne ZIP/Download.
3. **Image-Pipeline-Verdrahtung mit Hero** — aktuell triggert der Hero-Submit nur die Test-Mail, NICHT die echte `/api/pmax-images`-Pipeline. In Prod muss Stripe-Webhook → Pipeline → Delivery-Mail laufen.
4. **Cloud-DB für Order-Persistence** — derzeit SQLite (`lib/db/orders.ts`) lokal. Soll auf Google Cloud (Cloud SQL oder Firestore — TBD) migriert werden, damit Orders über Container-Restarts bestehen.
5. **Resend-Domain-Verifikation** — `RESEND_FROM` ist `onboarding@resend.dev` (Sandbox, nur an Resend-Account-Mail zustellbar). Eigene Domain (`no-reply@sea-gute-freelancer.de`) muss bei Resend per DKIM/SPF verifiziert werden, dann Env-Var umstellen.
6. **Visual-Feinschliff** — diverse Sections haben noch alte „Ad Fatigue"-Copy, die mit dem neuen „Performance Boost"-Framing nicht 100% harmoniert. Hero-Subline neu, Rest noch alt.
7. **Mobile-Nav** — bei Viewport < `lg` werden die Anchor-Links versteckt, kein Burger-Menü als Ersatz.

### 🔮 Final-Polish-Quality (User-vereinbart, kommt nach Stripe/DB/Domain)

Vom User explizit gewünscht — als „bauen wir noch ein" gemerkt:

8. **Diversity-Check-Agent.** Nach Generation der 12 Bilder ein zusätzlicher Sonnet-Agent, der die 4 Motive paarweise vergleicht und „zu ähnlich"-Verdikte mit Re-Generation triggert. Heute kann es passieren, dass alle 4 Motive dieselbe Komposition mit anderem Hintergrund sind.
9. **Pre-Approval-Sample.** EIN Bild vorab generieren (statt alle 12), an den Kunden mailen mit „so wird's, jetzt freigeben oder Adjust-Hint schicken". Nach OK läuft der Rest. Spart Refunds bei „passt mir nicht" und nutzt das Feedback als Last-Mile-Brand-Tuning.
10. **Video-Spot-Addon** (Konzept vom User 2026-05-05 skizziert). Eigene Sub-Pipeline, kommt **nach** Stripe + Resend-Domain + GCP-DB + Image-Final-Polish. Detaillierte Spec siehe unten — `### Video-Spot-Addon (Detail-Spec)`.

---

### Video-Spot-Addon (Detail-Spec)

**Idee (User-Original):** Reuses BrandContext (CI + Products + Audience) und 1-3 fertige QC-geprüfte Hero-Bilder aus der Image-Pipeline. Ein Sonnet-Agent schreibt einen PMax-Video-Spot, Bilder + Animation-Prompt gehen an Seedance 2.0 (oder vergleichbar), Ergebnis wird zu 10-15s geschnitten, mit SUPER + CTA versehen, dann Voice-Over + Musik, Final-QC, Delivery.

**Pipeline-Phasen** (zusätzlich zur bestehenden Image-Pipeline):

```
Image-Pipeline-Output (BrandContext + 12 QC'd Bilder)
  │
  ├─ HERO-PICKER (Code) — wählt 1-3 Bilder nach QC-Score + Motif-Diversity
  │
  ▼
9.  VIDEO-DIRECTOR        Sonnet 4.6
    Input:  BrandContext + Hero-Bilder
    Output: { duration, beats[], voiceOver, superSchedule[],
              ctaFrame, musicMood }
  ▼
10. ANIMATION-PROMPTS     Sonnet 4.6 (kann mit 9. mergen)
    Pro Beat: Image + anim-cue → Seedance-tauglicher Prompt
              (Camera-Move + Subject-Action + Lighting-Shift)
  ▼
11. SEEDANCE / RUNWAY     Tool — Image-to-Video
    3 Clips à ~5s, Latency 2-5 min pro Clip
  ▼
12. VIDEO-QC              Sonnet-Vision auf 4-6 Keyframes/Clip
    Accept/Retry-Loop wie Image-QC
  ▼
13. EDIT-PIPELINE         Tool — FFmpeg / Cloud-Service
    Concat → Trim → SUPER-Overlays per Timestamp → CTA-Endcard
  ▼
14. AUDIO-MIX             Tool — ElevenLabs + Music
    VO + Music + Mixdown + Ducking unter VO
  ▼
15. FINAL-QC              Sonnet-Vision auf Final-Keyframes + Audio-Meta
    Accept | Manual-Eskalation
  ▼
Delivery: mp4 (16:9 + 9:16-Variante)
```

Macht **+3 Sonnet-Calls + ~4 Tool-Steps** zur bestehenden Pipeline. Zusatzzeit: 8-15 min, je nach Seedance-Latency und Retry-Quote.

**Verbesserungen ggü. User-Original-Skizze (vereinbart):**

- **Multi-Shot statt Single-Hero.** 3 Beats aus 3 verschiedenen Motif-Archetypen (z. B. Macro → Tabletop → In-Place), nicht 1 Bild × Ken Burns. Wirkt cinematisch, nicht wie Foto-Slideshow.
- **9:16 als Primary-Output.** Demand Gen + YouTube Shorts + TikTok wollen das. 16:9-Cut via Center-Crop trivial daraus. Andersrum verliert man Inhalt.
- **Voice-Over-Picker.** 3-Voice-Bake bei ElevenLabs (3 verschiedene Voices), Sonnet wählt die beste über Whisper-Transkription + Level-Check. Eliminiert uncanny-Betonungs-Probleme bei deutscher werblicher Copy.

**Risiken / Open Questions — vor Build-Start klären:**

1. **Welches Video-Modell?**
   - Seedance 2.0 (ByteDance): aktuell günstig, aber API-Stabilität in 2026 noch in der wilden Phase
   - Runway Gen-3 / Gen-4: teurer, professioneller Track-Record
   - Kling 2.x: gute Qualität, China-API
   - Google Veo: integriert mit Gemini-Stack (passt zu Imagen-Setup), aber Pricing/Quota-Limits unklar
   - Empfehlung **noch offen** — vor Build-Start Test-Pipeline mit 2 Modellen vergleichen

2. **Edit-Pipeline-Hosting?**
   - FFmpeg auf Vercel-Edge → geht nicht (binary too big, memory limit)
   - Cloud Run + FFmpeg-Container → passt natürlich zur GCP-DB-Migration, kostengünstig
   - Shotstack-API → managed, $$, aber zero infra
   - Cloudinary Video Transformations → managed, $$
   - Empfehlung wenn GCP eh kommt: **Cloud Run + FFmpeg**

3. **Music-Quelle?**
   - Suno / Udio / Mubert (AI-generated): unklarer PRO-Status für kommerzielle Werbung in DE
   - Lizenz-Bed-Library (Artlist, Epidemic, Musicbed): ~$15-30/Jahr Sub, 100% rights-cleared
   - **Für MVP:** VO-only, keine Musik (vermeidet Rights-Klärung erstmal)

4. **Background-Worker für Async-Jobs?**
   - Stripe-Webhook-Timeout bei Vercel = 5 min. Image+Video-Pipeline = 15-30 min. → muss zwingend asynchron laufen.
   - Optionen: Inngest, QStash, GCP Cloud Tasks
   - Wird **schon für Image-Only** zwingend, wenn Pipeline > 5 min läuft → Entscheidung steht ohnehin an
   - Empfehlung wenn GCP eh kommt: **Cloud Tasks**

5. **Pricing-Modell?**
   - Variante A: Addon (+20 € auf 39,99 € → 59,99 € „Image+Video")
   - Variante B: Eigene Stufe (29,99 € Image-only / 79,99 € Image+Video)
   - Variante C: Bundle-only ab Launch (kein Image-only mehr)
   - **Offen** — abhängig von Cost-Math nach Modell-Pick

6. **Output-Format-Set?**
   - Minimum: 1× 9:16, 1× 16:9 (gleicher Inhalt, anderer Crop)
   - Voll: + 1:1 Square (für Instagram Feed) + 4:5 (Instagram Portrait)
   - **Offen** — hängt an Sales-Position („PMax-only" vs „Multi-Channel-Pack")

**MVP vs. v2 — Empfehlung:**

| Feature | MVP | v2 |
|---|---|---|
| Input | 1 Hero-Image, Single-Beat | 3 Bilder, Multi-Beat |
| Format | 9:16 only | 16:9 + 9:16 + 1:1 |
| SUPER/CTA | Statisch, 1 Schedule | Dynamisch per Beat |
| Voice-Over | 1 Voice, kein QC | 3-Voice-Bake mit QC-Pick |
| Musik | Keine | Lizenz-Bed oder geklärtes AI |
| Edit-Engine | Cloudinary (managed) | Cloud Run + FFmpeg (custom) |
| Video-QC | Final-QC nur | Per-Beat-QC + Final-QC |
| Delivery | Zusatz zum Image-ZIP | Eigene Preisstufe |
| Build-Zeit | ~2-3 Wochen | ~2-3 Monate |

**Empfehlung:** MVP zuerst, dann Conversion-Daten beobachten, dann v2 entscheiden.

**Roadmap-Positionierung:**

Video-Addon kommt **nach** allen User-Roadmap-Items (Stripe → Resend-Domain → GCP-DB → Image-Final-Polish). Reasoning:
- Stripe wird gebraucht für die Preisstufe
- GCP-DB wird gebraucht für Multi-Step-Async-Jobs
- Image-Pipeline muss stabil + diverse genug sein, damit der Video-Director gute Beats wählen kann
- Eigene Resend-Domain wird gebraucht für die separate Video-Delivery-Mail

Realistisches Timing: **Video-MVP ~6-8 Wochen nach Image-Pipeline-Live-Launch**.

---

## Roadmap (Priorität nach User-Vorgabe)

1. **Stripe-Integration** (Payment-Element + Webhook + Order-Persistence-Hook)
2. **Resend-Forwarding-Setup** (eigene Domain verifizieren, `/api/pmax-order` mit Download-Link bauen)
3. **Google-Cloud-DB** (Migration `lib/db/orders.ts` von SQLite zu GCP)
4. **Final-Polish** — Asset-Generation-Pipeline finalisieren, Landing-Page-Copy überall auf neues Framing ziehen, Mobile-Nav, etc.

User-Originalwortlaut:
> Next Steps: Einbindung Bezahlsystem, Einrichtung Resend-Weiterleitung, Datenbank in Google Cloud für Projekte. Und dann der finale Feinschliff von der Erstellung der Assets, Finalisierung Landingpage etc.

---

## Architektur

### Render-Pfade (CRITICAL — sonst zwei Stunden Verwirrung)

`app/pmax-builder/page.tsx` ist ein Routing-Switch:

```ts
const IMAGES_ONLY = process.env.NEXT_PUBLIC_PMAX_IMAGES_ONLY === "1";

export default function PMaxBuilderPage() {
  const [url, setUrl] = useState("");
  // … andere Hooks, immer aufgerufen, Hook-Order stabil über Branches …
  if (IMAGES_ONLY) return <PMaxLanding url={url} setUrl={setUrl} />;
  return <legacy 870-line UI />;
}
```

- **`NEXT_PUBLIC_PMAX_IMAGES_ONLY=1`** (lokal Default) → rendert `landing.tsx` (das **neue** Layout, Hero-Wizard etc.)
- **leer/`0`** → rendert das alte Free-Tool mit Text-Cluster + Image-Tabs

`landing.tsx` ist die aktuelle Source-of-Truth für Builder-UX. `images-panel.tsx` ist Legacy und wird nur vom alten Pfad gerendert.

### File-Map

```
app/pmax-builder/
├── page.tsx                  # Routing-Switch (oben erklärt)
├── landing.tsx               # ★ AKTUELLER FOKUS — neue Builder-UI
├── images-panel.tsx          # LEGACY — nicht löschen, Prod-Fallback
└── preflight-carousel.tsx    # MOCK_ADS-Array + Mock-Carousel-Komponente

app/api/
├── pmax-test-email/route.ts  # ★ NEU — Resend-Smoke-Mail
├── pmax-images/
│   ├── route.ts              # Image-Pipeline, leere clusters[] OK, maxDuration 900s
│   └── preflight/route.ts    # Brand-Preflight (CI-Scrape + Vorschau)
├── pmax/route.ts             # Text-Cluster-Generation (Legacy)
├── contact/route.ts          # SGF-Kontaktform (Resend, Prod-getestet)
└── photos/route.ts           # SGF-Photo-Wall (irrelevant)

lib/
├── pmax-images/              # Image-Pipeline-Module (CI/Products/Audience/QC/etc.)
├── db/orders.ts              # SQLite-Order-Store (→ wird zu GCP)
└── i18n.ts                   # Alle Texte DE/EN

components/layout/
├── Header.tsx                # if startsWith("/pmax-builder") return null
└── Footer.tsx                # dito

proxy.ts                      # ★ NEU — Edge-Middleware Auth-Gate
app/globals.css               # Brand-Tokens (Cool-Blue-Schema)
.env.local                    # API-Keys + Flags (gitignored)
```

### Hero-Wizard-State-Machine (`landing.tsx::HeroWizard`)

```
url → (preflight ok)
       ↓
     logos → (Pick: Ja/Nein, beim 1. Pick auto-advance)
       ↓
     infos → (optional textarea, Continue oder Überspringen)
       ↓
     email → (validation + onRequestPayment(payload))
              ↓
            PaymentModal öffnet
```

State liegt komplett im `HeroWizard`. Nach oben (`PMaxLanding`) bubbled
nur `PaymentPayload` über `onRequestPayment`. URL ist gehoben (von
nav-CTAs/Banner-CTAs ansteuerbar via `scrollToHero()`).

### PaymentModal-Reset-Pattern

Statt `useEffect` für Re-Open-Reset: „Adjust state during render"-Pattern
mit `lastPayment`-Ref-Vergleich. **Nicht „beheben" durch useEffect** —
ESLint-Regel `react-hooks/set-state-in-effect` warnt sonst.

```ts
const [lastPayment, setLastPayment] = useState<PaymentPayload | null>(payment);
if (payment !== lastPayment) {
  setLastPayment(payment);
  if (payment) { /* reset orderId, paying, copied, emailStatus */ }
}
```

---

## Mock vs. Real

| Komponente | Status |
|---|---|
| URL-Preflight `/api/pmax-images/preflight` | ✅ Real (Anthropic-Scrape + CI) |
| HeroWizard State + Validation | ✅ Real |
| Image-Pipeline `/api/pmax-images` | ✅ Real, aber NICHT vom neuen Hero getriggert |
| Test-Mail `/api/pmax-test-email` | ✅ Real (Resend, ohne Anhänge) |
| PaymentModal Stripe-Card-Field | ⚠ Mock (statische Pseudo-Inputs) |
| PaymentModal Pay-Action | ⚠ Mock (1200 ms Timeout) |
| Order-ID-Erzeugung | ⚠ Mock (`sgf-{rand}-{stamp}`, client-side) |
| Order-Persistence (SQLite) | ⚠ Pipeline schreibt's, Hero-Flow ignoriert es |
| Delivery-Mail mit Download-Link | ❌ Nicht implementiert |

---

## Vercel & Deploy-Setup

### Live-URLs

- Production: https://www.sea-gute-freelancer.de
- Vercel-Default: https://website-phi-eight-97.vercel.app
- GitHub: https://github.com/SEA-Gute-Freelancer/website
- Repo-Root lokal: `/Users/robert.miler/Desktop/website/260412-website-sgf/`

### Vercel-API-Quirks

- **Project-ID:** `prj_UlNDTKgt8VKuUNCkgy2VG2XKE5j1`
- **Team-ID (CRITICAL für API-Calls):** `team_fAwS33f7PUBc52eAYSZLqvCa` — alle API-URLs **müssen** `?teamId=team_fAwS…` query-param tragen, sonst 404
- **Token:** liegt in `/Users/robert.miler/Desktop/CLOUDE/vercel_API_ID_PMA_Builder4PW.rtf`. Aktueller funktionierender Token hat `vcp_` prefix. Scope = nur dieses Projekt.
- **User-Identität:** `hello@robertmiler.com` / Username `sea-gute-freelancer`
- **Auto-Deploy:** Bei jedem `git push origin main` → Vercel deployed automatisch in ~60–90 s.

### Env-Vars auf Vercel (Production target only)

```
RESEND_API_KEY      = re_Zpr1Q5Zi_…
RESEND_FROM         = SEA Gute Freelancer <onboarding@resend.dev>
ANTHROPIC_API_KEY   = sk-ant-api03-…
GEMINI_API_KEY      = AIza…
PMAX_BUILDER_USER   = demo                     ← neu, plain
PMAX_BUILDER_PASS   = SGF!GO!PMAX_0526         ← neu, sensitive
```

`NEXT_PUBLIC_PMAX_IMAGES_ONLY` ist absichtlich NICHT auf Vercel gesetzt — bedeutet, dass Production aktuell den **Legacy-Pfad** zeigt. Sobald deployed wird, muss diese Var auf Vercel auf `1` gesetzt werden, damit das neue `landing.tsx` rendert. (Oder die Legacy `page.tsx` wird umgekehrt zum Default umgebaut — Architekturentscheidung beim Launch.)

### Local `.env.local`

```
ANTHROPIC_API_KEY=sk-ant-…
GEMINI_API_KEY=AIza…
NEXT_PUBLIC_PMAX_IMAGES_ONLY=1
RESEND_API_KEY=re_Zpr1Q5Zi_…
RESEND_FROM="SEA Gute Freelancer <onboarding@resend.dev>"
PMAX_BUILDER_USER=demo
PMAX_BUILDER_PASS=                            ← leer = Gate offen lokal
```

---

## Verification Commands

```bash
# Typecheck (gesamt) — schnell
npx tsc -p tsconfig.json --noEmit --skipLibCheck

# Lint Builder-Files
npx eslint app/pmax-builder/landing.tsx \
           app/api/pmax-test-email/route.ts \
           app/api/pmax-images/route.ts \
           proxy.ts

# Manuelle Auth-Gate-Tests (lokal, dev-server muss laufen)
curl -sI http://localhost:3000/pmax-builder
# Erwarte 401 wenn PMAX_BUILDER_PASS gesetzt, 200 wenn leer

curl -sI -u 'demo:DEINPASS' http://localhost:3000/pmax-builder
# Erwarte 200

# Live-Verification (nach Deploy)
curl -sI https://www.sea-gute-freelancer.de/pmax-builder
curl -sI -u 'demo:SGF!GO!PMAX_0526' https://www.sea-gute-freelancer.de/pmax-builder
```

---

## Pitfalls / Gotchas

1. **`NEXT_PUBLIC_*` ist build-time gebacken.** `.env.local` ändern → Dev-Server restarten, sonst greift's nicht.
2. **`page.tsx` wirkt riesig (870 Zeilen).** Das ist der Legacy-Pfad. Nichts dran ändern, solange er aktiv ist. Alle neue UX in `landing.tsx`.
3. **`ImagesPanel`-Import in `page.tsx` darf nicht weg** — Legacy-Pfad rendert ihn noch.
4. **Hooks-Order stabil über IMAGES_ONLY-Branch** — beide Pfade rufen Hooks in derselben Reihenfolge. Hook nicht IN den if-Branch verlegen.
5. **Sandbox-Resend-Sender stellt nur an Account-Mail zu.** Tests mit fremder E-Mail bouncen still — keine Resend-Error, einfach kein Postfacheingang.
6. **Floating-Banner unterdrückt sich bei offenem PaymentModal** (`payment === null` in der show-Condition) — Absicht.
7. **`proxy.ts` (nicht `middleware.ts`)** — Next.js 16 hat die Datei-Convention umbenannt. Beim Rename Turbopack-Cache (`.next/`) löschen, sonst wirft's „file not found".
8. **Color-Tokens behalten alte Namen** (`--gold`, `--cream`) trotz neuem Blau. Nicht umbenennen — projektweite Tailwind-Class-Bruch.
9. **Vercel-API braucht zwingend `?teamId=…`** — Project-ID allein reicht nicht.
10. **`NEXT_PUBLIC_PMAX_IMAGES_ONLY`** bei Deploy: muss auf Vercel gesetzt werden, sonst rendert Prod weiter den Legacy-Pfad.

---

## Code-Anchors (Stand 2026-05-05)

```
landing.tsx
   ~475  HeroWizard-Komponente Start (id="hero-form")
   ~640  Logos-Card (showLogos-Block)
   ~720  Infos-Card
   ~770  Email-Card + submitPayment
   ~807  generateMockOrderId
   ~813  PaymentModal Start
   ~856  handleMockPay (mit Test-Mail-Fetch)
   ~903  Success-State-UI inkl. Email-Status-Block
  ~1066  PMaxLanding Start
  ~1170  Hero-Section Mount mit HeroWizard
  ~1209  Nav (SGF-Anker-Layout)

proxy.ts
   ~24  config.matcher
   ~36  proxy()-Funktion mit Basic-Auth-Logik

app/api/pmax-test-email/route.ts
   ~33  POST-Handler Start
   ~85  Resend.send-Call
  ~130  renderEmail HTML-Template
```

---

## Häufige Rückfragen

- **„Wieso zwei Render-Pfade?"** → IMAGES_ONLY-Dev-Flow als Fast-Test-Pfad eingeführt (15–25 s Text-Cluster-Detour vermeiden beim Iterieren). Prod soll später nur über `landing.tsx` mit Stripe laufen — `page.tsx` Legacy bleibt bis Free-Tool offiziell zurückgezogen wird.
- **„Wo ist der ZIP-Build?"** → Existiert nicht. Soll auch nicht. Plan ist Download-Link → on-demand ZIP-Streaming aus `public/generated/{orderId}/`.
- **„Stripe-Sandbox vs Live?"** → Offen. Erst Account/Keys vom User bekommen.
- **„Soll ich pushen?"** → Nein, niemals ohne explizite Anweisung.
