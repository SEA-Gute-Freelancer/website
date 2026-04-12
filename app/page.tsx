"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, ArrowUpRight, TrendingUp,
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

/* ─── Marquee row ────────────────────────────────────────────────────────── */
type MarqueeItem = { quote: string; name: string; company: string; location: string; result: string; avatar: string };

function MarqueeRow({ items, dir }: { items: MarqueeItem[]; dir: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row overflow-hidden">
      <div className={`flex gap-5 w-max ${dir === "left" ? "marquee-left" : "marquee-right"}`}>
        {doubled.map((t, i) => (
          <div
            key={i}
            className="w-[340px] shrink-0 bg-white border border-gold/12 rounded-2xl p-6 flex flex-col gap-4 shadow-sm shadow-charcoal/5"
          >
            <span className="self-start inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[11px] font-semibold tracking-wide">
              <TrendingUp size={10} />
              {t.result}
            </span>
            <p className="text-warm-muted text-[13.5px] leading-relaxed flex-1">„{t.quote}"</p>
            <div className="flex items-center gap-3 pt-3 border-t border-gold/10">
              <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-gold/15 shrink-0" />
              <div>
                <p className="text-charcoal text-[13px] font-semibold leading-tight">{t.name}</p>
                <p className="text-warm-muted text-[11px]">{t.company} · {t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Testimonials Marquee section  (LIGHT) ─────────────────────────────── */
function TestimonialsCarouselSection() {
  const { t } = useLanguage();
  const ts = t.home.testimonials;
  return (
    <section className="py-20 lg:py-40 bg-cream overflow-hidden">
      <FadeIn className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 lg:mb-16">
        <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{ts.label}</p>
        <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight">
          {ts.h2a}{" "}
          <span className="italic text-gold">{ts.h2b}</span>
        </h2>
      </FadeIn>

      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="flex flex-col gap-5">
          <MarqueeRow items={t.rowA} dir="left"  />
          <MarqueeRow items={t.rowB} dir="right" />
        </div>
      </div>

      <FadeIn className="max-w-7xl mx-auto px-6 lg:px-8 mt-14 flex items-center gap-3">
        <div className="h-px flex-1 bg-gold/15" />
        <p className="text-warm-muted text-xs tracking-widest uppercase shrink-0">{ts.footer}</p>
        <div className="h-px flex-1 bg-gold/15" />
      </FadeIn>
    </section>
  );
}

/* ─── Services  (LIGHT) ─────────────────────────────────────────────────── */
function ServicesSection() {
  const { t } = useLanguage();
  const s = t.home.services;
  return (
    <section className="py-16 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="max-w-2xl mb-10 lg:mb-20">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{s.label}</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
            {s.h2a}
            <br />
            <span className="italic text-gold">{s.h2b}</span>
          </h2>
          {s.p.split("\n\n").map((para, i) => (
            <p key={i} className="text-warm-muted text-lg leading-relaxed mb-4 last:mb-0">{para}</p>
          ))}
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {t.serviceItems.map((service, idx) => {
            const Icon = serviceIcons[idx];
            return (
              <StaggerItem key={service.title}>
                <Link href="/leistungen" className="block">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 60px -10px rgba(30,26,22,0.12)" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`group p-5 sm:p-8 bg-gradient-to-br ${serviceColors[idx]} border border-gold/15 rounded-3xl`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Icon size={22} className="text-gold" />
                      </div>
                      <span className="text-[11px] font-medium text-gold/80 tracking-wider uppercase border border-gold/20 rounded-full px-3 py-1 bg-gold/5">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl text-charcoal mb-3">{service.title}</h3>
                    <p className="text-warm-muted text-[15px] leading-relaxed">{service.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{t.common.learnMore}</span>
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3} className="mt-14 text-center">
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
  return (
    <section className="py-16 lg:py-40 bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <FadeIn direction="left" className="relative order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] ring-1 ring-gold/20">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85"
              alt="Das SEA Gute Team bei der Arbeit"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn direction="right" className="order-1 lg:order-2">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{m.label}</p>
          <h2 className="font-heading text-4xl lg:text-5xl text-cream leading-tight mb-6">
            {m.h2a}
            <br />
            <span className="italic text-gold">{m.h2b}</span>
          </h2>
          <p className="text-cream/65 text-[17px] leading-relaxed mb-5">{m.p1}</p>
          <p className="text-cream/65 text-[17px] leading-relaxed mb-8">{m.p2}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-charcoal font-semibold rounded-full text-[14px] hover:bg-gold-light transition-all duration-300">
              {m.cta1}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/team" className="group inline-flex items-center gap-2 px-7 py-3.5 border border-cream/20 text-cream font-medium rounded-full text-[14px] hover:border-cream/50 transition-all duration-300">
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
      <TestimonialsCarouselSection />
      <ServicesSection />
      <MissionStrip />
      <TeamTeaser />
      <CasesTeaser />
      <HomeCTA />
    </>
  );
}
