# Portfolio Website Plan (Living Document)

This file is the **single source of truth** for how the portfolio should look/work.
We keep updating it as new requirements arrive — **before** making major implementation changes.

---

## Goals

- Build a **personal portfolio** website that feels like a **welcoming oasis of soft pastels and playful gradients** — warm, colorful, never corporate.
- Fast, optimized, and easy to maintain.
- Image-heavy by design — every raster image flows through Astro's `<Image />` component (hard requirement).
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
- **We do not chase the user.** Primary navigation is provided once, in the Header. Pages do not redirect attention back to those same destinations through hero CTAs. The user comes to us at their pace.
- **Quiet beats loud.** Color, motion, and weight are spent like punctuation, not wallpaper.
- **Personal voice.** Display text has personality, body text reads cleanly, and the occasional handwritten note carries a hand-drawn warmth.
- **Real-life material language.** The site should feel like real-life objects — polaroids, paper notebook tabs, sticky notes, washi tape, ink stamps, pencil scribbles, handwritten margin notes — rather than abstract digital surfaces. We stay inside a coherent world of personal **stationery / studying / journaling** so the metaphors do not fight each other. We break the standard "this is a website" illusion and replace it with a tactile, timeless one.
- **Timelessness over trend.** Reference materials that have always existed (paper, ink, tape, photographs) and that will still feel right years from now. Avoid effects that will date the site to a specific year.

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
- **Material vocabulary (current)**: **polaroid photo frames** (hero portrait), **notebook-style paper tabs** (header navigation), **handwritten margin labels** (section identifiers), small **pastel ink** moments in text. Future additions may include **washi tape**, **ink stamps**, **sticky notes**, **pencil scribbles**, and **torn paper edges** — added only when they earn their place.
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
- **No dedicated `/contact` page** — email + socials live in a **floating dock** at the bottom of the viewport (rendered by `Footer.astro`).
- Internal navigation uses **Astro View Transitions** for instant, no-reload page swaps.

---

## Layout Strategy

- **Compactness as a design discipline.** Screen real estate is precious; we minimize forced scrolling. Sections are tight, dense where they can be, breathable where they must be.
- **Distinct strategies for mobile vs desktop** — not pure responsive scaling. Desktop leans into **asymmetric, editorial multi-column** compositions (e.g. handwritten section label on one side, content on the other). Mobile collapses to a deliberate single-column reading flow with the labels stacking above content.
- **Whitespace earns its keep.** Padding and margin exist to aid readability and rhythm, never to pad time on page.
- **No horizontal-rule section dividers.** Section boundaries are communicated by **handwritten margin labels + whitespace**, not by generic `border-top` lines between adjacent components.
- **Cards size to their own content.** No card stretches its height to match the tallest sibling in its row; each card's height is determined by its own content. Adjacent cards may therefore differ in height — that is correct, not a bug.
- **Navigation as paper tabs.** The header renders nav items as **notebook-style paper tabs**: rounded-top rectangles, with the active tab "pulled forward" into the page surface (white fill, no bottom edge). The site name is the home link, treated as the notebook's spine label.
- **The "footer" is a two-state floating dock** at the bottom of the viewport:
  1. **Resting**: shows a short textual invitation (e.g. *socials — say hello*) mixing display italic + handwritten Caveat. No icons visible.
  2. **Active (hover / focus / touch)**: the text crossfades into a row of icons (email + socials).
  3. **Per-icon reveal**: hovering or focusing an individual icon surfaces a small floating **"business card"** above the dock — handle in display italic, one-line handwritten note. On touch devices, icons render directly (no resting text), and tapping navigates to the link.
  - Icon hover colors echo each brand's signature color, applied to the icon itself (not as a full background fill).
  - **Touch targets on mobile are ≥ 44 px** per Apple HIG / Material recommendation — the touch-device dock uses larger icon hit areas and slightly more spacing than the desktop dock.

---

## Separation of Concerns

### Design (styling)

- **All design tokens live in [`src/styles/global.css`](src/styles/global.css)**, using Tailwind v4's `@theme` block + CSS custom properties.
- Tokens cover: colors (surfaces + accents), spacing scale, radii, shadows, font stacks, motion durations/easings.
- Components consume tokens via Tailwind utility classes — **no scattered hex values** in `.astro` files.

### Structure (layouts & components)

- Layout shells in `src/layouts/` (e.g. `BaseLayout.astro`, `BlogPostLayout.astro`, `ProjectLayout.astro`).
- Reusable UI blocks in `src/components/` (e.g. `Header.astro`, `Footer.astro`, `ProjectCard.astro`, `BlogCard.astro`, `Timeline.astro`, `Section.astro`, `LogoCloud.astro`, `Media.astro`).
- `Media.astro` is the **only** image entry point across the site — wraps Astro `<Image />` and hides the provider (see Images & Media).
- Thin shared helpers live in `src/lib/` (e.g. `src/lib/media.ts` for resolving provider URLs).
- `Header.astro` consumes `site.nav`. `Footer.astro` renders as a **floating dock** — icons-only for socials + email, no nav links, no copyright text.
- Pages in `src/pages/` stay **thin** — compose components, feed data/content.

### Data (rarely changes)

- `src/data/site.ts` — name, tagline, nav links (Header-only), email + socials (Footer-only), SEO defaults.
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
    Header.astro            # consumes site.nav
    Footer.astro            # floating icons-only dock (socials + email)
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
- `nav` (array of `{ label, href }`) — consumed by **Header only**
- `socials` (array of `{ label, href }`) — consumed by **Footer only**
- `seo` defaults (title template, description, OG image path)
- `resume` (PDF path + download filename)

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

---

## Open Questions

- **Cloudinary cutover trigger**: at what point do we flip `PUBLIC_MEDIA_PROVIDER` from `placeholder` to `cloudinary`? (Image volume threshold? Pre-launch? When first non-developer wants to upload?)
- **Shared-image namespace**: convention for cross-post identifiers (e.g. `shared/profile`, `shared/og/default`) — documented now or evolve organically?
