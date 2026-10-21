import RevealOnView from "@/components/motion/RevealOnView";
import WorkGrid from "./WorkGrid";
import { projects } from "@/content/projects";

export default function Work() {
  return (
    <section id="work" className="pb-20 md:pb-28">
      <RevealOnView>
        <h2 className="mb-6 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-[44px]">
          Selected work
        </h2>
      </RevealOnView>
      <WorkGrid projects={projects} />
    </section>
  );
}