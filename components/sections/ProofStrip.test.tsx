import { act, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  placeBelowFold,
  preferReducedMotion,
  stubIntersection,
} from "@/test/support/motion";
import { ProofStrip } from "./ProofStrip";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ProofStrip", () => {
  it("reads out the four proof tiles by their display text", () => {
    render(<ProofStrip />);

    const tiles = screen.getAllByRole("listitem");
    expect(tiles).toHaveLength(4);
    expect(tiles[0]).toHaveTextContent("ACoS 38% → 24%");
    expect(tiles[1]).toHaveTextContent("2+ years as Amazon Account Manager");
    expect(tiles[2]).toHaveTextContent("4 Amazon certifications");
    expect(tiles[3]).toHaveTextContent("7 years customer service");
  });

  it("tags only the sample tile as SAMPLE", () => {
    render(<ProofStrip />);

    const tagged = screen
      .getAllByRole("listitem")
      .filter((tile) => within(tile).queryByText("Sample", { exact: true }));
    expect(tagged).toHaveLength(1);
    expect(tagged[0]).toHaveTextContent("ACoS 38% → 24%");
  });

  it("holds below-the-fold tiles dimmed at their starting numbers, then reveals and counts them up on scroll-in", async () => {
    preferReducedMotion(false);
    const { enterView } = stubIntersection();
    placeBelowFold();
    render(<ProofStrip />);

    const [result, years] = screen.getAllByRole("listitem");
    await waitFor(() => {
      expect(result).toHaveTextContent("ACoS 38% → 38%");
      expect(years).toHaveTextContent("0+ years as Amazon Account Manager");
      const opacity = Number(result.style.opacity || "1");
      expect(opacity).toBeLessThan(1);
      // A contrast floor: dimming the whole tile blends text into its ground.
      expect(opacity).toBeGreaterThanOrEqual(0.9);
    });

    act(() => enterView());

    await waitFor(() => {
      expect(result).toHaveTextContent("ACoS 38% → 24%");
      expect(years).toHaveTextContent("2+ years as Amazon Account Manager");
      expect(result.style.opacity).toBe("1");
    });
  });

  it("shows every readout at its final value, undimmed, when the visitor prefers reduced motion", async () => {
    preferReducedMotion(true);
    stubIntersection();
    placeBelowFold();
    render(<ProofStrip />);

    await new Promise((resolve) => requestAnimationFrame(resolve));
    const tiles = screen.getAllByRole("listitem");
    [
      "ACoS 38% → 24%",
      "2+ years as Amazon Account Manager",
      "4 Amazon certifications",
      "7 years customer service",
    ].forEach((display, i) => {
      expect(tiles[i]).toHaveTextContent(display);
      expect(tiles[i].style.opacity).toBe("");
    });
    expect(within(tiles[0]).getByText("Sample", { exact: true })).toBeVisible();
  });

  it("puts a waiting tile back at rest when the visitor switches reduced motion on", async () => {
    const { change } = preferReducedMotion(false);
    stubIntersection();
    placeBelowFold();
    render(<ProofStrip />);
    const [result] = screen.getAllByRole("listitem");
    await waitFor(() => expect(result).toHaveTextContent("ACoS 38% → 38%"));

    act(() => change(true));

    await waitFor(() => {
      expect(result).toHaveTextContent("ACoS 38% → 24%");
      expect(result.style.opacity).toBe("1");
    });
  });
});
