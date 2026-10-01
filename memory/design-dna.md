# Design DNA from Reference Component

Source: friend's GOLF reference HTML component (Inter + lime/black + Tailwind CDN).
Role: this is a LAYOUT + MOTION reference, not a palette reference. The FRD owns
the palette and content. See `memory/next360-frd.md` section 7.

Reconciliation rule: take composition from the reference, take color/type/content
from the FRD. Where they conflict, the FRD wins.

## Design Read (declared, per antislop Part 3)

> Reading this as: a corporate company profile for Next360 (Agritech + IT
> Services) aimed at enterprise buyers, tender committees and partners, in a
> restrained editorial enterprise style, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

| Dial | Value | Why |
|---|---|---|
| ENERGY | 2 | Premium and confident, not loud. FRD says restrained/spacious/editorial. |
| RHYTHM | 2 | Structured grid consistency with a few deliberate breaks (dark/light section turns, asymmetric hero). |
| MOTION | 2 | Scroll-reveal fade-up + hover transitions only. No parallax, pin, or choreography. |

## What to KEEP from the reference

1. **Floating pill nav container.** Fixed, centered, max-w, backdrop blur,
   compresses slightly on scroll (py-3 to py-2). R-10 dose cap: this is the ONE
   glass element allowed. Everything else stays solid.
2. **Full-bleed hero.** Background media, dark scrim for legibility, gradient
   fade into the next section so the turn is not a hard seam.
3. **Hero stack order.** Eyebrow marker, large display heading with a second
   line in accent, one supporting paragraph, two CTAs (solid + ghost), then a
   stat/proof row with vertical dividers.
4. **Section header pattern.** Small marker (dot + uppercase label) above or
   beside a large heading, with a supporting paragraph offset opposite. Gives
   editorial structure and satisfies FRD "section markers".
5. **Alternating section turn.** A section with a large rounded top radius and
   negative top margin overlapping the previous one. This is the RHYTHM 2 break.
   Use sparingly: 1-2 turns on the page, not every section.
6. **Image cards with hover reveal.** Image scales on hover, overlay gradient
   from bottom, text reveals on hover. Keep the reveal accessible: text must be
   visible without hover on touch/keyboard (see fixes below).
7. **Varied card grid (3-up).** The reference's community grid is genuinely
   varied: light surface card, image card, dark accent card. This PASSES R-14
   (not identical cards). Reuse this idea for capabilities.
8. **List rows with a leading meta column.** The events pattern: date/marker
   column, content column, trailing thumbnail. Good for milestones/timeline and
   for project case studies.
9. **Massive footer wordmark.** Huge brand name in a colored band above the
   footer legal row. This is the identity motif (core Part 3). For Next360 the
   band is navy, not lime.
10. **Scroll-reveal.** IntersectionObserver, threshold ~0.05, fade + 20px rise,
    unobserve after first fire. One animation type only, matches MOTION 2.
11. **Mobile menu toggle.** Hamburger to X, panel drops in.
12. **Section turns from light to dark.** Light base, one deep navy block, back
    to light. Supports hierarchy rather than decorating.

## What to DROP (slop, and FRD violations)

- **Lime/black palette.** Replaced by FRD: charcoal, off-white, restrained blue
  accent, green scoped to Agritech only.
- **Font Awesome icon soup.** FRD section 7 says avoid excessive icons. Use no
  icons unless one is genuinely load-bearing, and if so write the relevance.
- **Glassmorphism on everything.** Reference has blur on nav, badges, cards,
  buttons. R-10 caps it at 1-2 elements. Only the nav keeps it.
- **Pill radius on every element.** R-11. Reference rounds buttons, cards,
  badges, inputs, sections all to full pill. Next360 uses a small radius scale:
  cards/sections small, buttons small-medium, no full pills by default.
- **Background grid overlay.** The footer grid pattern in the reference fails
  R-07 without a written identity purpose. Drop it.
- **Gradient text fill on the heading.** The lime-to-green bg-clip-text is a
  default gradient treatment (R-01). Use a solid accent or a two-tone type
  treatment with hierarchy purpose instead.
- **Every CTA gets an arrow icon.** R-08. Arrows only where direction is real.
- **Generic CTAs.** "READ MORE", "Join Now", "Start Membership" fail R-15.
  Next360 CTAs name the actual action: "Request Company Profile", "Discuss a
  Project", "View Case Studies".
- **Buzzwords.** "world-class" fails R-16. FRD section 8 also bans
  unsubstantiated superlatives.
- **Em dash / en dash in UI text.** R-02. Reference has "Golf Events - Don't
  Miss Out". Use comma, period, colon, or parens.
- **Dead links.** Reference is `href="#"` everywhere. R-24/R-26: every nav and
  footer item points at a real route that exists, or it is not shipped.
- **Fake stats.** "18 Holes / 72 Par", "+4k", "80.99%", "199.00+" all fail
  R-17/R-38. Next360 shows only FRD-verified numbers. The one confirmed number
  so far: 15-member team. Everything else is `[VERIFIED DATA NEEDED]`.
- **Fake avatars.** pravatar images fail R-18/R-23. No team photos until real
  assets arrive. Initial-based placeholder or nothing.
- **Stock Unsplash photography as if it were Next360's work.** R-23. Placeholder
  imagery must be labeled as placeholder, not passed off as company assets.
- **Hover-only text reveals.** Card copy that only appears on hover is
  unreachable by keyboard and hidden on touch (R-03, R-32). Keep copy always
  visible; hover only adds emphasis.
- **Buttons with no behavior.** The reference scales a button on click but
  nothing happens. R-26. Every control does something real.
- **4-column footer as default.** R-05 flags Product/Company/Resources/Legal
  with no variation. Next360 footer is built from FRD IA link groups only, plus
  the wordmark band as the variation.

## Palette tokens (from FRD section 7)

Core (2-3) + accent (1), neutrals excluded from the cap (R-29):

| Token | Value | Role |
|---|---|---|
| `ink` | `#0B1220` | Charcoal. Primary text, deepest surface. |
| `navy` | `#10233F` | Brand core surface: dark sections, footer, wordmark band. |
| `navy-deep` | `#08111F` | Footer floor / hero scrim base. |
| `paper` | `#F6F7F9` | Off-white page base. |
| `surface` | `#FFFFFF` | Cards and raised content. |
| `accent` | `#1A56C4` | Restrained blue. Primary action, links, markers. AA-safe on white (~6.5:1). |
| `agri` | `#2E7D4F` | Controlled green. SCOPED: Agritech section/vertical only (FRD section 7). |
| `muted` | `#5A6473` | Secondary text. Checked against AA before ship. |

Green usage reason (R-01 purpose): it marks the Agritech vertical so the two
business lines are visually distinguishable. It appears nowhere else on the site.

## Typography (FRD section 7: strong typography, editorial, highly legible)

| Role | Family | Reason (R-06) |
|---|---|---|
| Display / headings | **Source Serif 4** | Editorial authority for a corporate profile; screen-optimized and restrained, not a decorative fashion serif. |
| Body / UI | **IBM Plex Sans** | Designed for technical and enterprise contexts; suits an engineering + agritech firm; avoids the default AI sans roster. |
| Section markers | **IBM Plex Mono**, small, normal tracking | FRD section 7 explicitly requires consistent section markers. Used small only. Not large display mono, not extreme letter-spacing (R-06 carve-out satisfied). |

## Still needed before content is real

FRD section 10 checklist is entirely unchecked. Until items clear, affected
copy ships as an honest labeled placeholder (`[VERIFIED DATA NEEDED]`) or the
section is omitted entirely. Never fabricated.
