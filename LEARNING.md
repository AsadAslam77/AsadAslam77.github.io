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

## Task 5: typed content and GlassCard

**`satisfies` vs a type annotation.** `lib/content.ts` — `const projects: Project[] = [...]` checks the data but then forgets it, so `projects[0].name` is just `string`. `as const satisfies readonly Project[]` checks it *and* keeps the exact literal types, so `projects[0].name` is the literal `"Wajood"`. Checking without widening is the whole point of `satisfies`, which is why it was added to TypeScript as a separate keyword rather than changing how `:` works.

**`as const` makes data readonly and literal.** `lib/content.ts` — it turns `string` into `"Wajood"`, `string[]` into a readonly tuple, and every property into `readonly`. That is why the types are written with `readonly` on every field: a mutable `Project[]` would reject readonly data.

**A missing value should be an object, not an empty string.** `lib/content.ts` — `screenshot: ""` renders as nothing and nobody notices for a month. `screenshot: fillIn("...")` is an object, and an object is not a valid React child, so TypeScript refuses to compile `{project.screenshot}` at all. The type system does the remembering instead of a human.

**A discriminated union.** `lib/content.ts` — `Unresolved` is two object shapes joined by `|`, told apart by the `unresolved` field. After `if (v.unresolved === "confirm")` TypeScript knows `v.value` exists; in the other branch it knows it does not. One field decides which shape you are holding.

**A type guard (`v is Unresolved<T>`).** `lib/content.ts` — a normal function returning `boolean` tells the compiler nothing. The return type `v is Unresolved<T>` promises that a `true` result means the narrowing is safe, so `resolve()` can use a plain `if` and have the types follow.

**Returning `T | null` forces the caller to think.** `lib/content.ts` — `resolve()` hands back `null` for a missing value, and `null` cannot be rendered without a check. That is what will make every section in tasks 7 to 12 draw a placeholder slot rather than a silent gap.

**Node runs TypeScript directly now.** `scripts/placeholders.mjs` — since Node 23.6 the runtime strips type annotations itself, so a plain `.mjs` script can `import("../lib/content.ts")` with no build step and no second copy of the data. It only strips types; it does not check them. That is still `tsc`'s job.

**`pathToFileURL` on Windows.** `scripts/placeholders.mjs` — a dynamic `import()` takes a URL, and `D:\path\file.ts` is not one: the drive letter reads like a URL scheme. `pathToFileURL()` converts it properly.

**A report should not be a gate.** `scripts/placeholders.mjs` — it always exits 0. A non-zero exit would make the unfinished content fail a build or a deploy, which would be the wrong thing: the point is to list what is left, not to block work.

**Why the CV is checked on disk, not marked `fillIn`.** `scripts/placeholders.mjs` — whether a file exists is a fact the script can look up, so hard-coding it as a placeholder would mean editing `content.ts` the day the file arrives. It is checked with `existsSync` instead and stops being reported on its own.

**Tailwind scans source text for class names.** `components/GlassCard.tsx` — Tailwind generates CSS only for strings it can literally see in the files. A class built at runtime, like `` rounded-[${n}px] ``, is never seen and so never generated, which is why the radii are a lookup object of complete class names.

**A component can choose its own HTML element.** `components/GlassCard.tsx` — the `as` prop is renamed to `Tag` while destructuring, and a capitalised variable in JSX is treated as a component or element name. That is how one panel can render as an `<article>` in the work grid and an `<li>` inside a list, so the markup stays meaningful without duplicating the component.

**Union props beat a free-form string.** `components/GlassCard.tsx` — `radius?: "panel" | "card" | "inner" | "pill"` means a typo is a build error and the editor offers the four choices. `radius?: string` would accept `"panle"` silently.

## Task 6: the Header

**The server/client boundary is per component, not per tree.** `components/Header.tsx` — `Header` has no `"use client"` and still renders `ThemeToggle` and `MobileMenu`, which do. A server component can render a client component as a child; what it cannot do is hold state or pass a function as a prop across the boundary. So the header is inert HTML with two small interactive islands inside it, and on a desktop the four nav links ship no JavaScript at all. Putting `useState` in `Header` instead would have pulled everything it renders into the browser bundle for no gain.

**A disclosure is not a dialog.** `components/MobileMenu.tsx` — a dialog covers the page and traps focus, so Tab cannot escape it. This menu is a disclosure: a button that shows a panel. It gets `aria-expanded` and `aria-controls`, but no focus trap, no `aria-modal` and nothing made `inert`, and tabbing past the last link carries on down the page. Trapping focus in something that is not modal is a common mistake and is genuinely unpleasant to use.

