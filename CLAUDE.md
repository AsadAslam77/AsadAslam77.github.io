# CLAUDE.md: asaddev.me portfolio

## Project
Personal portfolio and freelance site for Muhammad Asad at https://asaddev.me.
Content lives in `content.md`. Visual references (dark and light mockups) live in `design/`.

## Stack
- Next.js (App Router), TypeScript, Tailwind CSS v4
- `motion` (import from "motion/react") for animation
- `next-themes` for dark and light mode
- Fonts through next/font: Space Grotesk (headings), Geist (body)
- Static export for GitHub Pages: `output: 'export'` and `images: { unoptimized: true }`

## Hard rules
- Never delete or edit `public/CNAME` (it contains asaddev.me).
- No API routes, server actions, middleware, or anything that needs a server.
- `npm run build` must succeed (static export into `out/`) before committing changes to config or pages.
- Use only facts from `content.md`. Do not invent metrics, testimonials or client names.
- Do not put a phone number on the site.

## Learning mode (important)
Asad is learning from this project, while building it. For every task:
1. Plan first, in plain language, before editing any file.
2. Keep changes small: one feature per commit.
3. After changing code, give a short plain explanation of it: what each new
   file or function does and why, and the name of any new concept (for
   example server vs client components). Keep it brief and move on.
4. Append a short entry to `LEARNING.md`: the concept, the file where it
   appears, and one plain sentence.
5. Do not quiz Asad. No comprehension questions, no "three questions about
   this task". Explain, log it, and carry on building. Ask a question only
   when a real decision needs his answer.
6. Prefer simple, readable code over clever code. Comment only where the
   reason is not obvious.

## Design
Glass UI (glassmorphism) with dark and light modes. The default follows the visitor's system setting. A toggle in the header switches it and remembers the choice, with no flash on load.

Tokens (CSS variables, light on `:root`, dark on `.dark`):

| token | dark | light |
|---|---|---|
| bg | #06100D | #F2F7F4 |
| text | #F4FBF7 | #08150F |
| muted | #9DB0A6 | #4B5F55 |
| accent (fills) | #34D399 | #10B981 |
| accent-text | #6EE7B7 | #047857 |
| warm (fills) | #FBBF24 | #F59E0B |
| warm-text | #FCD34D | #B45309 |
| glass | rgba(255,255,255,0.06) | rgba(255,255,255,0.55) |
| glass-strong | rgba(255,255,255,0.12) | rgba(255,255,255,0.8) |
| border | rgba(255,255,255,0.14) | rgba(255,255,255,0.9) |
| shadow | rgba(0,0,0,0.35) | rgba(6,78,59,0.14) |
| on-accent (text on accent fills) | #06100D | #08150F |

- Glass panel: translucent fill, 1px border, soft shadow, `backdrop-filter: blur(18px) saturate(150%)`. Add an `@supports not (backdrop-filter: blur(1px))` fallback with a more opaque fill.
- Radii: large panels 24 to 32px, pills 999px, inner images 14px.
- Background: a few large blobs (emerald and amber) behind the content, drawn as `radial-gradient(circle, colour 0%, transparent 70%)` rather than `filter: blur`, so the GPU has no blur pass to run. Dark: rgba(16,185,129,0.24) and rgba(251,191,36,0.20). Light: rgba(16,185,129,0.18) and rgba(245,158,11,0.25). The emerald values are capped by contrast: a glass panel over an emerald blob must still clear 4.5:1 for `muted` text in dark and `warm-text` in light.
- Accessibility: visible focus styles, 44px touch targets, text contrast of at least 4.5:1, respect `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`).
- Motion: one staggered hero entrance, a subtle hover on project cards, `whileInView` reveals in the work section only. Animate only opacity and transform.

## Structure
- `app/layout.tsx`, `app/page.tsx`
- `components/`: Header, ThemeToggle, Hero, Statement, Work, Services, Process, Experience, Contact, GlassCard
- `lib/content.ts`: typed data taken from `content.md`
- `public/`: CNAME, Asad_CV.pdf, images

## Commands
- `npm run dev`: local preview
- `npm run build`: static export, check the `out/` folder
- `npm run lint`

## Build workflow: one section at a time
Build the site in this order, one section per session or task: scaffold and tokens, theme toggle, Header, Hero, Statement, Work, Services, Process, Experience, Contact, animation, SEO and accessibility, deploy.
For each section:
1. Plan first. Read the matching part of `content.md` and the screenshots in `design/`.
2. Build it mobile first, then add the larger layouts.
3. Check it at 360, 390, 768, 1024 and 1440px wide, in both dark and light mode, before saying it is done.
4. Explain the new code and add an entry to `LEARNING.md`.
5. Wait for Asad's approval, then commit that section alone.

## Responsive rules
- Mobile first: write the base styles for phones, then use Tailwind's `md:`, `lg:` and `xl:` (768, 1024, 1280px) for larger screens.
- No horizontal scrolling at any width. Wide content (such as filter tabs) scrolls inside its own container.
- Page padding: 20px on phones, 48px from `lg`. Content max width 1120px.
- Fluid type with `clamp()`: name 48 to 88px, section headings 32 to 44px, statement 32 to 52px, contact heading 36 to 64px.
- Header: the floating glass bar on desktop. On phones, show the logo, the theme toggle and a menu button that opens a glass panel with the links and "Hire me".
- Hero: one column on phones (text first, then the profile card); two columns from `lg`.
- Work: 1 column, 2 from `sm`, 3 from `lg`. Filter tabs scroll sideways on phones.
- Services: each row stacks on phones (title, text, "Delivers", button full width, screenshot last); three columns from `lg`.
- Process: 1 column, 3 from `md`.
- Experience and skills panel: 1 column, 2 from `lg`. Panel padding 24px on phones, 44px from `lg`.
- Contact: panel padding 28px on phones, 64px from `lg`. Buttons wrap and fill the width on phones.
- Touch targets at least 44px high. Visible focus styles on every link and button.
- Performance on phones: blur 12px instead of 18px, smaller background blobs (about 360px), and reserve space for images with `aspect-ratio` to avoid layout shift.
- Test on a real phone with `npm run dev -- -H 0.0.0.0` and open the computer's local address on the same Wi-Fi.
