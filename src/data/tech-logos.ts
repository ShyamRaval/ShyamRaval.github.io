/**
 * Tech logos consumed by LogoCloud.astro.
 * Initial v1 uses styled name pills; SVGs under src/assets/logos/ will replace them later.
 */

export type LogoAccent = "sky" | "coral" | "mint" | "butter" | "lavender" | "rose";

export interface TechLogo {
  name: string;
  href?: string;
  accent?: LogoAccent;
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