**`aria-expanded` and `aria-controls`.** `components/MobileMenu.tsx` — `aria-expanded` is read aloud as "collapsed" or "expanded", so a screen reader user knows what the button did without seeing it. `aria-controls` names the element the button owns. Both have to be on the *button*, not the panel.

**Focus has to be put back by hand.** `components/MobileMenu.tsx` — when Esc removes the panel, the element focus was sitting on no longer exists, and the browser's fallback is to drop focus on `<body>`. For a keyboard user that means the next Tab starts from the top of the page. Calling `buttonRef.current?.focus()` as part of closing is what keeps their place.

**`pointerdown` rather than `click` for outside-click.** `components/MobileMenu.tsx` — `pointerdown` fires before focus moves, so the panel is already closing by the time the clicked element takes focus. Listening for `click` leaves a frame where both have happened in the wrong order.

**Listeners are added only while open, and removed on cleanup.** `components/MobileMenu.tsx` — the effect returns a function that removes both listeners. Without it every open would add another pair and they would pile up, each one still firing.

**`scroll-margin-top`.** `app/page.tsx` — a sticky header covers the top of whatever an anchor link jumps to. `scroll-margin-top` tells the browser to stop that much short. It affects only where scrolling stops; it changes no layout, so it is harmless even if the header stops being sticky. Measured: the `#work` heading lands at 168px with the header ending at 94px.

**`tabIndex={-1}` makes an element focusable by script only.** `app/layout.tsx` — a `<main>` is not focusable, so in some browsers "Skip to content" scrolls the page but leaves focus behind in the header, and the next Tab goes back into the nav. `-1` lets focus land there without adding `<main>` to the tab order.

**`sr-only` keeps something in the tab order while hiding it.** `components/SkipLink.tsx` — `display: none` would remove it from the accessibility tree and the tab order entirely. `sr-only` clips it to a 1px box instead, so it is invisible but still reachable, and `focus:not-sr-only` brings it back the moment it is focused.

**Translucent is wrong for an overlay.** `app/globals.css` — the menu panel first used `glass-strong`, which is 12% white in dark mode. Over moving page content the heading behind it read straight through and collided with the menu text. The new `.glass-solid` is 94% opaque and keeps the border, shadow and blur. Glass works when what is behind it is decoration; it fails when what is behind it is text.

**`color-mix()` with a plain fallback.** `app/globals.css` — the rule sets `background` twice. An old browser does not understand the second declaration and keeps the first; a current one takes the second. That is the whole CSS fallback mechanism: a browser discards declarations it cannot parse.

**A fixed background and a sticky header do not fight.** `components/Header.tsx` — verified by `document.elementFromPoint` rather than by eye: inside the pill the topmost element is the pill, in the gap above it the header itself. `position: sticky` would break if any ancestor had `overflow: hidden`, which is worth remembering before wrapping the page in one.

## Task 6 follow-up: the glass was never frosted

**A build tool can silently delete a CSS declaration.** `app/globals.css` — the source had `backdrop-filter` followed by a hand-written `-webkit-backdrop-filter`. Lightning CSS, the minifier Next 16 uses, treated the hand-written prefix as authoritative and dropped the standard declaration, so the built CSS carried only the prefixed one. Chrome does not support `-webkit-backdrop-filter` at all, so every glass panel on the site had been plain translucent plastic since task 2. The fix is to write only the standard property and let the build add prefixes.

**Check the built output, not the source.** The bug was invisible in `globals.css` and obvious in `out/_next/static/chunks/*.css`. `getComputedStyle(el).backdropFilter` returned `"none"` while `CSS.supports("backdrop-filter", "blur(1px)")` returned `true`, which is the shape of a build problem rather than a browser one.

**It looked like a stacking bug and was not.** The symptom was a heading appearing to sit in front of the header. `z-index: 50` was correct and `document.elementFromPoint` confirmed the pill was topmost; the heading was simply showing through a sheet of near-transparent plastic. Testing six stacking variants and getting identical results is what ruled stacking out.

## Background: scrolling glows and a measured palette

**`position: fixed` pins a background to the viewport, `absolute` pins it to the page.** `components/Background.tsx` — a fixed layer shows the same glows no matter how far you scroll, because it never moves relative to the screen. Making it `absolute inset-0` inside a `relative` body sizes it to the whole document instead, so the glows scroll past and new ones arrive. Verified by comparing the layer's height with `document.scrollHeight`.

