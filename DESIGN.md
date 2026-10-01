# DESIGN.md — Next360 Company Profile

Direction chosen by the project owner on 2026-09-24: **Editorial magazine**.
This file is the design source of truth. `next360-company-profile.html` and any
future UI read direction from here; antislop remains the filter on top of it.

## Design Read

> Company profile for B2B / KSA procurement readers and partners, in a
> photo-led editorial magazine language, dial ENERGY 3 / RHYTHM 3 / MOTION 2.

## Identity

A corporate profile that reads like a magazine feature: real photography leads
every chapter, type is oversized and confident, and the content is presented as
a printed story (cover, chapters, folios, back page) rather than a slide deck or
a SaaS landing page. Swap the logo and it must still feel like this document.

## Personality

Confident, evidence-led, human. Says what is true, marks what is unconfirmed,
never shouts. Premium through restraint and craft, not through decoration.

## Dials

| Dial | Value | What it means here |
|---|---|---|
| ENERGY | 3 (Bold) | Full-bleed photography, ~7rem cover type, giant chapter numerals, dark spread at chapter 04 |
| RHYTHM | 3 (Varied) | No two chapters share a layout below the opener; one deliberately text-forward page (08) as a rest beat |
| MOTION | 2 (Balanced) | Chapter-entry headline reveal, photo scale-in, slight cover parallax. No per-element fade-up spam. Off for reduced-motion and print |

## Palette (tokens live in `:root`, contrast verified AA)

| Token | Value | Role |
|---|---|---|
| `--green` | `#1F4836` | Core brand, dark spreads |
| `--green-dark` | `#17382A` | Dark spread depth, scrims |
| `--green-soft` | `#2E5C46` | Borders/hover on brand surfaces |
| `--sage` / `--sage-deep` | `#EEF3EA` / `#E4EBDF` | Secondary surfaces, desk background |
| `--ivory` / `--cream` | `#FCFBF7` / `#FAF7EA` | Page surfaces, text on dark |
| `--text` / `--muted` | `#303631` / `#656C65` | Body copy (muted AA on all light surfaces) |
| `--gold` / `--gold-soft` | `#7A6228` / `#D2B773` | Accent: rules, chapter numerals, kickers / accents on dark |

Neutral rule: 2-3 core colors + 1 accent. No new colors without editing this file.

## Typography

- **Display: Source Serif 4** (headlines, chapter titles, pull-quotes, big stat).
  Reason: an editorial voice with authority at large sizes; Georgia fallback
  keeps the serif voice when offline.
- **Body / UI: Inter** (lede companions, paragraphs, labels, captions, nav).
  Reason: neutral readability, already loaded, keeps labels quiet under the serif.
- Scale: cover h1 `clamp(3.4rem, 9vw, 7rem)`; chapter h2 `clamp(2.1rem, 4vw, 3.2rem)`;
  lede serif `clamp(1.15rem, 1.8vw, 1.45rem)`; labels Inter `.7rem` uppercase tracked.

## Composition rules

1. Every chapter (01-09) opens with the identity device: **giant numeral → gold rule → kicker**.
2. Below the opener, no two chapters share a layout (the contract table lives in
   `memory/redesign-plan.md`).
3. Photography leads; diagrams explain only what a photo cannot (flows, orbits, systems).
4. Any text sitting on a photo sits on a scrim of at least .8 alpha green-dark
   at that spot (measured, not eyeballed).

## Imagery

- Free-licensed photos only (Pexels / verified CC0), all stored in `assets/`,
  none hotlinked.
- Full-bleed or chapter-opener scale; brand green tint for cohesion.
- Every photo carries an honest caption: `Illustrative photo · <source> · not a
  Next360 facility`.

## Motion

Chapter-entry headline clip reveal, photo scale-in (1.05 → 1), cover parallax
(~4% travel). Transitions 400-600ms with the existing `--ease`. All of it dies
under `prefers-reduced-motion: reduce` and in `@media print`.

## Locks (never regress)

Honesty (illustrative captions, `[TO BE CONFIRMED]` slots, no invented
statistics or testimonials), WCAG AA contrast on every text pair, offline
operation (no hotlinked images), single-file deliverable with working A4
print/PDF, keyboard-reachable controls with visible focus.
