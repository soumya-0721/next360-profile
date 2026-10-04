/*
  Single source of truth for navigation and company facts.

  Content authority: the owner's company profile FRD, pasted 2026-10-01.
  Credibility rules: FRD section 8 + antislop R-17/R-38. Only verified facts
  publish. Anything unconfirmed renders as the honest token [TO BE CONFIRMED].
*/

export type NavItem = {
  label: string;
  href: string;
};

/* Honesty token used wherever the source marks information unknown. */
export const TBC = "[TO BE CONFIRMED]";

/* Desktop pill nav. Reference layout carries four links plus a contact pill. */
export const primaryNav: NavItem[] = [
  { label: "Agritech", href: "/agritech" },
  { label: "IT Services", href: "/it-services" },
  { label: "Next360 Organic", href: "/organic" },
  { label: "Projects", href: "/projects" },
];

/* The lime pill inside the link row. */
export const navCta: NavItem = { label: "Contact Us", href: "/contact" };

/* The right-hand cluster where the reference keeps its account actions. */
export const navAsideText: NavItem = { label: "About", href: "/about" };
export const navAsideCta: NavItem = { label: "Get In Touch", href: "/contact" };

/*
  Every published route. Used by the mobile menu and the footer. Optional
  Careers and Insights are deliberately absent until confirmed (antislop
  R-24: no nav link to a page that does not exist).
*/
export const allRoutes: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Next360", href: "/about" },
  { label: "Agritech", href: "/agritech" },
  { label: "IT Services", href: "/it-services" },
  { label: "Next360 Organic", href: "/organic" },
  { label: "Projects", href: "/projects" },
  { label: "SLICK Technologies", href: "/slick" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Next360", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Ventures",
    links: [
      { label: "Next360 Organic", href: "/organic" },
      { label: "Agritech", href: "/agritech" },
      { label: "IT Services", href: "/it-services" },
      { label: "SLICK Technologies", href: "/slick" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Request Profile", href: "/contact" },
      { label: "Partnership Enquiry", href: "/contact" },
      { label: "General Enquiry", href: "/contact" },
      { label: "Execution Model", href: "/about#methodology" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Legal Notice", href: "/legal" },
    ],
  },
];

export const legalRoutes: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Legal Notice", href: "/legal" },
];

export const company = {
  name: "Next360",
  legalName: "Next360 Organic Products Pvt. Ltd.",
  established: "",
  tagline: "Building Technology. Creating Measurable Value.",
  heroLede:
    "Digital commerce, AI, business technology and infrastructure solutions built for real-world execution.",
  positioning:
    "A technology-driven company building digital platforms, business software, AI-enabled solutions, marketplace infrastructure and practical technology systems for real-world businesses, institutions and communities.",
  buildStatement:
    "Next360 is a technology organization that builds products, platforms and businesses.",
  notVendorStatement: "Next360 is not simply a software development vendor.",
  descriptor: "Technology & Digital Solutions Organization",
  /*
    Owner-supplied 2026-10-01. The approach line is published verbatim from
    the source; the four-word form is the display label.
  */
  approach: "Identify the problem, build the solution, deploy it, create measurable value.",
  vision:
    "Build a practical technology ecosystem that makes trusted commerce, connected infrastructure and digital business solutions accessible and scalable.",
  mission:
    "Build real-world products, improve business operations and digital visibility, and create long-term technology partnerships through modern software.",
  philosophy:
    "Technology should not only look innovative. It should create measurable value.",
  /*
    Owner-supplied 2026-10-01, superseding the earlier single-count field:
    15+ developers, 6+ interns, 30+ professionals across the extended network.
  */
  team: {
    developers: "15+",
    interns: "6+",
    extended: "30+",
  },
  contact: {
    email: "office@next360.in",
    phone: "+91-9989163332",
    /*
      wa.me needs the number as digits with the country code and no punctuation.
      Derived from the published phone above rather than restated, so the two
      can never disagree.
    */
    whatsapp: "919989163332",
    address:
      "T-Hub Phase 2 Launch, 20 Inorbit Mall Road, Vittal Rao Nagar, Madhapur, Hyderabad, Telangana 500081",
    addressShort: "T-Hub Phase 2, Hyderabad",
    website: "https://next360.in",
  },
  registration: {
    cin: "U47912TS2026PTC212259",
    pan: "AALCN3880H",
    gstin: "36AALCN3880H1Z3",
  },
} as const;

