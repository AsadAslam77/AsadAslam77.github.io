"use client";

import { useState } from "react";

type Item = { slug: string; title: string; stack: string[] };

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function ServiceTabs({
  items,
  panels,
}: {
  items: Item[];
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-[72px]">
      {/* Service picker: desktop only. Smaller screens show every service in a stack. */}
      <nav aria-label="Choose a service" className="hidden min-w-0 lg:block">
        <ul className="pl-11">
          {items.map((it, i) => {
            const on = i === active;
            return (
              <li key={it.slug} className="relative">
                <span aria-hidden className={`rail-dot ${on ? "rail-dot-on" : ""}`} />
                {i < items.length - 1 && (
                  <span aria-hidden className={`rail-seg ${i < active ? "rail-seg-on" : ""}`} />
                )}
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  aria-controls={`service-${it.slug}`}
                  onClick={() => setActive(i)}
                  className={`block w-full cursor-pointer py-4 text-left transition-colors ${
                    on ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span className="flex items-baseline gap-3.5">
                    <span className="font-mono text-xs tracking-[0.14em]">{pad(i)}</span>
                    <span className="font-display text-2xl font-medium leading-[1.15] xl:text-[30px]">
                      {it.title}
                    </span>
                  </span>
                  {on && (
                    <span className="ml-9 mt-2 block font-mono text-xs uppercase tracking-[0.1em] text-accent-soft">
                      {it.stack.slice(0, 3).join(" · ")}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 pl-11 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Pick a service to explore ↓
        </p>
      </nav>

      <div className="min-w-0 divide-y divide-[var(--glass-border)] lg:divide-y-0">
        {panels.map((panel, i) => (
          <article
            key={items[i].slug}
            id={`service-${items[i].slug}`}
            className={`py-10 first:pt-0 last:pb-0 lg:py-0 ${i === active ? "service-in" : "lg:hidden"}`}
          >
            {panel}
          </article>
        ))}
      </div>
    </div>
  );
}