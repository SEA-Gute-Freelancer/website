"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Users, Zap, Mail, BookOpen, ChevronDown } from "lucide-react";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";

const leistungenItems = [
  { label: "SEA",              href: "/leistungen/sea" },
  { label: "SEO + GEO",        href: "/leistungen/seo-geo" },
  { label: "Audit",            href: "/leistungen" },
  { label: "Unser KI-Ansatz",  href: "/leistungen" },
  { label: "Landingpages",     href: "/leistungen" },
  { label: "Workshops",        href: "/leistungen" },
];

function LeistungenDropdown({ active }: { active: boolean }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className={`relative flex items-center gap-2 px-4 py-2 rounded-full group text-[13.5px] font-medium tracking-wide transition-colors duration-200 ${active ? "text-gold" : "text-warm-muted hover:text-charcoal"}`}>
        <Zap size={14} className={active ? "text-gold" : "text-warm-muted group-hover:text-gold transition-colors"} />
        {t.nav.services}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} />
        </motion.span>
        {active && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-md border border-gold/15 rounded-2xl shadow-xl shadow-charcoal/8 p-2 min-w-[200px] z-50"
          >
            {leistungenItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.15 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-warm-muted hover:text-charcoal hover:bg-gold/8 transition-all duration-150 group/item"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover/item:bg-gold transition-colors shrink-0" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLeistungenOpen, setMobileLeistungenOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.about,   href: "/about",   icon: <Users    size={14} /> },
    { label: t.nav.blog,    href: "/blog",     icon: <BookOpen size={14} /> },
    { label: t.nav.contact, href: "/kontakt",  icon: <Mail     size={14} /> },
  ];

  const isLeistungenActive = pathname === "/leistungen" || pathname.startsWith("/leistungen/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMobileLeistungenOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const dockItems = navItems.map((item) => ({
    ...item,
    active: pathname === item.href || pathname.startsWith(item.href + "/"),
  }));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-b border-gold/15 shadow-sm shadow-charcoal/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ─────────────────────────────── */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative">
                <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center">
                  <span className="text-cream font-heading font-bold text-[11px] tracking-wider">SGF</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-gold-dark rounded-full" />
              </div>
              <div className="leading-none">
                <span className="block font-heading font-semibold text-charcoal text-[13px] tracking-[0.15em] uppercase group-hover:text-gold transition-colors duration-300">
                  SEA GUTE FREELANCER
                </span>
              </div>
            </Link>

            {/* ── Desktop nav ───────────────────────── */}
            <div className="hidden lg:flex items-center gap-1">
              <LeistungenDropdown active={isLeistungenActive} />
              <AnimatedDock items={dockItems} />
            </div>

            {/* ── Toggle + CTA + burger ─────────────── */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden lg:flex items-center">
                <LanguageToggle />
              </div>

              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="hidden lg:block"
              >
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-cream text-[13px] font-semibold rounded-full tracking-wide hover:bg-gold-dark transition-colors duration-300 shadow-sm shadow-gold/20"
                >
                  {t.common.ctaShort}
                </Link>
              </motion.div>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-charcoal hover:text-gold transition-colors"
                aria-label="Menü öffnen"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile overlay ──────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-cream pt-20 px-6 flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-2 mt-8">

              {/* Leistungen with submenu */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setMobileLeistungenOpen((v) => !v)}
                  className="w-full flex items-center gap-4 py-5 border-b border-gold/15 group"
                >
                  <span className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream transition-all duration-300">
                    <Zap size={14} />
                  </span>
                  <span className="font-heading text-2xl text-charcoal group-hover:text-gold transition-colors flex-1 text-left">
                    {t.nav.services}
                  </span>
                  <motion.span animate={{ rotate: mobileLeistungenOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-warm-muted" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {mobileLeistungenOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-13 py-2 flex flex-col gap-1 ml-[52px]">
                        {leistungenItems.map((item, i) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center gap-3 py-2.5 text-warm-muted hover:text-gold transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0" />
                              <span className="text-lg font-medium">{item.label}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other nav items */}
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (i + 2) * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 py-5 border-b border-gold/15 group"
                  >
                    <span className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-cream transition-all duration-300">
                      {item.icon}
                    </span>
                    <span className="font-heading text-2xl text-charcoal group-hover:text-gold transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <LanguageToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 mb-8"
            >
              <Link
                href="/kontakt"
                className="inline-flex w-full items-center justify-center py-4 bg-gold text-cream font-semibold rounded-2xl text-lg hover:bg-gold-dark transition-colors"
              >
                {t.common.cta}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
