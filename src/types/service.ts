export type Service = {
  slug: string;
  title: string;
  description: string;
  delivers: string;
  cta: { label: string; href: string };
  image?: string;       // e.g. "/images/services/web.png"
  imageAlt: string;
  placeholder: string;  // shown until the real screenshot exists
};

export type ProcessStep = {
  title: string;
  text: string;
};