import Image from "next/image";
import RevealOnView from "@/components/motion/RevealOnView";
import { services, servicesIntro } from "@/content/services";

export default function Services() {
  return (
    <section id="services" className="pb-20 md:pb-28">
      <RevealOnView>
        <h2 className="mb-8 font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-[44px]">
          {servicesIntro.title}
        </h2>
      </RevealOnView>

      <div className="flex flex-col gap-4">
        {services.map((s, i) => (
          <RevealOnView key={s.slug} delay={Math.min(i * 0.05, 0.2)}>
            <article className="glass grid items-center gap-5 rounded-3xl p-5 sm:px-7 sm:py-6 lg:grid-cols-[220px_1fr_220px] lg:gap-8">
              <h3 className="font-display text-2xl font-medium sm:text-[26px]">{s.title}</h3>

              <div>
                <p className="mb-3 max-w-[520px] text-muted">{s.description}</p>
                <p className="mb-5">
                  <span className="text-muted">Delivers</span>{" "}
                  <span className="text-accent-soft">{s.delivers}</span>
                </p>
                <a
                  href={s.cta.href}
                  className="glass inline-block rounded-full bg-ghost px-5 py-2.5 text-[15px] !text-fg no-underline transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {s.cta.label}
                </a>
              </div>

              <div className="relative h-[140px] overflow-hidden rounded-[14px] lg:h-[120px]">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 220px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="slot flex h-full items-center justify-center px-3 text-center text-sm text-muted">
                    {s.placeholder}
                  </div>
                )}
              </div>
            </article>
          </RevealOnView>
        ))}
      </div>
    </section>
  );
}