export type ProjectCategory = "Web" | "E-commerce" | "Mobile";
export type ProjectFilter = "All" | ProjectCategory;

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  href?: string;        // leave out if the project is private
  hrefLabel?: string;
  image?: string;       // e.g. "/images/projects/wajood-home.png"
  imageAlt: string;
  placeholder: string;  // shown until the real screenshot exists
};