/**
 * Every piece of copy on the site, taken from `content.md`.
 *
 * Nothing here is invented: if a fact is not in `content.md` it is marked as a
 * placeholder rather than guessed. `npm run placeholders` lists every one.
 *
 * Each collection is written as `... as const satisfies readonly T[]`:
 *   - `satisfies` checks the literal against the type, so a misspelled
 *     category or a missing field fails the build
 *   - `as const` keeps the exact literal types instead of widening them to
 *     `string`, and makes the whole structure readonly
 * Writing `const projects: Project[] = [...]` instead would type-check but
 * throw the literal types away.
 */

/* ---------------------------------------------------------------------------
   Placeholders

   A missing value is an object, not an empty string. That is deliberate: an
   empty string renders as nothing and slips through silently, while an object
   is not a valid React child, so TypeScript refuses to compile
   `{project.screenshot}` until the missing case is handled with `resolve()`.
   --------------------------------------------------------------------------- */

export type Unresolved<T = string> =
  /** No value yet. Asad has to supply one. */
  | { readonly unresolved: "fill-in"; readonly note: string }
  /** A value exists but has not been verified, so it may still change. */
  | {
      readonly unresolved: "confirm";
      readonly note: string;
      readonly value: T;
    };

/** Marks a value that does not exist yet. */
export function fillIn<T = string>(note: string): Unresolved<T> {
  return { unresolved: "fill-in", note };
}

/** Marks a value that exists but is unverified. */
export function confirm<T>(value: T, note: string): Unresolved<T> {
  return { unresolved: "confirm", value, note };
}

export function isUnresolved<T>(v: T | Unresolved<T>): v is Unresolved<T> {
  return typeof v === "object" && v !== null && "unresolved" in v;
}

/**
 * The only way to get a renderable value out of a possibly-unresolved field.
 * Returns `null` for a "fill-in", so the caller has to render a placeholder
 * slot rather than nothing at all.
 */
export function resolve<T>(v: T | Unresolved<T>): T | null {
  if (!isUnresolved(v)) return v;
  return v.unresolved === "confirm" ? v.value : null;
}

/* ---------------------------------------------------------------------------
   Types
   --------------------------------------------------------------------------- */

export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export type Category = "Web" | "E-commerce" | "Mobile";

export type Project = {
  readonly name: string;
  readonly categories: readonly Category[];
  readonly link: string | Unresolved;
  readonly description: string;
  readonly role: string;
  readonly tech: readonly string[] | Unresolved<readonly string[]>;
  readonly hosting?: string | Unresolved;
  readonly features?: readonly string[];
  readonly screenshot: string | Unresolved;
};

export type Service = {
  readonly title: string;
  readonly description: string;
  /** Always a `confirm` item: the five lines are Asad's draft wording. */
  readonly delivers: Unresolved<string>;
  readonly cta: NavLink;
};

export type ProcessStep = {
  readonly step: number;
  readonly title: string;
  /** Always a `confirm` item: "How I work" is a draft in content.md. */
  readonly body: Unresolved<string>;
};

export type SkillGroup = {
  readonly label: string;
  readonly items: readonly string[];
};

export type Role = {
  readonly title: string;
  readonly company: string;
  readonly period: string;
  readonly bullets: readonly string[];
};

/* ---------------------------------------------------------------------------
   Files that still have to be added to the repo. These are not marked
   unresolved, because the only question is whether the file is on disk:
   `npm run placeholders` checks the path and reports it while it is missing.
   --------------------------------------------------------------------------- */

export const assets = {
  cv: {
    path: "public/Asad_CV.pdf",
    href: "/Asad_CV.pdf",
    label: "Download CV",
  },
} as const;

/* ---------------------------------------------------------------------------
   Identity and SEO
   --------------------------------------------------------------------------- */

export const identity = {
  name: "Muhammad Asad",
  shortName: "Asad",
  title: "Full Stack Developer",
  site: "https://asaddev.me",
  github: "https://github.com/AsadAslam77",
  linkedin: "https://www.linkedin.com/in/asad-fullstack-dev/",
  email: confirm(
    "aasadasl77@gmail.com",
    "check the spelling of the email address",
  ),
  location: fillIn("city, country"),
} as const;

