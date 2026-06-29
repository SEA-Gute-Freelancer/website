"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Download,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Mail,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Lock,
  Copy,
} from "lucide-react";
import PreflightCarousel from "./preflight-carousel";

// Shape ist bewusst lokal dupliziert, damit die Client-Komponente keinen
// Server-only-Code importiert.
interface ClusterLike {
  name: string;
  psychology: string;
  searchThemes: string[];
  audiences: string[];
  customUrls: string[];
  copy: {
    shortHeadlines: string[];
    longHeadlines: string[];
    descriptions: string[];
  };
}

interface GeneratedImageResp {
  motifIndex: number;
  archetype: string;
  motifName: string;
  format: "square" | "landscape" | "portrait";
  concept: string;
  prompt: string;
  filename: string;
  publicUrl: string;
  qcScore: number;
  qcIssues: string[];
  attempts: number;
}

interface LogoAssetResp {
  variant: "square" | "landscape";
  filename: string;
  publicUrl: string;
  width: number;
  height: number;
  source: "scraped" | "none";
}

interface ImagesResult {
  orderId: string;
  images: GeneratedImageResp[];
  logos: LogoAssetResp[];
  brandContext: {
    ci: { brandName: string; primaryColors: string[]; tone: string };
    products: { industry: string };
    audience: { visualMood: string };
  };
}

interface PreflightOk {
  ok: true;
  brand: {
    brandName: string;
    primaryColors: string[];
    visualStyle: string;
    logoDetected: boolean;
  };
  screenshotUrl?: string;
}

interface PreflightFail {
  ok: false;
  reason: string;
  fallback: "manual" | "retry";
  screenshotUrl?: string;
}

type PreflightResult = PreflightOk | PreflightFail;

// Wizard-Steps. Phase 1 ist frontend-only — das echte Generieren + Payment
// kommt in Phase 4/5. "submitted" zeigt den Abschluss-Screen, danach kann der
// Browser geschlossen werden.
type WizardStep = "preflight" | "scope" | "email" | "payment" | "submitted";

const WIZARD_STEPS: { key: WizardStep; label: string }[] = [
  { key: "preflight", label: "Preflight" },
  { key: "scope", label: "Scope" },
  { key: "email", label: "E-Mail" },
  { key: "payment", label: "Zahlung" },
];

// Phase 1: Preis ist nur in UI-Strings. Phase 5 fügt PACKAGE_PRICE_CENTS = 3999
// für den Stripe-Call wieder hinzu (momentan ungenutzt, daher ausgelassen).
const PACKAGE_PRICE_LABEL = "39,99 €";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SCOPE_EXAMPLES = [
  "Einzelnes Produkt im Fokus",
  "Bestimmte Zielgruppe",
  "Ganzer Shop / alle Kategorien",
  "Saison-Fokus (Frühling, Sale …)",
];

const FORMAT_LABELS: Record<GeneratedImageResp["format"], { label: string; size: string }> = {
  square: { label: "Square", size: "1200×1200" },
  landscape: { label: "Landscape", size: "1200×628" },
  portrait: { label: "Portrait", size: "960×1200" },
};

const LOADING_STEPS = [
  "Analysiere Corporate Identity…",
  "Prüfe Produkte & Zielgruppe…",
  "Art Director wählt 4 Motiv-Archetypen…",
  "Baue 12 fotorealistische Prompts…",
  "Generiere Bilder mit Google Imagen…",
  "Qualitätskontrolle + Retry-Schleife…",
  "Logo-Refraiming auf PMax-Spec…",
];

// Demo-Order-ID für Phase 1. Wird in Phase 4 von /api/orders/enqueue ersetzt.
function generateMockOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now().toString(36).slice(-5);
  return `sgf-${rand}-${stamp}`;
}

