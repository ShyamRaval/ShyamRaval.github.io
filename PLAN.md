# Portfolio Website Plan (Living Document)

**PLAN.md** is the living spec — how the portfolio should look and work. Update it **before** major implementation changes.

**[`DECISIONS.md`](DECISIONS.md)** holds the dated log of locked choices and reversals. When you lock or undo something, add a line there.

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
- Dedicated `/about` or `/contact` pages — Home covers "about me", the Navigator at the bottom of the viewport covers contact.
- Project list-only UI (we use cards + case studies).
- Heavy "desert / sand / beach" visual metaphor — palette is **soft pastels + gradients**, not themed imagery.
- Sitemap or RSS feed.
- Copyright notice in the footer — copyright applies automatically; we don't restate it.

---

## Design Philosophy

We design like a small magazine, not a SaaS landing page.

- **Every element earns its place.** Buttons, links, cards, animations, sections — each must answer a clear question. If we cannot articulate why something exists, it is removed.
- **No template thinking.** Industry-standard portfolio patterns (3-card "values" rows, big "Hire me" CTAs, hero buttons that beg for clicks, generic footers with site maps) are off-limits as defaults; we adopt them only when they serve the specific page.
- **We do not chase the user.** Primary navigation is provided once, in the Navigator. Pages do not redirect attention back to those same destinations through hero CTAs. The user comes to us at their pace.
- **Quiet beats loud.** Color, motion, and weight are spent like punctuation, not wallpaper.
- **Personal voice.** Display text has personality, body text reads cleanly, and the occasional handwritten note carries a hand-drawn warmth.
- **Real-life material language.** The site should feel like real-life objects — polaroids, paper notebook tabs, sticky notes, washi tape, ink stamps, pencil scribbles, handwritten margin notes — rather than abstract digital surfaces. We stay inside a coherent world of personal **stationery / studying / journaling** so the metaphors do not fight each other. We break the standard "this is a website" illusion and replace it with a tactile, timeless one.
- **Timelessness over trend.** Reference materials that have always existed (paper, ink, tape, photographs) and that will still feel right years from now. Avoid effects that will date the site to a specific year.
- **Ergonomics over convention — design for the body, not the brand book.** Most portfolio sites import the same mobile patterns from the same template galleries: a hamburger or logo+nav strip pinned to the *top* of the viewport, with everything important sitting where a one-handed phone grip can't comfortably reach. Holding a modern phone, the thumb naturally lives at the **bottom third of the screen**; reaching the top corners requires a regrip or a wrist stretch dozens of times per session. We refuse to inherit that strain just because everyone else does.
  - Primary controls live at the **bottom edge** on mobile, never the top. The header is intentionally inert decoration; the Navigator is where the work happens.
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
  - **Retired**: notebook-style paper tabs for header navigation. Nav has moved to the Navigator (see Layout Strategy). The paper-tab metaphor may return for *contextual* navigation elsewhere (e.g. project category filters on `/projects`).
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
- **No dedicated `/contact` page** — email + socials live in the Navigator's screen (the *say hello* section).
- **Primary navigation lives in the Navigator**, NOT in the header. The header carries only a rotating handwritten marginalia line.
- Internal navigation uses **Astro View Transitions** for instant, no-reload page swaps.

---

## Layout Strategy

