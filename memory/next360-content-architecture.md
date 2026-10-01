# Next360 Content Architecture v1.0

Status: APPROVED CONTENT ARCHITECTURE. Source of truth for content, information
architecture and corporate messaging across the website, the corporate profile
document, the project portfolio and future proposals.

Scope: content and information architecture ONLY.

- UI/UX, visual design, colours, animation, components, typography and
  frontend implementation are explicitly out of scope for this document.
- Visual direction remains in `memory/design-dna.md` and FRD section 7.

Placeholder token for anything unknown: **[TO BE CONFIRMED]**

Supersedes the content and IA sections of `memory/next360-frd.md` where they
conflict. Deltas are listed in section 15.

---

## 1. Corporate identity and positioning

- NEXT360 is the parent technology organization.
- Two primary business verticals: **01 AGRITECH**, **02 IT SERVICES**.
- Next360 builds technology products, digital platforms and software
  solutions, and also provides technology / IT services.
- Current technical team: **15 members**. Team composition is not to be
  fabricated.
- Positioning to avoid: Next360 as only an IT support company.

Approved positioning statements:

1. "Next360 is not simply a software development vendor."
2. "Next360 is a technology organization that builds products, platforms and
   businesses."
3. "Next360 is a technology organization that builds real products, solves
   real-world problems and operates across Agritech and IT Services."

Forbidden framings:

- "IT support company" as the primary frame.
- SLICK Technologies called a subsidiary, sister company, independent company
  or separate legal entity.
- Any mention of Tuckii in relation to Organize.
- Organize described as a clone, duplicate or inspired product.

## 2. Core message stack

Ordered by importance, used consistently everywhere:

1. Next360 builds products, platforms and businesses.
2. Two verticals: Agritech and IT Services.
3. NEXT360 ORGANIC is the flagship proof that Next360 combines technology with
   a real-world Agritech business ecosystem.
4. The wider project portfolio demonstrates technical versatility.
5. SLICK Technologies demonstrates Next360's own software-product and emerging
   technology capability.
6. A 15-member multidisciplinary technical team delivers it.

## 3. Corporate story hierarchy

This order governs the homepage, the About page and the profile document:

```
NEXT360
  |
  +-- Technology + Agritech + IT Services
  |
  +-- NEXT360 ORGANIC          Flagship Agritech initiative
  |
  +-- Other Next360 projects
  |
  +-- SLICK TECHNOLOGIES       Next360's branded product ecosystem
```

The corporate story always comes first. Individual services, capabilities,
projects and team strengths follow it.

## 4. Corporate structure

```
NEXT360
Technology & Digital Solutions Organization

+-- AGRITECH
|   +-- NEXT360 ORGANIC
|       Flagship Agritech Initiative
|
+-- IT SERVICES
|   +-- Enterprise & Technology Services
|
+-- SLICK TECHNOLOGIES
    Branded Product Ecosystem by Next360
    +-- SlickCode
    +-- SlickSEO
    +-- Slixo
    +-- Organize
```

Legal organization name: [TO BE CONFIRMED]

## 5. Website information architecture

### Primary sections

| # | Section | Route |
|---|---|---|
| 1 | HOME | `/` |
| 2 | ABOUT NEXT360 | `/about` |
| 3 | AGRITECH | `/agritech` |
| 4 | IT SERVICES | `/it-services` |
| 5 | NEXT360 ORGANIC | `/organic` |
| 6 | PROJECTS | `/projects` |
| 7 | SLICK TECHNOLOGIES | `/slick` |
| 8 | CAPABILITIES | `/capabilities` |
| 9 | CONTACT | `/contact` |

Optional, not published or added to nav until confirmed:

| Section | Route |
|---|---|
| CAREERS | `/careers` |
| INSIGHTS | `/insights` |

Nav rule: only confirmed pages get nav entries.

