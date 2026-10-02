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
import { capabilityLists, photos } from "@/lib/site";

export const metadata = metadataFor("/it-services");

const itServices = capabilityLists[1]!;

/*
  The eleven IT Services capabilities are grouped into three delivery areas so
  the page explains how they work together instead of repeating a flat list.
  Grouping is editorial only; the underlying capability names are unchanged.
*/
const deliveryAreas = [
  {
    index: "01",
    title: "Software & Applications",
    icon: "fa-solid fa-code",
    items: [
      "Software development",
      "Web and mobile applications",
      "Backend engineering",
      "Enterprise software",
    ],
    note: "Product and platform engineering, from web and mobile front ends through backend services to enterprise-grade software.",
  },
  {
    index: "02",
    title: "Infrastructure & Operations",
    icon: "fa-solid fa-server",
    items: ["IT infrastructure", "Monitoring", "Asset management"],
    note: "The operational layer: infrastructure that stays watched, documented and accounted for.",
  },
  {
    index: "03",
    title: "Support & Managed Services",
    icon: "fa-solid fa-life-ring",
    items: [
      "User and endpoint support",
      "Service desk",
      "Managed technology services",
      "Technical projects",
    ],
    note: "Day-to-day technology responsibility, taken over as a managed capability rather than ad-hoc fixes.",
  },
];

export default function ItServicesPage() {
  return (
    <>
      <PageHero
        label="IT Services"
        title="IT SERVICES."
        intro="Software engineering, IT operations, support, infrastructure and managed technology services, delivered as an extension of your team. One delivery team behind the Business Technology, AI and Digital Infrastructure domains."
      >
        <div className="mt-8">
          <ButtonLink href="/contact">Discuss an IT requirement</ButtonLink>
        </div>
      </PageHero>

      {/* Full eleven-capability inventory. */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10 grid gap-6 md:grid-cols-2">
          <PhotoBand
            src={photos.support}
            alt="Illustrative photograph of a team collaborating around laptops."
            height="h-60 md:h-80"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <PhotoBand
            src={photos.code}
            alt="Illustrative photograph of source code on a screen."
            height="h-60 md:h-80"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </Reveal>

        <Reveal>
          <SectionLabel label="Capabilities" />
          <SectionTitle className="mt-2 max-w-2xl">
            Eleven capabilities, one accountable team.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            Each capability row publishes only once verified.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itServices.items.map((item, i) => (
            <Reveal key={item} delay={i * 40}>
              <div className="flex h-full items-center gap-4 rounded-[1.5rem] border border-gray-200 bg-white px-6 py-5 card-lift hover:border-brand-accent">
                <span className="font-mono text-xs font-bold text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-semibold leading-snug">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How those capabilities group into delivery areas. */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Delivery Areas" />
          <SectionTitle className="mt-2 max-w-2xl">
            Three ways we take responsibility.
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {deliveryAreas.map((area, i) => (
            <Reveal key={area.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[2rem] bg-gray-100 p-8 card-lift hover:bg-brand-accent">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <i className={`${area.icon} text-black`} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-500">
                    {area.index}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {area.note}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {area.items.map((item) => (
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

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <ImageCard
              href="/capabilities"
              src={photos.infrastructure}
              alt="Server infrastructure"
              title="Capabilities"
              description="All six domains in full, plus technology mapped to real work."
            />
          </Reveal>
          <Reveal delay={80}>
            <ImageCard
              href="/projects"
              src={photos.engineering}
              alt="Engineering workspace"
              title="Projects"
              description="Ten proven projects and deployments, led by Next360 Organic."
            />
          </Reveal>
        </div>
      </section>

      <DarkSection>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel label="Quality & Governance" tone="dark" />
            <SectionTitle tone="dark" className="mt-3 max-w-2xl">
              Operational discipline and controls.
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-gray-400">
              Quality, security and governance detail forms part eleven of the
              company profile. Controls and certifications are published only
              once verified — request documentation for what you need.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="white">
                Request documentation
              </ButtonLink>
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
