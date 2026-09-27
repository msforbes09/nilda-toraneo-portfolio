"use client";

import { motion } from "motion/react";
import { type ReactNode, useRef } from "react";
import { easeOutExpo } from "@/lib/motion";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export type Tone = "paper" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-text-on-paper",
  ink: "tone-ink bg-ink text-text-on-ink",
};

const ruleTones: Record<Tone, string> = {
  paper: "bg-paper-line",
  ink: "bg-ink-line",
};

const tagTones: Record<Tone, string> = {
  paper: "text-text-on-paper-soft",
  ink: "text-text-on-ink-soft",
};

/**
 * Every section's one quiet reveal: a short fade and rise, deliberately
 * plainer than the proof strip's staggered count-up.
 */
const reveal = {
  rest: { opacity: 1, y: 0, transition: { duration: 0 } },
  armed: { opacity: 0.2, y: 24, transition: { duration: 0 } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

type SectionProps = {
  id: string;
  title: string;
  /** Manifest tag on the header rule; it must say something (a count, a status). */
  tag: string;
  tone?: Tone;
  children: ReactNode;
};

/**
 * A page section with a manifest-row header: the h2, a thin rule, and a mono
 * tag at the rule's end, like a line on a shipping manifest.
 */
export function Section({
  id,
  title,
  tag,
  tone = "paper",
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const body = useRef<HTMLDivElement>(null);
  const phase = useScrollReveal(body);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`${tones[tone]} px-5 pt-24 pb-20 sm:px-8 md:pt-32 md:pb-28`}
    >
      <motion.div
        ref={body}
        initial={false}
        animate={phase}
        variants={reveal}
        className="mx-auto max-w-6xl"
      >
        <header className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-3 md:mb-14">
          <h2
            id={headingId}
            className="font-display text-[clamp(1.875rem,1.4rem+2vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance"
          >
            {title}
          </h2>
          <span
            aria-hidden="true"
            className={`${ruleTones[tone]} hidden h-px min-w-12 flex-1 self-center sm:block`}
          />
          <span
            className={`${tagTones[tone]} font-mono text-xs tracking-[0.14em] uppercase`}
          >
            {tag}
          </span>
        </header>
        {children}
      </motion.div>
    </section>
  );
}
