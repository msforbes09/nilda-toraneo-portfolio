import type { Site } from "./site";

export type SampleEntry = { path: string; label: string };

type Node = Record<string, unknown>;

function isNode(value: unknown): value is Node {
  return typeof value === "object" && value !== null;
}

function labelOf(item: Node, path: string): string {
  for (const key of ["label", "title", "name"]) {
    const value = item[key];
    if (typeof value === "string") return value;
  }
  return path;
}

/** Every item flagged `sample: true`, with its dot path in `site`. */
export function sampleEntries(site: Site): SampleEntry[] {
  const found: SampleEntry[] = [];

  function walk(value: unknown, path: string) {
    if (Array.isArray(value)) {
      value.forEach((item, i) => walk(item, `${path}[${i}]`));
      return;
    }
    if (!isNode(value)) return;
    if (value.sample === true) {
      found.push({ path, label: labelOf(value, path) });
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      walk(child, path ? `${path}.${key}` : key);
    }
  }

  walk(site, "");
  return found;
}

/**
 * Prefixes a root-relative asset path with the deploy base path (GitHub Pages
 * serves the site under /nilda-portfolio). Absolute URLs pass through.
 */
export function withBasePath(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "",
): string {
  const isRootRelative = path.startsWith("/") && !path.startsWith("//");
  if (!isRootRelative) return path;
  return basePath.replace(/\/+$/, "") + path;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2024-06" -> "Jun 2024". */
function formatMonth(date: string): string {
  const [year, month] = date.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** ("2015-03", "2022-03") -> "Mar 2015 – Mar 2022"; a null end reads "present". */
export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "present"}`;
}

/** The nav label for a section id; section headings reuse it. */
export function navLabel(site: Site, id: string): string {
  const item = site.nav.find((entry) => entry.id === id);
  if (!item) throw new Error(`No nav item for section "${id}"`);
  return item.label;
}

/**
 * "2024-06" -> "Issued Jun 2024". Certifications only ever show their issue
 * date; the site never labels one as expired.
 */
export function formatIssued(date: string): string {
  return `Issued ${formatMonth(date)}`;
}