- **Compactness as a design discipline.** Screen real estate is precious; we minimize forced scrolling. Sections are tight, dense where they can be, breathable where they must be — but **breathable ≠ empty**. There is a fine line between cluttered and wastefully sparse; we aim to walk that line (see **Display & viewport discipline** below).
- **Distinct strategies for mobile vs desktop** — not pure responsive scaling. Desktop leans into **asymmetric, editorial multi-column** compositions (e.g. handwritten section label on one side, content on the other). Mobile collapses to a deliberate single-column reading flow with the labels stacking above content.
- **Whitespace earns its keep.** Padding and margin exist to aid readability and rhythm, never to pad time on page.
- **No horizontal-rule section dividers.** Section boundaries are communicated by **handwritten margin labels + whitespace**, not by generic `border-top` lines between adjacent components.
- **Cards size to their own content.** No card stretches its height to match the tallest sibling in its row; each card's height is determined by its own content. Adjacent cards may therefore differ in height — that is correct, not a bug.
- **No layout shift between routes.** `html { scrollbar-gutter: stable }` always reserves the scrollbar's space, so centred content sits in the same place on pages that scroll and pages that don't — no sideways jump when navigating. It is a no-op on overlay-scrollbar systems (macOS / mobile), where there is nothing to reserve.
- **Minimum thumb travel.** Direct expression of the *Ergonomics over convention* principle (see Design Philosophy). All primary controls live within the bottom-third thumb reach zone on mobile; top-edge nav (drawer, fixed top bar, corner hamburger) is rejected on principle. Paired actions (open / close) share a single physical spot so the thumb that triggered an action can reverse it without travelling.
- **The header is a single line of handwritten marginalia** — that's it. No name, no logo, no nav. One short rotating line picked from `src/data/marginalia.ts`, rendered in Caveat at a comfortable but quiet size. New refresh = new line; in-app navigation keeps the current line because the header is persisted. The header is intentionally thin so it gives almost the entire viewport to content.
- **One Navigator — same device everywhere, positioned by orientation.** The Navigator unifies primary navigation + socials and replaces both the paper-tab header navigation *and* the previous floating pill. It is a small handheld device (iPod / Walkman / Etch-A-Sketch / rotary phone vocabulary) — the same component, markup, and controller on every screen. **Position is decided by viewport orientation; interaction is decided by input capability** — the two concerns are independent and compose freely (e.g. a landscape touch tablet gets the left tuck *and* the backdrop).
  - **Position (orientation).** Landscape & square viewports (width ≥ height) tuck the device into the bottom-LEFT corner, clear of centred long-form content (centring it there would put it directly in the way of text). Portrait viewports — **including a portrait desktop window** — anchor it bottom-CENTRE, in the thumb-reach zone. Implemented as base (portrait-centre) rules with a `@media (min-aspect-ratio: 1/1)` override for the left tuck. At rest only a small monogram **puck** peeks out — the "iPod sticking out of a pocket".
  - **Interaction (capability).** Fine-pointer (hover) devices pull the device out on hover/focus of the puck, and it **stays open** — there is intentionally **no hover-out close**. It minimizes only on a click **outside** its bounds, or the Escape key, so an in-bounds action (spinning the wheel, picking an item) can never tuck it away. Coarse-pointer (touch) devices tap the puck to raise it over a dim modal backdrop; tap the backdrop, tap outside, or press Escape to dismiss. The shell itself has `pointer-events: none`; only the visible puck (closed) and the visible device (open) are interactive — there is **no invisible dead zone that blocks page clicks**.
  - **Both shapes share the same body** — a screen on top, a click-wheel below:
    - **Top: a screen** — paper-cream LCD tint, holding the items as a **horizontal strip**. Sections are labeled in handwritten Caveat (*wander* for nav, *say hello* for socials). A fixed **highlight band** sits permanently at the centre of the screen; items slide *under* this band as the wheel spins (the Etch-A-Sketch pointer model). Beneath the strip, a small meta field shows the active row's italic handle plus a handwritten one-liner — and **updates live during the drag**, not on release.
    - **Bottom: a click-wheel** — pure controller, intentionally **large** relative to the device (it is the device's *primary* control, not an afterthought). Compass labels at 12 / 3 / 6 / 9 are **real `<button>`s with honest actions**, not decorative text:
      - `play` (top) → activate the highlighted item (same effect as the centre button — faithful to a real iPod, where centre and play are distinct controls that produce the same result for menu navigation).
      - right (skip-forward icon) → step to the next item.
      - `back` (bottom) → go back one step in the visitor's own navigation history (`history.back()`, which ClientRouter turns into a view transition; falls back to the parent route on a cold deep-link). It is **not** a menu step, so the boundary "tug" bounce never fires for it.
      - left (skip-back icon) → step to the previous item.
      - **Centre button** is intentionally blank → activate the highlighted item.
    - **Inputs supported on the wheel.** Touch drag (mobile), mouse drag (desktop), mouse-wheel scroll over the wheel, two-finger touchpad scroll over the wheel, keyboard arrows when focused. Pointer events are used throughout so the same code path serves all three pointer kinds.
    - **No top status bar.** Earlier we placed a "menu" handwritten label and a × close button in a top status bar; those are removed. Screen real estate inside the device is precious, and both affordances were redundant: the active item's name lives on the screen, and dismissal is handled by clicking/tapping **outside** the device (or Escape) — so no in-device close control is needed.
    - **Three ways to navigate**: spin the wheel and press centre/play, step with the left/right transport caps, or tap any row directly without ever using the wheel. The wheel is for people who want to play; direct tap is for people who don't.
    - **Dismissal**: click/tap anywhere **outside** the device, or press Escape. On touch, tapping the dim backdrop also dismisses. Hover-out does **not** dismiss on a fine-pointer device — once open it stays put until an outside click.
    - **Performance contract — non-negotiable.** During any drag, ONLY two elements may transform: the wheel arc (a single `transform: rotate`) and the items list (a single `transform: translateX`). No per-item transforms, no per-item shadows, no synchronous style writes inside `pointermove` (everything RAF-batched), and the active row's meta text mutates **only on detent crossings** so its rate is naturally bounded by snap distance. The wheel rotation accumulator is **unbounded** — when the list reaches its end the wheel keeps spinning visually with the list rubber-banding underneath, so the user never feels the gesture freeze.
    - **Gesture model.** Each `pointermove` computes the angle change from the *previous* pointer position, not from the drag-start. This eliminates the ±180° wraparound flip that older builds had: the wheel can be spun continuously through any number of full rotations without ever resetting to origin.
    - **Don't put updating info under the finger.** All dynamic content (the highlight, the active handle, the handwritten note) lives on the screen at the top of the device. The wheel-spinning thumb sits at the bottom and never overlaps the changing region.
    - **Discoverability of rotation.** The wheel caps are clickable buttons that work even if the user never figures out the spin gesture. Direct row tap is always available as a safe fallback.
    - **Material vocabulary, expanded.** Vintage handheld devices: the iPod (screen + click-wheel + centre button), the Walkman (cream paper-plastic finish, dashed paper dividers), the Etch-A-Sketch (a knob-driven pointer moving across a closed screen), and the rotary phone (circular thumb spin). These references sit naturally alongside the stationery vocabulary (paper, ink, handwriting) — they're the same tactile-object world, just with mechanism.
    - **Future hooks (deferred — see [`DECISIONS.md`](DECISIONS.md)).** The data-action dispatcher pattern on the wheel caps is intentionally extensible: a music-player mode and small UX sounds are planned but **not implemented in this pass**. We let the core navigation interaction mature first.
    - Player uses `role="dialog"` and is `aria-modal="true"` only when the backdrop is present (touch). Body scroll is locked only on touch. On touch, the device auto-collapses across an Astro view transition (so the destination page isn't hidden behind it); on a fine-pointer device it is persisted and left exactly as the user left it (no tuck-away flash on navigation).
    - **Why this design?** Earlier attempts each failed in a specific way: the always-visible two-row strip fought content for real-estate; the bookmark-sheet was too conventional; the rotary dial put orbiting items on the rotating surface and tanked the frame rate. The Navigator separates the **gesture surface** (the wheel — does very little work, just spins) from the **data surface** (the screen — where items live as plain readable text). That split is what makes the gesture feel like a real device.
  - The Navigator is the single most important interactive element on the site. It is the **only** primary navigation surface on either device.
- **`<DesignFor("iPod click wheel"))>` is now adopted on both desktop and mobile**, paired with a screen-with-pointer (Etch-A-Sketch) model so items are always readable text — not orbiting graphics — and direct row tap remains a safe fallback for any user who never spins the wheel.

---

## Display & viewport discipline

Every layout, margin, and padding decision must account for **how** the visitor is viewing the page — not just **how wide** it is.

### Viewport shapes we design for

| Shape | Typical devices | Layout bias |
|-------|-----------------|-------------|
| **Tall / narrow** | Smartphones in portrait | Single column; thumb-zone controls; tighter vertical media caps so letterboxing doesn't dominate |
| **Balanced** | Laptops, tablets in landscape, small desktops | Editorial measure for text; media may break out wider than prose |
| **Wide** | Monitors, TVs, ultrawide | Media uses horizontal real estate first; avoid arbitrary `max-width` caps that leave dead side gutters |
| **Square-ish** | Tablets in portrait, some foldables | Compose between tall and balanced rules; test both orientations |

These are **aspect-ratio** concerns. A 27″ monitor and a phone can share the same CSS pixel width in a narrow window — **width alone is never enough**. Prefer `svh`/`dvh`, `min-aspect-ratio` / `max-aspect-ratio`, and container-relative sizing over fixed `rem` caps that ignore viewport shape.

### Size, density, and pixels

- **Physical size ≠ CSS pixels.** A laptop and a 4K monitor may report similar layout widths; a phone may report a wide layout width in landscape. Design in **flow and proportions**, not one mockup width.
- **Pixel density (DPR).** Raster images go through Astro `<Image />` / `<Media />` with explicit dimensions; vectors and tokens scale cleanly. Touch targets stay ≥ 44px in **CSS pixels**, not device pixels.
- **Safe areas.** Respect `env(safe-area-inset-*)` on notched phones; the Navigator already accounts for bottom insets — any new fixed chrome must too.
- **Scrollbar stability.** `scrollbar-gutter: stable` on `html` prevents horizontal jump between routes; keep it when adding new full-bleed layouts.

### The clutter ↔ waste fine line

- **Cluttered** = too many competing elements, unreadable measure, chrome that eats content, decoration without purpose.
- **Wasteful** = oversized gutters, media capped far below available width/height, breakout lanes that don't actually break out, padding that exists only because a template defaulted to it.
- **Our target** = every pixel of margin or padding answers a readability or rhythm question; every unused region of the viewport is a **bug to investigate**, not a style choice — unless we deliberately left it quiet for editorial breathing room (and we can say why).

When auditing a layout, ask:

1. On **ultrawide**, is media using the breakout lane or sitting in a narrow strip?
2. On **tall narrow**, is media height capped so the page doesn't become one small rectangle in a sea of margin?
3. Would a **branch-specific** rule (e.g. `max-aspect-ratio: 9/16`) serve this component better than a single global cap?
4. Does this still read at **200% zoom** and with **reduced motion**?

Branch for specifics when one rule doesn't fit all — but **never** waste real estate just to avoid clutter. Tighten the component, not the viewport.

### Media sizing contract (MDX — deferred)

**Production today:** blog posts and case studies use `.container-prose` (48rem max) + `.prose` in `BlogPostLayout` / `ProjectLayout`. Inline images use `<Media />` at full column width.

**Next audition (when we retry):** widescreen article layout + MDX media chrome (Video / GIF / Audio players, breakout lane, viewport-aware `--media-max-h`). Those experiments will live under `src/styles/design-lab/` and a lab page — not in production — until explicitly promoted per **Design Lab workflow** below.

---

## Design Lab workflow (experiment → promote → prune)

**`/design-lab/*` is the only place we audition unfinished layout and component work.** The shipping site (`BaseLayout`, `BlogPostLayout`, `ProjectLayout`, `global.css`) stays stable until an experiment is explicitly promoted.

### Rules

1. **Experiment in isolation.** New layout, media chrome, or motion prototypes get **lab-only files** under `src/styles/design-lab/` (and lab pages under `src/pages/design-lab/`). Do **not** add audition CSS to `global.css` or production layouts until promoted.
2. **Design Lab shares tokens only until an experiment ships.** `DesignLabLayout.astro` imports `global.css` (same tokens + utilities as production). When auditioning new CSS, add lab-only sheets under `src/styles/design-lab/` and import them from `DesignLabLayout` — **not** from `global.css` until promoted.
3. **Promote when perfect.** When an experiment is approved: move the minimal rule set into the production path (`global.css`, layouts, shared components), wire production pages, then **delete or slim** the lab copy.
4. **Prune the lab after promotion.** Remove obsolete classes, dead `@import`s, and demo-only markup from Design Lab so it doesn't become a second source of truth.
5. **Components may exist in `src/components/` before promotion** (e.g. MDX primitives) — but their **styles and layout contracts** stay in lab sheets until shipped. JS that only runs from lab pages is acceptable; global CSS side effects are not.

### Checklist before promoting out of Design Lab

- [ ] Tested tall phone, tablet (portrait + landscape), laptop, ultrawide
- [ ] No regressions at 200% zoom; `prefers-reduced-motion` respected
- [ ] Production layout file updated (not just CSS moved)
- [ ] Lab duplicate removed; `index.css` `@import` dropped
- [ ] `DECISIONS.md` entry added

---

## Separation of Concerns

### Design (styling)

- **All design tokens live in [`src/styles/global.css`](src/styles/global.css)**, using Tailwind v4's `@theme` block + CSS custom properties.
- Tokens cover: colors (surfaces + accents), spacing scale, radii, shadows, font stacks, motion durations/easings.
- Components consume tokens via Tailwind utility classes — **no scattered hex values** in `.astro` files.

### Structure (layouts & components)

- Layout shells in `src/layouts/` (e.g. `BaseLayout.astro`, `BlogPostLayout.astro`, `ProjectLayout.astro`).
- Reusable UI blocks in `src/components/` (e.g. `Header.astro`, `Navigator.astro`, `ProjectCard.astro`, `BlogCard.astro`, `Timeline.astro`, `Section.astro`, `LogoCloud.astro`, `Icon.astro`, `Media.astro`).
- `Media.astro` is the **only** image entry point across the site — wraps Astro `<Image />` and hides the provider (see Images & Media). `Icon.astro` is the single SVG-icon entry point, resolving names against the `src/lib/icons.ts` registry.
- Thin shared helpers live in `src/lib/`:
  - `media.ts` — `resolveMediaUrl(id)`; swap providers here.
  - `content.ts` — typed query helpers over the content collections (e.g. published/featured filtering, date formatting).
  - `navigator-data.ts` — derives the Navigator's social rows from `site` data.
  - `icons.ts` — the icon-name registry/type backing `Icon.astro`.
  - `accents.ts` — pastel-accent helpers shared by cards.
- `Header.astro` renders marginalia only. `Navigator.astro` consumes `site.nav` + `site.socials` and is the single navigation + contact surface.
- Pages in `src/pages/` stay **thin** — compose components, feed data/content.
- **DRY rule (modular & extensible).** Shared behavior must live in one place:
  - repeat UI patterns → reusable components
  - repeat calculations / transforms / measurement logic → helpers in `src/lib/`
  - repeat constants → design tokens in `global.css` or typed data in `src/data/`
  - avoid “same code, slightly different” forks; add configuration/props instead.

### Data (rarely changes)

- `src/data/site.ts` — name, tagline, nav links + socials (Navigator), email, SEO defaults.
- `src/data/timeline.ts` — timeline entries shown on Home.
- `src/data/tech-logos.ts` — logo/cloud metadata consumed by `LogoCloud.astro`.
- `src/data/certificates.ts` — certificate metadata (stored, **not rendered in v1**).
- Resume PDF path + download filename in `site.ts` (`resume.pdfPath`); file lives in `public/` and is served as-is.

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
- **Public folder** is reserved for assets that must be served untouched (e.g. resume PDF, `favicon.ico`).

---

## Where things live (mental map)

Quick orientation — not a file-by-file inventory (use the repo for that).

| Area | Location | Notes |
|------|----------|--------|
| **Site shell** | `src/layouts/BaseLayout.astro` | Header, Navigator, ClientRouter, `global.css` |
| **Long-form posts** | `src/layouts/BlogPostLayout.astro`, `ProjectLayout.astro` | `.container-prose` + `.prose` around MDX |
| **UI building blocks** | `src/components/` | `Navigator`, `Media`, cards, sections, etc. |
| **Shared logic** | `src/lib/` | Media provider, content queries, icons, accents |
| **Routes** | `src/pages/` | Thin pages; dynamic `[slug].astro` for blog + projects |
| **Design tokens** | `src/styles/global.css` | Production and Design Lab both import this |
| **MDX content** | `src/content/{blog,projects}/<slug>/index.mdx` | Folder name = slug; text only, no image bytes |
| **Site data** | `src/data/` | Nav, socials, timeline, marginalia, etc. |
| **Schemas** | `src/content.config.ts` | Zod frontmatter for collections |
| **Static assets** | `public/` | Favicon, resume PDF — served untouched |
| **Throwaway tooling** | `src/pages/design-lab/` + `DesignLabLayout.astro` | `noindex`; delete before launch with no product impact |

Config at repo root: `astro.config.mjs`, `package.json`, `.env.example`. Living docs: `PLAN.md`, `DECISIONS.md`.

> **`/design-lab/*` is throwaway tooling, not product.** It is `noindex`, has no inbound links from the site, and exists to audition fonts, colours, tokens, and motion during development. New layout or MDX experiments get **isolated files** under `src/styles/design-lab/` (created when needed) and optional lab pages — nothing graduates to production until explicitly promoted (see **Design Lab workflow**). Delete `src/pages/design-lab/` + `DesignLabLayout.astro` before launch with zero impact on shipping pages.

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
- `nav` (array of `{ label, href, icon, handle, hand }`) — primary nav, rendered as the *wander* section of the Navigator screen. Each item carries its display label, target route, an icon key, a pretty `handle` (shown in the screen meta), and a one-line handwritten `hand` note.
- `socials` (array of `{ label, href }`) — rendered as the *say hello* section of the Navigator screen (via `src/lib/navigator-data.ts`).
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
- Render the PDF from `site.resume.pdfPath` (file in `public/`) with a native `<object>` first, with an `<iframe>`/link fallback inside the object body for browsers that cannot display PDFs inline.
- Include a prominent download button using `site.resume.downloadName`.
- Do **not** render certificates in v1.

---

## SPA-like Navigation

- `<ClientRouter />` from `astro:transitions` lives in `BaseLayout.astro`'s `<head>`.
- Internal links are plain `<a href="...">`.
- **Only the page content animates between routes.** `<main>` carries `transition:animate="fade"` (its own view-transition group). Persistent chrome — the `Header` and the `Navigator` — uses `transition:persist` **without** a `transition:name`, and the `root` view-transition crossfade is disabled (`::view-transition-old/new(root) { animation: none }`). The persisted chrome therefore holds perfectly still while only `<main>` crossfades — no flicker or "rebuild" of the device on navigation. (An earlier `transition:name` on the chrome caused exactly that flicker by lifting it into its own animated snapshot group.)

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

## Open Questions

- **Cloudinary cutover trigger**: at what point do we flip `PUBLIC_MEDIA_PROVIDER` from `placeholder` to `cloudinary`? (Image volume threshold? Pre-launch? When first non-developer wants to upload?)
- **Shared-image namespace**: convention for cross-post identifiers (e.g. `shared/profile`, `shared/og/default`) — documented now or evolve organically?
