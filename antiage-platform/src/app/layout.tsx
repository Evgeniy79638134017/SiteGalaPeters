import type { Metadata } from "next";
import Script from "next/script";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Source_Sans_3,
  Caveat,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTABanner } from "@/components/layout/CTABanner";
import { organizationJsonLd, personJsonLd } from "@/lib/jsonld";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-subheading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["cyrillic", "latin"],
  variable: "--font-handwritten",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://antiage.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AntiAge — Молодость доступна каждому",
    template: "%s | AntiAge",
  },
  description:
    "Эксперт по anti-age с 30-летним опытом. Три кита здоровья: биохимия, биомеханика, биоэнергетика. Пройдите тест и узнайте свой биологический возраст.",
  keywords: [
    "anti-age",
    "молодость",
    "БАДы",
    "здоровье после 50",
    "биологический возраст",
    "коллаген",
    "энергия",
    "биохимия",
    "биомеханика",
    "биоэнергетика",
  ],
  authors: [{ name: "AntiAge Expert" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "AntiAge — Молодость доступна каждому",
    url: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${cormorant.variable} ${sourceSans.variable} ${caveat.variable} h-full`}
    >
      <head>
        {/* JSON-LD: Organization + Person (на всех страницах) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CTABanner />

        {/* Umami Analytics (privacy-first, без куки) */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL ?? "https://cloud.umami.is"}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
