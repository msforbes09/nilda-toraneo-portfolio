import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists / and /privacy under the site's base url, respecting trailingSlash", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(2);
    expect(entries.map((entry) => entry.url)).toEqual([
      `${site.meta.siteUrl}/`,
      `${site.meta.siteUrl}/privacy/`,
    ]);
    entries.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});
