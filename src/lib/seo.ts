/*
  Central SEO source of truth for the Next.js app, adapted from the 32-keyword
  company-profile plan (static HTML head + JSON-LD + robots/sitemap).

  Honesty architecture (antislop R-17/R-36/R-38 + site.ts neverFabricate):
  only confirmed facts ship. The certified-organic claims were owner-confirmed
  2026-09-25 and graduated to CONFIRMED; the rejected Slick names and the
  unconfirmed APEDA/FSSAI schemes stay in PENDING and must NOT be published.

  2026 spec applied throughout: full titles 50-60 chars with the keyword up
  front, descriptions 140-160 chars with keyword early + soft CTA, one H1 per
  page (kept in the page bodies, not here), single self-referencing canonical
  per page once the domain is confirmed.
*/

import type { Metadata } from "next";

import { company, slickProducts } from "@/lib/site";

/*
  Production domain, owner-confirmed 2026-09-25 as https://next360.in.
  NEXT_PUBLIC_SITE_URL overrides it per environment when set.
*/
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://next360.in";

/* Keywords that match confirmed facts. The certified set was owner-confirmed
   2026-09-25 (certificates in hand). Safe to publish. */
export const SEO_KEYWORDS_CONFIRMED = [
  "Next360 Organic",
  "flagship Agritech initiative",
  "organic products India",
  "digital commerce India",
  "agriculture technology",
  "agricultural ecosystems",
  "supply chains",
  "market access",
  "Agritech Hyderabad",
  "IT Services Hyderabad",
  "software development Hyderabad",
  "managed technology services",
  "Slick Technologies",
  "SlickCode",
  "SlickSEO",
  "Slixo",
  "Organize",
  "AI-assisted development",
  "Save now. Find anytime.",
  "Next360 Hyderabad Telangana",
  "India's first certified organic marketplace",
  "certified organic products India",
  "verified organic marketplace India",
  "traceable organic products India",
  "NPOP certified organic India",
  "Jaivik Bharat certified products",
  "organic certificate based platform India",
  "buy certified organic online India",
  "organic farmers marketplace India",
  "eco-friendly natural products India",
  "best organic marketplace Hyderabad",
  "top certified organic company Hyderabad",
  "best organic products Hyderabad",
  "top organic marketplace India",
] as const;

/*
  Held back, do not publish:
  - SlickFlow/SlickChat/SlickDesk: owner-confirmed 2026-09-25 these names are
    NOT real. The true set is SlickCode/SlickSEO/Slixo/Organize.
  - APEDA/FSSAI scheme names: certification proven in general, but these two
    specific schemes were never confirmed. Do not name them without proof.
*/
export const SEO_KEYWORDS_PENDING = [
  "SlickFlow",
  "SlickChat",
  "SlickDesk",
  "APEDA organic certification",
  "FSSAI organic food India",
] as const;

type PageSeo = {
  /* Full title WITHOUT the " | Next360" template suffix (keep under 49 chars). */
  title: string;
  /* 140-160 chars, keyword in the first 30, ends with a soft CTA. */
  description: string;
  keywords: readonly string[];
  /* Short eyebrow shown on the generated OG card. */
  label?: string;
};

const HYDERABAD_CTA = "Based in Hyderabad, Telangana.";

