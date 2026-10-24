import type { Fact, SkillGroup, TimelineItem } from "@/types/experience";

export const experienceMeta = {
  path: "/experience/",
  title: "Experience, Projects and Skills",
  description:
    "Full stack developer experience: web, mobile and e-commerce projects, with skills in Next.js, React, Node.js, Firebase, GraphQL and PostgreSQL.",
} as const;

export const experienceHero = {
  eyebrow: "Experience",
  title: "Where I’ve worked and what I’ve shipped.",
  lead: "I’m a full stack developer who builds web, mobile and e-commerce products end to end: the interface, the backend, the database and the deployment. This page is the short version of how I got here and what I can do for you.",
  secondaryCta: { label: "See my work →", href: "/#work" },
  availability: "Open to freelance projects and full-time roles",
} as const;

export const snapshot: Fact[] = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Now", value: "Full Stack Web Developer at EastWhiz" },
  { label: "Focus", value: "Web apps, online stores and mobile apps" },
  { label: "Studied", value: "BS Computer Science, University of Sahiwal" },
];

export const jumpLinks = [
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const sections = {
  journey: { eyebrow: "Journey", title: "From classroom to production." },
  projects: { eyebrow: "Projects", title: "What I built along the way." },
  skills: { eyebrow: "Skills", title: "The tools I build with." },
} as const;

export const timeline: TimelineItem[] = [
  {
    id: "eastwhiz",
    tag: "FULL-TIME",
    current: true,
    start: "2025",
    title: "Full Stack Web Developer",
    org: "EastWhiz",
    orgNote: "Web, app and games company",
    orgUrl: "https://www.eastwhiz.com/",
    summary:
      "I work across the whole stack: shaping interfaces, building the backend and getting products live, for a company that ships web, mobile and game projects.",
    highlights: [
      "Build and ship production websites and web apps with Next.js, React and Node.js, from interface to deployment.",
      "Design and develop the EastWhiz company website, including the service pages, the About page and the content, responsive and SEO-friendly.",
      "Use Firebase for authentication, data and Cloud Functions, and connect front ends to REST and GraphQL APIs.",
      "Model and query relational data with PostgreSQL and SQL.",
    ],
    chipsLabel: "Stack",
    chips: ["Next.js", "React", "Node.js", "Firebase", "GraphQL", "PostgreSQL"],
  },
  {
    id: "university",
    tag: "EDUCATION",
    start: "2022",
    end: "2026",
    title: "BS Computer Science",
    org: "University of Sahiwal",
    summary:
      "A computer science foundation in data structures, databases and software engineering, which I apply in every project I build.",
    chipsLabel: "Coursework",
    chips: ["Data structures", "Databases", "Software engineering", "Web development"],
  },
];

export const nextChapter = {
  eyebrow: "Next chapter",
  title: "Your project could be next.",
  text: "Freelance builds and full-time roles are both welcome.",
  cta: "Hire me",
} as const;

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    text: "Fast, accessible interfaces that search engines can read.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend and APIs",
    text: "Secure server logic and APIs that stay out of the way.",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases",
    text: "Relational and document data, modelled for how the product is used.",
    skills: ["PostgreSQL", "SQL", "MongoDB", "Firebase Firestore"],
  },
  {
    title: "Mobile and commerce",
    text: "One codebase for iOS and Android, and stores that sell.",
    skills: ["React Native", "Expo", "Shopify", "Hydrogen"],
  },
  {
    title: "AI and tooling",
    text: "AI features wired in safely, shipped through clean workflows.",
    skills: ["OpenAI API", "Cloud Functions", "Git and GitHub"],
  },
  {
    title: "Practices",
    text: "Search visibility, speed and usability built in, not bolted on.",
    skills: ["SEO", "Responsive design", "Accessibility", "Performance"],
  },
];

export const experienceCta = {
  title: "Let’s build something people use.",
  text: "Tell me about your project and I’ll reply with a clear plan and quote.",
} as const;