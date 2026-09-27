import type { ProofTile } from "@/content/site";
import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";

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

function ProofReadout({ tile }: { tile: ProofTile }) {
  return (
    <li className="relative flex flex-col bg-paper p-6 pt-7 md:p-7 md:pt-8">
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
        {tile.display}
      </p>
      {tile.context && (
        <p className="mt-auto pt-5 font-mono text-xs leading-relaxed text-text-on-paper-soft">
          {tile.context}
        </p>
      )}
    </li>
  );
}
