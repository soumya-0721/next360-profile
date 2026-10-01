import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  PageHero,
  PhotoBand,
  SectionLabel,
  SectionTitle,
} from "@/components/ui";
import { metadataFor } from "@/lib/seo";
import { photos, projects, TBC } from "@/lib/site";

export const metadata = metadataFor("/projects");

/* The fields every project entry carries. Unconfirmed values are omitted. */
const fieldRows = (p: (typeof projects)[number]) =>
  [
    { label: "Category", value: p.category },
    { label: "Overview", value: p.overview },
    { label: "Purpose and problem", value: p.purpose },
    { label: "Solution", value: p.solution },
    {
      label: "Key capabilities",
      value: p.capabilities.length ? p.capabilities.join(", ") : "",
    },
    {
      label: "Technology",
      value: p.technology.length ? p.technology.join(", ") : "",
    },
    { label: "Next360's role", value: p.role },
    { label: "Current status", value: p.status },
  ].filter((row) => row.value && row.value !== TBC);

export default function ProjectsPage() {
  const [flagship, ...others] = projects;
  const confirmedCount = projects.filter((p) => p.confirmed).length;

  return (
    <>
      <PageHero
        label="Section 06"
        title={
          <>
            PROVEN
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              PROJECTS.
            </span>
          </>
        }
        intro={`${confirmedCount} proven projects and technology deployments, led by the Next360 Organic Marketplace flagship.`}
      />

      {/* Flagship gets its own treatment: never one card among many. */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10">
          <PhotoBand
            src={photos.organic}
            alt="Illustrative photograph of a fresh produce market."
            height="h-64 md:h-[28rem]"
          />
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white">
            <div className="border-b border-gray-100 bg-gray-50 px-8 py-4">
              <span className="rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-black">
                FLAGSHIP
              </span>
            </div>
            <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
              <div>
                <SectionLabel label="Project 01" />
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                  {flagship!.name}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {flagship!.overview} It demonstrates that Next360 builds
                  technology-driven businesses and products, not only
                  technology services.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <ButtonLink href="/organic">Open the flagship page</ButtonLink>
                  <ButtonLink href="/agritech" variant="dark">
                    Agritech vertical
                  </ButtonLink>
                </div>
              </div>
              <dl className="space-y-3 self-start rounded-[1.5rem] bg-gray-50 p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Category
                  </dt>
                  <dd className="text-right text-sm font-semibold">
                    {flagship!.category}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Role
                  </dt>
                  <dd className="text-right text-sm font-semibold">
                    {flagship!.role}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Status
                  </dt>
                  <dd className="text-right text-sm font-semibold">
                    {flagship!.status}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The remaining ten, each carrying the verified fields. */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Portfolio" />
          <SectionTitle className="mt-2 max-w-2xl">
            The wider project portfolio.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            Every entry carries the same fields. Anything not yet supplied or
            verified is left out rather than filled with an assumption.
          </p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {others.map((project, i) => (
            <Reveal key={project.slug} delay={i * 50}>
              <div
                className={`rounded-[2rem] border bg-white p-8 transition hover:border-brand-accent ${
                  project.confirmed
                    ? "border-gray-200"
                    : "border-dashed border-gray-300"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-400">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-3xl font-black tracking-tight">
                      {project.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[13px] font-semibold text-gray-600">
                    {project.confirmed ? project.category : "Awaiting detail"}
                  </span>
                </div>

                <dl className="mt-6 grid gap-x-8 gap-y-3 border-t border-gray-100 pt-6 sm:grid-cols-2">
                  {fieldRows(project).map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[9rem_1fr] items-baseline gap-3"
                    >
                      <dt className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {row.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-gray-700">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                {fieldRows(project).length === 0 ? (
                  <p className="mt-6 border-t border-gray-100 pt-6 text-sm leading-relaxed text-gray-500">
                    Details coming soon — published only once verified.
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div className="mt-8 rounded-[2rem] border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600">
              Case studies name the problem, Next360&apos;s contribution, the
              technology or service delivered, and a verified outcome. Clients
              and industries are disclosed only with permission.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Contribute a verified project</ButtonLink>
              <ButtonLink href="/capabilities" variant="dark">
                Review capabilities
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
