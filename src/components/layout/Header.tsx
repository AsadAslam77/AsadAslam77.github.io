"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/experience/", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => href.startsWith("/experience") && pathname.startsWith("/experience");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-full max-w-[1120px] px-4 sm:mt-6 sm:px-6 md:px-12">
      <div
        className={`${
          scrolled || open ? "glass-solid" : "glass"
        } flex items-center justify-between rounded-full py-2.5 pl-5 pr-3 transition-colors duration-200 md:py-3 md:pl-7 md:pr-4`}
      >
        <Link href="/" className="font-display font-medium !text-fg no-underline">
          asaddev.me
        </Link>

        <nav className="hidden gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`no-underline hover:!text-highlight ${isActive(l.href) ? "!text-highlight" : "!text-fg"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="#contact"
            className="hidden rounded-full bg-accent px-[22px] py-2.5 font-medium !text-on-accent no-underline sm:inline-block"
          >
            Hire me
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="glass flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ghost text-fg md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="glass-menu absolute inset-x-4 top-full mt-3 flex flex-col gap-1 rounded-3xl p-3 sm:inset-x-6 md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-2xl px-4 py-3 no-underline hover:bg-ghost ${isActive(l.href) ? "!text-highlight" : "!text-fg"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-accent px-4 py-3 text-center font-medium !text-on-accent no-underline sm:hidden"
          >
            Hire me
          </Link>
        </nav>
      )}
    </header>
  );
}