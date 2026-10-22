import { Fragment } from "react";
import Chip from "@/components/ui/Chip";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

const stackRows = [hero.stack.slice(0, 3), hero.stack.slice(3)];
const delay = (s: number) => ({ animationDelay: `${s}s` });

export default function Hero() {
  const words = site.name.split(" ");

  return (
    <section className="grid items-center gap-10 pb-20 pt-14 sm:pt-20 md:grid-cols-[1.3fr_1fr] md:gap-12 md:pb-28">
      <div>
        <h1>
          <span className="fade-up block text-xl font-normal tracking-normal text-highlight sm:text-2xl md:text-[26px]">
            {hero.eyebrow}
          </span>{" "}
          <span className="mt-3 block font-display text-[44px] font-bold leading-none tracking-[-0.03em] sm:text-7xl lg:text-[88px]">
            {words.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && " "}
                <span className="fade-up inline-block" style={delay(0.12 + i * 0.12)}>
                  {w}
                </span>
              </Fragment>
            ))}
          </span>
        </h1>

        <p className="fade-up mt-5 max-w-[600px] text-lg text-muted sm:mt-6 sm:text-xl" style={delay(0.35)}>
          {hero.description}
        </p>

        <p className="fade-up mt-4 flex items-start gap-2.5 sm:items-center" style={delay(0.45)}>
          <span className="pulse-dot mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent sm:mt-0" />
          {hero.availability}
        </p>

        <div className="fade-up mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4" style={delay(0.55)}>
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-accent px-6 py-3 font-medium !text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="glass rounded-full bg-ghost px-6 py-3 !text-fg no-underline transition-transform duration-200 hover:-translate-y-0.5"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <aside
        className="fade-left glass flex flex-col items-center gap-4 rounded-[28px] p-6 text-center sm:p-8"
        style={delay(0.3)}
      >
        {/* Replace with next/image (add the priority prop) once your photo exists */}
        <div className="slot flex h-[132px] w-[132px] items-center justify-center rounded-full px-3 text-sm text-muted">
          [Your photo]
        </div>
        <div>
          <p className="font-display text-[22px] font-medium">{site.name}</p>
          <p className="text-muted">{site.jobTitle}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {stackRows.map((row, r) => (
            <div key={r} className="flex flex-wrap justify-center gap-2">
              {row.map((s, i) => (
                <span
                  key={s}
                  className="fade-up inline-block"
                  style={delay(0.6 + (r * 3 + i) * 0.08)}
                >
                  <Chip>{s}</Chip>
                </span>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}