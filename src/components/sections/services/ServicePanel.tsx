import Image from "next/image";
import type { Service } from "@/types/service";
import ServicePreview from "./previews";

const pad = (n: number) => String(n).padStart(2, "0");

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
      <h3 className="svc-title mb-4 mt-3 break-words font-display font-bold leading-[1.02] tracking-[-0.035em]">
        {s.title}
      </h3>
      <p className="svc-desc mb-6 max-w-[640px] text-muted">{s.description}</p>

      <div className="mb-6 flex flex-wrap items-center gap-x-3.5 gap-y-4">
        <span className="rounded-md border border-[var(--slot-border)] px-2.5 py-1.5 font-mono text-xs tracking-[0.12em] text-muted">
          DELIVERS
        </span>
        <span className="text-base">{s.delivers}</span>
        <a
          href={s.cta.href}
          className="w-full rounded-full bg-accent px-7 py-3 text-center font-medium !text-on-accent no-underline shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_30%,transparent)] transition-transform duration-200 hover:-translate-y-0.5 sm:ml-auto sm:w-auto"
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
        <div data-nosnippet>
          <ServicePreview kind={s.preview} />
        </div>
      )}

      <div className="mt-4 flex justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <span>{s.caption[0]}</span>
        <span>{s.caption[1]}</span>
      </div>
    </div>
  );
}