Legal/utility routes already built and retained: `/privacy`, `/terms`,
`/cookies`, `/legal`, plus `POST /api/contact`.

### Homepage content priority

1. Next360 identity
2. What Next360 does
3. Agritech + IT Services
4. NEXT360 ORGANIC, strongest project emphasis
5. Other projects
6. SLICK Technologies
7. Capabilities
8. Team
9. Contact

Priority 4 is a hard requirement: Next360 Organic receives the strongest
project emphasis on the homepage. It is not one card among many.

---

## 6. Page content specifications

### 6.1 Home

Blocks in the priority order above.

| Block | Content | Status |
|---|---|---|
| Identity | Next360 as parent technology organization | Approved wording in section 1 |
| What we do | Products, platforms, software solutions, technology services | Approved |
| Verticals | Agritech and IT Services, both present | Approved |
| Flagship | Next360 Organic, strongest emphasis | Structure approved, body [TO BE CONFIRMED] |
| Other projects | Vanyabhumi, Ayurvena, Let's Connect, Leader Portfolios | Names approved, detail [TO BE CONFIRMED] |
| SLICK | Descriptor plus 4 products | Approved wording in section 9 |
| Capabilities | Aggregated vertical capability summary | Lists approved, verification pending |
| Team | 15-member multidisciplinary technical team | Count approved, composition [TO BE CONFIRMED] |
| Contact | Route to contact | Details [TO BE CONFIRMED] |

### 6.2 About Next360

- Identity and positioning (section 1)
- Corporate structure tree (section 4)
- Corporate story hierarchy (section 3)
- Company history, all fields [TO BE CONFIRMED] except team size
- Business verticals overview
- Team
- Future direction [TO BE CONFIRMED]

### 6.3 Agritech

Approved capability areas: agriculture technology, organic products, digital
commerce, agricultural ecosystems, supply chains, market access, agriculture
platforms.

Next360 Organic belongs here and must be presented as the flagship initiative
of this vertical, linking to `/organic`.

Per-capability verification status: [TO BE CONFIRMED]

### 6.4 IT Services

Approved capability areas: software development, web/mobile applications,
backend engineering, enterprise software, IT infrastructure, user/endpoint
support, service desk, monitoring, asset management, managed technology
services, technical projects.

Per-capability verification status: [TO BE CONFIRMED]

### 6.5 Next360 Organic, dedicated content

Flagship page. Fourteen required content blocks. The six-domain intersection
is approved; everything else is unconfirmed until the client supplies it.

| # | Block | Approved content | Status |
|---|---|---|---|
| 1 | What Next360 Organic is | Flagship Agritech initiative connecting AGRICULTURE + ORGANIC PRODUCTS + DIGITAL COMMERCE + TECHNOLOGY + OPERATIONS + CUSTOMER EXPERIENCE | Six domains approved, detail [TO BE CONFIRMED] |
| 2 | Why it was created | Purpose narrative | [TO BE CONFIRMED] |
| 3 | Problem / opportunity | The gap or need it addresses | [TO BE CONFIRMED] |
| 4 | Vision | Intended outcome and direction | [TO BE CONFIRMED] |
| 5 | How technology is used | Technology role in the initiative | [TO BE CONFIRMED] |
| 6 | Product / category ecosystem | Categories and products offered | [TO BE CONFIRMED] |
| 7 | Platform operations | How the platform is run | [TO BE CONFIRMED] |
| 8 | Customer experience | How customers interact and are served | [TO BE CONFIRMED] |
| 9 | Vendor / producer ecosystem | Producers and vendors, where applicable | [TO BE CONFIRMED] |
| 10 | Delivery / fulfilment | Logistics and fulfilment, where applicable | [TO BE CONFIRMED] |
| 11 | Technology infrastructure | Systems and infrastructure | [TO BE CONFIRMED] |
| 12 | Platform capabilities | What the platform can do | [TO BE CONFIRMED] |
| 13 | Current status | Live / Active Development / In Development / Prototype / Concept | [TO BE CONFIRMED] |
| 14 | Future direction | Planned next steps | [TO BE CONFIRMED] |

