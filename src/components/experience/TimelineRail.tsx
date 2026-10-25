"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const READING_LINE = 0.65; // keep in sync with TimelineNode

export default function TimelineRail() {
  const ref = useRef<HTMLDivElement>(null);
  const centersRef = useRef<number[]>([]);
  const activeRef = useRef(-1);
  const reduce = useReducedMotion();
  const [centers, setCenters] = useState<number[]>([]);
  const [pulse, setPulse] = useState(0);

  // The line fills continuously, with a soft lag behind the scroll
  const progress = useMotionValue(0);
  const fillSpring = useSpring(progress, { stiffness: 90, damping: 24, mass: 0.7 });
  const fill = reduce ? progress : fillSpring;

  // The dot hops node to node. It stretches while it travels, then settles.
  const dotTarget = useMotionValue(0);
  const dotSpring = useSpring(dotTarget, { stiffness: 150, damping: 19, mass: 0.8 });
  const dotY = reduce ? dotTarget : dotSpring;
  const velocity = useVelocity(dotSpring);
  const stretch = useTransform(velocity, [-1800, 0, 1800], [1.55, 1, 1.55]);
  const squash = useTransform(velocity, [-1800, 0, 1800], [0.78, 1, 0.78]);

  const { scrollY } = useScroll();

  const update = useCallback(() => {
    const rail = ref.current;
    const wrap = rail?.parentElement;
    const c = centersRef.current;
    if (!rail || !wrap || c.length < 2) return;

    // Where the reading line sits, measured from the top of the rail
    const line = window.innerHeight * READING_LINE - rail.getBoundingClientRect().top;

    let idx = 0;
    c.forEach((y, i) => {
      if (line >= y) idx = i;
    });

    progress.set(Math.min(1, Math.max(0, (line - c[0]) / (c[c.length - 1] - c[0]))));

    if (idx !== activeRef.current) {
      const isFirst = activeRef.current === -1;
      activeRef.current = idx;
      dotTarget.set(c[idx]);
      if (isFirst) dotSpring.jump(c[idx]);
      else setPulse((p) => p + 1);

      // Light up the card that belongs to this node
      wrap.querySelectorAll("[data-tl-item]").forEach((el, i) => {
        el.setAttribute("data-on", i === idx ? "true" : "false");
      });
    }
  }, [progress, dotTarget, dotSpring]);

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
    if (activeRef.current >= 0) dotTarget.set(c[activeRef.current]); // stay on the node after a resize
    update();
  }, [update, dotTarget]);

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
          {/* Track */}
          <span
            className="tl-base absolute left-[11px] w-0.5 md:left-[173px]"
            style={{ top: first, height: total }}
          />
          {/* Glow behind the fill */}
          <motion.span
            className="tl-fill absolute left-[9px] w-1.5 origin-top opacity-50 blur-[6px] md:left-[171px]"
            style={{ top: first, height: total, scaleY: fill }}
          />
          {/* Fill */}
          <motion.span
            className="tl-fill absolute left-[11px] w-0.5 origin-top md:left-[173px]"
            style={{ top: first, height: total, scaleY: fill }}
          />

          {/* Ripple when the dot lands on a node */}
          {pulse > 0 && !reduce && (
            <motion.span
              key={pulse}
              className="absolute left-[12px] top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-highlight md:left-[174px]"
              style={{ y: dotTarget }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 2.6], opacity: [0.8, 0] }}
              transition={{ delay: 0.22, duration: 0.9, ease: "easeOut" }}
            />
          )}

          {/* The dot */}
          <motion.span
            className="rail-pulse absolute left-[12px] top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-highlight md:left-[174px]"
            style={{
              y: dotY,
              scaleY: reduce ? 1 : stretch,
              scaleX: reduce ? 1 : squash,
            }}
          />
        </>
      )}
    </div>
  );
}