import Chip from "@/components/ui/Chip";
import RevealOnView from "@/components/motion/RevealOnView";
import { sections, skillGroups } from "@/content/experience";

export default function SkillsGrid() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="pb-20 md:pb-28">
      <RevealOnView>
        <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
          <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
          {sections.skills.eyebrow}
        </p>
        <h2
          id="skills-title"
          className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl"
        >
          {sections.skills.title}
        </h2>
      </RevealOnView>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <li key={g.title}>
            <RevealOnView delay={(i % 3) * 0.08} className="h-full">
              <div className="glass h-full rounded-3xl p-6 sm:p-7">
                <h3 className="font-display text-[22px] font-medium">{g.title}</h3>
                <p className="mt-2 text-base text-muted">{g.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {g.skills.map((s) => (
                    <li key={s}>
                      <Chip>{s}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnView>
          </li>
        ))}
      </ul>
    </section>
  );
}