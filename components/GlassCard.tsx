/**
 * The glass panel every section is built from.
 *
 * A server component: it has no state and no event handlers, so it has no
 * "use client" and ships no JavaScript to the browser.
 */

import type { ReactNode } from "react";

/** Which HTML element to render. Kept to a short list so the markup stays
 *  meaningful: a card in a list is an <li>, a standalone one an <article>. */
type GlassTag = "div" | "article" | "aside" | "section" | "li" | "header";

/** panel 32px, card 24px, inner 14px, pill 999px (see CLAUDE.md). */
type Radius = "panel" | "card" | "inner" | "pill";

type Fill = "glass" | "strong";

/**
 * The classes are written out in full rather than built up as
 * `rounded-[${n}px]`. Tailwind finds classes by scanning the source text, so
 * a class assembled at runtime would never be generated at all.
 */
const radii: Record<Radius, string> = {
  panel: "rounded-[32px]",
  card: "rounded-[24px]",
  inner: "rounded-[14px]",
  pill: "rounded-[999px]",
};

const fills: Record<Fill, string> = {
  glass: "glass",
  strong: "glass-strong",
};

type GlassCardProps = {
  as?: GlassTag;
  radius?: Radius;
  fill?: Fill;
  className?: string;
  children?: ReactNode;
};

export default function GlassCard({
  as: Tag = "div",
  radius = "card",
  fill = "glass",
  className,
  children,
}: GlassCardProps) {
  const classes = [fills[fill], radii[radius], className]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
