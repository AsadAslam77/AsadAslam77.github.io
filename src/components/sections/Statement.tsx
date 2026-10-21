import Chip from "@/components/ui/Chip";
import RevealOnView from "@/components/motion/RevealOnView";
import { statement } from "@/content/statement";

export default function Statement() {
  return (
    <section className="pb-20 md:pb-28">
      <RevealOnView>
        <p className="max-w-[900px] font-display text-3xl font-medium leading-[1.15] tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[52px]">
          {statement.headline}
        </p>
      </RevealOnView>
      <RevealOnView delay={0.1}>
        <p className="mt-6 max-w-[560px] text-lg text-muted sm:text-xl">{statement.body}</p>
      </RevealOnView>
      <RevealOnView delay={0.2} className="mt-9 flex flex-wrap gap-3">
        {statement.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </RevealOnView>
    </section>
  );
}