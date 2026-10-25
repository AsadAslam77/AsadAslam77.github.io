"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const READING_LINE = 0.65; // keep in sync with TimelineNode

export default function TimelineRail() {
  const ref = useRef<HTMLDivElement>(null);
  const centersRef = useRef<number[]>([]);
  const reduce = useReducedMotion();
  const [centers, setCenters] = useState<number[]>([]);
  const [active, setActive] = useState(0);

  // The line fills continuously with scroll; the dot only hops between nodes
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 120, damping: 26, mass: 0.6 });
  const fillScale = reduce ? progress : smooth;
  const { scrollY } = useScroll();

  const update = useCallback(() => {
    const rail = ref.current;
    const c = centersRef.current;
    if (!rail || c.length < 2) return;

    // Where the reading line sits, measured from the top of the rail
    const line = window.innerHeight * READING_LINE - rail.getBoundingClientRect().top;

    let idx = 0;
    c.forEach((y, i) => {
      if (line >= y) idx = i;
    });
    setActive(idx);

    const total = c[c.length - 1] - c[0];
    progress.set(Math.min(1, Math.max(0, (line - c[0]) / total)));
  }, [progress]);

  const measure = useCallback(() => {
    const rail = ref.current;
    const wrap = rail?.parentElement;
    if (!rail || !wrap) return;
    const top = rail.getBoundingClientRect().top;
    const c = Array.from(wrap.querySelectorAll<HTMLElement>("[data-tl-node]")).map((el) => {
      const r = el.getBoundingClientRect();
      return r.top + r.height / 2 - top;
    });
    centersRef.current = c;
    setCenters(c);
    update();
  }, [update]);

  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current?.parentElement) ro.observe(ref.current.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const ready = centers.length >= 2;
  const first = centers[0] ?? 0;
  const total = ready ? centers[centers.length - 1] - first : 0;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-10">
      {ready && (
        <>
          <span
            className="tl-base absolute left-[11px] w-0.5 md:left-[173px]"
            style={{ top: first, height: total }}
          />
          <motion.span
            className="tl-fill absolute left-[11px] w-0.5 origin-top md:left-[173px]"
            style={{ top: first, height: total, scaleY: fillScale }}
          />
          <motion.span
            className="rail-pulse absolute left-[12px] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-highlight md:left-[174px]"
            initial={false}
            animate={{ top: centers[active] }}
            transition={
              reduce ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 20, mass: 0.7 }
            }
          />
        </>
      )}
    </div>
  );
}