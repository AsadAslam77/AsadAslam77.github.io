export type PreviewKind = "web" | "store" | "mobile" | "backend" | "ai";

export type Service = {
  slug: string;
  title: string;
  group: string;
  description: string;
  delivers: string;
  gets: string[];
  stack: string[];
  cta: { label: string; href: string };
  preview: PreviewKind;
  caption: [string, string];
  image?: string; // a real screenshot replaces the mock preview, e.g. "/images/services/web.webp"
  imageAlt: string;
};

export type ProcessStep = {
  title: string;
  text: string;
};