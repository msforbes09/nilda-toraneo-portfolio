/**
 * Site content: the single source every component reads.
 *
 * NILDA MUST REPLACE (placeholder data, flagged `sample: true`):
 *   - proof.tiles[0]   Quantified result tile ("ACoS 38% → 24%"): an invented, plausible number.
 *   - testimonials[0]  J. Whitmore quote: invented client and quote.
 *   - testimonials[1]  R. Castellano quote: invented client and quote.
 *   - work[0]          Product research sheet: generated sample image and caption.
 *   - work[1]          Supplier chat: generated sample image and caption.
 *   - work[2]          Optimized listing: generated sample image and caption.
 *   - resume           Resume download: placeholder file.
 *   - pricing          Pricing slot: hidden, no tiers until she supplies real numbers.
 *
 * NILDA MUST APPROVE (drafted copy, flagged `copyToApprove: true`):
 *   - hero.headline         Drafted from her LinkedIn headline.
 *   - about.bio[1]          "a year of experience" changed to "over two years of experience"
 *                           (LinkedIn shows Amazon Account Manager since Jun 2024).
 *   - services[*].question  The seller's pain-point question each service answers.
 *   - process               The three "How I work" steps.
 *
 * Everything else is hers, verbatim from her current site and LinkedIn (gathered 2026-09-27).
 */

export type Sample<T> = T & { sample: true };

export type Link = { label: string; href: string };

export type NavItem = { id: string; label: string };

export type Hero = {
  headline: string;
  copyToApprove: true;
  subline: string;
  primaryCta: Link;
  secondaryCta: Link;
  credentialTag: string;
  headshot: { src: string; alt: string };
};

export type ProofTile = {
  label: string;
  /** Final number, animated by the count-up. */
  value: number;
  /** Starting number for before → after results. */
  from?: number;
  suffix?: string;
  /** Full text as read without animation. */
  display: string;
  context?: string;
  sample: boolean;
};

export type About = {
  bio: string[];
  copyToApprove: true;
  copyNote: string;
  audience: string;
};

export type Experience = {
  role: string;
  employer: string;
  detail?: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", or null for the current role. */
  end: string | null;
};

export type Service = {
  name: string;
  question: string;
  copyToApprove: true;
  description: string;
};

export type ProcessStep = { title: string; body: string };

export type ToolGroup = { name: string; tools: string[] };

export type Certification = {
  name: string;
  issuer: string;
  /** "YYYY-MM" */
  issued: string;
};

export type Training = { name: string };

export type WorkItem = Sample<{
  title: string;
  caption: string;
  image: string;
  alt: string;
}>;

export type Testimonial = Sample<{
  quote: string;
  name: string;
  attribution: string;
}>;

export type PricingTier = { name: string; price: string; includes: string[] };

export type Site = {
  meta: { title: string; description: string; siteUrl: string };
  person: {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedin: string;
    linkedinHeadline: string;
  };
  nav: NavItem[];
  hero: Hero;
  proof: { tiles: ProofTile[] };
  about: About;
  experience: Experience[];
  services: Service[];
  process: { steps: ProcessStep[]; copyToApprove: true };
  tools: ToolGroup[];
  certifications: Certification[];
  trainings: Training[];
  work: WorkItem[];
  testimonials: Testimonial[];
  pricing: Sample<{ tiers: PricingTier[] }>;
  resume: Sample<Link>;
  footer: { tagline: string };
};

const linkedinHeadline =
  "I help Amazon sellers scale their business through expert Account Management, data-driven Product Research, and efficient Admin Support.";