Hard rule: never invent metrics, users, revenue, market coverage or outcomes
for Next360 Organic.

Positioning requirement: Organic demonstrates that Next360 does not merely
provide technology services, it builds technology-driven businesses and
products. It must never be treated as an ordinary portfolio item.

### 6.6 Projects

Ordered list, flagship first:

1. Next360 Organic, FLAGSHIP
2. Vanyabhumi
3. Ayurvena
4. Let's Connect
5. Leader Portfolios

Each project entry uses the nine-field spec in section 7.

### 6.7 Slick Technologies

Approved descriptor, use verbatim:

> SLICK Technologies, a branded product ecosystem by Next360.

Purpose of the section: demonstrate Next360's own software-product and
innovation capabilities.

Explicitly not a subsidiary, sister company, independent company or separate
legal entity.

Products: SlickCode, SlickSEO, Slixo, Organize.

### 6.8 Capabilities

Aggregates the two vertical capability lists plus the technology mapping from
section 11. Technology appears here connected to real projects rather than as
a standalone logo list.

### 6.9 Contact

Corporate contact information: [TO BE CONFIRMED]
Route to request the full company profile document.

### 6.10 Optional sections

Careers and Insights are defined but unpublished and absent from nav until the
client confirms them.

---

## 7. Project portfolio specification

Nine fields per project:

1. Name
2. Category
3. Overview
4. Purpose / problem
5. Solution
6. Key capabilities
7. Technology, where relevant
8. Next360's role
9. Current status

Status vocabulary, actual status only: Live, Active Development, In
Development, Prototype, Concept.

| Project | Category | Flagship | Status |
|---|---|---|---|
| Next360 Organic | Agritech | Yes | [TO BE CONFIRMED] |
| Vanyabhumi | [TO BE CONFIRMED] | No | [TO BE CONFIRMED] |
| Ayurvena | [TO BE CONFIRMED] | No | [TO BE CONFIRMED] |
| Let's Connect | [TO BE CONFIRMED] | No | [TO BE CONFIRMED] |
| Leader Portfolios | [TO BE CONFIRMED] | No | [TO BE CONFIRMED] |

All nine fields for the four non-flagship projects are [TO BE CONFIRMED]
apart from the names. Project names suggest subject areas, but category must
come from the client and must not be inferred from the name.

No metrics, users, revenue, market coverage or outcomes may be stated unless
supplied and verified.

---

## 8. Business vertical capability inventories

### Agritech

- Agriculture technology
- Organic products
- Digital commerce
- Agricultural ecosystems
- Supply chains
- Market access
- Agriculture platforms

Next360 Organic sits under this vertical.

### IT Services

- Software development
- Web / mobile applications
- Backend engineering
- Enterprise software
- IT infrastructure
- User / endpoint support
- Service desk
- Monitoring
- Asset management
- Managed technology services
- Technical projects

Publish only verified capabilities. Mark unverified entries
[TO BE CONFIRMED].

---

## 9. SLICK Technologies products

| Product | Scope | Positioning rules | Status |
|---|---|---|---|
| SlickCode | AI-assisted development, developer productivity, developer tooling, modern engineering workflows | Only verified or planned functionality described | [TO BE CONFIRMED] |
| SlickSEO | SEO, search optimization, AI-assisted SEO, content/search intelligence, marketing technology | Only verified functionality described | [TO BE CONFIRMED] |
| Slixo | Billing, invoicing, customer management, business operations, business workflows | Present as a Next360 / SLICK Technologies product | [TO BE CONFIRMED] |
| Organize | Personal productivity and information management | Approved positioning: "Save now. Find anytime." Presented as an original Next360 product direction | [TO BE CONFIRMED] |

Per-product content fields: purpose, functionality, technology, current status,
future direction.

