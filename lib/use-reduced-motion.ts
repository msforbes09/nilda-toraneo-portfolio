"use client";

import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor asked for reduced motion; follows the setting live.
 * `false` on the server: nothing rendered depends on it before mount, only
 * the effects that start motion.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: { matches: boolean }) => setReduced(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
