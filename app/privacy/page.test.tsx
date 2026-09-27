import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import PrivacyPage, { metadata } from "./page";

describe("Privacy page", () => {
  it("names Nilda Toraneo, the third-party form service and her email", () => {
    render(<PrivacyPage />);

    expect(screen.getAllByText(/Nilda Toraneo/).length).toBeGreaterThan(0);
    expect(screen.getByText(/third-party form service/i)).toBeInTheDocument();
    expect(screen.getAllByText(site.person.email).length).toBeGreaterThan(0);
  });

  it("links back to the home page", () => {
    render(<PrivacyPage />);

    const home = screen.getByRole("link", { name: /back to home/i });
    expect(home).toHaveAttribute("href", "/");
  });

  it("declares its own canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe("/privacy");
  });
});
