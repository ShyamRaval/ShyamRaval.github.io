/**
 * Navigator data — derives the Navigator's nav + social rows from `site` data.
 *
 * Why this exists:
 *   The Navigator component used to inline three near-identical `if (linkedin)
 *   socials.push({...})` blocks plus its own `handleFromHref` helper. Adding
 *   a new social network meant editing the Navigator template AND duplicating the
 *   block. Now there's a single brand registry; adding a network is a
 *   one-line append below.
 *
 * Adding a brand:
 *   1. Add a registry entry with `match` (substring tested against
 *      site.socials[*].label, case-insensitive), the icon name, the
 *      handwritten copy, and the handle-derivation rule.
 *   2. Add the matching SVG entry in `src/components/Icon.astro`.
 *   That's it — no Navigator template edits.
 */
import type { IconName } from "./icons";
import type { SiteData, NavLink } from "../data/site";

export type NavigatorBrand = "email" | "github" | "linkedin" | "x";

export interface NavigatorSocial {
  href: string;
  label: string;
  brand: NavigatorBrand;
  icon: IconName;
  handle: string;
  hand: string;
  external: boolean;
}

interface BrandEntry {
  brand: NavigatorBrand;
  /** Substring tested (lowercase) against `site.socials[*].label`. */
  match: string[];
  icon: IconName;
  /** One-line handwritten note shown on the screen meta. */
  hand: string;
  /** How to derive the displayed handle from the href. */
  handlePrefix?: string;
}

const BRANDS: BrandEntry[] = [
  { brand: "github",   match: ["github"],         icon: "github",   hand: "code & weekend things",   handlePrefix: "@" },
  { brand: "linkedin", match: ["linkedin"],       icon: "linkedin", hand: "the resume version",      handlePrefix: "in/" },
  { brand: "x",        match: ["x", "twitter"],   icon: "x",        hand: "occasional ramblings",    handlePrefix: "@" },
];

/** Pull the last path segment from a URL and prefix it (e.g. @octocat). */
const handleFromHref = (href: string, prefix = "@"): string => {
  try {
    const url = new URL(href);
    const parts = url.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1] ?? "";
    return last ? `${prefix}${last}` : url.hostname;
  } catch {
    return href;
  }
};

/**
 * Build the Navigator's social rows from `site.socials`. The email entry is
 * synthesised from `site.email` (no socials array entry needed).
 *
 * Rows appear in the order: email, then each registered brand that has
 * a matching socials entry — preserving registry order, not the order
 * brands appear in `site.socials`.
 */
export function getNavigatorSocials(site: SiteData): NavigatorSocial[] {
  const rows: NavigatorSocial[] = [
    {
      href: `mailto:${site.email}`,
      label: "Email",
      brand: "email",
      icon: "email",
      handle: site.email,
      hand: "drop a line",
      external: false,
    },
  ];

  for (const entry of BRANDS) {
    const found = site.socials.find((s) =>
      entry.match.some((m) => s.label.toLowerCase().includes(m)),
    );
    if (!found) continue;
    rows.push({
      href: found.href,
      label: found.label,
      brand: entry.brand,
      icon: entry.icon,
      handle: handleFromHref(found.href, entry.handlePrefix),
      hand: entry.hand,
      external: true,
    });
  }

  return rows;
}

/** Map a NavLink's icon key to its registered Icon name. */
export const navIcon = (nav: NavLink): IconName => nav.icon;
