/**
 * The pill button used in the header, the hero and later the contact section.
 *
 * Always an <a>, never a <button>: everything it is used for navigates
 * somewhere. A <button> would be wrong for a screen reader, which announces
 * the two differently, and would lose the browser's own link behaviour
 * (middle-click, open in new tab, showing the target in the status bar).
 *
 * No "use client". It is a plain function with no state, so it renders on the
 * server in Header and Hero — and when MobileMenu imports it, it is simply
 * bundled into that client component instead. The same file works both ways.
 */

import type { ReactNode } from "react";

type Variant = "primary" | "glass";

/**
 * Written out in full rather than built up, because Tailwind finds class
 * names by scanning the source text.
 */
const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent",
  glass: "glass-strong",
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export default function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  // min-h-11 is 44px, the minimum touch target from CLAUDE.md.
  const classes = [
    "inline-flex min-h-11 items-center justify-center rounded-[999px] px-6 font-medium",
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
