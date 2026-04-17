"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { GooeyFilter } from "@/components/ui/gooey-filter";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/hooks/use-screen-size";
import { useRef } from "react";
import {
  ArrowRight, ArrowUpRight,
  Award, Search, BarChart3, Zap, Globe, Layers,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

const RotatingEarth = dynamic(() => import("@/components/ui/wireframe-dotted-globe"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

/* ─── Section Divider ───────────────────────────────────────────────────── */
function SectionDivider({ light = false }: { light?: boolean }) {
  const line = light ? "bg-cream/15" : "bg-gold/20";
  const diamond = light ? "bg-cream/40" : "bg-gold/50";
  return (
    <div className="flex items-center gap-4 max-w-xs mx-auto py-2">
      <div className={`flex-1 h-px ${line}`} />
      <div className={`w-1.5 h-1.5 rotate-45 ${diamond}`} />
      <div className={`w-1 h-1 rotate-45 ${diamond} opacity-50`} />
      <div className={`flex-1 h-px ${line}`} />
    </div>
  );
}

const serviceIcons = [Search, BarChart3, Zap, Globe, Layers];
const serviceColors = [
  "from-gold/10 to-gold/5",
  "from-blue-500/10 to-purple-500/5",
  "from-emerald-500/10 to-teal-500/5",
  "from-violet-500/10 to-indigo-500/5",
  "from-orange-500/10 to-amber-500/5",
];

const memberImgs = [
  "/team/robert.jpg",
  "/team/dave.jpg",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
];

/* ─── Hero  (DARK) ──────────────────────────────────────────────────────── */
function Hero() {
  const { t } = useLanguage();
  const h = t.home.hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-charcoal border-b-2 border-gold/25"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute right-[6%] top-1/2 -translate-y-1/2 w-[42vw] max-w-[580px] pointer-events-auto"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
      >
        <RotatingEarth width={580} height={580} dotColor="#C9A96E" oceanColor="transparent" strokeColor="#C9A96E" />
      </motion.div>

      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-charcoal via-charcoal/85 to-transparent pointer-events-none" />

      <motion.div style={{ opacity, y: contentY }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gold/35 rounded-full bg-gold/8 mb-8"
          >
            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-xs font-medium tracking-widest uppercase">{h.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] text-cream leading-[1.08] tracking-tight mb-5 lg:mb-6"
          >
            {h.h1a}
            <br />
            {h.h1b}{" "}
            <span className="italic text-gold">{h.h1c}</span>
            <br />
            {h.h1d}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream/65 text-lg leading-relaxed max-w-md mb-10 font-sans font-light"
          >
            {h.p}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/kontakt" className="group inline-flex items-center gap-2.5 px-7 py-4 bg-gold text-charcoal font-semibold rounded-full text-[15px] hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5">
              {h.cta1}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/leistungen" className="group inline-flex items-center gap-2.5 px-7 py-4 border border-cream/20 text-cream font-medium rounded-full text-[15px] hover:border-cream/50 hover:bg-cream/8 transition-all duration-300">
              {h.cta2}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cream/30 text-[10px] tracking-widest uppercase">{t.common.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-px h-8 bg-gradient-to-b from-cream/30 to-transparent" />
      </motion.div>
    </section>
  );
}

/* ─── Certifications Section  (LIGHT) ───────────────────────────────────── */
function CertificationsSection() {
  return (
    <section className="py-16 lg:py-24 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeIn className="mb-10 lg:mb-14">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">Qualifikationen</p>
          <h2 className="font-heading text-3xl lg:text-4xl text-charcoal leading-tight">
            Zertifiziert &{" "}
            <span className="italic text-gold">geprüft</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ── Google Ads ── */}
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 24px 60px -10px rgba(66,133,244,0.15)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white border border-gold/15 rounded-2xl p-6 overflow-hidden group h-full"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/8 transition-colors duration-700" />

              <div className="flex gap-1 mb-5">
                <div className="h-1 w-5 rounded-full bg-[#4285F4]" />
                <div className="h-1 w-5 rounded-full bg-[#EA4335]" />
                <div className="h-1 w-5 rounded-full bg-[#FBBC05]" />
                <div className="h-1 w-5 rounded-full bg-[#34A853]" />
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4285F4]/12 to-[#34A853]/8 border border-[#4285F4]/15 flex items-center justify-center mb-4"
              >
                <svg viewBox="0 0 48 48" className="w-7 h-7">
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                  <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.3-5l-6.6-5.4C29.7 37.3 27 38 24 38c-6 0-10.6-3.9-11.8-9.3l-7 5.3C8.1 41.8 15.5 46 24 46z"/>
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.8 2.9-2.6 5.3-5.2 6.9l6.6 5.4c3.9-3.6 6.3-8.9 6.3-15.8 0-1.3-.2-2.7-.5-4z"/>
                </svg>
              </motion.div>

              <p className="text-[10px] font-semibold tracking-widest uppercase text-[#4285F4]/60 mb-1">Google · Skillshop</p>
              <h3 className="font-heading text-lg text-charcoal mb-2 leading-tight">Google Ads<br />Zertifizierung</h3>
              <p className="text-warm-muted text-[13px] leading-relaxed mb-5">
                Kampagnenstruktur, Gebotsstrategien und Conversion-Optimierung nach Google-Standard.
              </p>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4285F4]/6 border border-[#4285F4]/15 rounded-full"
              >
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                <span className="text-[#4285F4] text-[11px] font-semibold">Zertifiziert · Google</span>
              </motion.div>
            </motion.div>
          </FadeIn>

          {/* ── Claude Badge ── */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 24px 60px -10px rgba(201,169,110,0.18)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-charcoal border border-gold/20 rounded-2xl p-6 overflow-hidden group h-full"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/8 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/12 transition-colors duration-700" />

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="h-px w-full bg-gradient-to-r from-gold via-gold/50 to-transparent mb-5 rounded-full"
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-4"
              >
                <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                  <path d="M24 6L38 36H10L24 6Z" fill="#C9A96E" fillOpacity="0.9" />
                  <path d="M24 14L33 36H15L24 14Z" fill="#1e1a16" />
                  <circle cx="24" cy="28" r="4" fill="#C9A96E" />
                </svg>
              </motion.div>

              <p className="text-[10px] font-semibold tracking-widest uppercase text-gold/50 mb-1">Anthropic · Claude AI</p>
              <h3 className="font-heading text-lg text-cream mb-2 leading-tight">Claude <span className="text-gold">Badge</span></h3>
              <p className="text-cream/55 text-[13px] leading-relaxed mb-5">
                Prompt Engineering, Tool Use und KI-Einsatz in professionellen Workflows.
              </p>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full"
              >
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-gold text-[11px] font-semibold">Zertifiziert · Anthropic</span>
              </motion.div>
            </motion.div>
          </FadeIn>

          {/* ── Nachhaltiges Webdesign ── */}
          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 24px 60px -10px rgba(201,169,110,0.12)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white border border-gold/15 rounded-2xl p-6 overflow-hidden group h-full"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/6 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/10 transition-colors duration-700" />

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
                className="h-px w-full bg-gradient-to-r from-gold/60 via-gold/30 to-transparent mb-5 rounded-full"
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-gold/8 border border-gold/20 flex items-center justify-center mb-4"
              >
                <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                  <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" stroke="#C9A96E" strokeWidth="2" fill="none"/>
                  <path d="M24 14c-3 4-8 6-8 12 0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-5-8-8-12z" fill="#C9A96E" fillOpacity="0.7"/>
                  <path d="M24 22v12M20 30h8" stroke="#f5f0e8" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.div>

              <p className="text-[10px] font-semibold tracking-widest uppercase text-gold/60 mb-1">Webdesign · Nachhaltig</p>
              <h3 className="font-heading text-lg text-charcoal mb-2 leading-tight">Nachhaltige<br />Website</h3>
              <p className="text-warm-muted text-[13px] leading-relaxed mb-5">
                Diese Website wurde mit Blick auf nachhaltiges Webdesign entwickelt — optimierte Assets, sparsames CSS und ressourcenbewusster Aufbau.
              </p>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/8 border border-gold/20 rounded-full"
              >
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.8 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-gold/80 text-[11px] font-semibold">Nachhaltig · Verified</span>
              </motion.div>
            </motion.div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ─── Services  (LIGHT) ─────────────────────────────────────────────────── */
function ServicesSection() {
  const { t } = useLanguage();
  const s = t.home.services;
  return (
    <section className="py-16 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="max-w-2xl mb-10">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{s.label}</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight mb-5">
            {s.h2a}
            <br />
            <span className="italic text-gold">{s.h2b}</span>
          </h2>
          <p className="text-warm-muted text-lg leading-relaxed">{s.p}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Link href="/leistungen" className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-cream transition-all duration-300">
            {s.cta}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Mission Strip  (DARK) ─────────────────────────────────────────────── */
function MissionStrip() {
  const { t } = useLanguage();
  const m = t.home.mission;
  const screenSize = useScreenSize();

  return (
    <section className="relative py-24 lg:py-40 bg-charcoal overflow-hidden">
      {/* Gooey pixel trail */}
      <GooeyFilter id="gooey-mission" strength={6} />
      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-mission)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 20 : 28}
          fadeDuration={600}
          delay={0}
          pixelClassName="bg-gold/30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-5">
            {m.label}
          </p>
          <h2 className="font-heading text-4xl lg:text-6xl text-cream leading-tight mb-8">
            {m.h2a}
            <br />
            <span className="italic text-gold">{m.h2b}</span>
          </h2>
          <p className="text-cream/70 text-lg lg:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            {m.p1}
          </p>
          <p className="text-cream/60 text-[17px] leading-relaxed mb-10 max-w-2xl mx-auto">
            {m.p2}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-charcoal font-semibold rounded-full text-[14px] hover:bg-gold-light transition-all duration-300"
            >
              {m.cta1}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-cream/20 text-cream font-medium rounded-full text-[14px] hover:border-cream/50 transition-all duration-300"
            >
              {m.cta2}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Team Teaser  (LIGHT) ──────────────────────────────────────────────── */
function TeamTeaser() {
  const { t } = useLanguage();
  const tm = t.home.team;
  return (
    <section className="py-16 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 lg:mb-16">
          <FadeIn>
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-3">{tm.label}</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight">{tm.h2}</h2>
          </FadeIn>
          <FadeIn direction="left">
            <Link href="/team" className="group inline-flex items-center gap-2 text-charcoal font-medium text-[14px] hover:text-gold transition-colors shrink-0">
              {tm.cta}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.1}>
          {t.team.members.slice(0, 4).map((member, idx) => (
            <StaggerItem key={member.name}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                  <Image src={memberImgs[idx]} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-heading text-lg text-charcoal">{member.name}</h3>
                <p className="text-warm-muted text-[13px]">{member.role}</p>
                <p className="text-gold/80 text-[12px] mt-0.5 font-medium">{member.years}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── Cases Teaser  (LIGHT) ─────────────────────────────────────────────── */
function CasesTeaser() {
  const { t } = useLanguage();
  const c = t.home.cases;
  return (
    <section className="py-16 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <FadeIn>
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{c.label}</p>
            <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
              {c.h2a}
              <br />
              <span className="italic">{c.h2b}</span>
            </h2>
            <p className="text-warm-muted text-lg leading-relaxed mb-8 max-w-md">{c.p}</p>
            <Link href="/cases" className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold rounded-full hover:bg-gold-dark hover:text-cream transition-all duration-300">
              {c.cta}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
            {[
              { metric: "+340%", labelDE: "ROAS Steigerung",  labelEN: "ROAS increase",   sector: "E-Commerce" },
              { metric: "-45%",  labelDE: "Cost-per-Lead",    labelEN: "Cost-per-Lead",    sector: "Dienstleistung / Services" },
              { metric: "+180%", labelDE: "Online-Umsatz",    labelEN: "Online Revenue",   sector: "Handel / Retail" },
              { metric: "3.2×",  labelDE: "Conversion Rate",  labelEN: "Conversion Rate",  sector: "B2B" },
            ].map((item) => (
              <StaggerItem key={item.labelDE}>
                <div className="bg-white border border-gold/15 rounded-2xl p-6">
                  <div className="font-heading text-3xl text-gold font-bold mb-1">{item.metric}</div>
                  <div className="text-charcoal text-sm font-medium mb-1">{t.cases.stats.find(s => s.value === item.metric)?.label ?? item.labelDE}</div>
                  <div className="text-warm-muted text-xs">{item.sector}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA  (DARK) ─────────────────────────────────────────────────── */
function HomeCTA() {
  const { t } = useLanguage();
  const c = t.home.cta;
  return (
    <section className="py-16 lg:py-40 bg-charcoal border-t-2 border-gold/20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <SectionDivider light />
          <div className="mt-10 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full bg-gold/8">
              <Award size={14} className="text-gold" />
              <span className="text-gold text-xs font-medium tracking-widest uppercase">{c.partnerLabel}</span>
            </div>
          </div>
          <h2 className="font-heading text-4xl lg:text-6xl text-cream leading-tight mb-6">
            {c.h2a}
            <br />
            <span className="italic text-gold">{c.h2b}</span> {c.h2c}
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">{c.p}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/kontakt" className="group inline-flex items-center gap-2.5 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-light transition-all duration-300 hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5">
              {c.cta1}
              <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+4930000000" className="inline-flex items-center gap-2.5 px-9 py-5 border-2 border-cream/20 text-cream font-medium rounded-full text-[16px] hover:border-cream/50 transition-all duration-300">
              {c.cta2}
            </a>
          </div>
          <div className="mt-16">
            <SectionDivider light />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <CertificationsSection />
      <MissionStrip />
      <TeamTeaser />
      <CasesTeaser />
      <HomeCTA />
    </>
  );
}
