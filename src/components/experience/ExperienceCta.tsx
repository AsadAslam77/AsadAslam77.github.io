import RevealOnView from "@/components/motion/RevealOnView";
import { experienceCta as c } from "@/content/experience";
import { site } from "@/content/site";

export default function ExperienceCta() {
  return (
    <section id="contact" aria-labelledby="exp-cta-title" className="pb-8">
      <RevealOnView>
        <div className="gradient-frame rounded-[32px]">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-[31px] bg-[var(--card-bg)] p-7 md:p-14">
            <div>
              <h2
                id="exp-cta-title"
                className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl"
              >
                {c.title}
              </h2>
              <p className="mt-3.5 max-w-[480px] text-lg text-muted">{c.text}</p>
              <p className="mt-5 font-mono text-sm tracking-[0.14em]">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
                className="rounded-full bg-accent px-6 py-3 font-medium !text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                Hire me
              </a>
              <a
                href={site.cvUrl}
                download
                className="glass rounded-full bg-ghost px-6 py-3 !text-fg no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </RevealOnView>
    </section>
  );
}