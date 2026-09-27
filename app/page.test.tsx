import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("stacks the sections in the brief's order inside main", () => {
    const { container } = render(<Home />);

    const ids = Array.from(
      container.querySelectorAll("main#main > section[id]"),
    ).map((section) => section.id);
    expect(ids).toEqual([
      "top",
      "results",
      "about",
      "services",
      "process",
      "certifications",
      "work",
      "testimonials",
      "contact",
    ]);
  });

  it("renders no pricing section while there are no tiers", () => {
    const { container } = render(<Home />);

    expect(container.querySelector("#pricing")).toBeNull();
  });
});
