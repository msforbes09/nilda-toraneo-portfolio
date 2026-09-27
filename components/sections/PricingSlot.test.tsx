import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PricingTier } from "@/content/site";
import { PricingSlot } from "./PricingSlot";

const tiers: PricingTier[] = [
  { name: "Starter", price: "$400 / month", includes: ["Account health"] },
  {
    name: "Growth",
    price: "$900 / month",
    includes: ["Account health", "PPC management"],
  },
];

describe("PricingSlot", () => {
  it("renders a rate card per tier, with its price and inclusions, once tiers exist", () => {
    render(<PricingSlot tiers={tiers} />);

    const cards = within(
      screen.getByRole("list", { name: "Pricing" }),
    ).getAllByRole("listitem", { name: /Starter|Growth/ });
    expect(cards.map((card) => card.textContent)).toEqual([
      expect.stringMatching(/Starter.*\$400 \/ month.*Account health/),
      expect.stringMatching(
        /Growth.*\$900 \/ month.*Account health.*PPC management/,
      ),
    ]);
  });
});
