import Image from "next/image";
import Link from "next/link";

import {
  MentorPanels,
  PartnerLogos,
} from "@/components/mentors";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  DarkSection,
  PhotoBand,
  SectionLabel,
  SectionTitle,
} from "@/components/ui";
import HeroSection from "@/components/ui/hero-01-utils/hero";
import { metadataFor } from "@/lib/seo";
import {
  capabilityLists,
  collaboratorNote,
  company,
  organicDomains,
  photos,
  projects,
  slickDescriptor,
  slickProducts,
  technologyDomains,
  teamCapabilityAreas,
} from "@/lib/site";

export const metadata = metadataFor("/");

/*
  Homepage order follows the approved priority list:
  1 identity, 2 what Next360 does, 3 the six technology domains, 4 Next360
  Organic with the strongest project emphasis, 5 proven projects, 6 SLICK
  Technologies, 7 capability inventories, 7b mentorship and collaborators,
  8 team, 9 contact.
*/
/*
  Projects 01 to 04 of the owner's list, shown here as the preview. Organic
  leads the page above as flagship, so it is deliberately not repeated.
*/
const previewProjects = projects
  .filter((project) => project.confirmed && !project.flagship)
  .slice(0, 4);

/*
  Domain name -> the projects that prove it. Built from project.domains so the
  proof can never drift from the portfolio, and the cards stop restating their
  own summary.
*/
const proofByDomain: Record<string, string[]> = {};
const projectName: Record<string, string> = {};
for (const project of projects) {
  if (!project.confirmed) continue;
  projectName[project.slug] = project.name;
  for (const domain of project.domains) {
    (proofByDomain[domain] ??= []).push(project.slug);
  }
}
const proof: Record<string, string[]> = proofByDomain;

