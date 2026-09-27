import Link from "next/link";
import { site } from "@/content/site";

const { person, footer } = site;
const linkedinPath = new URL(person.linkedin).pathname.replace(/\/$/, "");

const linkClass =
  "group flex min-h-11 flex-col justify-center gap-0.5 py-1 transition-colors duration-150";
const labelClass =
  "font-mono text-[0.6875rem] tracking-[0.14em] text-text-on-ink-soft uppercase";
const valueClass =
  "text-text-on-ink underline decoration-ink-line underline-offset-4 group-hover:decoration-signal";

export function Footer() {
  return (
    <footer className="tone-ink border-t border-ink-line bg-ink px-5 pt-16 pb-10 text-text-on-ink sm:px-8 md:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div>
          <p className="font-display text-xl font-bold tracking-tight">
            {person.name}
          </p>
          <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-text-on-ink-soft">
            {footer.tagline}
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          <li>
            <a href={`mailto:${person.email}`} className={linkClass}>
              <span className={labelClass}>Email</span>
              <span className={`${valueClass} break-all`}>{person.email}</span>
            </a>
          </li>
          <li>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span className={labelClass}>LinkedIn</span>
              <span className={valueClass}>
                {linkedinPath}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-ink-line pt-6 font-mono text-xs text-text-on-ink-soft">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <Link
          href="/privacy"
          className="inline-flex min-h-11 items-center underline decoration-ink-line underline-offset-4 hover:text-text-on-ink hover:decoration-signal"
        >
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
