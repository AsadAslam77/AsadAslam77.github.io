/**
 * "Skip to content", the first thing in the tab order on every page.
 *
 * A keyboard or screen reader user would otherwise have to tab through the
 * whole header on every visit to reach the page itself. It is hidden until
 * it is focused, so it costs sighted mouse users nothing.
 *
 * A server component: it is a plain link with no state.
 */
export default function SkipLink() {
  return (
    <a
      href="#main"
      // sr-only hides it visually while leaving it in the tab order and
      // readable by screen readers; focus:not-sr-only undoes that the moment
      // it is focused, so it appears as a normal glass pill.
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-[999px] focus:px-6 focus:font-medium glass-strong"
    >
      Skip to content
    </a>
  );
}
