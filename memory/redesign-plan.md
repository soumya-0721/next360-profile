# Next360 profile: hard redesign plan (approved 2026-09-24)

**Direction (user-chose, transcribe into DESIGN.md in Phase 0):**
Editorial magazine. Photo-led chapters, full-bleed imagery, oversized headlines,
asymmetric layouts, every chapter composed differently.

> Design Read: *company profile for B2B / KSA procurement readers + partners, in a
> photo-led editorial magazine language, dial ENERGY 3 / RHYTHM 3 / MOTION 2.*

**Constraints (user-approved):**
- Print/PDF stays first-class (A4, page breaks, backgrounds, photo placement on paper).
- Mobile stays verified (tested at 390px, no overflow, 44px tap targets).
- Single file kept as default (was not opened up); `assets/` beside it.
- Antislop mode: AFTER. Build first, then `anti-slop/audit-004-YYYY-MM-DD.md`
  with numbered findings; user approves numbers before any fix.
- Honesty locks carry over: illustrative-photo captions, `[TO BE CONFIRMED]` slots,
  no invented stats/testimonials, WCAG AA contrast (keep the fixed tokens:
  `--gold #7A6228`, `--muted #656C65`, `--gold-soft #D2B773`).

## Design system deltas

- **Type:** add a display serif for headlines (proposal: *Source Serif 4* or
  *Fraunces*, reason: editorial voice, magazine feature feel) with Inter kept for
  body/UI (reason: neutral readability, already loaded). Cover headline jumps to
  ~7rem; chapter openers get an oversized outlined numeral as the identity motif.
- **Palette:** unchanged tokens (green/ivory/sage + gold ink/soft). Dark spreads
  (flagship, closing) become the rhythm breaks instead of alternating backgrounds.
- **Motif:** every chapter opens with the same 3-part device: giant numeral,
  gold rule, kicker. Repetition of ONE device, variety everywhere else (R-20).
- **Imagery treatment:** full-bleed chapter openers with green scrim + overlaid
  caption; duotone tint kept for brand cohesion; hover = 3% photo zoom (screen only).

## Chapter-by-chapter treatment (RHYTHM 3: no two chapters alike)

| # | Chapter | New composition | Imagery |
|---|---------|-----------------|---------|
| - | Cover | Full-bleed photo with green scrim; giant NEXT360 type over image; statement as pull-quote | NEW `cover-hero.jpg` (replaces/absorbs `cover-field`) |
| 01 | Who We Are | Asymmetric: big lede left spanning 7 cols, editorial photo duo right; 4 capabilities as numbered list rows, lead row emphasized | `company-farm`, `company-code` scaled up |
| 02 | Vision & Mission | Full-width photo strip, then two oversized pull-quotes side by side; ecosystem diagram demoted to a ruled inset | `direction-planning` larger |
| 03 | Core Verticals | Chapter opener photo, then mixed mosaic: flagship card full-bleed dark w/ photo, photo cards for EV/screens/hospital/IVR/CRM, ONE diagram card (SEO) kept for contrast | NEW `verticals-opener`, NEW `ivr-support`, NEW `crm-meeting`; existing `flagship-market` moves into card 01 |
| 04 | Flagship | Double-page dark spread: full-bleed photo band edge-to-edge, flow diagram as horizontal ruler, capabilities as 4 editorial columns | `flagship-market` + `flagship-tomatoes` full-bleed |
| 05 | Slick Technologies | Diagram-led (orbit kept as hero visual), photo as narrow vertical strip beside product list | `slick-code`, optional NEW `products-screen` |
| 06 | How We Work | Horizontal editorial timeline across full width, big photo anchoring the bottom, quote as oversized margin note | `execution-dev` full-bleed |
| 07 | Snapshot | Stat spread: giant "12" bleeding off the left edge, photo full-height right | `team-office` larger |
| 08 | Current Focus | Deliberately TEXT-FORWARD page (no photo): dense typographic index of the 7 areas, flagship row banded. Reason: rest beat between image-heavy chapters | none by design |
| 09 | Positioning | 3 pillars as ruled editorial columns, then closing quote overlaid on full-bleed city photo | `positioning-city` behind closing |
| - | Back cover | Slim full-width photo strip on top, then info table unchanged | NEW `back-horizon.jpg` |

## New photos to source (Pexels/free, download to assets/, verify 200 + JPEG)

1. `cover-hero.jpg` — human + organic (hands/produce/farmer portrait), portrait or wide crop
2. `verticals-opener.jpg` — market/warehouse crates, trade atmosphere
3. `ivr-support.jpg` — call-center headset operator
4. `crm-meeting.jpg` — small team with customers/laptop
5. `back-horizon.jpg` — field horizon or aerial green landscape
6. (optional) `products-screen.jpg` — device/app screen for Slick

All get honest captions ("Illustrative photo · Pexels · not a Next360 facility").

## Motion (MOTION 2)

- Headline mask-reveal + photo scale-in (1.04 → 1) on chapter entry, 400-600ms.
- Cover parallax kept; chapter numeral fades with its opener.
- Everything gated by `prefers-reduced-motion` and disabled in `@media print`.
- No template fade-up on every element; motion marks chapter entries only.

## Phases

- [ ] **0.** Transcribe direction into `DESIGN.md` (user is author, agent formats).
- [ ] **1.** Source + download the 5-6 new photos; verify; honest captions.
- [ ] **2.** Build the chapter-opener system (CSS: full-bleed, scrim, numeral, rule).
- [ ] **3.** Re-compose cover + chapters 01-09 per table; keep copy/nav/print JS.
- [ ] **4.** Back cover strip.
- [ ] **5.** Motion pass + reduced-motion/print kill switches.
- [ ] **6.** Verify: headless offline at 1440/900/390, print-to-PDF page check
      (Chrome --print-to-pdf, page count + no blank/broken pages), contrast script,
      13+ local images, 0 console errors.
- [ ] **7.** AFTER-mode: write `anti-slop/audit-004-*` numbered findings; wait for approval.

## Risks kept in view

- R-05: variety must be real — the table above is the contract, no two chapters share a layout.
- Print bleed: browser print can't reach true paper edge; "full-bleed" = edge-to-edge
  within the A4 content box, `print-color-adjust: exact`, verified on paper output.
- Fonts remain a Google Fonts dependency with system fallbacks (offline-safe today).
- Do not regress: honesty locks, AA contrast tokens, offline assets, print button, dot-nav.
