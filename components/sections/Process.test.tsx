import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Process } from "./Process";

describe("Process", () => {
  it("shows the steps in order, each with its title and body", () => {
    render(<Process />);

    const steps = within(
      screen.getByRole("list", { name: "Steps" }),
    ).getAllByRole("listitem");
    expect(steps).toHaveLength(site.process.steps.length);
    steps.forEach((step, i) => {
      const { title, body } = site.process.steps[i];
      expect(within(step).getByRole("heading", { level: 3 })).toHaveTextContent(
        title,
      );
      expect(within(step).getByText(body)).toBeInTheDocument();
    });
  });

  it("reads out every tool under its group", () => {
    render(<Process />);

    for (const group of site.tools) {
      const list = screen.getByRole("list", { name: group.name });
      expect(
        within(list)
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual(group.tools);
    }
  });
});
