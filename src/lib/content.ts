/**
 * Content access helpers — the single place that queries collections.
 *
 * Pages never call `getCollection` directly with ad-hoc sort/filter
 * logic; they call these helpers so "newest first", draft handling,
 * and the featured fallback live in exactly one place (DRY rule, see
 * PLAN.md "Separation of Concerns → Structure").
 */
import { getCollection, type CollectionEntry } from "astro:content";

type BlogEntry = CollectionEntry<"blog">;
type ProjectEntry = CollectionEntry<"projects">;

/** Newest-first comparator on `publishedAt`. */
const byNewest = (
  a: BlogEntry | ProjectEntry,
  b: BlogEntry | ProjectEntry,
) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime();

/**
 * Published blog posts, newest first. Drafts are hidden in production
 * builds but visible in `astro dev` so you can preview work in progress.
 */
export async function getBlogPosts(): Promise<BlogEntry[]> {
  const posts = await getCollection(
    "blog",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort(byNewest);
}

/** All projects, newest first. */
export async function getProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection("projects");
  return projects.sort(byNewest);
}

/**
 * Projects flagged `featured: true`, newest first. Falls back to the
 * most recent projects if nothing is flagged, so Home never renders
 * an empty grid.
 */
export async function getFeaturedProjects(limit?: number): Promise<ProjectEntry[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.data.featured);
  const list = featured.length > 0 ? featured : all;
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Stable Media identifier for an entry's lead image, with a pastel fallback. */
export const coverId = (entry: BlogEntry) =>
  entry.data.cover ?? `placeholder/blog/${entry.id}`;
export const thumbnailId = (entry: ProjectEntry) =>
  entry.data.thumbnail ?? `placeholder/projects/${entry.id}`;

/** Long date for article headers, e.g. "June 3, 2026". */
export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/** Short year for editorial labels, e.g. "2026". */
export const yearOf = (date: Date) => String(date.getFullYear());
