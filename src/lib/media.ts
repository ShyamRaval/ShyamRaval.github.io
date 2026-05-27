/**
 * Provider abstraction for the <Media /> component (per PLAN.md).
 *
 * - <Media /> is the ONLY image entry point across the site.
 * - This file is the ONLY file that knows where image bytes actually live.
 * - Switching providers (placeholder → cloudinary later) is a one-file change here.
 */

export type MediaProvider = "placeholder" | "cloudinary";

export interface ResolveMediaOptions {
  /** Target render width in CSS pixels. */
  width: number;
  /** Target render height in CSS pixels. */
  height: number;
}

const PROVIDER: MediaProvider =
  (import.meta.env.PUBLIC_MEDIA_PROVIDER as MediaProvider) ?? "placeholder";

/** Pastel pairs used by deterministic fallback rectangles via placehold.co. */
const FALLBACK_PALETTE: ReadonlyArray<{ bg: string; fg: string }> = [
  { bg: "FFE6A7", fg: "8B5E14" }, // butter
  { bg: "AEE0F8", fg: "0F4E78" }, // sky
  { bg: "FFC4B8", fg: "8B2A1A" }, // coral
  { bg: "B6EFD6", fg: "0F5A3E" }, // mint
  { bg: "D9C8FF", fg: "3D2B7A" }, // lavender
  { bg: "FFD1EA", fg: "8B2A65" }, // rose
];

/** Stable hash → palette index so the same id always picks the same pastel. */
function pickPalette(id: string): { bg: string; fg: string } {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h) % FALLBACK_PALETTE.length;
  // FALLBACK_PALETTE is non-empty above, so this is always defined.
  return FALLBACK_PALETTE[idx]!;
}

/** Resolve a Media identifier to a fully-qualified URL the provider can serve. */
export function resolveMediaUrl(id: string, opts: ResolveMediaOptions): string {
  const { width, height } = opts;

  // Deterministic fallback bucket — used when frontmatter omits cover/thumbnail.
  if (id.startsWith("placeholder/")) {
    const { bg, fg } = pickPalette(id);
    const label = id.slice("placeholder/".length).replaceAll("/", " · ");
    return `https://placehold.co/${width}x${height}/${bg}/${fg}.png?text=${encodeURIComponent(label)}`;
  }

  if (PROVIDER === "cloudinary") {
    const cloud = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloud) {
      // Fail loud in dev; silently fall back to placeholder in prod build.
      if (import.meta.env.DEV) {
        throw new Error(
          "PUBLIC_CLOUDINARY_CLOUD_NAME is required when PUBLIC_MEDIA_PROVIDER=cloudinary",
        );
      }
      return `https://placehold.co/${width}x${height}.png?text=missing+cloud+name`;
    }
    return `https://res.cloudinary.com/${cloud}/image/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${id}`;
  }

  // Default: picsum.photos with seeded IDs for stable layouts.
  // picsum treats `/` in the seed path as a route separator, so flatten the id.
  const seed = id.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export const currentMediaProvider = PROVIDER;