**Percentages for position, pixels for the bits that must not scale.** `app/globals.css` — the glows sit at `calc(-3% + 340px)` and so on. The percentage spreads them over whatever height the page ends up being; the 340px is half the mockup's 680px box, converting its top-edge figure into a centre. Mixing the two units in one `calc()` is the point, not a smell.

**Placing by centre with `translate(-50%, -50%)`.** `app/globals.css` — with `top`/`left` alone, changing a blob's size moves it, because the box grows from its top-left corner. Shifting it back by half its own size means size and position are independent, which is what makes three responsive sizes possible without three sets of coordinates.

**`overflow: hidden` on the background layer, never on an ancestor of the header.** `components/Background.tsx` — it clips the glows that hang off the page edges so they cannot cause a horizontal scrollbar. It is safe only because that element is a sibling of the header: `overflow: hidden` on an ancestor silently breaks `position: sticky`.

**Contrast has to be measured against what is actually drawn.** `app/globals.css` — a translucent panel has no colour of its own, so the number that matters is text against bg + glow + panel composited together. The method: screenshot the page with the content hidden, take the most extreme background pixel at four widths, composite each glass fill over it, then compute WCAG 2.1. Assuming the glow's nominal alpha is wrong in both directions, because a radial gradient only reaches full strength at its centre and because two overlapping glows go brighter than either alone.

**Worst case is not typical case.** `CLAUDE.md` — dark `text` reads 18.38:1 on the plain page background and 6.44:1 at a glow centre under a glass panel. Both are true; the second is the one that has to clear 4.5:1. Quoting only the first is how a palette passes review and still fails in use.

**Overlap is a contrast input.** `app/globals.css` — five glows at 940px on the 768px layout overlapped enough to lift the background past the point where `accent-text` and `warm-text` cleared 4.5:1, even though each glow's opacity was unchanged. An intermediate 680px size at `md` fixed it. Sizes, opacities and text colours are one system, which is why CLAUDE.md now says not to change one without re-running the check.

## Matching a blur with a gradient

**Fit the curve, do not guess at it.** `app/globals.css` — the glows went through three hand-guessed gradients before this one, and each looked subtly wrong. The fix was to stop guessing: render the mockup's exact recipe (a 680px circle with `filter: blur(130px)`) on its own, read the alpha outward from the centre pixel by pixel, and fit the gradient stops to the numbers. The result matches to within 0.006 alpha, which is smaller than one step of 8-bit colour.

**How to read alpha back out of a screenshot.** `scratchpad/profile.mjs` — a screenshot has no alpha channel, it is already composited. But if the glow colour and the background colour are both known, then `observed = glow × a + background × (1 − a)` can be rearranged to `a = (observed − background) / (glow − background)`. Using the channel with the widest separation (green, 185 against 16) keeps the rounding error small.

**A blurred circle is much wider than its box.** `app/globals.css` — "680px circle, blur 130px" reads like a glow about 470px across. Measured, it reaches 600px, because a Gaussian blur has a long tail that keeps spreading well past the radius you would estimate. Every earlier version of the background looked tight and died too early for exactly this reason.

**The same assets can look different for a reason that is not the assets.** The last visible difference against the mockup was that our glows covered proportionally more of the page. The glows were right; the page was 3323px against the mockup's 4682px, because the sections are still stubs. Padding the page to a matching length made the two backgrounds line up, which is what proved the recipe correct.

## Softening the dark glows

**The same opacity does not read the same on a dark page.** `app/globals.css` — the mockup's 0.38 emerald looks like light on a pale background and like a solid green shape on a near-black one, because what the eye judges is the *contrast step* between the glow and the page, and that step is far bigger in dark mode. Dark therefore gets 0.28 and a 1.15x spread while light keeps the mockup's values.

**Lower peak, wider spread, same impression.** `app/globals.css` — softening by only lowering opacity makes a glow weak; softening by only enlarging it makes a wash. Doing both keeps roughly the same amount of light on the page while removing the bright core that made it read as a shape.

**A `--blob-scale` variable keeps one rule serving two themes.** `app/globals.css` — `width: calc(var(--blob-size) * var(--blob-scale))` means the responsive sizes stay in one place and the theme only adjusts a multiplier, instead of duplicating three breakpoints per theme.

**Softening a background is contrast-positive, which is worth knowing before measuring.** `app/globals.css` — in dark mode every text token is light, so anything that lowers the background can only raise contrast. The check still has to be re-run, but the direction is known in advance: dark `muted` went from 3.87:1 to 4.74:1 and cleared `glass-strong`, which had been the one failing pair in the whole palette.
