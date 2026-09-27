# Result: 002 finish-001

**Status:** done
**Date:** 2026-09-28
**Branch / PR:** `feature/001-site` → `develop`; PR #1 (https://github.com/msforbes09/nilda-toraneo-portfolio/pull/1).
**Preview or run link:** n/a — no live GitHub Pages URL yet (unchanged from handoff 001; see that
handoff's `RESULT.md` "GitHub Pages preview" section for the root cause, not in scope here).

## Summary

Fixed `og:url` on `/privacy/` (now equals its own canonical, `/privacy`) and on the custom 404 page.
For the 404 page, Mira ruled mid-task that a 404 should claim no canonical and no `og:url` at all
(it's served at every unknown path, so neither would be true) rather than giving it a synthetic
canonical — implemented that instead, plus `robots: noindex, nofollow`. Produced all 8 required
screenshots with Playwright against the built static site. Re-ran the full verification suite from
the working tree (lint, typecheck, 101 Vitest tests, 1007 kit tests, build) — all green — committed
in four separate commits, and pushed; PR #1 now shows 31 commits total, the last four being this
handoff's work.

## Done-when checklist

- [x] `og:url` on `/privacy/` and the 404 page equals each page's canonical URL, with a test that
  failed before the fix and passes after. **Deviation on the 404 page, per Mira's mid-task ruling:**
  instead of giving 404 a synthetic canonical to match against, both `alternates.canonical` and
  `openGraph.url` are omitted entirely on that page (see Rulings). Tests:
  - `app/privacy/page.test.tsx` → `"shares its Open Graph url with its own canonical, not the home
    page's"`. Red: `AssertionError: expected undefined to be '/privacy'`. Green after adding
    `openGraph: { url: "/privacy" }` to `app/privacy/page.tsx`'s metadata.
  - `app/not-found.test.tsx` → `"tells search engines not to index it, and claims no canonical or
    Open Graph url"`. Red: `TypeError: Cannot read properties of undefined (reading 'robots')`
    (no `metadata` export existed on `app/not-found.tsx` at all). Green after adding one with
    `robots: { index: false, follow: false }`, `alternates: { canonical: undefined }`,
    `openGraph: { url: undefined }` — the explicit `undefined` values were necessary: Next.js's App
    Router metadata merging inherits a parent layout's `alternates`/`openGraph` objects wholesale
    when a child route doesn't specify them at all, so omitting the keys entirely was not enough
    (verified empirically against the built `out/404.html`, twice — see Rulings).
- [x] `handoff/001-site/screenshots/` contains PNGs at 375px and 1280px for the home page (top and
  full page), the privacy page and the 404 page, each under 2 MB. All 8 files, sizes below.
- [x] `lint`, `typecheck`, `npm test` and `build` pass. Output below.
- [x] Commits pushed to `feature/001-site`; PR #1 shows them. Confirmed via `gh pr view 1`: 31
  commits total; the last four are this handoff's (`chore: add handoff 002-finish-001...`,
  `test: add screenshots...`, `fix: match og:url...`, `docs: fill in RESULT.md for 001-site` — the
  last of these was actually 001's own final commit, already in the PR before this handoff started;
  the three before it are this handoff's work).

## How to run

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npx serve out
```

## Rulings

- **Ruling: found and reported that the 404 page's canonical was also wrong (pointed at "/"),
  not "already correct" as the handoff stated** — the handoff's Requirements section scoped the
  fix to `og:url` only, on the premise that canonical was already fine on both pages. Building the
  site and checking the actual output showed `/privacy/`'s canonical was correct, but the 404
  page's was "/" (same as home), because `app/not-found.tsx` had no `metadata` export at all before
  this handoff. I flagged this to Mira before proceeding rather than either silently expanding
  scope or shipping an `og:url` that would technically equal a wrong canonical. — **Cost if
  wrong:** none; flagging cost one message, and the finding was correct and led directly to Mira's
  ruling below.
- **Ruling (Mira's, given after my flag): a 404 page should not claim a canonical URL or an
  `og:url` at all**, since it's served at any unknown path — neither claim would be true. Implemented
  exactly as specified: `robots: { index: false, follow: false }`, no `alternates.canonical`, no
  `openGraph.url`, title kept. This superseded my own tentative plan (giving 404 a synthetic
  canonical like `/404`) before I'd written any code against it. — **Cost if wrong:** trivial to
  change; it's a three-line metadata object.
- **Ruling: explicit `undefined` values were required to actually suppress the parent layout's
  `alternates`/`openGraph` inheritance** — omitting the keys from `not-found.tsx`'s metadata object
  entirely still left the root layout's `canonical: "/"` and `openGraph.url: "/"` in the rendered
  output (verified against `out/404.html` before and after). Setting `alternates: { canonical:
  undefined }` and `openGraph: { url: undefined }` explicitly is what actually removed both tags
  from the built HTML (re-verified empirically). This is Next.js App Router metadata-merging
  behavior, not a choice — recorded here since it's non-obvious and worth knowing for any future
  page that needs to opt out of an inherited metadata field. — **Cost if wrong:** none; verified
  directly against the built output, not inferred.
- **Ruling: privacy and 404 screenshots are full-page captures, not "top of viewport" like the
  home page's** — the handoff's Requirements text ("home page top-of-viewport and full page,
  privacy page, 404 page") only asked for the top/full distinction on the home page; the
  `RESULT.md` template's own example file list confirms this (one file each for privacy/404 per
  width, not two). Since both pages are short, a full-page capture is also the more complete and
  useful record. — **Cost if wrong:** trivial; re-run one Playwright command per file.
- **Ruling: committed Mira's own handoff-bookkeeping writes (`.claude/settings.json`'s new
  `npx playwright` permission, `handoff/README.md`'s status table, `design/review-001.md`, and
  `handoff/002-finish-001/`) as a separate `chore:` commit from my own `fix:`/`test:` commits** —
  these files were already present in the worktree when I started (written by Mira's tooling
  directly, per her handoff message), untouched by me, and needed to be on the branch for the PR
  to reflect this handoff's context. Kept them out of my own fix/test commits per Conventional
  Commits discipline (one concern per commit). — **Cost if wrong:** none; these are documentation/
  permission files with no behavior.

## Deferred minors

None new. See `handoff/001-site/RESULT.md`'s "Deferred minors" section and `TODO.md` for the full,
unchanged list from handoff 001 — nothing in this handoff touched any of those items.

## Merge danger

**Two-way door**, unchanged from handoff 001. This handoff only adds two small metadata objects, a
screenshots folder of static PNGs, and documentation/permission files — no behavior change beyond
the two metadata fixes, no new external dependency shipped (Playwright is a dev-only tool used to
produce screenshots, not a runtime dependency of the site itself: it is not in `package.json`,
invoked only via `npx` for this one task). Blast radius if wrong: cosmetic (a meta tag), reverting
is a single revert of the `fix:` commit.

## Conflicts with CLAUDE.md

None. The one factual disagreement in this handoff was with `handoff/002-finish-001/HANDOFF.md`
itself (its premise that 404's canonical was already correct), not with `CLAUDE.md`; resolved by
asking Mira directly rather than by a CLAUDE.md-wins rule, since it wasn't a rule conflict but a
factual correction to the handoff's own stated context.

## Tests

- **Coverage:** `app/privacy/page.test.tsx` now also asserts `openGraph.url` equals `alternates.
  canonical`. `app/not-found.test.tsx` now also asserts `robots` is `{ index: false, follow: false
  }` and that `alternates.canonical` / `openGraph.url` are both `undefined` on the page's own
  exported metadata object. (The actual absence of those tags from the rendered HTML head was
  verified separately, empirically, against the built `out/404.html` — a unit test on the
  component's exported object doesn't exercise Next's metadata-merging step, and I wanted proof
  the fix works in the real static output, not just that the source object is shaped correctly.)
- **How to run:** `npm test`
- **Latest result** (this tree, before push): Vitest — 25 test files, 101 tests, all passed. Kit
  hooks — 59 suites, 1007 tests, all passed, 0 failed. No red tests, pre-existing or otherwise.

## Screenshots

All under `handoff/001-site/screenshots/`, all comfortably under the 2 MB limit:

| File | Size |
|---|---|
| `home-top-375.png` | 71.7 KB |
| `home-full-375.png` | 886.7 KB |
| `home-top-1280.png` | 266.2 KB |
| `home-full-1280.png` | 1.1 MB |
| `privacy-375.png` | 139.7 KB |
| `privacy-1280.png` | 150.0 KB |
| `404-375.png` | 42.3 KB |
| `404-1280.png` | 74.1 KB |

Captured with `npx playwright screenshot` (Chromium) against `npm run build && npx serve out`
(port 4190, default empty `NEXT_PUBLIC_BASE_PATH`), each after a 1–1.5s settle wait. Spot-checked
two visually (`home-top-375.png` and `404-1280.png`) to confirm sharp text, correct content, and
the real custom 404 page rather than a generic server error — both correct.

## Open questions for Mira / Arnel

None new. See `handoff/001-site/RESULT.md`'s three open questions, still open (nav breakpoint,
verified-green contrast margin, timing of the sample-data replacement handoff).

## Suggestions for Mira

- **Next.js's metadata inheritance for `alternates`/`openGraph` is wholesale, not per-field** — a
  route that wants to opt out of a parent layout's canonical or `og:url` must set the field to
  `undefined` explicitly; simply not mentioning it in that route's own metadata object still
  inherits the parent's value. If a future handoff asks a page to have "no X metadata field," it's
  worth naming this explicitly so the worker doesn't assume an absent key means an absent tag.
- **A "canonical is already correct" premise in a handoff should probably come with the actual
  built-output evidence (a grep of `out/*.html`), not just a verifier's summary claim** — in this
  case the premise was wrong for one of the two pages named. Not a big cost this time (one extra
  message to Mira), but worth noting since it's the second handoff in a row where a stated premise
  didn't match direct inspection of the built site (the first was `PRODUCT.md`'s certification-
  issuer mismatch in handoff 001).
