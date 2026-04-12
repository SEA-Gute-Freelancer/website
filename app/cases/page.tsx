"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CasesPage() {
  const { t } = useLanguage();
  const c = t.cases;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-40 pb-14 lg:pb-20 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{c.hero.label}</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl text-charcoal leading-tight mb-6">
              {c.hero.h1a}
              <br />
              <span className="italic text-gold">{c.hero.h1b}</span>
            </h1>
            <p className="text-warm-muted text-base sm:text-xl leading-relaxed max-w-xl">{c.hero.p}</p>
          </FadeIn>
        </div>
      </section>

      {/* Summary stats */}
      <section className="bg-charcoal py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {c.stats.map((s) => (
              <FadeIn key={s.label} className="text-center">
                <div className="font-heading text-4xl text-gold font-bold mb-1">{s.value}</div>
                <div className="text-cream/50 text-sm">{s.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 pb-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
          {c.items.map((item, i) => (
            <FadeIn key={item.client} delay={0.05}>
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-gold/15 rounded-3xl overflow-hidden"
              >
                <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                  {/* Image */}
                  <div className={`relative min-h-[200px] sm:min-h-[280px] lg:min-h-[420px] ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <Image
                      src={item.img}
                      alt={item.client}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal/30" />
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold text-charcoal text-[11px] font-bold rounded-full tracking-wide">
                        <TrendingUp size={10} />
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-8 lg:p-12">
                    <div className="mb-6">
                      <p className="text-warm-muted text-xs mb-1">{item.sector} · {item.location}</p>
                      <h2 className="font-heading text-2xl text-charcoal">{item.client}</h2>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-[11px] font-semibold text-charcoal uppercase tracking-wider mb-1">{c.challengeLabel}</p>
                        <p className="text-warm-muted text-sm leading-relaxed">{item.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-charcoal uppercase tracking-wider mb-1">{c.solutionLabel}</p>
                        <p className="text-warm-muted text-sm leading-relaxed">{item.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {item.results.map((r) => (
                        <div key={r.label} className="bg-cream-dark rounded-xl p-3 text-center">
                          <div className="font-heading text-xl text-gold font-bold">{r.metric}</div>
                          <div className="text-charcoal text-[11px] font-medium mt-0.5">{r.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="border-l-2 border-gold pl-4 text-warm-muted text-sm leading-relaxed italic mb-1">
                      „{item.quote}"
                    </blockquote>
                    <p className="text-warm-muted text-xs ml-4">{item.person}</p>
                  </div>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-cream text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-cream mb-6">
            {c.cta.h2a}
            <span className="italic text-gold"> {c.cta.h2b}</span>
          </h2>
          <p className="text-cream/65 text-lg mb-8">{c.cta.p}</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-light transition-all duration-300"
          >
            {c.cta.btn}
            <ArrowRight size={17} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
