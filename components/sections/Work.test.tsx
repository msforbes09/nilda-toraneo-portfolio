import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Work } from "./Work";

describe("Work", () => {
  it("shows each sample with its image, title and caption", () => {
    render(<Work />);

    const tiles = within(
      screen.getByRole("list", { name: "Sample work" }),
    ).getAllByRole("listitem");
    expect(tiles).toHaveLength(site.work.length);
    tiles.forEach((tile, i) => {
      const item = site.work[i];
      expect(within(tile).getByRole("img", { name: item.alt })).toHaveAttribute(
        "src",
        item.image,
      );
      expect(within(tile).getByRole("heading", { level: 3 })).toHaveTextContent(
        item.title,
      );
      expect(within(tile).getByText(item.caption)).toBeInTheDocument();
    });
  });
});
