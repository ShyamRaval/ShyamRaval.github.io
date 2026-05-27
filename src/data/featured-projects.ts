/**
 * Featured projects rendered on the Home page.
 *
 * Temporary v1 data file. Per PLAN.md the long-term home for project metadata is
 * `src/content/projects/<slug>/index.mdx` frontmatter; this file will be replaced
 * by a content-collection query in the next implementation pass.
 */

export type ProjectAccent =
  | "coral"
  | "sky"
  | "mint"
  | "butter"
  | "lavender"
  | "rose";

export interface FeaturedProject {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  /** Media identifier resolved by <Media /> — never a path or URL. */
  thumbnail: string;
  /** Display year for editorial layout (e.g. "2026"). */
  year?: string;
  /** Accent pastel applied to tags and hover. */
  accent?: ProjectAccent;
  links?: {
    github?: string;
    live?: string;
  };
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "oasis-portfolio",
    title: "Oasis Portfolio",
    summary:
      "This site — pastel accents, View Transitions, and self-contained MDX posts.",
    tags: ["Astro", "Tailwind v4", "MDX"],
    thumbnail: "projects/oasis-portfolio/thumbnail",
    year: "2026",
    accent: "coral",
    links: {
      github: "https://github.com/ShyamRaval/ShyamRaval.github.io",
    },
  },
  {
    slug: "color-companion",
    title: "Color Companion",
    summary:
      "A pastel-friendly palette generator that nudges designers toward accessible combinations.",
    tags: ["TypeScript", "Design Tools"],
    thumbnail: "projects/color-companion/thumbnail",
    year: "2025",
    accent: "sky",
  },
  {
    slug: "morning-pages",
    title: "Morning Pages",
    summary:
      "A tiny writing app for daily three-page journaling with gentle, encouraging UI.",
    tags: ["React", "PWA"],
    thumbnail: "projects/morning-pages/thumbnail",
    year: "2025",
    accent: "mint",
  },
];
