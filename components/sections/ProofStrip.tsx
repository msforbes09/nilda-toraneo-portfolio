"use client";

import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { ProofTile } from "@/content/site";
import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { easeOutExpo } from "@/lib/motion";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

const { tiles } = site.proof;
const sampleCount = tiles.filter((tile) => tile.sample).length;
const tag = [
  `${tiles.length} readouts`,
  sampleCount > 0 ? `${sampleCount} sample` : null,
]
  .filter(Boolean)
  .join(" · ");

/** The readout strip directly under the hero. */
export function ProofStrip() {
  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="bg-paper px-5 pt-20 pb-16 text-text-on-paper sm:px-8 md:pt-24 md:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-5 flex items-baseline gap-4 font-mono text-xs tracking-[0.14em] uppercase">
          <h2 id="results-heading" className="font-medium text-text-on-paper">
            {navLabel(site, "results")}
          </h2>
          <span
            aria-hidden="true"
            className="h-px flex-1 self-center bg-paper-line"
          />
          <span className="text-text-on-paper-soft">{tag}</span>
        </header>

        <ul className="grid gap-px border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <ProofReadout key={tile.label} tile={tile} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A tile waiting below the fold: still legible, just dimmed and lowered. */
const waiting = { opacity: 0.2, y: 14 };
const settled = { opacity: 1, y: 0 };

/** Seconds between neighbouring tiles in a row; a phone column has none. */
const rowStagger = 0.4;

/**
 * Where the tile sits across its row, as a delay: tiles side by side sweep
 * in left to right, while stacked tiles each reveal as they arrive.
 */
function rowDelay(tile: Element): number {
  const row = tile.parentElement?.getBoundingClientRect();
  if (!row || row.width <= 0) return 0;
  return (
    ((tile.getBoundingClientRect().left - row.left) / row.width) * rowStagger
  );
}

/** Splits the display text around its final number, which counts up. */
function splitReadout({ display, value, suffix = "" }: ProofTile) {
  const at = display.lastIndexOf(`${value}${suffix}`);
  return {
    before: display.slice(0, at),
    after: display.slice(at + String(value).length),
  };
}

/**
 * The signature moment. A tile below the fold waits dimmed, lowered and at
 * its starting number; on scroll-in it rises into place and its number counts
 * to the final value. Tiles that are already visible never move.
 */
function useReadoutReveal(tile: ProofTile) {
  const [scope, animate] = useAnimate<HTMLLIElement>();
  const phase = useScrollReveal(scope);
  const count = useMotionValue(tile.value);
  const rounded = useTransform(count, Math.round);
  const moved = useRef(false);

  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    if (phase === "armed") {
      moved.current = true;
      animate(element, waiting, { duration: 0 });
      count.jump(tile.from ?? 0);
    } else if (phase === "shown") {
      const delay = rowDelay(element);
      animate(element, settled, { duration: 0.8, delay, ease: easeOutExpo });
      animate(count, tile.value, {
        duration: 1.4,
        delay: delay + 0.1,
        ease: easeOutExpo,
      });
    } else if (moved.current) {
      // Reduced motion switched on mid-way: straight to the end state.
      animate(element, settled, { duration: 0 });
      count.jump(tile.value);
    }
  }, [phase, animate, scope, count, tile]);

  return { scope, rounded };
}

function ProofReadout({ tile }: { tile: ProofTile }) {
  const { scope, rounded } = useReadoutReveal(tile);
  const { before, after } = splitReadout(tile);

  return (
    <li
      ref={scope}
      className="relative flex flex-col bg-paper p-6 pt-7 md:p-7 md:pt-8"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 h-0.5 w-8 bg-signal md:left-7"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[0.6875rem] leading-snug tracking-[0.12em] text-text-on-paper-soft uppercase">
          {tile.label}
        </p>
        {tile.sample && (
          <span className="shrink-0 bg-signal px-1.5 py-0.5 font-mono text-[0.625rem] font-medium tracking-[0.14em] text-ink uppercase">
            Sample
          </span>
        )}
      </div>
      <p className="mt-5 font-display text-[1.625rem] leading-[1.1] font-bold tracking-[-0.02em] text-balance text-ink md:text-[1.75rem]">
        {before}
        <motion.span className="tabular-nums">{rounded}</motion.span>
        {after}
      </p>
      {tile.context && (
        <p className="mt-auto pt-5 font-mono text-xs leading-relaxed text-text-on-paper-soft">
          {tile.context}
        </p>
      )}
    </li>
  );
}
