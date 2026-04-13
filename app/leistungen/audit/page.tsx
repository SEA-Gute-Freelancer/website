"use client";

import Link from "next/link";
import { ArrowRight, Search, BarChart3, Target, Layers, Zap, CheckCircle, FileText, TrendingUp, MousePointer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";

// Puzzle piece SVG icon
function PuzzleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 8h8c0-2.21 1.79-4 4-4s4 1.79 4 4h4c2.21 0 4 1.79 4 4v4c2.21 0 4 1.79 4 4s-1.79 4-4 4v8c0 2.21-1.79 4-4 4H28c0 2.21-1.79 4-4 4s-4-1.79-4-4H12c-2.21 0-4-1.79-4-4V20c-2.21 0-4-1.79-4-4s1.79-4 4-4v-4c0-2.21 1.79-4 4-4h8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hero right: BackgroundBoxes in a dark contained card
function AuditHeroVisual() {
  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-3xl bg-charcoal flex flex-col items-center justify-center">
      {/* Radial fade mask -- makes boxes bleed into the container edges */}
      <div className="absolute inset-0 w-full h-full bg-charcoal z-20 [mask-image:radial-gradient(260px_200px_at_center,transparent,white)] pointer-events-none" />
      <Boxes />
      {/* Center content */}
      <div className="relative z-30 text-center px-6">
        <div className="w-14 h-14 bg-gold/15 border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <PuzzleIcon className="w-7 h-7 text-gold" />
        </div>
        <p className="text-gold font-heading text-lg italic leading-snug">
          Das fehlende<br />Puzzlestück.
        </p>
        <p className="text-cream/40 text-[11px] tracking-widest uppercase mt-3">
          Wir finden es.
        </p>
      </div>
    </div>
  );
}

// What we analyze
const auditItems = [
  { icon: Target,       label: "Kampagnenstruktur",    desc: "Sind deine Kampagnen, Anzeigengruppen und Keywords logisch aufgebaut?" },
  { icon: Search,       label: "Keywords & Negatives", desc: "Streust du Budget auf irrelevante Suchanfragen? Wir sehen es sofort." },
  { icon: FileText,     label: "Anzeigenqualität",     desc: "Wie gut sind deine Creatives? Qualitätsfaktor, CTR, Relevanz." },
  { icon: MousePointer, label: "Landingpages",         desc: "Leitet dein Traffic auf Seiten, die wirklich konvertieren?" },
  { icon: BarChart3,    label: "Conversion Tracking",  desc: "Misst du die richtigen Conversions — oder nur Vanity Metrics?" },
  { icon: TrendingUp,   label: "Budget & Gebote",      desc: "Setzt du Budget dort ein, wo es den größten Impact hat?" },
];

// Process steps
const steps = [
  { num: "01", title: "Analyse",     desc: "Wir schauen uns dein Konto an — gründlich, ehrlich, ohne Schönreden." },
  { num: "02", title: "Report",      desc: "Du bekommst einen klaren Bericht mit den wichtigsten Findings." },
  { num: "03", title: "Prioritäten", desc: "Wir sortieren nach Impact. Was bringt am meisten — das kommt zuerst." },
  { num: "04", title: "Umsetzung",   desc: "Optional: Wir setzen die Empfehlungen direkt für dich um." },
];

// Deliverables
const deliverables = [
  "Detaillierter Audit-Report (PDF)",
  "Priorisierte Handlungsempfehlungen",
  "Konkrete Quick Wins für sofortige Verbesserung",
  "Benchmark gegen Branchendurchschnitt",
  "Persönliches Nachgespräch (60 Min.)",
];

// Page
export default function AuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/4 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <FadeIn className="mb-8">
            <div className="flex items-center gap-2 text-xs text-warm-muted">
              <Link href="/leistungen" className="hover:text-gold transition-colors">Leistungen</Link>
              <span>/</span>
              <span className="text-gold font-medium">Audit</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: text */}
            <div>
              <FadeIn>
                <p className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
                  Google Ads Audit
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
                  Das fehlende<br />
                  <span className="italic text-gold">Puzzlestück.</span>
                </h1>
                <p className="text-warm-muted text-[15px] sm:text-base leading-relaxed">
                  Manchmal liegt das größte Potenzial nicht im Offensichtlichen. Mit unserem Audit finden wir genau das, was deiner Kampagne wirklich fehlt — nicht immer sofort, aber mit vereinten Kräften.
                </p>
                <p className="text-warm-muted text-[15px] sm:text-base leading-relaxed mt-4">
                  Kein Copy-paste-Report. Kein Buzzword-Bingo. Sondern eine ehrliche, tiefe Analyse deines Kontos — mit konkreten nächsten Schritten.
                </p>
              </FadeIn>

              <FadeIn delay={0.2} className="mt-8">
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/kontakt"
                    className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gold text-charcoal font-semibold rounded-full text-[15px] hover:bg-gold-dark hover:text-cream transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
                  >
                    Audit anfragen
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

            {/* Right: background boxes visual */}
            <FadeIn delay={0.3} className="hidden lg:block">
              <AuditHeroVisual />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* What we analyze */}
      <section className="py-20 lg:py-32 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-12 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Was wir analysieren</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight">
              Jedes Stück<br />
              <span className="italic text-gold">zählt.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {auditItems.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label}>
                  <div className="bg-white border border-gold/12 rounded-2xl p-6 hover:border-gold/35 hover:shadow-md hover:shadow-gold/6 transition-all duration-300 h-full">
                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-[15px] text-charcoal font-semibold mb-2">{item.label}</h3>
                    <p className="text-warm-muted text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-32 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-12 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">So läuft es ab</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-cream leading-tight">
              Von Konto-Zugang<br />
              <span className="italic text-gold">zu klaren Antworten.</span>
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {steps.map((step, i) => (
              <StaggerItem key={step.num}>
                <div className="relative bg-cream/5 border border-cream/10 rounded-2xl p-6 lg:p-8 h-full hover:border-gold/30 transition-colors duration-300">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gold/20 z-10" />
                  )}
                  <p className="font-heading text-4xl text-gold/25 mb-4">{step.num}</p>
                  <h3 className="font-heading text-lg text-cream mb-2">{step.title}</h3>
                  <p className="text-cream/55 text-[13px] leading-relaxed">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Was du bekommst</p>
              <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
                Kein Report<br />
                <span className="italic text-gold">der in der Schublade landet.</span>
              </h2>
              <p className="text-warm-muted text-[15px] leading-relaxed">
                Unser Audit ist kein Selbstzweck. Er ist der Startpunkt für echte Verbesserung — mit klaren Prioritäten und einem konkreten Plan.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-white border border-gold/15 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-gold/10 rounded-xl flex items-center justify-center">
                    <Layers size={17} className="text-gold" />
                  </div>
                  <p className="font-heading text-charcoal text-[15px] font-semibold">Im Audit enthalten</p>
                </div>
                <ul className="flex flex-col gap-3.5">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                      <span className="text-warm-muted text-[14px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal border-t border-gold/20 text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <div className="w-14 h-14 bg-gold/15 border border-gold/25 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <PuzzleIcon className={cn("w-7 h-7 text-gold")} />
          </div>
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Bereit?</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-cream leading-tight mb-6">
            Lass uns gemeinsam<br />
            <span className="italic text-gold">das fehlende Stück finden.</span>
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Schick uns deinen Google Ads Zugang. Wir melden uns innerhalb von 48 Stunden mit ersten Eindrücken — kostenlos.
          </p>
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2.5 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20"
          >
            Audit anfragen
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
