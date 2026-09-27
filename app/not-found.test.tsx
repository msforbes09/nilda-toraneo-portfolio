import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";

describe("Not found page", () => {
  it("renders a 404 heading and a link back home", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("tells search engines not to index it, and claims no canonical or Open Graph url", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBeUndefined();
    expect(metadata.openGraph?.url).toBeUndefined();
  });
});
