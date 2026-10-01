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

/* Mentorship, owner-supplied 2026-10-01. Roles published as stated. */
export const mentorship = [
  {
    name: "Google Gemini Project Manager",
    note: "Expert mentorship in technology, product development and industry practices.",
  },
  {
    name: "INTOWN CEO",
    note: "15+ years of experience in sales and marketing, with experience in the successful implementation of three startups, providing guidance in sales, marketing, business development and growth.",
  },
  {
    name: "T-Hub",
    note: "Startup ecosystem mentorship, guidance and industry connections through T-Hub, one of India's prominent startup incubation and innovation ecosystems.",
  },
] as const;

/* Strategic collaborators and service partners, owner-supplied 2026-10-01. */
export const collaborators = [
  {
    name: "ACS",
    note: "Technology and project collaboration, including government-facing infrastructure projects.",
  },
  {
    name: "Logiq Gen – AI Nestham",
    note: "Technology and AI-oriented collaboration supporting digital and AI initiatives.",
  },
  {
    name: "INTOWN",
    note: "Sales, marketing, business development and strategic growth collaboration.",
  },
] as const;

export const collaboratorNote =
  "The partner network enables Next360 to combine internal product development capabilities with specialized expertise across technology, AI, sales, marketing and implementation.";

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

/* Company snapshot table, owner-supplied 2026-10-01. */
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
    value: "AI, Computer Vision, Commerce, Software, Infrastructure, AdTech",
  },
  { label: "Registered Office", value: company.contact.addressShort },
  { label: "Website", value: "next360.in" },
  { label: "Email", value: company.contact.email },
  { label: "CIN", value: company.registration.cin },
] as const;

export const storyHierarchy = [
  { level: "01", name: "NEXT360", note: "Parent technology organization" },
  {
    level: "02",
    name: "Six technology domains",
    note: "Commerce, business technology, AI, infrastructure, advertising, growth",
  },
  {
    level: "03",
    name: "NEXT360 ORGANIC",
    note: "Flagship venture",
  },
  { level: "04", name: "Proven projects and deployments", note: "Portfolio breadth" },
  {
    level: "05",
    name: "SLICK TECHNOLOGIES",
    note: "Next360 sub-company",
  },
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
export const organicCertification = {
  certified: true,
  firstInIndia: true,
  verificationFirst: true,
  traceability: true,
  schemes: ["NPOP", "Jaivik Bharat"],
} as const;

export const organicBlocks = [
  {
    no: "01",
    title: "What Next360 Organic is",
    approved:
      "Flagship venture: a verification-first marketplace focused on organic, natural and eco-friendly products, connecting consumers, farmers, producers, retailers and institutions through verification, traceability and trusted commerce.",
    detail: TBC,
    status: "Approved structure, detail pending",
  },
  {
    no: "02",
    title: "Why it was created",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "03",
    title: "Problem and opportunity",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "04",
    title: "Vision",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "05",
    title: "How technology is used",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "06",
    title: "Product and category ecosystem",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "07",
    title: "Platform operations",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "08",
    title: "Customer experience",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "09",
    title: "Vendor and producer ecosystem",
    approved: "Applies where relevant to the initiative.",
    detail: TBC,
    status: TBC,
  },
  {
    no: "10",
    title: "Delivery and fulfilment",
    approved: "Applies where relevant to the initiative.",
    detail: TBC,
    status: TBC,
  },
  {
    no: "11",
    title: "Technology infrastructure",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "12",
    title: "Platform capabilities",
    approved:
      "Product verification, certification visibility, seller onboarding, product-level traceability and trusted commerce.",
    detail: TBC,
    status: TBC,
  },
  {
    no: "13",
    title: "Current status",
    approved: "",
    detail: TBC,
    status: TBC,
  },
  {
    no: "14",
    title: "Future direction",
    approved: "",
    detail: TBC,
    status: TBC,
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
  Eight confirmed projects from the owner's FRD (2026-10-01), flagship first,
  then the three earlier names still awaiting detail. Every field below is
  quoted or directly stated by the source; nothing is inferred from a name.
*/
export const projects: Project[] = [
  {
    slug: "next360-organic",
    name: "Next360 Organic Marketplace",
    category: "Digital Commerce",
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
    flagship: false,
    confirmed: true,
    overview:
      "A digital governance and rural technology platform designed and developed for Mallaram Gram Panchayat, Telangana. It brings digital governance, citizen services, village information and technology-enabled rural services together through a unified digital ecosystem.",
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
    category: TBC,
    flagship: false,
    confirmed: false,
    overview: TBC,
    purpose: TBC,
    solution: TBC,
    capabilities: [],
    technology: [],
    role: TBC,
    status: TBC,
  },
  {
    slug: "ayurvena",
    name: "Ayurvena",
    category: TBC,
    flagship: false,
    confirmed: false,
    overview: TBC,
    purpose: TBC,
    solution: TBC,
    capabilities: [],
    technology: [],
    role: TBC,
    status: TBC,
  },
  {
    slug: "leader-portfolios",
    name: "Leader Portfolios",
    category: TBC,
    flagship: false,
    confirmed: false,
    overview: TBC,
    purpose: TBC,
    solution: TBC,
    capabilities: [],
    technology: [],
    role: TBC,
    status: TBC,
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

/*
  Technology is published only when connected to a real project or
  capability. No generic logo list. Every row starts unverified.
*/
export const technologyMap = [
  { tech: "Next.js", connection: TBC, verified: false },
  { tech: "React", connection: TBC, verified: false },
  { tech: "React Native", connection: TBC, verified: false },
  { tech: "TypeScript", connection: TBC, verified: false },
  { tech: "Node.js", connection: TBC, verified: false },
  { tech: "NestJS", connection: TBC, verified: false },
  { tech: "Python", connection: TBC, verified: false },
  { tech: "PostgreSQL", connection: TBC, verified: false },
  { tech: "Cloud platforms", connection: TBC, verified: false },
  { tech: "Docker", connection: TBC, verified: false },
  { tech: "AI and LLM technologies", connection: TBC, verified: false },
  {
    tech: "ManageEngine technologies",
    connection: "Candidate link to monitoring, service desk and asset management",
    verified: false,
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

/* The banned-fabrication list, kept where code can see it. */
export const neverFabricate = [
  "Clients",
  "Revenue",
  "Users",
  "Market share",
  "Certifications",
  "Partnerships",
  "Awards",
  "Years of experience",
  "Employee counts",
  "Project outcomes",
  "Geographic presence",
  "Product launch status",
] as const;

export const teamCapabilityAreas = [
  "Leadership",
  "Software Engineering",
  "Product Development",
  "IT Services",
  "Infrastructure",
  "Design",
  "Operations",
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