export const pageSeo: Record<string, PageSeo> = {
  "/": {
    label: "Digital Commerce · AI · Infrastructure",
    title: "Agritech & IT Services, Hyderabad",
    description: `Next360 builds digital commerce, business technology, AI and computer vision, infrastructure and growth solutions. Flagship: Next360 Organic. ${HYDERABAD_CTA} Talk to us.`,
    keywords: [
      "Agritech Hyderabad",
      "IT Services Hyderabad",
      "Next360 Organic",
      "flagship Agritech initiative",
      "managed technology services",
    ],
  },
  "/about": {
    label: "Company Profile",
    title: "About: Company Profile & Structure",
    description:
      "Who Next360 is, how it is structured, and its thirteen-part company profile. A technology organization across six technology domains. Learn more.",
    keywords: ["Next360", "company profile", "Agritech", "IT Services"],
  },
  "/agritech": {
    label: "Agritech",
    title: "Agritech: Organic Products, Commerce",
    description:
      "Agriculture technology, organic products, digital commerce, supply chains and market access. Next360 Organic is the flagship initiative. Explore more.",
    keywords: [
      "Agritech Hyderabad",
      "organic products India",
      "digital commerce India",
      "supply chains",
      "market access",
      "Next360 Organic",
    ],
  },
  "/it-services": {
    label: "IT Services",
    title: "IT Services: Software & Support",
    description:
      "Software development, backend engineering, enterprise software, IT infrastructure, support and managed technology services. Request a consultation.",
    keywords: [
      "IT Services Hyderabad",
      "software development Hyderabad",
      "managed technology services",
      "enterprise software",
    ],
  },
  "/organic": {
    label: "Flagship Venture",
    title: "India's Certified Organic Marketplace",
    description:
      "India's first certified organic marketplace: verification-first trade in organic products with NPOP and Jaivik Bharat traceability. Explore more.",
    keywords: [
      "India's first certified organic marketplace",
      "certified organic products India",
      "verified organic marketplace India",
      "NPOP certified organic India",
      "Jaivik Bharat certified products",
      "Next360 Organic",
      "organic farmers marketplace India",
    ],
  },
  "/projects": {
    label: "Proven Projects",
    title: "Projects: Proven Deployments",
    description:
      "Ten proven Next360 projects and deployments: Mallaram Digital Village, ORR CCTV monitoring, facial recognition and more. Browse the work.",
    keywords: [
      "Next360 Organic",
      "Mallaram Digital Village",
      "ORR CCTV monitoring",
      "facial recognition attendance",
      "EV charging solutions",
    ],
  },
  "/slick": {
    label: "Sub-company",
    title: "SLICK Technologies by Next360",
    description:
      "SLICK Technologies, a Next360 sub-company building its own software products: SlickCode, Let's Connect, SlickSEO, Slixo and Organize. See the products.",
    keywords: [
      "Slick Technologies",
      "SlickCode",
      "SlickSEO",
      "Slixo",
      "Organize",
      "Let's Connect",
    ],
  },
  "/capabilities": {
    label: "Capabilities",
    title: "Capabilities: Six Technology Domains",
    description:
      "What Next360 delivers across digital commerce, business technology, AI and computer vision, infrastructure, advertising and growth. See how we deliver.",
    keywords: ["Agritech", "IT Services", "managed technology services"],
  },
  "/contact": {
    label: "Contact",
    title: "Contact Next360 in Hyderabad",
    description:
      "Contact Next360 for the company profile, Agritech and IT Services enquiries. Email office@next360.in, call +91-9989163332, Madhapur, Hyderabad. Reach out.",
    keywords: ["Next360 Hyderabad Telangana", "office@next360.in"],
  },
};

/* All published routes, used by the sitemap once SITE_URL is set. */
export const SEO_ROUTES = [
  "/",
  "/about",
  "/agritech",
  "/it-services",
  "/organic",
  "/projects",
  "/slick",
  "/capabilities",
  "/contact",
] as const;

export function metadataFor(path: string): Metadata {
  const page = pageSeo[path] ?? pageSeo["/"]!;
  const canonical = SITE_URL ? { canonical: `${SITE_URL}${path}` } : undefined;
  /*
    Generated per route so each share preview describes its own page. Falls
    back to the local hero photograph when SITE_URL is not set yet (local dev).
  */
  const ogImage = SITE_URL
    ? `${SITE_URL}/og?title=${encodeURIComponent(page.title)}&label=${encodeURIComponent(page.label ?? "Next360")}`
    : "/images/hero-farm.jpg";
  return {
    title: page.title,
    description: page.description,
    keywords: [...page.keywords],
    ...(canonical ? { alternates: canonical } : {}),
    openGraph: {
      type: "website",
      siteName: company.name,
      locale: "en_IN",
      title: page.title,
      description: page.description,
      ...(SITE_URL
        ? { url: `${SITE_URL}${path}`, images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(SITE_URL ? { images: [ogImage] } : {}),
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

/*
  Organization entity for JSON-LD. Every value traces to site.ts or a page:
  address/phone/email from company.contact, brands from slickProducts,
  areaServed from the confirmed Hyderabad address. legalName is now published:
  the owner confirmed both the registered name and the CIN on 2026-10-01.
*/
export function organizationJsonLd(): Record<string, unknown> {
  const entity: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...(SITE_URL ? { "@id": `${SITE_URL}/#organization`, url: SITE_URL } : {}),
    name: company.name,
    description: company.positioning,
    slogan: company.tagline,
    email: company.contact.email,
    telephone: company.contact.phone,
    areaServed: ["Hyderabad", "Telangana", "India"],
    brand: slickProducts.map((p) => p.name),
    subOrganization: {
      "@type": "Organization",
      name: "SLICK Technologies",
      description:
        "Next360 sub-company building its own software products: SlickCode, Let's Connect, SlickSEO, Slixo and Organize.",
    },
    knowsAbout: Array.from(
      new Set([
        ...slickProducts.flatMap((p) => [...p.scope]),
        "certified organic marketplace",
        "verification-first commerce",
        "organic traceability",
      ]),
    ),
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "T-Hub Phase 2 Launch, 20 Inorbit Mall Road, Vittal Rao Nagar, Madhapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN",
    },
  };
  if (company.legalName) entity.legalName = company.legalName;
  return entity;
}
