import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
  it("is a region named by its h2, with its manifest tag on the header rule", () => {
    render(
      <Section id="services" title="What I handle" tag="8 services">
        <p>Body</p>
      </Section>,
    );

    const region = screen.getByRole("region", { name: "What I handle" });
    expect(region).toHaveAttribute("id", "services");
    expect(
      screen.getByRole("heading", { level: 2, name: "What I handle" }),
    ).toBeInTheDocument();
    expect(region).toHaveTextContent("8 services");
  });
});
