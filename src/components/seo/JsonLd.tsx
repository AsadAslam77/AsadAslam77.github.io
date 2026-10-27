import { site } from "@/content/site";
import { services } from "@/content/services";

export default function JsonLd() {
  const personId = `${site.url}/#person`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        jobTitle: site.jobTitle,
        email: `mailto:${site.email}`,
        sameAs: [site.github, site.linkedin],
        knowsAbout: ["Next.js", "React", "Firebase", "Shopify Hydrogen", "React Native", "Node.js"],
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            serviceType: s.group,
            provider: { "@id": personId },
          },
        })),
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