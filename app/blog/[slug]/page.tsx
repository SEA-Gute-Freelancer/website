"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FadeIn } from "@/components/animations/FadeIn";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const b = t.blog;

  const post = b.posts.find((p) => p.slug === slug) as (typeof b.posts[0] & { content?: string }) | undefined;

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream">
        <FadeIn className="text-center px-6">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">404</p>
          <h1 className="font-heading text-4xl text-charcoal mb-4">Artikel nicht gefunden</h1>
          <p className="text-warm-muted mb-8">Dieser Artikel existiert nicht oder wurde verschoben.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-charcoal font-semibold rounded-full text-sm hover:bg-gold-dark hover:text-cream transition-all duration-300"
          >
            <ArrowLeft size={15} />
            Zurück zum Blog
          </Link>
        </FadeIn>
      </section>
    );
  }

  // Other posts for the "More articles" section
  const otherPosts = b.posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-0 bg-cream overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gold/5 rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FadeIn>
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-warm-muted text-sm hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              {b.hero.label}
            </Link>

            {/* Tag */}
            <span className="inline-flex items-center px-3 py-1.5 bg-gold text-charcoal text-[11px] font-bold rounded-full tracking-wide mb-5">
              {post.tag}
            </span>

            {/* Title */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-warm-muted text-sm mb-10">
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {post.author}
              </span>
              <span className="w-1 h-1 bg-warm-muted/40 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {post.date}
              </span>
              <span className="w-1 h-1 bg-warm-muted/40 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime} {b.minRead}
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="relative w-full aspect-[16/7] rounded-3xl overflow-hidden">
              <Image
                src={post.img}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeIn>
            {/* Excerpt / lead */}
            <p className="text-warm-muted text-lg leading-relaxed border-l-4 border-gold pl-6 mb-10 italic">
              {post.excerpt}
            </p>

            {/* Full content */}
            {post.content ? (
              <div
                className="prose-article"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-warm-muted text-base leading-relaxed">
                Dieser Artikel erscheint demnächst in voller Länge.
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-cream">
        <FadeIn className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{b.cta.label}</p>
          <h2 className="font-heading text-3xl text-cream mb-4">{b.cta.h2}</h2>
          <p className="text-cream/65 text-base mb-8">{b.cta.p}</p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-9 py-4 bg-gold text-charcoal font-semibold rounded-full text-[15px] hover:bg-gold-light transition-all duration-300"
          >
            {b.cta.btn}
            <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </section>

      {/* More articles */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <FadeIn>
              <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-8">Weitere Artikel</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group bg-white border border-gold/15 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-1 bg-gold text-charcoal text-[10px] font-bold rounded-full tracking-wide">
                          {p.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-warm-muted text-[11px] mb-2">
                        <span>{p.author}</span>
                        <span className="w-0.5 h-0.5 bg-warm-muted rounded-full" />
                        <span>{p.readTime} {b.minRead}</span>
                      </div>
                      <h3 className="font-heading text-[15px] text-charcoal leading-snug group-hover:text-gold transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </>
  );
}
