"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Target, Users, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

const AnimatedCharacters = dynamic(
  () => import("@/components/ui/animated-characters").then((m) => ({ default: m.AnimatedCharacters })),
  { ssr: false, loading: () => <div className="w-[460px] h-[340px]" /> }
);

const valueIcons = [Target, Heart, Users, Zap];

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-0">
          <div className="relative rounded-3xl overflow-hidden bg-charcoal border border-gold/15 flex flex-col md:flex-row md:items-end md:min-h-[480px]">

            {/* Left — text */}
            <div className="flex-1 p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-gold text-sm font-medium tracking-widest uppercase mb-5"
              >
                {a.hero.label}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-4xl lg:text-5xl xl:text-6xl text-cream leading-tight mb-6"
              >
                {a.hero.h1a}
                <br />
                <span className="italic text-gold">{a.hero.h1b}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-cream/55 text-[17px] leading-relaxed max-w-sm"
              >
                {a.hero.p}
              </motion.p>
            </div>

            {/* Right — animated characters */}
            <div className="hidden md:flex shrink-0 items-end justify-center px-6 lg:px-10 pt-0">
              <AnimatedCharacters />
            </div>

          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-14 lg:py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85"
                alt="Team Collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <h2 className="font-heading text-4xl text-charcoal mb-6 leading-tight">{a.story.h2}</h2>
            <p className="text-warm-muted text-[17px] leading-relaxed mb-5">{a.story.p1}</p>
            <p className="text-warm-muted text-[17px] leading-relaxed mb-5">{a.story.p2}</p>
            <p className="text-warm-muted text-[17px] leading-relaxed mb-8">{a.story.p3}</p>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-dark hover:text-cream transition-all duration-300"
            >
              {a.story.cta}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-10 lg:mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{a.values.label}</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight">{a.values.h2}</h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {a.values.items.map((v, idx) => {
              const Icon = valueIcons[idx];
              return (
                <StaggerItem key={v.title}>
                  <div className="p-5 sm:p-8 bg-white border border-gold/15 rounded-3xl">
                    <div className="w-11 h-11 bg-gold/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-xl text-charcoal mb-3">{v.title}</h3>
                    <p className="text-warm-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 lg:py-28 bg-charcoal text-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{a.timeline.label}</p>
            <h2 className="font-heading text-4xl text-cream leading-tight">{a.timeline.h2}</h2>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/20" />
            <StaggerContainer className="space-y-10" staggerDelay={0.12}>
              {a.timeline.items.map((m) => (
                <StaggerItem key={m.year} direction="left">
                  <div className="flex gap-5 pl-12 relative">
                    <div className="absolute left-0 w-10 h-10 sm:w-12 sm:h-12 bg-charcoal border-2 border-gold rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gold font-heading text-xs font-bold">{m.year.slice(2)}</span>
                    </div>
                    <div>
                      <p className="text-gold text-sm font-medium mb-1">{m.year}</p>
                      <p className="text-cream/75 text-[16px] leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-24 bg-cream text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-charcoal mb-6">{a.cta.h2}</h2>
          <p className="text-warm-muted text-lg mb-8">{a.cta.p}</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-dark hover:text-cream transition-all duration-300"
          >
            {a.cta.btn}
            <ArrowRight size={17} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
