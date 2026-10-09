/**
 * The emerald and amber glows behind every section.
 *
 * Purely decorative, so it is hidden from screen readers and ignores the
 * mouse.
 *
 * The container is absolutely positioned over the whole document rather than
 * fixed to the viewport, which is what makes the glows scroll with the
 * content and bring a new one into view every so often, as the mockups do.
 * An earlier version used `fixed`, and the result was one emerald and one
 * amber for the entire page however far you scrolled.
 *
 * `overflow-hidden` clips the glows that hang off the left and right edges,
 * so they never create a horizontal scrollbar. It is safe here because this
 * element is a sibling of the header, not an ancestor: `overflow: hidden` on
 * an ancestor would stop `position: sticky` working.
 *
 * No "use client": no state and no event handlers, so it stays a server
 * component and ships no JavaScript.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Five glows down the page, alternating left and right, emerald and
          amber. Their positions live in globals.css next to their sizes. */}
      <div className="blob blob-accent blob-1" />
      <div className="blob blob-warm blob-2" />
      <div className="blob blob-accent blob-3" />
      <div className="blob blob-warm blob-4" />
      <div className="blob blob-accent blob-5" />
    </div>
  );
}
