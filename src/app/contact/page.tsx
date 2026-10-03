import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { PageHero, PhotoBand, SectionLabel, SectionTitle } from "@/components/ui";
import { metadataFor } from "@/lib/seo";
import { company, photos } from "@/lib/site";

export const metadata = metadataFor("/contact");

const direct = [
  { label: "Email", value: company.contact.email },
  { label: "Phone", value: company.contact.phone },
  { label: "Website", value: company.contact.website },
  { label: "Address", value: company.contact.address },
  { label: "CIN", value: company.registration.cin },
  { label: "PAN", value: company.registration.pan },
  { label: "GSTIN", value: company.registration.gstin },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            LET&apos;S
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              TALK.
            </span>
          </>
        }
        intro="Request the company profile, scope a digital commerce, AI or infrastructure requirement, or start a partnership conversation."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal className="mb-10">
          <PhotoBand
            src={photos.planning}
            alt="Illustrative photograph of a planning meeting with notes and laptops."
            height="h-56 md:h-72"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-[2rem] bg-gray-100 p-8">
              <SectionLabel label="Direct" />
              <SectionTitle className="mt-3 text-2xl md:text-3xl">
                Reach us directly.
              </SectionTitle>

              <dl className="mt-6 space-y-5">
                {direct.map((row) => (
                  <div key={row.label}>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-gray-700">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 border-t border-gray-200 pt-5 text-[13px] leading-relaxed text-gray-500">
                Establishment year, IEC and Udyam registration will be
                published once verified.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
