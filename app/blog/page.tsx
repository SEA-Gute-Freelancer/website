"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { HandWrittenCircle } from "@/components/ui/hand-writing-text";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BlogPage() {
  const { t } = useLanguage();
  const b = t.blog;

  const [featured, ...rest] = b.posts;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-40 pb-12 lg:pb-20 bg-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{b.hero.label}</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl text-charcoal leading-tight mb-6">
              {b.hero.h1a}
              <br />
              <HandWrittenCircle className="italic text-gold px-4 py-1">
                {b.hero.h1b}
              </HandWrittenCircle>
            </h1>
            <p className="text-warm-muted text-base sm:text-xl leading-relaxed max-w-xl">{b.hero.p}</p>
          </FadeIn>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-12 lg:pb-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 24px 60px -12px rgba(30,26,22,0.12)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white border border-gold/15 rounded-3xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[240px] sm:min-h-[360px] lg:min-h-[480px]">
                  <Image
                    src={featured.img}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal/10" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center px-3 py-1.5 bg-gold text-charcoal text-[11px] font-bold rounded-full tracking-wide">
                      {featured.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-warm-muted text-xs mb-5">
                    <span className="flex items-center gap-1.5"><User size={11} />{featured.author}</span>
                    <span className="w-1 h-1 bg-warm-muted rounded-full" />
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} />{featured.readTime} {b.minRead}</span>
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-charcoal mb-4 leading-snug">{featured.title}</h2>
                  <p className="text-warm-muted text-[15px] leading-relaxed mb-8">{featured.excerpt}</p>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-charcoal font-semibold rounded-full text-[14px] hover:bg-gold-dark hover:text-cream transition-all duration-300 self-start group/btn"
                  >
                    {b.readMore}
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Rest of posts */}
      <section className="pb-20 lg:pb-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 50px -10px rgba(30,26,22,0.10)" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-white border border-gold/15 rounded-3xl overflow-hidden flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 bg-gold text-charcoal text-[10px] font-bold rounded-full tracking-wide">
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-warm-muted text-[11px] mb-3">
                      <span className="flex items-center gap-1"><User size={10} />{post.author}</span>
                      <span className="w-0.5 h-0.5 bg-warm-muted rounded-full" />
                      <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} {b.minRead}</span>
                    </div>
                    <h3 className="font-heading text-lg text-charcoal mb-3 leading-snug flex-1">{post.title}</h3>
                    <p className="text-warm-muted text-[13px] leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:underline group/link"
                    >
                      {b.readMore}
                      <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-cream text-center">
        <FadeIn className="max-w-2xl mx-auto px-6">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{b.cta.label}</p>
          <h2 className="font-heading text-4xl text-cream mb-6">{b.cta.h2}</h2>
          <p className="text-cream/65 text-lg mb-8">{b.cta.p}</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-9 py-5 bg-gold text-charcoal font-semibold rounded-full text-[16px] hover:bg-gold-light transition-all duration-300"
          >
            {b.cta.btn}
            <ArrowRight size={17} />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
