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
import { capabilityLists, photos, verticals } from "@/lib/site";

export const metadata = metadataFor("/agritech");

const agritech = capabilityLists[0]!;

export default function AgritechPage() {
  return (
    <>
      <PageHero
        label="Agritech"
        title="AGRITECH."
        intro={verticals[0]!.summary}
      >
        <div className="mt-8">
          <ButtonLink href="/organic">Open Next360 Organic</ButtonLink>
        </div>
      </PageHero>

      {/* Flagship belongs to this vertical and leads it. */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10">
          <PhotoBand
            src={photos.haybales}
            alt="Illustrative photograph of a harvested field with hay bales."
          />
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-gray-50 px-8 py-4">
              <span className="rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-black">
                FLAGSHIP INITIATIVE
              </span>
            </div>
            <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                  Next360 Organic
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Next360&apos;s flagship Agritech initiative, connecting
                  agriculture, organic products, digital commerce, technology,
                  operations and customer experience. It leads this vertical
                  rather than sitting among the portfolio items.
                </p>
              </div>
              <ButtonLink href="/organic" className="shrink-0">
                Read the flagship page
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Capabilities" />
          <SectionTitle className="mt-2 max-w-2xl">
            Products, platforms and solutions for the field.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            Capability verification:{" "}
            <span className="font-semibold text-black">
              {agritech.verification}
            </span>
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agritech.items.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <div className="flex h-full items-start gap-4 rounded-[2rem] bg-gray-100 p-7 transition hover:bg-brand-accent">
                <span className="font-mono text-xs font-bold text-gray-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{item}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <ImageCard
              href="/projects"
              src={photos.field}
              alt="Agricultural land"
              title="Selected Projects"
              description="Eight proven projects and deployments, led by Next360 Organic."
            />
          </Reveal>
          <Reveal delay={80}>
            <ImageCard
              href="/capabilities"
              src={photos.engineering}
              alt="Engineering workspace"
              title="Capabilities"
              description="Technology connected to real projects and capabilities."
            />
          </Reveal>
        </div>
      </section>

      <DarkSection>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel label="Projects" tone="dark" />
            <SectionTitle tone="dark" className="mt-3 max-w-2xl">
              Agritech case studies, once verified.
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-gray-400">
              Case studies identify the problem, Next360&apos;s contribution,
              the technology delivered and the verified outcome. No project is
              listed before those four facts are confirmed.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 rounded-3xl border border-dashed border-gray-700 bg-[#111] p-8 text-center">
              <p className="text-lg font-bold">Agritech deployments</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                [TO BE CONFIRMED]: Agritech projects and deployments, client to
                provide
              </p>
              <div className="mt-6 flex justify-center">
                <ButtonLink href="/projects" variant="white">
                  View Projects
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </DarkSection>
    </>
  );
}
