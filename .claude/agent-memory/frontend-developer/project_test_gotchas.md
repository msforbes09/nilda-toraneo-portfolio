---
name: project-test-gotchas
description: Vitest gotchas for this Next 16 static site: next/font mock, next/image src, SSR-rendering the root layout, focus-ring tokens
metadata:
  type: project
---

- Importing `app/layout.tsx` in Vitest needs `vi.mock("next/font/google", ...)` returning
  `() => ({ variable, className })` per font, then `await import("./layout")`.
- To test the layout's body structure, `renderToStaticMarkup` it and parse with `DOMParser`; that
  document is another realm, so jest-dom matchers (`toHaveTextContent`) throw "must be a Node":
  use plain `.textContent` / `.getAttribute` reads.
- `next/image` needs the `unoptimized` prop on the element (vitest doesn't load next.config), and
  never adds basePath: wrap `src` with `withBasePath()`. Next 16 deprecates `priority`; use `preload`.
- Focus rings come from globals.css: `--focus-ring` is ink on paper, signal inside any `.tone-ink`
  container (signal on paper misses 3:1). Put `tone-ink` on every ink-navy surface.
- Section headings reuse nav labels via `navLabel(site, id)`; the manifest tag sits at the end of
  the header rule (beside the h2, never above it: the craft floor bans eyebrows).

**Why:** learned building the page shell (T2 of handoff 001, 2026-09-27).

**How to apply:** follow these when adding sections or layout tests; see [[project-content-model]].
