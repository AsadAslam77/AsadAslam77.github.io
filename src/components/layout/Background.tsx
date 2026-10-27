const SIZE = 900;
const grow = (SIZE - 680) / 2;

const blobs = [
  { top: -120, left: -160, color: "var(--blob-green)" },
  { top: 380, right: -220, color: "var(--blob-amber)" },
  { top: 1500, left: -240, color: "var(--blob-green)" },
  { top: 2700, right: -200, color: "var(--blob-amber)" },
  { top: 3700, left: 160, color: "var(--blob-green)" },
];

export default function Background() {
  return (
    <div aria-hidden className="glow-in pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: b.top - grow,
            left: b.left !== undefined ? b.left - grow : undefined,
            right: b.right !== undefined ? b.right - grow : undefined,
            width: SIZE,
            height: SIZE,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${b.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}