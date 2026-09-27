import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { preferReducedMotion } from "@/test/support/motion";
import { Hero } from "./Hero";

afterEach(() => {
  vi.restoreAllMocks();
});

/** The pieces the entrance moves: each headline line and the credential tag. */
function entrancePieces() {
  const heading = screen.getByRole("heading", { level: 1 });
  return [
    ...Array.from(heading.children),
    screen.getByText("Amazon Account Manager · Admin VA"),
  ] as HTMLElement[];
}

describe("Hero", () => {
  it("plays the entrance on the headline lines and credential tag, never hiding them", async () => {
    preferReducedMotion(false);
    render(<Hero />);

    const pieces = entrancePieces();
    expect(pieces).toHaveLength(4);
    await waitFor(() => {
      for (const piece of pieces) expect(piece.style.opacity).not.toBe("");
    });
    for (const piece of pieces) {
      expect(piece).not.toHaveAttribute("aria-hidden");
      expect(piece.style.display).not.toBe("none");
    }
    expect(
      screen.getByRole("link", { name: "Book a discovery call" }),
    ).toBeVisible();
  });

  it("renders the headline and credential tag at rest when the visitor prefers reduced motion", async () => {
    preferReducedMotion(true);
    render(<Hero />);

    // Give a would-be entrance a frame to start before checking it never did.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    for (const piece of entrancePieces()) {
      expect(piece.style.opacity).toBe("");
      expect(piece.style.transform).toBe("");
    }
  });

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
