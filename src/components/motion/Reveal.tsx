"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  as?: "div" | "span";
  className?: string;
};

export default function Reveal({ children, delay = 0, y = 24, x = 0, as = "div", className }: Props) {
  const Comp = as === "span" ? motion.span : motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y, x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}