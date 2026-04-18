"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Heart, Target, Users, Zap } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

const AnimatedCharacters = dynamic(
  () => import("@/components/ui/animated-characters").then((m) => ({ default: m.AnimatedCharacters })),
  { ssr: false, loading: () => <div className="w-[460px] h-[340px]" /> }
);

const valueIcons = [Target, Heart, Users, Zap];

const STORY_PHOTOS = [
  "/photos/0FEFF30E-DDE1-42AF-B6C2-C1A78EFA8089.jpg",
  "/photos/21144700-17c5-42cb-ab01-6d92b3876343.jpg",
  "/photos/765D8499-A463-414E-827E-E31593A67235.jpg",
  "/photos/AC1F4A53-C9DD-4F9A-B35C-2FF69F9EFA0A.jpg",
  "/photos/EB230C30-DAE4-4777-928C-90048BE6A7CC.jpg",
  "/photos/IMG_0089.jpeg",
  "/photos/IMG_0196.jpeg",
  "/photos/IMG_0197.jpeg",
  "/photos/IMG_0198.jpeg",
  "/photos/IMG_0199.jpeg",
  "/photos/IMG_0200.jpeg",
  "/photos/IMG_0201.jpeg",
  "/photos/IMG_0202.jpeg",
  "/photos/IMG_0554.jpeg",
  "/photos/IMG_0587.JPG",
  "/photos/IMG_0628.jpeg",
  "/photos/IMG_0673.jpeg",
  "/photos/IMG_0722.jpeg",
  "/photos/IMG_0723.jpeg",
  "/photos/IMG_0724.jpeg",
  "/photos/IMG_0725.jpeg",
  "/photos/IMG_0726.jpeg",
  "/photos/IMG_0730.jpeg",
  "/photos/IMG_0736.jpeg",
  "/photos/IMG_0738.jpeg",
  "/photos/IMG_0744.jpeg",
  "/photos/IMG_0786.jpeg",
  "/photos/IMG_0879.jpeg",
  "/photos/IMG_0932.jpeg",
  "/photos/IMG_1003.jpeg",
  "/photos/IMG_1038.jpeg",
  "/photos/IMG_1043.jpeg",
  "/photos/IMG_1058.jpeg",
  "/photos/IMG_1063.jpeg",
  "/photos/IMG_1090.jpeg",
  "/photos/IMG_1112.jpeg",
  "/photos/IMG_1152.jpeg",
  "/photos/IMG_1194.JPG",
  "/photos/IMG_1198.jpeg",
  "/photos/IMG_1201.jpeg",
  "/photos/IMG_1217.jpeg",
  "/photos/IMG_1291.jpeg",
  "/photos/IMG_1302.jpeg",
  "/photos/IMG_1431.jpeg",
  "/photos/IMG_1432.jpeg",
  "/photos/IMG_1442.jpeg",
  "/photos/IMG_1776.jpeg",
  "/photos/IMG_2142.jpeg",
  "/photos/IMG_2148.jpeg",
  "/photos/IMG_2151.jpeg",
  "/photos/IMG_2159.jpeg",
  "/photos/IMG_2344.jpeg",
  "/photos/IMG_2405.jpeg",
  "/photos/IMG_2807.jpeg",
  "/photos/IMG_2899.jpeg",
  "/photos/IMG_2998.jpeg",
  "/photos/IMG_2999.jpeg",
  "/photos/IMG_3001.jpeg",
  "/photos/IMG_3002.jpeg",
  "/photos/IMG_3003.jpeg",
  "/photos/IMG_3008.jpeg",
  "/photos/IMG_3465.jpeg",
  "/photos/IMG_3466.jpeg",
  "/photos/IMG_3467.jpeg",
  "/photos/IMG_3468.jpeg",
  "/photos/IMG_3536.jpeg",
  "/photos/IMG_3537.jpeg",
  "/photos/IMG_3538.PNG",
  "/photos/IMG_3539.PNG",
  "/photos/IMG_3541.jpeg",
  "/photos/IMG_3542.jpeg",
  "/photos/IMG_3543.jpeg",
  "/photos/IMG_3543_2.jpeg",
  "/photos/IMG_3544.jpeg",
  "/photos/IMG_3622.jpeg",
  "/photos/IMG_3623.jpeg",
  "/photos/IMG_3624.jpeg",
  "/photos/IMG_3936.jpeg",
  "/photos/IMG_3941.jpeg",
  "/photos/IMG_3946.jpeg",
  "/photos/IMG_3950.jpeg",
  "/photos/IMG_3971.jpeg",
  "/photos/IMG_4045.jpeg",
  "/photos/IMG_4055.jpeg",
  "/photos/IMG_4076.jpeg",
  "/photos/IMG_4123.JPG",
  "/photos/IMG_5894.jpeg",
  "/photos/a7bd2838-735c-4db0-a866-e6a15e764730.jpg",
  "/photos/camphoto_1804928587.jpg",
  "/photos/camphoto_1932422408.jpg",
  "/photos/camphoto_342241519.jpg",
  "/photos/camphoto_684387517.jpg",
  "/photos/f86505c7-3665-4e9d-b7c1-558588f2c79a.jpg",
];

function PhotoScrollStory() {
  const { t } = useLanguage();
  const a = t.about;
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const idxRef = useRef(0);

  // Preload: first 15 immediately, rest after 1.5s
  useEffect(() => {
    STORY_PHOTOS.slice(0, 15).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
    const t = setTimeout(() => {
      STORY_PHOTOS.slice(15).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Direct DOM swap — no React re-render per frame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      Math.floor(latest * STORY_PHOTOS.length),
      STORY_PHOTOS.length - 1
    );
    if (idx !== idxRef.current && imgRef.current) {
      idxRef.current = idx;
      imgRef.current.src = STORY_PHOTOS[idx];
    }
  });

  // Text blocks — scroll-driven, 3 moments
  const t1y = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.38], ["60px", "0px", "0px", "-60px"]);
  const t1o = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.38], [0, 1, 1, 0]);

  const t2y = useTransform(scrollYProgress, [0.36, 0.46, 0.62, 0.72], ["60px", "0px", "0px", "-60px"]);
  const t2o = useTransform(scrollYProgress, [0.36, 0.46, 0.62, 0.72], [0, 1, 1, 0]);

  const t3y = useTransform(scrollYProgress, [0.70, 0.80, 1], ["60px", "0px", "0px"]);
  const t3o = useTransform(scrollYProgress, [0.70, 0.80, 1], [0, 1, 1]);

  const textBlocks = [
    { y: t1y, opacity: t1o, text: a.story.p1 },
    { y: t2y, opacity: t2o, text: a.story.p2 },
    { y: t3y, opacity: t3o, text: a.story.p3 },
  ];

  // Progress dots
  const d1 = useTransform(scrollYProgress, [0, 0.33], [1, 0.3]);
  const d2 = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [0.3, 1, 1, 0.3]);
  const d3 = useTransform(scrollYProgress, [0.62, 0.72, 1], [0.3, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Single image — src swapped via ref for performance */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={STORY_PHOTOS[0]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transition: "opacity 0.12s ease" }}
          />
          {/* Semi-transparent brand overlay — unifies all photos */}
          <div className="absolute inset-0 bg-charcoal/58" />
        </div>

        {/* Text */}
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
          {[d1, d2, d3].map((op, idx) => (
            <motion.div key={idx} style={{ opacity: op }} className="w-1.5 h-1.5 rounded-full bg-cream" />
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
