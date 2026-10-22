export function PreviewFrame({
  compact,
  children,
  controls,
}: {
  compact: React.ReactNode; // shown below 768px, laid out naturally
  children: React.ReactNode; // desktop design, drawn at 732x520 and scaled
  controls?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div aria-hidden className="preview-glow pointer-events-none absolute inset-x-0 -inset-y-8" />
      <div className="gradient-frame relative rounded-[24px] md:rounded-[28px]">
        <div className="preview-bg relative h-[360px] overflow-hidden rounded-[23px] md:h-[478px] md:rounded-[27px] lg:h-[411px] xl:h-[520px]">
          <div aria-hidden className="md:hidden">
            {compact}
          </div>
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-[520px] w-[732px] origin-top -translate-x-1/2 md:block md:scale-[.92] lg:scale-[.79] xl:scale-100"
          >
            {children}
          </div>
          {controls}
        </div>
      </div>
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 z-10 rounded-md border border-[var(--glass-border)] bg-[var(--bg)] px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-fg md:bottom-5 md:left-6 md:text-xs">
      {children}
    </span>
  );
}

export function Browser({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`@container absolute overflow-hidden rounded-t-xl bg-[#F2F7F4] text-[#08150F] shadow-[0_24px_60px_rgba(0,0,0,.45)] ${className}`}
    >
      <div className="flex items-center gap-2 bg-[#DCE7E1] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#A9BAB1]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#A9BAB1]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#A9BAB1]" />
        <span className="ml-3 h-[18px] flex-1 rounded-full bg-white" />
      </div>
      {children}
    </div>
  );
}

export function Phone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-[350px] w-[170px] overflow-hidden rounded-[32px] border-[7px] border-[#1B3128] bg-[#F2F7F4] text-[#08150F] shadow-[0_30px_60px_rgba(0,0,0,.55)] ${className}`}
    >
      <div className="mx-auto mb-3.5 mt-2.5 h-1.5 w-14 rounded-full bg-[#1B3128]" />
      <div className="px-3.5">{children}</div>
    </div>
  );
}

export function Ln({ w = "100%", className = "" }: { w?: number | string; className?: string }) {
  return <div className={`h-2 rounded bg-[#C7D6CD] ${className}`} style={{ width: w }} />;
}