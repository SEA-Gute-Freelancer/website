"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

export default function ImpressumPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-40 pb-12 lg:pb-16 bg-cream overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Rechtliches</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-4">
              Impressum
            </h1>
            <p className="text-warm-muted text-base leading-relaxed">
              Gemäß Teledienstegesetz (TDG) § 6
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl bg-white border border-gold/15 rounded-3xl p-8 lg:p-12 space-y-10">

              {/* Verantwortlich */}
              <div>
                <h2 className="font-heading text-xl text-charcoal mb-4">Verantwortlich für den Inhalt</h2>
                <div className="space-y-1 text-warm-muted text-[15px] leading-relaxed">
                  <p className="font-medium text-charcoal">Robert Miler</p>
                  <p>Straßmannstraße 45, 10249 Berlin</p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:hello@robertmiler.com" className="text-gold hover:underline">
                      hello@robertmiler.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="h-px bg-gold/15" />

              {/* Urheberrecht */}
              <div>
                <h2 className="font-heading text-xl text-charcoal mb-4">Urheberrecht</h2>
                <p className="text-warm-muted text-[15px] leading-relaxed">
                  Alle Rechte vorbehalten. Die auf der Website verwendeten Texte, Bilder, Grafiken, Dateien usw. unterliegen auch ohne gesonderte Kennzeichnung dem Urheberrecht und anderen Gesetzen zum Schutz des geistigen Eigentums. Ihre Weitergabe, Veränderung, gewerbliche Nutzung oder Verwendung in anderen Websites oder Medien ist nicht gestattet.
                </p>
              </div>

              <div className="h-px bg-gold/15" />

              {/* Markenzeichen */}
              <div>
                <h2 className="font-heading text-xl text-charcoal mb-4">Markenzeichen</h2>
                <p className="text-warm-muted text-[15px] leading-relaxed">
                  Firmennamen, Domainnamen, Warennamen, Produktbezeichnungen, Marken und andere geschützte Bezeichnungen sind Eigentum ihrer jeweiligen Besitzer, auch wenn sie nicht entsprechend gekennzeichnet sind.
                </p>
              </div>

              <div className="h-px bg-gold/15" />

              {/* Haftungsausschluss */}
              <div>
                <h2 className="font-heading text-xl text-charcoal mb-4">Haftungsausschluss</h2>
                <p className="text-warm-muted text-[15px] leading-relaxed">
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>
              </div>

            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-8">
            <Link href="/" className="text-gold text-sm font-medium hover:underline">
              ← Zurück zur Startseite
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
