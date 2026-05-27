/**
 * Site-wide data that rarely changes.
 * Per PLAN.md: nav is Header-only; socials + email are Footer-only.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteData {
  name: string;
  shortName: string;
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
  name: "Raval Dinesh",
  shortName: "Dinesh",
  tagline: "An oasis of code, craft, and curiosity.",
  bio: "I build calm, colorful interfaces and the systems behind them. Currently exploring delightful UX, design systems, and Astro-powered sites that load fast and feel friendly.",
  url: "https://shyamraval.github.io",
  email: "hello@shyamraval.dev",
  nav: [
    { label: "projects", href: "/projects" },
    { label: "blog", href: "/blog" },
    { label: "resume", href: "/resume" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/ShyamRaval" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dkraval/" },
    { label: "X / Twitter", href: "https://x.com/" },
  ],
  seo: {
    titleTemplate: "%s — Raval Dinesh",
    defaultTitle: "Raval Dinesh — Portfolio",
    defaultDescription:
      "Personal portfolio of Raval Dinesh — projects, writing, and experiments.",
    ogImage: "/og-default.png",
  },
  resume: {
    pdfPath: "/resume.pdf",
    downloadName: "DineshRaval-Resume.pdf",
  },
};
