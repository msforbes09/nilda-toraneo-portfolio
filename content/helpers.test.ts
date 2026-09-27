import { describe, expect, it } from "vitest";
import { formatIssued, sampleEntries, withBasePath } from "./helpers";
import { site } from "./site";

describe("sampleEntries", () => {
  it("lists exactly the handoff's sample items and nothing else", () => {
    const paths = sampleEntries(site).map((entry) => entry.path);

    expect(paths.sort()).toEqual(
      [
        "pricing",
        "proof.tiles[0]",
        "resume",
        "testimonials[0]",
        "testimonials[1]",
        "work[0]",
        "work[1]",
        "work[2]",
      ].sort(),
    );
  });
});

describe("withBasePath", () => {
  it.each([
    ["/images/x.png", "/nilda-portfolio", "/nilda-portfolio/images/x.png"],
    ["/images/x.png", "/nilda-portfolio/", "/nilda-portfolio/images/x.png"],
    ["/images/x.png", "", "/images/x.png"],
    ["https://a.b/c", "/x", "https://a.b/c"],
  ])("maps %s under base %s to %s", (path, basePath, expected) => {
    expect(withBasePath(path, basePath)).toBe(expected);
  });
});

describe("formatIssued", () => {
  it.each([
    ["2024-06", "Issued Jun 2024"],
    ["2015-01", "Issued Jan 2015"],
    ["2022-12", "Issued Dec 2022"],
  ])("formats %s as %s, never as expired", (date, expected) => {
    const text = formatIssued(date);

    expect(text).toBe(expected);
    expect(text.toLowerCase()).not.toContain("expired");
  });
});