/*
  FRD 2026-10-01: six technology and business domains replace the earlier
  two-vertical framing as the primary story. Each entry is quoted or closely
  paraphrased from the source; nothing here is inferred.
*/
export const technologyDomains = [
  {
    index: "01",
    name: "Digital Commerce",
    icon: "fa-solid fa-store",
    summary:
      "Next360 Organic Marketplace: verified organic, natural and eco-friendly products with a focus on traceability and trusted commerce.",
    items: [
      "Next360 Organic Marketplace",
      "Verified organic, natural and eco-friendly products",
      "Traceability and trusted commerce",
    ],
  },
  {
    index: "02",
    name: "Business Technology",
    icon: "fa-solid fa-diagram-project",
    summary:
      "Hospital management systems, CRM platforms, IVR systems and workflow automation.",
    items: [
      "Hospital management systems",
      "CRM platforms",
      "IVR systems",
      "Workflow automation",
    ],
  },
  {
    index: "03",
    name: "AI & Computer Vision",
    icon: "fa-solid fa-eye",
    summary:
      "AI-assisted software development, facial recognition, intelligent vehicle detection and automated monitoring systems.",
    items: [
      "AI-assisted software development",
      "Facial recognition",
      "Intelligent vehicle detection",
      "Automated monitoring systems",
    ],
  },
  {
    index: "04",
    name: "Digital Infrastructure",
    icon: "fa-solid fa-tower-broadcast",
    summary:
      "EV charging solutions, CCTV infrastructure and digital screen infrastructure.",
    items: [
      "EV charging solutions",
      "CCTV infrastructure",
      "Digital screen infrastructure",
    ],
  },
  {
    index: "05",
    name: "Digital Advertising",
    icon: "fa-solid fa-rectangle-ad",
    summary:
      "Digital screens, advertising inventory and transit advertising solutions.",
    items: [
      "Digital screens",
      "Advertising inventory",
      "Transit advertising solutions",
    ],
  },
  {
    index: "06",
    name: "Digital Growth",
    icon: "fa-solid fa-arrow-trend-up",
    summary:
      "SEO, search visibility and technology-enabled digital growth solutions.",
    items: [
      "SEO",
      "Search visibility",
      "Technology-enabled digital growth",
    ],
  },
] as const;

/* Execution model, owner-supplied 2026-10-01. */
export const executionModel = [
  {
    no: "01",
    title: "Identify",
    note: "Understand the real operating problem before any engineering starts.",
    icon: "fa-solid fa-magnifying-glass",
    image: "/images/planning.jpg",
  },
  {
    no: "02",
    title: "Build",
    note: "Engineer the required solution against that problem.",
    icon: "fa-solid fa-code",
    image: "/images/engineering.jpg",
  },
  {
    no: "03",
    title: "Deploy",
    note: "Put the solution into a real operating environment.",
    icon: "fa-solid fa-rocket",
    image: "/images/infrastructure.jpg",
  },
  {
    no: "04",
    title: "Measure",
    note: "Evaluate whether it creates useful business value.",
    icon: "fa-solid fa-chart-line",
    image: "/images/support.jpg",
  },
] as const;

/*
  Mentorship, owner-supplied 2026-10-01. Roles published as stated.
  photo: portrait at the exact path below — drop the file in and the
  marquee picks it up with no code change. Until then it renders initials.
  Expected files:
    /public/images/mentors/mentor-google.jpg
    /public/images/mentors/mentor-intown.jpg
    /public/images/mentors/mentor-thub.jpg
*/
export const mentorship = [
  {
    name: "Santanu Bhattacherjee",
    title: "AI Trust & Safety Technical Program Manager",
    org: "Google",
    note: "Mentors Next360 on responsible technology, AI governance and innovation. Works across Trust & Safety, Search and Gemini, and is an IICA Certified Independent Director and IIM Lucknow alumnus.",
    photo: "/images/mentors/mentor-santanu.jpg",
    profile:
      "https://www.linkedin.com/in/connect-to-santanu?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Vinod Reddy Vembuluru",
    title: "Founder & CEO, INTOWN",
    org: "INTOWN",
    note: "Founder & CEO, INTOWN. Fifteen-plus years in sales and marketing, including the successful implementation of three startups, guiding Next360 on go-to-market, business development and growth.",
    photo: "/images/mentors/mentor-vinod.jpg",
    profile:
      "https://www.linkedin.com/in/vinodintown?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Santhan",
    title: "Project Manager",
    org: "Google Gemini",
    note: "Project Manager. Guiding Next360 on technology, product development and industry practices.",
    photo: "/images/mentors/mentor-google.jpg",
    profile: "",
  },
  {
    name: "T-Hub",
    title: "Startup Mentor",
    org: "T-Hub",
    note: "Startup ecosystem mentorship, guidance and industry connections through T-Hub, one of India's prominent startup incubation and innovation ecosystems.",
    photo: "/images/mentors/mentor-thub.jpg",
    profile: "",
  },
];

