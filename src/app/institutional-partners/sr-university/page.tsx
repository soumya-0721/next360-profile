import Image from "next/image";
import Link from "next/link";

import { LinkedInUpdate } from "@/components/linkedin-update";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  PageHero,
  SectionLabel,
  SectionTitle,
} from "@/components/ui";
import { metadataFor } from "@/lib/seo";
import { srUniversity } from "@/lib/site";

export const metadata = metadataFor("/institutional-partners/sr-university");

export default function SrUniversityPartnerPage() {
  return (
    <>
      <PageHero
        label="Institutional Partner"
        title={
          <>
            SR
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              UNIVERSITY.
            </span>
          </>
        }
        intro={srUniversity.overview}
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-8">
          <Link
            href="/#institutional-partner"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-black"
          >
            <span
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-0.5"
            >
              &#8592;
            </span>
            Back to Institutional Partners
          </Link>
        </Reveal>

        {/* A. Profile header card */}
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
            <div className="grid gap-8 p-8 md:grid-cols-[auto_1fr] md:items-center md:p-10">
              <div className="flex h-40 w-40 items-center justify-center rounded-[1.5rem] border border-gray-200 bg-white p-4">
                <Image
                  src={srUniversity.logo}
                  alt={`${srUniversity.name} logo`}
                  width={224}
                  height={224}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div>
                <span className="inline-flex items-center rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-black">
                  {srUniversity.category}
                </span>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                  {srUniversity.name}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
                  {srUniversity.overview}
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-gray-700">
                      {srUniversity.location}
                    </dd>
                  </div>
                  {srUniversity.website ? (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Website
                      </dt>
                      <dd className="mt-1 text-sm font-semibold">
                        <a
                          href={srUniversity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-green-ink underline-offset-4 hover:underline"
                        >
                          {srUniversity.website.replace(/^https?:\/\//, "")}
                          <span aria-hidden="true"> &#8599;</span>
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* B. About the Institutional Partnership */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="About the Institutional Partnership" />
          <SectionTitle className="mt-2">
            Next360 &times; SR University.
          </SectionTitle>
        </Reveal>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            {srUniversity.about ? (
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-600">
                {srUniversity.about}
              </p>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 p-8">
                <p className="text-sm font-bold text-gray-700">
                  Detailed description pending confirmation
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  The verified partnership description will be published here
                  once confirmed by Next360 and SR University.
                </p>
              </div>
            )}
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
              <Image
                src={srUniversity.image}
                alt="Next360 and SR University memorandum of understanding"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain p-3"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* C. LinkedIn Update */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="LinkedIn Update" />
          <SectionTitle className="mt-2">
            Partnership Announcement.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            The official announcement from Next360 India about the Memorandum of
            Understanding signed with SR University, Warangal.
          </p>
        </Reveal>
        <Reveal delay={80} className="mt-6">
          <LinkedInUpdate
            postUrl={srUniversity.linkedinPost}
            embedUrl={srUniversity.linkedinEmbed}
            logo={srUniversity.logo}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/#institutional-partner" variant="dark">
              Back to Institutional Partners
            </ButtonLink>
            <ButtonLink href="/contact">Contact Next360</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
