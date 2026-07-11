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
      "Designed a minimalistic personal site with a focus on meaningful content, fast navigation, and self-contained content.",
    kind: "project",
  },
  {
    year: "2025",
    title: "Started working at Shievon.in as a Software Developer",
    description:
      "Started working at Shievon.in as a Software Developer.",
    kind: "work",
  },
  {
    year: "2022",
    title: "Started my B.E in Information Technology",
    description:
      "Started my B.E in Information Technology at LJ university, Ahmedabad.",
    kind: "education",
  },
  {
    year: "2019",
    title: "Started my diploma in Computer Engineering",
    description:
      "Started my diploma in Computer Engineering at Government Polytechnic, Ahmedabad.",
    kind: "education",
  },
];
