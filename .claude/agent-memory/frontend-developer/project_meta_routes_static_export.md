---
name: project-meta-routes-static-export
description: How app/sitemap.ts, app/robots.ts and app/opengraph-image.tsx must be written to survive `output: "export"`, and how basePath/siteUrl interact for OG image URLs
metadata:
  type: project
---

Next 16's file-convention metadata routes (`app/sitemap.ts`, `app/robots.ts`,
`app/opengraph-image.tsx` using `next/og`'s `ImageResponse`) all fail `next build` under
`output: "export"` with: `export const dynamic = "force-static"/export const revalidate not
configured on route "..." with "output: export"`, even though the route has no dynamic input.
Add `export const dynamic = "force-static";` to each file and the build passes; `next/og` needs no
`sharp` dependency for this (sharp is only for `next/image` optimization, which this project
disables anyway with `images.unoptimized: true`). Verified: `npm run build` produces
`out/opengraph-image` as a real PNG (magic bytes `89 50 4e 47`), `out/sitemap.xml`,
`out/robots.txt`, `out/icon.svg`, `out/privacy/index.html` and `out/404.html` +
`out/404/index.html` (both forms) all land correctly — no fallback hand-authored SVG needed for
the OG image.

`app/icon.svg` is picked up by Next's file convention automatically (renders a `<link rel="icon">`
with the right basePath prefix, e.g. `/nilda-toraneo-portfolio/icon.svg`, with no `layout.tsx`
change needed). But the `og:image`/`twitter:image` meta tag Next generates from
`metadataBase + "/opengraph-image"` does **not** get basePath prepended automatically — it only
comes out correct in production because `.env.example`'s `NEXT_PUBLIC_SITE_URL` is documented as
the *full* GitHub Pages URL already including the repo subpath (e.g.
`https://msforbes09.github.io/nilda-toraneo-portfolio`), so `metadataBase` already carries the
basePath. Setting `NEXT_PUBLIC_BASE_PATH` without also setting `NEXT_PUBLIC_SITE_URL` to the same
subpath produces a broken absolute OG image URL — this only bites local ad-hoc testing, not the
real deploy workflow, since the workflow sets both consistently.

Root `app/*.test.ts(x)` unit/component tests for these files just import the default export and
call it directly (sitemap/robots) or render it with RTL (privacy/not-found pages) — no special
Next test harness needed, same `vitest.config.ts` setup as the rest of the app.

**Why:** learned building the meta pages (T6 of handoff 001, 2026-09-27).

**How to apply:** any new file-convention metadata route (manifest.ts, another opengraph-image,
etc.) needs `export const dynamic = "force-static"` before the static build will pass. See
[[project-test-gotchas]] for the sibling layout-testing gotchas from T2.
