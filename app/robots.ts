import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const baseUrl = site.meta.siteUrl.replace(/\/+$/, "");

// Required for `output: "export"`: the route has no request-time input.
export const dynamic = "force-static";

/** Static export robots.txt: allow everything, point at the generated sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
