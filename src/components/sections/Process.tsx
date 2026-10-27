import RevealOnView from "@/components/motion/RevealOnView";
import { processIntro, processSteps } from "@/content/process";

export default function Process() {
  return (
    <section id="process" className="pb-20 md:pb-28">
      <RevealOnView>
        <h2 className="mb-8 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-[44px]">
          {processIntro.title}
        </h2>
      </RevealOnView>

      <ol className="grid gap-6 md:grid-cols-3">
        {processSteps.map((step, i) => (
          <RevealOnView key={step.title} delay={i * 0.1}>
            <li className="glass h-full list-none rounded-3xl p-7">
              <span className="font-display text-[44px] font-bold leading-none text-accent-soft">
                {i + 1}
              </span>
              <h3 className="mb-2 mt-3 text-xl font-medium">{step.title}</h3>
              <p className="text-muted">{step.text}</p>
            </li>
          </RevealOnView>
        ))}
      </ol>
    </section>
  );
}