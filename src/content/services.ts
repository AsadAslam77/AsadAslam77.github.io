import type { Service } from "@/types/service";

export const servicesIntro = { title: "Services" } as const;

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web development",
    description:
      "Fast, SEO-friendly websites and web apps with Next.js, React and Node.js, from landing pages to platforms with login and user roles.",
    delivers: "a live site",
    cta: { label: "Start a web project", href: "#contact" },
    imageAlt: "GetUnityCodes marketplace",
    placeholder: "[Screenshot: GetUnityCodes.com]",
  },
  {
    slug: "online-stores",
    title: "Online stores",
    description:
      "Shopify stores, including custom headless storefronts with Hydrogen: filtering, wishlists, customer accounts and order tracking.",
    delivers: "a store ready to sell",
    cta: { label: "Plan a store", href: "#contact" },
    imageAlt: "Wajood storefront",
    placeholder: "[Screenshot: Wajood]",
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    description:
      "iOS and Android apps with React Native and Expo, using Firebase for login, data and real-time updates.",
    delivers: "a working app, ready for testing and store submission",
    cta: { label: "Discuss an app", href: "#contact" },
    imageAlt: "PetNove mobile app",
    placeholder: "[Screenshot: PetNove]",
  },
  {
    slug: "backends-admin-panels",
    title: "Backends and admin panels",
    description:
      "Authentication, databases, APIs and dashboards to manage products, orders and users.",
    delivers: "a dashboard your team can use",
    cta: { label: "Build a dashboard", href: "#contact" },
    imageAlt: "GetUnityCodes admin panel",
    placeholder: "[Screenshot: GetUnityCodes admin]",
  },
  {
    slug: "ai-features",
    title: "AI features",
    description:
      "Add AI to a product, such as product recommendations through the OpenAI API.",
    delivers: "a working AI feature",
    cta: { label: "Add AI to my product", href: "#contact" },
    imageAlt: "PetNove AI recommendations",
    placeholder: "[Screenshot: PetNove recommendations]",
  },
];