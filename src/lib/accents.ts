/**
 * Pastel accent system — single source of truth.
 *
 * The site uses six pastel accents (coral, sky, mint, butter, lavender, rose).
 * Every component that needs to talk about an accent should import from here
 * — never re-declare the union, never hand-build a `accent → class` map.
 *
 * Adding a new accent in the future is a one-file change: add it to
 * `ACCENT_KEYS`, add the matching pastel CSS variables in `global.css`, done.
 */

export const ACCENT_KEYS = [
  "coral",
  "sky",
  "mint",
  "butter",
  "lavender",
  "rose",
] as const;

export type Accent = (typeof ACCENT_KEYS)[number];

const ACCENT_SET = new Set<string>(ACCENT_KEYS);

/** Narrow an unknown string to a valid Accent, falling back to a default. */
export const toAccent = (value: unknown, fallback: Accent = "coral"): Accent =>
  typeof value === "string" && ACCENT_SET.has(value) ? (value as Accent) : fallback;

/** Tailwind/CSS class for handwritten ink — `<p class={inkClass("sky")}>`. */
export const inkClass = (accent: Accent) => `ink-${accent}`;

/** Tailwind/CSS class for tag chips — `<li class={chipClass("mint")}>`. */
export const chipClass = (accent: Accent) => `chip-${accent}`;

/** CSS variable name for an accent's deep shade (e.g. for inline styles). */
export const accentVar = (accent: Accent, shade: "" | "deep" = "deep") =>
  shade ? `var(--color-pastel-${accent}-${shade})` : `var(--color-pastel-${accent})`;