export default function ImagesPanel({
  url,
  clusters = [],
}: {
  url: string;
  clusters?: ClusterLike[];
}) {
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ImagesResult | null>(null);
  const [preflightLoading, setPreflightLoading] = useState(false);
  const [preflight, setPreflight] = useState<PreflightResult | null>(null);
  // facesPolicy bleibt noch in state (wird in Phase 2 entfernt wenn der
  // Prompt-Engineer "max 1 Gesicht" hart kodiert). UI ist bereits deaktiviert.
  const [facesPolicy] = useState<"none" | "anonymous" | "one" | "any">("anonymous");

  // Wizard-State
  const [step, setStep] = useState<WizardStep>("preflight");
  const [scopeText, setScopeText] = useState("");
  const [email, setEmail] = useState("");
  const [mockOrderId, setMockOrderId] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Wizard komplett zurücksetzen wenn die URL sich ändert — sonst würde ein
  // OK auf alter URL eine neue URL unsicher durchwinken, oder ein halb
  // ausgefüllter Scope den Durchlauf für die neue URL verunreinigen.
  useEffect(() => {
    setPreflight(null);
    setStep("preflight");
    setScopeText("");
    setMockOrderId(null);
    // email bewusst NICHT zurücksetzen — Nutzer tippen das oft zuerst rein
    // und wechseln dann die URL. Das ist keine Sicherheits-relevante Info.
  }, [url]);

  useEffect(() => {
    if (loading) {
      const start = Date.now();
      timerRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - start) / 1000);
        setElapsed(seconds);
        // ~20s pro Step als grober Indikator
        setStepIndex(Math.min(LOADING_STEPS.length - 1, Math.floor(seconds / 20)));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setElapsed(0);
      setStepIndex(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [loading]);

  async function runPreflight() {
    setPreflightLoading(true);
    setPreflight(null);
    setError("");
    try {
      const res = await fetch("/api/pmax-images/preflight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = (await res.json()) as PreflightResult;
      setPreflight(data);
    } catch (e) {
      setPreflight({
        ok: false,
        reason: e instanceof Error ? e.message : "Netzwerk-Fehler",
        fallback: "retry",
      });
    } finally {
      setPreflightLoading(false);
    }
  }

  // generate() bleibt für Phase 4 erhalten, wird aktuell nur getriggert wenn
  // man in den Dev-Modus zurückschaltet. Im Phase-1-Wizard geht der Flow
  // stattdessen über mockPay() → submitted.
  async function generate() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/pmax-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          clusters,
          facesPolicy,
          scopeContext: scopeText || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  function handleMockPay() {
    setPaying(true);
    // Fake Latenz, damit der Button-State spürbar ist. Phase 5 ersetzt das
    // durch Stripe Checkout (redirect) oder Payment Element (confirm).
    setTimeout(() => {
      const id = generateMockOrderId();
      setMockOrderId(id);
      setStep("submitted");
      setPaying(false);
    }, 1100);
  }

  async function copyOrderId() {
    if (!mockOrderId) return;
    try {
      await navigator.clipboard.writeText(mockOrderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard kann unter strikten Iframe-Settings fehlen — ignorieren */
    }
  }

  const emailValid = EMAIL_REGEX.test(email.trim());

  // Gruppierung der Bilder nach motifIndex (4 Motive × 3 Formate)
  const grouped = result
    ? Object.values(
        result.images.reduce<Record<number, GeneratedImageResp[]>>((acc, img) => {
          (acc[img.motifIndex] ??= []).push(img);
          return acc;
        }, {})
      ).sort((a, b) => a[0].motifIndex - b[0].motifIndex)
    : [];

  // ─── Wizard-Progress-Indicator (4 Dots) ────────────────────────
  function WizardProgress({ current }: { current: WizardStep }) {
    const currentIdx = WIZARD_STEPS.findIndex((s) => s.key === current);
    return (
      <div className="flex items-center gap-3 mb-8">
        {WIZARD_STEPS.map((s, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div key={s.key} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    active
                      ? "bg-gold w-6"
                      : done
                      ? "bg-gold/70"
                      : "bg-cream/15"
                  }`}
                />
                <span
                  className={`text-[11px] uppercase tracking-widest font-mono ${
                    active ? "text-cream" : done ? "text-cream/50" : "text-cream/25"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < WIZARD_STEPS.length - 1 && (
                <div
                  className={`h-px w-6 transition-all ${
                    done ? "bg-gold/40" : "bg-cream/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // ─── Placeholder / Wizard ─────────────────────────────────────
  if (!loading && !result && !error) {
    const preflightOk = preflight?.ok === true;
    const preflightFail = preflight?.ok === false;

    // ─── STEP: submitted ───────────────────────────────────────
    if (step === "submitted" && mockOrderId) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6 py-10">
          <WizardProgress current="payment" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6"
          >
            <CheckCircle2 size={40} className="text-emerald-400" />
          </motion.div>
          <h3 className="text-cream text-2xl font-heading mb-2">
            Dein Paket ist in Auftrag.
          </h3>
          <p className="text-cream/60 text-sm max-w-md mb-6">
            Wir schicken das fertige PMax-Paket an{" "}
            <span className="text-cream font-semibold">{email}</span>, sobald unsere
            KI-Agenten fertig sind.
          </p>

          <div className="w-full max-w-md border border-gold/15 rounded-2xl bg-charcoal/60 p-5 text-left space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-cream/40 text-[11px] uppercase tracking-wider">
                Order-ID
              </p>
              <button
                onClick={copyOrderId}
                className="flex items-center gap-1.5 text-cream/50 hover:text-cream/90 text-[11px] transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    kopiert
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    kopieren
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-cream text-sm tracking-wide break-all">
              {mockOrderId}
            </p>

            <div className="h-px bg-gold/10" />

            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-cream/50">URL</span>
                <span className="text-cream/80 truncate max-w-[60%]">{url}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">E-Mail</span>
                <span className="text-cream/80">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">Paket</span>
                <span className="text-cream/80">12 Bilder + 2 Logos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">Betrag</span>
                <span className="text-cream/80">{PACKAGE_PRICE_LABEL}</span>
              </div>
            </div>
          </div>

          <p className="text-cream/60 text-sm max-w-md mb-2">
            Bearbeitungszeit <span className="text-cream">bis zu ein paar Stunden</span>.
          </p>
          <p className="text-cream/40 text-xs max-w-md mb-6">
            Das Fenster kann jetzt geschlossen werden — sobald dein Paket fertig ist,
            bekommst du eine E-Mail mit dem Download-Link.
          </p>

          <p className="text-cream/30 text-[11px]">
            Fragen?{" "}
            <a
              href="mailto:hallo@sea-gute-freelancer.de"
              className="underline underline-offset-2 hover:text-cream/60"
            >
              hallo@sea-gute-freelancer.de
            </a>
          </p>
        </div>
      );
    }

    // ─── STEP: payment ─────────────────────────────────────────
    if (step === "payment") {
      return (
        <div className="flex flex-col items-center min-h-[500px] px-6 py-10">
          <WizardProgress current="payment" />
          <div className="w-full max-w-md">
            <h3 className="text-cream text-xl font-heading text-center mb-1">
              Paket bezahlen
            </h3>
            <p className="text-cream/50 text-sm text-center mb-6">
              Einmalzahlung — nach Eingang starten die Agenten automatisch.
            </p>

            {/* Order-Summary */}
            <div className="border border-gold/15 rounded-2xl bg-charcoal/60 p-5 mb-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-cream font-semibold text-sm">
                    PMax-Visual-Paket
                  </p>
                  <p className="text-cream/50 text-[11px]">
                    12 PMax-Bilder + 2 Logo-Varianten
                  </p>
                </div>
                <p className="text-cream font-mono font-bold text-lg">
                  {PACKAGE_PRICE_LABEL}
                </p>
              </div>
              <div className="h-px bg-gold/10 my-3" />
              <div className="flex items-center justify-between">
                <span className="text-cream/60 text-[12px]">Gesamt inkl. USt.</span>
                <span className="text-cream font-mono font-bold text-lg">
                  {PACKAGE_PRICE_LABEL}
                </span>
              </div>
            </div>

            {/* Mock-Payment-Methods (Phase 5 ersetzt das durch echtes Stripe) */}
            <div className="border border-gold/15 rounded-2xl bg-charcoal/60 p-5 mb-5">
              <p className="text-cream/50 text-[11px] uppercase tracking-wider font-mono mb-3">
                Zahlungsmethode
              </p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { key: "card", label: "Karte", hint: "Visa · MC · Amex", active: true },
                  { key: "apple", label: "Apple Pay", hint: "One-Click" },
                  { key: "google", label: "Google Pay", hint: "One-Click" },
                  { key: "klarna", label: "Klarna / Sofort", hint: "Online-Überweisung" },
                ].map((m) => (
                  <div
                    key={m.key}
                    className={`px-3 py-2.5 rounded-lg border text-left ${
                      m.active
                        ? "border-gold/40 bg-gold/5"
                        : "border-gold/10 bg-transparent opacity-60"
                    }`}
                  >
                    <p className="text-cream text-[12px] font-semibold">{m.label}</p>
                    <p className="text-cream/40 text-[10px]">{m.hint}</p>
                  </div>
                ))}
              </div>
              <p className="text-cream/30 text-[10px] leading-relaxed">
                Demo-Modus: Keine echte Abbuchung. In Production läuft das über
                Stripe (PCI-DSS SAQ-A, One-Click via Payment Request API).
              </p>
            </div>

            <button
              onClick={handleMockPay}
              disabled={paying}
              className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal font-bold px-6 py-3.5 rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 disabled:cursor-wait"
            >
              {paying ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Zahlung wird vorbereitet…
                </>
              ) : (
                <>
                  <Lock size={15} />
                  {PACKAGE_PRICE_LABEL} bezahlen (Demo)
                </>
              )}
            </button>

            <button
              onClick={() => setStep("email")}
              className="w-full flex items-center justify-center gap-1.5 text-cream/40 hover:text-cream/70 text-[12px] mt-3 transition-colors"
            >
              <ArrowLeft size={13} />
              zurück zur E-Mail
            </button>
          </div>
        </div>
      );
    }

    // ─── STEP: email ───────────────────────────────────────────
    if (step === "email") {
      return (
        <div className="flex flex-col items-center min-h-[500px] px-6 py-10">
          <WizardProgress current="email" />
          <div className="w-full max-w-md">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 mx-auto">
              <Mail size={22} className="text-gold" />
            </div>
            <h3 className="text-cream text-xl font-heading text-center mb-1">
              E-Mail für die Zustellung
            </h3>
            <p className="text-cream/50 text-sm text-center mb-6">
              Wir schicken dein Paket an diese Adresse.
            </p>

            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && emailValid) setStep("payment");
              }}
              placeholder="du@beispiel.de"
              className="w-full px-4 py-3 rounded-xl bg-charcoal/60 border border-gold/15 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-all font-mono text-sm"
            />

            {email && !emailValid && (
              <p className="text-red-400/80 text-[11px] mt-2 flex items-center gap-1.5">
                <AlertCircle size={11} />
                Das sieht nicht nach einer gültigen E-Mail aus.
              </p>
            )}

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => setStep("payment")}
                disabled={!emailValid}
                className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Weiter zur Zahlung
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => setStep("scope")}
                className="w-full flex items-center justify-center gap-1.5 text-cream/40 hover:text-cream/70 text-[12px] transition-colors"
              >
                <ArrowLeft size={13} />
                zurück zum Scope
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ─── STEP: scope ──────────────────────────────────────────
    if (step === "scope") {
      const charCount = scopeText.length;
      const over = charCount > 1500;
      return (
        <div className="flex flex-col items-center min-h-[500px] px-6 py-10">
          <WizardProgress current="scope" />
          <div className="w-full max-w-lg">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 mx-auto">
              <MessageSquare size={22} className="text-gold" />
            </div>
            <h3 className="text-cream text-xl font-heading text-center mb-1">
              Wofür soll die PMax laufen?
            </h3>
            <p className="text-cream/50 text-sm text-center mb-5 max-w-md mx-auto">
              Kurzer Kontext hilft den Agenten, die Motive auf deinen Scope zu
              schärfen. Kannst du auch überspringen — dann geht&apos;s über die
              komplette Marke.
            </p>

            <textarea
              value={scopeText}
              onChange={(e) => setScopeText(e.target.value)}
              rows={5}
              placeholder="z.B. Wir wollen die PMax für unsere neue Sommer-Kollektion Bikinis fahren. Zielgruppe: Frauen 25–40, Fokus auf nachhaltige Materialien."
              className={`w-full px-4 py-3 rounded-xl bg-charcoal/60 border text-cream placeholder:text-cream/30 focus:outline-none transition-all text-sm leading-relaxed resize-none ${
                over
                  ? "border-red-400/50 focus:border-red-400"
                  : "border-gold/15 focus:border-gold/50"
              }`}
            />
            <div className="flex items-center justify-between mt-1.5 text-[11px]">
              <span className="text-cream/30">
                Beispiele: {SCOPE_EXAMPLES.join(" · ")}
              </span>
              <span className={over ? "text-red-400" : "text-cream/30"}>
                {charCount}/1500
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => setStep("email")}
                disabled={over}
                className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Weiter zur E-Mail
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => {
                  setScopeText("");
                  setStep("email");
                }}
                className="w-full text-cream/50 hover:text-cream/80 text-[12px] py-2 transition-colors"
              >
                Überspringen
              </button>
              <button
                onClick={() => setStep("preflight")}
                className="w-full flex items-center justify-center gap-1.5 text-cream/30 hover:text-cream/60 text-[11px] transition-colors"
              >
                <ArrowLeft size={12} />
                zurück zur URL-Prüfung
              </button>
            </div>
          </div>
        </div>
      );
    }

    // ─── STEP: preflight ──────────────────────────────────────
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-6 py-10">
        <WizardProgress current="preflight" />
        <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
          <Sparkles size={28} className="text-gold" />
        </div>
        <p className="text-cream text-xl font-heading mb-2">
          Visuelles Paket generieren
        </p>
        <p className="text-cream/50 text-sm max-w-md mb-1">
          4 Motive × 3 Formate = <span className="text-cream/80 font-semibold">12 PMax-Bilder</span> + 2
          Logo-Varianten nach Google Ads Best Practice.
        </p>
        <p className="text-cream/40 text-xs max-w-md mb-6">
          KI-Agenten analysieren CI, Produkte und Zielgruppe; ein Art-Director-Agent
          wählt 4 Motiv-Archetypen und baut fotorealistische Prompts. Imagen 4
          generiert, QC-Agent prüft gegen Marke. Lieferung per E-Mail.
        </p>

        {/* ─── URL-Prüfung — Idle ─── */}
        {!preflight && !preflightLoading && (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={runPreflight}
              disabled={!url}
              className="flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold font-semibold px-6 py-3 rounded-xl hover:bg-gold/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShieldCheck size={16} />
              URL prüfen (Pre-Flight-Check)
            </button>
            <p className="text-cream/30 text-[11px] max-w-sm">
              Wir testen, ob die Seite renderbar ist und die Marke automatisch
              analysiert werden kann. Dauer ca. 15 Sekunden, verhindert
              fehlgeschlagene Pakete.
            </p>
          </div>
        )}

        {/* ─── URL-Prüfung — Loading (Carousel) ─── */}
        {!preflight && preflightLoading && <PreflightCarousel />}

        {/* ─── Preflight OK → weiter zum Scope ─── */}
        {preflightOk && preflight.ok && (
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-left w-full">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-[12px]">
                <p className="text-emerald-400 font-semibold mb-1">
                  URL erfolgreich geprüft
                </p>
                <p className="text-cream/60">
                  Marke: <span className="text-cream">{preflight.brand.brandName}</span>
                  {preflight.brand.logoDetected ? " · Logo erkannt" : " · kein Logo gefunden"}
                </p>
                <p className="text-cream/50 mt-1">
                  {preflight.brand.visualStyle}
                </p>
                {preflight.brand.primaryColors.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2">
                    {preflight.brand.primaryColors.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        title={c}
                        className="w-5 h-5 rounded border border-white/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep("scope")}
              className="flex items-center gap-2 bg-gold text-charcoal font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-all"
            >
              Weiter zum Scope
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setPreflight(null)}
              className="text-cream/40 hover:text-cream/70 text-[11px] underline underline-offset-2"
            >
              erneut prüfen
            </button>
          </div>
        )}

        {/* ─── Preflight Fail → Fallback ─── */}
        {preflightFail && preflight.ok === false && (
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-left w-full">
              <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-[12px]">
                <p className="text-red-400 font-semibold mb-1">
                  URL konnte nicht geprüft werden
                </p>
                <p className="text-cream/60">{preflight.reason}</p>
              </div>
            </div>

            {preflight.fallback === "retry" ? (
              <button
                onClick={runPreflight}
                className="flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold font-semibold px-6 py-3 rounded-xl hover:bg-gold/20 transition-all"
              >
                <ShieldCheck size={16} />
                Erneut prüfen
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <a
                  href={`mailto:hallo@sea-gute-freelancer.de?subject=Manuelle%20PMax-Bildgenerierung&body=URL%3A%20${encodeURIComponent(url)}%0AFehler%3A%20${encodeURIComponent(preflight.reason)}%0A%0ABitte%20manuell%20prüfen%20und%20Paket%20manuell%20erstellen.`}
                  className="flex items-center gap-2 bg-gold text-charcoal font-bold px-6 py-3 rounded-xl hover:bg-gold-light transition-all"
                >
                  <Mail size={16} />
                  Manuellen Auftrag anfragen
                </a>
                <button
                  onClick={runPreflight}
                  className="text-cream/40 hover:text-cream/70 text-[11px] underline underline-offset-2"
                >
                  oder nochmal prüfen
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── Loading ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] px-6">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-gold/20 flex items-center justify-center">
            <Loader2 size={32} className="text-gold animate-spin" />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="text-cream text-sm font-medium mb-2"
          >
            {LOADING_STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
        <p className="text-cream/30 text-xs font-mono">
          {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} verstrichen
        </p>
        <p className="text-cream/30 text-xs mt-4 max-w-md text-center">
          Bitte Browser-Tab nicht schließen — Pipeline läuft serverseitig und kann
          bei 12 Bildern mit QC-Retry-Schleife bis zu 10 Minuten dauern.
        </p>
      </div>
    );
  }

  // ─── Error ────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-6">
        <AlertCircle size={40} className="text-red-400 mb-4" />
        <p className="text-red-400 font-semibold mb-2">
          Bildgenerierung fehlgeschlagen
        </p>
        <p className="text-cream/40 text-sm text-center max-w-md">{error}</p>
        <button
          onClick={generate}
          className="mt-6 px-6 py-2.5 bg-gold/10 border border-gold/20 text-gold rounded-xl text-sm font-semibold hover:bg-gold/20 transition-all"
        >
          Erneut versuchen
        </button>
      </div>
    );
  }

  // ─── Ergebnisse ───────────────────────────────────────────────
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        <div className="flex-1">
          <p className="text-emerald-400 text-sm font-medium">
            {result.images.length} Bilder + {result.logos.length} Logo-Varianten für{" "}
            <span className="font-semibold">{result.brandContext.ci.brandName}</span>
          </p>
          <p className="text-cream/40 text-xs">
            Branche: {result.brandContext.products.industry} · Ton:{" "}
            {result.brandContext.ci.tone} · Mood: {result.brandContext.audience.visualMood}
          </p>
        </div>
      </div>

      {/* Logos */}
      {result.logos.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gold/15 rounded-2xl overflow-hidden bg-charcoal/60"
        >
          <header className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
            <p className="font-semibold text-cream text-sm">Logo-Assets</p>
            <p className="text-cream/30 text-[10px] uppercase tracking-wider">
              Marken-Logo auf PMax-Spec
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
            {result.logos.map((logo) => (
              <figure
                key={logo.filename}
                className="relative rounded-xl overflow-hidden border border-gold/10 bg-white/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.publicUrl}
                  alt={`Logo ${logo.variant}`}
                  className="w-full h-auto block"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-3 py-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-cream text-xs font-semibold">
                      {logo.variant === "square" ? "Logo 1:1" : "Logo 4:1"}
                    </p>
                    <p className="text-cream/50 text-[10px]">
                      {logo.width}×{logo.height}
                    </p>
                  </div>
                  <a
                    href={logo.publicUrl}
                    download={logo.filename}
                    className="text-gold/70 hover:text-gold transition-colors"
                    title="Download"
                  >
                    <Download size={15} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.section>
      )}

      {/* Motive */}
      {grouped.map((motifImgs) => {
        const m = motifImgs[0];
        return (
          <motion.section
            key={m.motifIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: m.motifIndex * 0.08 }}
            className="border border-gold/15 rounded-2xl overflow-hidden bg-charcoal/60"
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                  {m.motifIndex + 1}
                </span>
                <div>
                  <p className="font-semibold text-cream text-sm">{m.motifName}</p>
                  <p className="text-cream/40 text-[10px] uppercase tracking-wider">
                    {m.archetype}
                  </p>
                </div>
              </div>
              <p className="text-cream/30 text-[10px] uppercase tracking-wider max-w-[50%] text-right">
                {m.concept}
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
              {motifImgs
                .sort((a, b) => {
                  const order: Record<GeneratedImageResp["format"], number> = {
                    square: 0,
                    landscape: 1,
                    portrait: 2,
                  };
                  return order[a.format] - order[b.format];
                })
                .map((img) => (
                  <figure
                    key={img.filename}
                    className="relative rounded-xl overflow-hidden border border-gold/10 bg-black/30 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.publicUrl}
                      alt={img.concept}
                      className="w-full h-auto block"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-3 py-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-cream text-xs font-semibold">
                          {FORMAT_LABELS[img.format].label}
                        </p>
                        <p className="text-cream/50 text-[10px]">
                          {FORMAT_LABELS[img.format].size} · QC {img.qcScore}/10
                        </p>
                      </div>
                      <a
                        href={img.publicUrl}
                        download={img.filename}
                        className="text-gold/70 hover:text-gold transition-colors"
                        title="Download"
                      >
                        <Download size={15} />
                      </a>
                    </figcaption>
                  </figure>
                ))}
            </div>
          </motion.section>
        );
      })}

      <div className="flex items-center justify-between border-t border-gold/10 pt-5">
        <p className="text-cream/40 text-xs">Order-ID: <span className="font-mono">{result.orderId.slice(0, 8)}</span></p>
        <button
          onClick={generate}
          className="flex items-center gap-2 text-gold/70 hover:text-gold text-sm font-semibold transition-colors"
        >
          <ImageIcon size={13} />
          Neu generieren
        </button>
      </div>
    </div>
  );
}
