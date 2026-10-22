import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "wajood",
    title: "Wajood",
    category: "E-commerce",
    description:
      "A headless Shopify store for a Pakistani streetwear brand, with filtering, wishlist, accounts and order tracking.",
    tech: ["Shopify Hydrogen", "React", "TypeScript", "Tailwind"],
    href: "https://wajood.us",
    hrefLabel: "wajood.us",
    imageAlt: "Wajood storefront home page",
    placeholder: "[Screenshot: wajood-home.png]",
  },
  {
    slug: "getunitycodes",
    title: "GetUnityCodes.com",
    category: "Web",
    description:
      "A live marketplace for Unity game source code, with an admin panel for products, orders and users.",
    tech: [], // TODO: add the real tech stack
    href: "https://getunitycodes.com",
    hrefLabel: "getunitycodes.com",
    imageAlt: "GetUnityCodes marketplace home page",
    placeholder: "[Screenshot: getunitycodes-home.png]",
  },
  {
    slug: "petnove",
    title: "PetNove",
    category: "Mobile",
    description:
      "A pet care app with health tracking and AI product recommendations through Firebase Cloud Functions.",
    tech: ["Expo", "React Native", "Firebase", "OpenAI API"],
    // no href: shows as a private project until you add a link
    imageAlt: "PetNove app weight tracking screen",
    placeholder: "[Screenshot: petnove-weight.png]",
  },
];

export const workIntro = {
  eyebrow: "Selected work",
  title: "Products I’ve built and shipped.",
} as const;