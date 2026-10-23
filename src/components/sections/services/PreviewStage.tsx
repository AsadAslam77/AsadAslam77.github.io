"use client";

import { useState } from "react";
import { Badge, Browser, Phone, PreviewFrame } from "./devices";

type Mode = "desktop" | "tablet" | "phone";

const modes: { id: Mode; label: string; badge: string }[] = [
  { id: "desktop", label: "Desktop", badge: "DESKTOP · 1200PX" },
  { id: "tablet", label: "Tablet", badge: "TABLET · 820PX" },
  { id: "phone", label: "Phone", badge: "PHONE · 390PX" },
];

export default function PreviewStage({
  browser,
  phone,
}: {
  browser: React.ReactNode;
  phone: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("desktop");
  const badge = modes.find((m) => m.id === mode)!.badge;

  return (
    <PreviewFrame
      compact={
        <>
          <Browser className="inset-x-4 top-12 h-[330px]">{browser}</Browser>
          <Badge>MOBILE · 390PX</Badge>
        </>
      }
      controls={
        <div className="hidden md:contents">
          <div
            role="group"
            aria-label="Preview size"
            className="glass-solid absolute left-6 top-5 z-10 flex gap-1 rounded-full p-1"
          >
            {modes.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={mode === m.id}
                onClick={() => setMode(m.id)}
                className={`cursor-pointer rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-[0.1em] ${
                  mode === m.id ? "bg-accent text-on-accent" : "text-muted"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <Badge>{badge}</Badge>
        </div>
      }
    >
      <div key={mode} className="panel-in absolute inset-0">
        {mode === "desktop" && (
          <>
            <Browser className="left-10 top-[78px] h-[460px] w-[568px]">{browser}</Browser>
            <div className="float-slow absolute -bottom-10 right-9">
              <Phone>{phone}</Phone>
            </div>
          </>
        )}
        {mode === "tablet" && (
          <Browser className="left-[166px] top-[78px] h-[460px] w-[400px]">{browser}</Browser>
        )}
        {mode === "phone" && (
          <div className="absolute left-1/2 top-[84px] origin-top -translate-x-1/2 scale-[1.2]">
            <Phone>{phone}</Phone>
          </div>
        )}
      </div>
    </PreviewFrame>
  );
}