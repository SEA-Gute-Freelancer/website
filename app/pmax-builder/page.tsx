"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Loader2,
  Globe,
  Users,
  Search,
  FileText,
  BarChart2,
  AlertCircle,
  Download,
  KeyRound,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClusterCopy {
  shortHeadlines: string[];
  longHeadlines: string[];
  descriptions: string[];
}

interface Cluster {
  name: string;
  psychology: string;
  searchThemes: string[];
  audiences: string[];
  customUrls: string[];
  copy: ClusterCopy;
}

interface PMaxResult {
  analysis: string;
  clusters: Cluster[];
  scrapeStatus: "success" | "fallback" | "failed";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function charColor(len: number, max: number) {
  if (len > max) return "text-red-400";
  if (len > max * 0.9) return "text-yellow-400";
  return "text-cream/40";
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  };
  return (
    <button
      onClick={handle}
      className="ml-2 text-gold/50 hover:text-gold transition-colors"
      title="Kopieren"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function CharBadge({ text, max }: { text: string; max: number }) {
  const len = text.length;
  return (
    <span className={`text-[10px] font-mono ml-1 ${charColor(len, max)}`}>
      {len}/{max}
    </span>
  );
}

// ─── Export to CSV ────────────────────────────────────────────────────────────

function exportCSV(result: PMaxResult) {
  const rows: string[][] = [
    ["Asset Group", "Type", "Content", "Characters", "Max Allowed", "Status"],
  ];
  result.clusters.forEach((c) => {
    c.copy.shortHeadlines.forEach((h) =>
      rows.push([
        c.name,
        "Short Headline",
        h,
        String(h.length),
        "30",
        h.length <= 30 ? "OK" : "TOO LONG",
      ])
    );
    c.copy.longHeadlines.forEach((h) =>
      rows.push([
        c.name,
        "Long Headline",
        h,
        String(h.length),
        "90",
        h.length <= 90 ? "OK" : "TOO LONG",
      ])
    );
    c.copy.descriptions.forEach((d) =>
      rows.push([
        c.name,
        "Description",
        d,
        String(d.length),
        "90",
        d.length <= 90 ? "OK" : "TOO LONG",
      ])
    );
    c.searchThemes.forEach((t) =>
      rows.push([c.name, "Search Theme", t, String(t.length), "-", "OK"])
    );
  });

  const csv = rows
    .map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pmax-campaign.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Cluster Card ─────────────────────────────────────────────────────────────

function ClusterCard({
  cluster,
  index,
}: {
  cluster: Cluster;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);
  const [tab, setTab] = useState<"copy" | "themes" | "audiences">("copy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="border border-gold/15 rounded-2xl overflow-hidden bg-charcoal/60"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gold/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold text-xs font-bold">
            {index + 1}
          </span>
          <div className="text-left">
            <p className="font-semibold text-cream text-sm">{cluster.name}</p>
            <p className="text-cream/40 text-xs mt-0.5 italic">
              {cluster.psychology}
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-gold/50" />
        ) : (
          <ChevronDown size={16} className="text-gold/50" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gold/10 p-5 space-y-5">
              {/* Tab switcher */}
              <div className="flex gap-1 p-1 bg-black/20 rounded-xl w-fit">
                {(
                  [
                    { id: "copy", label: "Ad Copy", icon: FileText },
                    { id: "themes", label: "Search Themes", icon: Search },
                    { id: "audiences", label: "Audiences", icon: Users },
                  ] as const
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tab === id
                        ? "bg-gold text-charcoal"
                        : "text-cream/50 hover:text-cream"
                    }`}
                  >
                    <Icon size={11} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Copy Tab */}
              {tab === "copy" && (
                <div className="space-y-5">
                  {/* Short Headlines */}
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-2">
                      Short Headlines (max 30 Zeichen)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {cluster.copy.shortHeadlines.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2"
                        >
                          <span className="text-cream text-xs">{h}</span>
                          <div className="flex items-center shrink-0 ml-2">
                            <CharBadge text={h} max={30} />
                            <CopyBtn text={h} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Long Headlines */}
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-2">
                      Long Headlines (max 90 Zeichen)
                    </p>
                    <div className="space-y-1.5">
                      {cluster.copy.longHeadlines.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2"
                        >
                          <span className="text-cream text-sm">{h}</span>
                          <div className="flex items-center shrink-0 ml-3">
                            <CharBadge text={h} max={90} />
                            <CopyBtn text={h} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-2">
                      Descriptions (max 90 Zeichen)
                    </p>
                    <div className="space-y-1.5">
                      {cluster.copy.descriptions.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2"
                        >
                          <span className="text-cream/90 text-sm">{d}</span>
                          <div className="flex items-center shrink-0 ml-3">
                            <CharBadge text={d} max={90} />
                            <CopyBtn text={d} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Search Themes Tab */}
              {tab === "themes" && (
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-3">
                    {cluster.searchThemes.length} Search Themes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cluster.searchThemes.map((t, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 bg-black/30 border border-gold/10 text-cream/80 text-xs px-3 py-1.5 rounded-full"
                      >
                        {t}
                        <CopyBtn text={t} />
                      </span>
                    ))}
                  </div>

                  {cluster.customUrls.length > 0 && (
                    <div className="mt-5">
                      <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-3">
                        Custom Segment URLs
                      </p>
                      <div className="space-y-1.5">
                        {cluster.customUrls.map((u, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-black/20 rounded-lg px-3 py-2"
                          >
                            <span className="text-blue-400 text-xs font-mono truncate">
                              {u}
                            </span>
                            <CopyBtn text={u} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Audiences Tab */}
              {tab === "audiences" && (
                <div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-3">
                    Audience Signals
                  </p>
                  <div className="space-y-2">
                    {cluster.audiences.map((a, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2.5"
                      >
                        <Users size={13} className="text-gold/50 shrink-0" />
                        <span className="text-cream/90 text-sm">{a}</span>
                        <CopyBtn text={a} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PMaxBuilderPage() {
  const [url, setUrl] = useState("");
  const [audience, setAudience] = useState("B2C");
  const [language, setLanguage] = useState("Deutsch");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<PMaxResult | null>(null);
  const [activeTab, setActiveTab] = useState<"analysis" | "clusters">("analysis");
  const [showApiSection, setShowApiSection] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");
  const [provider, setProvider] = useState<"anthropic" | "gemini">("anthropic");
  const [showKey, setShowKey] = useState(false);

  async function generate() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/pmax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          audience,
          language,
          userApiKey: userApiKey.trim() || undefined,
          provider: userApiKey.trim() ? provider : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setResult(data);
      setActiveTab("analysis");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: "analysis" as const, label: "Analyse", icon: BarChart2 },
    { id: "clusters" as const, label: "Asset Groups", icon: Wand2 },
  ];

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-gold/15 bg-charcoal p-10 lg:p-16">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gold text-sm font-medium tracking-widest uppercase mb-4"
              >
                Kostenloses Tool
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading text-4xl lg:text-5xl text-cream leading-tight mb-4"
              >
                PMax Campaign
                <br />
                <span className="italic text-gold">Builder</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-cream/55 text-lg leading-relaxed"
              >
                Gib deine Landing Page URL ein — wir generieren 5 vollständige
                Asset Groups mit Search Themes, Audience Signals und Ad Copy
                nach Google Ads Standards.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="border border-gold/15 rounded-2xl p-6 bg-charcoal/60 space-y-5">
              <h2 className="text-cream font-semibold flex items-center gap-2">
                <Globe size={16} className="text-gold" />
                Konfiguration
              </h2>

              {/* URL */}
              <div>
                <label className="block text-xs font-semibold text-cream/60 uppercase tracking-wider mb-2">
                  Landing Page URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  onKeyDown={(e) => e.key === "Enter" && generate()}
                  className="w-full bg-black/30 border border-gold/15 rounded-xl px-4 py-3 text-cream placeholder-cream/25 focus:outline-none focus:ring-1 focus:ring-gold/40 text-sm transition-all"
                />
              </div>

              {/* Audience */}
              <div>
                <label className="block text-xs font-semibold text-cream/60 uppercase tracking-wider mb-2">
                  Zielgruppe
                </label>
                <div className="flex gap-3">
                  {["B2C", "B2B", "B2C & B2B"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAudience(opt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        audience === opt
                          ? "bg-gold text-charcoal border-gold"
                          : "border-gold/20 text-cream/50 hover:border-gold/40 hover:text-cream"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-xs font-semibold text-cream/60 uppercase tracking-wider mb-2">
                  Kampagnensprache
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-black/30 border border-gold/15 rounded-xl px-4 py-3 text-cream focus:outline-none focus:ring-1 focus:ring-gold/40 text-sm transition-all appearance-none cursor-pointer"
                >
                  {["Deutsch", "Englisch", "Französisch", "Spanisch", "Italienisch", "Niederländisch"].map(
                    (l) => (
                      <option key={l} value={l} className="bg-charcoal">
                        {l}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Generate button */}
              <button
                onClick={generate}
                disabled={loading || !url.trim()}
                className="w-full flex items-center justify-center gap-2 bg-gold text-charcoal font-bold py-4 rounded-xl hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analysiere…
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    Kampagne generieren
                  </>
                )}
              </button>
            </div>

            {/* Disclaimer — Kein SEA-Gute PMax */}
            <div className="border border-amber-500/20 rounded-2xl p-5 bg-amber-500/5">
              <p className="text-xs font-bold text-amber-400 mb-2">
                ⚠ Keine SEA-gute PMax
              </p>
              <p className="text-cream/60 text-xs leading-relaxed">
                Dieses Tool läuft auf dem{" "}
                <span className="text-cream/90 font-semibold">
                  schwächsten Claude-Modell
                </span>{" "}
                — gut für einen ersten Entwurf, aber nicht das, was unsere
                Experten liefern. Für deutlich bessere Ergebnisse: eigenen API
                Key eingeben.
              </p>
              <button
                onClick={() => setShowApiSection(!showApiSection)}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Zap size={11} />
                {showApiSection ? "Ausblenden" : "Eigenen Key verwenden →"}
              </button>
            </div>

            {/* Eigener API Key */}
            <AnimatePresence>
              {showApiSection && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border border-gold/20 rounded-2xl p-5 bg-charcoal/60 space-y-4">
                    <h3 className="text-cream font-semibold text-sm flex items-center gap-2">
                      <KeyRound size={14} className="text-gold" />
                      Eigener API Key
                    </h3>

                    {/* Provider */}
                    <div>
                      <label className="block text-xs font-semibold text-cream/60 uppercase tracking-wider mb-2">
                        Anbieter
                      </label>
                      <div className="flex gap-2">
                        {(["anthropic", "gemini"] as const).map((p) => (
                          <button
                            key={p}
                            onClick={() => setProvider(p)}
                            className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                              provider === p
                                ? "bg-gold text-charcoal border-gold"
                                : "border-gold/20 text-cream/50 hover:border-gold/40 hover:text-cream"
                            }`}
                          >
                            {p === "anthropic" ? "Anthropic" : "Google Gemini"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Key input */}
                    <div>
                      <label className="block text-xs font-semibold text-cream/60 uppercase tracking-wider mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showKey ? "text" : "password"}
                          value={userApiKey}
                          onChange={(e) => setUserApiKey(e.target.value)}
                          placeholder={
                            provider === "anthropic"
                              ? "sk-ant-..."
                              : "AIza..."
                          }
                          className="w-full bg-black/30 border border-gold/15 rounded-xl px-4 py-3 pr-10 text-cream placeholder-cream/20 focus:outline-none focus:ring-1 focus:ring-gold/40 text-sm font-mono transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                        >
                          {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <p className="text-cream/30 text-[10px] leading-relaxed">
                      Dein Key wird ausschließlich für diese Anfrage genutzt
                      und niemals auf unserem Server gespeichert.
                    </p>

                    {userApiKey.trim() && (
                      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
                        <Check size={12} className="text-emerald-400 shrink-0" />
                        <p className="text-emerald-400 text-xs">
                          {provider === "anthropic"
                            ? "Nutzt Claude Sonnet — deutlich bessere Qualität"
                            : "Nutzt Gemini 2.0 Flash — top Qualität"}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info box */}
            <div className="border border-gold/10 rounded-2xl p-5 bg-gold/5">
              <p className="text-xs font-bold text-gold uppercase tracking-wider mb-2">
                Was wird generiert?
              </p>
              <ul className="text-cream/60 text-xs space-y-1.5">
                {[
                  "5 Asset Groups (Cluster)",
                  "15+ Search Themes pro Gruppe",
                  "15 Short Headlines (≤30 Zeichen)",
                  "5 Long Headlines (≤90 Zeichen)",
                  "5 Descriptions (≤90 Zeichen)",
                  "Audience Signals",
                  "Custom Segment URLs",
                  "CSV Export für Google Ads",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={11} className="text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Results ── */}
          <main className="lg:col-span-8">
            <div className="border border-gold/15 rounded-2xl bg-charcoal/60 min-h-[600px] flex flex-col">
              {/* Tabs */}
              {result && (
                <div className="flex items-center justify-between px-6 pt-4 border-b border-gold/10">
                  <div className="flex gap-1">
                    {tabs.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all -mb-px ${
                          activeTab === id
                            ? "border-gold text-gold"
                            : "border-transparent text-cream/40 hover:text-cream/70"
                        }`}
                      >
                        <Icon size={13} />
                        {label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => exportCSV(result)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gold/70 hover:text-gold transition-colors pb-2"
                  >
                    <Download size={13} />
                    CSV Export
                  </button>
                </div>
              )}

              <div className="p-6 flex-1">
                {/* Placeholder */}
                {!loading && !result && !error && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center">
                    <Wand2 size={48} className="text-gold/20 mb-4" />
                    <p className="text-cream/30 text-lg font-medium">
                      URL eingeben und Kampagne generieren
                    </p>
                    <p className="text-cream/20 text-sm mt-2">
                      Die Analyse dauert ca. 15–25 Sekunden
                    </p>
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full border-2 border-gold/20 flex items-center justify-center">
                        <Loader2 size={28} className="text-gold animate-spin" />
                      </div>
                    </div>
                    <p className="text-cream/60 text-sm">
                      Analysiere Landing Page und erstelle Kampagnenstruktur…
                    </p>
                    <p className="text-cream/30 text-xs mt-2">
                      Das dauert ca. 15–25 Sekunden
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                    <AlertCircle size={40} className="text-red-400 mb-4" />
                    <p className="text-red-400 font-semibold mb-2">
                      Fehler bei der Generierung
                    </p>
                    <p className="text-cream/40 text-sm text-center max-w-md">
                      {error}
                    </p>
                    <button
                      onClick={generate}
                      className="mt-6 px-6 py-2.5 bg-gold/10 border border-gold/20 text-gold rounded-xl text-sm font-semibold hover:bg-gold/20 transition-all"
                    >
                      Erneut versuchen
                    </button>
                  </div>
                )}

                {/* Results */}
                {result && !loading && (
                  <AnimatePresence mode="wait">
                    {activeTab === "analysis" && (
                      <motion.div
                        key="analysis"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="prose-sm max-w-none"
                      >
                        {/* Scrape status badge */}
                        {result.scrapeStatus === "success" && (
                          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 mb-5">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <p className="text-emerald-400 text-xs font-medium">
                              Seite erfolgreich gelesen — Kampagne basiert auf echtem Seiteninhalt
                            </p>
                          </div>
                        )}
                        {result.scrapeStatus === "fallback" && (
                          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 mb-5">
                            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                            <p className="text-amber-400 text-xs font-medium">
                              Seite teilweise gelesen — Bot-Schutz erkannt, Fallback genutzt
                            </p>
                          </div>
                        )}
                        {result.scrapeStatus === "failed" && (
                          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 mb-5">
                            <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                            <p className="text-red-400 text-xs font-medium">
                              Seite konnte nicht gelesen werden — Kampagne basiert auf Domainnamen & Branchenwissen
                            </p>
                          </div>
                        )}

                        <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-4">
                          Strategische Analyse
                        </p>
                        <p className="text-cream/80 leading-relaxed whitespace-pre-line text-sm">
                          {result.analysis}
                        </p>

                        {/* Quick stats */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                          {[
                            {
                              label: "Asset Groups",
                              value: result.clusters.length,
                            },
                            {
                              label: "Search Themes",
                              value: result.clusters.reduce(
                                (acc, c) => acc + c.searchThemes.length,
                                0
                              ),
                            },
                            {
                              label: "Ad Variations",
                              value: result.clusters.reduce(
                                (acc, c) =>
                                  acc +
                                  c.copy.shortHeadlines.length +
                                  c.copy.longHeadlines.length +
                                  c.copy.descriptions.length,
                                0
                              ),
                            },
                          ].map(({ label, value }) => (
                            <div
                              key={label}
                              className="border border-gold/10 rounded-xl p-4 text-center"
                            >
                              <p className="text-gold font-heading text-2xl italic">
                                {value}
                              </p>
                              <p className="text-cream/40 text-xs mt-1">
                                {label}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "clusters" && (
                      <motion.div
                        key="clusters"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <p className="text-[11px] font-bold tracking-widest uppercase text-gold/60 mb-4">
                          {result.clusters.length} Asset Groups generiert
                        </p>
                        {result.clusters.map((cluster, i) => (
                          <ClusterCard key={i} cluster={cluster} index={i} />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
