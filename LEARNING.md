# Learning log

One entry per concept met while building this site: the concept, the file
where it appears, and a plain sentence about it.

## Task 1: scaffold and file moves

**Static export.** `next.config.ts` — `output: "export"` tells Next.js to
write finished HTML, CSS and JS into `out/` at build time, so a plain file
host like GitHub Pages can serve the site with no Node.js server running.

**Why there can be no API routes or contact form.** `next.config.ts` — with
no server at runtime, anything that needs to execute code when a visitor
arrives is impossible, which is why contact is a `mailto:` link.

**Unoptimized images.** `next.config.ts` — `next/image` normally resizes
images on a server as they are requested; with no server that cannot happen,
so `images: { unoptimized: true }` tells it to serve the files as they are.

**Partial Prerendering and why it was removed.** `next.config.ts` — the
Next.js 16 generator switches on `cacheComponents` and `partialPrefetching`,
which send a static shell immediately and fill the dynamic parts from a server
a moment later. The first build failed with `PPR cannot be enabled in export
mode`, because that second half needs a server. Both options are gone.

**The `public/` folder.** `public/CNAME` — every file in `public/` is copied
into `out/` untouched at build time, which is how `CNAME` reaches the root of
the published site and keeps the custom domain working.

**Tailwind v4 through Turbopack.** `next.config.ts` and `app/globals.css` —
Tailwind v4 has no `tailwind.config.js`. It is configured in CSS with
`@import "tailwindcss"` and an `@theme` block, and in Next.js 16 it is
compiled by Turbopack through the `@tailwindcss/turbopack` loader rather than
by PostCSS.

**`git mv` instead of `mv`.** `legacy/index.html` — `git mv` moves the file
and records the move in one step, so git shows a rename with zero changed
lines and the file's history survives instead of looking like a delete plus
an unrelated new file.

**CRLF line endings on Windows.** `.gitignore` — this computer has
`core.autocrlf=true`, so git stores files with Unix `LF` endings but writes
Windows `CRLF` into the working copy. The same file therefore has two
different checksums depending on where you look, while git correctly treats
it as unchanged.

**Why a file's encoding matters to git.** `.gitignore` — the original file was
saved as UTF-16, where every character is followed by a zero byte. Git reads
`.gitignore` as plain text lines, could not match any pattern in it, and so
ignored nothing at all.

## Task 2: design tokens and glass

**CSS custom properties as a theme.** `app/globals.css` — every colour is a
variable such as `--muted`, defined once for light on `:root` and again for
dark on `.dark`. Nothing else in the site names a colour, so switching theme
is just a class change on `<html>`.

**Why `.dark` is a class and not a media query.** `app/globals.css` — a
`prefers-color-scheme` media query follows the operating system and cannot be
overridden by a button. `next-themes` sets `class="dark"` instead, which is
what makes the toggle in task 4 possible while still defaulting to the
system setting.

**`@theme inline` is Tailwind v4's config.** `app/globals.css` — Tailwind v4
has no `tailwind.config.js`. Listing `--color-muted: var(--muted)` inside
`@theme inline` is what creates the `text-muted` and `bg-muted` classes. The
`inline` keyword makes the class read the variable when it is used rather
than baking in the light value at build time, so utilities follow the theme.

**`clamp()` for fluid type.** `app/globals.css` — `clamp(48px, 12vw, 88px)`
tells the browser to use 12% of the viewport width, but never smaller than
48px or larger than 88px, so headings scale smoothly with no breakpoints.

**`:focus-visible` vs `:focus`.** `app/globals.css` — `:focus-visible` only
draws the ring when the browser thinks the user is navigating by keyboard, so
keyboard users keep a visible outline while mouse users do not see a ring
after every click.

**`@supports not (...)` as a fallback.** `app/globals.css` — where
`backdrop-filter` is unavailable, a panel at 6% white over a coloured blob is
unreadable, so the rule swaps in the more opaque fill. The browser applies it
only when the feature is genuinely missing.

**Radial gradients instead of `filter: blur`.** `app/globals.css` — a
`radial-gradient(circle, colour 0%, transparent 70%)` has its soft edge built
into the gradient, so the GPU never has to run a blur pass over a 680px
surface, which matters most on phones.

**Server components are the default.** `components/Background.tsx` — this file
has no `"use client"` because it has no state and no event handlers. It is
rendered to HTML at build time and ships no JavaScript to the browser. Only
components that need interactivity, such as the theme toggle, opt into being
client components.

**Decorative elements must be hidden from assistive tech.** `components/Background.tsx`
— `aria-hidden="true"` keeps the blobs out of a screen reader's announcement
and `pointer-events: none` stops them intercepting clicks.