/*
  Strategic collaborators and service partners, owner-supplied 2026-10-01.
  logo: mark at the exact path below — drop the file in and the marquee
  picks it up with no code change. Until then it renders the name.
  Expected files:
    /public/images/partners/partner-acs.png
    /public/images/partners/partner-logiq-gen.png
    /public/images/partners/partner-intown.png
*/
export const collaborators = [
  {
    name: "ACS",
    note: "Technology and project collaboration, including government-facing infrastructure projects.",
    logo: "/images/partners/partner-acs.png",
  },
  {
    name: "Logiq Gen – AI Nestham",
    note: "Technology and AI-oriented collaboration supporting digital and AI initiatives.",
    logo: "/images/partners/partner-logiq-gen.png",
  },
  {
    name: "INTOWN",
    note: "Sales, marketing, business development and strategic growth collaboration.",
    logo: "/images/partners/partner-intown.png",
  },
];

export const collaboratorNote =
  "The partner network enables Next360 to combine internal product development capabilities with specialized expertise across technology, AI, sales, marketing and implementation.";

/*
  Panel members. Roles taken from the owner's LinkedIn extracts, 2026-10-03.

  Tenure is published only where the source showed it, and always scoped to
  the named company ("8+ years at EPAM Systems"), never as total career
  length. Three profiles did not come with a URL, so profile is empty and the
  card simply omits the link rather than guessing one.

  photo: drop a portrait at the path below to replace the initials.
  Expected files:
    /public/images/mentors/member-santanu.jpg
    /public/images/mentors/member-indrasena.jpg
    /public/images/mentors/member-vikram.jpg
    /public/images/mentors/member-saiteja.jpg
    /public/images/mentors/member-vinod.jpg
*/
export const panelMembers = [
  {
    name: "Indrasena R S",
    role: "Project Technical Lead, AI & Data Solutions",
    org: "Bell Integration",
    note: "Specialises in AI, data solutions, Generative AI, AIOps and ERP applications across Workday, PeopleSoft and ITIL. Joined Bell Integration in 2023.",
    photo: "/images/mentors/member-indrasena.jpg",
    profile:
      "https://www.linkedin.com/in/indrasena-r-s-a1478a87?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    name: "Vikram Vembuluru",
    role: "Development Team Lead",
    org: "EPAM Systems",
    note: "Eight-plus years at EPAM Systems, progressing from Senior Software Engineer to Development Team Lead across software engineering and technical leadership.",
    photo: "/images/mentors/member-vikram.jpg",
    profile: "",
  },
  {
    name: "Sri Saiteja Annareddy",
    role: "Founder",
    org: "Cero Hero",
    note: "Founder with nine-plus years of experience and a keynote speaker on sustainability. Stanford Graduate School of Business, focused on sustainability strategy, behaviour change and citizen engagement.",
    photo: "/images/mentors/member-saiteja.jpg",
    profile: "",
  },
  {
    name: "Vinod",
    role: "Founder & CEO",
    org: "INTOWN",
    note: "Founder and CEO of INTOWN with experience in sales, marketing, business development and strategic growth initiatives.",
    photo: "/images/mentors/member-vinod.jpg",
    profile: "",
  },
  {
    name: "Santhan",
    role: "Project Manager",
    org: "INTOWN",
    note: "Project Manager contributing to project planning, execution and delivery across strategic initiatives.",
    photo: "/images/mentors/member-santhan.jpg",
    profile: "",
  },
];

/* Industry and academic collaboration, owner-supplied 2026-10-01. */
export const academicCollaboration = [
  {
    title: "Student Internships",
    note: "Opportunities for students to gain practical exposure to real-world technology projects.",
  },
  {
    title: "Industry Projects",
    note: "Industry-oriented projects involving software, AI, computer vision, digital platforms and business technology.",
  },
  {
    title: "Workshops & Training",
    note: "Technical and entrepreneurship-oriented sessions for students.",
  },
  {
    title: "Faculty & Industry Interaction",
    note: "Knowledge-sharing sessions with industry professionals and technology teams.",
  },
  {
    title: "Project-Based Learning",
    note: "Opportunities for students to work on practical technology problems and products.",
  },
  {
    title: "Placement & Career Engagement",
    note: "Potential engagement with students based on organizational requirements and suitable skill sets.",
  },
] as const;

