"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

// Fiktive PMax-Beispiel-Ads im Landscape-Format (1200×628). Keine echten
// Bilder — pure CSS-Gradients + Typografie, so wie ein Google-PMax-Banner
// mit sauberer Copy-Zone rechts auch aussehen würde. Während die URL
// geprüft wird (5–15 s), zyklieren die 5 Beispiele durch und zeigen dem
// User die Qualität, die gleich generiert wird.

export interface MockAd {
  id: string;
  category: string;
  brand: string;
  headline: string;
  subline: string;
  cta: string;
  // Hero-Foto (Unsplash direct link, 1200×628 crop). Bei Ausfall greift der
  // Gradient-Fallback darunter — die Banner bleiben also immer ansehnlich.
  imageUrl: string;
  // Optionaler Fokuspunkt für object-cover. Default "50% 50%" (zentriert).
  // Nützlich, wenn das Motiv visuell zu weit rechts liegt und in die
  // Copy-Zone reinlappt — dann z.B. "20% 50%" um das Motiv nach links zu
  // schieben, damit die rechte Hälfte sauber für Text bleibt.
  objectPosition?: string;
  // Gradient-Fallback + Farbseele
  gradient: string;
  // Tint für die Copy-Zone-Seite (rechts) — atmosphärischer Halbton
  copyZoneTint: string;
  // Akzentfarbe für CTA + evtl. Label
  accent: string;
  // Dunkel- oder Hell-Text auf dem Copy-Zone-Layer
  textTone: "light" | "dark";
  // Headline-Stil
  font: "serif-italic" | "serif" | "sans-tight";
}

