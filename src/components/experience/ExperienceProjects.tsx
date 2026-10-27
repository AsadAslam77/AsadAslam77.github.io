import Image from "next/image";
import Link from "next/link";
import Chip from "@/components/ui/Chip";
import RevealOnView from "@/components/motion/RevealOnView";
import { projects } from "@/content/projects";
import { sections } from "@/content/experience";

export default function ExperienceProjects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="pb-20 md:pb-28">
      <RevealOnView>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-muted">
              <span aria-hidden className="inline-block h-5 w-2 -skew-x-12 bg-highlight" />
              {sections.projects.eyebrow}
            </p>
            <h2
              id="projects-title"
              className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl"
            >
              {sections.projects.title}
            </h2>
          </div>
          <Link href="/#work" className="font-medium">
            See all work →
          </Link>
        </div>
      </RevealOnView>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <RevealOnView delay={(i % 2) * 0.1} className="h-full">
              <article className="card-solid h-full rounded-[28px] p-4 pb-7">
                <div className="relative h-[190px] overflow-hidden rounded-2xl">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 768px) 520px, 100vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div
                      aria-hidden
                      data-nosnippet
                      className="slot flex h-full items-center justify-center px-3 text-center text-sm text-muted"
                    >
                      {p.placeholder}
                    </div>
                  )}
                </div>
                <div className="px-2.5">
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">{p.category}</p>
                  <h3 className="mt-1.5 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-muted">{p.description}</p>
                  {p.tech.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {p.tech.map((t) => (
                        <li key={t}>
                          <Chip>{t}</Chip>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-5 font-medium">
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${p.title} (opens in a new tab)`}
                      >
                        Visit {p.hrefLabel ?? p.href} ↗
                      </a>
                    ) : (
                      <span className="text-muted">Private project</span>
                    )}
                  </p>
                </div>
              </article>
            </RevealOnView>
          </li>
        ))}
      </ul>
    </section>
  );
}