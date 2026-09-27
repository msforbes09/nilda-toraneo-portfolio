import Image from "next/image";
import { withBasePath } from "@/content/helpers";
import { site } from "@/content/site";

const { hero, person } = site;

/** Headline clauses, one per line; the text keeps its ", " so it reads unchanged. */
const headlineLines = hero.headline
  .split(", ")
  .map((line, i, all) => (i < all.length - 1 ? `${line}, ` : line));

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="tone-ink relative isolate overflow-hidden bg-ink text-text-on-ink"
    >
      <ConsoleGrid />
      <div className="mx-auto grid max-w-6xl items-center gap-x-16 gap-y-14 px-5 pt-12 pb-24 sm:px-8 md:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pt-24 lg:pb-32">
        <div>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.375rem,1.5rem+3.6vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.035em]"
          >
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-text-on-ink-soft md:text-xl md:leading-relaxed">
            {hero.subline}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={hero.primaryCta.href}
              className="group inline-flex min-h-14 items-center gap-3 bg-signal px-7 font-display text-base font-bold text-ink transition-colors duration-150 hover:bg-[#f2a54a]"
            >
              {hero.primaryCta.label}
              <ArrowIcon />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex min-h-11 items-center font-medium text-text-on-ink underline decoration-ink-line decoration-1 underline-offset-[6px] transition-colors duration-150 hover:decoration-signal"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <ManifestCard />
      </div>
    </section>
  );
}

function ManifestCard() {
  return (
    <figure className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-none lg:justify-self-end">
      <div className="relative border border-text-on-ink/25 p-2.5">
        <CornerTicks />
        <p className="border-b border-text-on-ink/15 px-1 pt-0.5 pb-2.5 font-mono text-[0.6875rem] tracking-[0.12em] text-text-on-ink-soft uppercase">
          {person.name}
        </p>
        <Image
          src={withBasePath(hero.headshot.src)}
          alt={hero.headshot.alt}
          width={720}
          height={720}
          unoptimized
          preload
          className="mt-2.5 aspect-square w-full bg-ink-soft object-cover"
        />
        <figcaption className="mt-2.5 flex items-end justify-between gap-4 px-1 pb-0.5">
          <span className="font-mono text-[0.6875rem] leading-snug tracking-[0.12em] text-text-on-ink-soft uppercase">
            {person.location}
          </span>
          <Barcode seed={person.name} />
        </figcaption>
      </div>

      <p className="absolute -bottom-6 left-4 flex -rotate-2 items-center gap-2.5 border border-ink bg-paper px-3.5 py-2.5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-ink uppercase shadow-[0_10px_24px_-8px_rgb(0_0_0/0.55)] sm:-left-6">
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-verified ring-2 ring-verified/25"
        />
        {hero.credentialTag}
      </p>
    </figure>
  );
}

function CornerTicks() {
  const tick = "pointer-events-none absolute size-3.5 border-text-on-ink";
  return (
    <>
      <span
        aria-hidden="true"
        className={`${tick} -top-1 -left-1 border-t border-l`}
      />
      <span
        aria-hidden="true"
        className={`${tick} -top-1 -right-1 border-t border-r`}
      />
      <span
        aria-hidden="true"
        className={`${tick} -bottom-1 -left-1 border-b border-l`}
      />
      <span
        aria-hidden="true"
        className={`${tick} -right-1 -bottom-1 border-r border-b`}
      />
    </>
  );
}

/** A label barcode drawn from a string, so it is stable between builds. */
function Barcode({ seed }: { seed: string }) {
  let x = 0;
  const bars = Array.from(seed.replace(/\s/g, "")).flatMap((char) => {
    const code = char.charCodeAt(0);
    const widths = [1 + (code % 3), 1 + ((code >> 2) % 2)];
    return widths.map((width) => {
      const bar = { x, width };
      x += width + 1 + ((code >> 3) % 2);
      return bar;
    });
  });

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${x} 24`}
      className="h-6 w-auto shrink-0 text-text-on-ink/70"
      preserveAspectRatio="none"
    >
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          width={bar.width}
          height="24"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
    >
      <path d="M3 9h11M10 4.5L14.5 9 10 13.5" />
    </svg>
  );
}

/** Faint dashboard grid behind the hero, fading out toward the copy. */
function ConsoleGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_85%_40%,black,transparent)] bg-[linear-gradient(var(--ink-line)_1px,transparent_1px),linear-gradient(90deg,var(--ink-line)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60"
    />
  );
}
