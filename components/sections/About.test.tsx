import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { About } from "./About";

describe("About", () => {
  it.each([
    "Managing an Amazon business can be overwhelming, but you don't have to do it alone. I'm here to help you streamline operations, optimize performance, and free up your time so you can focus on growth.",
    "With over two years of experience as an Amazon Account Manager, Product Research Specialist, and Admin VA, I bring a data-driven and strategic approach to managing your business. I thrive on solving challenges, optimizing processes, and ensuring account health. Plus, I value integrity and trust in all business dealings.",
    "For Amazon FBA sellers and brand owners.",
  ])("shows her copy verbatim: %s", (text) => {
    render(<About />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("names her in the section heading, for search engines and screen readers", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { name: /Nilda Toraneo/ }),
    ).toBeInTheDocument();
  });

  it("lists each role with its employer and date range", () => {
    render(<About />);

    const rows = screen.getAllByRole("row").slice(1);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringMatching(
        /Amazon Account Manager.*Spot A Deal.*Jun 2024 – present/,
      ),
      expect.stringMatching(/Virtual Assistant.*Upwork.*Jun 2023 – Feb 2024/),
      expect.stringMatching(
        /Customer Service Representative.*iQor.*Mar 2015 – Mar 2022/,
      ),
    ]);
  });
});
