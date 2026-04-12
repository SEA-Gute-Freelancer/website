"use client";

import { motion, type Transition } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/lib/i18n";

// ── Easing from https://easings.net/#easeOutBounce ────────────────────────────
function bounceEase(x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

const spring: Transition = { type: "spring", stiffness: 700, damping: 30 };
const bounce: Transition = { duration: 0.9, ease: bounceEase };

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const isDE = lang === "de";

  function toggle() {
    setLang(isDE ? "en" : "de");
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDE ? "Switch to English" : "Auf Deutsch wechseln"}
      className="relative flex items-center w-[64px] h-[28px] rounded-full bg-charcoal/8 border border-gold/20 p-[3px] cursor-pointer shrink-0 hover:border-gold/50 transition-colors duration-200"
    >
      {/* Sliding pill */}
      <motion.span
        layout
        transition={isDE ? spring : bounce}
        className="absolute w-[28px] h-[22px] rounded-full bg-gold shadow-sm"
        style={{ left: isDE ? 3 : "calc(100% - 31px)" }}
      />

      {/* Labels */}
      <span
        className={`relative z-10 flex-1 text-center text-[11px] font-bold tracking-wider transition-colors duration-200 ${isDE ? "text-charcoal" : "text-warm-muted"}`}
      >
        DE
      </span>
      <span
        className={`relative z-10 flex-1 text-center text-[11px] font-bold tracking-wider transition-colors duration-200 ${!isDE ? "text-charcoal" : "text-warm-muted"}`}
      >
        EN
      </span>
    </button>
  );
}
