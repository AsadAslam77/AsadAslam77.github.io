import Container from "@/components/layout/Container";
import RevealOnView from "@/components/motion/RevealOnView";
import ServicePanel from "./services/ServicePanel";
import ServiceTabs from "./services/ServiceTabs";
import { services, servicesIntro } from "@/content/services";

export default function Services() {
  const total = services.length;

  return (
    <section id="services" className="pb-20 md:pb-28">
      <Container size="medium">
        <RevealOnView>
          <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
            <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
            {servicesIntro.eyebrow}
          </p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-[1000px] font-display text-4xl font-bold leading-[1.03] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-[88px]">
              {servicesIntro.title}
            </h2>
            <p className="pb-3 font-mono text-sm tracking-[0.14em] text-muted">
              {String(total).padStart(2, "0")} services
            </p>
          </div>
        </RevealOnView>

        <div className="mt-10 md:mt-16">
          <ServiceTabs
            items={services.map(({ slug, title, stack }) => ({ slug, title, stack }))}
            panels={services.map((s, i) => (
              <ServicePanel key={s.slug} service={s} index={i} total={total} />
            ))}
          />
        </div>
      </Container>
    </section>
  );
}