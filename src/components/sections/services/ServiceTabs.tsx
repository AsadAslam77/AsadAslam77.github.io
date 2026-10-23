"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Item = { slug: string; title: string; stack: string[] };

const ITEM_H = 88;
const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function ServiceTabs({
  items,
  panels,
}: {
  items: Item[];
  panels: React.ReactNode[];
}) {
  const n = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const indexAt = (p: number) => Math.min(n - 1, Math.max(0, Math.floor(p * n)));

  // The dot's position along the rail, from 0 (first service) to n - 1 (last).
  // It sits exactly on service i when scrolled to the middle of that service's step.
  const f = useTransform(scrollYProgress, (p) => Math.min(n - 1, Math.max(0, p * n - 0.5)));
  const spring = useSpring(f, { stiffness: 140, damping: 26, mass: 0.6 });
  const pos = reduce ? f : spring;
  const dotY = useTransform(pos, (v) => v * ITEM_H);
  const fill = useTransform(pos, (v) => v / (n - 1));

  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(indexAt(p)));
  useEffect(() => {
    setActive(indexAt(scrollYProgress.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / n) * distance,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  return (
    <div ref={trackRef} className="svc-track" style={{ "--n": n } as React.CSSProperties}>
      <div className="svc-sticky">
        <div className="svc-grid">
          {/* Rail: desktop scroll mode only */}
          <nav className="svc-rail" aria-label="Services">
            <div className="relative" style={{ height: n * ITEM_H }}>
              <span
                aria-hidden
                className="absolute left-[11px] w-0.5"
                style={{
                  top: ITEM_H / 2,
                  height: (n - 1) * ITEM_H,
                  background: "color-mix(in srgb, var(--fg) 14%, transparent)",
                }}
              />
              <motion.span
                aria-hidden
                className="absolute left-[11px] w-0.5 origin-top bg-gradient-to-b from-highlight to-accent"
                style={{ top: ITEM_H / 2, height: (n - 1) * ITEM_H, scaleY: fill }}
              />
              <motion.span
                aria-hidden
                className="absolute left-1 h-4 w-4 rounded-full bg-highlight shadow-[0_0_0_7px_color-mix(in_srgb,var(--highlight)_20%,transparent)]"
                style={{ top: ITEM_H / 2 - 8, y: dotY }}
              />

              {items.map((it, i) => {
                const on = i === active;
                return (
                  <button
                    key={it.slug}
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className={`absolute inset-x-0 flex cursor-pointer flex-col justify-center pl-11 text-left transition-colors ${
                      on ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                    style={{ top: i * ITEM_H, height: ITEM_H }}
                  >
                    <span aria-hidden className={`rail-node ${i <= active ? "rail-node-on" : ""}`} />
                    <span className="flex items-baseline gap-3.5">
                      <span className="font-mono text-xs tracking-[0.14em]">{pad(i)}</span>
                      <span className="font-display text-2xl font-medium leading-[1.15] xl:text-[26px]">
                        {it.title}
                      </span>
                    </span>
                    <span
                      className={`ml-9 mt-1.5 font-mono text-xs uppercase tracking-[0.1em] text-accent-soft transition-opacity duration-300 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {it.stack.slice(0, 3).join(" · ")}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 pl-11 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Scroll to explore ↓
            </p>
          </nav>

          {/* Panels: stacked on small screens, one at a time on desktop */}
          <div className="svc-panels min-w-0">
            {panels.map((panel, i) => (
              <article
                key={items[i].slug}
                id={`service-${items[i].slug}`}
                data-state={i === active ? "active" : i < active ? "before" : "after"}
                className="svc-panel"
              >
                {panel}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}