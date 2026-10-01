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
  organicBlocks,
  organicDomains,
  photos,
  statusVocabulary,
  TBC,
} from "@/lib/site";

export const metadata = metadataFor("/organic");

export default function OrganicPage() {
  return (
    <>
      <PageHero
        label="Flagship Project"
        title={
          <>
            NEXT360
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              ORGANIC.
            </span>
          </>
        }
        intro="A verification-first marketplace focused on organic, natural and eco-friendly products, connecting consumers, farmers, producers, retailers and institutions through verification and traceability. It is how Next360 shows it does not merely provide technology services, it builds technology-driven businesses and products."
      >
        <div className="mt-8">
          <ButtonLink href="/contact">Discuss Next360 Organic</ButtonLink>
        </div>
      </PageHero>

      {/* Six-domain intersection: the one part of this page that is approved. */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10">
          <PhotoBand
            src={photos.market}
            alt="Illustrative photograph of a farmers' market stall with fresh vegetables."
            height="h-72 md:h-[32rem]"
          />
        </Reveal>

        <Reveal>
          <SectionLabel label="The Intersection" />
          <SectionTitle className="mt-2 max-w-2xl">
            One initiative, six connected domains.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            Next360 Organic is positioned at the point where these six domains
            meet. Each domain below is approved content; the detail behind each
            is pending client confirmation.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {organicDomains.map((domain, i) => (
            <Reveal key={domain} delay={i * 60}>
              <div className="flex h-full items-start gap-4 rounded-[2rem] border border-gray-200 bg-white p-7 transition hover:border-brand-accent">
                <span className="font-mono text-xs font-bold text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug">{domain}</h3>
                  <span className="mt-2 block h-1 w-8 rounded-full bg-brand-green" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The fourteen required content blocks, architecture section 6.5. */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Full Disclosure" />
          <SectionTitle className="mt-2 max-w-2xl">
            Everything this initiative will explain.
          </SectionTitle>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            Fourteen content blocks are specified for Next360 Organic. Blocks
            without supplied detail are marked as coming soon below. No
            metrics, users, revenue, market coverage or outcomes are stated
            until they are verified.
          </p>
        </Reveal>

        <ol className="mt-10 border-t border-gray-200">
          {organicBlocks.map((block, i) => (
            <Reveal key={block.no} delay={Math.min(i * 35, 280)} as="li">
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-b border-gray-200 py-5 transition-colors hover:bg-gray-50 md:grid-cols-[auto_minmax(0,18rem)_1fr] md:gap-x-8">
                <span className="font-mono text-xs font-bold text-gray-400">
                  {block.no}
                </span>
                <span className="text-base font-semibold">{block.title}</span>
                <span className="col-span-2 text-sm leading-relaxed text-gray-500 md:col-span-1">
                  {block.approved ? (
                    <>
                      <span className="font-medium text-gray-700">
                        {block.approved}
                      </span>
                      {block.detail !== TBC ? (
                        <span className="mt-1 block">
                          Detail:{" "}
                          <span className="font-semibold">{block.detail}</span>
                        </span>
                      ) : null}
                    </>
                  ) : block.detail !== TBC ? (
                    <span className="font-semibold text-gray-700">
                      {block.detail}
                    </span>
                  ) : (
                    <span className="italic">Details coming soon.</span>
                  )}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-8 rounded-[2rem] border border-dashed border-gray-300 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Status vocabulary
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {statusVocabulary.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-[13px] font-semibold text-gray-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Current status of Next360 Organic:{" "}
              <span className="font-semibold text-black">To be published</span>.
              Only the actual status will be published.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <PhotoBand
            src={photos.organic}
            alt="Illustrative photograph of fresh organic produce on display."
            height="h-64 md:h-96"
          />
        </Reveal>
      </section>

      <DarkSection>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel label="Positioning" tone="dark" />
            <SectionTitle tone="dark" className="mt-3 max-w-2xl">
              The proof that Next360 builds businesses, not just software.
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              Next360 Organic is never presented as an ordinary portfolio item.
              It is the flagship demonstration of technology combined with a
              real-world Agritech business ecosystem.
            </p>
          </Reveal>
          <Reveal delay={70}>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/projects">See the full portfolio</ButtonLink>
              <ButtonLink href="/agritech" variant="white">
                About the Agritech vertical
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </DarkSection>
    </>
  );
}
