"use client";

import { useInView } from "motion/react";
import { type RefObject, useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * - `rest`: as server-rendered, fully visible. Where everything starts, and
 *   where it stays with reduced motion, or when it was already on screen.
 * - `armed`: below the fold at mount, so it may wait in its start state.
 * - `shown`: scrolled into view; play the reveal.
 */
export type RevealPhase = "rest" | "armed" | "shown";

/**
 * Progressive enhancement: the page renders at rest, and only an element
 * the visitor cannot see yet is armed, so no JavaScript failure can leave
 * visible content hidden and nothing on screen jumps backwards.
 */
export function useScrollReveal(ref: RefObject<Element | null>): RevealPhase {
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (element.getBoundingClientRect().top > window.innerHeight) {
      setArmed(true);
    }
  }, [ref]);

  if (!armed || reduced) return "rest";
  return inView ? "shown" : "armed";
}
