"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Search, Brain, Globe, TrendingUp,
  Layers, BarChart3, FileText,
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

            {/* Left: new copy */}
            <div>
              <FadeIn>
                <p className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
                  SEO + GEO
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
                  ADS are coming<br />
                  <span className="italic text-gold">to AI.</span>
                </h1>
                <p className="text-warm-muted text-[15px] sm:text-base leading-relaxed">
                  SEO (Search Engine Optimization) optimiert Inhalte für klassische Suchmaschinen, während GEO (Generative Engine Optimization) Inhalte für KI-basierte Suchsysteme wie ChatGPT, Claude oder Gemini optimiert.
                </p>
                <p className="text-warm-muted text-[15px] sm:text-base leading-relaxed mt-4">
                  Der Status quo: GEO steckt noch in den Kinderschuhen. Ob dein Business mit AI Max wirklich in Gemini landet oder ob deine robots.txt-Datei mit den entsprechenden Metadaten einfach falsch ist, entscheidet sich erst noch. Du musst kein Early Adopter sein — es reicht, wenn wir den Trend für dich im Auge behalten.
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

            {/* Right: scramble animation inside a button-style frame */}
            <FadeIn delay={0.25} className="hidden lg:flex items-center justify-center">
              <div
                className="relative select-none inline-flex flex-col items-center justify-center gap-5 px-12 py-10 rounded-2xl border border-charcoal/15 bg-white shadow-sm"
                style={{ minWidth: "340px" }}
              >
                <p className="text-[11px] font-medium text-warm-muted tracking-[0.2em] uppercase">
                  Hover mal
                </p>
                <ScrambleText
                  from="SEO ohne GEO?"
                  to="NO GO!"
                  className="block font-heading text-5xl lg:text-6xl xl:text-7xl italic text-gold cursor-default leading-none whitespace-nowrap"
                />
                <p className="text-[11px] text-warm-muted/60 tracking-wide">
                  — und du weißt Bescheid.
                </p>
              </div>
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