/*
  Leadership, owner-supplied 2026-10-03.

  Roles are published exactly as supplied. bios are published only once the
  owner supplies the wording, so nothing is invented about the people. photo
  expects a portrait at the exact path below; the card falls back to
  initials until the file lands.
  Expected files:
    /public/images/leadership/samhith-reddy-sangam.jpg
    /public/images/leadership/shivaganesh-gajavelli.jpg
*/
export const leadership = [
  {
    name: "Samhith Reddy Sangam",
    role: "Chief Executive Officer",
    bio: "",
    photo: "/images/leadership/ceo-samhith.jpg",
    profile: "",
  },
  {
    name: "Shivaganesh Gajavelli",
    role: "Co-Founder & Chief Technology Officer",
    bio: "",
    photo: "/images/leadership/cto-shivaganesh.jpg",
    profile: "",
  },
];

/*
  Company snapshot table, owner-supplied 2026-10-01.
*/
export const companySnapshot = [
  { label: "Company", value: company.legalName },
  { label: "Flagship Venture", value: "Next360 Organic Marketplace" },
  { label: "Extended Network", value: "30+ Professionals" },
  { label: "Core Developers", value: "15+" },
  { label: "Interns", value: "6+" },
  { label: "Sub-company", value: "Slick Technologies" },
  {
    label: "Key Collaborators",
    value: "ACS, Logiq Gen – AI Nestham, INTOWN",
  },
  {
    label: "Mentorship",
    value: "Google Gemini Project Manager, INTOWN CEO, T-Hub",
  },
  {
    label: "Core Domains",
    value: "AI, Software, Digital Commerce, Infrastructure & Automation",
  },
  { label: "Registered Office", value: company.contact.addressShort },
  { label: "Website", value: "next360.in" },
  { label: "Email", value: company.contact.email },
  { label: "CIN", value: company.registration.cin },
] as const;

export const corporateStructure = {
  root: "NEXT360",
  rootNote: company.descriptor,
  branches: [
    {
      name: "DIGITAL COMMERCE",
      note: "",
      children: [{ name: "NEXT360 ORGANIC MARKETPLACE", note: "Flagship venture" }],
    },
    {
      name: "BUSINESS TECHNOLOGY",
      note: "",
      children: [
        { name: "Hospital management systems", note: "" },
        { name: "CRM and IVR systems", note: "" },
      ],
    },
    {
      name: "AI & COMPUTER VISION",
      note: "",
      children: [
        { name: "Facial recognition", note: "" },
        { name: "Intelligent vehicle detection", note: "" },
      ],
    },
    {
      name: "DIGITAL INFRASTRUCTURE",
      note: "",
      children: [
        { name: "EV charging solutions", note: "" },
        { name: "CCTV and digital screens", note: "" },
      ],
    },
    {
      name: "DIGITAL ADVERTISING",
      note: "",
      children: [
        { name: "Advertising inventory", note: "" },
        { name: "Transit advertising", note: "" },
      ],
    },
    {
      name: "SLICK TECHNOLOGIES",
      note: "Sub-company of Next360",
      children: [
        { name: "SlickCode", note: "" },
        { name: "SlickSEO", note: "" },
        { name: "Slixo", note: "" },
        { name: "Organize", note: "" },
        { name: "Let's Connect", note: "" },
      ],
    },
  ],
} as const;

/* The six-domain intersection behind the flagship. Unchanged from source. */
export const organicDomains = [
  "Agriculture",
  "Organic Products",
  "Digital Commerce",
  "Technology",
  "Operations",
  "Customer Experience",
] as const;

