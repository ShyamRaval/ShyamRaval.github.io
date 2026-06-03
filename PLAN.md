# Portfolio Website Plan (Living Document)

This file is the **single source of truth** for how the portfolio should look/work.
We keep updating it as new requirements arrive — **before** making major implementation changes.

---

## Goals

- Build a **personal portfolio** website that feels like a **welcoming oasis of soft pastels and playful gradients** — warm, colorful, never corporate.
- Fast, optimized, and easy to maintain.
- Image-heavy by design — every raster image flows through Astro's `<Image />` component (hard requirement).
- **Modular + extensible by default.** Prefer small composable components, shared helpers, and single sources of truth over copy‑pasted patterns. If two pieces of code start to look the same, we factor the shared intent into one reusable primitive.
- Keep a clear separation between:
  - **Design**: visual styling, typography, spacing, colors, motion tokens.
  - **Structure**: layouts, components, page composition, navigation, routing.
  - **Data (rarely changes)**: project metadata, social links, contact info, email, external URLs, certificates, timeline entries.
  - **Content (changes often)**: blog posts, case-study bodies, long-form writing, embedded media.

## Non-goals (v1)

- Dark mode / theme toggle.
- Rendering certificates in the UI (data exists for future use).
- Dedicated `/about` or `/contact` pages — Home covers "about me", a dock at the bottom of the viewport covers contact.
- Project list-only UI (we use cards + case studies).
- Heavy "desert / sand / beach" visual metaphor — palette is **soft pastels + gradients**, not themed imagery.
- Sitemap or RSS feed.
- Copyright notice in the footer — copyright applies automatically; we don't restate it.

---

## Design Philosophy

We design like a small magazine, not a SaaS landing page.

- **Every element earns its place.** Buttons, links, cards, animations, sections — each must answer a clear question. If we cannot articulate why something exists, it is removed.
- **No template thinking.** Industry-standard portfolio patterns (3-card "values" rows, big "Hire me" CTAs, hero buttons that beg for clicks, generic footers with site maps) are off-limits as defaults; we adopt them only when they serve the specific page.
- **We do not chase the user.** Primary navigation is provided once, in the dock. Pages do not redirect attention back to those same destinations through hero CTAs. The user comes to us at their pace.
- **Quiet beats loud.** Color, motion, and weight are spent like punctuation, not wallpaper.
- **Personal voice.** Display text has personality, body text reads cleanly, and the occasional handwritten note carries a hand-drawn warmth.
- **Real-life material language.** The site should feel like real-life objects — polaroids, paper notebook tabs, sticky notes, washi tape, ink stamps, pencil scribbles, handwritten margin notes — rather than abstract digital surfaces. We stay inside a coherent world of personal **stationery / studying / journaling** so the metaphors do not fight each other. We break the standard "this is a website" illusion and replace it with a tactile, timeless one.
- **Timelessness over trend.** Reference materials that have always existed (paper, ink, tape, photographs) and that will still feel right years from now. Avoid effects that will date the site to a specific year.
- **Ergonomics over convention — design for the body, not the brand book.** Most portfolio sites import the same mobile patterns from the same template galleries: a hamburger or logo+nav strip pinned to the *top* of the viewport, with everything important sitting where a one-handed phone grip can't comfortably reach. Holding a modern phone, the thumb naturally lives at the **bottom third of the screen**; reaching the top corners requires a regrip or a wrist stretch dozens of times per session. We refuse to inherit that strain just because everyone else does.
  - Primary controls live at the **bottom edge** on mobile, never the top. The header is intentionally inert decoration; the dock is where the work happens.
  - Paired actions (open / close, expand / collapse) share the **same physical spot** on the screen whenever possible — so the thumb that opened a sheet doesn't have to travel up to the corner to dismiss it.
  - Screen-edge real estate is treated as ergonomic real estate, not visual real estate. We pay attention to safe-area insets, one-handed reach zones, and how a finger actually arrives at a target — not just to how a layout reads in a flat mockup.
  - This is what we mean by **thoughtful design**: defaults are questioned out loud, and we only keep the conventions whose reasoning still holds for *this* site, *this* device, *this* hand.

---

## Current Tech / Stack

- **Framework**: Astro
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Content**: MDX via `@astrojs/mdx` + Astro Content Collections
- **Routing UX**: Astro View Transitions (`ClientRouter`) — no full page reloads
- **Node**: `>= 22.12.0`

---

## UX & Visual Direction

- **Tone**: editorial, personal, quietly colorful — like a well-laid-out small magazine, not a SaaS landing page.
- **Palette**: **soft pastels** (sky, coral, mint, butter, lavender, rose), used as **accents on white** — never as full-page wallpaper. Gradients live in text and small chrome elements, not large background washes.
- **Base theme**: white-first with deliberate pastel accents. **No dark-mode toggle.**
- **Gradients vs content images — keep them separate**: gradients are a pure **CSS styling/theming** decision used sparingly in text and small chrome. **Content images** (e.g. a profile photo, project screenshots, blog covers) are independent — they flow through `<Media />` and are not tinted or replaced by gradients. The two concerns never overlap or imitate each other.
- **Typography (tri-font system)**:
  - **Display** — an expressive serif (e.g. *Instrument Serif*) for headings and editorial moments. Italic when emphasizing.
  - **Body** — a highly readable neutral sans (e.g. *Inter*) for prose and UI.
  - **Hand** — a handwritten accent (e.g. *Caveat*) used sparingly for annotations, section labels, signatures, and "personal voice" moments. **Locked** — we are not switching the handwritten font.
