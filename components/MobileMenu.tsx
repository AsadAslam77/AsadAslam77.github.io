"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import GlassCard from "./GlassCard";
import { header, nav } from "@/lib/content";

/**
 * The menu button and panel shown below `lg`.
 *
 * This is the only part of the header that is a client component. It needs
 * state (open or closed) and event handlers, and a server component can have
 * neither. Everything else in the header stays server-rendered HTML.
 *
 * It is a disclosure, not a dialog: no focus trap, no aria-modal, nothing
 * made inert. Tabbing past the last item carries on down the page, which is
 * what a disclosure is supposed to do. A full-screen overlay menu would be a
 * different component and would need a trap.
 */

const PANEL_ID = "mobile-menu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Focus has to be put back deliberately. The element it is sitting on
      // is about to be removed, and the browser's fallback is to drop focus
      // on <body>, which sends a keyboard user back to the top of the page.
      buttonRef.current?.focus();
    }

    // pointerdown rather than click, so it runs before focus moves.
    function onPointerDown(event: PointerEvent) {
      if (wrapperRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        // aria-expanded is announced as "collapsed" or "expanded";
        // aria-controls names the element this button owns.
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        className="glass-strong inline-flex h-11 w-11 items-center justify-center rounded-full"
      >
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
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" />
          )}
        </svg>
      </button>

      {open && (
        <GlassCard
          id={PANEL_ID}
          as="div"
          radius="panel"
          // solid, not strong: the panel overlays the page, and a
          // translucent fill lets the content behind it read through.
          fill="solid"
          className="absolute right-0 top-[calc(100%+14px)] w-[min(17rem,calc(100vw-2.5rem))] p-3"
        >
          <nav aria-label="Main">
            <ul className="flex flex-col gap-1">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-[14px] px-4 hover:text-accent-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={header.cta.href} className="mt-2 w-full">
            {header.cta.label}
          </Button>
        </GlassCard>
      )}
    </div>
  );
}
