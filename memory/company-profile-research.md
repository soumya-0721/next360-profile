# Company Profile Website: Research Memory

Status: RESEARCH DONE. FRD received and stored. UI/UX prompt still incoming.
Stack (locked): Next.js + Tailwind CSS + TypeScript.
Companion file: `memory/next360-frd.md` (client source of truth for Next360).

Sources: Awwwards business/corporate category, Tonjoo company profile component
breakdown, UXPin corporate design examples, Contentsquare/Artversion web best
practices, TrustMary/US Chamber trust-signal guides, antislop + antislop-ui skills.

---

## 1. What a company profile site actually is

A professional site that lets a visitor understand, fast: who the company is,
what it sells, and whether it is safe to do business with. The visitor is not
one person. It can be a prospective client, an investor, a partner, a supplier,
or a job seeker. Each of them is scanning for a different proof point before
they commit to contact.

The site is a deciding factor, not a brochure. If a known partner or result is
real and is not on the site, the prospect hesitates.

## 2. The canonical section anatomy

Research converges on the same skeleton. Header, content, footer are the three
mandatory shells. Inside content, the recurring components are:

1. Header / nav. Logo, nav links, one primary action button (contact, get a
   quote, login). Optional: dropdown, search, social icons, language selector.
2. Hero. The first impression. Core message plus one clear CTA. Can carry
   product media, a reel, or the strongest single proof point.
3. Partner / client logo strip. Only real, recognizable partners. Never
   fabricated. Placement can move above or below services depending on what the
   company is proudest of.
4. Services / products. What you actually sell. Image or icon, short
   description, optional drill-down link per item.
5. Key benefits / value props. Why you and not the competitor. Bullets:
   quality, support, experience, pricing, process.
6. Pricing (only if the company prices publicly). Helps decisive buyers skip a
   call.
7. Client reviews / testimonials. Real names, real roles, real quotes. No
   testimonials section at all if none exist.
8. Final CTA. One obvious action before the footer.
9. Footer. Contact details, address or map, social, privacy policy, copyright.

Not every company needs every component. Structure follows the actual content,
not the template.

## 3. Trust signals (the part most sites get wrong)

Trust is built from verifiable specifics, not adjectives. Research points to:

- Clear, plain explanation of what you do (no jargon wall).
- Real contact info: physical address, working phone, real email.
- Real partner / client logos, only ones you can prove.
- Real testimonials with name, role, company.
- Real numbers only (years in business, projects delivered) when sourced.
  If no real number exists, show no number.
- Certifications, awards, press mentions if genuinely held.
- Legal pages present: privacy policy, terms.

Anti-pattern: fabricated stats (10K+ users, 99.9% uptime), fake reviews, made-up
certifications. These destroy the exact trust the site exists to build.

## 4. Design and layout best practices

- 12-column grid for alignment consistency.
- Generous section padding, roughly 48 to 96px, so sections breathe.
- Mobile-first. Most first visits are on a phone.
- Performance: fast load, optimized images, lazy loading below the fold.
- Clear visual hierarchy: one focal point per screen, one primary CTA per
  section at most.
- Accessibility: WCAG AA contrast (4.5:1 normal, 3:1 large), full keyboard
  navigation, visible focus states.
- SEO: real title/meta per page, semantic heading order, structured data,
  sitemap, fast Core Web Vitals.

## 5. antislop constraints that will govern the build

Loaded: antislop (core) + antislop-ui. Key hard gates for this project:

- R-02: no em dash in any UI text.
- R-03: mobile layout must be perfect, no horizontal overflow, 44px targets.
- R-17 / R-36 / R-38: no statistic, claim, or content without a real source.
  Placeholders must be labeled honestly ([REAL DATA], Coming soon).
- R-18: no fake testimonials. No testimonials section if none are real.
- R-23: do not invent logo, team photos, stats, or nav structure. Ask, or use
  an honest placeholder.
- R-24: no nav link to a page or section that does not exist.
- R-25: WCAG AA contrast everywhere.
- R-26: every button/link/form does something real. No dead controls.
- R-27: every data view needs empty, loading, and error states.
- R-28: no generic template FAQ. Only real questions this company's users ask.
- R-32: keyboard reachable, visible focus, Escape closes dialogs.
- R-35: run the build and click through every control before claiming done.
- R-37: design direction required. Need DESIGN.md or the friend's prompt, else
  the output is a labeled "draft without direction" at ENERGY 1 / RHYTHM 1 /
  MOTION 1.

Purpose-gate (allowed but reason must be written): gradients, icons, typeface
choice, background texture, arrows on buttons, badges, glass, shadow, glow,
card variation, animation, illustration.

Liveliness: must declare three dials before building.
ENERGY (1 calm to 3 bold), RHYTHM (1 uniform to 3 asymmetric), MOTION (1 hover
only to 3 choreographed). Plus one focal point per screen, structural
whitespace, one deliberate accent, one identity motif, and a Design Read line.

## 6. Open inputs before build can start

Resolved:

- antislop usage mode: BOTH. Apply DURING the build, then run a separate
  numbered audit AFTER.
- Design direction: FRD section 7 supplies it (enterprise, restrained,
  editorial; navy/charcoal + off-white + blue accent, green scoped to
  Agritech; strong typography, generous whitespace, structured grids,
  high-quality photography; no startup gradients, no excessive icons, no
  clip-art, no crowded pages). This satisfies R-37.
- Page architecture: FRD section 6 lists the candidate nav. Only confirmed
  pages ship (R-24); optional Team/Careers and Insights/News stay out until
  confirmed.
- Content rules: FRD section 8 matches the antislop hard gates. Verified facts
  only.

Still blocked on the user:

1. The UI/UX prompt. It must build AROUND the FRD, not override it.
2. Real company content: established year, story/milestones, mission/vision,
   Agritech capabilities, IT Services capabilities, projects, tech stack,
   contact details.
3. 15-member team composition confirmation.
4. Logo and brand assets, or an explicit go-ahead to use a text/placeholder
   mark.
5. Client/testimonial permission. Testimonials section ships only with real,
   permitted quotes.
6. Which optional pages actually ship.
7. Scope call: FRD deliverables include DOCX + PDF. Web is Next.js + Tailwind
   + TS. DOCX/PDF generation is outside that stack and needs a separate
   decision.

## 7. Proposed tech shape (to confirm, not decided)

- Next.js App Router, TypeScript strict.
- Tailwind CSS with design tokens defined up front from DESIGN.md.
- Per-route metadata + generateMetadata for SEO, JSON-LD Organization schema.
- next/image for all imagery, next/font for typography.
- Real form handling with validation and visible success/error feedback.
- Light/dark only if the brand direction calls for it (R-21, R-34).
