"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

/**
 * A client component: it needs an onClick handler, which server components
 * cannot have.
 *
 * The mounted guard exists because there is no browser at build time, so the
 * server cannot know which icon is correct. Rendering the wrong one and then
 * correcting it in the browser is a hydration mismatch.
 *
 * useSyncExternalStore is used rather than useState + useEffect: it takes a
 * separate server snapshot (false) and client snapshot (true), so it reports
 * "not yet hydrated" without setting state inside an effect, which React
 * flags as a cause of cascading renders.
 */
const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true, // in the browser
    () => false, // during the build
  );

  // resolvedTheme, not theme: with defaultTheme="system", `theme` is the
  // string "system" rather than the dark or light it resolved to.
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Switch theme"
      }
      // 44px exactly: the minimum touch target from CLAUDE.md.
      className="glass-strong inline-flex h-11 w-11 items-center justify-center rounded-full"
    >
      {/* Before mount the theme is genuinely unknown, so no icon is drawn.
          The button keeps its size, so nothing shifts when the icon appears. */}
      {mounted &&
        (isDark ? (
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        ))}
    </button>
  );
}
