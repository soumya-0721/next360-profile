import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import { ButtonLink, PageHero, SectionTitle } from "@/components/ui";
import { company } from "@/lib/site";

type Doc = {
  slug: string;
  label: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

/*
  Legal pages exist so every footer link resolves to a real route
  (antislop R-24). Each one is honestly marked as pending legal review
  rather than presenting drafted policy text as final.
*/
const docs: Doc[] = [
  {
    slug: "privacy",
    label: "Legal",
    title: "PRIVACY POLICY",
    intro:
      "How Next360 handles the information you send through this website.",
    sections: [
      {
        heading: "What we collect",
        body: "Only the details you submit through the contact form: your name, email address, organisation and message. No tracking or advertising cookies are set by this site.",
      },
      {
        heading: "How it is used",
        body: "To respond to your enquiry and, where relevant, to prepare the company profile or a proposal you have requested.",
      },
      {
        heading: "Status",
        body: "This policy is pending legal review. Retention periods, lawful basis and processor details will be added once confirmed.",
      },
    ],
  },
  {
    slug: "terms",
    label: "Legal",
    title: "TERMS & CONDITIONS",
    intro: "The terms on which this website and Next360's services are provided.",
    sections: [
      {
        heading: "Website content",
        body: "Content is provided for general information. Nothing on this site constitutes a binding offer or a contractual commitment.",
      },
      {
        heading: "Services",
        body: "Scope, deliverables and commercial terms are agreed separately in writing for each engagement.",
      },
      {
        heading: "Status",
        body: "This document is pending legal review. Company registration details and governing law will be added once confirmed.",
      },
    ],
  },
  {
    slug: "cookies",
    label: "Legal",
    title: "COOKIE POLICY",
    intro: "What this site stores on your device.",
    sections: [
      {
        heading: "Strictly necessary",
        body: "This site does not set analytics, advertising or personalisation cookies. No consent banner is shown because there is nothing to consent to.",
      },
      {
        heading: "Third parties",
        body: "Font and icon assets are served by Google Fonts and cdnjs. Those providers may receive standard request data such as your IP address.",
      },
      {
        heading: "Status",
        body: "This statement will be re-confirmed at launch if analytics or any other non-essential script is added.",
      },
    ],
  },
  {
    slug: "legal",
    label: "Legal",
    title: "LEGAL NOTICE",
    intro: "Operator details for this website.",
    sections: [
      {
        heading: "Operator",
        body: `${company.legalName}. CIN ${company.registration.cin}. Registered address: ${company.contact.address}.`,
      },
      {
        heading: "Contact",
        body: `Contact email and telephone: ${company.contact.email} · ${company.contact.phone}. Registered address: ${company.contact.address}.`,
      },
      {
        heading: "Status",
        body: "Operator details above are published from verified company records. This notice is pending legal review.",
      },
    ],
  },
];

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) return {};
  return { title: doc.title.replace(/\b\w/g, (c) => c.toUpperCase()) };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero label={doc.label} title={doc.title} intro={doc.intro} />

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="space-y-8">
          {doc.sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 60}>
              <article className="rounded-[2rem] border border-gray-200 bg-white p-8">
                <SectionTitle className="text-2xl md:text-3xl">
                  {section.heading}
                </SectionTitle>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                  {section.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Contact Next360</ButtonLink>
            <ButtonLink href="/" variant="dark">
              Back to home
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
