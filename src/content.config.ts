/**
 * Content collections — the single schema source for blog posts and
 * project case studies (per PLAN.md "Content Model").
 *
 * Folder-per-entry: each post/case study is `src/content/<col>/<slug>/index.mdx`.
 * The `generateId` strips the trailing `/index` so the entry id IS the
 * folder name — which is also the route slug. Drag-and-drop a folder
 * into any Astro project and it just works.
 *
 * Images are referenced as stable string identifiers (resolved by
 * <Media />), never local imports — so schemas use `z.string()`, not
 * Astro's `image()` helper (see PLAN.md "Schema implication").
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { ACCENT_KEYS } from "./lib/accents";

const accent = z.enum(ACCENT_KEYS);

const stripIndex = ({ entry }: { entry: string }) =>
  entry.replace(/\/index\.(md|mdx)$/i, "");

const projects = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./src/content/projects",
    generateId: stripIndex,
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    /** Media identifier (e.g. "projects/<slug>/thumbnail"); omitted → pastel fallback. */
    thumbnail: z.string().optional(),
    links: z
      .object({
        github: z.string().url().optional(),
        live: z.string().url().optional(),
      })
      .optional(),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    /** Optional pastel accent for card + case-study theming. */
    accent: accent.optional(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.{md,mdx}",
    base: "./src/content/blog",
    generateId: stripIndex,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Media identifier (e.g. "blog/<slug>/cover"); omitted → pastel fallback. */
    cover: z.string().optional(),
    accent: accent.optional(),
  }),
});

export const collections = { blog, projects };
