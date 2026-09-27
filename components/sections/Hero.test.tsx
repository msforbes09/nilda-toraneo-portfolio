import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("leads with the headline as the page's only h1", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /^Keep your Amazon account healthy, your listings ranking, and your ad spend earning\.$/,
    );
  });

  it.each([
    ["Book a discovery call", "#contact"],
    ["See the work", "#work"],
  ])("links %s to %s", (name, href) => {
    render(<Hero />);

    expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
  });

  it("shows the headshot with the content's alt text", () => {
    render(<Hero />);

    expect(
      screen.getByRole("img", { name: "Portrait of Nilda Toraneo" }),
    ).toHaveAttribute("src", "/images/nilda-headshot.webp");
  });
});
