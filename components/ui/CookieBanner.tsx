"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "sgf_cookie_consent";

function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof (window as any).gtag !== "function") return;
  const val = granted ? "granted" : "denied";
  (window as any).gtag("consent", "update", {
    ad_storage: val,
    ad_user_data: val,
    ad_personalization: val,
    analytics_storage: val,
  });
}

export function CookieBanner() {
  const { t } = useLanguage();
  const c = t.cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === "granted") {
      updateConsent(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "granted");
    updateConsent(true);
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "denied");
    updateConsent(false);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[100]"
        >
          <div className="bg-charcoal border border-gold/25 rounded-2xl shadow-2xl shadow-charcoal/40 p-5">
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gold/15 rounded-lg flex items-center justify-center shrink-0">
                <Cookie size={15} className="text-gold" />
              </div>
              <p className="text-cream font-heading text-[15px]">{c.title}</p>
            </div>

            {/* Text */}
            <p className="text-cream/60 text-[13px] leading-relaxed mb-4">
              {c.text}{" "}
              <Link href="/datenschutz" className="text-gold hover:underline">
                {c.privacy}
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 bg-gold text-charcoal font-semibold rounded-full text-[13px] hover:bg-gold-light transition-colors duration-200"
              >
                {c.accept}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 py-2.5 border border-cream/20 text-cream/70 font-medium rounded-full text-[13px] hover:border-cream/50 hover:text-cream transition-colors duration-200"
              >
                {c.decline}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
