/**
 * Marginalia — rotating handwritten lines that live in the page header.
 *
 * Per PLAN.md: the header carries no name, no logo, no nav — just a single
 * short line picked from this list at the start of a session and persisted
 * via sessionStorage. Fresh visit = fresh line.
 *
 * Each line should feel like something jotted in the margin of a notebook:
 * short, personal, occasionally playful. No CTAs, no marketing.
 */
export const marginalia: readonly string[] = [
  "make a cup of tea before you scroll",
  "the small things are usually the right ones",
  "no hurry — this is the slow internet",
  "best version of this site exists at 5pm",
  "the navigator at the bottom takes you everywhere",
  "ps. there are easter eggs",
  "thanks for being early",
  "all this was thought on a slow saturday",
  "look — the headings do nice things on hover",
  "first principle: make it kinder",
  "feel free to wander, use the navigator at the bottom",
  "every link here is a small invitation",
  "made with care",
  "if it loads fast, that's intentional",
  "calm internet, one page at a time",
  
] as const;

export type Marginalia = (typeof marginalia)[number];
