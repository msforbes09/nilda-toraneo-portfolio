"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const MENU_ID = "site-menu";

export function Nav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="tone-ink sticky top-0 z-40 border-b border-ink-line bg-ink text-text-on-ink">
      <nav
        aria-label="Primary"
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="flex min-h-11 shrink-0 items-center gap-3 rounded-sm"
        >
          <span className="font-display text-lg font-bold tracking-tight">
            {site.person.name}
          </span>
          {/* Shown only while the links are collapsed; at lg the eight links need the room. */}
          <span className="hidden border border-ink-line px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.08em] text-text-on-ink-soft uppercase sm:inline lg:hidden">
            {site.hero.credentialTag}
          </span>
        </a>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-text-on-ink hover:text-signal lg:hidden"
        >
          <MenuIcon open={open} />
        </button>

        <ul
          id={MENU_ID}
          aria-label="Sections"
          data-open={open}
          className="absolute inset-x-0 top-full hidden border-b border-ink-line bg-ink px-5 pt-2 pb-4 data-[open=true]:block sm:px-8 lg:static lg:flex lg:items-center lg:border-0 lg:p-0"
        >
          {site.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="group flex min-h-11 items-center border-b border-ink-line/60 text-[0.9375rem] font-medium text-text-on-ink-soft transition-colors duration-150 hover:text-text-on-ink lg:border-0 lg:px-1.5 lg:text-[0.8125rem] xl:px-2.5 xl:text-sm"
              >
                <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-200 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h10" />
      )}
    </svg>
  );
}
