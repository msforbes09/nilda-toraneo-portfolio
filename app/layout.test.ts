import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => {
  const font = () => ({ variable: "font-var", className: "font-class" });
  return { IBM_Plex_Mono: font, Plus_Jakarta_Sans: font, Space_Grotesk: font };
});

const { default: RootLayout, metadata } = await import("./layout");

describe("RootLayout", () => {
  it("opens with a skip link to main, then the nav, the page and the footer", () => {
    const html = renderToStaticMarkup(
      createElement(RootLayout, null, createElement("main", { id: "main" })),
    );
    const body = new DOMParser().parseFromString(html, "text/html").body;

    const skip = body.querySelector("a");
    // DOMParser's document is another realm, so plain reads, not jest-dom.
    expect(skip?.textContent).toBe("Skip to content");
    expect(skip?.getAttribute("href")).toBe("#main");
    expect(
      Array.from(body.children)
        .slice(1)
        .map((el) => el.tagName.toLowerCase()),
    ).toEqual(["header", "main", "footer"]);
  });
});

describe("layout metadata", () => {
  it.each([["title"], ["description"]] as const)(
    "%s names Nilda Toraneo and Amazon Account Manager",
    (key) => {
      const text = String(metadata[key]);

      expect(text).toContain("Nilda Toraneo");
      expect(text).toContain("Amazon Account Manager");
    },
  );

  it("shares the page title through Open Graph and Twitter cards", () => {
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      title: metadata.title,
      url: "/",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: metadata.title,
    });
  });
});
