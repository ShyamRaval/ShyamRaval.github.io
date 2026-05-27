/**
 * Timeline entries — rendered on the Home page (per PLAN.md).
 * Order is most-recent-first; the component handles visual ordering.
 */

export type TimelineKind = "milestone" | "work" | "education" | "project" | "life";

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  kind?: TimelineKind;
  place?: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: "Started this portfolio",
    description:
      "Designed an oasis-themed personal site with a focus on calm pastels, fast navigation, and self-contained content.",
    kind: "project",
  },
  {
    year: "2025",
    title: "Diving into design systems",
    description:
      "Built component libraries and explored Tailwind v4 tokens, motion design, and accessibility patterns.",
    kind: "milestone",
  },
  {
    year: "2024",
    title: "Shipping with Astro",
    description:
      "Rebuilt multiple projects on Astro for blazing static performance and View Transitions.",
    kind: "work",
  },
  {
    year: "2023",
    title: "Learning, always learning",
    description:
      "Deepened in TypeScript, browser internals, and the joy of small, well-shaped tools.",
    kind: "education",
  },
];
