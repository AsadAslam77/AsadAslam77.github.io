import Chip from "@/components/ui/Chip";
import RevealOnView from "@/components/motion/RevealOnView";
import TimelineNode from "./TimelineNode";
import TimelineRail from "./TimelineRail";
import { nextChapter, sections, timeline } from "@/content/experience";
import { site } from "@/content/site";

function Period({ start, end }: { start: string; end?: string }) {
  return (
    <>
      <time dateTime={start}>{start}</time> — {end ? <time dateTime={end}>{end}</time> : "Present"}
    </>
  );
}

const dateCls =
  "pb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted md:pb-0 md:pt-[26px] md:text-sm";
const nodeCls = "absolute left-[4px] top-1 md:static md:mt-[30px] md:justify-self-center";

export default function Timeline() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="pb-20 pt-24 md:pb-28 md:pt-28">
      <RevealOnView>
        <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
          <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
          {sections.journey.eyebrow}
        </p>
        <h2
          id="journey-title"
          className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl"
        >
          {sections.journey.title}
        </h2>
      </RevealOnView>

      <div className="relative mt-10 md:mt-12">
        <TimelineRail />

        <ol>
          {/* One list item per role or school, from content/experience.ts */}
          {timeline.map((item) => (
            <li
              key={item.id}
              data-tl-item
              className="relative mb-10 pl-8 md:grid md:grid-cols-[150px_48px_minmax(0,1fr)] md:pl-0"
            >
              <p className={dateCls}>
                <Period start={item.start} end={item.end} />
              </p>
              <TimelineNode className={nodeCls} />
              <RevealOnView className="min-w-0">
                <article className="card-solid rounded-[28px] p-6 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-md border border-[var(--slot-border)] px-2.5 py-1.5 font-mono text-xs tracking-[0.12em] text-muted">
                      {item.tag}
                    </span>
                    {item.current && (
                      <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-accent-soft">
                        <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" />
                        Current role
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted">
                    {item.orgUrl ? (
                      <a href={item.orgUrl} target="_blank" rel="noopener noreferrer">
                        {item.org}
                      </a>
                    ) : (
                      item.org
                    )}
                    {item.orgNote && <> · {item.orgNote}</>}
                  </p>

                  <p className="mt-5 max-w-[640px] text-lg text-fg/85">{item.summary}</p>

                  {item.highlights && (
                    <>
                      <p className="mt-7 font-mono text-xs uppercase tracking-[0.14em] text-muted">Highlights</p>
                      <ul className="mt-3.5 space-y-3">
                        {item.highlights.map((t) => (
                          <li key={t} className="relative pl-6 text-fg/85">
                            <span aria-hidden className="absolute left-1 top-2 h-3.5 w-[5px] -skew-x-12 bg-highlight" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p className="mt-7 font-mono text-xs uppercase tracking-[0.14em] text-muted">{item.chipsLabel}</p>
                  <ul className="mt-3.5 flex flex-wrap gap-2.5">
                    {item.chips.map((c) => (
                      <li key={c}>
                        <Chip>{c}</Chip>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnView>
            </li>
          ))}

          {/* Last item: "Your project could be next" */}
          <li
            data-tl-item
            className="relative pl-8 md:grid md:grid-cols-[150px_48px_minmax(0,1fr)] md:pl-0"
          >
            <p className={dateCls}>Next</p>
            <TimelineNode className={nodeCls} />
            <RevealOnView className="min-w-0">
              <div className="tl-next flex flex-wrap items-center justify-between gap-5 rounded-[28px] border border-dashed border-[var(--slot-border)] bg-[var(--slot-bg)] p-6 md:px-8 md:py-7">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{nextChapter.eyebrow}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{nextChapter.title}</h3>
                  <p className="mt-2 text-muted">{nextChapter.text}</p>
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-full bg-accent px-6 py-3 font-medium !text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {nextChapter.cta}
                </a>
              </div>
            </RevealOnView>
          </li>
        </ol>
      </div>
    </section>
  );
}