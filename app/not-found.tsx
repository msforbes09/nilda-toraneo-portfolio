import type { Metadata } from "next";
import Link from "next/link";

/**
 * A 404 is served at every unknown path, so it claims no single canonical
 * URL and no Open Graph url: neither would be true, and search engines
 * should not index this page at all.
 */
export const metadata: Metadata = {
  title: "Page not found — Nilda Toraneo",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
  openGraph: { url: undefined },
};

/**
 * Next's special 404 file: same ink/paper manifest language as the rest of
 * the site, with a stamp reading the real status and a way back to `/`.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="tone-ink flex flex-1 flex-col justify-center bg-ink px-5 py-24 text-text-on-ink focus:outline-none sm:px-8"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="inline-flex items-center gap-2.5 border border-text-on-ink/25 px-3.5 py-2.5 font-mono text-xs font-medium tracking-[0.14em] text-text-on-ink-soft uppercase">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-signal"
          />
          404 · Page not found
        </p>

        <h1 className="mt-8 font-display text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          404: this manifest has no record of that page.
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-text-on-ink-soft">
          The page you were looking for has moved or never existed. Head back to
          the main page to find your way from there.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex min-h-14 items-center gap-3 bg-signal px-7 font-display text-base font-bold text-ink transition-colors duration-150 hover:bg-[#f2a54a]"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
