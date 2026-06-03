/**
 * Icon registry — single source of truth for every SVG used on the site.
 *
 * The matching `<Icon />` component (`src/components/Icon.astro`) is a
 * thin renderer that looks up `name` in `ICONS`. Adding a new icon is
 * a one-line append to the registry below; nothing in any template
 * needs to inline an `<svg>`.
 *
 * Stroke vs fill:
 *   Each entry declares its own `style: "stroke" | "fill" | "text"`.
 *   Stroke icons inherit `currentColor` and a consistent stroke
 *   weight. Fill icons render as solid logos (brand marks). Text is
 *   the one entry — the monogram — that is intentionally *not* an SVG.
 */

export type IconName =
  | "monogram"
  | "folder"
  | "pencil"
  | "document"
  | "email"
  | "github"
  | "linkedin"
  | "x"
  | "skip-back"
  | "skip-forward";

export interface IconShape {
  style: "stroke" | "fill" | "text";
  /** SVG path data for `style: "stroke" | "fill"`. Always sized 24×24. */
  paths?: string[];
}

export const ICONS: Record<IconName, IconShape> = {
  monogram: { style: "text" },

  folder: {
    style: "stroke",
    paths: [
      "M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z",
    ],
  },
  pencil: {
    style: "stroke",
    paths: [
      "M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
      "m14 6 3 3",
    ],
  },
  document: {
    style: "stroke",
    paths: [
      "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z",
      "M14 3v6h6",
    ],
  },

  email: {
    style: "stroke",
    paths: [
      // Rounded rect (rx=2), expressed as a path so the registry can
      // stay homogeneous — every entry is just SVG path data.
      "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
      "m3 7 9 6 9-6",
    ],
  },
  github: {
    style: "fill",
    paths: [
      "M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.47.11-3.07 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.6.23 2.77.11 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.2.66.79.55C20.22 21.4 23.5 17.09 23.5 12.02 23.5 5.66 18.35.5 12 .5Z",
    ],
  },
  linkedin: {
    style: "fill",
    paths: [
      "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.74v20.51C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z",
    ],
  },
  x: {
    style: "fill",
    paths: [
      "M18.244 2H21.5l-7.59 8.68L23 22h-6.808l-5.34-6.97L4.74 22H1.48l8.13-9.29L1 2h6.91l4.83 6.39L18.244 2Zm-1.193 18.05h1.82L7.04 3.86H5.13l11.92 16.19Z",
    ],
  },

  // Triangle + bar marks. Mirrors of one another so direction reads
  // even at sub-1rem sizes.
  "skip-forward": {
    style: "fill",
    paths: ["M4 6v12l11-6L4 6Z", "M17 6h2v12h-2z"],
  },
  "skip-back": {
    style: "fill",
    paths: ["M5 6h2v12H5z", "M20 6v12L9 12 20 6Z"],
  },
};
