# Next360 FRD v1.0: Functional Requirements Document

Status: SUPERSEDED ON CONTENT AND IA.
`memory/next360-content-architecture.md` is now the controlling source for
content, information architecture and corporate messaging. It adds the
NEXT360 ORGANIC flagship, the SLICK Technologies product ecosystem, five
named projects, the revised website IA and the `[TO BE CONFIRMED]` token.
This file remains valid for purpose, objectives, credibility rules and the
visual direction in section 7. Deltas are tabulated in architecture section
15.

Locked in by client. Stack: Next.js + Tailwind CSS + TypeScript.

Original: "NEXT360 COMPANY PROFILE — FUNCTIONAL REQUIREMENTS DOCUMENT,
FRD v1.0 | Corporate Profile + Website Content System"

---

## 1. Purpose

Define the content, information architecture, visual direction and reusable
requirements for Next360's corporate company profile and the corresponding
company website. The profile must position Next360 as a credible, established
technology organization with two primary business verticals: Agritech and IT
Services.

## 2. Business Positioning

Next360 will be presented as a parent technology company with two complementary
business verticals. The corporate story comes first; individual services,
capabilities, projects and team strengths follow.

- Vertical 01, Agritech: agriculture-focused technology, products, platforms
  and solutions.
- Vertical 02, IT Services: software engineering, IT operations, support,
  infrastructure and managed technology services.

Constraints:

- Avoid positioning Next360 as only an IT support company.
- Avoid Saudi/Riyadh-specific positioning in the general company profile
  unless separately required.
- Use only verified facts, projects, clients, certifications, team counts and
  achievements.

## 3. Primary Objectives

- Create a premium, enterprise-grade first impression.
- Clearly communicate company history, capabilities, team and track record.
- Demonstrate that Next360 can execute both technology products and operational
  IT services.
- Create a reusable source of truth for proposals, tenders, partnerships and
  the website.
- Maintain consistent language, visual identity and information architecture
  across PDF/DOCX and web.

## 4. Required Company Information

| Information | Required | Status / Source |
|---|---|---|
| Legal/company name | Yes | Client to confirm |
| Established year | Yes | Client to confirm |
| Company story / milestones | Yes | Client to provide |
| Mission & vision | Recommended | Draft + approval |
| Team size / structure | Yes | 15-member team; composition to confirm |
| Agritech capabilities | Yes | Client to provide |
| IT Services capabilities | Yes | Client to confirm |
| Projects / deployments | Yes | Client to provide |
| Clients / industries | Optional | Only disclose with permission |
| Certifications / registrations | Optional | Only verified items |
| Technology stack / tools | Yes | Confirm actual usage |
| Contact details | Yes | Client to provide |

## 5. Corporate Profile, Page Architecture

1. Cover: Next360 identity and positioning.
2. Executive Overview: who Next360 is and what it does.
3. Company Story: establishment, journey and milestones.
4. Business Verticals: Agritech + IT Services.
5. Agritech: capabilities, solutions, products and outcomes.
6. IT Services: software, infrastructure, support and managed services.
7. Technology & Engineering Capabilities: platforms, development and technical
   strengths.
8. Selected Projects & Experience: verified case studies and deployments.
9. Team & Organization: 15-member team and capability structure.
10. Delivery Methodology: how Next360 plans, builds, deploys and supports.
11. Quality, Security & Governance: operational discipline and controls.
12. Growth & Future Direction: credible forward-looking direction.
13. Contact: corporate contact information.

## 6. Website Information Architecture

- Home
- About Next360
- Agritech
- IT Services
- Projects / Case Studies
- Capabilities
- Technology
- Team / Careers (optional)
- Insights / News (optional)
- Contact

Nav rule: per antislop R-24, only confirmed pages get nav entries. Optional
pages (Team/Careers, Insights/News) are omitted until the client confirms them.

## 7. Visual & Brand Direction

- Premium enterprise aesthetic: restrained, spacious, editorial and highly
  legible.
- A4 portrait DOCX/PDF master; web layout derived from the same content system.
- Use strong typography, generous whitespace, structured grids and high-quality
  photography.
- Suggested palette: deep navy/charcoal, white/off-white, restrained blue
  accent; agriculture can use a controlled green accent inside the Agritech
  section.
- Avoid generic startup gradients, excessive icons, clip-art and crowded pages.
- Use consistent page numbers, headers/footers and section markers.

Note: this is the DESIGN.md direction input antislop R-37 requires. The UI/UX
prompt will extend, not replace, it.

## 8. Content Rules

- Never invent clients, revenue, certifications, years of experience, employee
  counts, project outcomes or geographic presence.
- Separate verified facts from future ambitions.
- Use concise enterprise language; avoid exaggerated claims such as "world's
  leading" unless independently substantiated.
- Case studies must identify the problem, Next360's contribution, the
  technology/service delivered and the verified outcome.
- Technical claims should reflect tools and platforms the company can actually
  support.

Maps directly to antislop hard gates R-17, R-18, R-36, R-38.

## 9. Deliverables

- Master editable DOCX company profile.
- PDF-ready export of the approved profile.
- Website content/IA derived from the same approved source.
- Reusable visual components: cover, section divider, capability cards,
  timeline, project case study, team structure and contact page.
- Future technical proposal can reuse the approved company facts without
  changing the corporate story.

Note: DOCX/PDF deliverables are outside the web stack. Web is Next.js +
Tailwind + TS. Flag scope if the client wants those generated too.

## 10. Approval Checklist

- [ ] Established year confirmed.
- [ ] Company story approved.
- [ ] Agritech services/projects verified.
- [ ] IT Services capabilities verified.
- [ ] 15-member team composition confirmed.
- [ ] Project portfolio and outcomes verified.
- [ ] Technology/tool list verified.
- [ ] Brand assets supplied.
- [ ] Contact/legal information verified.
- [ ] Final content approved before publication.

Nothing ships publicly until this checklist clears.

---

## Cross-mapping to research

See `memory/company-profile-research.md`.

- FRD section 5 (13-page profile) maps onto the research section anatomy:
  Cover+Exec Overview = hero equivalent, Business Verticals = value props,
  Agritech/IT Services = services, Projects = case studies, Team = team,
  Delivery Methodology + Quality/Security = benefits/trust, Contact = CTA.
- FRD has no pricing section: correct, Next360 does not price publicly. Omit.
- FRD marks clients/testimonials as permission-gated: so the testimonials
  section ships ONLY if real, permitted quotes arrive. Otherwise omit (R-18).
- FRD section 7 palette satisfies the antislop purpose-gate for color: navy/
  charcoal core, off-white base, blue accent, context-scoped green for
  Agritech. This is brand-derived, not a default gradient, so R-01 passes with
  the reason written here.
- Still missing for build: real stats, real projects, real team, logo assets,
  contact details, tech stack list, and the UI/UX prompt.
