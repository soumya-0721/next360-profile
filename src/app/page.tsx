import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  DarkSection,
  PhotoBand,
  SectionLabel,
  SectionTitle,
} from "@/components/ui";
import { metadataFor } from "@/lib/seo";
import {
  capabilityLists,
  collaborators,
  collaboratorNote,
  company,
  mentorship,
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
const heroStats = [
  { value: "06", label: "Technology Domains" },
  { value: company.team.developers, label: "Developers" },
  { value: "09", label: "Proven Projects" },
] as const;

/*
  Projects 01 to 04 of the owner's list, shown here as the preview. Organic
  leads the page above as flagship, so it is deliberately not repeated.
*/
const previewProjects = projects
  .filter((project) => project.confirmed && !project.flagship)
  .slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* 1 + 2: identity and what Next360 does */}
      <section
        id="home"
        className="relative flex h-screen min-h-[800px] items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={photos.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20">
          <Reveal className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2 pr-4 shadow-lg backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-brand-dark">
                360
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Digital Commerce + AI + Infrastructure
              </span>
            </div>

            <h1 className="mb-6 text-6xl font-black leading-[0.9] tracking-tighter text-white drop-shadow-xl lg:text-8xl">
              BUILDING
              <br />
              <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
                TECHNOLOGY.
              </span>
            </h1>

            <p className="mb-4 max-w-xl text-xl font-bold leading-relaxed text-white drop-shadow-md">
              {company.tagline}
            </p>
            <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-gray-200 drop-shadow-md">
              {company.heroLede}
            </p>

            <div className="mb-16 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/organic">See the flagship project</ButtonLink>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              >
                <i
                  className="fa-solid fa-folder-open text-lg text-brand-accent"
                  aria-hidden="true"
                />
                Request Company Profile
              </Link>
            </div>

            <div className="inline-flex flex-wrap items-center gap-8 border-t border-white/20 pt-8">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-3xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

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
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-7 transition hover:border-brand-accent">
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
                <ul className="mt-4 space-y-2">
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

              <h2 className="mt-6 text-5xl font-black leading-[0.9] tracking-tighter md:text-7xl">
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
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-white hover:text-black"
                >
                  See all proven projects
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The flagship gets the page's largest paired visuals. */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <PhotoBand
              src={photos.market}
              alt="Illustrative photograph of a market stall selling fresh vegetables."
              height="h-60 md:h-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={90}>
            <PhotoBand
              src={photos.produce}
              alt="Illustrative photograph of fresh tomatoes and produce in baskets."
              height="h-60 md:h-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
        </div>
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
              <div className="flex h-full min-h-[16rem] flex-col justify-between rounded-[2rem] border border-gray-200 bg-white p-7 transition hover:border-brand-accent">
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
            <SectionLabel label="Product Ecosystem" />
            <SectionTitle className="mt-2">
              SLICK Technologies,
              <br />
              Our Own Products.
            </SectionTitle>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
              {slickDescriptor} It exists to demonstrate Next360&apos;s own
              software-product and innovation capability.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <ButtonLink href="/slick" variant="dark">
              Explore the ecosystem
            </ButtonLink>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slickProducts.map((product, i) => (
            <Reveal key={product.name} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[2rem] bg-gray-100 p-7 transition hover:bg-brand-accent">
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
      </section>

      {/* 7b: mentorship and strategic collaborators. */}
      <section id="partners" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-8">
              <SectionLabel label="Mentorship & Guidance" />
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Next360 benefits from guidance and mentorship from experienced
                technology, business and startup professionals.
              </p>
              <ul className="mt-6 space-y-5">
                {mentorship.map((entry) => (
                  <li key={entry.name} className="border-t border-gray-100 pt-5">
                    <h3 className="text-lg font-bold">{entry.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {entry.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="flex h-full flex-col rounded-[2rem] bg-gray-100 p-8">
              <SectionLabel label="Strategic Collaborators" />
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Next360 works with strategic collaborators and service partners
                across technology, AI, sales and marketing.
              </p>
              <ul className="mt-6 space-y-5">
                {collaborators.map((entry) => (
                  <li key={entry.name} className="border-t border-gray-200 pt-5">
                    <h3 className="text-lg font-bold">{entry.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {entry.note}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm leading-relaxed text-gray-600">
                {collaboratorNote}
              </p>
            </div>
          </Reveal>
        </div>
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
              <p className="mt-6 text-[13px] text-gray-500">
                Individual names, roles and photographs:{" "}
                <span className="font-semibold text-black">
                  [TO BE CONFIRMED]
                </span>
              </p>
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
