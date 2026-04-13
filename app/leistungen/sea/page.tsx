"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, PlayCircle, Monitor, Compass, Mail, MapPin, Zap, Target, BarChart3, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

// Network Data
// CENTER is the true midpoint of the 800x540 viewBox
const CENTER = { x: 400, y: 270 };

// Each node routes via an L-shaped circuit-board path to the center.
// dotWx/dotWy are the 3 keyframe waypoints for the traveling dot.
// dotTimes maps each waypoint to a fraction of the animation duration.
const networkNodes = [
  {
    id: "search", label: "Search", desc: "Leute, die jetzt kaufen wollen",
    x: 400, y: 82,  delay: 0,    icon: Search,
    path: "M 400,82 L 400,270",
    dotWx: [400, 400, 400],
    dotWy: [82, 176, 270],
    dotTimes: [0, 0.5, 1],
  },
  {
    id: "youtube", label: "YouTube", desc: "Starke Markenwirkung",
    x: 563, y: 176, delay: 0.15, icon: PlayCircle,
    path: "M 563,176 L 563,270 L 400,270",
    dotWx: [563, 563, 400],
    dotWy: [176, 270, 270],
    dotTimes: [0, 0.366, 1],
  },
  {
    id: "display", label: "Display", desc: "Neue Kunden entdecken",
    x: 563, y: 364, delay: 0.3,  icon: Monitor,
    path: "M 563,364 L 563,270 L 400,270",
    dotWx: [563, 563, 400],
    dotWy: [364, 270, 270],
    dotTimes: [0, 0.366, 1],
  },
  {
    id: "discovery", label: "Discovery", desc: "Interessierte Nutzer finden",
    x: 400, y: 458, delay: 0.45, icon: Compass,
    path: "M 400,458 L 400,270",
    dotWx: [400, 400, 400],
    dotWy: [458, 364, 270],
    dotTimes: [0, 0.5, 1],
  },
  {
    id: "gmail", label: "Gmail", desc: "Direkt in der Inbox",
    x: 237, y: 364, delay: 0.6,  icon: Mail,
    path: "M 237,364 L 237,270 L 400,270",
    dotWx: [237, 237, 400],
    dotWy: [364, 270, 270],
    dotTimes: [0, 0.366, 1],
  },
  {
    id: "maps", label: "Maps", desc: "Unterwegs erreichen",
    x: 237, y: 176, delay: 0.75, icon: MapPin,
    path: "M 237,176 L 237,270 L 400,270",
    dotWx: [237, 237, 400],
    dotWy: [176, 270, 270],
    dotTimes: [0, 0.366, 1],
  },
];

