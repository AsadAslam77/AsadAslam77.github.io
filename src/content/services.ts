import type { Service } from "@/types/service";

export const servicesIntro = {
  eyebrow: "Services",
  title: "Web, mobile and commerce. Built end to end.",
} as const;

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web development",
    group: "Web & commerce",
    description:
      "Fast, SEO-friendly websites and web apps with Next.js, React and Node.js, from landing pages to platforms with login and user roles.",
    delivers: "a live site",
    gets: ["Responsive on every device", "SEO-ready pages", "Deployed and live"],
    stack: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind"],
    cta: { label: "Start a web project", href: "#contact" },
    preview: "web",
    caption: ["One codebase", "Every screen size →"],
    imageAlt: "A website built with Next.js shown on desktop and phone",
  },
  {
    slug: "online-stores",
    title: "Online stores",
    group: "Web & commerce",
    description:
      "Shopify stores, including custom headless storefronts with filtering, wishlists, customer accounts and order tracking.",
    delivers: "a store ready to sell",
    gets: ["Product filtering and search", "Customer accounts and wishlist", "Order tracking"],
    stack: ["Shopify", "Hydrogen", "React", "TypeScript"],
    cta: { label: "Plan a store", href: "#contact" },
    preview: "store",
    caption: ["Shopify and Hydrogen", "Ready to sell →"],
    imageAlt: "An online store built on Shopify shown on desktop and phone",
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    group: "Apps",
    description:
      "iOS and Android apps from one codebase, with Firebase for login, data and real-time updates.",
    delivers: "an app ready for testing and store submission",
    gets: [
      "iOS and Android from one codebase",
      "Login and real-time data",
      "Ready for store submission",
    ],
    stack: ["React Native", "Expo", "Firebase"],
    cta: { label: "Discuss an app", href: "#contact" },
    preview: "mobile",
    caption: ["React Native and Expo", "iOS and Android →"],
    imageAlt: "A mobile app built with React Native shown on two phones",
  },
  {
    slug: "backends-admin-panels",
    title: "Backends and admin panels",
    group: "Backend & AI",
    description:
      "Authentication, databases, APIs and dashboards to manage products, orders and users.",
    delivers: "a dashboard your team can use",
    gets: ["Secure login and user roles", "Database and APIs", "An admin dashboard to manage data"],
    stack: ["Firebase", "REST APIs", "Node.js"],
    cta: { label: "Build a dashboard", href: "#contact" },
    preview: "backend",
    caption: ["Firebase and Node.js", "Built for your team →"],
    imageAlt: "An admin dashboard with a sidebar, charts and a data table",
  },
  {
    slug: "ai-features",
    title: "AI features",
    group: "Backend & AI",
    description:
      "Add AI to a product, such as product recommendations through the OpenAI API.",
    delivers: "a working AI feature",
    gets: [
      "A working AI feature inside your product",
      "API keys kept on the server",
      "Connected to your existing data",
    ],
    stack: ["OpenAI API", "Cloud Functions", "Firebase"],
    cta: { label: "Add AI to my product", href: "#contact" },
    preview: "ai",
    caption: ["OpenAI API", "Inside your product →"],
    imageAlt: "An AI assistant suggesting products in a chat interface",
  },
];