export const seo = {
  title: "Muhammad Asad | Full Stack Developer",
  description:
    "Full stack developer building Next.js and Firebase web apps, Shopify storefronts and React Native apps. Available for freelance projects and full-time roles.",
} as const;

/* ---------------------------------------------------------------------------
   Header
   --------------------------------------------------------------------------- */

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavLink[];

export const header = {
  logo: "asaddev.me",
  cta: { label: "Hire me", href: "#contact" },
} as const satisfies { readonly logo: string; readonly cta: NavLink };

/* ---------------------------------------------------------------------------
   Hero
   --------------------------------------------------------------------------- */

export const hero = {
  roleLine: "Full Stack Developer",
  name: "Muhammad Asad",
  intro:
    "From MVPs to enterprise platforms, I build high-performance web, mobile, and e-commerce products with seamless integrations and intelligent AI-powered capabilities.",

  buttons: [
    { label: "Hire me", href: "#contact" },
    { label: "View projects", href: "#work" },
  ],
  card: {
    photo: fillIn("profile photo for the hero card"),
    name: "Muhammad Asad",
    role: "Full Stack Developer",
    chips: ["Next.js", "Firebase", "Shopify", "React Native"],
  },
} as const;

/* ---------------------------------------------------------------------------
   Statement
   --------------------------------------------------------------------------- */

export const statement = {
  main: "I build the whole product, not just the part you see.",
  support:
    "Interface, backend and deployment, handled by one developer from first conversation to launch.",
  chips: ["Next.js", "React", "React Native", "Firebase", "Shopify", "Node.js"],
} as const;

/* ---------------------------------------------------------------------------
   Selected work
   --------------------------------------------------------------------------- */

export const workHeading = "Selected work";

export const categories = [
  "Web",
  "E-commerce",
  "Mobile",
] as const satisfies readonly Category[];

/** The filter tabs are only rendered once there are this many projects. */
export const workFilterThreshold = 6;

export const projects = [
  {
    name: "Wajood",
    categories: ["E-commerce"],
    link: "https://wajood.us",
    description:
      "A headless Shopify store for a Pakistani streetwear brand, with filtering, wishlist, accounts and order tracking.",
    role:
      "Full stack. Built the Hydrogen storefront and the server-side integration with Shopify's Storefront, Customer Account and Admin APIs.",
    tech: ["Shopify Hydrogen", "React", "TypeScript", "Tailwind CSS"],
    hosting: confirm("Shopify Oxygen", "confirm the host"),
    screenshot: fillIn("screenshot of the Wajood home page"),
  },
  {
    name: "GetUnityCodes.com",
    categories: ["Web", "E-commerce"],
    link: "https://getunitycodes.com",
    description:
      "A live marketplace for Unity game source code, with an admin panel for products, orders and users.",
    role: "Full stack. Built the storefront, the admin panel and the backend.",
    tech: fillIn<readonly string[]>("tech stack for GetUnityCodes.com"),
    screenshot: fillIn("screenshot of the GetUnityCodes.com home page"),
  },
  {
    name: "PetNove",
    categories: ["Mobile"],
    link: fillIn("mark PetNove private, or add a link"),
    description:
      "A pet care app with health tracking and AI product recommendations through Firebase Cloud Functions.",
    role: "Full stack. Built the React Native app and the Firebase backend.",
    features: [
      "Login and signup",
      "Pet profiles",
      "Weight tracking with charts",
      "Real-time health notes",
      "AI recommendations cached in Firestore",
    ],
    tech: ["Expo", "React Native", "TypeScript", "Firebase", "OpenAI API"],
    screenshot: fillIn("screenshot of the PetNove weight screen"),
  },
] as const satisfies readonly Project[];

/* ---------------------------------------------------------------------------
   Services. Every button goes to the Contact section.
   --------------------------------------------------------------------------- */

