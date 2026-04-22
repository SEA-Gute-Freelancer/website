"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  budgetIdx: number;
  goalIdx: number;
  message: string;
};

export default function KontaktPage() {
  const { t } = useLanguage();
  const k = t.kontakt;

  const [form, setForm] = useState<FormData>({
    name: "", company: "", email: "", phone: "",
    budgetIdx: -1, goalIdx: -1, message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          budget: form.budgetIdx >= 0 ? t.kontakt.form.budgetOptions[form.budgetIdx] : "",
          goal:   form.goalIdx   >= 0 ? t.kontakt.form.goalOptions[form.goalIdx]     : "",
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Fehler beim Senden.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  }

  const contactDetails = [
    { icon: Mail,   label: k.info.h2,            value: "seoadsrm@gmail.com",           link: "mailto:seoadsrm@gmail.com" },
    { icon: Phone,  label: "Telefon / Phone",      value: "+49 176 26144998",             link: "tel:+4917626144998" },
    { icon: Clock,  label: "Erreichbarkeit / Availability", value: k.info.availability,  link: null },
    { icon: MapPin, label: "Standort / Location",  value: k.info.location,               link: null },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-40 pb-10 lg:pb-16 bg-cream overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gold/5 rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-3xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">{k.hero.label}</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl text-charcoal leading-tight mb-6">
              {k.hero.h1a}
              <br />
              <span className="italic text-gold">{k.hero.h1b}</span>
            </h1>
            <p className="text-warm-muted text-base sm:text-xl leading-relaxed max-w-xl">{k.hero.p}</p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact info */}
            <FadeIn direction="left" className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-heading text-2xl text-charcoal mb-8">{k.info.h2}</h2>
                <StaggerContainer className="space-y-5" staggerDelay={0.1}>
                  {contactDetails.map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.label}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                            <Icon size={17} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-warm-muted text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                            {item.link ? (
                              <a href={item.link} className="text-charcoal text-[15px] font-medium hover:text-gold transition-colors">
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-charcoal text-[15px] font-medium">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>

                {/* What to expect */}
                <div className="mt-10 p-6 bg-charcoal rounded-2xl">
                  <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">{k.info.expectLabel}</p>
                  <ul className="space-y-3">
                    {k.info.expectItems.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-cream/70 text-sm">
                        <CheckCircle2 size={15} className="text-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn direction="right" className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-20 bg-white border border-gold/15 rounded-3xl min-h-[500px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 size={32} className="text-gold" />
                    </motion.div>
                    <h3 className="font-heading text-3xl text-charcoal mb-3">{k.success.h3}</h3>
                    <p className="text-warm-muted text-lg max-w-md mb-8">{k.success.p}</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", budgetIdx: -1, goalIdx: -1, message: "" }); }}
                      className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:underline"
                    >
                      {k.success.reset}
                      <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-white border border-gold/15 rounded-3xl p-5 sm:p-8 lg:p-10"
                  >
                    <h2 className="font-heading text-2xl text-charcoal mb-8">{k.form.h2}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.name} *</label>
                        <input required name="name" value={form.name} onChange={handleChange} placeholder="Max Mustermann"
                          className="w-full px-4 py-3 bg-cream border border-gold/20 rounded-xl text-charcoal text-sm placeholder:text-warm-muted-light focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.company} *</label>
                        <input required name="company" value={form.company} onChange={handleChange} placeholder="Muster GmbH"
                          className="w-full px-4 py-3 bg-cream border border-gold/20 rounded-xl text-charcoal text-sm placeholder:text-warm-muted-light focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.email} *</label>
                        <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="max@muster.de"
                          className="w-full px-4 py-3 bg-cream border border-gold/20 rounded-xl text-charcoal text-sm placeholder:text-warm-muted-light focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.phone}</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+49 30 000 000 00"
                          className="w-full px-4 py-3 bg-cream border border-gold/20 rounded-xl text-charcoal text-sm placeholder:text-warm-muted-light focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all" />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.budgetLabel}</label>
                      <select
                        value={form.budgetIdx === -1 ? "" : String(form.budgetIdx)}
                        onChange={(e) => setForm((prev) => ({ ...prev, budgetIdx: e.target.value === "" ? -1 : Number(e.target.value) }))}
                        className="w-full px-4 py-3 bg-cream border border-gold/20 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all appearance-none"
                      >
                        <option value="">{k.form.budgetPlaceholder}</option>
                        {k.form.budgetOptions.map((o, i) => (
                          <option key={i} value={String(i)}>{o}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-5">
                      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.goalLabel}</label>
                      <div className="flex flex-wrap gap-2">
                        {k.form.goalOptions.map((o, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setForm((prev) => ({ ...prev, goalIdx: i }))}
                            className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                              form.goalIdx === i
                                ? "bg-gold border-gold text-charcoal"
                                : "border-gold/25 text-warm-muted hover:border-gold hover:text-charcoal bg-cream"
                            }`}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">{k.form.messageLabel}</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={k.form.messagePlaceholder}
                        className="w-full px-4 py-3 bg-cream border border-gold/20 rounded-xl text-charcoal text-sm placeholder:text-warm-muted-light focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 bg-gold text-charcoal font-semibold rounded-full text-[15px] flex items-center justify-center gap-2.5 hover:bg-gold-dark hover:text-cream transition-all duration-300 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full"
                          />
                          {k.form.submitting}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {k.form.submit}
                        </>
                      )}
                    </motion.button>

                    <p className="text-warm-muted text-xs text-center mt-4">{k.form.disclaimer}</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
