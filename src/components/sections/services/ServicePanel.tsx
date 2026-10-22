import Image from "next/image";
import Chip from "@/components/ui/Chip";
import type { Service } from "@/types/service";
import ServicePreview from "./previews";

const pad = (n: number) => String(n).padStart(2, "0");

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-accent-soft">
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export default function ServicePanel({
  service: s,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:text-sm">
        {pad(index + 1)} / {pad(total)} · {s.group}
      </p>
  <h3 className="mb-5 mt-4 break-words font-display text-[40px] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl xl:text-[88px]">
        {s.title}
      </h3>
      <p className="mb-7 max-w-[640px] text-lg text-muted sm:text-xl">{s.description}</p>

      <div className="mb-8 flex flex-wrap items-center gap-x-3.5 gap-y-4 sm:mb-9">
        <span className="rounded-md border border-[var(--slot-border)] px-2.5 py-1.5 font-mono text-xs tracking-[0.12em] text-muted">
          DELIVERS
        </span>
        <span className="text-base sm:text-lg">{s.delivers}</span>
        <a
          href={s.cta.href}
          className="w-full rounded-full bg-accent px-7 py-3.5 text-center font-medium !text-on-accent no-underline shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_30%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 sm:ml-auto sm:w-auto"
        >
          {s.cta.label} →
        </a>
      </div>

      {s.image ? (
        <div className="relative">
          <div aria-hidden className="preview-glow pointer-events-none absolute -inset-x-10 -inset-y-8" />
          <div className="gradient-frame relative rounded-[28px]">
            <div className="preview-bg relative aspect-[16/10] overflow-hidden rounded-[27px]">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                sizes="(min-width: 1280px) 732px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      ) : (
        <ServicePreview kind={s.preview} />
      )}

      <div className="mb-7 mt-4 flex justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <span>{s.caption[0]}</span>
        <span>{s.caption[1]}</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">You get</p>
          <ul className="mt-3 space-y-3">
            {s.gets.map((g) => (
              <li key={g} className="flex items-center gap-3">
                <Check />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Built with</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {s.stack.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}