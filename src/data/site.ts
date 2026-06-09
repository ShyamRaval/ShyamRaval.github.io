/**
 * Site-wide data that rarely changes.
 *
 * Per PLAN.md (2026-05-27): primary navigation now lives in the
 * Navigator (NOT the header). Each nav entry carries:
 *   - label  : display name
 *   - href   : target route
 *   - icon   : icon key the Navigator component knows how to render
 *              ("monogram" → "S" in display italic; otherwise an SVG)
 *   - hand   : one-line handwritten note on the Navigator screen
 *   - handle : pretty label shown in the Navigator screen meta
 */

import type { IconName } from "../lib/icons";

/* Only the icon names that make sense for navigation rows. The
 * `Extract` keeps this in lockstep with the icon registry — adding a
 * new nav-eligible icon is a one-line union widening, not a new
 * standalone literal. */
export type NavIcon = Extract<IconName, "monogram" | "folder" | "pencil" | "document">;

export interface NavLink {
  label: string;
  href: string;
  icon: NavIcon;
  handle: string;
  hand: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteData {
  name: string;
  shortName: string;
  monogram: string;
  tagline: string;
  bio: string;
  url: string;
  email: string;
  nav: NavLink[];
  socials: SocialLink[];
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
  resume: {
    pdfPath: string;
    downloadName: string;
  };
}

export const site: SiteData = {
  name: "Shyam Raval",
  shortName: "Shyam",
  monogram: "S",
  tagline: "An oasis of code, craft, and curiosity.",
  bio: "I build calm, colorful interfaces and the systems behind them. Currently exploring delightful UX, design systems, and Astro-powered sites that load fast and feel friendly.",
  url: "https://shyamraval.github.io",
  email: "hello@shyamraval.dev",
  nav: [
    {
      label: "home",
      href: "/",
      icon: "monogram",
      handle: "Shyam Raval",
      hand: "back to the start",
    },
    {
      label: "projects",
      href: "/projects",
      icon: "folder",
      handle: "the work",
      hand: "things I've built",
    },
    {
      label: "blog",
      href: "/blog",
      icon: "pencil",
      handle: "the writing",
      hand: "what I've been thinking",
    },
    {
      label: "resume",
      href: "/resume",
      icon: "document",
      handle: "the resume",
      hand: "the formal version",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/ShyamRaval" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shyamraval/" },
    { label: "X / Twitter", href: "https://x.com/" },
  ],
  seo: {
    titleTemplate: "%s — Shyam Raval",
    defaultTitle: "Shyam Raval — Portfolio",
    defaultDescription:
      "Personal portfolio of Shyam Raval — projects, writing, and experiments.",
    ogImage: "/og-default.png",
  },
  resume: {
    pdfPath: "/Raval_Dinesh.pdf",
    downloadName: "Raval_Dinesh-Resume.pdf",
  },
};
