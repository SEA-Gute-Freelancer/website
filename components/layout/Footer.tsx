"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const pathname = usePathname();

  // Gleiche Begründung wie im Header: pMax-Builder hat einen eigenen
  // produkt-spezifischen Footer; der globale SGF-Footer würde doppelt stehen.
  if (pathname === "/pmax-builder" || pathname.startsWith("/pmax-builder/")) {
    return null;
  }

  return (
    <footer className="bg-charcoal text-cream">
      {/* Top CTA strip */}
      <div className="border-b border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-2">
              {f.ctaLabel}
            </p>
            <h3 className="font-heading text-3xl lg:text-4xl text-cream max-w-md">
              {f.ctaHeading}
            </h3>
          </div>
          <Link
            href="/kontakt"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-full hover:bg-gold hover:text-charcoal transition-all duration-300 group"
          >
            {f.ctaButton}
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center">
                <span className="text-charcoal font-heading font-bold text-[11px] tracking-wider">SGF</span>
              </div>
              <div className="leading-none">
                <span className="block font-heading font-semibold text-cream text-[13px] tracking-[0.15em] uppercase">
                  SEA GUTE FREELANCER
                </span>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              {f.tagline}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-cream/20 rounded-full flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold transition-colors"
                aria-label="LinkedIn"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-cream/40 text-xs tracking-widest uppercase mb-5">{f.navHeading}</p>
            <ul className="space-y-3">
              {[
                { label: f.links.about,   href: "/about" },
                { label: f.links.services, href: "/leistungen" },
                { label: f.links.team,    href: "/team" },
                { label: f.links.blog,    href: "/blog" },
                { label: f.links.contact, href: "/kontakt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <p className="text-cream/40 text-xs tracking-widest uppercase mb-5">{f.contactHeading}</p>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:seoadsrm@gmail.com"
                  className="flex items-center gap-3 text-cream/70 text-sm hover:text-gold transition-colors group"
                >
                  <Mail size={15} className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
                  seoadsrm@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917626144998"
                  className="flex items-center gap-3 text-cream/70 text-sm hover:text-gold transition-colors group"
                >
                  <Phone size={15} className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
                  +49 176 26144998
                </a>
              </li>
            </ul>
            <div className="mt-8 p-4 border border-gold/20 rounded-xl bg-gold/5">
              <p className="text-[11px] text-cream/40 uppercase tracking-widest mb-1">{f.partnerLabel}</p>
              <p className="text-cream/70 text-sm">{f.partnerNote}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/35 text-xs">
            © {new Date().getFullYear()} SEA Gute Freelancer. {f.copyright}
          </p>
          <ul className="flex items-center gap-6">
            {[
              { label: f.links.imprint, href: "/impressum" },
              { label: f.links.privacy, href: "/datenschutz" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream/35 text-xs hover:text-gold transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
