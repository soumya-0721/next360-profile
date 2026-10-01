import Footer30 from "@/components/ui/footer-30";
import { company, footerColumns, legalRoutes } from "@/lib/site";

const year = new Date().getFullYear();
const telHref = `tel:${company.contact.phone.replace(/[^+\d]/g, "")}`;

/*
  Site footer. Renders the Footer-30 layout (hand-built equivalent of the
  Pro-gated shadcnblocks footer30) with verified Next360 facts only
  (site.ts is the single source of truth):
  - Navigate: core page routes; Ventures: footerColumns[1] (all verified).
  - No social column: Next360 has no verified social accounts (R-17/R-38).
  - Contact block carries the verified phone, email, address and CIN.
*/
export function Footer() {
  const ventures =
    footerColumns.find((col) => col.title === "Ventures")?.links ?? [];

  return (
    <Footer30
      phone={company.contact.phone}
      phoneHref={telHref}
      email={company.contact.email}
      navigateLinks={[
        { label: "About Next360", href: "/about" },
        { label: "Next360 Organic", href: "/organic" },
        { label: "Projects", href: "/projects" },
        { label: "Capabilities", href: "/capabilities" },
        { label: "Contact", href: "/contact" },
      ]}
      ventureLinks={[...ventures]}
      legalLinks={[...legalRoutes]}
      addressShort={company.contact.addressShort}
      cin={company.registration.cin}
      copyright={`© ${year} ${company.legalName}. All rights reserved.`}
    />
  );
}
