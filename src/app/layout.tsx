import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { SEO_KEYWORDS_CONFIRMED, SITE_URL, organizationJsonLd } from "@/lib/seo";
import { company } from "@/lib/site";

import "./globals.css";

/*
  Type follows the reference component: Inter only, across the full weight
  range (300-900). next/font defines the variable at build.
*/
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

/*
  Site-wide metadata comes from src/lib/seo.ts (titles 50-60 chars with the
  keyword up front, descriptions 140-160 with a soft CTA). Canonical and OG
  URLs use SITE_URL (owner-confirmed https://next360.in, overridable per
  environment). metadataBase is set so all relative OG/image paths resolve.
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Digital Commerce, AI & Infrastructure",
    template: "%s | Next360",
  },
  description:
    "Next360 builds digital commerce, business technology, AI, infrastructure, advertising and growth solutions in Hyderabad. Flagship: Next360 Organic. Talk to us.",
  keywords: [...SEO_KEYWORDS_CONFIRMED],
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
    title: "Digital Commerce, AI & Infrastructure",
    description:
      "Next360 builds digital commerce, business technology, AI, infrastructure, advertising and growth solutions. Flagship: Next360 Organic.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Commerce, AI & Infrastructure",
    description:
      "Next360 builds digital commerce, business technology, AI, infrastructure, advertising and growth solutions. Flagship: Next360 Organic.",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

/*
  themeColor belongs to the viewport export in the App Router. Leaving it in
  metadata made Next warn on every route, because the root layout metadata
  merges into all of them.
*/
export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /*
    Entity graph for crawlers and AI answer engines: every value traces to
    site.ts (antislop R-38). legalName publishes because the owner confirmed
    the registered name and CIN on 2026-10-01.
  */
  const orgJsonLd = organizationJsonLd();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-accent focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-brand-dark"
        >
          Skip to content
        </a>
        <Header />
        <ScrollToHash />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
