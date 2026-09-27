import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Nav } from "./Nav";

const sections = [
  ["Results", "#results"],
  ["About", "#about"],
  ["Services", "#services"],
  ["How I work", "#process"],
  ["Certifications", "#certifications"],
  ["Sample work", "#work"],
  ["Testimonials", "#testimonials"],
  ["Contact", "#contact"],
] as const;

function sectionLinks() {
  const list = screen.getByRole("list", { name: "Sections" });
  return within(list).getAllByRole("link");
}

describe("Nav", () => {
  it("links every section by its anchor, in page order", () => {
    render(<Nav />);

    expect(
      sectionLinks().map((link) => [
        link.textContent,
        link.getAttribute("href"),
      ]),
    ).toEqual(sections);
  });

  it("toggles the menu with the button and closes it on Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const button = screen.getByRole("button", { name: "Open menu" });
    const menu = document.getElementById(
      button.getAttribute("aria-controls") ?? "",
    );

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveAttribute("data-open", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Close menu");
    expect(menu).toHaveAttribute("data-open", "true");

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the open menu when a section link is followed", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const button = screen.getByRole("button", { name: "Open menu" });

    await user.click(button);
    await user.click(sectionLinks()[2]);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