/*
  The fourteen required content blocks for Next360 Organic. Block 01 carries
  approved content; the rest stay on the honesty token until supplied.
*/
export const organicBlocks = [
  {
    no: "01",
    title: "What Next360 Organic is",
    approved:
      "Flagship venture: a verification-first marketplace focused on organic, natural and eco-friendly products, connecting consumers, farmers, producers, retailers and institutions through verification, traceability and trusted commerce.",
    detail:
      "It is built and operated by Next360 as its flagship venture, and it applies the same discipline the company applies to client work: identify the operating problem, build the solution, deploy it, then measure whether it creates value.",
    status: "Approved structure, detail pending",
  },
  {
    no: "02",
    title: "Why it was created",
    approved:
      "Organic products are sold on trust, but trust is usually unverifiable at the point of purchase.",
    detail:
      "A buyer cannot confirm from a listing whether a product is genuinely organic, which farm it came from, or how it was handled between harvest and shelf. Next360 Organic was created to close that gap: every product carries its verification and its origin, so the claim can be checked rather than believed.",
    status: "Approved structure, detail pending",
  },
  {
    no: "03",
    title: "Problem and opportunity",
    approved:
      "The problem is a trust gap in organic commerce, not a lack of products.",
    detail:
      "Producers who work to a genuine standard struggle to prove it at retail scale, and buyers who want to pay for verified organic have no reliable way to check. The opportunity sits between them: a platform where verification is the entry condition for selling, and where institutional buyers can source with the documentation they need.",
    status: "Approved structure, detail pending",
  },
  {
    no: "04",
    title: "Vision",
    approved:
      "Make verified organic commerce the default, not the exception.",
    detail:
      "A marketplace where traceability is infrastructure rather than paperwork, where a farmer, a producer and a retailer can all trade on the same proof, and where a buyer can trace a product back to its source without asking anyone.",
    status: "Approved structure, detail pending",
  },
  {
    no: "05",
    title: "How technology is used",
    approved:
      "Technology is used to make verification practical at marketplace scale.",
    detail:
      "Seller onboarding, product listing, certification records and traceability data are handled as structured platform data rather than manual paperwork. This is the same engineering Next360 applies across its business technology and AI practices, applied to a supply chain it is building for itself.",
    status: "Approved structure, detail pending",
  },
  {
    no: "06",
    title: "Product and category ecosystem",
    approved:
      "Spans agriculture, organic products, digital commerce, technology, operations and customer experience.",
    detail:
      "The six areas are not separate initiatives. Agricultural sourcing feeds product verification, verification feeds the catalogue, the catalogue drives commerce, and operations and customer experience decide whether a first purchase turns into a repeat one.",
    status: "Approved structure, detail pending",
  },
  {
    no: "07",
    title: "Platform operations",
    approved:
      "Sellers are onboarded through a verification process before they can list.",
    detail:
      "Verification is the gate, not an afterthought added later. Seller onboarding, product approval and certification records are handled in-platform so that the state of any listing is known at all times.",
    status: "Approved structure, detail pending",
  },
  {
    no: "08",
    title: "Customer experience",
    approved:
      "Built for buyers who intend to verify, and for institutions that must.",
    detail:
      "A consumer should be able to see why a product qualifies before buying it. An institutional buyer needs the same proof in a form it can use. Both are served by putting verification data in front of the product rather than behind a support request.",
    status: "Approved structure, detail pending",
  },
  {
    no: "09",
    title: "Vendor and producer ecosystem",
    approved: "Applies where relevant to the initiative.",
    detail:
      "Farmers and producers are the supply side of the marketplace, and onboarding them with verification is what makes the catalogue trustworthy downstream. Next360 runs academic and industry collaboration programmes that also build relationships with the people who work in this supply chain.",
    status: "Approved structure, detail pending",
  },
  {
    no: "10",
    title: "Delivery and fulfilment",
    approved: "Applies where relevant to the initiative.",
    detail:
      "Delivery is treated as part of the same chain the marketplace makes visible, so origin and handling stay connected to the product through to the buyer.",
    status: "Approved structure, detail pending",
  },
  {
    no: "11",
    title: "Technology infrastructure",
    approved:
      "Platform engineering, product data and traceability records.",
    detail:
      "Next360 builds its own software products and deploys platforms for real operating environments, including the Mallaram Digital Village platform for a Telangana gram panchayat and CCTV infrastructure on the Outer Ring Road. That deployment experience is what this initiative is built on.",
    status: "Approved structure, detail pending",
  },
  {
    no: "12",
    title: "Platform capabilities",
    approved:
      "Product verification, certification visibility, seller onboarding, product-level traceability and trusted commerce.",
    detail:
      "These five capabilities are the platform. Everything else described above exists to make them work in a live marketplace.",
    status: "Approved structure, detail pending",
  },
  {
    no: "13",
    title: "Current status",
    approved: "",
    detail:
      "The only status vocabulary published for this initiative is the actual one. Nothing is listed as live, in development or launched until it is, and no coverage, user or outcome figure is published until it can be evidenced.",
    status: "Status pending",
  },
  {
    no: "14",
    title: "Future direction",
    approved:
      "Deepen verification coverage before widening the catalogue.",
    detail:
      "The credible direction is extending verification across more categories and more producer regions, and supporting institutional sourcing, rather than adding listings faster than the verification behind them can be maintained.",
    status: "Approved structure, detail pending",
  },
] as const;

/* Status vocabulary, actual status only. */
export const statusVocabulary = [
  "Live",
  "Active Development",
  "In Development",
  "Prototype",
  "Concept",
] as const;

