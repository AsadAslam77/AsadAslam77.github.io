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
            <a
              href={header.cta.href}
              className="hidden min-h-11 items-center rounded-[999px] bg-accent px-6 font-medium text-on-accent lg:inline-flex"
            >
              {header.cta.label}
            </a>
            <MobileMenu />
          </div>
        </GlassCard>
      </div>
    </header>
  );
}
