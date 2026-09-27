import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Testimonials } from "./Testimonials";

describe("Testimonials", () => {
  it("shows each quote with its attribution, tagged as a sample", () => {
    render(<Testimonials />);

    const quotes = within(
      screen.getByRole("list", { name: "Testimonials" }),
    ).getAllByRole("listitem");
    expect(quotes).toHaveLength(site.testimonials.length);
    quotes.forEach((quote, i) => {
      const { quote: text, attribution } = site.testimonials[i];
      expect(within(quote).getByText(text)).toBeInTheDocument();
      expect(within(quote).getByText(attribution)).toBeInTheDocument();
      expect(
        within(quote).getByText("Sample", { exact: true }),
      ).toBeInTheDocument();
    });
  });
});
