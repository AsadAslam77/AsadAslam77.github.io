"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Project, ProjectFilter } from "@/types/project";

const filters: ProjectFilter[] = ["All", "Web", "E-commerce", "Mobile"];

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectFilter>("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-9 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className={`cursor-pointer rounded-full px-5 py-2.5 text-[15px] transition-colors ${
              active === f
                ? "border border-accent bg-accent font-medium text-on-accent"
                : "glass text-fg"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.article
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-4 pb-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative h-[200px] overflow-hidden rounded-[14px]">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="slot flex h-full items-center justify-center px-3 text-center text-sm text-muted">
                    {p.placeholder}
                  </div>
                )}
              </div>

              <h3 className="mx-2 mt-5 font-display text-2xl font-medium sm:text-[28px]">{p.title}</h3>
              <p className="mx-2 mt-2">{p.description}</p>
              {p.tech.length > 0 && (
                <p className="mx-2 mt-2 text-[15px] text-muted">{p.tech.join(", ")}</p>
              )}
              <p className="mx-2 mt-3">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.hrefLabel ?? p.href}
                  </a>
                ) : (
                  <span className="text-muted">Private project</span>
                )}
              </p>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}