**Alpha compositing and contrast.** `app/globals.css` — a translucent panel
has no colour of its own; its effective colour is the blend of the panel, the
blob behind it and the page background. Contrast has to be measured against
that blend, not against the page background alone.

## Task 3: fonts

**`next/font` self-hosts Google fonts.** `app/layout.tsx` — the font files are
downloaded at build time and written into `out/_next/static/media/`, so the
visitor's browser never contacts Google. Verified: the page makes zero
requests to fonts.googleapis.com or fonts.gstatic.com.

**A font's `.variable` is a generated class.** `app/layout.tsx` — calling
`Space_Grotesk({ variable: "--font-space-grotesk" })` returns an object whose
`.variable` is a class name that defines that CSS variable. Both classes go
on `<html>`, which is what makes the variables available page-wide.

**Fonts are split by unicode range, not by weight.** `out/_next/static/media/`
— Google serves a family as several files, each covering a range of
characters, and the browser downloads only the ones whose characters actually
appear. Eight files are built; only the two latin ones are ever requested.

**`display: "swap"`.** `app/layout.tsx` — text paints immediately in a
fallback face and swaps to the real one when it arrives, instead of staying
invisible while the font downloads.

**A base rule beats repeating a class.** `app/globals.css` — one
`@layer base { h1, h2, h3 { font-family: var(--font-heading) } }` rule gives
every heading the display face. Putting it in `@layer base` keeps its
specificity low, so a utility class can still override it where needed.

**`--font-sans` is special to Tailwind.** `app/globals.css` — Tailwind points
the document's default font at `--font-sans`, so defining it as Geist makes
body text Geist with no class anywhere on the page.

**The build needs the internet, the visitor does not.** `app/layout.tsx` —
next/font fetches from Google while building. GitHub Actions runners have
internet so the deploy works, but a Google Fonts outage would fail a build.
`next/font/local` with the files committed to the repo would remove that.

## Task 4: theme toggle

**Client components.** `components/ThemeToggle.tsx` — `"use client"` at the top
of a file means its JavaScript is sent to the browser as well as being
rendered to HTML at build time. Only components that need to respond to the
user need it: a server component cannot have an `onClick` at all.

**Correction: React is already in the bundle.** Measured, not assumed. Before
this task the page transferred 456,270 bytes of JavaScript with no client
component of ours at all; after adding next-themes and the toggle it was
460,875 bytes. The real cost of this task was **4,605 bytes**, not the ~40KB
"React runtime" figure quoted while planning. That figure was wrong for this
project: Next.js ships React and its App Router runtime for every page
regardless, so the first client component does not introduce React. What a
client component actually adds is its own code plus any library it imports.
(Those numbers are uncompressed; gzipped, the whole JS payload is about
176KB, which is closer to what a real host sends.)

**Hydration.** `app/layout.tsx` — the browser receives finished HTML, then
React runs over it and attaches event handlers. If what React renders on the
first pass disagrees with the HTML it was given, that is a hydration
mismatch.

**Why the theme causes a mismatch, and `suppressHydrationWarning`.**
`app/layout.tsx` — next-themes injects a small script that runs before the
first paint and sets `class="dark"` on `<html>`. That is what prevents a
flash of the wrong theme, but it also means the DOM no longer matches the
build-time HTML. `suppressHydrationWarning` on `<html>` tells React to accept
a difference on that one element.

**The icon needs its own guard.** `components/ThemeToggle.tsx` — at build
time there is no browser, so the correct icon is unknowable. The component
renders no icon until it knows it is running in the browser, so the server
HTML and the first client render agree.

**`useSyncExternalStore` instead of `useState` + `useEffect`.**
`components/ThemeToggle.tsx` — the usual "mounted" trick sets state inside an
effect, which `npm run lint` rejects because it causes a second render pass
immediately after the first. `useSyncExternalStore` takes a separate server
snapshot and client snapshot, giving the same answer with no effect at all.

**`resolvedTheme` vs `theme`.** `components/ThemeToggle.tsx` — with
`defaultTheme="system"`, `theme` is the literal string `"system"`.
`resolvedTheme` is the `"dark"` or `"light"` it actually worked out to, which
is what the icon and the label need.

**An `aria-label` has to tell the truth in both states.**
`components/ThemeToggle.tsx` — the label says "Switch to light mode" only
while dark is active, and flips when the theme does. The icons are
`aria-hidden` because the label already describes the button.

**How the choice is remembered.** next-themes writes `localStorage.theme`.
The pre-paint script reads it on the next visit, so an explicit choice beats
the system setting. Verified: with the system set to dark and light chosen,
a reload still shows light.
