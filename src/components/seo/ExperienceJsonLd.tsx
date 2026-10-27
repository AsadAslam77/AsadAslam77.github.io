import { experienceMeta, skillGroups, timeline } from "@/content/experience";
import { site } from "@/content/site";

export default function ExperienceJsonLd() {
  const url = `${site.url}${experienceMeta.path}`;
  const personId = `${site.url}/#person`;
  const job = timeline.find((t) => t.current);
  const edu = timeline.find((t) => t.tag === "EDUCATION");
  const skills = [...new Set(skillGroups.flatMap((g) => g.skills))];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: `${experienceMeta.title} | ${site.name}`,
        description: experienceMeta.description,
        inLanguage: "en",
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": personId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          { "@type": "ListItem", position: 2, name: "Experience", item: url },
        ],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        jobTitle: site.jobTitle,
        worksFor: job
          ? { "@type": "Organization", name: job.org, url: job.orgUrl }
          : undefined,
        alumniOf: edu ? { "@type": "CollegeOrUniversity", name: edu.org } : undefined,
        knowsAbout: skills,
        sameAs: [site.github, site.linkedin],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}