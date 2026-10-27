import type { PreviewKind } from "@/types/service";
import PreviewStage from "./PreviewStage";
import { Badge, Browser, Ln, Phone, PreviewFrame } from "./devices";

const Slash = ({ s = "h-4 w-1.5" }: { s?: string }) => (
  <span aria-hidden className={`inline-block -skew-x-12 bg-[#FCD34D] ${s}`} />
);

const Brand = () => (
  <div className="flex items-center gap-3">
    <Slash />
    <span className="font-mono text-xs tracking-[0.14em]">[YOUR BRAND]</span>
  </div>
);

const SiteNav = () => (
  <div className="mb-5 flex items-center justify-between">
    <Brand />
    <div className="flex items-center gap-2.5">
      <Ln w={40} />
      <Ln w={40} />
      <span className="h-5 w-[60px] rounded bg-[#08150F]" />
    </div>
  </div>
);

const Btn = ({ t }: { t: string }) => (
  <span className="mt-3.5 inline-block rounded bg-[#10B981] px-3 py-1.5 text-xs font-medium text-[#08150F]">
    {t}
  </span>
);

const Card = ({ tint, w }: { tint: string; w: string }) => (
  <div className="h-[130px] rounded-lg border border-[#D2DFD7] bg-white p-2.5">
    <div className="mb-2.5 h-[60px] rounded-md" style={{ background: tint }} />
    <Ln w={w} />
  </div>
);

const tints = [
  "rgba(16,185,129,.3)",
  "rgba(252,211,77,.4)",
  "#DCE7E1",
  "rgba(16,185,129,.18)",
  "rgba(252,211,77,.25)",
  "#E6EEE9",
  "rgba(16,185,129,.28)",
  "rgba(252,211,77,.35)",
];

/* ---------- Web ---------- */
function WebBrowser() {
  return (
    <div className="p-5 @md:p-6">
      <SiteNav />
      <div className="grid items-center gap-[18px] @md:grid-cols-2">
        <div>
          <p className="font-display text-[26px] font-bold leading-[1.1]">Your product, built fast.</p>
          <Ln w="80%" className="mb-2 mt-3" />
          <Ln w="55%" />
          <Btn t="Get started" />
        </div>
        <div className="relative h-[104px] overflow-hidden rounded-lg bg-[#0C1E17]">
          <span aria-hidden className="absolute -top-5 right-14 h-40 w-[34px] -skew-x-[20deg] bg-[#FCD34D]" />
        </div>
      </div>
      <div className="mt-[18px] grid grid-cols-3 gap-3">
        <Card tint={tints[0]} w="70%" />
        <Card tint={tints[1]} w="60%" />
        <Card tint={tints[2]} w="75%" />
      </div>
    </div>
  );
}

function WebPhone() {
  return (
    <>
      <div className="mb-3.5 flex items-center gap-2">
        <Slash s="h-3 w-[5px]" />
        <span className="font-mono text-[10px] tracking-[0.14em]">[YOUR BRAND]</span>
      </div>
      <p className="font-display text-xl font-bold leading-[1.1]">Your product, built fast.</p>
      <Ln w="85%" className="mb-1.5 mt-3" />
      <Ln w="60%" />
      <Btn t="Get started" />
      <div className="mt-4 h-[70px] rounded-lg bg-[#0C1E17]" />
    </>
  );
}

/* ---------- Store ---------- */
function StoreBrowser() {
  return (
    <div className="p-5 @md:p-6">
      <SiteNav />
      <p className="mb-4 font-display text-[22px] font-bold">Shop the collection</p>
      <div className="grid grid-cols-2 gap-3 @md:grid-cols-4">
        {tints.map((t, i) => (
          <Card key={i} tint={t} w={i % 2 ? "55%" : "70%"} />
        ))}
      </div>
    </div>
  );
}

function StorePhone() {
  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <Slash s="h-3 w-[5px]" />
        <span className="font-mono text-[10px] tracking-[0.14em]">[YOUR BRAND]</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {tints.slice(0, 6).map((t, i) => (
          <div key={i} className="rounded-lg border border-[#D2DFD7] bg-white p-1.5">
            <div className="mb-1.5 h-[56px] rounded" style={{ background: t }} />
            <Ln w="70%" />
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- Mobile ---------- */
function AppScreen() {
  return (
    <div className="flex h-[300px] flex-col">
      <Ln w="50%" className="mb-3" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="mb-2.5 flex items-center gap-2.5 rounded-lg border border-[#D2DFD7] bg-white p-2">
          <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: tints[i] }} />
          <div className="flex-1">
            <Ln w="80%" className="mb-1.5" />
            <Ln w="50%" />
          </div>
        </div>
      ))}
      <div className="mt-auto flex justify-around border-t border-[#D2DFD7] py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#10B981]" />
        <span className="h-2 w-2 rounded-full bg-[#C7D6CD]" />
        <span className="h-2 w-2 rounded-full bg-[#C7D6CD]" />
      </div>
    </div>
  );
}