- **Material vocabulary (current)**: **polaroid photo frames** (hero portrait), **handwritten margin labels** (section identifiers), **header marginalia** (a single rotating handwritten line in the top strip — different per visit), small **pastel ink** moments in text. Future additions may include **washi tape**, **ink stamps**, **sticky notes**, **pencil scribbles**, and **torn paper edges** — added only when they earn their place.
  - **Retired**: notebook-style paper tabs for header navigation. Nav has moved to the bottom dock (see Layout Strategy). The paper-tab metaphor may return for *contextual* navigation elsewhere (e.g. project category filters on `/projects`).
- **Marginalia (header whispers)**: every full page load (refresh) renders a single short handwritten line in the top strip, picked at random from a curated pool in `src/data/marginalia.ts`. In-app navigation keeps the same line because the header is persisted via View Transitions. No `sessionStorage` pinning. Each line should feel like something jotted in the margin of a notebook (e.g. *make a cup of tea before you scroll*, *every page here has a draft folder behind it*).
- **Motion**: animations are disciplined — CSS + View Transitions first, JS motion only inside islands when needed. Respects `prefers-reduced-motion`.
- **Performance**: static-first, optimized images via Astro `<Image />`, fast transitions.
- **Accessibility**: semantic HTML, strong color contrast on white, keyboard-friendly, reduced-motion support.

---

## Information Architecture (Routing Map)

| Route | Purpose |
|-------|---------|
| `/` | Hero + **about me** + **timeline** + featured project cards + CTA |
| `/projects` | **Card grid** of projects (not a list) |
| `/projects/[slug]` | Case study page (MDX content) |
| `/blog` | Blog post list/cards |
| `/blog/[slug]` | Blog post page (MDX content) |
| `/resume` | Embedded PDF + download button (certificates **not** rendered) |

- **No dedicated `/about` page** — Home is the about page.
- **No dedicated `/contact` page** — email + socials live in the right zone of the bottom dock (see Layout Strategy).
- **Primary navigation lives in the left zone of the bottom dock**, NOT in the header. The header carries only a rotating handwritten marginalia line.
- Internal navigation uses **Astro View Transitions** for instant, no-reload page swaps.

---

## Layout Strategy

