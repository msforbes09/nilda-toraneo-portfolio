import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  placeBelowFold,
  preferReducedMotion,
  stubIntersection,
} from "@/test/support/motion";
import { Section } from "./Section";

afterEach(() => {
  vi.restoreAllMocks();
});

function renderServices() {
  render(
    <Section id="services" title="What I handle" tag="8 services">
      <p>Body</p>
    </Section>,
  );
  const region = screen.getByRole("region", { name: "What I handle" });
  return { region, body: region.firstElementChild as HTMLElement };
}

describe("Section", () => {
  it("is a region named by its h2, with its manifest tag on the header rule", () => {
    const { region } = renderServices();

    expect(region).toHaveAttribute("id", "services");
    expect(
      screen.getByRole("heading", { level: 2, name: "What I handle" }),
    ).toBeInTheDocument();
    expect(region).toHaveTextContent("8 services");
  });

  it("holds a below-the-fold section faded until it scrolls into view, keeping it readable", async () => {
    preferReducedMotion(false);
    const { enterView } = stubIntersection();
    placeBelowFold();
    const { region, body } = renderServices();

    await waitFor(() => {
      const opacity = Number(body.style.opacity || "1");
      expect(opacity).toBeLessThan(1);
      // A contrast floor: dimming blends text into its ground, and verified green
      // on paper (4.71:1 at rest) drops under 4.5:1 below 0.975.
      expect(opacity).toBeGreaterThanOrEqual(0.98);
    });
    expect(region).toHaveTextContent("Body");
    expect(body).not.toHaveAttribute("aria-hidden");

    act(() => enterView());

    await waitFor(() => expect(body.style.opacity).toBe("1"));
  });

  it("keeps a below-the-fold section at rest when the visitor prefers reduced motion", async () => {
    preferReducedMotion(true);
    stubIntersection();
    placeBelowFold();
    const { body } = renderServices();

    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(Number(body.style.opacity || "1")).toBe(1);
  });
});
