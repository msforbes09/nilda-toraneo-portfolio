const variants = {
  /** The signal chip on sample tiles, notes and files. */
  solid: "bg-signal",
  /** Outlined, for a tag sitting inside a link's underlined text. */
  outline: "border border-ink leading-none",
};

/** Marks placeholder content Nilda must replace; see content/site.ts. */
export function SampleTag({
  variant = "solid",
}: {
  variant?: keyof typeof variants;
}) {
  return (
    <span
      className={`shrink-0 px-1.5 py-0.5 font-mono text-[0.625rem] font-medium tracking-[0.14em] text-ink uppercase ${variants[variant]}`}
    >
      Sample
    </span>
  );
}
