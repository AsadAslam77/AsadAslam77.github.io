# Start here: build asaddev.me with Claude Code, from zero

You have already done: bought asaddev.me (Namecheap), pointed its DNS to GitHub Pages, created the repo `AsadAslam77/AsadAslam77.github.io`, and turned on HTTPS. Do not touch those. Now you build the real site in a new branch, so the live site stays up until the new one is ready.

## What is in this kit
- `START-HERE.md`: this guide
- `CLAUDE.md`: the rules Claude Code reads every session (stack, design tokens, responsive rules, learning mode)
- `content.md`: all the text for the site, with **[FILL IN]** and **[CONFIRM]** gaps
- `design/dark.html` and `design/light.html`: the glass mockups, as references
- `extras/deploy.yml`: the GitHub Actions file for the last step

## Part 1: One-time setup
1. **Tools.** Install Node.js 20 or newer (LTS), Git, and VS Code. Check with `node -v` and `git --version`.
2. **Claude access.** Claude Code needs a Claude Pro, Max, Team or Enterprise plan, or a Claude Console account.
3. **Install Claude Code.** macOS or Linux: `curl -fsSL https://claude.ai/install.sh | bash`. Windows: follow the quickstart at `code.claude.com/docs/en/quickstart`. Then run `claude` and sign in.
4. **Clone the repo and make a branch.**
   ```bash
   git clone https://github.com/AsadAslam77/AsadAslam77.github.io
   cd AsadAslam77.github.io
   git checkout -b nextjs
   ```
   Pushing the `nextjs` branch does not change the live site, because GitHub Pages still builds from `main`.
5. **Add the kit.** Unzip this kit into the repo root, so `CLAUDE.md`, `content.md` and `design/` sit next to the old `index.html`.
6. **Add your CV.** Keep `Asad_CV.pdf` ready. It goes in `public/` after the scaffold.
7. **Add screenshots of the design.** Open the mockup page and save a screenshot of the dark and light artboards into `design/` (`dark.png`, `light.png`). Claude Code can read images. The HTML files are also references, and you can usually open them in a browser, though fonts may look different.
8. **Fill the gaps in `content.md`.** At least: city and country, your photo, the GetUnityCodes tech stack, the PetNove link (or "private"), and your real email spelling. You can finish the rest as you go.

