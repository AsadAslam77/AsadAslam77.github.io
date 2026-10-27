import Link from "next/link";
import { footer } from "@/content/footer";
import { site } from "@/content/site";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

const linkCls =
  "relative w-max text-fg no-underline transition-colors duration-200 hover:text-highlight after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-highlight after:transition-all after:duration-300 hover:after:w-full";

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external || link.download || link.href.startsWith("mailto:")) {
    return (
      <a
        href={link.href}
        className={linkCls}
        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(link.download ? { download: true } : {})}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={linkCls}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { cta } = footer;

  return (
    <footer className="relative mt-2 md:mt-3">
      <div className="mx-auto w-full max-w-[1120px] px-4 pb-10 sm:px-6 md:px-12">
        {/* Call to action: the only "Let's build" block on the site */}
        <div id="contact" className="gradient-frame scroll-mt-28 rounded-[32px]">
          <div className="rounded-[31px] bg-[var(--card-bg)] p-7 sm:p-10 md:p-14">
            <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              {cta.title}
            </h2>
            <p className="mt-4 max-w-[480px] text-lg text-muted">{cta.text}</p>
            <p className="mt-5 font-mono text-sm tracking-[0.14em]">
              <a href={`mailto:${cta.email}`} className="text-accent-soft no-underline hover:text-highlight">
                {cta.email}
              </a>
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href={cta.primary.href}
                className="rounded-full bg-accent px-6 py-3 font-medium !text-on-accent no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                {cta.primary.label}
              </Link>
              <a
                href={cta.secondary.href}
                download
                className="glass rounded-full bg-ghost px-6 py-3 !text-fg no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                {cta.secondary.label}
              </a>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 border-t border-[var(--glass-border)] pt-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-medium">{site.name}</p>
            <p className="mt-3 max-w-[300px] text-muted">{footer.brandText}</p>
            <p className="mt-6 flex items-center gap-4 text-[15px] text-fg">
              <span aria-hidden className="glow-node mt-[3px] shrink-0" />
              {footer.availability}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                <span aria-hidden className="inline-block h-3.5 w-1.5 -skew-x-12 bg-highlight" />
                {col.title}
              </p>
              <ul className="mt-5 grid gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLinkItem link={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Decorative wordmark, hidden from screen readers and search */}
        <div
          aria-hidden
          className="mt-14 select-none overflow-hidden whitespace-nowrap font-display text-[clamp(64px,15vw,190px)] font-bold leading-[0.85] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--wordmark)]"
        >
          asaddev
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          <p>
            © {year} {site.name}
          </p>
          <p className="hidden sm:block">{footer.stack}</p>
          <a
            href="#"
            className="rounded-full border border-[var(--glass-border)] px-4 py-2.5 no-underline transition-colors duration-200 hover:text-highlight"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}