/* ---------- Backend ---------- */
function BackendBody() {
  return (
    <div className="flex">
      <div className="hidden w-[150px] shrink-0 bg-[#0C1E17] p-4 @md:block" style={{ minHeight: 420 }}>
        <div className="mb-5 flex items-center gap-2">
          <Slash s="h-3 w-[5px]" />
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#F4FBF7]">[ADMIN]</span>
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`mb-3 h-2 rounded ${i === 0 ? "bg-[#34D399]" : "bg-[#2A4A3D]"}`}
            style={{ width: `${80 - i * 8}%` }}
          />
        ))}
      </div>
      <div className="min-w-0 flex-1 p-4 @md:p-5">
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-[#D2DFD7] bg-white p-3">
              <Ln w="50%" className="mb-3" />
              <div className="h-4 w-3/5 rounded" style={{ background: tints[i] }} />
            </div>
          ))}
        </div>
        <div className="mb-4 flex h-[110px] items-end gap-2.5 rounded-lg border border-[#D2DFD7] bg-white p-3">
          {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-t bg-[#34D399]" style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.55 }} />
          ))}
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b border-[#E3ECE7] py-2.5">
            <span className="h-6 w-6 rounded-full" style={{ background: tints[i] }} />
            <Ln w="35%" />
            <span className="ml-auto h-4 w-12 rounded-full bg-[#DCE7E1]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- AI ---------- */
function AiCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute overflow-hidden rounded-t-2xl bg-[#F2F7F4] p-5 text-[#08150F] shadow-[0_24px_60px_rgba(0,0,0,.45)] ${className}`}
    >
      <div className="mb-5 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#10B981" aria-hidden="true">
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
        </svg>
        <span className="font-mono text-xs tracking-[0.14em]">ASSISTANT</span>
      </div>
      <div className="mb-4 ml-auto w-[260px] max-w-[85%] rounded-2xl rounded-br-md bg-[#0C1E17] px-4 py-3 text-sm text-[#F4FBF7]">
        Recommend something for my pet
      </div>
      <div className="w-[330px] max-w-full rounded-2xl rounded-bl-md border border-[#D2DFD7] bg-white p-4">
        <Ln w="90%" className="mb-2" />
        <Ln w="70%" className="mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-lg border border-[#D2DFD7] p-2">
              <div className="mb-2 h-[70px] rounded" style={{ background: tints[i] }} />
              <Ln w="70%" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-full border border-[#D2DFD7] bg-white py-2 pl-4 pr-2">
        <Ln w="45%" />
        <span className="ml-auto h-8 w-8 rounded-full bg-[#10B981]" />
      </div>
    </div>
  );
}

export default function ServicePreview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "web":
      return <PreviewStage browser={<WebBrowser />} phone={<WebPhone />} />;

    case "store":
      return <PreviewStage browser={<StoreBrowser />} phone={<StorePhone />} />;

       case "mobile":
      return (
        <PreviewFrame
          compact={
            <>
              <Phone className="absolute left-3 top-6 -rotate-6 scale-[.9]">
                <AppScreen />
              </Phone>
              <Phone className="absolute right-3 top-4">
                <AppScreen />
              </Phone>
              <Badge>MOBILE · 390PX</Badge>
            </>
          }
        >
          {/* Desktop phones: these two get the floating animation */}
          <Phone className="float-slow absolute left-[170px] top-[84px] -rotate-6 scale-[.92]">
            <AppScreen />
          </Phone>
          <Phone className="float-slow absolute left-[360px] top-[60px] origin-top scale-[1.15] [animation-delay:-3s]">
            <AppScreen />
          </Phone>
        </PreviewFrame>
      );

    case "backend":
      return (
        <PreviewFrame
          compact={
            <>
              <Browser className="inset-x-4 top-12 h-[330px]">
                <BackendBody />
              </Browser>
              <Badge>MOBILE · 390PX</Badge>
            </>
          }
        >
          <Browser className="left-[42px] top-[56px] h-[464px] w-[648px]">
            <BackendBody />
          </Browser>
        </PreviewFrame>
      );

    case "ai":
      return (
        <PreviewFrame
          compact={
            <>
              <AiCard className="inset-x-4 top-12 mx-auto h-[330px] max-w-[440px]" />
              <Badge>MOBILE · 390PX</Badge>
            </>
          }
        >
          <AiCard className="left-1/2 top-14 h-[470px] w-[440px] -translate-x-1/2" />
        </PreviewFrame>
      );
  }
}