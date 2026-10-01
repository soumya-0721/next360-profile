import { CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type Footer30Props = {
  phone: string;
  phoneHref: string;
  email: string;
  navigateLinks: FooterLink[];
  ventureLinks: FooterLink[];
  legalLinks: FooterLink[];
  addressShort: string;
  cin: string;
  copyright: string;
};

/*
  Hand-built Footer-30 equivalent (shadcnblocks footer30 is Pro-gated and
  cannot be installed without an API key). Layout follows the block design:
  contact left (phone medium, email large display), Navigate + Ventures
  columns right, viewport-scaled giant brand, dark legal bar.

  No social column: Next360 has no verified social accounts (antislop
  R-17/R-38), so the block's "Social" slot renders verified venture links
  instead of invented handles.
*/
export default function Footer30({
  phone,
  phoneHref,
  email,
  navigateLinks,
  ventureLinks,
  legalLinks,
  addressShort,
  cin,
  copyright,
}: Footer30Props) {
  return (
    <footer aria-label="Site footer" className="bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* Contact */}
          <div>
            <a
              href={phoneHref}
              className="text-lg font-medium text-neutral-700 transition-colors hover:text-neutral-900"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="mt-3 block break-all text-3xl font-bold tracking-tight text-neutral-900 transition-colors hover:text-lime-700 sm:text-4xl"
            >
              {email}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              {addressShort} · CIN {cin}
            </p>
          </div>

          {/* Link columns */}
          <nav
            className="grid grid-cols-2 gap-8"
            aria-label="Footer"
          >
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Navigate
              </h2>
              <ul className="mt-4 space-y-3">
                {navigateLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-lg font-semibold text-neutral-900 transition-colors hover:text-lime-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Ventures
              </h2>
              <ul className="mt-4 space-y-3">
                {ventureLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-lg font-semibold text-neutral-900 transition-colors hover:text-lime-700"
                    >
                      {link.label}
                      <CircleArrowOutUpRight
                        className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-neutral-900"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Giant brand */}
        <p
          aria-hidden="true"
          className="mt-14 select-none text-center text-[13vw] font-black leading-none tracking-tighter text-neutral-900 md:text-[10vw]"
        >
          NEXT360
        </p>
      </div>

      {/* Dark legal bar */}
      <div className="bg-neutral-950 text-sm text-neutral-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-5 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <p>{copyright}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
