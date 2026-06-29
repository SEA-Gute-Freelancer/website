"use client";

// PMax-Builder Landing Page
// ─────────────────────────────────────────────────────────────────
// Adapted from a click-dummy (light Google-Ads-inspired palette) to the
// SGF brand tokens. Blue → gold. Generic light bg → cream. Ink → charcoal.
// Dark "video" sections stay charcoal as contrast breaks.
//
// Flow (inline-first — User bleibt in der Hero-Maske):
//   1. URL eingeben → echter Preflight (/api/pmax-images/preflight) inline
//      in der Hero-Sektion. Bei OK schiebt sich eine kompakte CI-Karte ein.
//   2. "Infos"-Feld (früher "Scope") slidet progressiv darunter rein —
//      freier Text, skippable.
//   3. E-Mail-Feld slidet darunter rein. Button "Bezahlen – 39,99 €"
//      unten drunter.
//   4. Erst Button-Click öffnet das Payment-Modal — das ist das einzige
//      Modal im Flow. Enthält Zahlungs-UI + Success-State (Order-ID,
//      Copy, Mail-Delivery-Hinweis).
//
// Andere CTAs (Nav-Button, Pricing-Karte, Floating-Banner) scrollen auf
// das Hero-Formular (#hero-form) anstatt das Modal direkt zu öffnen —
// der Funnel bleibt dadurch linear.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Copy,
  CreditCard,
  Globe,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Play,
  Shapes,
  Shield,
  X,
  ChevronDown,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { MOCK_ADS, fontClass } from "./preflight-carousel";

// ─── Asset-Preview-Grid (Hero) ───────────────────────────────────
// Re-uses MOCK_ADS from the preflight carousel so the same 5 sample ads
// appear: in the hero preview (static), in the preflight wait (cycling),
// and in the floating scroll banner (single). Consistent visual story.

const HERO_TILE_MAP: { id: string; area: string; ratio: string; format: string }[] = [
  { id: "wine", area: "a", ratio: "1 / 1", format: "1:1 · 1200×1200" },
  { id: "bikes", area: "b", ratio: "16 / 9", format: "16:9 · 1920×1080" },
  { id: "skincare", area: "c", ratio: "4 / 5", format: "4:5 · 960×1200" },
  { id: "coffee", area: "d", ratio: "1.91 / 1", format: "1.91:1 · 1200×628" },
  { id: "sneakers", area: "e", ratio: "1 / 1", format: "1:1 · Logo-Ready" },
];

function HeroPreviewGrid() {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateAreas: `"a a b c" "a a d e"`,
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      {HERO_TILE_MAP.map((tile) => {
        const ad = MOCK_ADS.find((a) => a.id === tile.id);
        if (!ad) return null;
        return (
          <figure
            key={tile.id}
            className="relative rounded-lg overflow-hidden bg-charcoal/5 ring-1 ring-charcoal/8"
            style={{ gridArea: tile.area, aspectRatio: tile.ratio }}
          >
            {/* Fallback gradient — Unsplash image sits on top */}
            <div className="absolute inset-0" style={{ background: ad.gradient }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ad.imageUrl}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: ad.objectPosition ?? "50% 50%" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />
            {/* Nur Format-Label — keine Copy, das ist eine Format-Vorschau,
                keine Ad-Mockup. Text + CTA sehen User später in der
                scroll-getriggerten Diashow. */}
            <span className="absolute bottom-1.5 left-1.5 bg-black/55 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
              {tile.format}
            </span>
          </figure>
        );
      })}
    </div>
  );
}

// ─── Floating Scroll-Triggered Banner ────────────────────────────
// Slides in from the right once the sentinel enters the viewport. The
// user explicitly asked for scroll-depth trigger (not setTimeout) — we
// put the sentinel at the top of the Problem section, so the banner
// shows up once the reader engages with the content, not on random
// pageload delay.

