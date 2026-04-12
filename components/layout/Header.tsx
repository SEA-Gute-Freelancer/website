"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Users, Zap, Mail, BookOpen } from "lucide-react";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t.nav.about,    href: "/about",      icon: <Users     size={14} /> },
    { label: t.nav.services, href: "/leistungen",  icon: <Zap       size={14} /> },
    { label: t.nav.blog,     href: "/blog",        icon: <BookOpen  size={14} /> },
    { label: t.nav.contact,  href: "/kontakt",     icon: <Mail      size={14} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

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
                  <span className="text-cream font-heading font-bold text-sm tracking-wider">SG</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-gold-dark rounded-full" />
              </div>
              <div className="leading-none">
                <span className="block font-heading font-semibold text-charcoal text-[15px] tracking-wide group-hover:text-gold transition-colors duration-300">
                  SEA Gute
                </span>
                <span className="block text-[10px] text-warm-muted tracking-[0.2em] uppercase font-sans">
                  Freelancer
                </span>
              </div>
            </Link>

            {/* ── Animated Dock (desktop) ───────────── */}
            <div className="hidden lg:flex items-center">
              <AnimatedDock items={dockItems} />
            </div>

            {/* ── Toggle + CTA + burger ─────────────── */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Language toggle — visible on desktop */}
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
            className="fixed inset-0 z-40 bg-cream pt-20 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-2 mt-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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

            {/* Language toggle in mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <LanguageToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-6"
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
