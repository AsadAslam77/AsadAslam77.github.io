import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ExperienceHero from "@/components/experience/ExperienceHero";
import Timeline from "@/components/experience/Timeline";
import ExperienceProjects from "@/components/experience/ExperienceProjects";
import SkillsGrid from "@/components/experience/SkillsGrid";
import ExperienceCta from "@/components/experience/ExperienceCta";
import ExperienceJsonLd from "@/components/seo/ExperienceJsonLd";
import { experienceMeta } from "@/content/experience";
import { site } from "@/content/site";

const fullTitle = `${experienceMeta.title} | ${site.name}`;

export const metadata: Metadata = {
  title: experienceMeta.title, // the layout template adds "| Muhammad Asad"
  description: experienceMeta.description,
  alternates: { canonical: experienceMeta.path },
  openGraph: {
    type: "website",
    url: `${site.url}${experienceMeta.path}`,
    siteName: site.name,
    title: fullTitle,
    description: experienceMeta.description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: fullTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: experienceMeta.description,
    images: ["/og.png"],
  },
};

export default function ExperiencePage() {
  return (
    <>
      <ExperienceJsonLd />
      <main>
        <Container>
          <ExperienceHero />
          <Timeline />
          <ExperienceProjects />
          <SkillsGrid />
          <ExperienceCta />
        </Container>
      </main>
    </>
  );
}