export const site: Site = {
  meta: {
    title: "Nilda Toraneo — Amazon Account Manager & Admin Virtual Assistant",
    description:
      "Nilda Toraneo is an Amazon Account Manager and Admin Virtual Assistant helping Amazon FBA sellers and brand owners with account health, product research, listings and PPC.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },

  person: {
    name: "Nilda Toraneo",
    title: "Amazon Account Manager | Admin Virtual Assistant",
    location: "Alfonso, Calabarzon, Philippines",
    email: "nildatoraneo@gmail.com",
    linkedin: "https://www.linkedin.com/in/nilda-toraneo/",
    linkedinHeadline,
  },

  nav: [
    { id: "results", label: "Results" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "process", label: "How I work" },
    { id: "certifications", label: "Certifications" },
    { id: "work", label: "Sample work" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    headline:
      "Keep your Amazon account healthy, your listings ranking, and your ad spend earning.",
    copyToApprove: true,
    subline: linkedinHeadline,
    primaryCta: { label: "Book a discovery call", href: "#contact" },
    secondaryCta: { label: "See the work", href: "#work" },
    credentialTag: "Amazon Account Manager · Admin VA",
    headshot: {
      src: "/images/nilda-headshot.webp",
      alt: "Portrait of Nilda Toraneo",
    },
  },

  proof: {
    tiles: [
      {
        label: "Sample result · PPC",
        from: 38,
        value: 24,
        suffix: "%",
        display: "ACoS 38% → 24%",
        context: "in 90 days on a sample FBA account",
        sample: true,
      },
      {
        label: "Amazon Account Manager",
        value: 2,
        suffix: "+",
        display: "2+ years as Amazon Account Manager",
        context: "Since Jun 2024",
        sample: false,
      },
      {
        label: "Amazon certifications",
        value: 4,
        display: "4 Amazon certifications",
        context: "AmazeNation, Helium 10, Amazon Ads, My Amazon Guy",
        sample: false,
      },
      {
        label: "Customer service",
        value: 7,
        display: "7 years customer service",
        context: "iQor, Mar 2015 – Mar 2022",
        sample: false,
      },
    ],
  },

  about: {
    bio: [
      "Managing an Amazon business can be overwhelming, but you don't have to do it alone. I'm here to help you streamline operations, optimize performance, and free up your time so you can focus on growth.",
      "With over two years of experience as an Amazon Account Manager, Product Research Specialist, and Admin VA, I bring a data-driven and strategic approach to managing your business. I thrive on solving challenges, optimizing processes, and ensuring account health. Plus, I value integrity and trust in all business dealings.",
    ],
    copyToApprove: true,
    copyNote:
      'Her original reads "With a year of experience"; updated to "over two years" to match LinkedIn (Amazon Account Manager since Jun 2024).',
    audience: "For Amazon FBA sellers and brand owners.",
  },

  experience: [
    {
      role: "Amazon Account Manager",
      employer: "Spot A Deal",
      detail: "UK, remote, full-time",
      start: "2024-06",
      end: null,
    },
    {
      role: "Virtual Assistant | Graphic Artist | Animator",
      employer: "Upwork",
      detail: "Freelance",
      start: "2023-06",
      end: "2024-02",
    },
    {
      role: "Customer Service Representative",
      employer: "iQor",
      start: "2015-03",
      end: "2022-03",
    },
  ],

  services: [
    {
      name: "Product Research",
      question: "Which product is actually worth launching?",
      copyToApprove: true,
      description:
        "Identifying a potential winning product is crucial for success in an Amazon business. By implementing my tested strategies, I can assist you in discovering a product that not only has potential but is also validated through various data sources, including market trends, demand, search volume, and more.",
    },
    {
      name: "Inventory Management",
      question: "Will you run out of stock, or pay too much to store it?",
      copyToApprove: true,
      description:
        "Monitoring inventory levels is essential to ensure adequate stock availability for your product. It's crucial to develop plans and explore options, especially regarding storage and timing, to guarantee a continuous flow of orders and sales.",
    },
    {
      name: "Supplier Sourcing",
      question: "Can you trust this supplier, and is the deal a good one?",
      copyToApprove: true,
      description:
        "I offer assistance in negotiating terms, verifying the legitimacy of suppliers, and sourcing unique suppliers that offer excellent deals, fostering long-term partnerships.",
    },
    {
      name: "PPC Campaigns",
      question: "Is your ad spend bringing in sales, or just clicks?",
      copyToApprove: true,
      description:
        "It's essential to analyze the reports to understand which strategies can be applied in both auto and manual campaigns effectively.",
    },
    {
      name: "Graphic Design",
      question:
        "Do your images and A+ content catch the eye and meet Amazon's rules?",
      copyToApprove: true,
      description:
        "I specialize in assisting FBA Sellers in crafting visually captivating Amazon A+ content and attention-grabbing elements that not only capture interest but also meet Amazon's criteria.",
    },
    {
      name: "Keyword Research",
      question: "Are shoppers finding you with the words they actually search?",
      copyToApprove: true,
      description:
        "This activity plays a significant role in optimizing product listings, achieved through the process of collecting, analyzing, and organizing keywords. These steps enable the creation of a keyword repository that can also be utilized for other Amazon-related tasks such as PPC campaigns.",
    },
    {
      name: "Product Listing Optimization",
      question: "Does your listing turn its visitors into buyers?",
      copyToApprove: true,
      description:
        "Specializing in this area, I can assist you in enhancing your product listing through copywriting, crafting compelling content, and leveraging tools such as Frankenstein, Scribbles, and Cerebro within Helium10.",
    },
    {
      name: "Customer Service",
      question: "Do your customers feel heard when something goes wrong?",
      copyToApprove: true,
      description:
        "Implementing exceptional customer service is vital for the reputation of your Amazon brand. Let's prioritize listening to our customers and ensuring they feel valued.",
    },
  ],

  process: {
    copyToApprove: true,
    steps: [
      {
        title: "Kickoff",
        body: "A discovery call to learn your account, your goals and what is taking up your time, then an agreed list of priorities.",
      },
      {
        title: "Weekly reporting",
        body: "A short weekly update: what was done, what changed in the account, and what comes next.",
      },
      {
        title: "Access on your terms",
        body: "I work through the user permissions you grant in Seller Central and your tools, and you can change or remove them at any time.",
      },
    ],
  },

  tools: [
    {
      name: "Amazon",
      tools: [
        "Seller Central",
        "Advertising Console",
        "Helium 10",
        "SellerAmp SAS",
        "MBS Retriever",
        "Keepa",
        "Google Trends",
      ],
    },
    {
      name: "Design & video",
      tools: [
        "Photoshop",
        "Illustrator",
        "Animate CC",
        "Toon Boom Harmony",
        "DaVinci Resolve",
        "Canva",
      ],
    },
    {
      name: "Office",
      tools: [
        "MS Office",
        "Google Sheets/Docs",
        "Hootsuite",
        "Asana",
        "Hubdoc",
      ],
    },
  ],

  certifications: [
    {
      name: "Amazon Seller VA Masterclass",
      issuer: "AmazeNation",
      issued: "2024-06",
    },
    { name: "Freedom Ticket 3.0", issuer: "Helium 10", issued: "2024-04" },
    {
      name: "Sponsored Ads Certification",
      issuer: "Amazon Ads",
      issued: "2024-05",
    },
    { name: "SEO Course", issuer: "My Amazon Guy", issued: "2024-06" },
  ],

  trainings: [{ name: "Amazon PPC Masterclass (The Ultimate PPC Guide)" }],

  work: [
    {
      title: "Product research sheet",
      caption:
        "Sample: a product research sheet comparing demand, search volume and competition for candidate products.",
      image: "/samples/product-research-sheet.svg",
      alt: "Sample spreadsheet listing candidate products with demand, search volume and competition columns.",
      sample: true,
    },
    {
      title: "Supplier chat",
      caption:
        "Sample: a supplier conversation negotiating unit price, minimum order quantity and lead time.",
      image: "/samples/supplier-chat.svg",
      alt: "Sample chat between a seller's assistant and a supplier about price, minimum order and lead time.",
      sample: true,
    },
    {
      title: "Optimized listing",
      caption:
        "Sample: an optimized product listing with a keyword-rich title, bullet points and A+ content.",
      image: "/samples/optimized-listing.svg",
      alt: "Sample Amazon product listing with an optimized title, bullet points and product images.",
      sample: true,
    },
  ],

  testimonials: [
    {
      quote:
        "Nilda keeps our listings and inventory on track and sends a clear update every week. I spend far less time in Seller Central than I used to.",
      name: "J. Whitmore",
      attribution: "J. Whitmore — Sample client, UK-based FBA seller",
      sample: true,
    },
    {
      quote:
        "She reworked our keywords and campaign structure and explained every change. Our ads are easier to manage and we know where the budget goes.",
      name: "R. Castellano",
      attribution: "R. Castellano — Sample client, US-based brand owner",
      sample: true,
    },
  ],

  pricing: { sample: true, tiers: [] },

  resume: {
    sample: true,
    label: "Download resume (PDF)",
    href: "/resume-sample.pdf",
  },

  footer: {
    tagline:
      "Empowering your business with tailored insights for smart decisions and steady growth.",
  },
};
