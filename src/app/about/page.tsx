import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  DarkSection,
  PageHero,
  PhotoBand,
  SectionLabel,
  SectionTitle,
} from "@/components/ui";
import { metadataFor } from "@/lib/seo";
import {
  company,
  companySnapshot,
  corporateStructure,
  deliverySteps,
  photos,
  profileArchitecture,
  technologyDomains,
} from "@/lib/site";

export const metadata = metadataFor("/about");

/* Single source of truth: company facts come from site.ts, never restated here. */
const facts = [
  { label: "Extended network", value: company.team.extended },
  { label: "Developers", value: company.team.developers },
  { label: "Technology domains", value: String(technologyDomains.length) },
  ...(company.established
    ? [{ label: "Established", value: company.established }]
    : []),
];

/* Where each domain leads. Only routes that actually exist are linked. */
const domainHref: Record<string, string> = {
  "Digital Commerce": "/organic",
  "Business Technology": "/it-services",
  "AI & Computer Vision": "/capabilities",
  "Digital Infrastructure": "/capabilities",
  "Digital Advertising": "/capabilities",
  "Digital Growth": "/capabilities",
};

const narrativeHierarchy = [
  "Next360",
  "Six technology and business domains",
  "Next360 Organic Marketplace (flagship)",
  "Proven projects and deployments",
  "SLICK Technologies",
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Executive Overview"
        title={
          <>
            A TECHNOLOGY
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              COMPANY, PROFILED.
            </span>
          </>
        }
        intro={company.positioning}
      >
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/20 pt-8">
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className="font-mono text-2xl font-black text-white">
                {fact.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-accent">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel label="The Company Story" />
            <SectionTitle className="mt-2 max-w-xl">
              Establishment, journey
              <br />
              and milestones.
            </SectionTitle>
          </Reveal>
          <Reveal delay={60}>
            <ButtonLink href="/contact" variant="dark">
              Request the full profile
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={40}>
          <PhotoBand
            src={photos.teamWork}
            alt="Illustrative photograph of colleagues collaborating at a laptop."
            className="mt-10"
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-[2rem] border border-gray-200 bg-gray-100 p-8 sm:p-10">
            <p className="max-w-3xl text-sm leading-relaxed text-gray-500">
              Verified items today are {technologyDomains.length} technology and
              business domains, the flagship Next360 Organic Marketplace, a
                portfolio of ten proven projects and deployments, the Slick
                Technologies sub-company, and an extended network of{" "}
              {company.team.extended} professionals including{" "}
              {company.team.developers} developers. Everything else publishes
              only once approved against the source supplied for the profile.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-gray-200 bg-white p-7">
              <SectionLabel label="Our Vision" />
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                {company.vision}
              </p>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div className="h-full rounded-[2rem] border border-gray-200 bg-white p-7">
              <SectionLabel label="Our Mission" />
              <p className="mt-4 text-base leading-relaxed text-gray-700">
                {company.mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="h-full rounded-[2rem] bg-brand-dark-green p-7 text-white">
              <SectionLabel label="Our Philosophy" tone="dark" />
              <p className="mt-4 text-base font-semibold leading-relaxed">
                {company.philosophy}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="verticals" className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Business Verticals" />
          <SectionTitle className="mt-2">
            Six domains, one
            <br />
            delivery organisation.
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyDomains.map((domain, i) => (
            <Reveal key={domain.name} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-7 transition hover:border-brand-accent">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Domain {domain.index}
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    {domainHref[domain.name]}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{domain.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {domain.summary}
                </p>
                <ul className="mt-5 space-y-2">
                  {domain.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-gray-600"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={domainHref[domain.name]!}
                  className="mt-auto pt-5 text-sm font-bold hover:text-brand-green-ink"
                >
                  Open -&gt;
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Corporate structure: the domain tree from the source of truth. */}
      <section id="structure" className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Corporate Structure" />
          <SectionTitle className="mt-2">
            One organisation,
            <br />
            six branches.
          </SectionTitle>
          <div className="mt-6 rounded-3xl border border-gray-200 bg-gray-50 px-6 py-4">
            <p className="font-mono text-sm font-semibold text-gray-700">
              {corporateStructure.root}: {corporateStructure.rootNote}
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {corporateStructure.branches.map((branch, i) => (
            <Reveal key={branch.name} delay={i * 60}>
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-7">
                <span className="font-mono text-xs font-bold text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold">{branch.name}</h3>
                {branch.note ? (
                  <p className="mt-2 text-sm font-semibold text-brand-green-ink">
                    {branch.note}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-1.5">
                  {branch.children.map((child) => (
                    <li
                      key={child.name}
                      className="text-sm leading-relaxed text-gray-600"
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-6 rounded-[2rem] bg-gray-100 p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Narrative hierarchy
            </p>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {narrativeHierarchy.map((step, i) => (
                <li
                  key={step}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm font-semibold leading-snug">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <DarkSection id="methodology">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel label="Our Execution Model" tone="dark" />
            <SectionTitle tone="dark" className="mt-3 max-w-2xl">
              Identify, build, deploy, measure.
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              {company.approach}. We do not build technology simply for
              demonstrations.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deliverySteps.map((step, i) => (
              <Reveal key={step.no} delay={i * 70} as="li">
                <div className="h-full overflow-hidden rounded-3xl border border-gray-800 bg-[#111] transition hover:border-brand-accent">
                  <div className="relative h-36">
                    <Image
                      src={step.image}
                      alt={`Illustrative photograph representing the ${step.title} phase.`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover opacity-75"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-7 pt-5">
                    <span className="font-mono text-xs font-bold text-brand-accent">
                      {step.no}
                    </span>
                    <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {step.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </DarkSection>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionLabel label="Corporate Profile" />
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionTitle className="max-w-xl">
              The full company profile, in thirteen parts.
            </SectionTitle>
            <ButtonLink href="/contact" variant="dark">
              Request the document
            </ButtonLink>
          </div>
        </Reveal>

        <ol className="mt-10 border-t border-gray-200">
          {profileArchitecture.map((part, i) => (
            <Reveal key={part.no} delay={Math.min(i * 35, 280)} as="li">
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-gray-200 py-4 transition-colors hover:bg-gray-50 sm:grid-cols-[auto_minmax(0,16rem)_1fr] sm:gap-x-8">
                <span className="font-mono text-xs font-bold text-gray-400">
                  {part.no}
                </span>
                <span className="text-base font-semibold">{part.title}</span>
                <span className="col-span-2 text-sm leading-relaxed text-gray-500 sm:col-span-1">
                  {part.note}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Company snapshot: the owner's table, rendered as a definition list. */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Company Snapshot" />
          <SectionTitle className="mt-3 max-w-2xl">
            The essentials, in one table.
          </SectionTitle>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
            <dl>
              {companySnapshot.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid gap-1 px-6 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6 sm:px-8 ${
                    i % 2 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {row.label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-gray-800">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-black px-8 py-16 text-center text-white sm:px-14">
            <SectionLabel label="Contact" tone="dark" className="justify-center" />
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Request the full Next360 company profile.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-400">
              The master profile is available as a document for proposals,
              tenders and partnership review.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Contact Next360</ButtonLink>
              <ButtonLink href="/capabilities" variant="outline">
                Review Capabilities
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