Organize restrictions: never mention Tuckii. Never describe it as a clone,
duplicate or inspired product.

SLICK Technologies is the vehicle that shows Next360's own software-product
and innovation capability.

---

## 10. Company history and team

### History

Required fields, all [TO BE CONFIRMED] unless noted:

- Establishment year
- Founding story
- Original purpose
- Major milestones
- Business expansion
- Technology capability expansion
- Team growth
- Major projects
- Current position

Missing information must be marked [TO BE CONFIRMED] rather than omitted
silently.

### Team

- 15-member technical team, count confirmed.
- Presented as a multidisciplinary organization.
- Capability areas: Leadership, Software Engineering, Product Development, IT
  Services, Infrastructure, Design, Operations.
- Department or discipline counts: do not invent. Composition
  [TO BE CONFIRMED].
- Individual names, roles and photographs: [TO BE CONFIRMED].

---

## 11. Technology capabilities

Rule: connect each technology to an actual project or capability. A generic
logo list is not acceptable.

Technologies in scope where genuinely applicable: Next.js, React, React
Native, TypeScript, Node.js, NestJS, Python, PostgreSQL, cloud platforms,
Docker, AI/LLM technologies, ManageEngine technologies.

Mapping template:

| Technology | Connected project / capability | Verified |
|---|---|---|
| Next.js | [TO BE CONFIRMED] | No |
| React | [TO BE CONFIRMED] | No |
| React Native | [TO BE CONFIRMED] | No |
| TypeScript | [TO BE CONFIRMED] | No |
| Node.js | [TO BE CONFIRMED] | No |
| NestJS | [TO BE CONFIRMED] | No |
| Python | [TO BE CONFIRMED] | No |
| PostgreSQL | [TO BE CONFIRMED] | No |
| Cloud platforms | [TO BE CONFIRMED] | No |
| Docker | [TO BE CONFIRMED] | No |
| AI/LLM technologies | [TO BE CONFIRMED] | No |
| ManageEngine technologies | Candidate link to IT Services monitoring, service desk and asset management, confirm | No |

Only rows marked verified publish.

---

## 12. Corporate profile document structure

Thirteen parts, same approved content system as the website:

1. Cover
2. Company Overview
3. Company Story
4. Business Verticals
5. Next360 Organic, Flagship Project
6. Selected Projects
7. IT Services
8. Technology Capabilities
9. SLICK Technologies
10. Team
11. Delivery Capabilities
12. Future Direction
13. Contact

Note: part 5 and part 9 are new relative to FRD v1.0. FRD v1.0 listed a
standalone Quality, Security and Governance part that is absent from this
list; treat its content as folded into Delivery Capabilities pending
confirmation.

## 13. Credibility rules

Never fabricate:

- Clients
- Revenue
- Users
- Market share
- Certifications
- Partnerships
- Awards
- Years of experience
- Employee counts
- Project outcomes
- Geographic presence
- Product launch status

Use [TO BE CONFIRMED] where information is unavailable.

Also binding from FRD section 8: no exaggerated claims such as "world's
leading" unless independently substantiated; case studies must state problem,
Next360's contribution, technology or service delivered, and a verified
outcome.

The company should feel strong because of its real products, projects, team
and capabilities, not because of exaggerated claims.

Testimonials: ship only real, permission-gated quotes. Otherwise no
testimonials section at all.

Clients and industries: disclose only with permission.

---

## 14. TBC register

Single consolidated list of everything unknown. Each row blocks the content
listed against it.

