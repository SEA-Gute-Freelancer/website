"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

const memberImgs = [
  "/team/robert.jpg",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85", // Dave
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85", // Can
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85", // Larrisa
];

export default function TeamPage() {
  const { t } = useLanguage();
  const tm = t.team;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-40 pb-12 lg:pb-20 bg-cream overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{tm.hero.label}</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl text-charcoal leading-tight mb-6">
              {tm.hero.h1a}
              <br />
              <span className="italic text-gold">{tm.hero.h1b}</span>
            </h1>
            <p className="text-warm-muted text-base sm:text-xl leading-relaxed max-w-xl">{tm.hero.p}</p>
          </FadeIn>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-10 pb-16 lg:pb-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.1}>
            {tm.members.map((member, idx) => (
              <StaggerItem key={member.name}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 24px 60px -12px rgba(30,26,22,0.12)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white border border-gold/15 rounded-3xl overflow-hidden"
                  onClick={idx === 0 ? () => window.open("https://www.robertmiler.com", "_blank") : undefined}
                  style={idx === 0 ? { cursor: "pointer" } : undefined}
                >
                  <div className="flex flex-col sm:grid sm:grid-cols-[200px_1fr]">
                    {/* Photo */}
                    <div className="relative overflow-hidden aspect-[16/9] sm:aspect-auto sm:min-h-[260px]">
                      <Image
                        src={memberImgs[idx]}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                    </div>

                    {/* Info */}
                    <div className="p-6 lg:p-8">
                      <h2 className="font-heading text-xl text-charcoal mb-0.5">{member.name}</h2>
                      <p className="text-gold text-sm font-medium mb-1">{member.role}</p>
                      <p className="text-warm-muted text-xs mb-4">{member.years}</p>
                      <p className="text-warm-muted text-[13px] leading-relaxed mb-5 line-clamp-3">{member.bio}</p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.specialties.map((s) => (
                          <span key={s} className="text-[11px] font-medium text-gold px-2.5 py-1 bg-gold/8 border border-gold/20 rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Certs */}
                      <div className="flex flex-wrap gap-2">
                        {member.certs.map((c) => (
                          <span key={c} className="text-[10px] text-warm-muted-light flex items-center gap-1">
                            <Award size={10} className="text-gold/50" />
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Join section */}
      <section className="py-14 lg:py-28 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{tm.join.label}</p>
            <h2 className="font-heading text-4xl text-charcoal mb-6">{tm.join.h2}</h2>
            <p className="text-warm-muted text-lg leading-relaxed mb-8 max-w-xl mx-auto">{tm.join.p}</p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-charcoal text-charcoal font-semibold rounded-full hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              {tm.join.btn}
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
