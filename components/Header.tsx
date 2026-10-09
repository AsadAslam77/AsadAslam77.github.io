import Button from "./Button";
import GlassCard from "./GlassCard";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { header, nav } from "@/lib/content";

/**
 * The floating glass pill from the mockups.
 *
 * A server component. It has no state and no handlers of its own, so it is
 * rendered to HTML at build time and ships no JavaScript. The two pieces that
 * do need the browser, ThemeToggle and MobileMenu, are client components
 * rendered as children: the server/client boundary is drawn per component,
 * not for everything above it. On a desktop the whole header is therefore
 * inert HTML apart from the toggle.
 *
 * Sticky, which the mockups are not. The nav is four in-page anchors, so a
 * header that scrolls away takes the only navigation with it.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 pt-6">
      <div className="mx-auto w-full max-w-[1120px] px-5 lg:px-12">
        <GlassCard
          radius="pill"
          className="flex items-center justify-between gap-4 py-3 pr-3 pl-5 lg:pr-4 lg:pl-7"
        >
          <a
            href="#main"
            className="font-heading font-medium whitespace-nowrap"
          >
            {header.logo}
          </a>

          {/* Plain links: no JavaScript involved on desktop at all. */}
          <nav aria-label="Main" className="hidden gap-7 lg:flex">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-accent-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* The wrapper carries the responsive visibility, not the
                Button. A display utility passed through className cannot
                override Button's own `inline-flex`: CSS resolves by
                stylesheet order, not by the order classes appear in the
                attribute, and Tailwind emits `hidden` before `inline-flex`.
                Passing "hidden lg:inline-flex" here left the button visible
                on phones, wrapped onto two lines. */}
            <span className="hidden lg:inline-flex">
              <Button href={header.cta.href}>{header.cta.label}</Button>
            </span>
            <MobileMenu />
          </div>
        </GlassCard>
      </div>
    </header>
  );
}
