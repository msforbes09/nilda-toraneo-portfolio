import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Certifications } from "./Certifications";

describe("Certifications", () => {
  it("lists each certification with its issuer and issue month", () => {
    render(<Certifications />);

    const rows = within(
      screen.getByRole("list", { name: "Certifications" }),
    ).getAllByRole("listitem");
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringMatching(
        /Amazon Seller VA Masterclass.*AmazeNation.*Issued Jun 2024/,
      ),
      expect.stringMatching(/Freedom Ticket 3\.0.*Helium 10.*Issued Apr 2024/),
      expect.stringMatching(
        /Sponsored Ads Certification.*Amazon Ads.*Issued May 2024/,
      ),
      expect.stringMatching(/SEO Course.*My Amazon Guy.*Issued Jun 2024/),
    ]);
  });

  it("lists the training apart from the certifications", () => {
    render(<Certifications />);

    const trainings = screen.getByRole("list", { name: "Training" });
    expect(within(trainings).getByRole("listitem")).toHaveTextContent(
      site.trainings[0].name,
    );
  });

  it("never labels anything expired", () => {
    const { container } = render(<Certifications />);

    expect(container.textContent).not.toMatch(/expired/i);
  });
});