export type Project = {
  slug: string;
  name: string;
  category: string;
  /*
    Which of the six technology domains this deployment proves. Lets a domain
    card show shipped work instead of restating its own summary as a bullet
    list (antislop R-11: never repeat the same claim twice).
  */
  domains: readonly string[];
  flagship: boolean;
  confirmed: boolean;
  overview: string;
  purpose: string;
  solution: string;
  capabilities: string[];
  technology: string[];
  role: string;
  status: string;
};

/*
  Ten confirmed projects from the owner's FRD (2026-10-01), flagship first.
  Every field below is quoted or directly stated by the source; nothing is
  inferred from a name.
*/
export const projects: Project[] = [
  {
    slug: "next360-organic",
    name: "Next360 Organic Marketplace",
    category: "Digital Commerce",
    domains: ["Digital Commerce"],
    flagship: true,
    confirmed: true,
    overview:
      "A verification-first marketplace focused on organic, natural and eco-friendly products, connecting consumers, farmers, producers, retailers and institutions.",
    purpose:
      "Trusted commerce through verification and traceability rather than unverified listings.",
    solution:
      "Product verification, certification visibility, seller onboarding and product-level traceability.",
    capabilities: [
      "Product verification",
      "Certification visibility",
      "Seller onboarding",
      "Product-level traceability",
      "Trusted commerce",
    ],
    technology: [],
    role: "Flagship venture built and operated by Next360.",
    status: TBC,
  },
  {
    slug: "mallaram-digital-village",
    name: "Mallaram Digital Village",
    category: "Digital Governance & Rural Technology",
    domains: ["Digital Infrastructure"],
    flagship: false,
    confirmed: true,
    overview:
      "A digital governance and rural technology platform designed and developed for Mallaram Gram Panchayat, Telangana. It brings digital governance, citizen services, village information and technology-enabled rural services together through a unified digital ecosystem. The initiative has received national-level recognition.",
    purpose:
      "Bring village information, citizen services and rural technology services into one accessible platform.",
    solution:
      "A single publicly accessible platform covering governance, services, alerts, complaints and village data.",
    capabilities: [
      "Digital village information",
      "Smart farming services",
      "Weather and agricultural alerts",
      "Public complaint management",
      "Village funds and project information",
      "Digital village mapping",
      "Education-related digital services",
      "Village infrastructure information",
      "Real-time digital updates",
    ],
    technology: [],
    role: "Designed and developed by Next360 for Mallaram Gram Panchayat.",
    status: "Live",
  },
  {
    slug: "orr-intelligent-cctv",
    name: "ORR Intelligent CCTV & Vehicle Monitoring",
    category: "Government Infrastructure & Computer Vision",
    domains: ["AI & Computer Vision", "Digital Infrastructure"],
    flagship: false,
    confirmed: true,
    overview:
      "An official state government project involving CCTV infrastructure along the Outer Ring Road (ORR), delivered through Next360's collaboration with ACS.",
    purpose:
      "Support traffic monitoring and violation evidence workflows across the Outer Ring Road.",
    solution:
      "Computer vision applied to deployed CCTV infrastructure for detection, recording and evidence processing.",
    capabilities: [
      "Intelligent vehicle detection",
      "Vehicle identification and recording",
      "Automated capture of vehicle-related information",
      "Digital monitoring",
      "Traffic-violation evidence workflows",
      "Challan-related data processing",
    ],
    technology: [],
    role: "Technology collaboration with ACS on a state government project.",
    status: TBC,
  },
  {
    slug: "facial-recognition-attendance",
    name: "Facial Recognition Attendance System",
    category: "AI & Business Process Automation",
    domains: ["AI & Computer Vision", "Business Technology"],
    flagship: false,
    confirmed: true,
    overview:
      "A facial recognition-based attendance system developed by Next360 to automate attendance management.",
    purpose: "Automate attendance marking and remove manual attendance handling.",
    solution:
      "Face-based identification feeding centralized attendance records and reporting.",
    capabilities: [
      "Face-based identification",
      "Automated attendance marking",
      "Digital attendance records",
      "Centralized attendance management",
      "Automated reporting",
      "Reduced manual intervention",
    ],
    technology: [],
    role: "Designed and developed by Next360.",
    status: TBC,
  },
  {
    slug: "hospital-management-system",
    name: "Hospital Management System",
    category: "Business Technology",
    domains: ["Business Technology"],
    flagship: false,
    confirmed: true,
    overview:
      "Technology solutions for hospital administration and operational workflows.",
    purpose: "Help hospital organizations digitize and manage operational processes.",
    solution: "Hospital administration and operational workflow software.",
    capabilities: ["Hospital administration", "Operational workflow management"],
    technology: [],
    role: "Developed by Next360.",
    status: TBC,
  },
  {
    slug: "ev-charging-solutions",
    name: "EV Charging Solutions",
    category: "Digital Infrastructure",
    domains: ["Digital Infrastructure"],
    flagship: false,
    confirmed: true,
    overview:
      "Technology initiatives supporting EV charging station operations and digital management.",
    purpose:
      "Contribute to the development of connected mobility infrastructure.",
    solution: "EV charging station operations and digital management technology.",
    capabilities: [
      "Charging station operations",
      "Digital management",
      "Connected mobility infrastructure",
    ],
    technology: [],
    role: "Developed by Next360.",
    status: TBC,
  },
  {
    slug: "digital-screens-transit-advertising",
    name: "Digital Screens & Transit Advertising",
    category: "Digital Advertising",
    domains: ["Digital Advertising"],
    flagship: false,
    confirmed: true,
    overview:
      "Digital screen infrastructure, advertising inventory and transit-screen deployment connecting physical infrastructure with digital advertising technology.",
    purpose: "Connect physical screen inventory with digital advertising operations.",
    solution: "Screen infrastructure, inventory management and transit deployment.",
    capabilities: [
      "Digital screen infrastructure",
      "Advertising inventory",
      "Transit-screen deployment",
    ],
    technology: [],
    role: "Delivered by Next360.",
    status: TBC,
  },
  {
    slug: "crm-ivr-systems",
    name: "CRM & IVR Systems",
    category: "Business Technology",
    domains: ["Business Technology"],
    flagship: false,
    confirmed: true,
    overview:
      "Business communication and workflow solutions covering CRM and IVR.",
    purpose: "Manage leads, customers, follow-ups and automated call handling.",
    solution: "CRM and IVR systems wired into business communication workflows.",
    capabilities: [
      "CRM",
      "Lead management",
      "Customer management",
      "Follow-ups",
      "IVR",
      "Automated call routing",
      "Business communication workflows",
    ],
    technology: [],
    role: "Built by Next360.",
    status: TBC,
  },
  {
    slug: "vanyabhumi",
    name: "Vanyabhumi",
    category: "Digital Commerce",
    domains: ["Digital Commerce"],
    flagship: false,
    confirmed: true,
    overview:
      "A digital e-commerce platform built by Next360 for selling products online through an owned storefront.",
    purpose:
      "Give sellers an owned online channel to list products and take orders directly.",
    solution:
      "Storefront, product catalog, cart, checkout and order management in one platform.",
    capabilities: [
      "Product catalog",
      "Cart and checkout",
      "Order management",
    ],
    technology: [],
    role: "Designed and developed by Next360.",
    status: "Live",
  },
  {
    slug: "ayurvena",
    name: "Ayurvena",
    category: "Business Technology",
    domains: ["Business Technology"],
    flagship: false,
    confirmed: true,
    overview:
      "An outpatient (OP) appointment booking system connecting patients with hospitals and clinics.",
    purpose:
      "Replace phone and queue-based OP booking with online doctor search and slot booking.",
    solution:
      "Doctor search, OP slot booking, appointment reminders and payments in one system.",
    capabilities: [
      "Doctor search",
      "OP slot booking",
      "Appointment reminders",
      "Payments",
    ],
    technology: [],
    role: "Designed and developed by Next360.",
    status: "In Development",
  },
];

