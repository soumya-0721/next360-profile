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
import { photos, slickDescriptor, slickProducts } from "@/lib/site";

export const metadata = metadataFor("/slick");

export default function SlickPage() {
  return (
    <>
      <PageHero
        label="Sub-company"
        title={
          <>
            SLICK
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              TECHNOLOGIES.
            </span>
          </>
        }
        intro={slickDescriptor}
      />

      {/* Ownership is stated once, plainly, so the structure never reads wrong. */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10">
          <PhotoBand
            src={photos.code}
            alt="Illustrative photograph of source code on a screen."
            height="h-60 md:h-80"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-gray-100 p-8">
              <SectionLabel label="What it is" />
              <p className="mt-4 text-lg font-bold leading-snug">
                {slickDescriptor}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                SLICK Technologies is a Next360 sub-company building its own
                products: SlickCode, Let&apos;s Connect, SlickSEO, Slixo and
                Organize.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-[2rem] border border-gray-200 bg-white p-8">
              <SectionLabel label="Where it sits" />
              <p className="mt-4 text-lg font-bold leading-snug">
                A sub-company of Next360, sitting alongside the six technology
                domains.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                SLICK Technologies is part of the corporate structure shown on
                the About page: Next360, then its six technology and business
                domains, then the SLICK Technologies sub-company with its five
                products.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Five products, each carrying its own positioning rule. */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <Reveal>
          <SectionLabel label="Products" />
          <SectionTitle className="mt-2 max-w-2xl">
            Five products, one company.
          </SectionTitle>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {slickProducts.map((product, i) => (
            <Reveal key={product.name} delay={i * 70}>
              <div className="flex h-full flex-col rounded-[2rem] border border-gray-200 bg-white p-8 transition hover:border-brand-accent">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent">
                    <i className="fa-solid fa-cube text-sm text-black" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold">{product.name}</h3>

                {product.positioning ? (
                  <p className="mt-1 text-sm font-semibold text-brand-green-ink">
                    {product.positioning}
                  </p>
                ) : null}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {product.scope.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[13px] font-semibold text-gray-600"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm leading-relaxed text-gray-600">
                  {product.rule}
                </p>

                <p className="mt-auto pt-5 text-[13px] text-gray-500">
                  Status:{" "}
                  <span className="font-semibold text-black">{product.status}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-gray-500">
            Functionality is published only once verified, so the website, the
            company profile and future proposals never disagree about what
            these products do.
          </p>
        </Reveal>
      </section>

      <DarkSection>
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionLabel label="Capability" tone="dark" />
            <SectionTitle tone="dark" className="mt-3 max-w-2xl">
              Own products, real engineering.
            </SectionTitle>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400">
              The same team that builds the six technology domains and the
              proven project portfolio builds Slick Technologies&apos;
              products.
            </p>
          </Reveal>
          <Reveal delay={70}>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact">Talk to us about a product</ButtonLink>
              <ButtonLink href="/capabilities" variant="white">
                Review capabilities
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </DarkSection>
    </>
  );
}
