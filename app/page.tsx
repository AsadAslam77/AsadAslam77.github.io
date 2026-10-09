/**
 * The page skeleton: every section in its final order, each one an empty stub
 * until its own task fills it in.
 *
 * The stubs exist so the header's anchors have somewhere real to scroll to
 * from today, and so the order of the page is settled before eight sections
 * are written. Each one disappears as its task lands.
 *
 * The task 2 swatch page that used to live here is in git history:
 * `git show 57897cf:app/page.tsx`.
 */

import GlassCard from "@/components/GlassCard";
import { contact, processHeading, workHeading } from "@/lib/content";

/**
 * scroll-mt keeps an anchor jump clear of the sticky header. The header is
 * 68px tall plus its 24px gap, so a heading would otherwise land underneath
 * it. scroll-margin-top affects only where scrolling stops, never layout.
 */
const SECTION = "scroll-mt-[104px] lg:scroll-mt-[120px] py-16 lg:py-24";

const sections = [
  { id: "hero", heading: "Hero", task: "Task 7" },
  { id: "statement", heading: "Statement", task: "Task 8" },
  { id: "work", heading: workHeading, task: "Task 9" },
  { id: "services", heading: "Services", task: "Task 10" },
  { id: "process", heading: processHeading, task: "Task 11" },
  { id: "about", heading: "About", task: "Task 12" },
  { id: "experience", heading: "Experience and skills", task: "Task 13" },
  { id: "contact", heading: contact.heading, task: "Task 14" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-5 lg:px-12">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className={SECTION}>
          <h2 className="text-section font-bold tracking-[-0.02em]">
            {section.heading}
          </h2>
          <GlassCard radius="panel" className="mt-6 p-6 lg:p-11">
            <p className="text-muted">
              Placeholder. {section.task} builds this section.
            </p>
          </GlassCard>
        </section>
      ))}
    </div>
  );
}