export default function HomePage() {
  return (
    <>
      {/* 1 + 2: hero-01 — keeps the existing /images/hero-farm.jpg
          background, Next360 copy from site.ts, Unsplash avatar stack,
          and lucide-icon domain strip. Global Header comes from layout. */}
      <HeroSection
        avatarList={[
          {
            image:
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&q=80&auto=format&fit=crop",
            name: "Network member",
          },
          {
            image:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&q=80&auto=format&fit=crop",
            name: "Network member",
          },
          {
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80&auto=format&fit=crop",
            name: "Network member",
          },
          {
            image:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&q=80&auto=format&fit=crop",
            name: "Network member",
          },
        ]}
      />

      {/* 3: the six technology and business domains. */}
      <section id="verticals" className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <SectionLabel label="Our Technology & Business Verticals" />
          <SectionTitle className="mt-2">
            Six Domains,
            <br />
            One Delivery Team.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            {company.positioning}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyDomains.map((domain, i) => (
            <Reveal key={domain.name} delay={i * 60}>
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-7 card-lift hover:border-brand-accent">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-accent">
                    <i className={`${domain.icon} text-sm text-black`} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {domain.index}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold">{domain.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {domain.summary}
                </p>
                {/*
                  Proof, not a restated summary. Each domain lists the shipped
                  work that proves it, so the card carries evidence instead of
                  repeating the sentence above in bullet form.
                */}
                <div className="mt-auto pt-6">
                  {(() => {
                    const slugs = proof[domain.name] ?? [];
                    if (slugs.length === 0) {
                      return (
                        <>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Deployments
                          </p>
                          <p className="mt-2 text-[13px] leading-snug text-gray-400">
                            No deployments published in this domain yet.
                          </p>
                        </>
                      );
                    }
                    return (
                      <>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                          Proven by
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {slugs.map((slug) => (
                            <li key={slug}>
                              <Link
                                href="/projects"
                                className="group/proof inline-flex items-start gap-2 text-[13px] font-semibold leading-snug text-gray-700 hover:text-black"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-green"
                                />
                                {projectName[slug]}
                                <span
                                  aria-hidden="true"
                                  className="transition-transform group-hover/proof:translate-x-0.5"
                                >
                                  &rarr;
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    );
                  })()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4: NEXT360 ORGANIC. Strongest project emphasis on the page. */}
      <section id="organic" className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-black text-white">
            <div className="absolute inset-0">
              <Image
                src={photos.organic}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1152px"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            </div>

            <div className="relative z-10 p-8 md:p-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-1.5 text-xs font-bold uppercase text-black">
                Flagship venture
              </span>

              <h2 className="mt-6 text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl md:text-7xl">
                NEXT360
                <br />
                <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
                  ORGANIC.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
                A verification-first marketplace focused on organic, natural and
                eco-friendly products, connecting consumers, farmers,
                producers, retailers and institutions through verification,
                traceability and trusted commerce. It shows that Next360 does
                not merely provide technology services, it builds
                technology-driven businesses and products.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {organicDomains.map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md"
                  >
                    {domain}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/organic">Open the flagship page</ButtonLink>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-sm font-bold tracking-wide text-white transition duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-white hover:text-black active:translate-y-0"
                >
                  See all proven projects
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        </section>

      {/* 5: proven projects, given full size */}
      <section id="projects" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel label="Proven Projects & Deployments" />
            <SectionTitle className="mt-2">
              Built, Deployed,
              <br />
              In Real Environments.
            </SectionTitle>
          </Reveal>
          <Reveal delay={60}>
            <ButtonLink href="/projects" variant="dark">
              Open the portfolio
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previewProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 70}>
              <div className="flex h-full min-h-[16rem] flex-col justify-between rounded-[2rem] border border-gray-200 bg-white p-7 card-lift hover:border-brand-accent">
                <span className="font-mono text-xs font-bold text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {project.category}
                  </p>
                  <p className="mt-4 line-clamp-4 text-[13px] leading-relaxed text-gray-400">
                    {project.overview}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 6: SLICK Technologies, full size */}
      <section id="slick" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel label="Sub-company" />
            <SectionTitle className="mt-2">
              SLICK Technologies,
              <br />
              Our Sub-Company.
            </SectionTitle>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
              {slickDescriptor} Its products show Next360&apos;s own
              software-product and innovation capability.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ButtonLink href="/slick" variant="dark">
              Explore SLICK Technologies
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slickProducts.map((product, i) => (
            <Reveal key={product.name} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[2rem] bg-gray-100 p-7 card-lift hover:bg-brand-accent">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                  <i className="fa-solid fa-cube text-sm text-black" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">{product.name}</h3>
                {product.positioning ? (
                  <p className="mt-1 text-sm font-semibold text-brand-green-ink">
                    {product.positioning}
                  </p>
                ) : null}
                <ul className="mt-4 space-y-2">
                  {product.scope.slice(0, 3).map((item) => (
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
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7: capability inventories, full size */}
      <section id="capabilities" className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Capabilities" />
          <SectionTitle className="mt-2">
            Products And Operations,
            <br />
            Under One Roof.
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {capabilityLists.map((group, i) => (
            <Reveal key={group.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent">
                    <i className={`${group.icon} text-sm text-black`} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {group.index}
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-black tracking-tight">
                  {group.title}
                </h3>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {group.items.map((item) => (
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
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-6 rounded-[2rem] bg-gray-100 p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Technology capabilities
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
              Technology is published only where it connects to a real project
              or capability. There is no logo list here, because an unconnected
              stack claim is not a capability.
            </p>
            <div className="mt-5">
              <ButtonLink href="/capabilities" variant="dark">
                See technology mapped to work
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        {/* Leadership - CEO and CTO */}
        <Reveal delay={180}>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white overflow-hidden">
              <div className="relative w-full h-80 bg-gray-100">
                <Image
                  src="/images/leadership/ceo-samhith.jpg"
                  alt="Portrait of Samhith Reddy Sangam"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col p-7">
                <h3 className="text-xl font-bold leading-tight">Samhith Reddy Sangam</h3>
                <p className="mt-1 text-sm font-semibold text-brand-green-ink">Chief Executive Officer</p>
              </div>
            </div>
            <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white overflow-hidden">
              <div className="relative w-full h-80 bg-gray-100">
                <Image
                  src="/images/leadership/cto-shivaganesh.jpg"
                  alt="Portrait of Shivaganesh Gajavelli"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col p-7">
                <h3 className="text-xl font-bold leading-tight">Shivaganesh Gajavelli</h3>
                <p className="mt-1 text-sm font-semibold text-brand-green-ink">Co-Founder & Chief Technology Officer</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Co-Founder and Chief Technology Officer at Next360, leading the technology vision, product development, and engineering team. Drives the team from idea to execution, building practical digital solutions across commerce, healthcare, business, and infrastructure. Focused on building strong teams, scalable technology, and products that solve real-world problems and support Next360’s long-term growth.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7b: mentorship panels and partner logos. */}
      <section id="partners" className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal className="mb-8">
          <MentorPanels />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-2">
            <SectionLabel label="Strategic Collaborators" />
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
              {collaboratorNote}
            </p>
            <PartnerLogos />
          </div>
        </Reveal>
      </section>

      {/* 8: team */}
      <section id="team" className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal className="mb-6">
          <PhotoBand
            src={photos.team}
            alt="Illustrative photograph of a team working together at a desk."
            height="h-56 md:h-72"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="h-full rounded-[2rem] border border-gray-200 bg-white p-8">
              <SectionLabel label="Our Team" />
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Next360 operates with an extended network of{" "}
                {company.team.extended} professionals, combining the internal
                team with specialists from our collaborating partners. Role
                titles and photographs are not published until confirmed.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {teamCapabilityAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[13px] font-semibold text-gray-600"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="relative flex h-full min-h-[16rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-brand-dark-green p-8 text-white">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[20px] border-brand-dark-green-ring opacity-50" />
              <div className="absolute -left-10 top-20 h-32 w-32 rounded-full border-[10px] border-brand-dark-green-ring opacity-30" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold">
                  Extended
                  <br />
                  Network
                </h3>
              </div>
              <div className="relative z-10">
                <div className="text-6xl font-bold">
                  {company.team.extended}
                  <span className="text-brand-green"> people</span>
                </div>
                <dl className="mt-4 space-y-1 text-xs font-medium text-green-200">
                  <div className="flex justify-between gap-3">
                    <dt>Developers</dt>
                    <dd className="font-bold text-white">
                      {company.team.developers}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Interns</dt>
                    <dd className="font-bold text-white">
                      {company.team.interns}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9: contact */}
      <DarkSection>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <SectionLabel label="Contact" tone="dark" className="justify-center" />
            <SectionTitle tone="dark" align="center">
              Let&apos;s Talk About It.
            </SectionTitle>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Request the full company profile, scope a digital commerce, AI or
              infrastructure requirement, or start a partnership conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Contact Next360</ButtonLink>
              <ButtonLink href="/about" variant="white">
                Read the profile
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </DarkSection>
    </>
  );
}
