"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Search, Brain, Globe, TrendingUp,
  Layers, BarChart3, Eye, FileText, Zap,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

// Scramble text animation
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?#@&%";

function ScrambleText({
  from,
  to,
  className,
}: {
  from: string;
  to: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [display, setDisplay] = useState(from);
  const rafRef = useRef<number | null>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const target = hovered ? to : from;
    frameRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Each character settles every SETTLE_EVERY frames (~50ms at 60fps)
    const SETTLE_EVERY = 3;

    function tick() {
      frameRef.current++;
      const revealed = Math.floor(frameRef.current / SETTLE_EVERY);
      const out = target
        .split("")
        .map((char, i) => {
          if (char === " ") return "\u00A0";
          if (i < revealed) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      setDisplay(out);
      if (revealed < target.length) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hovered, from, to]);

  return (
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {display}
    </span>
  );
}

// Coverage visual for hero right side
const searchSources = [
  { label: "Google Search",       tag: "SEO", icon: Search,     color: "bg-blue-50 border-blue-100 text-blue-600" },
  { label: "Google AI Overviews", tag: "GEO", icon: Brain,      color: "bg-gold/8 border-gold/20 text-gold" },
  { label: "ChatGPT Search",      tag: "GEO", icon: Zap,        color: "bg-gold/8 border-gold/20 text-gold" },
  { label: "Perplexity AI",       tag: "GEO", icon: Globe,      color: "bg-gold/8 border-gold/20 text-gold" },
  { label: "Bing Copilot",        tag: "GEO", icon: Eye,        color: "bg-gold/8 border-gold/20 text-gold" },
];

function CoverageVisual() {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gold/4 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative bg-white border border-gold/15 rounded-3xl p-6 shadow-xl shadow-charcoal/6">
        <p className="text-[11px] font-medium text-warm-muted tracking-widest uppercase mb-4">
          Deine Sichtbarkeit
        </p>

        <div className="flex flex-col gap-2">
          {searchSources.map((src, i) => {
            const Icon = src.icon;
            return (
              <motion.div
                key={src.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 + 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${src.color}`}>
                  <Icon size={14} />
                </div>
                <span className="text-charcoal text-[13px] font-medium flex-1">{src.label}</span>
                <span className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full ${src.tag === "GEO" ? "bg-gold/15 text-gold" : "bg-blue-50 text-blue-500"}`}>
                  {src.tag}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Coverage bar */}
        <div className="mt-5 pt-4 border-t border-gold/10">
          <div className="flex justify-between text-[11px] text-warm-muted mb-2">
            <span>Abdeckung ohne GEO</span>
            <span className="text-charcoal font-semibold">20 %</span>
          </div>
          <div className="h-1.5 bg-gold/10 rounded-full overflow-hidden mb-3">
            <div className="h-full w-[20%] bg-charcoal/30 rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] text-warm-muted mb-2">
            <span>Abdeckung mit SEO + GEO</span>
            <span className="text-gold font-semibold">100 %</span>
          </div>
          <div className="h-1.5 bg-gold/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              initial={{ width: "20%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Benefits
const benefits = [
  {
    icon: Search,
    title: "Klassisches SEO",
    desc: "Technisches SEO, On-Page-Optimierung, Linkaufbau — alles was Google-Rankings treibt.",
  },
  {
    icon: Brain,
    title: "Generative Engine Optimization",
    desc: "Wir strukturieren Content so, dass KI-Systeme deine Marke als Antwort liefern — nicht nur als Link.",
  },
  {
    icon: TrendingUp,
    title: "Messbare Ergebnisse",
    desc: "Rankings, AI-Mentions, organischer Traffic — du siehst genau, wo du stehst und wo du wächst.",
  },
];

// Process
const steps = [
  { num: "01", title: "Audit", desc: "Technisches SEO-Audit + Analyse deiner Sichtbarkeit in AI-Suchantworten." },
  { num: "02", title: "Strategie", desc: "Keyword- und Content-Plan für klassische Suche UND für AI-Overviews." },
  { num: "03", title: "Umsetzung", desc: "On-Page-Optimierung, strukturierte Daten, E-E-A-T-Content, GEO-Signale." },
  { num: "04", title: "Wachstum", desc: "Monatliches Reporting mit KPIs aus beiden Welten — Search und AI." },
];

// What is GEO
const geoFacts = [
  { icon: Brain,    text: "ChatGPT, Perplexity & Co. beantworten Fragen direkt — ohne Klick auf eine Website." },
  { icon: Globe,    text: "Google AI Overviews erscheinen über den klassischen Suchergebnissen." },
  { icon: Layers,   text: "Wer hier nicht auftaucht, verliert Sichtbarkeit — egal wie gut sein SEO ist." },
  { icon: FileText, text: "GEO optimiert Content speziell für KI-Systeme: Struktur, Kontext, Autorität." },
  { icon: BarChart3, text: "Studien zeigen: Bis zu 60% der Suchanfragen enden ohne Klick auf ein Ergebnis." },
];

// Page
export default function SeoGeoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-cream overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/4 rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <FadeIn className="mb-8">
            <div className="flex items-center gap-2 text-xs text-warm-muted">
              <Link href="/leistungen" className="hover:text-gold transition-colors">Leistungen</Link>
              <span>/</span>
              <span className="text-gold font-medium">SEO + GEO</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: text */}
            <div>
              <FadeIn>
                <p className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
                  SEO + GEO
                </p>

                {/* Scramble heading */}
                <h1 className="font-heading text-charcoal leading-tight mb-6">
                  <span className="block text-3xl sm:text-4xl lg:text-[2.6rem] mb-1">
                    Sichtbarkeit in Suche
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-[2.6rem] mb-4">
                    und KI — oder keins von beidem.
                  </span>
                  <ScrambleText
                    from="SEO ohne GEO?"
                    to="NO GO!"
                    className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl italic text-gold cursor-default select-none leading-none mt-2"
                  />
                </h1>

                <p className="text-warm-muted text-lg leading-relaxed mt-6">
                  KI-Suchwerkzeuge wie ChatGPT, Perplexity und Google AI Overviews beantworten Fragen direkt — ohne Klick auf eine Website. Klassisches SEO reicht nicht mehr. Du brauchst beides.
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
            </div>

            {/* Right: coverage visual */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <CoverageVisual />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* What is GEO */}
      <section className="py-20 lg:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeIn>
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Was ist GEO?</p>
              <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
                Die neue Suche<br />
                <span className="italic text-gold">braucht neue Regeln.</span>
              </h2>
              <p className="text-warm-muted text-[15px] leading-relaxed">
                Generative Engine Optimization (GEO) ist die Disziplin, Inhalte so aufzubereiten, dass KI-Systeme sie als vertrauenswürdige Quellen verwenden — und deine Marke in generierten Antworten nennen.
              </p>
            </FadeIn>

            <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.08}>
              {geoFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <StaggerItem key={fact.text}>
                    <div className="flex items-start gap-4 bg-white border border-gold/12 rounded-2xl p-5">
                      <div className="w-9 h-9 bg-gold/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <p className="text-warm-muted text-[14px] leading-relaxed">{fact.text}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-12 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">So arbeiten wir</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight">
              Von Audit zu<br />
              <span className="italic text-gold">voller Sichtbarkeit.</span>
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

      {/* Benefits */}
      <section className="py-20 lg:py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-12 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Was du bekommst</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-cream leading-tight">
              SEO + GEO aus<br />
              <span className="italic text-gold">einer Hand.</span>
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
            <span className="italic text-gold">Sichtbarkeit ausbauen.</span>
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Kostenloses Erstgespräch. Wir analysieren deine aktuelle SEO-Performance und zeigen dir, wie viel Potenzial durch GEO noch ungenutzt bleibt.
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