// Network Visualization -- CPU-architecture style
// Paths route orthogonally (like circuit board traces), dots flow node -> center
function NetworkVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative w-full max-w-[800px] mx-auto" style={{ aspectRatio: "800/540" }}>

      {/* SVG: circuit paths + traveling dots + corner joints */}
      <svg
        viewBox="0 0 800 540"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {networkNodes.map((node) => (
          <g key={node.id}>
            {/* Trace: draws from node toward center */}
            <motion.path
              d={node.path}
              fill="none"
              stroke="#C9A96E"
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 1.0, delay: node.delay + 0.3, ease: "easeOut" },
                opacity:     { duration: 0.15, delay: node.delay + 0.3 },
              }}
            />

            {/* Corner joint dot (only for L-shaped paths) */}
            {node.dotWx[0] !== node.dotWx[2] && (
              <motion.circle
                cx={node.dotWx[1]}
                cy={node.dotWy[1]}
                r={2.5}
                fill="#C9A96E"
                fillOpacity={0.35}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: node.delay + 1.1, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}

            {/* Traveling dot: flows along trace from node to center */}
            {inView && (
              <motion.circle
                r={3}
                fill="#C9A96E"
                initial={{ cx: node.dotWx[0], cy: node.dotWy[0], opacity: 0 }}
                animate={{
                  cx:      node.dotWx,
                  cy:      node.dotWy,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration:    2.0,
                  delay:       node.delay + 1.4,
                  times:       node.dotTimes,
                  ease:        "linear",
                  repeat:      Infinity,
                  repeatDelay: 1.5 + node.delay * 0.4,
                }}
              />
            )}
          </g>
        ))}

        {/* Subtle center glow */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={52}
          fill="#C9A96E"
          fillOpacity={0}
          animate={inView ? { fillOpacity: [0, 0.06, 0] } : {}}
          transition={{ duration: 2.8, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Center chip: "Erfolg mit SEA" */}
      <motion.div
        className="absolute z-10"
        style={{
          left: `${(CENTER.x / 800) * 100}%`,
          top:  `${(CENTER.y / 540) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative bg-charcoal border-2 border-gold/60 rounded-2xl px-5 py-4 shadow-2xl shadow-charcoal/30 text-center w-[148px] sm:w-[168px]">
          {/* Outer pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-gold/25"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center mx-auto mb-2">
            <Zap size={16} className="text-charcoal" />
          </div>
          <p className="text-cream font-heading text-[12px] sm:text-[13px] leading-snug">
            Erfolg<br />
            <span className="text-gold italic">mit SEA</span>
          </p>
        </div>
      </motion.div>

      {/* Satellite channel nodes */}
      {networkNodes.map((node) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            className="absolute z-10"
            style={{
              left: `${(node.x / 800) * 100}%`,
              top:  `${(node.y / 540) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: node.delay + 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative bg-white border border-gold/20 rounded-xl px-3 py-2.5 shadow-md shadow-charcoal/6 text-center w-[110px] sm:w-[124px] hover:border-gold/50 transition-all duration-300">
              <div className="w-6 h-6 bg-gold/10 rounded-lg flex items-center justify-center mx-auto mb-1.5">
                <Icon size={13} className="text-gold" />
              </div>
              <p className="text-charcoal font-heading text-[11px] sm:text-[12px] font-semibold leading-tight">
                {node.label}
              </p>
              <p className="text-warm-muted text-[9px] sm:text-[10px] leading-tight mt-0.5 hidden sm:block">
                {node.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Benefits
const benefits = [
  {
    icon: Target,
    title: "Nur echte Käufer",
    desc: "Du erreichst Menschen genau dann, wenn sie aktiv nach deinem Produkt oder deiner Dienstleistung suchen — nicht vorher, nicht danach.",
  },
  {
    icon: BarChart3,
    title: "Messbar bis auf den Cent",
    desc: "Kein anderer Kanal ist so transparent. Du siehst welche Keywords, Anzeigen und Kampagnen Umsatz bringen — und welche nicht.",
  },
  {
    icon: Clock,
    title: "Sofort skalierbar",
    desc: "Im Gegensatz zu SEO wirkt Google Ads ab Tag 1. Budget erhöhen, Reichweite wächst. Budget senken, Kosten sinken. Volle Kontrolle.",
  },
];

// Process
const steps = [
  { num: "01", title: "Analyse", desc: "Wir prüfen dein Konto, deine Mitbewerber und dein Budget. Ehrlich, ohne Bullshit." },
  { num: "02", title: "Strategie", desc: "Keywords, Kampagnenstruktur, Gebotsstrategien — alles auf dein Ziel ausgerichtet." },
  { num: "03", title: "Launch", desc: "Go-live in wenigen Tagen. Du siehst von Anfang an was passiert." },
  { num: "04", title: "Optimierung", desc: "Wöchentliche Anpassungen. Kein Set-and-forget — aktive Betreuung durch Spezialisten." },
];

// Page
export default function SeaPage() {
  return (
    <>
      {/* Hero — 2-col on desktop: text left, network right */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/4 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <FadeIn className="mb-8">
            <div className="flex items-center gap-2 text-xs text-warm-muted">
              <Link href="/leistungen" className="hover:text-gold transition-colors">Leistungen</Link>
              <span>/</span>
              <span className="text-gold font-medium">SEA</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left: headline, subline, CTAs */}
            <div>
              <FadeIn className="mb-4">
                <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
                  Search Engine Advertising
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
                  Eine Kampagne.
                  <br />
                  <span className="italic text-gold">Alle Google-Kanäle.</span>
                </h1>
                <p className="text-warm-muted text-lg leading-relaxed">
                  Maximaler Erfolg mit minimalem Aufwand — wir orchestrieren Search, YouTube, Display, Discovery, Gmail und Maps aus einer Hand.
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="mt-8">
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/kontakt"
                    className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gold text-charcoal font-semibold rounded-full text-[15px] hover:bg-gold-dark hover:text-cream transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
                  >
                    Kostenloses Erstgespräch
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/cases"
                    className="inline-flex items-center gap-2.5 px-7 py-4 border border-charcoal/20 text-charcoal font-medium rounded-full text-[15px] hover:border-charcoal/50 transition-all duration-300"
                  >
                    Ergebnisse ansehen
                  </Link>
                </div>
              </FadeIn>

              {/* Mobile: channel list */}
              <div className="lg:hidden grid grid-cols-2 gap-3 mt-10">
                {networkNodes.map((node) => {
                  const Icon = node.icon;
                  return (
                    <div key={node.id} className="bg-white border border-gold/15 rounded-xl p-3 flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon size={13} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-charcoal text-[12px] font-semibold">{node.label}</p>
                        <p className="text-warm-muted text-[10px] leading-tight">{node.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: network visualization — desktop only */}
            <FadeIn delay={0.25} className="hidden lg:block">
              <NetworkVisualization />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Process — first after hero */}
      <section className="py-20 lg:py-32 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-12 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">So arbeiten wir</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight">
              Von null auf<br />
              <span className="italic text-gold">Performance.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {steps.map((step, i) => (
              <StaggerItem key={step.num}>
                <div className="relative bg-white border border-gold/15 rounded-2xl p-6 lg:p-8 h-full">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gold/30 z-10" />
                  )}
                  <p className="font-heading text-4xl text-gold/20 mb-4">{step.num}</p>
                  <h3 className="font-heading text-lg text-charcoal mb-2">{step.title}</h3>
                  <p className="text-warm-muted text-[13px] leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why SEA */}
      <section className="py-20 lg:py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-12 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Warum SEA?</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-cream leading-tight">
              Der direkteste Weg<br />
              <span className="italic text-gold">zu deinen Kunden.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <StaggerItem key={b.title}>
                  <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 lg:p-8 hover:border-gold/30 transition-colors duration-300">
                    <div className="w-11 h-11 bg-gold/15 rounded-xl flex items-center justify-center mb-5">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-xl text-cream mb-3">{b.title}</h3>
                    <p className="text-cream/60 text-[14px] leading-relaxed">{b.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal border-t border-gold/20 text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Bereit?</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-cream leading-tight mb-6">
            Lass uns deine<br />
            <span className="italic text-gold">Kampagnen starten.</span>
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Kostenloses Erstgespräch. Keine Verpflichtung. Ehrliche Einschätzung was Google Ads für dein Business leisten kann.
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2.5 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
          >
            Jetzt anfragen
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
