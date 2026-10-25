"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const READING_LINE = 0.65; // keep in sync with TimelineRail

export default function TimelineNode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [reached, setReached] = useState(false);
  const { scrollY } = useScroll();

  const check = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setReached(r.top + r.height / 2 < window.innerHeight * READING_LINE);
  };

  useMotionValueEvent(scrollY, "change", check);
  useEffect(() => {
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={ref}
      data-tl-node
      aria-hidden
      className={`tl-node ${className} ${reached ? "tl-node-on" : ""}`}
    />
  );
}