import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Services } from "./Services";

describe("Services", () => {
  it("lists every service as its question heading over its description, verbatim", () => {
    render(<Services />);

    const items = within(
      screen.getByRole("list", { name: "Services" }),
    ).getAllByRole("listitem");
    expect(items).toHaveLength(site.services.length);
    items.forEach((item, i) => {
      const service = site.services[i];
      expect(within(item).getByRole("heading", { level: 3 })).toHaveTextContent(
        service.question,
      );
      expect(within(item).getByText(service.description)).toBeInTheDocument();
    });
  });
});
