# Result: 002 finish-001

**Status:** <!-- done | partial | blocked -->
**Date:** <!-- YYYY-MM-DD -->
**Branch / PR:** `feature/001-site` → `develop`; PR #1 (link).
**Preview or run link:** <!-- n/a if none -->

## Summary

<!-- What was fixed, in a few sentences: the og:url fix, the screenshots produced, and the
re-verification. -->

## Done-when checklist

- [ ] `og:url` on `/privacy/` and the 404 page equals each page's canonical URL, with a test that
  failed before the fix and passes after. <!-- name the test, show the red line then the green
  result -->
- [ ] `handoff/001-site/screenshots/` contains PNGs at 375px and 1280px for the home page (top and
  full page), the privacy page and the 404 page, each under 2 MB. <!-- list every file with its
  path and size -->
- [ ] `lint`, `typecheck`, `npm test` and `build` pass. <!-- paste the output -->
- [ ] Commits pushed to `feature/001-site`; PR #1 shows them. <!-- confirm with `gh pr view` output
  or link -->

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

<!-- Every decision made that wasn't fully settled in the handoff, in order:
Ruling: <decision> — <why> — <cost if wrong>. Write "none" if there were none. -->

## Deferred minors

<!-- Anything noticed but not fixed, with a reason. Write "none" if there were none. -->

## Merge danger

<!-- One-way or two-way door, blast radius, how to revert. -->

## Conflicts with CLAUDE.md

<!-- Any conflict between this handoff and CLAUDE.md, and which won. Write "none" if there were
none. -->

## Tests

- **Coverage:** <!-- what the new/changed test(s) cover -->
- **How to run:** `npm test`
- **Latest result:** <!-- paste the final test run output -->

## Screenshots

<!-- List each file with its path, relative to the project root, e.g.:
- handoff/001-site/screenshots/home-top-375.png
- handoff/001-site/screenshots/home-full-375.png
- handoff/001-site/screenshots/home-top-1280.png
- handoff/001-site/screenshots/home-full-1280.png
- handoff/001-site/screenshots/privacy-375.png
- handoff/001-site/screenshots/privacy-1280.png
- handoff/001-site/screenshots/404-375.png
- handoff/001-site/screenshots/404-1280.png
Confirm each is under 2 MB. -->

## Open questions for Mira / Arnel

<!-- Write "none" if there were none. -->

## Suggestions for Mira

<!-- One line each with evidence. Write "none" if there were none. -->
