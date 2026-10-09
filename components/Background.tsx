/**
 * The blurred emerald and amber blobs behind every section.
 *
 * Purely decorative, so it is hidden from screen readers and ignores the
 * mouse. The container is fixed to the viewport, which means the blobs stay
 * where they are while the page scrolls; the mockups place them at absolute
 * page offsets, which only lines up at one page height.
 *
 * No "use client" here: this component has no state and no event handlers,
 * so it stays a server component and ships no JavaScript to the browser.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="blob blob-accent -top-40 -left-40" />
      <div className="blob blob-warm top-1/4 -right-48" />
      <div className="blob blob-accent top-2/3 -left-56" />
      <div className="blob blob-warm bottom-0 right-1/4" />
    </div>
  );
}
