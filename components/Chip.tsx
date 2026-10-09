/**
 * A small glass pill for a technology name.
 *
 * Used in the hero's profile card and, from task 8, in the statement section.
 * It sets no margin and no gap: spacing between chips belongs to whatever
 * lays them out, so the same chip can sit in an 8px row in one place and a
 * 12px row in another.
 *
 * A server component: no state, no handlers.
 */

import type { ReactNode } from "react";

export default function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="glass rounded-[999px] px-4 py-1.5 text-[15px]">
      {children}
    </span>
  );
}
