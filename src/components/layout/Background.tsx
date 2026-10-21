const blobs = [
  { top: -120, left: -160, color: "var(--blob-green)" },
  { top: 380, right: -220, color: "var(--blob-amber)" },
  { top: 1500, left: -240, color: "var(--blob-green)" },
  { top: 2700, right: -200, color: "var(--blob-amber)" },
  { top: 3700, left: 160, color: "var(--blob-green)" },
];

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: b.top,
            left: b.left,
            right: b.right,
            width: 680,
            height: 680,
            borderRadius: "50%",
            background: b.color,
            filter: "blur(130px)",
          }}
        />
      ))}
    </div>
  );
}