import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProofStrip } from "./ProofStrip";

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
});
