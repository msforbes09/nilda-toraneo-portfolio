---
name: project-recurring-findings
description: Recurring patterns to re-check on every nilda-portfolio UI review round
metadata:
  type: project
---

- Check every responsive breakpoint in nav/section components against the literal px value quoted
  in HANDOFF.md (which sometimes drops the brief's "~" tolerance, e.g. "hamburger under 768px"
  with no tilde) — components have shipped with a wider `lg:` (1024px) breakpoint instead, which
  is a real functional gap on tablet widths (768–1023px get the mobile hamburger instead of the
  spec's full nav), not just a rounding difference. Minor severity here (trusted path, no data
  loss) but flag it every time it recurs.
- HANDOFF.md's "Content architecture" section says "All copy and data in one typed file...
  Components read only from this file," but chrome/UI microcopy (skip-link text, hamburger
  aria-labels, table column headers, footer link labels, the "Sample" badge text) keeps landing as
  string literals inside components instead of `content/site.ts`. Judge this as a minor Spec
  finding each time (trusted path, cosmetic) rather than escalating — the handoff's own wording
  doesn't distinguish "her copy" from "UI chrome," so it is a legitimate partial-requirement
  finding, but not a data-risk one.
- `content/helpers.ts` `sampleEntries()` + its exhaustive-list test (`content/helpers.test.ts`) is
  the right seam to re-verify the sample-data set stays exactly the handoff's list on every round —
  keep checking that test's expected array against `content.md`'s "Sample data rules" line, not
  against the code.
- Keyboard interactions that close a menu/dialog on Escape (`Nav.tsx` calls
  `buttonRef.current?.focus()`) are implemented but the accompanying test only asserts
  `aria-expanded` flips back to false, never that focus actually returned to the trigger — a
  recurring missing-test gap on this project's interactive components.