## Part 2: How every session works
1. Open the terminal in the repo folder and run `claude`.
2. Give one prompt for one section (templates below).
3. Claude Code plans first. **Read the plan, ask questions, then approve.**
4. It builds. Open `npm run dev` (http://localhost:3000) and look at the result.
5. Check it at 360, 390, 768, 1024 and 1440px, dark and light. In Chrome press F12 and then Ctrl+Shift+M for device sizes.
6. Run `git diff` and ask: "Walk me through this diff. What would break if I removed each part?"
7. Answer the three quiz questions it asks. If you can't, ask it to explain again.
8. Commit: `git add -A && git commit -m "Add hero section"`. Push with `git push -u origin nextjs` now and then.
9. Use `/clear` between sections. Use `/compact` if a session gets long.

**Use this chat as your second brain.** Paste confusing code, error messages, or Claude Code's plan here for a second opinion. Claude Code edits files, runs commands and uses git. This chat is for design choices, wording, explanations and debugging.

## Part 3: The prompts, in order

### Prompt 0: the plan (do this first)
```
Read CLAUDE.md, content.md, and everything in design/. The repo has an old
static site (index.html, CNAME, README.md). Plan first, don't edit yet.
Propose the build as small tasks I can review one by one, and say what each
task teaches me. Include how you will keep CNAME working (it must end up at
public/CNAME) and where the old index.html goes (legacy/). Wait for my approval.
```

### Prompt 1: scaffold, tokens, theme
```
Do task 1 only: scaffold the Next.js app with TypeScript, Tailwind and the App
Router, keeping the old files safe (old index.html to legacy/, CNAME to
public/CNAME). Configure output: 'export' and images: { unoptimized: true }.
Set up app/globals.css with the dark and light tokens and the .glass class
from CLAUDE.md, load Space Grotesk and Geist with next/font, and add
next-themes with a ThemeToggle (default follows the system, no flash on load).
Make a GlassCard component. Run npm run build and confirm the out/ folder.
Explain what you built, add LEARNING.md entries, and ask me three questions.
```

### Template for every section
Replace SECTION with the name and use the notes below it.
```
Build the SECTION section only, following CLAUDE.md, the SECTION part of
content.md, and design/dark.html, design/light.html and the screenshots in
design/. Plan first and wait for my approval. Build mobile first, then the lg
layout. When it is done, check 360, 390, 768, 1024 and 1440px in dark and
light, explain the new code, add a LEARNING.md entry, and ask me three
questions about it. Do not commit until I say so.
```

### Section notes (add one line to the template)
1. **Header:** floating glass bar on desktop; on phones the logo, theme toggle and a menu button that opens a glass panel with the links and "Hire me". The menu must work with keyboard (Esc closes, focus is visible).
2. **Hero:** big name with fluid type, availability line with a green dot, two buttons, the glass profile card with a photo slot. One column on phones.
3. **Statement:** the large statement line, the support line and the tool chips.
4. **Work (Selected work):** three project cards with screenshots. Build the filter tabs in code, but show them only when there are 6 or more projects.
5. **Services:** five rows, each with description, "Delivers" line, button and screenshot. Stack the row on phones.
6. **Process (How I work):** three numbered steps.
7. **About:** the About text from content.md. Ask me whether it should be a section or a separate /about page before you build it.
8. **Experience and Skills:** one glass panel, two columns from lg.
9. **Contact and footer:** heading, line, four buttons (email, LinkedIn, GitHub, Download CV), footer. No form: email only.

### Prompt for motion (after all sections work)
```
Add Motion (the `motion` package, imported from "motion/react") following the
Motion rules in CLAUDE.md: MotionConfig with reducedMotion="user", one
staggered hero entrance, a subtle hover on project cards, whileInView reveals
in the work section only. Animate only opacity and transform. Add "use client"
only where needed, run npm run build, and explain each change.
```

### Prompt for SEO, accessibility and performance
```
Prepare the site for launch: metadata from content.md (title, description,
Open Graph and Twitter tags), favicon, an Open Graph image, robots and sitemap
that work with static export, and a JSON-LD Person block. Check every image
has alt text, focus styles are visible, contrast is at least 4.5:1 in both
modes, and there is no horizontal scroll at 360px. Run Lighthouse if you can
and list what to fix. Explain what each part does.
```

### Prompt for deploy
```
Prepare deployment to GitHub Pages: add .github/workflows/deploy.yml based on
extras/deploy.yml (check that the action versions are current), confirm
public/CNAME contains asaddev.me, and run npm run build. Do not merge or push
to main. Give me the manual steps for the Pages settings.
```

## Part 4: Go live
1. Finish and commit everything on `nextjs`, then `git push -u origin nextjs`.
2. On GitHub: **Settings, Pages, Build and deployment, Source: GitHub Actions.** Your custom domain and HTTPS settings stay.
3. Merge into main: `git checkout main`, `git merge nextjs`, `git push`. The workflow builds and deploys.
4. Open https://asaddev.me, test on your phone and in both modes, and check Actions for any red mark.
5. If something breaks, nothing is lost: the old site is in `legacy/` and in git history.

## Part 5: Before you launch (placeholders to resolve)
- Email spelling, city and country, photo
- GetUnityCodes tech stack and screenshots; Wajood and PetNove screenshots; PetNove link or "private"
- Wajood hosting (Oxygen?) confirmed
- "How I work" steps match how you actually work
- Kodexl: fix its placeholder content before linking it (list is at the end of content.md)
- Check your EastWhiz agreement for any rules about freelance work before advertising services

## Troubleshooting
- **Build fails:** paste the full error in this chat, or ask Claude Code to explain it and fix the cause (not just the symptom).
- **Theme flashes on load:** ask Claude Code to check the `next-themes` setup and `suppressHydrationWarning` on the html tag.
- **Glass blur missing:** some browsers need the `-webkit-` prefix or have the setting disabled. Ask Claude Code to check the `.glass` class and the fallback.
- **Page has no styles after deploy:** make sure you deploy with the GitHub Actions workflow, not from the branch.
- **Domain shows 404 or "Not secure":** check Settings, Pages for the custom domain and the Enforce HTTPS box.
- **Later, subdomains (shop.asaddev.me):** each static project can have its own repo and CNAME record. A server-based project needs other hosting, such as Vercel.
