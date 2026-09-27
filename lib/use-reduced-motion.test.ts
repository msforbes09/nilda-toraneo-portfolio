import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { preferReducedMotion } from "@/test/support/motion";
import { useReducedMotion } from "./use-reduced-motion";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useReducedMotion", () => {
  it.each([false, true])(
    "reports whether the reduce media query matches (%s)",
    (matches) => {
      preferReducedMotion(matches);

      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(matches);
    },
  );

  it("follows the visitor switching reduced motion on", () => {
    const { change } = preferReducedMotion(false);
    const { result } = renderHook(() => useReducedMotion());

    act(() => change(true));

    expect(result.current).toBe(true);
  });
});
