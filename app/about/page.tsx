"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, Target, Users, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

const AnimatedCharacters = dynamic(
  () => import("@/components/ui/animated-characters").then((m) => ({ default: m.AnimatedCharacters })),
  { ssr: false, loading: () => <div className="w-[460px] h-[340px]" /> }
);

const valueIcons = [Target, Heart, Users, Zap];

// Replace these paths with your own snapshots (place files in /public/photos/)
const STORY_PHOTOS = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80",
];

function PhotoScrollStory() {
  const { t } = useLanguage();
  const a = t.about;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Photo crossfades
  const p1o = useTransform(scrollYProgress, [0, 0.28, 0.40], [1, 1, 0]);
  const p2o = useTransform(scrollYProgress, [0.28, 0.40, 0.62, 0.74], [0, 1, 1, 0]);
  const p3o = useTransform(scrollYProgress, [0.62, 0.74, 1], [0, 1, 1]);
  const photoOpacities = [p1o, p2o, p3o];

  // Text blocks: slide up from bottom, hold, slide out up
  const t1y = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.40], ["60px", "0px", "0px", "-60px"]);
  const t1o = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.40], [0, 1, 1, 0]);

  const t2y = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.74], ["60px", "0px", "0px", "-60px"]);
  const t2o = useTransform(scrollYProgress, [0.35, 0.45, 0.62, 0.74], [0, 1, 1, 0]);

  const t3y = useTransform(scrollYProgress, [0.70, 0.82, 1], ["60px", "0px", "0px"]);
  const t3o = useTransform(scrollYProgress, [0.70, 0.82, 1], [0, 1, 1]);

  const textBlocks = [
    { y: t1y, opacity: t1o, text: a.story.p1 },
    { y: t2y, opacity: t2o, text: a.story.p2 },
    { y: t3y, opacity: t3o, text: a.story.p3 },
  ];

  // Progress dots
  const d1 = useTransform(scrollYProgress, [0, 0.33], [1, 0.3]);
  const d2 = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [0.3, 1, 1, 0.3]);
  const d3 = useTransform(scrollYProgress, [0.62, 0.72, 1], [0.3, 1, 1]);
  const dotOpacities = [d1, d2, d3];

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background photos */}
        <div className="absolute inset-0">
          {STORY_PHOTOS.map((src, idx) => (
            <motion.div key={idx} className="absolute inset-0" style={{ opacity: photoOpacities[idx] }}>
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={idx === 0}
              />
            </motion.div>
          ))}
          {/* Unified dark overlay — unifies the look across all photos */}
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>

        {/* Text content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 lg:px-16">
          <p className="text-gold/70 text-[11px] font-medium tracking-widest uppercase mb-10 lg:mb-14">
            {a.story.h2}
          </p>
          <div className="relative w-full max-w-2xl mx-auto text-center" style={{ height: "16rem" }}>
            {textBlocks.map((block, idx) => (
              <motion.div
                key={idx}
                style={{ y: block.y, opacity: block.opacity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p className="font-heading text-3xl lg:text-4xl xl:text-[2.75rem] text-cream leading-snug">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {dotOpacities.map((op, idx) => (
            <motion.div
              key={idx}
              style={{ opacity: op }}
              className="w-1.5 h-1.5 rounded-full bg-cream"
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-0">
          <div className="relative rounded-3xl overflow-hidden bg-charcoal border border-gold/15 flex flex-col md:flex-row md:items-end md:min-h-[480px]">
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
            <div className="hidden md:flex shrink-0 items-end justify-center px-6 lg:px-10 pt-0">
              <AnimatedCharacters />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Scroll Story */}
      <PhotoScrollStory />

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

      {/* CTA */}
      <section className="py-14 lg:py-24 bg-charcoal text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl text-cream mb-6">{a.cta.h2}</h2>
          <p className="text-cream/55 text-lg mb-8">{a.cta.p}</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-light transition-all duration-300"
          >
            {a.cta.btn}
            <ArrowRight size={17} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
