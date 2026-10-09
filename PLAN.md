# Build plan: asaddev.me

The site is built one section at a time on the `nextjs` branch. One task, one
commit. A task is ticked off only when `npm run build` succeeds and the result
has been checked at 360, 390, 768, 1024 and 1440px wide in both dark and light
mode.

Rules and design tokens: `CLAUDE.md`. Copy: `content.md`. Visual reference:
`design/dark.html` and `design/light.html`.

## Decisions

- Tailwind CSS v4 (configured in CSS with `@theme`, no `tailwind.config.js`).
- About is a section after Services, not a separate `/about` page.
- Hero follows the mockups: the name first, the role line in amber below it.
- No contact form. Static export has no server, so contact is a `mailto:` link.
- Work filter tabs are built in code but only rendered when there are 6 or
  more projects, so they stay hidden for now.

## The custom domain

GitHub Pages serves `asaddev.me` because a file named `CNAME` sits at the root
of whatever is published. With static export the published folder is `out/`,
and everything in `public/` is copied into it. So `CNAME` moves to
`public/CNAME` in task 1 and reaches the published root as `out/CNAME`.

Every task that runs a build checks that `out/CNAME` exists and reads
`asaddev.me`. `public/CNAME` is never edited or deleted.

## Tasks

- [x] **0. Housekeeping.** Rewrite `.gitignore` as UTF-8 (it was UTF-16, so
      git could not read its patterns). Add Tailwind v4 to the stack in
      `CLAUDE.md`. Write this file.
- [x] **1. Scaffold and file moves.** Next.js with the App Router, TypeScript
      and Tailwind v4, package name `asaddev-portfolio`. Set
      `output: 'export'` and `images: { unoptimized: true }`. Move the old
      `index.html` to `legacy/` and `CNAME` to `public/`. Extend `.gitignore`
      for Next.js. First build.
- [x] **2. Design tokens and glass.** The CSS variables for both modes, the
      `.glass` class with its `@supports` fallback, the background blobs and
      the fluid type scale, in `app/globals.css`.
- [x] **3. Fonts.** Space Grotesk for headings and Geist for body through
      `next/font`.
- [x] **4. Theme toggle.** `next-themes` and a `ThemeToggle` that follows the
      system setting by default, remembers a choice and does not flash on load.
- [x] **5. Content data and GlassCard.** `lib/content.ts` with the copy from
      `content.md` as typed data, and a reusable `GlassCard` panel.
- [x] **6. Header.** A floating glass bar on desktop. On phones the logo, the
      theme toggle and a menu button that opens a glass panel. Esc closes it,
      focus is visible and returns to the button.
- [ ] **7. Hero.** The name, the role line, the availability line, two buttons
      and the glass profile card. One column, two columns from `lg`.
- [ ] **8. Statement.** The statement line, the support line and the chips.
- [ ] **9. Work.** Three project cards with screenshot slots. Filter tabs in
      code, hidden below six projects, scrolling sideways on phones.
- [ ] **10. Services.** Five rows, each with the description, the "Delivers"
      line, a button and a screenshot slot. Stacked on phones, three columns
      from `lg`.
- [ ] **11. Process.** The three numbered steps as an ordered list.
- [ ] **12. About.** Greeting headline, role line, two paragraphs, photo slot,
      and the Download CV and Hire me buttons, in the glass style of the other
      sections. Placed after Services.
- [ ] **13. Experience and Skills.** One glass panel, one column on phones and
      two from `lg`.
- [ ] **14. Contact and footer.** Heading, line, four buttons and the footer.
- [ ] **15. Motion.** `MotionConfig` with `reducedMotion="user"`, one staggered
      hero entrance, a subtle hover on project cards and `whileInView` reveals
      in the work section only. Opacity and transform only.
- [ ] **16. SEO and accessibility.** Metadata, Open Graph image, favicon,
      JSON-LD, and robots and sitemap that work with static export. Alt text
      on every image, visible focus styles, contrast of at least 4.5:1 in both
      modes and no horizontal scrolling at 360px. Rewrite `README.md`.
- [ ] **17. Deploy.** A GitHub Actions workflow for Pages, a final build and a
      confirmed `out/CNAME`.

## Before launch

Content gaps are marked **[FILL IN]** and **[CONFIRM]** in `content.md`. The
sections are built with placeholder slots, in the same style as the mockups,
so none of these block the build:

- `public/Asad_CV.pdf`
- A profile photo
- Screenshots for Wajood, GetUnityCodes.com and PetNove
- The GetUnityCodes.com tech stack
- Whether PetNove gets a link or is marked private
- Location, and confirmation of the contact email
- Kodexl is linked only after its own site is cleaned up
