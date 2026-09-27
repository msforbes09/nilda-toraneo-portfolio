import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("carries her tagline verbatim", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        "Empowering your business with tailored insights for smart decisions and steady growth.",
      ),
    ).toBeInTheDocument();
  });

  it.each([
    ["Email", "mailto:nildatoraneo@gmail.com"],
    ["LinkedIn", "https://www.linkedin.com/in/nilda-toraneo/"],
    ["Privacy", "/privacy"],
  ])("links %s to %s", (name, href) => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: new RegExp(name) }),
    ).toHaveAttribute("href", href);
  });

  it("opens LinkedIn in a new tab without handing it the opener", () => {
    render(<Footer />);

    const link = screen.getByRole("link", { name: /LinkedIn/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
