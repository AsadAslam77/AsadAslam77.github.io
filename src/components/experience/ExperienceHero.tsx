import Link from "next/link";
import { experienceHero as h, jumpLinks, snapshot } from "@/content/experience";
import { site } from "@/content/site";

const delay = (s: number) => ({ animationDelay: `${s}s` });

export default function ExperienceHero() {
  return (
    <section aria-labelledby="exp-title" className="pt-14 sm:pt-20">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12">
        <div>
          <p className="fade-up flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
            <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
            {h.eyebrow}
          </p>
          <h1
            id="exp-title"
            className="fade-up mt-6 font-display text-[38px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[68px]"
            style={delay(0.1)}
          >
            {h.title}
          </h1>
          <p className="fade-up mt-6 max-w-[600px] text-lg text-muted sm:text-xl" style={delay(0.2)}>
            {h.lead}
          </p>
          <div className="fade-up mt-8 flex flex-wrap gap-3 sm:gap-4" style={delay(0.3)}>
            <a
              href={site.cvUrl}
              download
              className="rounded-full bg-accent px-6 py-3 font-medium !text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              Download CV
            </a>
            <Link
              href={h.secondaryCta.href}
              className="glass rounded-full bg-ghost px-6 py-3 !text-fg no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              {h.secondaryCta.label}
            </Link>
          </div>
        </div>

        <aside
          aria-label="At a glance"
          className="fade-left glass rounded-[28px] p-6 sm:p-8"
          style={delay(0.25)}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">At a glance</p>
          <dl>
            {snapshot.map((f) => (
              <div
                key={f.label}
                className="flex gap-4 border-t border-[var(--glass-border)] py-3.5 first:border-t-0 first:pt-0"
              >
                <dt className="w-[84px] shrink-0 pt-0.5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  {f.label}
                </dt>
                <dd className="font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 flex items-center gap-3 border-t border-[var(--glass-border)] pt-4">
            <span className="pulse-dot inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
            {h.availability}
          </p>
        </aside>
      </div>

      <nav aria-label="On this page" className="fade-up mt-12 flex flex-wrap gap-2.5 sm:mt-14" style={delay(0.45)}>
        {jumpLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="glass rounded-full px-5 py-2.5 text-[15px] !text-fg no-underline hover:!text-highlight"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </section>
  );
}