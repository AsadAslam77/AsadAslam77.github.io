import { site } from "./site";

export const footer = {
  cta: {
    title: "Let’s build something people use.",
    text: "Tell me about your project and I’ll reply with a clear plan and quote.",
    email: site.email,
    primary: { label: "Hire me", href: "/#contact" },
    secondary: { label: "Download CV", href: site.cvUrl },
  },
  brandText:
    "Full stack developer building web apps, online stores and mobile apps, from interface to database.",
  availability: "Open to freelance projects and full-time roles",
  columns: [
    {
      title: "Site",
      links: [
        { label: "Work", href: "/#work" },
        { label: "Services", href: "/#services" },
        { label: "Experience", href: "/experience/" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web development", href: "/#service-web-development" },
        { label: "Online stores", href: "/#service-online-stores" },
        { label: "Mobile apps", href: "/#service-mobile-apps" },
        { label: "AI features", href: "/#service-ai-features" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: site.email, href: `mailto:${site.email}`, external: false },
        { label: "GitHub", href: site.github, external: true },
        { label: "LinkedIn", href: site.linkedin, external: true },
        { label: "Download CV", href: site.cvUrl, external: false, download: true },
      ],
    },
  ],
  stack: "Next.js · Firebase · GitHub Pages",
} as const;