function FloatingSampleBanner({
  show,
  onDismiss,
  onCtaClick,
}: {
  show: boolean;
  onDismiss: () => void;
  onCtaClick: () => void;
}) {
  // Diashow durch alle 5 Beispiele — wenn Scroll-Tiefe erreicht, beginnt
  // der Banner zu cyclen. Jedes Motiv zeigt Headline + CTA, damit der
  // User sieht: "das ist ein fertiges Ad-Asset mit Copy-Zone, kein
  // generisches Stockbild".
  const [index, setIndex] = useState(0);

  // Alle 5 Hero-Fotos beim Mount ins Cache laden — so ist der Slide-Wechsel
  // flashfrei. (Die Preflight-Carousel macht dasselbe.)
  useEffect(() => {
    MOCK_ADS.forEach((a) => {
      const p = new window.Image();
      p.src = a.imageUrl;
    });
  }, []);

  // Nur cyclen wenn der Banner sichtbar ist. Sobald er geschlossen/hidden
  // ist, Intervall clearen, damit er nicht unsichtbar weiterläuft.
  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MOCK_ADS.length);
    }, 3400);
    return () => clearInterval(id);
  }, [show]);

  const ad = MOCK_ADS[index];

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ x: 520, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 520, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
          className="fixed bottom-6 right-6 w-[min(480px,calc(100vw-48px))] z-40 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
          onClick={onCtaClick}
        >
          {/* Slide-Bühne */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "12 / 5" }}
          >
            {/* initial={false} — das erste Motiv soll nicht nochmal
                separat reinsliden, die äußere motion.aside sliden die
                ganze Banner-Box schon von rechts rein. Nur Folge-Wechsel
                (Index ändert sich) bekommen die Slide-Animation. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={ad.id}
                initial={{ x: "110%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-110%", opacity: 0 }}
                transition={{
                  x: { type: "spring", stiffness: 160, damping: 24 },
                  opacity: { duration: 0.3 },
                }}
                className="absolute inset-0"
                style={{ background: ad.gradient }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ad.imageUrl}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: ad.objectPosition ?? "50% 50%" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: ad.copyZoneTint }}
                />

                {/* Kategorie-Tag oben links */}
                <span
                  className="absolute top-2.5 left-2.5 text-[9px] font-mono uppercase tracking-widest"
                  style={{
                    color:
                      ad.textTone === "light"
                        ? "rgba(245,234,216,0.6)"
                        : "rgba(31,26,20,0.55)",
                  }}
                >
                  {ad.category}
                </span>

                {/* Copy-Zone */}
                <div className="absolute inset-y-0 right-0 w-[52%] flex flex-col justify-center px-5 gap-2">
                  <p
                    className={`${fontClass(ad.font)} text-[15px] lg:text-[17px] leading-[1.15] whitespace-pre-line`}
                    style={{
                      color: ad.textTone === "light" ? "#f5ead8" : "#1f1a14",
                    }}
                  >
                    {ad.headline}
                  </p>
                  <span
                    className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold"
                    style={{
                      backgroundColor: ad.accent,
                      color:
                        ad.textTone === "light" && ad.accent !== "#f0f4f8"
                          ? "#1a1d23"
                          : ad.textTone === "dark"
                          ? "#f5ead8"
                          : "#1a1d23",
                    }}
                  >
                    Paket starten
                    <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Close — außerhalb AnimatePresence, damit er nicht
                mitslidet und auch während Transitions klickbar bleibt. */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              aria-label="Banner schließen"
              className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
          </div>

          {/* Bottom-Leiste: Diashow-Dots + Mini-Label. Auch außerhalb
              der Slide-Bühne, damit sie statisch bleibt während
              Motive wechseln. */}
          <div className="bg-black/55 backdrop-blur-sm px-3 py-2 flex items-center justify-between gap-3">
            <span className="text-[9px] font-mono text-white/55 shrink-0">
              ↑ So könnten deine PMax-Assets aussehen
            </span>
            <div className="flex gap-1.5 shrink-0">
              {MOCK_ADS.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  aria-label={`Beispiel ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    i === index
                      ? "w-4 bg-gold"
                      : "w-1 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Was passiert nach der Zahlung?",
    a: "Nach der Zahlung startet die KI-Pipeline sofort. Je nach Auslastung dauert die Generierung bis zu ein paar Stunden — du bekommst den Download-Link per E-Mail. Du musst nicht im Browser warten, das Fenster kann geschlossen werden.",
  },
  {
    q: "Meine Website lässt sich nicht prüfen — was nun?",
    a: "Passwortgeschützte Staging-Seiten oder sehr restriktive robots.txt-Konfigurationen können den Preflight blockieren. In dem Fall bieten wir dir im Fehler-Screen einen Mail-Link zur manuellen Abwicklung an — wir prüfen die Seite dann von Hand und erstellen das Paket persönlich.",
  },
  {
    q: "Sind die Assets wirklich individuell?",
    a: "Ja. Mehrere KI-Agenten analysieren CI (Farben, Typo, Logo), Produkte, Zielgruppe und optional deinen eingegebenen Scope-Kontext. Ein Art-Director-Agent wählt daraus 4 Motiv-Archetypen und baut fotorealistische Prompts. Ein QC-Agent prüft jedes Bild gegen Marke und Spec. Keine Stock-Bilder.",
  },
  {
    q: "Gibt es eine Geld-zurück-Garantie?",
    a: "Da es sich um digitale Inhalte handelt, die sofort bereitgestellt werden, gilt gemäß § 356 Abs. 5 BGB nach dem Download kein Widerrufsrecht. Bei der Zahlung bestätigst du den sofortigen Zugang und verzichtest ausdrücklich auf das Widerrufsrecht.",
  },
  {
    q: "Welche Zahlungsmittel werden akzeptiert?",
    a: "Stripe als Zahlungsanbieter: Kreditkarte (Visa, Mastercard, Amex), SEPA-Lastschrift, PayPal, Klarna, Apple Pay, Google Pay, Giropay. One-Click für Nutzer mit gespeicherter Payment Request API.",
  },
  {
    q: "Darf ich die Assets kommerziell nutzen?",
    a: "Ja — volle, unbegrenzte kommerzielle Nutzungsrechte für Google Ads, Meta, LinkedIn, Display-Netzwerke, Social und E-Commerce. Du bleibst alleiniger Nutzer deiner Assets.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left py-5 flex items-center justify-between gap-3 group"
      >
        <span className="text-[15px] font-semibold text-charcoal group-hover:text-gold-dark transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-charcoal/40 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] text-charcoal/70 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Format Grid Section ─────────────────────────────────────────
// 8 PMax-Formate als Spec-Cards. Im Artifact "Enthaltene Formate" — dient
// dem Visitor als Beleg "ich kriege wirklich alles, was Google verlangt".
// Ratio + Pixel-Maße sind die Wahrheit; das visuelle Format-Preview
// (gold-getöntes Rechteck) ist nur Maßstab-Veranschaulichung, nicht echtes
// Bild. Die 4 Haupt-Formate (1:1, 1.91:1, 4:5, 16:9) sind das, was die
// Pipeline real liefert; Display/Leaderboard/Mobile/Skyscraper-Banner
// kommen über Refraiming/Resizing — daher Group-Trennung.

const PMAX_FORMATS: {
  ratio: string;
  label: string;
  size: string;
  name: string;
  group: "core" | "banner";
  /** previewStyle steuert nur die Darstellung des goldenen Rechtecks */
  previewStyle: { aspectRatio: string; width?: string; fontSize?: string };
}[] = [
  { ratio: "1:1", label: "1:1", size: "1200 × 1200 px", name: "Quadrat", group: "core", previewStyle: { aspectRatio: "1 / 1" } },
  { ratio: "1.91:1", label: "1.91:1", size: "1200 × 628 px", name: "Landscape", group: "core", previewStyle: { aspectRatio: "1.91 / 1" } },
  { ratio: "4:5", label: "4:5", size: "960 × 1200 px", name: "Hochformat", group: "core", previewStyle: { aspectRatio: "4 / 5", width: "70%" } },
  { ratio: "16:9", label: "16:9", size: "1920 × 1080 px", name: "Querformat", group: "core", previewStyle: { aspectRatio: "16 / 9" } },
  { ratio: "300x250", label: "300×250", size: "Medium Rectangle", name: "Display", group: "banner", previewStyle: { aspectRatio: "300 / 250" } },
  { ratio: "728x90", label: "728×90", size: "Leaderboard", name: "Leaderboard", group: "banner", previewStyle: { aspectRatio: "728 / 90", fontSize: "9px" } },
  { ratio: "320x50", label: "320×50", size: "Mobile Banner", name: "Mobile", group: "banner", previewStyle: { aspectRatio: "320 / 50", fontSize: "9px" } },
  { ratio: "160x600", label: "160×600", size: "Wide Skyscraper", name: "Skyscraper", group: "banner", previewStyle: { aspectRatio: "160 / 600", width: "40%" } },
];

function FormatGridSection() {
  return (
    <section id="formats" className="bg-cream px-5 lg:px-12 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-3">
          Enthaltene Formate
        </p>
        <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4 text-balance">
          12 Assets. Alle PMax-Formate.
        </h2>
        <p className="text-[17px] text-charcoal/65 leading-relaxed max-w-[560px] mb-12">
          Google verlangt für PMax bestimmte Bildformate und -größen. Du
          bekommst alle auf einmal — optimiert, beschnitten, fertig zum
          Upload. Vier Kern-Bildformate plus die häufigsten Display-Banner.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PMAX_FORMATS.map((f) => (
            <div
              key={f.ratio}
              className="bg-white border border-charcoal/10 rounded-[10px] p-5 text-center flex flex-col"
            >
              {/* Format-Maßstab in Gold-Tönung. Aspect-Ratio entspricht
                  dem realen Format, damit der Visitor sofort erkennt:
                  "ah, Skyscraper ist eben super schlank". */}
              <div className="flex-1 flex items-center justify-center mb-3 min-h-[80px]">
                <div
                  className="bg-gold/15 text-gold-dark rounded-[6px] flex items-center justify-center font-bold"
                  style={{
                    width: f.previewStyle.width ?? "100%",
                    aspectRatio: f.previewStyle.aspectRatio,
                    fontSize: f.previewStyle.fontSize ?? "11px",
                  }}
                >
                  {f.label}
                </div>
              </div>
              <p className="text-[13px] font-semibold text-charcoal mb-0.5">
                {f.name}
              </p>
              <p className="text-[11px] text-charcoal/45">{f.size}</p>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-charcoal/45 mt-6 text-center">
          + weitere Google-Ads-konforme Formate bis zur Gesamtzahl von
          12 Bild-Assets + 2 Logo-Varianten.
        </p>
      </div>
    </section>
  );
}

// ─── Animated Banner Demo Section ─────────────────────────────────
// Bonus-Preview im Artifact: ein animiertes 728×90-HTML5-Banner in einer
// Browser-Chrome-Hülle. Cyclt 3 Headlines (sales / trial / quality) mit
// CSS-Animation, der CTA-Button pulsiert. Wir bauen das mit Framer-Motion
// AnimatePresence + key-Wechsel, statt CSS-Keyframes — ist robuster und
// pausiert sauber wenn die Section nicht im Viewport ist (whileInView).

const BANNER_HEADLINES = [
  "Jetzt 20 % sparen",
  "Kostenlos testen",
  "Top-Qualität seit 2010",
];

function AnimatedBannerDemoSection() {
  const [hi, setHi] = useState(0);
  const [inView, setInView] = useState(false);

  // Headline-Cycle nur wenn die Section sichtbar ist — sonst läuft das
  // unnötig im Hintergrund und triggert React-Renders.
  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => {
      setHi((i) => (i + 1) % BANNER_HEADLINES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section className="bg-cream-dark px-5 lg:px-12 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-3">
          Bonus Preview
        </p>
        <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4 text-balance">
          Dein Hero-Motiv — als animiertes HTML-Banner
        </h2>
        <p className="text-[17px] text-charcoal/65 leading-relaxed max-w-[560px] mb-12">
          Wer nach dem Kauf kurz bleibt, sieht sein stärkstes Motiv als
          animiertes HTML5-Banner — bereit für Display-Netzwerke und
          Retargeting.
        </p>

        <motion.div
          onViewportEnter={() => setInView(true)}
          onViewportLeave={() => setInView(false)}
          viewport={{ amount: 0.4 }}
          className="bg-white border border-charcoal/10 rounded-[10px] p-6 sm:p-8 flex flex-col items-center gap-6"
        >
          {/* Browser-Chrome */}
          <div className="w-full max-w-[900px] bg-[#2A2A27] rounded-[10px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,.08),0_16px_48px_rgba(0,0,0,.10)]">
            <div className="bg-[#3A3A37] py-2.5 px-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="flex-1 ml-2 bg-[#2A2A27] rounded px-2.5 py-1 text-[11px] text-[#6A6A64]">
                ads.google.com · Display-Vorschau
              </span>
            </div>
            <div className="bg-[#E8E7E3] py-10 px-5">
              <p className="text-[10px] text-[#8A8A84] text-center mb-3 font-mono">
                [ Beispiel Leaderboard Banner 728×90 ]
              </p>
              <div
                className="mx-auto w-[728px] max-w-full h-[90px] rounded overflow-hidden relative bg-charcoal flex items-center"
                style={{ aspectRatio: "728 / 90" }}
              >
                {/* Animierter Hintergrund — Gradient aus Charcoal-Navy →
                    Brand-Blue → Charcoal-Navy. Passt zum neuen Cool-Blue-
                    Schema (Live-Sync 2026-05). */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #111a2d 0%, #204fb5 50%, #111a2d 100%)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={
                    inView
                      ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                      : { backgroundPosition: "0% 50%" }
                  }
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Inhalt */}
                <div className="relative z-10 flex items-center gap-4 px-5 w-full">
                  <div className="w-12 h-12 bg-white/12 rounded-lg flex items-center justify-center text-[9px] font-bold text-white/50 shrink-0 tracking-wider">
                    LOGO
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="overflow-hidden h-[22px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={hi}
                          initial={{ y: 22, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -22, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="text-[18px] font-extrabold text-white tracking-tight leading-none"
                          style={{ textShadow: "0 2px 8px rgba(0,0,0,.4)" }}
                        >
                          {BANNER_HEADLINES[hi]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <p className="text-[10px] text-white/50 mt-1 tracking-[0.05em] uppercase">
                      Ihre Marke · Ihr Produkt
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    className="bg-gold text-cream text-[12px] font-bold px-4 py-2 rounded shrink-0 cursor-default"
                    animate={
                      inView
                        ? {
                            boxShadow: [
                              "0 0 0 0 rgba(57,116,242,0.4)",
                              "0 0 0 8px rgba(57,116,242,0)",
                              "0 0 0 0 rgba(57,116,242,0)",
                            ],
                          }
                        : { boxShadow: "0 0 0 0 rgba(57,116,242,0)" }
                    }
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Mehr erfahren
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[12px] text-charcoal/45 text-center">
            ↑ So könnte dein generiertes HTML-Banner aussehen · Live-Animation
            im Browser
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Inline Hero Wizard ───────────────────────────────────────────
// Progressive Disclosure direkt in der Hero-Sektion. Keine Modals bis zur
// Zahlung. Drei Stacks schieben sich nacheinander rein: URL → Infos →
// E-Mail. Darunter der Primary-CTA "Bezahlen – 39,99 €".

interface PreflightBrand {
  brandName: string;
  primaryColors: string[];
  visualStyle: string;
  logoDetected: boolean;
}
type PreflightResult =
  | { ok: true; brand: PreflightBrand; screenshotUrl?: string }
  | { ok: false; reason: string; fallback: "manual" | "retry"; screenshotUrl?: string };

type HeroStep = "url" | "logos" | "infos" | "email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HERO_PRICE_LABEL = "39,99 €";

interface PaymentPayload {
  url: string;
  wantsLogos: boolean;
  scope: string;
  email: string;
}

function HeroWizard({
  url,
  setUrl,
  onRequestPayment,
}: {
  url: string;
  setUrl: (u: string) => void;
  onRequestPayment: (p: PaymentPayload) => void;
}) {
  const [step, setStep] = useState<HeroStep>("url");

  // Preflight
  const [preflightLoading, setPreflightLoading] = useState(false);
  const [preflight, setPreflight] = useState<PreflightResult | null>(null);

  // Logos dazu oder nicht. null = noch nicht beantwortet. true/false = Wahl.
  const [wantsLogos, setWantsLogos] = useState<boolean | null>(null);

  // Infos (formerly "scope")
  const [scope, setScope] = useState("");

  // E-Mail
  const [email, setEmail] = useState("");
  const emailValid = EMAIL_REGEX.test(email.trim());

  // URL-Änderung setzt alles nachgelagerte zurück — sonst würde ein
  // bestehender Preflight für eine alte URL falsch bleiben.
  useEffect(() => {
    setPreflight(null);
    setStep("url");
    setWantsLogos(null);
  }, [url]);

  async function runPreflight() {
    const trimmed = url.trim();
    if (!trimmed) return;
    // Basic-Syntax-Check vor dem Fetch — spart einen Server-Roundtrip
    // für offensichtlich kaputte Eingaben.
    if (!/^https?:\/\/[^\s]+\.[^\s]+/.test(trimmed)) {
      setPreflight({
        ok: false,
        reason: "Bitte eine vollständige URL eingeben, inkl. https://.",
        fallback: "retry",
      });
      return;
    }
    setPreflightLoading(true);
    setPreflight(null);
    try {
      const res = await fetch("/api/pmax-images/preflight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await res.json()) as PreflightResult;
      setPreflight(data);
      // Auto-Advance: bei Erfolg geht es direkt zur Logo-Frage weiter —
      // kein zweiter Klick auf einen "Weiter"-Button nötig.
      if (data.ok) setStep("logos");
    } catch (e) {
      setPreflight({
        ok: false,
        reason: e instanceof Error ? e.message : "Netzwerk-Fehler",
        fallback: "retry",
      });
    } finally {
      setPreflightLoading(false);
    }
  }

  function pickLogos(val: boolean) {
    setWantsLogos(val);
    // Nur beim ersten Antworten weiterspringen — wenn User nach-
    // korrigiert (step schon "infos"/"email"), bleibt er wo er ist.
    if (step === "logos") setStep("infos");
  }
  function goToEmail() {
    setStep("email");
  }
  function submitPayment() {
    if (!emailValid || wantsLogos === null) return;
    onRequestPayment({
      url: url.trim(),
      wantsLogos,
      scope: scope.trim(),
      email: email.trim(),
    });
  }

  const showLogos = step === "logos" || step === "infos" || step === "email";
  const showInfos = step === "infos" || step === "email";
  const showEmail = step === "email";

  return (
    <div id="hero-form" className="flex flex-col gap-4 scroll-mt-24">
      {/* ─── Step 1: URL ─────────────────────────────────────── */}
      <div
        className={`flex bg-white border-[1.5px] rounded-[10px] overflow-hidden shadow-sm transition-all ${
          preflight?.ok === false
            ? "border-red-500/50"
            : preflight?.ok === true
            ? "border-emerald-500/50"
            : "border-charcoal/10 focus-within:border-gold focus-within:shadow-[0_0_0_3px_rgba(57,116,242,0.15)]"
        }`}
      >
        <span className="pl-4 pr-2 flex items-center text-charcoal/40">
          <Globe size={16} />
        </span>
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            // Bei Änderung den alten Preflight-Status invalidieren, ohne
            // den Step zurückzusetzen (macht der URL-Effect oben).
            if (preflight) setPreflight(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !preflight?.ok) runPreflight();
          }}
          placeholder="https://deine-website.de"
          autoComplete="off"
          disabled={preflightLoading}
          className="flex-1 pr-2 py-3.5 text-[15px] bg-transparent text-charcoal placeholder:text-charcoal/35 outline-none disabled:opacity-60"
        />
        <button
          onClick={runPreflight}
          disabled={preflightLoading || !url.trim() || preflight?.ok}
          className="bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed text-cream font-bold text-[14px] px-6 whitespace-nowrap transition-colors flex items-center gap-2"
        >
          {preflightLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Prüfe…
            </>
          ) : preflight?.ok ? (
            <>
              <Check size={14} />
              Geprüft
            </>
          ) : (
            <>
              Website prüfen
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
      <p className="text-[12px] text-charcoal/45">
        Kostenlose Prüfung ·{" "}
        <strong className="text-emerald-600">Kein Abo, einmalige Zahlung</strong>
      </p>

      {/* Preflight-OK Resultat — kompakte CI-Karte */}
      <AnimatePresence>
        {preflight?.ok && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-emerald-500/8 border border-emerald-500/25 rounded-[10px] px-4 py-3 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={13} className="text-emerald-700" strokeWidth={3} />
              </span>
              <div className="flex-1 min-w-0 text-[13px] text-charcoal/80">
                <p className="font-semibold text-charcoal mb-0.5">
                  Website geprüft — {preflight.brand.brandName}
                </p>
                <p className="text-[12px] text-charcoal/60 leading-snug">
                  {preflight.brand.logoDetected ? "Logo erkannt · " : "Kein Logo gefunden · "}
                  {preflight.brand.visualStyle}
                </p>
                {preflight.brand.primaryColors.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {preflight.brand.primaryColors.slice(0, 5).map((c) => (
                      <span
                        key={c}
                        title={c}
                        className="w-4 h-4 rounded-full ring-1 ring-charcoal/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preflight-Fail Resultat */}
      <AnimatePresence>
        {preflight?.ok === false && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-red-500/8 border border-red-500/25 rounded-[10px] px-4 py-3 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0 text-[13px]">
                <p className="font-semibold text-red-800 mb-0.5">
                  URL konnte nicht geprüft werden
                </p>
                <p className="text-charcoal/70 text-[12px] leading-snug mb-2">
                  {preflight.reason}
                </p>
                {preflight.fallback === "manual" ? (
                  <a
                    href={`mailto:hallo@sea-gute-freelancer.de?subject=Manuelle%20PMax-Bildgenerierung&body=URL%3A%20${encodeURIComponent(url)}%0AFehler%3A%20${encodeURIComponent(preflight.reason)}`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-red-700 hover:text-red-800 underline"
                  >
                    <Mail size={12} />
                    Manuelle Abwicklung per E-Mail
                  </a>
                ) : (
                  <button
                    onClick={runPreflight}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-red-700 hover:text-red-800 underline"
                  >
                    Erneut prüfen
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Step 2: Logos? ─────────────────────────────────── */}
      {/* Ja/Nein-Frage. Ersteingabe setzt wantsLogos + advanced auto
          zu "infos". Danach bleiben die Buttons sichtbar und der User
          kann seine Wahl jederzeit umklicken, ohne dass der Flow
          zurückspringt. */}
      <AnimatePresence>
        {showLogos && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-charcoal/10 rounded-[10px] p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center">
                  <Shapes size={12} className="text-gold-dark" />
                </span>
                <p className="text-[14px] font-semibold text-charcoal">
                  Logos mitliefern?
                </p>
              </div>
              <p className="text-[12px] text-charcoal/60 leading-snug mb-3">
                Neben den 12 Bild-Assets können wir 2 PMax-optimierte
                Logo-Varianten (quadratisch + landscape) aus deiner Marke
                ableiten. Kein Aufpreis.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => pickLogos(true)}
                  aria-pressed={wantsLogos === true}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-semibold border-[1.5px] transition-all ${
                    wantsLogos === true
                      ? "bg-gold/15 border-gold text-charcoal"
                      : "bg-cream/40 border-charcoal/10 text-charcoal/70 hover:border-charcoal/25 hover:text-charcoal"
                  }`}
                >
                  {wantsLogos === true ? (
                    <Check size={14} className="text-gold-dark" strokeWidth={3} />
                  ) : (
                    <Shapes size={14} className="text-charcoal/45" />
                  )}
                  Ja, 2 Logos dazu
                </button>
                <button
                  onClick={() => pickLogos(false)}
                  aria-pressed={wantsLogos === false}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-semibold border-[1.5px] transition-all ${
                    wantsLogos === false
                      ? "bg-charcoal/8 border-charcoal text-charcoal"
                      : "bg-cream/40 border-charcoal/10 text-charcoal/70 hover:border-charcoal/25 hover:text-charcoal"
                  }`}
                >
                  {wantsLogos === false ? (
                    <Check size={14} className="text-charcoal" strokeWidth={3} />
                  ) : (
                    <X size={14} className="text-charcoal/45" />
                  )}
                  Nein, nur Bilder
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Step 3: Infos ──────────────────────────────────── */}
      <AnimatePresence>
        {showInfos && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-charcoal/10 rounded-[10px] p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center">
                  <MessageSquare size={12} className="text-gold-dark" />
                </span>
                <p className="text-[14px] font-semibold text-charcoal">
                  Infos{" "}
                  <span className="text-charcoal/45 font-normal text-[12px]">
                    · optional
                  </span>
                </p>
              </div>
              <p className="text-[12px] text-charcoal/60 leading-snug mb-2.5">
                Gibt&apos;s einen besonderen Fokus für deine Ads? (Zielgruppe, Saison,
                ein einzelnes Produkt) — schreib&apos;s rein. Wenn nichts, bauen wir
                generelle Paket-Motive für deine Marke.
              </p>
              <textarea
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="z.B. Fokus auf Summer-Sale. Zielgruppe: Frauen 30–45, urban. Keine Kinderbilder."
                className="w-full px-3 py-2.5 text-[13px] bg-cream/50 border border-charcoal/10 rounded-md text-charcoal placeholder:text-charcoal/35 outline-none focus:border-gold resize-none"
                disabled={step === "email"}
              />
              {step === "infos" && (
                <div className="flex items-center justify-between mt-3 gap-3">
                  <span className="text-[11px] text-charcoal/40">
                    {scope.length}/500
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setScope("");
                        goToEmail();
                      }}
                      className="text-[13px] font-medium text-charcoal/55 hover:text-charcoal px-3 py-1.5 transition-colors"
                    >
                      Überspringen
                    </button>
                    <button
                      onClick={goToEmail}
                      className="inline-flex items-center gap-1.5 bg-charcoal hover:bg-charcoal/85 text-cream font-semibold text-[13px] px-4 py-2 rounded-md transition-colors"
                    >
                      Weiter
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Step 4: E-Mail + Bezahlen ──────────────────────── */}
      <AnimatePresence>
        {showEmail && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-charcoal/10 rounded-[10px] p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center">
                  <Mail size={12} className="text-gold-dark" />
                </span>
                <p className="text-[14px] font-semibold text-charcoal">
                  Deine E-Mail
                </p>
              </div>
              <p className="text-[12px] text-charcoal/60 leading-snug mb-2.5">
                An diese Adresse schicken wir den Download-Link, sobald das
                Paket fertig generiert ist (meist in wenigen Stunden).
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && emailValid) submitPayment();
                }}
                placeholder="du@domain.de"
                autoComplete="email"
                className="w-full px-3.5 py-3 text-[14px] bg-cream/50 border border-charcoal/10 rounded-md text-charcoal placeholder:text-charcoal/35 outline-none focus:border-gold"
              />
              <button
                onClick={submitPayment}
                disabled={!emailValid}
                className="mt-3 w-full bg-gold hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-cream font-bold text-[15px] py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Lock size={15} />
                Bezahlen – {HERO_PRICE_LABEL}
              </button>
              <p className="text-[11px] text-charcoal/45 mt-2.5 text-center">
                Zahlung über Stripe · SSL-verschlüsselt · kein Abo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Payment Modal ───────────────────────────────────────────────
// Einziges Modal im Flow. Öffnet sich erst, wenn der User im Hero-Wizard
// auf "Bezahlen – 39,99 €" klickt. Zeigt zuerst eine Checkout-Oberfläche
// (Phase 1: Mock), nach Zahlung den Success-State mit Order-ID + Copy +
// Mail-Delivery-Hinweis. Close-X führt zurück auf die Landing.

function generateMockOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now().toString(36).slice(-5);
  return `sgf-${rand}-${stamp}`;
}

function PaymentModal({
  payment,
  onClose,
}: {
  payment: PaymentPayload | null;
  onClose: () => void;
}) {
  const open = payment !== null;
  const [paying, setPaying] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // Test-Delivery-Mail-Status. Wird nach Mock-Pay-Success per fetch gesetzt.
  // "idle" solange paying läuft, danach sending → sent | failed.
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "sent" | "failed"
  >("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  // Reset-Mechanik für erneute Payment-Requests. Statt useEffect nutzen
  // wir hier das "Adjust state during render"-Pattern — verglichen wird
  // gegen die letzte gesehene Payment-Ref. Sobald ein *neuer* Payment-
  // Payload reinkommt (HeroWizard erzeugt jedes Mal ein neues Objekt),
  // setzen wir Order-ID / paying / copied zurück.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [lastPayment, setLastPayment] = useState<PaymentPayload | null>(payment);
  if (payment !== lastPayment) {
    setLastPayment(payment);
    if (payment) {
      setOrderId(null);
      setPaying(false);
      setCopied(false);
      setEmailStatus("idle");
      setEmailError(null);
    }
  }

  // Escape + Body-Scroll-Lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  function handleMockPay() {
    if (!payment) return;
    setPaying(true);
    // Phase 1: Mock-Latenz. Phase 5 → Stripe Payment Element / Checkout.
    window.setTimeout(async () => {
      const newOrderId = generateMockOrderId();
      setOrderId(newOrderId);
      setPaying(false);

      // Test-Delivery-Mail abschicken (Resend, ohne Anhänge). Wir feuern
      // nach setOrderId, damit der Success-State sofort sichtbar ist —
      // die Mail läuft dann im Hintergrund und aktualisiert nur den
      // kleinen Delivery-Status-Hinweis.
      setEmailStatus("sending");
      setEmailError(null);
      try {
        const res = await fetch("/api/pmax-test-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: payment.email,
            url: payment.url,
            orderId: newOrderId,
            wantsLogos: payment.wantsLogos,
            scope: payment.scope,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.error) {
          setEmailStatus("failed");
          setEmailError(data.error || `HTTP ${res.status}`);
        } else {
          setEmailStatus("sent");
        }
      } catch (err) {
        setEmailStatus("failed");
        setEmailError(err instanceof Error ? err.message : "Netzwerkfehler");
      }
    }, 1200);
  }

  async function copyOrderId() {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard in strict iframes kann failen — ignorieren */
    }
  }

  return (
    <AnimatePresence>
      {open && payment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-charcoal/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-cream border border-charcoal/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Schließen"
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-charcoal/8 hover:bg-charcoal/15 flex items-center justify-center text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-7">
              {orderId ? (
                /* ── Success-State ───────────────────────── */
                <>
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                    <Check size={26} className="text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[22px] font-extrabold tracking-tight text-charcoal mb-1.5">
                    Zahlung erfolgreich
                  </h3>
                  <p className="text-[14px] text-charcoal/65 leading-relaxed mb-4">
                    Dein Paket ist bestellt. Der Download-Link kommt in den
                    nächsten Stunden per E-Mail an{" "}
                    <strong className="text-charcoal">{payment.email}</strong> —
                    du musst dieses Fenster nicht geöffnet lassen.
                  </p>

                  {/* Test-Delivery-Status — fällt weg, sobald Prod-Versand
                      über /api/pmax-order läuft. */}
                  <div
                    className={`mb-4 rounded-md border px-3 py-2.5 text-[12px] leading-snug flex items-start gap-2 ${
                      emailStatus === "sent"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : emailStatus === "failed"
                        ? "bg-rose-50 border-rose-200 text-rose-900"
                        : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}
                  >
                    {emailStatus === "sending" && (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0 mt-0.5" />
                        <span>
                          <strong>Test-Mail wird versendet …</strong> (ohne
                          Anhänge, via Resend)
                        </span>
                      </>
                    )}
                    {emailStatus === "sent" && (
                      <>
                        <Check size={14} className="shrink-0 mt-0.5" />
                        <span>
                          <strong>Test-Mail versendet.</strong> Schau in dein
                          Postfach (ggf. Spam-Ordner). Echte Asset-Lieferung
                          folgt in Prod-Phase via Download-Link.
                        </span>
                      </>
                    )}
                    {emailStatus === "failed" && (
                      <>
                        <X size={14} className="shrink-0 mt-0.5" />
                        <span>
                          <strong>Test-Mail fehlgeschlagen:</strong>{" "}
                          {emailError || "unbekannter Fehler"} — Order ist
                          trotzdem gespeichert.
                        </span>
                      </>
                    )}
                    {emailStatus === "idle" && (
                      <span className="text-charcoal/60">
                        Test-Mail-Status wird geladen …
                      </span>
                    )}
                  </div>

                  <div className="bg-white border border-charcoal/10 rounded-md p-3 mb-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-charcoal/45 mb-1">
                      Deine Order-ID
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-[13px] font-mono font-semibold text-charcoal break-all">
                        {orderId}
                      </code>
                      <button
                        onClick={copyOrderId}
                        className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold bg-charcoal/5 hover:bg-charcoal/10 px-2.5 py-1.5 rounded text-charcoal/70 hover:text-charcoal transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check size={11} />
                            Kopiert
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            Kopieren
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full bg-charcoal hover:bg-charcoal/85 text-cream font-semibold text-[14px] py-3 rounded-md transition-colors"
                  >
                    Fenster schließen
                  </button>
                </>
              ) : (
                /* ── Payment-State ───────────────────────── */
                <>
                  <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-2">
                    Zahlung
                  </p>
                  <h3 className="text-[22px] font-extrabold tracking-tight text-charcoal mb-4">
                    PMax-Paket — {HERO_PRICE_LABEL}
                  </h3>

                  {/* Order-Summary */}
                  <div className="bg-white border border-charcoal/10 rounded-md p-3.5 mb-4 space-y-2 text-[13px]">
                    <div className="flex items-start gap-2">
                      <Globe size={14} className="text-charcoal/40 shrink-0 mt-0.5" />
                      <span className="text-charcoal/80 break-all">{payment.url}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail size={14} className="text-charcoal/40 shrink-0 mt-0.5" />
                      <span className="text-charcoal/80 break-all">{payment.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shapes size={14} className="text-charcoal/40 shrink-0 mt-0.5" />
                      <span className="text-charcoal/80 text-[12px]">
                        {payment.wantsLogos
                          ? "Mit 2 Logo-Varianten"
                          : "Ohne Logos — nur Bild-Assets"}
                      </span>
                    </div>
                    {payment.scope && (
                      <div className="flex items-start gap-2">
                        <MessageSquare size={14} className="text-charcoal/40 shrink-0 mt-0.5" />
                        <span className="text-charcoal/60 text-[12px] leading-snug line-clamp-3">
                          {payment.scope}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 pt-2 border-t border-charcoal/8">
                      <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-charcoal/80 text-[12px]">
                        {payment.wantsLogos
                          ? "12 PMax-Assets + 2 Logo-Varianten, Lieferung per E-Mail"
                          : "12 PMax-Assets, Lieferung per E-Mail"}
                      </span>
                    </div>
                  </div>

                  {/* Card-Mock (Stripe-Elements-Platzhalter) */}
                  <div className="bg-white border border-charcoal/10 rounded-md p-3.5 mb-3">
                    <div className="flex items-center gap-2 mb-2.5 text-charcoal/55">
                      <CreditCard size={14} />
                      <span className="text-[11px] font-mono uppercase tracking-widest">
                        Kartendaten · Phase 1: Demo
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 bg-cream/60 rounded border border-charcoal/8 flex items-center px-3 text-[12px] text-charcoal/35">
                        4242 4242 4242 4242
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-10 bg-cream/60 rounded border border-charcoal/8 flex items-center px-3 text-[12px] text-charcoal/35">
                          MM / YY
                        </div>
                        <div className="h-10 bg-cream/60 rounded border border-charcoal/8 flex items-center px-3 text-[12px] text-charcoal/35">
                          CVC
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleMockPay}
                    disabled={paying}
                    className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 disabled:cursor-wait text-cream font-bold text-[15px] py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors"
                  >
                    {paying ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Zahlung wird bestätigt…
                      </>
                    ) : (
                      <>
                        <Lock size={15} />
                        {HERO_PRICE_LABEL} bezahlen
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
                    {["VISA", "MC", "AMEX", "SEPA", "KLARNA", "PAYPAL", "APPLE PAY"].map(
                      (pm) => (
                        <span
                          key={pm}
                          className="text-[9px] font-bold text-charcoal/40 bg-white border border-charcoal/10 rounded px-1.5 py-0.5 tracking-[0.04em]"
                        >
                          {pm}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-[10px] text-charcoal/40 text-center mt-2 leading-snug">
                    Kein echter Charge in Phase 1. Mit Stripe-Integration (Phase 5)
                    wird hier das Stripe Payment Element eingebettet.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Landing ────────────────────────────────────────────────

export default function PMaxLanding({
  url,
  setUrl,
}: {
  url: string;
  setUrl: (u: string) => void;
}) {
  // Payment-State. `payment` ist null solange das Modal zu ist; sobald der
  // User im Hero-Wizard auf "Bezahlen" klickt, wird es auf die Payload
  // gesetzt und das Modal öffnet sich.
  const [payment, setPayment] = useState<PaymentPayload | null>(null);

  const [showFloatBanner, setShowFloatBanner] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const bannerSentinelRef = useRef<HTMLDivElement | null>(null);

  // Scroll-Depth-Trigger für den Floating-Banner. User wollte explizit
  // keinen setTimeout — Banner erscheint, wenn die Problem-Sektion im
  // Viewport sichtbar wird, also wenn der Reader tatsächlich liest.
  useEffect(() => {
    const sentinel = bannerSentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !bannerDismissed) {
            setShowFloatBanner(true);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [bannerDismissed]);

  // Sekundäre CTAs (Nav, Pricing-Karte, Floating-Banner) öffnen NICHT mehr
  // direkt das Modal — sie scrollen zum Hero-Formular. Funnel bleibt
  // linear: URL → Infos → E-Mail → Bezahlen (Modal).
  function scrollToHero() {
    const el = document.getElementById("hero-form");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    // Fokus auf das URL-Input setzen, damit der User direkt tippen kann.
    const input = el.querySelector<HTMLInputElement>('input[type="url"]');
    window.setTimeout(() => input?.focus(), 450);
  }

  function triggerBannerCta() {
    setShowFloatBanner(false);
    scrollToHero();
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* ═══ NAV ═══ */}
      {/* Globaler SGF-Header wird auf /pmax-builder unterdrückt (siehe
          components/layout/Header.tsx) — wir rendern stattdessen unseren
          eigenen, mit SGF-Logo links als primärem Brand-Anker. Hierarchie:
          [SGF-Logo + Wordmark]  ·  [pMax-Builder Sub-Brand]  →  Anchor-Links
          →  CTA. SGF-Logo führt nach /, ist also die "Zurück zur Mutterseite"-
          Aktion ohne dezenten Backlink-Look. */}
      <nav className="sticky top-0 z-30 bg-cream/92 backdrop-blur-md border-b border-charcoal/8 h-[64px] flex items-center justify-between px-5 lg:px-12 gap-4">
        {/* ── Brand-Block ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 min-w-0">
          {/* SGF-Anker — clickable, führt zurück auf die Mutterseite */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Zurück zu SEA Gute Freelancer"
          >
            <span className="relative w-9 h-9 bg-gold rounded-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-charcoal font-heading font-bold text-[11px] tracking-wider">
                SGF
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-gold-dark rounded-full" />
            </span>
            <span className="hidden sm:block leading-[1.05] text-charcoal group-hover:text-gold-dark transition-colors">
              <span className="block font-heading font-semibold text-[10.5px] tracking-[0.18em] uppercase">
                Sea Gute
              </span>
              <span className="block font-heading font-semibold text-[10.5px] tracking-[0.18em] uppercase">
                Freelancer
              </span>
            </span>
          </Link>

          {/* Trennstrich zwischen Mutter-Brand und Sub-Brand */}
          <span
            className="h-7 w-px bg-charcoal/15 shrink-0"
            aria-hidden="true"
          />

          {/* pMax-Builder als Sub-Brand. Bewusst kleiner und nicht clickable —
              die aktive Seite ist /pmax-builder, ein Self-Link wäre redundant. */}
          <span className="text-[15px] sm:text-[16px] font-black tracking-tight text-charcoal whitespace-nowrap">
            <span className="text-gold-dark">p</span>Max-Builder
          </span>
        </div>

        {/* ── Anchor-Links (Desktop) ──────────────────────────── */}
        <ul className="hidden lg:flex gap-7 list-none">
          {[
            ["So funktioniert's", "#how-it-works"],
            ["Formate", "#formats"],
            ["Beispiele", "#examples"],
            ["Preise", "#pricing"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="text-[13.5px] font-medium text-charcoal/65 hover:text-charcoal transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <button
          onClick={scrollToHero}
          className="shrink-0 bg-gold hover:bg-gold-dark text-cream font-semibold text-[13px] sm:text-[14px] px-4 sm:px-5 py-2 rounded-md transition-colors"
        >
          Jetzt starten<span className="hidden sm:inline"> – 39,99 €</span>
        </button>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1200px] mx-auto px-5 lg:px-12 pt-16 lg:pt-20 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold-dark border border-gold/25 rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark" />
            Neu 2026 · KI-generierte PMax Assets
          </span>
          <h1 className="font-black leading-[1.08] tracking-tight mb-5 text-charcoal text-[clamp(34px,3.5vw,52px)]">
            Dein PMax-
            <br />
            <em className="not-italic text-gold-dark">Performance</em> Boost.
          </h1>
          <p className="text-[18px] text-charcoal/65 leading-relaxed mb-8 max-w-[480px]">
            Deine PMax-Kampagne liefert keine Leistung? Verbessere deine Assets!
            Jetzt URL eingeben, KI analysiert deine Marke, du bekommst 12
            fotorealistische PMax-Bild-Assets + 2 Logo-Varianten — nach Google
            Best Practice, individuell für deine Website. Für{" "}
            <strong className="text-charcoal">39,99 €</strong>.
          </p>

          {/* Inline-Wizard: URL-Check → Infos → E-Mail → Bezahlen.
              Das komplette Pre-Payment läuft hier. Erst der Bezahlen-
              Button öffnet das Payment-Modal (via setPayment()). */}
          <HeroWizard
            url={url}
            setUrl={setUrl}
            onRequestPayment={setPayment}
          />
        </div>

        {/* Hero Preview Grid */}
        <div className="relative">
          <HeroPreviewGrid />
          <p className="text-[11px] text-charcoal/40 text-center mt-3">
            ↑ Beispiele aus realen generierten Paketen
          </p>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <div className="bg-white border-y border-charcoal/8 px-5 lg:px-12 py-5 flex items-center justify-center gap-x-10 gap-y-3 flex-wrap">
        {[
          { icon: Check, label: "12 fertige Assets + 2 Logos" },
          { icon: MapPin, label: "Alle PMax-Hauptformate" },
          { icon: Clock, label: "Lieferung per E-Mail" },
          { icon: Shield, label: "Einmalig · kein Abo" },
          { icon: Lock, label: "DSGVO · SSL · Stripe" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[13px] font-medium text-charcoal/70"
          >
            <Icon size={16} className="text-gold-dark" />
            {label}
          </div>
        ))}
      </div>

      {/* ═══ SENTINEL for Floating Banner (just above problem section) ═══ */}
      <div ref={bannerSentinelRef} className="h-px" />

      {/* ═══ PROBLEM SECTION (dark) ═══ */}
      <section id="problem" className="bg-charcoal text-cream px-5 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold mb-3">
            Das Problem
          </p>
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4 text-balance">
            Was ist Ad Fatigue — und warum kostet es dich täglich Geld?
          </h2>
          <p className="text-[17px] text-cream/65 leading-relaxed max-w-[620px] mx-auto mb-12">
            PMax-Kampagnen optimieren sich selbst — aber nur solange die Assets
            frisch sind. Dieselben Bilder zu oft gezeigt → CTR sinkt, CPCs steigen.
            90 Sekunden, die alles erklären.
          </p>

          {/* Video-Placeholder */}
          <button
            className="group relative w-full max-w-[960px] mx-auto aspect-video rounded-xl border border-cream/10 bg-charcoal/60 flex flex-col items-center justify-center gap-3 overflow-hidden hover:border-gold/40 transition-colors"
            aria-label="Erklärvideo abspielen"
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0, rgba(255,255,255,.05) 1px, transparent 1px, transparent 14px)",
              }}
            />
            <div className="relative w-[72px] h-[72px] rounded-full bg-gold flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
              <Play size={26} className="text-charcoal fill-charcoal ml-1" />
            </div>
            <p className="relative text-[13px] text-cream/45">
              Erklärvideo · ca. 90 Sekunden
            </p>
          </button>

          {/* Signals */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[960px] mx-auto mt-8">
            {[
              { label: "CTR unter 1 %", hint: "Dringend handeln" },
              { label: "Impression Share sinkt", hint: "Trotz gleichem Budget" },
              { label: "Bewertung \u201EGering\u201C", hint: "In der Asset-Ansicht" },
              { label: "CPC steigt", hint: "Ohne erkennbaren Grund" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="bg-cream/5 border border-cream/10 rounded-md p-4 text-left"
              >
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-gold mb-1.5">
                  Signal {i + 1}
                </p>
                <p className="text-[14px] font-semibold text-cream mb-1">{s.label}</p>
                <p className="text-[12px] text-cream/45">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="bg-white px-5 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-3">
            So funktioniert&apos;s
          </p>
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4 text-balance">
            Drei Schritte. Fertig.
          </h2>
          <p className="text-[17px] text-charcoal/65 leading-relaxed max-w-[560px] mb-12">
            Kein Briefing, kein Designer, kein Shooting. Nur deine URL, ein
            optionaler Scope-Hinweis und 39,99 €.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                h: "URL eingeben & prüfen",
                p: "Die Pipeline scraped Farben, Logo, Typo, Produkte und Zielgruppe. Ein Preflight zeigt dir vor dem Kauf, ob deine Seite analysierbar ist — keine fehlgeschlagenen Pakete.",
              },
              {
                n: "2",
                h: "Scope & E-Mail, dann zahlen",
                p: "Optional: kurzer Chat-Text für deinen Fokus (Produkt, Zielgruppe, Saison). E-Mail, Einmalzahlung via Stripe. Kreditkarte, SEPA, PayPal, Klarna, Apple / Google Pay.",
              },
              {
                n: "3",
                h: "E-Mail mit Download abwarten",
                p: "Browser schließen, weiterarbeiten. Nach bis zu ein paar Stunden kommt der Download-Link per E-Mail. ZIP mit 12 Bildern + 2 Logos, Google-Ads-ready.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-cream border border-charcoal/10 rounded-[10px] p-7"
              >
                <div className="w-9 h-9 bg-gold/15 text-gold-dark rounded-full flex items-center justify-center text-[14px] font-black mb-4">
                  {step.n}
                </div>
                <h3 className="text-[16px] font-bold mb-2 text-charcoal">{step.h}</h3>
                <p className="text-[14px] text-charcoal/65 leading-relaxed">
                  {step.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORMATS (PMax-Spec-Cards) ═══ */}
      <FormatGridSection />

      {/* ═══ EXAMPLES (show real ads to browse) ═══ */}
      <section id="examples" className="bg-white px-5 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-3">
            Beispiele
          </p>
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4 text-balance">
            Fünf echte Paket-Muster.
          </h2>
          <p className="text-[17px] text-charcoal/65 leading-relaxed max-w-[560px] mb-10">
            Jedes Paket sieht anders aus — abgestimmt auf Marke, Branche und
            Bildsprache. Ein kleiner Auszug aus der Range der Landscape-Motive:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_ADS.map((ad) => (
              <figure
                key={ad.id}
                className="relative rounded-xl overflow-hidden shadow-md ring-1 ring-charcoal/8"
                style={{ aspectRatio: "16 / 9", background: ad.gradient }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ad.imageUrl}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: ad.objectPosition ?? "50% 50%" }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  }}
                />
                {/* Pures Motiv — keine Text-Overlays. Headline, Subline
                    und CTA sieht der User später in der scroll-getriggerten
                    Diashow. Hier geht's nur darum, die Bildsprache-Range
                    der 5 Beispiel-Pakete zu zeigen. Dezentes Branchen-Label
                    unten rechts als Kontext. */}
                <span className="absolute bottom-2 right-2 bg-black/55 backdrop-blur-sm text-white text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded">
                  {ad.category}
                </span>
              </figure>
            ))}
          </div>
          <p className="text-[13px] text-charcoal/45 mt-6 text-center">
            Dein Paket enthält 4 Motive in je 3 Formaten (1:1, 1.91:1, 4:5) + 2 Logo-Varianten.
          </p>
        </div>
      </section>

      {/* ═══ ANIMATED BANNER DEMO (bonus preview) ═══ */}
      <AnimatedBannerDemoSection />

      {/* ═══ TUTORIAL SECTION (dark) ═══ */}
      <section id="tutorial" className="bg-charcoal text-cream px-5 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold mb-3">
            Tutorial
          </p>
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4 text-balance">
            Ad Fatigue erkennen & neue Assets einbuchen — in 3 Minuten
          </h2>
          <p className="text-[17px] text-cream/65 leading-relaxed max-w-[620px] mx-auto mb-12">
            Wie du in Google Ads prüfst, ob deine Assets müde sind — und wie du
            das ZIP in unter 5 Minuten in deine PMax-Kampagne bekommst.
          </p>

          <button
            className="group relative w-full max-w-[960px] mx-auto aspect-video rounded-xl border border-cream/10 bg-charcoal/60 flex flex-col items-center justify-center gap-3 overflow-hidden hover:border-gold/40 transition-colors"
            aria-label="Tutorial-Video abspielen"
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0, rgba(255,255,255,.05) 1px, transparent 1px, transparent 14px)",
              }}
            />
            <div className="relative w-[72px] h-[72px] rounded-full bg-gold flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform">
              <Play size={26} className="text-charcoal fill-charcoal ml-1" />
            </div>
            <p className="relative text-[13px] text-cream/45">
              Tutorial · ca. 3 Minuten
            </p>
          </button>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[960px] mx-auto mt-8">
            {[
              ["01", "Asset-Bewertung finden", "In Google Ads öffnen"],
              ["02", "ZIP entpacken", "Bilder vorbereiten"],
              ["03", "Assets hochladen", "In PMax-Kampagne"],
              ["04", "Report auswerten", "Kombinations-Analyse"],
            ].map(([n, h, s]) => (
              <div
                key={n}
                className="bg-cream/5 border border-cream/10 rounded-md p-4 text-left"
              >
                <p className="text-[22px] font-black text-gold mb-1.5">{n}</p>
                <p className="text-[14px] font-semibold text-cream mb-1">{h}</p>
                <p className="text-[12px] text-cream/45">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="bg-white px-5 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-3">
            Preise
          </p>
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-4">
            Einfach. Einmalig. 39,99 €.
          </h2>
          <p className="text-[17px] text-charcoal/65 leading-relaxed max-w-[560px] mx-auto mb-12">
            Kein Abo, kein Risiko. Einmal zahlen, Paket per E-Mail bekommen.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* Featured Card */}
            <div className="relative w-full max-w-[380px] bg-cream border-2 border-gold rounded-2xl p-9 text-left shadow-[0_0_0_4px_rgba(57,116,242,0.12)]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-cream text-[11px] font-bold uppercase tracking-[0.06em] px-3.5 py-1 rounded-full whitespace-nowrap">
                Beliebteste Wahl
              </span>
              <p className="text-[13px] font-semibold text-charcoal/65 mb-1">
                PMax Asset Paket
              </p>
              <div className="text-[52px] font-black tracking-tight leading-none mt-4 mb-1 text-charcoal">
                <sup className="text-[24px] font-bold align-top mt-2.5">€</sup>
                39<span className="text-[32px]">,99</span>
              </div>
              <p className="text-[12px] text-charcoal/45 mb-6">
                einmalig · inkl. MwSt. · Lieferung per E-Mail
              </p>
              <ul className="list-none mb-7 space-y-0">
                {[
                  "12 individuelle Bild-Assets",
                  "4 Motive × 3 Formate (1:1, 1.91:1, 4:5)",
                  "2 Logo-Varianten auf PMax-Spec",
                  "KI-Analyse deiner Website",
                  "QC-Review jedes Bildes",
                  "ZIP-Download per E-Mail",
                  "Volle kommerzielle Nutzungsrechte",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 py-1.5 text-[14px] text-charcoal/75 border-b border-charcoal/8 last:border-b-0"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-emerald-600" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToHero}
                className="w-full bg-gold hover:bg-gold-dark text-cream font-bold text-[16px] py-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <Lock size={16} />
                Jetzt kaufen – 39,99 €
              </button>
              <div className="flex items-center justify-center gap-2 mt-3.5 flex-wrap">
                {["VISA", "MC", "AMEX", "SEPA", "KLARNA", "PAYPAL", "APPLE PAY"].map(
                  (pm) => (
                    <span
                      key={pm}
                      className="text-[10px] font-bold text-charcoal/40 bg-cream border border-charcoal/10 rounded px-2 py-0.5 tracking-[0.04em]"
                    >
                      {pm}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Agency Card */}
            <div className="w-full max-w-[380px] bg-cream border-2 border-charcoal/10 rounded-2xl p-9 text-left flex flex-col">
              <p className="text-[13px] font-semibold text-charcoal/65 mb-1">
                Für Agenturen & Wiederverkäufer
              </p>
              <div className="text-[36px] font-black tracking-tight leading-none mt-4 mb-1 text-charcoal">
                Auf Anfrage
              </div>
              <p className="text-[12px] text-charcoal/45 mb-6">
                White-Label · API-Zugang · Volumen-Deals
              </p>
              <ul className="list-none mb-7 space-y-0 flex-1">
                {[
                  "Unbegrenzte Pakete pro Monat",
                  "White-Label-Option",
                  "API-Integration für Workflow",
                  "Prioritäts-Support",
                  "Individuelle Abrechnung",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 py-1.5 text-[14px] text-charcoal/75 border-b border-charcoal/8 last:border-b-0"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-emerald-600" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:kontakt@sea-gute-freelancer.de?subject=Agentur-Anfrage%20pMax-Builder"
                className="w-full bg-charcoal hover:bg-charcoal/90 text-cream font-bold text-[16px] py-4 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                Kontakt aufnehmen
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="bg-cream px-5 lg:px-12 py-20">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[12px] font-bold tracking-[0.08em] uppercase text-gold-dark mb-3">
            Häufige Fragen
          </p>
          <h2 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-tight leading-tight mb-10">
            FAQ
          </h2>
          <div className="max-w-[720px]">
            {FAQS.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-charcoal text-cream/50 px-5 lg:px-12 pt-12 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-8 border-b border-cream/8 mb-6">
            <div>
              {/* Brand-Block — spiegelt das Nav-Layout: SGF (clickable nach /)
                  + Trennstrich + pMax-Builder als Sub-Brand. So bleibt klar,
                  dass dies ein SGF-Produkt ist und der User immer einen Weg
                  zurück zur Mutterseite hat. */}
              <div className="flex items-center gap-2.5 mb-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 group"
                  aria-label="Zur Hauptseite SEA Gute Freelancer"
                >
                  <span className="w-7 h-7 bg-gold rounded-sm flex items-center justify-center transition-transform group-hover:scale-105">
                    <span className="text-charcoal font-heading font-bold text-[9px] tracking-wider">
                      SGF
                    </span>
                  </span>
                  <span className="font-heading font-semibold text-[10px] tracking-[0.18em] uppercase text-cream/80 group-hover:text-cream transition-colors leading-none">
                    SEA GUTE
                    <br />
                    FREELANCER
                  </span>
                </Link>
                <span className="h-5 w-px bg-cream/15" aria-hidden="true" />
                <span className="text-[15px] font-black tracking-tight text-cream">
                  <span className="text-gold">p</span>Max-Builder
                </span>
              </div>
              <p className="text-[13px] leading-relaxed max-w-[260px]">
                Fertige Google PMax Assets auf Knopfdruck. KI-generiert,
                individuell für deine Marke. Einmalig zahlen, per E-Mail
                bekommen.
              </p>
            </div>
            {[
              {
                h: "Produkt",
                links: [
                  ["So funktioniert's", "#how-it-works"],
                  ["Beispiele", "#examples"],
                  ["Preise", "#pricing"],
                  ["FAQ", "#faq"],
                ],
              },
              {
                h: "Rechtliches",
                links: [
                  ["Impressum", "/impressum"],
                  ["Datenschutz", "/datenschutz"],
                  ["AGB", "/agb"],
                  ["Widerrufsbelehrung", "/widerruf"],
                ],
              },
              {
                h: "Kontakt",
                links: [
                  ["kontakt@sea-gute-freelancer.de", "mailto:kontakt@sea-gute-freelancer.de"],
                  ["Support", "mailto:hallo@sea-gute-freelancer.de"],
                ],
              },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-cream/30 mb-3.5">
                  {col.h}
                </h4>
                {col.links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="block text-[13px] mb-2 hover:text-cream transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3 text-[12px]">
            <div>
              <p>© 2026 pMax-Builder · Alle Rechte vorbehalten</p>
              <p className="mt-1 text-[11px]">
                Preise inkl. 19 % MwSt. · Lieferung ausschließlich als digitaler Download
              </p>
            </div>
            {/* SGF-Parent ist schon im Brand-Block oben sichtbar — hier kommt
                der zweite, dezent klickbare Backlink für Visitors, die direkt
                im Footer scrollen. */}
            <Link
              href="/"
              className="text-[11px] font-medium text-cream/45 hover:text-cream transition-colors inline-flex items-center gap-1.5 group"
            >
              <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
              Zurück zur SGF-Hauptseite
            </Link>
          </div>
        </div>
      </footer>

      {/* ═══ FLOATING SCROLL-BANNER ═══ */}
      {/* Banner wird beim geöffneten Payment-Modal unterdrückt, sonst
          überdeckt er den Darker-Backdrop des Modals mit seiner eigenen
          Box und wirkt deplatziert. */}
      <FloatingSampleBanner
        show={showFloatBanner && !bannerDismissed && payment === null}
        onDismiss={() => {
          setShowFloatBanner(false);
          setBannerDismissed(true);
        }}
        onCtaClick={triggerBannerCta}
      />

      {/* ═══ PAYMENT MODAL ═══ */}
      {/* Einziges Modal im Flow — öffnet sich wenn HeroWizard Payment
          anfordert (onRequestPayment-Callback). Enthält Mock-Checkout
          + Success-State. */}
      <PaymentModal payment={payment} onClose={() => setPayment(null)} />
    </div>
  );
}