export const services = [
  {
    title: "Web development",
    description:
      "Fast, SEO-friendly websites and web apps with Next.js, React and Node.js, from landing pages to platforms with login and user roles.",
    delivers: confirm("a live site", "confirm the Delivers line"),
    cta: { label: "Start a web project", href: "#contact" },
  },
  {
    title: "Online stores",
    description:
      "Shopify stores, including custom headless storefronts with Hydrogen: filtering, wishlists, customer accounts and order tracking.",
    delivers: confirm("a store ready to sell", "confirm the Delivers line"),
    cta: { label: "Plan a store", href: "#contact" },
  },
  {
    title: "Mobile apps",
    description:
      "iOS and Android apps with React Native and Expo, using Firebase for login, data and real-time updates.",
    delivers: confirm(
      "a working app, ready for testing and store submission",
      "confirm the Delivers line",
    ),
    cta: { label: "Discuss an app", href: "#contact" },
  },
  {
    title: "Backends and admin panels",
    description:
      "Authentication, databases, APIs and dashboards to manage products, orders and users.",
    delivers: confirm(
      "a dashboard your team can use",
      "confirm the Delivers line",
    ),
    cta: { label: "Build a dashboard", href: "#contact" },
  },
  {
    title: "AI features",
    description:
      "Add AI to a product, such as product recommendations through the OpenAI API.",
    delivers: confirm("a working AI feature", "confirm the Delivers line"),
    cta: { label: "Add AI to my product", href: "#contact" },
  },
] as const satisfies readonly Service[];

/* ---------------------------------------------------------------------------
   How I work. Draft wording, so all three bodies are confirm items.
   --------------------------------------------------------------------------- */

export const processHeading = "How I work";

export const process = [
  {
    step: 1,
    title: "Talk",
    body: confirm(
      "You tell me what you need, who it is for and when you need it. I ask questions until the scope is clear.",
      "confirm the How I work step",
    ),
  },
  {
    step: 2,
    title: "Quote",
    body: confirm(
      "I send a quote with the scope and timeline. We start once you approve it.",
      "confirm the How I work step",
    ),
  },
  {
    step: 3,
    title: "Build and deliver",
    body: confirm(
      "I build in stages and show you progress along the way, then deliver the finished project.",
      "confirm the How I work step",
    ),
  },
] as const satisfies readonly ProcessStep[];

/* ---------------------------------------------------------------------------
   About. A section after Services, not a separate page (see PLAN.md).
   --------------------------------------------------------------------------- */

export const about = {
  greeting: "Hi there, I'm Muhammad Asad",
  /** Completed at render time with `identity.location`. */
  roleLinePrefix: "Full Stack Developer based in",
  paragraphs: [
    "I build websites, online stores and mobile apps with Next.js, React, Firebase and Shopify. I handle both the interface and the backend, so one person can take a project from idea to launch. At EastWhiz, I build platforms with authentication, role-based access and fast, SEO-friendly pages.",
    "Outside work, I build my own products: Wajood, a live headless Shopify store for a Pakistani streetwear brand, GetUnityCodes.com, a marketplace for Unity game source code, and PetNove, a pet care mobile app with AI recommendations. I'm available for freelance projects and full-time roles.",
  ],
  hireCta: { label: "Hire me", href: "#contact" },
} as const;

/* ---------------------------------------------------------------------------
   Experience, education and skills
   --------------------------------------------------------------------------- */

export const experience = [
  {
    title: "Full Stack Web Developer",
    company: "EastWhiz",
    period: "2025 to present",
    bullets: [
      "Built and deployed a platform with Next.js and Firebase, including authentication, database and hosting.",
      "Implemented secure authentication and role-based access control.",
      "Used static site generation to improve load speed and SEO.",
      "Worked with designers and stakeholders on scalable, maintainable solutions.",
    ],
  },
] as const satisfies readonly Role[];

export const education = {
  degree: "BS Computer Science",
  institution: "University of Sahiwal",
  period: "2022 to 2026",
} as const;

export const skills = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  { label: "Mobile", items: ["React Native", "Expo"] },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "Firebase",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    label: "E-commerce and AI",
    items: ["Shopify Hydrogen", "Shopify APIs", "OpenAI API"],
  },
  { label: "Tools", items: ["Git", "GitHub Actions", "Vercel"] },
] as const satisfies readonly SkillGroup[];

/* ---------------------------------------------------------------------------
   Contact and footer. No form: a static export has no server, so the email
   button is a mailto: link.
   --------------------------------------------------------------------------- */

export const contact = {
  heading: "Let's work together.",
  line: "Hiring for a full stack role or have a project in mind? Send me a message.",
  labels: {
    email: "Email me",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "Download CV",
  },
} as const;

export const footer = "© 2026 Muhammad Asad";
