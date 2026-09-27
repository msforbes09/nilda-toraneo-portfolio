import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const baseUrl = site.meta.siteUrl.replace(/\/+$/, "");

// Required for `output: "export"`: the route has no request-time input.
export const dynamic = "force-static";

/** Static export sitemap: the one page and its meta pages, trailingSlash-aware. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ["/", "/privacy/"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
