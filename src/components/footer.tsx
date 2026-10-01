"use client";

import DitheredFooter from "@/components/ui/dithered-footer";
import { company, footerColumns, legalRoutes } from "@/lib/site";

const year = new Date().getFullYear();
const telHref = `tel:${company.contact.phone.replace(/[^+\d]/g, "")}`;

/*
  Site footer. Renders the shared DitheredFooter with verified Next360 facts
  only (site.ts is the single source of truth):
  - columns: the first three footerColumns (Company, Ventures, Support);
    legal links travel via the `legal` prop so every route stays reachable.
  - socials: intentionally empty. Next360 has no verified social accounts and
    the component defaults would link to generic homepages (R-17/R-38).
  - status: null. No status page exists; nothing invented.
  - newsletter: posts to the real POST /api/contact endpoint, which validates
    and confirms receipt. Failures reject so the form shows its error state.
*/
async function subscribe(email: string) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Footer subscriber",
      email,
      topic: "newsletter",
      message: "Please send me product updates by email.",
    }),
  });
  const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!res.ok || !body?.ok) throw new Error("subscribe failed");
}

export function Footer() {
  return (
    <>
      {/* Verified contact truth. Slim dark strip bridges the site theme into
          the light footer and keeps email/phone/address one tap away. */}
      <div className="bg-brand-dark text-[13px] text-neutral-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:px-8">
          <a
            href={`mailto:${company.contact.email}`}
            className="transition-colors hover:text-brand-accent"
          >
            {company.contact.email}
          </a>
          <a href={telHref} className="transition-colors hover:text-brand-accent">
            {company.contact.phone}
          </a>
          <span className="text-neutral-400">
            {company.contact.addressShort} · CIN {company.registration.cin}
          </span>
        </div>
      </div>

      <DitheredFooter
        brand="NEXT360"
        brandHref="/"
        tagline={`${company.descriptor}. ${company.tagline}`}
        columns={[...footerColumns.slice(0, 3)]}
        socials={[]}
        legal={[...legalRoutes]}
        copyright={`© ${year} ${company.legalName}. All rights reserved.`}
        status={null}
        accent="#65a30d"
        onSubscribe={subscribe}
      />
    </>
  );
}