| ID | Item | Blocks |
|---|---|---|
| T-01 | Legal / company name | Cover, JSON-LD, contact |
| T-02 | Establishment year | About, history, profile part 3 |
| T-03 | Founding story and original purpose | About, profile part 3 |
| T-04 | Milestones and company history | About, profile part 3 |
| T-05 | Mission and vision | About, home |
| T-06 | Contact details, address, phone, email | Contact, footer, profile part 13 |
| T-07 | Team composition for the 15 members | Team, home |
| T-08 | Agritech capability verification | Agritech, Capabilities |
| T-09 | IT Services capability verification | IT Services, Capabilities |
| T-10 | Next360 Organic blocks 2 to 14 | /organic, home flagship block, profile part 5 |
| T-11 | Vanyabhumi all nine fields | Projects, profile part 6 |
| T-12 | Ayurvena all nine fields | Projects, profile part 6 |
| T-13 | Let's Connect all nine fields | Projects, profile part 6 |
| T-14 | Leader Portfolios all nine fields | Projects, profile part 6 |
| T-15 | SlickCode functionality and status | /slick |
| T-16 | SlickSEO functionality and status | /slick |
| T-17 | Slixo functionality and status | /slick |
| T-18 | Organize functionality and status | /slick |
| T-19 | Technology to project mapping | Capabilities, profile part 8 |
| T-20 | Clients and industries, permission-gated | About, optional logo strip |
| T-21 | Certifications and registrations, verified only | About, profile |
| T-22 | Testimonials, permission-gated | Omit if absent |
| T-23 | Brand assets, logo | Global |
| T-24 | Optional pages decision, Careers and Insights | Nav |
| T-25 | Delivery capabilities and methodology | Profile part 11 |
| T-26 | Future direction | About, profile part 12 |
| T-27 | Profile document format decision, DOCX and PDF are outside the web stack | Deliverables |

Open scope question carried from FRD: the DOCX and PDF profile deliverables
sit outside Next.js, Tailwind and TypeScript and need a separate decision.

---

## 15. Deltas from FRD v1.0

What changed, so the already-built site can be brought into line:

| Area | FRD v1.0 | Content Architecture v1.0 |
|---|---|---|
| Placeholder token | `[PENDING]` in build | `[TO BE CONFIRMED]` |
| Flagship project | none named | NEXT360 ORGANIC, hero of the site |
| Dedicated flagship route | none | `/organic` |
| Product ecosystem | none | SLICK Technologies, `/slick` |
| Named projects | generic "projects" | five named, Organic flagged |
| Primary nav | included standalone Technology | Technology folded into Capabilities |
| Optional pages | Team/Careers, Insights/News | Careers, Insights |
| Profile parts 5 to 9 | Agritech, IT Services, Technology, Projects, Team | Next360 Organic, Selected Projects, IT Services, Technology Capabilities, SLICK |
| Quality/Security/Governance | standalone part 11 | absent, folds into Delivery Capabilities |
| Homepage emphasis | even | Organic gets strongest emphasis |

Unchanged from FRD: two verticals, 15-member team, corporate story first,
credibility rules, no IT-support-only framing, no Saudi/Riyadh-specific
positioning unless separately required, stack of Next.js, Tailwind and
TypeScript.

---

## 16. Consistency rule

The same corporate story must appear across:

- the website
- the company profile document
- the project portfolio
- future technical proposals

This file is the single source for that story. If a fact changes here, it
changes everywhere. No section may restate a company fact in its own words
when a canonical value exists in this document.

## 17. Approval checklist

- [ ] All T-01 to T-27 register rows resolved or explicitly accepted as
      published placeholders.
- [ ] Establishment year confirmed.
- [ ] Company story and history approved.
- [ ] Next360 Organic blocks 2 to 14 supplied and approved.
- [ ] Five project entries complete and statuses verified.
- [ ] Agritech capabilities verified.
- [ ] IT Services capabilities verified.
- [ ] SLICK product functionality verified, Organize positioning approved.
- [ ] Technology mapping verified per row.
- [ ] Team composition confirmed for the 15 members.
- [ ] Contact and legal information verified.
- [ ] Brand assets supplied.
- [ ] Optional pages decision made.
- [ ] Final content approved before publication.

Nothing ships publicly until this checklist clears.
