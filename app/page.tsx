/**
 * TEMPORARY swatch page for task 2.
 *
 * It exists only so the design tokens, the glass panels and the fluid type
 * scale can be looked at before any real section exists. Task 6 replaces
 * this file with the real page and Header.
 */

const colourTokens = [
  { name: "bg", varName: "--bg" },
  { name: "text", varName: "--text" },
  { name: "muted", varName: "--muted" },
  { name: "accent", varName: "--accent" },
  { name: "accent-text", varName: "--accent-text" },
  { name: "warm", varName: "--warm" },
  { name: "warm-text", varName: "--warm-text" },
  { name: "glass", varName: "--glass" },
  { name: "glass-strong", varName: "--glass-strong" },
  { name: "border", varName: "--border" },
  { name: "shadow", varName: "--shadow" },
  { name: "on-accent", varName: "--on-accent" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1120px] px-5 py-12 lg:px-12">
      <h1 className="text-section font-medium">Design tokens</h1>
      <p className="mt-2 text-muted">
        Temporary swatch page. Task 6 replaces it with the real page.
      </p>

      {/* Colour tokens */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">Colours</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colourTokens.map((token) => (
            <li key={token.name} className="glass rounded-[14px] p-3">
              <div
                className="h-12 w-full rounded-[10px] border"
                style={{
                  background: `var(${token.varName})`,
                  borderColor: "var(--border)",
                }}
              />
              <p className="mt-2 text-sm">{token.name}</p>
              <p className="text-sm text-muted">{token.varName}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Glass panels, deliberately over a blob area */}
      <section className="mt-12">
        <h2 className="text-xl font-medium">Glass</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="glass rounded-[24px] p-6">
            <h3 className="text-lg font-medium">.glass</h3>
            <p className="mt-2 text-muted">
              Muted body text on a glass panel, over the background blobs.
            </p>
            <p className="mt-2 text-accent-text">Accent text on glass.</p>
            <p className="mt-2 text-warm-text">Warm text on glass.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="glass-strong rounded-full px-4 py-1.5 text-[15px]">
                Next.js
              </span>
              <span className="glass-strong rounded-full px-4 py-1.5 text-[15px]">
                Firebase
              </span>
            </div>
          </div>
          <div className="glass-strong rounded-[24px] p-6">
            <h3 className="text-lg font-medium">.glass-strong</h3>
            <p className="mt-2 text-muted">
              The heavier fill, used for chips and secondary buttons.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-medium text-on-accent"
              >
                Accent button
              </a>
              <a
                href="#"
                className="glass-strong inline-flex min-h-11 items-center rounded-full px-6"
              >
                Glass button
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fluid type scale */}
      <section className="mt-12">
        <h2 className="text-xl font-medium">Fluid type</h2>
        <div className="mt-4 space-y-4">
          <p className="font-heading text-name font-bold leading-none tracking-[-0.03em]">
            Muhammad Asad
          </p>
          <p className="font-heading text-section font-bold tracking-[-0.02em]">
            Selected work
          </p>
          <p className="font-heading text-statement font-medium tracking-[-0.02em]">
            I build the whole product.
          </p>
          <p className="font-heading text-contact font-bold tracking-[-0.02em]">
            Let&apos;s work together.
          </p>
        </div>
      </section>

      {/* Focus test */}
      <section className="mt-12 pb-16">
        <h2 className="text-xl font-medium">Focus ring</h2>
        <p className="mt-2 text-muted">
          Tab to these: the ring should appear on keyboard focus only.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="#"
            className="glass-strong inline-flex min-h-11 items-center rounded-full px-6"
          >
            Link one
          </a>
          <button
            type="button"
            className="glass-strong inline-flex min-h-11 items-center rounded-full px-6"
          >
            Button two
          </button>
        </div>
      </section>
    </main>
  );
}
