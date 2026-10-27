import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import RevealOnView from "@/components/motion/RevealOnView";
import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";
import { contactForm, contactHero, contactMeta } from "@/content/contact";
import { site } from "@/content/site";

const fullTitle = `${contactMeta.title} | ${site.name}`;
const url = `${site.url}${contactMeta.path}`;

export const metadata: Metadata = {
  title: contactMeta.title, // the layout template adds "| Muhammad Asad"
  description: contactMeta.description,
  alternates: { canonical: contactMeta.path },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: fullTitle,
    description: contactMeta.description,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: fullTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: contactMeta.description,
    images: ["/og.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${url}#contactpage`,
      url,
      name: fullTitle,
      description: contactMeta.description,
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: url },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main>
        <Container>
          <section aria-labelledby="contact-title" className="pt-14 sm:pt-20">
            <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
              <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
              {contactHero.eyebrow}
            </p>
            <h1
              id="contact-title"
              className="mt-6 max-w-[860px] font-display text-[38px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[68px]"
            >
              {contactHero.title}
            </h1>
            <p className="mt-6 max-w-[620px] text-lg text-muted sm:text-xl">{contactHero.lead}</p>
          </section>

          <div className="mt-14 grid gap-8 pb-24 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10 md:pb-32">
            <RevealOnView>
              <section aria-labelledby="form-title" className="card-solid rounded-[28px] p-6 sm:p-8 md:p-10">
                <h2 id="form-title" className="mb-8 font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
                  {contactForm.title}
                </h2>
                <ContactForm />
              </section>
            </RevealOnView>

            <RevealOnView delay={0.1}>
              <ContactSidebar />
            </RevealOnView>
          </div>
        </Container>
      </main>
    </>
  );
}