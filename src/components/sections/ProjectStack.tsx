"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import type { Project } from "@/types/project";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="flex flex-col gap-[12svh] md:gap-[16vh]">
      {projects.map((p, i) => (
        <ProjectCard
          key={p.slug}
          project={p}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project: p,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const target = index === total - 1 ? 1 : 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, target]);

  return (
    <div
      className="sticky top-[calc(88px_+_var(--i)_*_12px)] md:top-[calc(108px_+_var(--i)_*_20px)] [@media(max-height:520px)]:static"
      style={{ "--i": index } as React.CSSProperties}
    >
      <motion.article
        style={{ scale: reduce ? 1 : scale, transformOrigin: "top center" }}
        className="card-solid overflow-hidden rounded-[24px] md:min-h-[min(600px,calc(100svh-190px))] md:rounded-[36px]"
      >
        <div className="grid h-full gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10 md:p-8 lg:gap-12 lg:p-10">
          {/* Text column: nothing in here is allowed to shrink */}
          <div className="flex min-w-0 flex-col justify-center [&>*]:shrink-0">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:text-sm">
              <span className="text-fg">
                {pad(index + 1)} / {pad(total)}
              </span>
              <span className="mx-2">·</span>
              {p.category}
            </p>

            <h3 className="mt-3 break-words text-balance font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:mt-4 sm:text-4xl lg:text-5xl xl:text-6xl">
              {p.title}
            </h3>

            {/* Clamped only on phones; full text from 640px up */}
            <p className="mt-3 line-clamp-3 max-w-[520px] text-base leading-relaxed text-muted sm:mt-5 sm:line-clamp-none sm:text-lg">
              {p.description}
            </p>

            {p.tech.length > 0 && (
              <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="glass rounded-full px-3 py-1 text-[13px] leading-snug"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 sm:mt-6">
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${p.title} (opens in a new tab)`}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium !text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5 sm:px-7 sm:py-3.5"
                >
                  <span aria-hidden className="inline-block h-4 w-1.5 -skew-x-12 bg-on-accent/70" />
                  Visit live site
                </a>
              ) : (
                <p className="text-muted">Private project</p>
              )}
            </div>
          </div>

          {/* Image: fixed height on phones, stretches to the card height on desktop */}
          <div className="relative order-first h-[150px] overflow-hidden rounded-2xl sm:h-[230px] md:order-none md:h-auto md:min-h-[340px]">
            {p.image ? (
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                sizes="(min-width: 1024px) 820px, (min-width: 768px) 55vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="slot flex h-full items-center justify-center px-3 text-center text-sm text-muted">
                {p.placeholder}
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}