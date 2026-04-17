"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-xl text-charcoal mb-4">{title}</h2>
      <div className="space-y-3 text-warm-muted text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gold/15" />;
}

export default function DatenschutzPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 lg:pt-40 pb-12 lg:pb-16 bg-cream overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">Rechtliches</p>
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-charcoal leading-tight mb-4">
              Datenschutz&shy;erklärung
            </h1>
            <p className="text-warm-muted text-base leading-relaxed">
              Gemäß Art. 13, 14 DSGVO (EU-Datenschutz-Grundverordnung)
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-2xl bg-white border border-gold/15 rounded-3xl p-8 lg:p-12 space-y-10">

              {/* 1. Verantwortlicher */}
              <Section title="1. Verantwortlicher">
                <p>
                  Verantwortlicher im Sinne der DSGVO für die Verarbeitung personenbezogener Daten auf dieser Website ist:
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-charcoal">Robert Miler</p>
                  <p>Straßmannstraße 45, 10249 Berlin</p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:hello@robertmiler.com" className="text-gold hover:underline">
                      hello@robertmiler.com
                    </a>
                  </p>
                </div>
              </Section>

              <Divider />

              {/* 2. Hosting */}
              <Section title="2. Hosting">
                <p>
                  Diese Website wird bei <span className="font-medium text-charcoal">Vercel Inc.</span> (340 Pine Street, Suite 701, San Francisco, CA 94104, USA) gehostet. Beim Aufruf der Website werden automatisch Verbindungsdaten an die Server von Vercel übermittelt. Dazu gehören:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>IP-Adresse des anfragenden Geräts</li>
                  <li>Datum und Uhrzeit der Anfrage</li>
                  <li>Aufgerufene URL</li>
                  <li>Verwendeter Browser und Betriebssystem</li>
                  <li>HTTP-Statuscode</li>
                </ul>
                <p>
                  Diese Daten sind technisch erforderlich, um die Website auszuliefern, und werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website).
                </p>
                <p>
                  Vercel ist unter dem EU-US Data Privacy Framework zertifiziert, sodass ein angemessenes Datenschutzniveau gewährleistet ist. Weitere Informationen:{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    vercel.com/legal/privacy-policy
                  </a>
                </p>
              </Section>

              <Divider />

              {/* 3. Kontaktformular */}
              <Section title="3. Kontaktformular">
                <p>
                  Wenn Sie uns über das Kontaktformular kontaktieren, erheben wir folgende Daten:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Name</li>
                  <li>Unternehmen</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer (optional)</li>
                  <li>Budget und Projektziel</li>
                  <li>Freitext-Nachricht (optional)</li>
                </ul>
                <p>
                  Die Daten werden über den Dienst <span className="font-medium text-charcoal">Resend</span> (Resend Inc., 2261 Market Street #4496, San Francisco, CA 94114, USA) per E-Mail an uns weitergeleitet und danach nicht gespeichert. Wir verwenden die Daten ausschließlich zur Bearbeitung Ihrer Anfrage.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Daten, die im Rahmen einer Zusammenarbeit anfallen, werden gemäß den gesetzlichen Aufbewahrungsfristen (i. d. R. 6–10 Jahre) gespeichert.
                </p>
              </Section>

              <Divider />

              {/* 4. PMax Builder */}
              <Section title="4. PMax Campaign Builder">
                <p>
                  Unser kostenloser PMax Campaign Builder verarbeitet die von Ihnen eingegebene URL sowie optionale Eingaben (Zielgruppe, Sprache). Die Verarbeitung erfolgt durch folgende Drittanbieter:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>
                    <span className="font-medium text-charcoal">Anthropic, Inc.</span> (San Francisco, USA) – KI-Modell zur Kampagnengenerierung
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Jina AI GmbH</span> (Berlin, Deutschland) – Auslesen des Inhalts der eingegebenen URL
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Google LLC</span> (bei Nutzung des Gemini-Modells mit eigenem API-Key)
                  </li>
                </ul>
                <p>
                  Eigene API-Keys, die Sie optional eingeben, werden ausschließlich für die jeweilige Anfrage verwendet und weder gespeichert noch protokolliert. Es findet keine dauerhafte Speicherung der eingegebenen URLs oder generierten Inhalte auf unseren Servern statt.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Nutzung des angebotenen Dienstes) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am Betrieb des Tools).
                </p>
              </Section>

              <Divider />

              {/* 5. Google Ads */}
              <Section title="5. Google Ads und Conversion-Tracking">
                <p>
                  Diese Website verwendet <span className="font-medium text-charcoal">Google Ads</span> mit Conversion-Tracking der Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Dabei wird ein Cookie auf Ihrem Endgerät gesetzt, wenn Sie über eine Google-Anzeige auf unsere Website gelangen. Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen ausschließlich der Erfolgsmessung unserer Anzeigen.
                </p>
                <p>
                  Wir setzen Google Ads im Consent Mode ein: Tracking-Cookies werden erst aktiviert, wenn Sie im Cookie-Banner eingewilligt haben. Ohne Ihre Einwilligung werden keine personenbezogenen Daten an Google übermittelt.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den Browser-Cache leeren oder den Cookie-Eintrag <code className="bg-gold/10 text-charcoal px-1 rounded text-[13px]">sgf_cookie_consent</code> aus dem lokalen Speicher Ihres Browsers entfernen.
                </p>
                <p>
                  Google ist unter dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen:{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    policies.google.com/privacy
                  </a>
                </p>
              </Section>

              <Divider />

              {/* 6. Cookies und lokaler Speicher */}
              <Section title="6. Cookies und lokaler Speicher">
                <p>
                  Diese Website setzt einen Eintrag im lokalen Speicher Ihres Browsers (<code className="bg-gold/10 text-charcoal px-1 rounded text-[13px]">sgf_cookie_consent</code>), um Ihre Cookie-Präferenz zu speichern. Dieser Eintrag enthält keine personenbezogenen Daten und wird nicht an Dritte übertragen.
                </p>
                <p>
                  Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Marketing-Cookies werden nur nach Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) aktiviert.
                </p>
              </Section>

              <Divider />

              {/* 7. Betroffenenrechte */}
              <Section title="7. Ihre Rechte als betroffene Person">
                <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <span className="font-medium text-charcoal">Auskunft</span> (Art. 15 DSGVO): Sie können Auskunft über die von uns verarbeiteten Daten verlangen.
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Berichtigung</span> (Art. 16 DSGVO): Sie können die Berichtigung unrichtiger Daten verlangen.
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Löschung</span> (Art. 17 DSGVO): Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Einschränkung der Verarbeitung</span> (Art. 18 DSGVO)
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Datenübertragbarkeit</span> (Art. 20 DSGVO)
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Widerspruch</span> (Art. 21 DSGVO): Sie können der Verarbeitung auf Basis berechtigter Interessen jederzeit widersprechen.
                  </li>
                  <li>
                    <span className="font-medium text-charcoal">Widerruf einer Einwilligung</span> (Art. 7 Abs. 3 DSGVO): Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
                  </li>
                </ul>
                <p>
                  Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                  <a href="mailto:hello@robertmiler.com" className="text-gold hover:underline">
                    hello@robertmiler.com
                  </a>
                </p>
              </Section>

              <Divider />

              {/* 8. Beschwerderecht */}
              <Section title="8. Beschwerderecht bei der Aufsichtsbehörde">
                <p>
                  Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die zuständige Aufsichtsbehörde für Berlin ist:
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-charcoal">Berliner Beauftragte für Datenschutz und Informationsfreiheit</p>
                  <p>Friedrichstr. 219, 10969 Berlin</p>
                  <p>
                    Website:{" "}
                    <a
                      href="https://www.datenschutz-berlin.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline"
                    >
                      www.datenschutz-berlin.de
                    </a>
                  </p>
                </div>
              </Section>

              <Divider />

              {/* 9. Datensicherheit */}
              <Section title="9. Datensicherheit">
                <p>
                  Diese Website verwendet eine SSL/TLS-Verschlüsselung für die Übertragung von Daten. Eine verschlüsselte Verbindung erkennen Sie an <code className="bg-gold/10 text-charcoal px-1 rounded text-[13px]">https://</code> in der Adresszeile Ihres Browsers.
                </p>
              </Section>

              <Divider />

              {/* 10. Aktualität */}
              <Section title="10. Aktualität dieser Datenschutzerklärung">
                <p>
                  Diese Datenschutzerklärung hat den Stand vom <span className="font-medium text-charcoal">April 2026</span>. Wir behalten uns vor, sie bei Änderungen der rechtlichen oder technischen Rahmenbedingungen anzupassen.
                </p>
              </Section>

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
