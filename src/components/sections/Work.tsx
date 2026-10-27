import Container from "@/components/layout/Container";
import RevealOnView from "@/components/motion/RevealOnView";
import ProjectStack from "./ProjectStack";
import { projects, workIntro } from "@/content/projects";

export default function Work() {
  const total = String(projects.length).padStart(2, "0");

  return (
    <section id="work" className="pb-20 md:pb-28">
      <Container size="wide">
        <RevealOnView>
          <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
            <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
            {workIntro.eyebrow}
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-[900px] font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[56px]">
              {workIntro.title}
            </h2>
            <p className="font-mono text-sm tracking-[0.14em] text-muted">{total} projects</p>
          </div>
        </RevealOnView>

        <div className="mt-10 md:mt-14">
          <ProjectStack projects={projects} />
        </div>
      </Container>
    </section>
  );
}