import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SampleTag } from "./SampleTag";

describe("SampleTag", () => {
  it("reads as Sample", () => {
    render(<SampleTag />);

    expect(screen.getByText("Sample", { exact: true })).toBeVisible();
  });
});