// Unsplash-Direktlinks. Falls einer bricht: eine Zeile im Array tauschen.
// Optional: später per One-Shot-Script fünf Nano-Banana-2-Hero-Shots
// erzeugen und nach public/preflight-mockups/{id}.jpg legen.
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=628&fit=crop&auto=format&q=80`;

export const MOCK_ADS: MockAd[] = [
  {
    id: "bikes",
    category: "Mobility",
    brand: "fahrrad-xxl.de",
    headline: "Zu spät los.\nZu früh da.",
    subline: "City Bikes von Fahrrad XXL.",
    cta: "Jetzt entdecken",
    imageUrl: UNSPLASH("1485965120184-e220f721d03e"), // bicycle on city street
    gradient:
      "radial-gradient(ellipse at 25% 60%, #4c566a 0%, #2e3440 40%, #1a1d23 80%)",
    copyZoneTint:
      "linear-gradient(90deg, transparent 0%, rgba(26,29,35,0.55) 35%, rgba(26,29,35,0.92) 100%)",
    accent: "#d4af37",
    textTone: "light",
    font: "sans-tight",
  },
  {
    id: "wine",
    category: "Food & Drink",
    brand: "douro-direkt.pt",
    headline: "Wo der Atlantik endet,\nfängt der Geschmack an.",
    subline: "Portugiesische Weine. Direkt vom Gut.",
    cta: "Zum Shop",
    imageUrl: UNSPLASH("1506377247377-2a5b3b417ebb"), // vineyard terraces at golden hour
    gradient:
      "radial-gradient(ellipse at 30% 70%, #7a1f2b 0%, #3d0d15 45%, #1a0508 90%)",
    copyZoneTint:
      "linear-gradient(90deg, transparent 0%, rgba(26,5,8,0.55) 35%, rgba(26,5,8,0.92) 100%)",
    accent: "#e8a87c",
    textTone: "light",
    font: "serif-italic",
  },
  {
    id: "sneakers",
    category: "Fashion",
    brand: "avenue-store.de",
    headline: "Jeder Schritt zählt.",
    subline: "Premium Sneaker. Made für Bewegung.",
    cta: "Kollektion ansehen",
    imageUrl: UNSPLASH("1542291026-7eec264c27ff"), // red sneakers closeup
    gradient:
      "linear-gradient(120deg, #0a1628 0%, #1a3d6b 35%, #2d5f9b 75%, #4a8bd4 100%)",
    copyZoneTint:
      "linear-gradient(90deg, transparent 0%, rgba(10,22,40,0.55) 35%, rgba(10,22,40,0.95) 100%)",
    accent: "#f0f4f8",
    textTone: "light",
    font: "sans-tight",
  },
  {
    id: "coffee",
    category: "Specialty",
    brand: "slow-roast.coffee",
    headline: "Dein Morgen\nverdient besseres.",
    subline: "Single Origin. Frisch geröstet.",
    cta: "Bestellen",
    imageUrl: UNSPLASH("1495474472287-4d71bcdd2085"), // coffee being poured
    gradient:
      "radial-gradient(ellipse at 35% 65%, #8a5a3c 0%, #4e3023 45%, #1f1410 90%)",
    copyZoneTint:
      "linear-gradient(90deg, transparent 0%, rgba(31,20,16,0.55) 35%, rgba(31,20,16,0.92) 100%)",
    accent: "#f5e6d3",
    textTone: "light",
    font: "serif-italic",
  },
  {
    id: "skincare",
    category: "Beauty",
    brand: "ritual-skin.de",
    headline: "Weniger Zutaten.\nMehr Wirkung.",
    subline: "Cleane Pflege ohne Kompromisse.",
    cta: "Routine starten",
    imageUrl: UNSPLASH("1556228720-195a672e8a03"), // skincare bottles minimal
    gradient:
      "linear-gradient(120deg, #f5ece1 0%, #e8d5c4 40%, #d4b8a0 75%, #b8957a 100%)",
    copyZoneTint:
      "linear-gradient(90deg, transparent 0%, rgba(245,236,225,0.6) 35%, rgba(245,236,225,0.96) 100%)",
    accent: "#2c2620",
    textTone: "dark",
    font: "serif",
  },
];

const CYCLE_MS = 2800;

export const fontClass = (f: MockAd["font"]) => {
  switch (f) {
    case "serif-italic":
      return "font-heading italic";
    case "serif":
      return "font-heading";
    case "sans-tight":
      return "font-sans font-black tracking-tight";
  }
};

export default function PreflightCarousel() {
  const [index, setIndex] = useState(0);

  // Alle 5 Hero-Fotos sofort beim Mount in den Browser-Cache warmen,
  // damit der Wechsel ohne weißen Flash abläuft.
  useEffect(() => {
    MOCK_ADS.forEach((ad) => {
      const preload = new window.Image();
      preload.src = ad.imageUrl;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MOCK_ADS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const ad = MOCK_ADS[index];
  const textColor = ad.textTone === "light" ? "#f5ead8" : "#1f1a14";
  const sublineColor = ad.textTone === "light" ? "rgba(245,234,216,0.75)" : "rgba(31,26,20,0.7)";
  const labelColor = ad.textTone === "light" ? "rgba(245,234,216,0.6)" : "rgba(31,26,20,0.55)";

  return (
    <div className="w-full max-w-[560px] flex flex-col items-center gap-5">
      {/* Status oben */}
      <div className="flex items-center gap-2.5 text-cream/60 text-[12px]">
        <Loader2 size={14} className="text-gold animate-spin" />
        <span>Prüfe URL — während du wartest, so sehen die Ads aus:</span>
      </div>

      {/* Banner-Container */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-gold/15 shadow-2xl"
        style={{ aspectRatio: "16 / 9" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={ad.id}
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-110%", opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 140, damping: 22 },
              opacity: { duration: 0.35 },
            }}
            className="absolute inset-0"
            style={{ background: ad.gradient }}
          >
            {/* Hero-Foto — liegt über dem Gradient; bei Ladefehler bleibt Gradient */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ad.imageUrl}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: ad.objectPosition ?? "50% 50%" }}
              onError={(e) => {
                // Foto stirbt → verstecken, Gradient scheint durch
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />

            {/* Copy-Zone-Tint — rechte Hälfte atmosphärisch abgedunkelt/gehellt */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: ad.copyZoneTint }}
            />

            {/* Subtiles "Foto-Korn" für Tiefe */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.25) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* Ad-Label oben rechts */}
            <div
              className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-widest"
              style={{ color: labelColor }}
            >
              Anzeige · {ad.brand}
            </div>

            {/* Kategorie-Label oben links */}
            <div
              className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-widest"
              style={{ color: labelColor }}
            >
              {ad.category}
            </div>

            {/* Copy-Zone: rechte Hälfte */}
            <div className="absolute inset-y-0 right-0 w-[58%] flex flex-col justify-center px-6 lg:px-8">
              <motion.h3
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className={`${fontClass(ad.font)} text-[22px] lg:text-[28px] leading-[1.05] whitespace-pre-line mb-2`}
                style={{ color: textColor }}
              >
                {ad.headline}
              </motion.h3>
              <motion.p
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.35 }}
                className="text-[11px] lg:text-[13px] mb-4"
                style={{ color: sublineColor }}
              >
                {ad.subline}
              </motion.p>
              <motion.div
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.38, duration: 0.35 }}
                className="flex items-center gap-2 self-start px-4 py-2 rounded-lg text-[11px] lg:text-[12px] font-bold"
                style={{
                  backgroundColor: ad.accent,
                  color: ad.textTone === "light" && ad.accent !== "#f0f4f8" ? "#1a1d23" : ad.textTone === "dark" ? "#f5ead8" : "#1a1d23",
                }}
              >
                {ad.cta}
                <ArrowRight size={12} />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots-Indicator */}
      <div className="flex gap-2">
        {MOCK_ADS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setIndex(i)}
            aria-label={`Zu Beispiel ${i + 1} springen`}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-gold"
                : "w-1.5 bg-cream/20 hover:bg-cream/40"
            }`}
          />
        ))}
      </div>

      {/* Fußnote */}
      <p className="text-cream/30 text-[11px] max-w-[440px] text-center leading-relaxed">
        Beispiel-Mockups in PMax-Landscape-Format (1200×628). Deine Ads werden
        fotorealistisch mit Nano Banana 2 generiert — inklusive natürlicher
        Copy-Zone für Google&#39;s Text-Overlay.
      </p>
    </div>
  );
}
