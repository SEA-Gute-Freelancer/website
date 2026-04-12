"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Search, BarChart3, Zap, Globe, Layers,
  PieChart, ArrowRight, CheckCircle2
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { Spotlight } from "@/components/ui/spotlight";
import { useLanguage } from "@/contexts/LanguageContext";

const SplineScene = dynamic(
  () => import("@/components/ui/splite").then((m) => ({ default: m.SplineScene })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const serviceIcons = [Search, BarChart3, Zap, Globe, Layers];
const serviceColors = [
  "from-gold/20 to-gold/5",
  "from-blue-500/10 to-purple-500/5",
  "from-emerald-500/10 to-teal-500/5",
  "from-violet-500/10 to-indigo-500/5",
  "from-orange-500/10 to-amber-500/5",
];
const addonIcons = [Search, BarChart3, PieChart, Globe];

export default function LeistungenPage() {
  const { t } = useLanguage();
  const l = t.leistungen;

  return (
    <>
      {/* Hero — Spline */}
      <section className="relative pt-24 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="relative rounded-3xl overflow-hidden bg-charcoal border border-gold/15 flex flex-col md:flex-row md:min-h-[540px]">
            {/* Mouse-following spotlight */}
            <Spotlight size={400} />

            {/* Left — text */}
            <div className="flex-1 p-6 sm:p-10 lg:p-14 relative z-10 flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-gold text-sm font-medium tracking-widest uppercase mb-5"
              >
                {l.hero.label}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-4xl lg:text-5xl xl:text-6xl text-cream leading-tight mb-6"
              >
                {l.hero.splineH1a}
                <br />
                <span className="italic text-gold">{l.hero.splineH1b}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-cream/55 text-[17px] leading-relaxed max-w-sm"
              >
                {l.hero.p}
              </motion.p>
            </div>

            {/* Right — Spline */}
            <div className="hidden md:block flex-1 relative min-h-[420px] lg:min-h-[480px]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main services */}
      <section className="py-10 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-8">
          {l.services.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <FadeIn key={service.title} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-3xl border border-gold/15 bg-gradient-to-br ${serviceColors[i]} p-5 sm:p-8 lg:p-12`}
                >
                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gold/15 rounded-2xl flex items-center justify-center">
                          <Icon size={22} className="text-gold" />
                        </div>
                        <span className="text-[11px] font-semibold text-gold tracking-widest uppercase border border-gold/25 rounded-full px-3 py-1 bg-gold/8">
                          {service.tag}
                        </span>
                      </div>
                      <h2 className="font-heading text-3xl lg:text-4xl text-charcoal mb-2">{service.title}</h2>
                      <p className="text-gold font-medium mb-5">{service.subtitle}</p>
                      <p className="text-warm-muted text-[16px] leading-relaxed">{service.desc}</p>
                    </div>
                    <div>
                      <p className="text-charcoal font-medium text-sm mb-4 tracking-wide uppercase">{l.whatYouGet}</p>
                      <ul className="space-y-3">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-[15px] text-warm-muted">
                            <CheckCircle2 size={17} className="text-gold shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-14 lg:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-xl mb-14">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{l.addons.label}</p>
            <h2 className="font-heading text-4xl text-charcoal leading-tight">{l.addons.h2}</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
            {l.addons.items.map((a, idx) => {
              const Icon = addonIcons[idx];
              return (
                <StaggerItem key={a.title}>
                  <div className="p-6 bg-white border border-gold/15 rounded-2xl">
                    <Icon size={22} className="text-gold mb-4" />
                    <h3 className="font-heading text-lg text-charcoal mb-2">{a.title}</h3>
                    <p className="text-warm-muted text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 lg:py-28 bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center max-w-xl mx-auto mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{l.process.label}</p>
            <h2 className="font-heading text-4xl text-cream leading-tight">{l.process.h2}</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" staggerDelay={0.1}>
            {l.process.items.map((p) => (
              <StaggerItem key={p.step}>
                <div className="p-6 border border-cream/10 rounded-2xl bg-white/4">
                  <p className="font-heading text-4xl text-gold/30 font-bold mb-3">{p.step}</p>
                  <h3 className="font-heading text-xl text-cream mb-2">{p.title}</h3>
                  <p className="text-cream/55 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cream text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-charcoal mb-6">{l.cta.h2}</h2>
          <p className="text-warm-muted text-lg mb-8">{l.cta.p}</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-dark hover:text-cream transition-all duration-300"
          >
            {l.cta.btn}
            <ArrowRight size={17} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
