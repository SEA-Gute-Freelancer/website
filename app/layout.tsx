import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CookieBanner } from "@/components/ui/CookieBanner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sea-gute-freelancer.de"),
  title: {
    default: "SEA Gute Freelancer – Google Ads Kollektiv für den Mittelstand",
    template: "%s | SEA Gute Freelancer",
  },
  description:
    "Erfahrene Google Ads Spezialisten für kleine und mittelständische Unternehmen. Präzise Kampagnen, messbare Ergebnisse, persönliche Betreuung.",
  keywords: [
    "Google Ads", "SEA Freelancer", "PPC Agentur", "Google Ads Spezialist",
    "Mittelstand Marketing", "Google Ads Deutschland", "Performance Marketing",
    "Google Ads Kollektiv", "sea-gute-freelancer",
  ],
  authors: [{ name: "SEA Gute Freelancer", url: "https://www.sea-gute-freelancer.de" }],
  creator: "SEA Gute Freelancer",
  publisher: "SEA Gute Freelancer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.sea-gute-freelancer.de",
    siteName: "SEA Gute Freelancer",
    title: "SEA Gute Freelancer – Google Ads Kollektiv für den Mittelstand",
    description:
      "Erfahrene Google Ads Spezialisten für kleine und mittelständische Unternehmen. Präzise Kampagnen, messbare Ergebnisse, persönliche Betreuung.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SEA Gute Freelancer – Google Ads Kollektiv",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEA Gute Freelancer – Google Ads Kollektiv für den Mittelstand",
    description:
      "Erfahrene Google Ads Spezialisten für kleine und mittelständische Unternehmen. Präzise Kampagnen, messbare Ergebnisse, persönliche Betreuung.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.sea-gute-freelancer.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KP6PDJM7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Consent Mode v2 — must fire before Google tag */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KP6PDJM7');
          `}
        </Script>

        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