- **Compactness as a design discipline.** Screen real estate is precious; we minimize forced scrolling. Sections are tight, dense where they can be, breathable where they must be.
- **Distinct strategies for mobile vs desktop** — not pure responsive scaling. Desktop leans into **asymmetric, editorial multi-column** compositions (e.g. handwritten section label on one side, content on the other). Mobile collapses to a deliberate single-column reading flow with the labels stacking above content.
- **Whitespace earns its keep.** Padding and margin exist to aid readability and rhythm, never to pad time on page.
- **No horizontal-rule section dividers.** Section boundaries are communicated by **handwritten margin labels + whitespace**, not by generic `border-top` lines between adjacent components.
- **Cards size to their own content.** No card stretches its height to match the tallest sibling in its row; each card's height is determined by its own content. Adjacent cards may therefore differ in height — that is correct, not a bug.
- **Minimum thumb travel.** Direct expression of the *Ergonomics over convention* principle (see Design Philosophy). All primary controls live within the bottom-third thumb reach zone on mobile; top-edge nav (drawer, fixed top bar, corner hamburger) is rejected on principle. Paired actions (open / close) share a single physical spot so the thumb that triggered an action can reverse it without travelling.
- **The header is a single line of handwritten marginalia** — that's it. No name, no logo, no nav. One short rotating line picked from `src/data/marginalia.ts`, rendered in Caveat at a comfortable but quiet size. New refresh = new line; in-app navigation keeps the current line because the header is persisted. The header is intentionally thin so it gives almost the entire viewport to content.
- **One dock — *the Pocket Player* — same device on both viewports, two ergonomic positions.** The dock unifies primary navigation + socials and replaces both the paper-tab header navigation *and* the previous socials-only footer. It is now a small handheld device (iPod / Walkman / Etch-A-Sketch / rotary phone vocabulary) that sits in different corners of the viewport depending on the device, but is otherwise the same component, the same markup, and the same controller.
  - **Desktop shape — bottom-LEFT tuck → pull-out device.** The Pocket Player tucks itself into the bottom-LEFT corner of the viewport (NOT centred at the bottom — long-form content lives centred on the page, and centring the dock would put it directly in the way of text). At rest, only a small monogram **puck** peeks above the corner — the visual "iPod sticking out of a pocket". Hovering or focusing the puck pulls the whole device out into reach (transform-driven, same family of animation as the previous pill's hover-expand). When the user moves the cursor away, a 260ms grace timer tucks the device back into the pocket. The shell itself has `pointer-events: none`; only the visible peek (puck) and the visible device (when out) are interactive — there is **no invisible dead zone in the corner that blocks page clicks**.
  - **Mobile shape — bottom-CENTRE puck → tap-to-raise device.** Same device, anchored to bottom-centre with a dim backdrop behind it when open. Tap the puck to raise; tap the backdrop, hit Escape, or use the wheel's `menu` cap to dismiss.
  - **Both shapes share the same body** — a screen on top, a click-wheel below:
    - **Top: a screen** — paper-cream LCD tint, holding the items as a **horizontal strip**. Sections are labeled in handwritten Caveat (*wander* for nav, *say hello* for socials). A fixed **highlight band** sits permanently at the centre of the screen; items slide *under* this band as the wheel spins (the Etch-A-Sketch pointer model). Beneath the strip, a small meta field shows the active row's italic handle plus a handwritten one-liner — and **updates live during the drag**, not on release.
    - **Bottom: a click-wheel** — pure controller, intentionally **large** relative to the device (it is the device's *primary* control, not an afterthought). Compass labels at 12 / 3 / 6 / 9 are **real `<button>`s with honest actions**, not decorative text:
      - `menu` (top) → close the player (the iPod's "back/up" mental model becomes "tuck the device back into the pocket").
      - right (skip-forward icon) → step to the next item.
      - `play` (bottom) → activate the highlighted item (same effect as the centre button — this is faithful to a real iPod, where centre and play are not the same control but produce the same result for menu navigation).
      - left (skip-back icon) → step to the previous item.
      - **Centre button** is intentionally blank → activate the highlighted item.
    - **Inputs supported on the wheel.** Touch drag (mobile), mouse drag (desktop), mouse-wheel scroll over the wheel, two-finger touchpad scroll over the wheel, keyboard arrows when focused. Pointer events are used throughout so the same code path serves all three pointer kinds.
    - **No top status bar.** Earlier we placed a "menu" handwritten label and a × close button in a top status bar; those are removed. Screen real estate inside the device is precious, and both affordances were redundant: the wheel's `menu` cap is the dedicated close, and the active item's name lives on the screen anyway.
    - **Three ways to navigate**: spin the wheel and press centre/play, step with the left/right transport caps, or tap any row directly without ever using the wheel. The wheel is for people who want to play; direct tap is for people who don't.
    - **Three ways to dismiss**: the wheel's `menu` cap, the dim backdrop (mobile) / leaving the corner (desktop), the Escape key. Tapping the puck again also toggles closed.
    - **Performance contract — non-negotiable.** During any drag, ONLY two elements may transform: the wheel arc (a single `transform: rotate`) and the items list (a single `transform: translateX`). No per-item transforms, no per-item shadows, no synchronous style writes inside `pointermove` (everything RAF-batched), and the active row's meta text mutates **only on detent crossings** so its rate is naturally bounded by snap distance. The wheel rotation accumulator is **unbounded** — when the list reaches its end the wheel keeps spinning visually with the list rubber-banding underneath, so the user never feels the gesture freeze.
    - **Gesture model.** Each `pointermove` computes the angle change from the *previous* pointer position, not from the drag-start. This eliminates the ±180° wraparound flip that older builds had: the wheel can be spun continuously through any number of full rotations without ever resetting to origin.
    - **Don't put updating info under the finger.** All dynamic content (the highlight, the active handle, the handwritten note) lives on the screen at the top of the device. The wheel-spinning thumb sits at the bottom and never overlaps the changing region.
    - **Discoverability of rotation.** The wheel caps are clickable buttons that work even if the user never figures out the spin gesture. Direct row tap is always available as a safe fallback.
    - **Material vocabulary, expanded.** Vintage handheld devices: the iPod (screen + click-wheel + centre button), the Walkman (cream paper-plastic finish, dashed paper dividers), the Etch-A-Sketch (a knob-driven pointer moving across a closed screen), and the rotary phone (circular thumb spin). These references sit naturally alongside the stationery vocabulary (paper, ink, handwriting) — they're the same tactile-object world, just with mechanism.
    - **Future hooks (deferred — see Decisions Log).** The data-action dispatcher pattern on the wheel caps is intentionally extensible: a music-player mode and small UX sounds are planned but **not implemented in this pass**. We let the core navigation interaction mature first.
    - Player uses `role="dialog"` and is `aria-modal="true"` only when the backdrop is present (mobile). Body scroll is locked only on mobile. Player closes automatically across Astro view transitions.
    - **Why this design?** Earlier attempts each failed in a specific way: the always-visible two-row dock fought content for real-estate; the bookmark-sheet was too conventional; the rotary dial put orbiting items on the rotating surface and tanked the frame rate. The Pocket Player separates the **gesture surface** (the wheel — does very little work, just spins) from the **data surface** (the screen — where items live as plain readable text). That split is what makes the gesture feel like a real device.
  - The dock is the single most important interactive element on the site. It is the **only** primary navigation surface on either device.
- **`<DesignFor("iPod click wheel"))>` is now adopted on both desktop and mobile**, paired with a screen-with-pointer (Etch-A-Sketch) model so items are always readable text — not orbiting graphics — and direct row tap remains a safe fallback for any user who never spins the wheel.

---

## Separation of Concerns

### Design (styling)

- **All design tokens live in [`src/styles/global.css`](src/styles/global.css)**, using Tailwind v4's `@theme` block + CSS custom properties.
- Tokens cover: colors (surfaces + accents), spacing scale, radii, shadows, font stacks, motion durations/easings.
- Components consume tokens via Tailwind utility classes — **no scattered hex values** in `.astro` files.

### Structure (layouts & components)

- Layout shells in `src/layouts/` (e.g. `BaseLayout.astro`, `BlogPostLayout.astro`, `ProjectLayout.astro`).
- Reusable UI blocks in `src/components/` (e.g. `Header.astro`, `Dock.astro`, `ProjectCard.astro`, `BlogCard.astro`, `Timeline.astro`, `Section.astro`, `LogoCloud.astro`, `Media.astro`).
- `Media.astro` is the **only** image entry point across the site — wraps Astro `<Image />` and hides the provider (see Images & Media).
- Thin shared helpers live in `src/lib/` (e.g. `src/lib/media.ts` for resolving provider URLs).
- `Header.astro` renders marginalia only. `Dock.astro` consumes `site.nav` + `site.socials` and is the single navigation + contact surface.
- Pages in `src/pages/` stay **thin** — compose components, feed data/content.
- **DRY rule (modular & extensible).** Shared behavior must live in one place:
  - repeat UI patterns → reusable components
  - repeat calculations / transforms / measurement logic → helpers in `src/lib/`
  - repeat constants → design tokens in `global.css` or typed data in `src/data/`
  - avoid “same code, slightly different” forks; add configuration/props instead.

### Data (rarely changes)

- `src/data/site.ts` — name, tagline, nav links + socials (Dock), email, SEO defaults.
- `src/data/timeline.ts` — timeline entries shown on Home.
- `src/data/tech-logos.ts` — logo/cloud metadata consumed by `LogoCloud.astro`.
- `src/data/certificates.ts` — certificate metadata (stored, **not rendered in v1**).
- `public/resume.pdf` — resume file served as a static asset.

### Content (changes often)

- **Content engine**: **MDX** via `@astrojs/mdx` + Astro Content Collections.
- **Folder-per-entry, self-contained**: each post/case study is its own folder with an `index.mdx`. Drag-and-drop the folder into any future Astro project and it just works (provided the schema file is present).
  - `src/content/blog/<slug>/index.mdx`
  - `src/content/projects/<slug>/index.mdx`
- **Post folders contain only text**, no image bytes. Images are referenced by **stable string identifiers** (see Images & Media). This preserves portability *and* keeps the single-source-of-truth for shared images.
- Schemas defined in `src/content.config.ts` with Zod.

Why MDX: you want prose plus dynamic/embedded components inside posts and case studies. MDX lets posts use `<Media />`, callouts, galleries, and other Astro components directly. Markdoc is reserved for a future migration if we ever need stricter block schemas.

---

## Images & Media (hard requirement)

The site is image-heavy: Home (about me), Projects (thumbnails + case-study screenshots), Blog (covers + inline media). Image strategy is therefore first-class — and engineered for an **eventual move to Cloudinary** without rewrites.

### The two non-negotiables

1. **Every raster image renders through Astro's `<Image />`** (from `astro:assets`). Wrapped, never bypassed.
2. **Content image bytes never live in post folders or in the repo for content images.** They live behind an identifier; bytes live with the provider.

### Why both: self-contained posts + single source of truth

We want post folders to be drag-and-droppable into any new project, **and** we want a shared image (e.g. a profile photo reused across the site) to exist exactly once. We get both by storing **string identifiers** in frontmatter and letting a provider resolve the URL:

- A post folder holds **only** `index.mdx` (and frontmatter) — no image files.
- Frontmatter stores `cover: "blog/my-post/cover"` — a stable ID, not a path.
- Two different posts referencing `"shared/profile"` resolve to the same CDN object: zero duplication.

### The provider abstraction

A single component, `src/components/Media.astro`, is the **only** place that knows where the bytes live. It always renders Astro `<Image />` underneath.

- Component signature stays constant: `<Media id="..." alt="..." width={…} height={…} />`.
- Provider strategy in `src/lib/media.ts` selects the URL:
  - `PUBLIC_MEDIA_PROVIDER=placeholder` (v1 default) → resolves to **picsum.photos** with seeded IDs for stable layouts.
  - `PUBLIC_MEDIA_PROVIDER=cloudinary` (future) → resolves to `https://res.cloudinary.com/<cloud>/image/upload/w_*,h_*,q_auto,f_auto/<id>`.
- Switching providers is a **one-file change** in `src/lib/media.ts`; no MDX edits, no schema migration, no rebuild of frontmatter.

### Schema implication

Because images are string IDs (not local imports), schemas use `z.string()` for `cover`, `thumbnail`, etc. — **not** Astro's `image()` helper. We deliberately give up Astro's automatic dimension inference; the CDN handles transforms more efficiently anyway. The `<Media />` caller passes explicit `width`/`height`.

### Remote image whitelist

`astro.config.mjs` must whitelist hosts so `<Image />` can fetch + optimize remote URLs:

- `picsum.photos` (v1 placeholder for content)
- `placehold.co` (v1 fallback for missing covers/thumbnails)
- `res.cloudinary.com` (future) — added pre-emptively so future migration is config-only

### v1 placeholder choices

- **Content placeholder — picsum.photos with seeded IDs** (`/seed/{id}/{w}/{h}`). Seed-stable across rebuilds, realistic-looking, no API key.
- **Missing-media fallback — placehold.co** (PNG, pastel fill/text). Used by `<Media />` when frontmatter omits a `cover`/`thumbnail`. Calm and theme-friendly, never competes with the gradient styling.

### What stays in `src/assets/`

Only **chrome-level** images — favicons, OG default, header brand mark — i.e. things the site itself owns, not content. These can use Astro's local `image()` schema or be imported directly.

### Other rules

- **SVGs** are inlined or rendered as standard `<img>` (vector, no optimization needed).
- **MDX inline images** in posts use `<Media id="..." ... />`, never a raw `<img>` tag.
- **Missing `cover` / `thumbnail` fallback**: cards still call `<Media />` with a deterministic `placeholder/...` ID (e.g. `placeholder/blog/<slug>`). In v1 the provider resolves it to a pastel `placehold.co` PNG. Card gradient backgrounds (CSS) and the fallback image (content slot) remain separate concerns.
- **Performance defaults**: explicit `width`/`height`, `alt`, `loading="lazy"` + `decoding="async"` for below-the-fold.
- **Public folder** is reserved for assets that must be served untouched (e.g. `resume.pdf`, `favicon.ico`).

---

## Folder Layout (target)

```
src/
  layouts/
    BaseLayout.astro
    BlogPostLayout.astro
    ProjectLayout.astro
  components/
    Header.astro            # thin strip rendering a marginalia line; no nav
    Dock.astro              # bottom dock: [ nav | socials ] zones
    Section.astro
    ProjectCard.astro
    BlogCard.astro
    Timeline.astro
    LogoCloud.astro
    Media.astro             # the ONLY image entry point; wraps Astro <Image />
  lib/
    media.ts                # resolveMediaUrl(id) — swap providers here
  pages/
    index.astro             # Home = hero + about + timeline + featured projects
    projects/
      index.astro
      [slug].astro
    blog/
      index.astro
      [slug].astro
    resume.astro
    404.astro
  content/
    blog/
      <slug>/
        index.mdx           # self-contained: only text + identifier strings
    projects/
      <slug>/
        index.mdx
  data/
    site.ts
    timeline.ts
    tech-logos.ts
    certificates.ts
    marginalia.ts           # rotating handwritten header lines
  assets/                   # chrome-level only (favicon, OG default, brand mark)
    logos/
  styles/
    global.css
  content.config.ts
public/
  resume.pdf                # served untouched
```

---

## Content Model

> Each entry lives in its own folder under the collection root; the folder name **is** the slug. Folders contain only `index.mdx` — no image bytes.

### Projects (`src/content/projects/<slug>/index.mdx`)

Frontmatter:
- `title` (string)
- `summary` (string, one-liner for the card)
- `tags` (string[])
- `thumbnail` (string, optional) — Media identifier, e.g. `"projects/<slug>/thumbnail"`; omitted thumbnails use a deterministic pastel fallback.
- `links.github` / `links.live` (string, optional)
- `featured` (boolean, default false)
- `publishedAt` (date)

Body: case-study MDX. All images use `<Media id="..." />`, never raw `<img>`.

### Blog (`src/content/blog/<slug>/index.mdx`)

Frontmatter:
- `title` (string)
- `description` (string)
- `publishedAt` (date)
- `tags` (string[])
- `draft` (boolean, default false)
- `cover` (string, optional) — Media identifier, e.g. `"blog/<slug>/cover"`; omitted covers use a deterministic pastel fallback.

Body: post MDX. All images use `<Media id="..." />`.

### Site data (`src/data/site.ts`)

- `name`, `tagline`, `email`
- `nav` (array of `{ label, href, hand, icon }`) — primary nav, consumed by the **left zone of the dock**. Each item carries its display label, target route, a one-line Caveat note (for the per-icon business card), and an icon key.
- `socials` (array of `{ label, href }`) — consumed by the **right zone of the dock**.
- `seo` defaults (title template, description, OG image path)
- `resume` (PDF path + download filename)

### Marginalia (`src/data/marginalia.ts`)

- A flat array of short handwritten lines (10–30 words each, ideally shorter).
- Rendered in Caveat in the header.
- One line per refresh. In-app navigation keeps the current line because the header is persisted via View Transitions.
- Examples: *make a cup of tea before you scroll*, *every page here has a draft folder behind it*, *no hurry — this is the slow internet*, *you'd probably like the b-sides*.

### Timeline (`src/data/timeline.ts`)

Array of `{ year, title, description, kind? }` entries — rendered on Home.

### Tech logos (`src/data/tech-logos.ts`)

Array of logo metadata consumed by `LogoCloud.astro`. SVG logos should live under `src/assets/logos/`; text-only fallback chips are allowed while final logos are missing.

### Certificates (`src/data/certificates.ts`)

Stored only; **not rendered in v1**.

---

## Resume Page

- Route: `/resume`
- Render `public/resume.pdf` with a native `<object>` first, with an `<iframe>`/link fallback inside the object body for browsers that cannot display PDFs inline.
- Include a prominent download button: `<a href="/resume.pdf" download>`.
- Do **not** render certificates in v1.

---

## SPA-like Navigation

- Add `<ClientRouter />` from `astro:transitions` in `BaseLayout.astro`'s `<head>`.
- Use plain `<a href="...">` for internal links.
- Optional `transition:name` / `transition:animate` on header, main, and cards for coordinated morphs.

---

## Environment & Configuration

- `PUBLIC_MEDIA_PROVIDER=placeholder` by default.
- Future Cloudinary switch uses `PUBLIC_MEDIA_PROVIDER=cloudinary` plus `PUBLIC_CLOUDINARY_CLOUD_NAME`.
- Keep a `.env.example` documenting public env vars when implementation starts.
- `astro.config.mjs` owns:
  - `@astrojs/mdx` integration.
  - `image.remotePatterns` for `picsum.photos`, `placehold.co`, and future `res.cloudinary.com`.
  - GitHub Pages deployment settings (`site`, and `base` only if this ever becomes a project page instead of a user page).

---

## Animations Strategy

**Tier 1 — Global, cheap:**
- View Transitions for route changes.
- CSS transitions on hover/focus for cards, buttons, links.
- `prefers-reduced-motion` honored globally.

**Tier 2 — Section polish:**
- Staggered card entrance on Projects/Blog index (CSS or tiny IntersectionObserver island).
- Subtle parallax/gradient shifts in hero.

**Tier 3 — Sparingly:**
- A small JS motion library only inside isolated islands for one-off hero moments.

**Logos:**
- Prefer **SVG** in `src/assets/logos/` (SVGO-compressed).
- Raster logos via Astro `<Image />` with explicit width/height + lazy loading.
- `LogoCloud.astro` renders from `src/data/tech-logos.ts`.

---

## SEO / Metadata

- Per-page `title` + `description`.
- OpenGraph / Twitter card meta in `BaseLayout`.
- Canonical URLs.
- Add `src/pages/404.astro` for a friendly not-found page.
- **No sitemap, no RSS feed in v1** (out of scope; revisit only if the site grows).

---

## Build & Deployment

- Target host: GitHub Pages for the `ShyamRaval.github.io` user site.
- Astro should be configured with `site: "https://shyamraval.github.io"`.
- Because this is a user site, `base` should remain `/` unless the repository/deploy target changes.
- Deployment can use GitHub Actions after the first stable implementation pass.

---

## Decisions Log

- **2026-04-30** — Adopted separation: design vs structure vs data vs content.
- **2026-05-26** — Visual tone: white-first, all-out colorful; no dark-mode toggle.
- **2026-05-26** — Separate routed pages with Astro View Transitions for no-reload navigation.
- **2026-05-26** — Projects rendered as cards → case-study pages (not lists).
- **2026-05-26** — Blog and Projects are separate sections, both backed by MDX collections.
- **2026-05-26** — Resume page embeds PDF + download button; certificates stored in data but **not rendered**.
- **2026-05-26** — Content engine: **MDX** (best fit for images + dynamic components).
- **2026-05-26** — Design tokens centralized in `src/styles/global.css` (Tailwind v4 `@theme` + CSS variables).
- **2026-05-26** — Animations: all-out but optimized; CSS-first; `prefers-reduced-motion` respected.
- **2026-05-26** — **Home = About me + Timeline.** No dedicated `/about` page; no separate `/timeline` page.
- **2026-05-26** — **Footer holds email + socials only** (no nav links, no contact form, no `/contact` page).
- **2026-05-26** — **Accent palette: soft pastels + playful gradients.** Dropped the "desert / sand / beach" metaphor — pastels only.
- **2026-05-26** — **Astro `<Image />` is a hard requirement** for every raster image across the site.
- **2026-05-26** — **Folder-per-entry content collections**: each blog post / project is `src/content/<col>/<slug>/index.mdx`. Slug = folder name.
- **2026-05-26** — **Post folders hold no image bytes.** Images are referenced as **stable string identifiers** in frontmatter and body — preserving both self-contained posts *and* single-source-of-truth for shared images.
- **2026-05-26** — **One `<Media />` component wraps Astro `<Image />`** and dispatches to a provider chosen by `PUBLIC_MEDIA_PROVIDER`. Provider swap is a one-file change in `src/lib/media.ts`.
- **2026-05-26** — **v1 image provider: picsum.photos** with seeded IDs (placeholder). **Future provider: Cloudinary** — architecture is already shaped for it, no Cloudinary code in v1.
- **2026-05-26** — `src/assets/` is reserved for **chrome-level** images only (favicon, OG default, brand mark). Content images never live in the repo.
- **2026-05-26** — `astro.config.mjs` whitelists `picsum.photos` and `placehold.co` (and `res.cloudinary.com` pre-emptively) under `image.remotePatterns`.
- **2026-05-26** — Dynamic content routes use single-segment `[slug].astro` pages, matching folder-per-entry slugs.
- **2026-05-26** — Resume PDF rendering uses native `<object>` with fallback content plus a download button.
- **2026-05-26** — Missing blog/project media falls back to a deterministic `placehold.co` PNG via `<Media />` (still satisfies the Astro `<Image />` rule).
- **2026-05-26** — Deployment target is GitHub Pages at `https://shyamraval.github.io` with root base path.
- **2026-05-26** — **Gradients are pure CSS theming**; content images (photos, screenshots, covers) travel through `<Media />` and stay independent of the gradient styling.
- **2026-05-26** — **No sitemap and no RSS feed in v1.**
- **2026-05-26** — **Design philosophy: every element earns its place.** Reject default portfolio patterns (3-card "values" rows, hero CTA pairs, generic footers). We do not chase the user.
- **2026-05-26** — **Tri-font typography system**: *Instrument Serif* (display, expressive), *Inter* (body, highly readable), *Caveat* (handwritten accent, used sparingly).
- **2026-05-26** — **Compactness is a design discipline.** Distinct mobile vs desktop layouts (not pure responsive scaling) — desktop leans editorial/asymmetric, mobile is a single-column reading flow.
- **2026-05-26** — **Footer renders as a floating dock** (icons-only socials + email pill at the bottom of the viewport). No nav, no copy, no copyright.
- **2026-05-26** — **No large background gradient washes** (`.bg-oasis` removed). Gradients live only in text and small chrome.
- **2026-05-26 (pm)** — **Real-life material language locked in**: polaroids, paper tabs, handwritten margins, future room for washi tape / stamps / sticky notes. Stays inside the personal-stationery world. Timeless over trendy.
- **2026-05-26 (pm)** — **Handwritten font (Caveat) is locked.** We are not searching for a replacement.
- **2026-05-26 (pm)** — **No horizontal-rule section dividers.** Removed `border-t` between adjacent sections; whitespace + handwritten margin labels do the separating.
- **2026-05-26 (pm)** — **Cards size to their own content** in any grid (no row-stretching to match the tallest sibling).
- **2026-05-26 (pm)** — **Navigation renders as notebook-style paper tabs**; active tab is "pulled forward" into the page surface.
- **2026-05-26 (pm)** — **Dock is two-state**: resting textual invitation → active row of icons → per-icon floating "business card" tooltip. Icon hover colors echo each brand's signature color. On touch devices the dock skips the resting state and exposes icons directly.
- **2026-05-27** — **Minimum thumb travel is a design principle.** Top-of-screen primary navigation is rejected on mobile because thumbs don't comfortably reach there on tall phones.
- **2026-05-27** — **Header carries only a rotating "marginalia" line** (handwritten, picked per session). No name, no logo, no nav.
- **2026-05-27** — **Paper-tab header navigation is retired.** The pattern may still appear for contextual navigation elsewhere (e.g. project category filters) but is no longer the primary nav surface.
- **2026-05-27** — **Primary navigation moves into the bottom dock**, sharing one shell with socials. Layout: `[ nav | divider | socials ]`. Same two-state mechanic, same business-card tooltips, same touch-drag pattern. The dock is the single most important interactive element on the site.
- **2026-05-27** — **Home link becomes a monogram icon ("S" in display italic)** as the first item in the dock's left zone. The site name is no longer displayed anywhere in the chrome.
- **2026-05-27** — **iPod click-wheel / d-pad navigation considered and rejected** for primary nav (discoverability, accessibility, theme drift). Reserved as a possible future easter-egg page where it can be delightful without carrying load.
- **2026-05-29** — **Mobile dock redesigned: bookmark tab → notebook sheet.** The always-visible two-row mobile dock and the press-and-hold-and-drag interaction are retired. Mobile now shows a small paper-bookmark tab pinned to the bottom-center edge; tapping it opens a labeled-rows sheet that contains both nav and socials. Press-and-hold-and-drag, the per-icon floating business cards, and the stacked-rows layout no longer exist on touch devices — those affordances stay on desktop only.
- **2026-05-29** — **Ergonomics over convention is now a first-class design principle** (added to Design Philosophy). Mobile primary controls live at the bottom edge, never the top, because that's where the thumb actually rests on a phone. Paired actions (open / close) share the same physical coordinate — the bookmark tab keeps its position when the sheet opens and only swaps face from `chevron-up · "menu"` to `× · "close"`. We will not import top-of-screen nav patterns from the standard portfolio template gallery just because everyone uses them.
- **2026-05-29 (pm)** — **Mobile dock redesigned again: Pocket Player.** Replaces the rotary-dial attempt, which suffered from per-item nested transforms (every drag frame restyled all 8 items + their gradients/shadows) and didn't hold the design language. The Pocket Player splits the **gesture surface** (a click-wheel that just rotates, carrying no items) from the **data surface** (a small LCD-tinted screen above the wheel, holding items as a plain text list with a fixed centre highlight band). Spinning the wheel translates the list past the band; the active row's handwritten footer updates only on snap. References, intentionally expanded: **iPod** (screen + click-wheel + centre button), **Walkman** (cream paper-plastic finish), **Etch-A-Sketch** (knob-driven pointer across a closed screen), **rotary phone** (circular thumb spin). The previous "iPod-style click wheel rejected for primary nav" decision is superseded by this one, because the discoverability concern is now solved by the screen-with-pointer model and by always-tappable rows as a fallback.
- **2026-05-29 (pm)** — **Mobile dock has a dedicated close affordance.** A clearly labeled **×** button in the top-right of the Pocket Player's status bar joins the existing dim backdrop and Escape key as three independent dismiss paths. Universal mental model; never depends on the user remembering an unconventional gesture.
- **2026-05-29 (pm)** — **Performance is now an explicit contract for the mobile dock.** During any drag, only two elements may animate: the wheel arc (`transform: rotate`) and the items list (`transform: translateX`). No per-item transforms, no per-item box-shadows, no DOM text mutations during the drag itself, no synchronous style writes inside `pointermove` (all writes RAF-batched). Heavy decorative effects (inner ring shadow) are dropped under `.is-dragging`. This is a load-bearing rule: the dock is the most-touched interaction on the site and must feel like a real device, not a fragile demo.
- **2026-05-29 (pm)** — **Material vocabulary expanded** from "stationery / journaling" to "stationery + vintage handheld devices". The two worlds share the same tactile, paper-cream, ink-and-handwriting finish — they read as a single coherent world rather than two metaphors competing for attention.
- **2026-05-30** — **Pocket Player adopted on desktop too; the two-zone floating pill is retired.** The desktop dock is now the *same component* as the mobile dock — same markup, same controller, same brand colours. Only the position differs: bottom-LEFT on desktop (so it stays out of the way of centred long-form content), bottom-CENTRE on mobile. The previous "expand-on-hover pill" hover-to-grow vocabulary is preserved in spirit: the closed desktop state shows only a small monogram puck peeking out of the corner, and hovering or focusing the puck "pulls the device out of the pocket" with the same family of transitions. Wheel control on desktop accepts mouse drag and mouse-wheel / touchpad scroll. Page hit-testing is unaffected — the shell carries no invisible hit area; only the visible peek and the visible device are interactive.
- **2026-05-30** — **Wheel controller rewritten — 5 user-reported defects addressed in one pass.** (1) Janky 180° flip-to-origin: replaced absolute-from-start angle math with **incremental angle delta** between successive `pointermove` events; the wheel can now be spun continuously through any number of rotations without ever resetting. (2) Wheel freezing at the end of the list: the wheel rotation accumulator is now **unbounded**; only the items-list translation is clamped + rubber-banded so the user feels the edge while the wheel itself keeps spinning visually. (3) Description updates only on release: the screen footer now updates **live during the drag** at every detent crossing (naturally rate-limited to one cheap `textContent` write per real row, no thrash). (4) Wheel too small relative to the device: wheel grew from `~7.5–8.5rem` to `12.4rem` on desktop and proportionally on mobile — it now reads as the device's *primary* control. (5) UI clutter: the top status bar (handwritten "menu" label + dedicated × close button) is **removed entirely**; its responsibilities migrated into the wheel itself (the `menu` cap is now the close, the active row's name lives on the screen).
- **2026-05-30** — **Compass cap labels are real `<button>`s with honest actions.** `menu` (top) closes the player, right (skip-forward) steps to the next item, `play` (bottom) activates the highlighted item, left (skip-back) steps to the previous item. The centre button also activates the highlighted item — faithful to a real iPod. We will not ship UI elements that "don't do anything".
- **2026-05-30** — **Pointer Events used throughout the wheel** (touch / mouse / pen all run through one code path), with `setPointerCapture` so the gesture survives the cursor leaving the wheel rim. The wheel additionally listens for mouse-wheel / touchpad-scroll input as a no-drag alternative for trackpad users. RAF-batched style writes; no synchronous style work inside `pointermove`.
- **2026-05-30** — **Music-player mode and small UX sounds are designed-for, not implemented.** The `data-action` dispatcher pattern on the wheel caps already accepts new actions (`pause`, `next-track`, etc.) without markup churn. Audio cues will subscribe to a future `dock:active` / `dock:detent` event from the controller. **We let the core navigation interaction mature first** before layering in music or sound — explicit user direction.

---

## Open Questions

- **Cloudinary cutover trigger**: at what point do we flip `PUBLIC_MEDIA_PROVIDER` from `placeholder` to `cloudinary`? (Image volume threshold? Pre-launch? When first non-developer wants to upload?)
- **Shared-image namespace**: convention for cross-post identifiers (e.g. `shared/profile`, `shared/og/default`) — documented now or evolve organically?
