import Chip from "@/components/ui/Chip";
import Reveal from "@/components/motion/Reveal";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export default function Hero() {
  const stackRows = [hero.stack.slice(0, 3), hero.stack.slice(3)];
  return (
    <section className="grid items-center gap-10 pb-20 pt-14 sm:pt-20 md:grid-cols-[1.3fr_1fr] md:gap-12 md:pb-28">
      <div>
        <h1>
          <Reveal as="span" className="block text-xl font-normal tracking-normal text-highlight sm:text-2xl md:text-[26px]">
            {hero.eyebrow}
          </Reveal>
          <span className="mt-3 block font-display text-[44px] font-bold leading-none tracking-[-0.03em] sm:text-7xl lg:text-[88px]">
            {site.name.split(" ").map((word, i) => (
              <Reveal as="span" key={word} delay={0.12 + i * 0.12} className="mr-[0.25em] inline-block">
                {word}
              </Reveal>
            ))}
          </span>
        </h1>

        <Reveal delay={0.35}>
          <p className="mt-5 max-w-[600px] text-lg text-muted sm:mt-6 sm:text-xl">{hero.description}</p>
        </Reveal>

        <Reveal delay={0.45}>
          <p className="mt-4 flex items-start gap-2.5 sm:items-center">
            <span className="pulse-dot mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent sm:mt-0" />
            {hero.availability}
          </p>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
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
        </Reveal>
      </div>

      <Reveal x={40} y={0} delay={0.3}>
        <aside className="glass flex flex-col items-center gap-4 rounded-[28px] p-6 text-center sm:p-8">
          {/* Replace with next/image once your photo is in public/images/ */}
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
        <Reveal as="span" key={s} y={12} delay={0.6 + (r * 3 + i) * 0.08}>
          <Chip>{s}</Chip>
        </Reveal>
      ))}
    </div>
  ))}
</div>
        </aside>
      </Reveal>
    </section>
  );
}