/* Owner-confirmed 2026-10-01: SLICK Technologies is a Next360 sub-company. */
export const slickDescriptor =
  "SLICK Technologies, a Next360 sub-company building its own software products.";

/*
  Five products. Let's Connect was added by the owner's FRD of 2026-10-01.
  Functionality stays unverified, so only the stated scope publishes.
*/
export const slickProducts = [
  {
    name: "SlickCode",
    scope: [
      "AI-assisted software development platform",
      "Developer productivity",
      "Developer tooling",
    ],
    rule: "Only verified or planned functionality is described.",
    positioning: "",
    status: TBC,
  },
  {
    name: "Let's Connect",
    scope: [
      "Digital networking and connection platform",
      "Connections",
    ],
    rule: "Only verified functionality is described.",
    positioning: "",
    status: TBC,
  },
  {
    name: "SlickSEO",
    scope: [
      "AI-assisted SEO and search optimization platform",
      "Search optimization",
      "Marketing technology",
    ],
    rule: "Only verified functionality is described.",
    positioning: "",
    status: TBC,
  },
  {
    name: "Slixo",
    scope: [
      "Billing, invoicing and customer management product",
      "Business operations",
      "Business workflows",
    ],
    rule: "Presented as a Slick Technologies product.",
    positioning: "",
    status: TBC,
  },
  {
    name: "Organize",
    scope: [
      "Personal productivity and information management product",
      "Information management",
    ],
    rule: "Never described as a clone, duplicate or inspired product.",
    positioning: "Save now. Find anytime.",
    status: TBC,
  },
] as const;

