import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  DarkSection,
  ImageCard,
  PageHero,
  PhotoBand,
  SectionLabel,
  SectionTitle,
} from "@/components/ui";
import { metadataFor } from "@/lib/seo";
import { company, photos, technologyDomains, technologyMap } from "@/lib/site";

export const metadata = metadataFor("/capabilities");

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        label="Capabilities"
        title={
          <>
            WHAT WE CAN
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              DELIVER.
            </span>
          </>
        }
        intro="Six technology and business domains, plus technology published only where it connects to real projects and capabilities."
      />

      {/* Six domains, architecture-level capability groups. */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10">
          <PhotoBand
            src={photos.engineering}
            alt="Illustrative photograph of developers working together."
            height="h-60 md:h-80"
          />
        </Reveal>

        <Reveal>
          <SectionLabel label="Capability Groups" />
          <SectionTitle className="mt-2 max-w-2xl">
            Products and operations, under one roof.
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyDomains.map((group, i) => (
            <Reveal key={group.name} delay={i * 60}>
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-8 transition hover:border-brand-accent">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent">
                    <i className={`${group.icon} text-sm text-black`} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {group.index}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold">{group.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {group.summary}
                </p>
                <ul className="mt-5 space-y-2.5">
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
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-[2rem] bg-gray-100 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Vertical capability inventories
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
                Agritech and IT Services keep their own full capability
                inventories, verified row by row before anything publishes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/agritech" variant="dark">
                Agritech inventory
              </ButtonLink>
              <ButtonLink href="/it-services" variant="dark">
                IT Services inventory
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Technology folded in from the retired standalone route. */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Technology Capabilities" />
          <SectionTitle className="mt-2 max-w-2xl">
            Technology connected to real work.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            Each technology is published only once it is tied to an actual
            project or capability. There is no logo list here, because an
            unconnected stack claim is not a capability.
          </p>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] gap-4 border-b border-gray-100 bg-gray-50 px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 md:px-8">
              <span>Technology</span>
              <span>Connected project or capability</span>
              <span>Status</span>
            </div>
            <ul>
              {technologyMap.map((row) => (
                <li
                  key={row.tech}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-baseline gap-4 border-b border-gray-100 px-6 py-4 last:border-0 md:px-8"
                >
                  <span className="text-sm font-semibold">{row.tech}</span>
                  <span className="text-sm leading-relaxed text-gray-600">
                    {row.connection}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      row.verified
                        ? "bg-brand-accent text-black"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {row.verified ? "Verified" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-500">
            ManageEngine is listed as a candidate for monitoring, service desk
            and asset management. It stays pending until that usage is
            confirmed.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <ImageCard
              href="/organic"
              src={photos.organic}
              alt="Produce market"
              title="Next360 Organic"
              description="The flagship venture."
            />
          </Reveal>
          <Reveal delay={80}>
            <ImageCard
              href="/projects"
              src={photos.infrastructure}
              alt="Server infrastructure"
              title="Projects"
              description="Nine proven projects and deployments."
            />
          </Reveal>
        </div>
      </section>

      <DarkSection>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel label="Contact" tone="dark" />
            <SectionTitle tone="dark" className="mt-3 max-w-2xl">
              Scope a requirement with us.
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              {company.tagline}
            </p>
          </Reveal>
          <Reveal delay={70}>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Start an enquiry</ButtonLink>
              <ButtonLink href="/about" variant="outline">
                Read the profile
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </DarkSection>
    </>
  );
}
