/**
 * Tech logos consumed by LogoCloud.astro.
 * Initial v1 uses styled name pills; SVGs under src/assets/logos/ will replace them later.
 */
import type { Accent } from "../lib/accents";

export interface TechLogo {
  name: string;
  href?: string;
  accent?: Accent;
}

export const techLogos: TechLogo[] = [
  { name: "Astro",        accent: "coral" },
  { name: "TypeScript",   accent: "sky" },
  { name: "Tailwind CSS", accent: "sky" },
  { name: "React",        accent: "sky" },
  { name: "Node.js",      accent: "mint" },
  { name: "Vite",         accent: "lavender" },
  { name: "MDX",          accent: "butter" },
  { name: "PostgreSQL",   accent: "sky" },
  { name: "Figma",        accent: "rose" },
];
