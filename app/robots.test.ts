import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import robots from "./robots";

describe("robots", () => {
  it("allows all user agents and points at the sitemap", () => {
    const result = robots();

    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe(`${site.meta.siteUrl}/sitemap.xml`);
  });
});
