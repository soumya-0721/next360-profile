# Plan: bring the Next.js site in line with the profile (2026-09-24)

Authority: `DESIGN.md` (editorial magazine, ENERGY 3 / RHYTHM 3 / MOTION 2) plus the
real company details supplied by the owner. Antislop AFTER-mode: build, then
`anti-slop/audit-004-*`, user approves finding numbers before any fix.

## Current state (surveyed)

- Site palette in `src/app/globals.css` `@theme`: lime `#84cc16`, accent `#ccff00`,
  dark `#0f0f0f`, dark-green `#1a4d1a`. Type: Inter only.
- Profile palette: `--green #1F4836`, `--green-dark #17382A`, `--sage #EEF3EA`,
  `--ivory #FCFBF7`, `--gold #7A6228`, `--gold-soft #D2B773`; type Inter + Source Serif 4.
- Contact page `direct` array: all three values are `[TO BE CONFIRMED]`.
- `src/lib/site.ts` `TBC` token still used for contact/legal values.
- No occurrence of `next360.in`, `9989163332`, `Madhapur`, `T-Hub` anywhere in `src/`.

## Confirmed facts to publish

- Address: T-Hub Phase 2 Launch, 20 Inorbit Mall Road, Vittal Rao Nagar, Madhapur,
  Hyderabad, Telangana 500081
- Phone: +91-9989163332
- Email: office@next360.in
- Everything else (website URL, CIN, GSTIN, PAN, IEC, Udyam, Certifications) stays `[TO BE CONFIRMED]`.

## Phases

1. **P1 · Contact truth.** Add `company.address / phone / email` in `src/lib/site.ts`
   as a `contact` object; consume it in `src/app/contact/page.tsx` `direct` array,
   `src/app/(legal)/[slug]/page.tsx` (contact email/phone + operator details),
   and the JSON-LD in `src/app/layout.tsx` if it declares contact points.
   Route every other unknown through `TBC`. No invented values.
2. **P2 · Type.** Add `Source Serif 4` in `src/app/layout.tsx` next to Inter as
   `--font-display`; map `--font-display` in `@theme`; apply to page hero titles and
   section titles so headlines carry the editorial voice.
3. **P3 · Palette retoken.** Change `@theme` values only (no class rewrites):
   `brand-green` → deep editorial green, `brand-dark-green` → `#17382A`,
   add `brand-ivory`, `brand-sage`, `brand-gold`, `brand-gold-soft`.
   Then audit **every** `brand-*` usage (grep list) for contrast, because
   `text-brand-green` currently appears on both light and dark surfaces: on dark
   cards it must become `brand-gold-soft` or `brand-accent`, not deep green.
   Keep `brand-accent` only where it passes AA on its own background, else retire it.
   Contrast floor: 4.5:1 normal / 3:1 large (R-25).
4. **P4 · A4/print parity.** The profile must print as perfect A4: verify with
   `google-chrome-stable --print-to-pdf`, check page count = 11 sections map cleanly,
   no blank or half-empty pages, dark spreads fill their sheet, photos bleed to edge.
5. **P5 · Motion.** Profile chapter-entry reveal + photo scale-in, gated by
   `prefers-reduced-motion` and disabled in `@media print` (MOTION 2, no per-element spam).
6. **P6 · Verify.** Profile: headless offline 1440/900/390 + contrast script.
   Site: `npm run typecheck`, `npm run lint`, `npm run build`.
7. **P7 · Audit.** Write `anti-slop/audit-004-YYYY-MM-DD.md` numbered findings for
   BOTH artifacts, including carried-over open items from audit-003 (#2 resolved by
   DESIGN.md, #4 Flickr labels, #5 team size 12 vs 15, #6 caption format, #7 sibling
   cards, #8 print pagination) plus the known `#707770` / `#A8873F` SVG literals.
   Wait for user approval of finding numbers before fixing.

## Risks

- Palette retoken is the widest blast radius: one token change repaints 9 routes.
  Mitigate by grepping every `brand-*` usage first and auditing surfaces pairwise.
- Do not regress: honesty locks, offline assets, print button, dot-nav, single-file profile.
- Team size conflict (12 in profile vs 15 in `memory/next360-content-architecture.md`)
  stays unresolved until the owner answers; do not silently pick one.
