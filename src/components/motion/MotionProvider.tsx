"use client";

import { MotionConfig } from "framer-motion";

// Users with "reduce motion" on get no movement, only gentle fades
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}