/*
  The two vertical capability inventories, kept for the /agritech and
  /it-services routes. The six technology domains above are the primary
  story everywhere else.
*/
export const capabilityLists = [
  {
    index: "01",
    title: "Agritech",
    icon: "fa-solid fa-seedling",
    note: "Next360 Organic sits under this vertical as its flagship initiative.",
    items: [
      "Agriculture technology",
      "Organic products",
      "Digital commerce",
      "Agricultural ecosystems",
      "Supply chains",
      "Market access",
      "Agriculture platforms",
    ],
    verification: TBC,
  },
  {
    index: "02",
    title: "IT Services",
    icon: "fa-solid fa-microchip",
    note: "Enterprise and technology services delivered as a managed capability.",
    items: [
      "Software development",
      "Web and mobile applications",
      "Backend engineering",
      "Enterprise software",
      "IT infrastructure",
      "User and endpoint support",
      "Service desk",
      "Monitoring",
      "Asset management",
      "Managed technology services",
      "Technical projects",
    ],
    verification: TBC,
  },
] as const;

export const verticals = [
  {
    index: "01",
    name: "Agritech",
    href: "/agritech",
    summary:
      "Agriculture technology, organic products, digital commerce, agricultural ecosystems, supply chains, market access and agriculture platforms.",
    flagship: "Next360 Organic",
    points: capabilityLists[0]!.items.slice(0, 3),
    verification: TBC,
  },
  {
    index: "02",
    name: "IT Services",
    href: "/it-services",
    summary:
      "Software development, backend engineering, enterprise software, IT infrastructure, support and managed technology services.",
    flagship: "",
    points: capabilityLists[1]!.items.slice(0, 3),
    verification: TBC,
  },
] as const;

/* The thirteen-part corporate profile document. */
export const profileArchitecture = [
  { no: "01", title: "Cover", note: "Identity and positioning." },
  { no: "02", title: "Company Overview", note: "Who Next360 is and what it does." },
  { no: "03", title: "Company Story", note: "Establishment, journey and milestones." },
  { no: "04", title: "Business Verticals", note: "Six technology and business domains." },
  { no: "05", title: "Next360 Organic", note: "Flagship venture, in full." },
  { no: "06", title: "Selected Projects", note: "Proven projects and deployments." },
  { no: "07", title: "IT Services", note: "Software, infrastructure, support, managed services." },
  { no: "08", title: "Technology Capabilities", note: "Technology connected to real work." },
  { no: "09", title: "SLICK Technologies", note: "Sub-company of Next360 and its five products." },
  { no: "10", title: "Team", note: "30+ extended network, 15+ developers, 6+ interns." },
  { no: "11", title: "Delivery Capabilities", note: "Identify, build, deploy, measure." },
  { no: "12", title: "Future Direction", note: "Credible forward-looking direction." },
  { no: "13", title: "Contact", note: "Corporate contact information." },
] as const;

export const teamCapabilityAreas = [
  "Artificial Intelligence & Computer Vision",
  "Web & Mobile Application Development",
  "Software & SaaS Development",
  "Digital Marketplaces",
  "Business Automation",
  "CRM & IVR Systems",
  "Digital Infrastructure",
  "EV Technology",
  "Digital Advertising",
  "SEO & Digital Growth",
] as const;

export const deliverySteps = executionModel;

/*
  Illustrative photography stored in /public/images and licensed for reuse
  (CC0 / Unsplash License). None of it shows a Next360 facility, team,
  client or deployment; the disclosure stays on the image itself via
  PhotoBand's alt text (antislop R-23).
*/
export const photos = {
  hero: "/images/hero-farm.jpg",
  field: "/images/field-landscape.jpg",
  haybales: "/images/field-haybales.jpg",
  organic: "/images/organic-market.jpg",
  market: "/images/market-stall.jpg",
  produce: "/images/produce.jpg",
  code: "/images/code-screen.jpg",
  team: "/images/team.jpg",
  teamWork: "/images/team-work.jpg",
  infrastructure: "/images/infrastructure.jpg",
  engineering: "/images/engineering.jpg",
  planning: "/images/planning.jpg",
  support: "/images/support.jpg",
} as const;
