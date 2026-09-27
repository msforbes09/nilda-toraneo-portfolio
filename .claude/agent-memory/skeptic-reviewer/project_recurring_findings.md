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
- The "chrome copy outside `content/site.ts`" finding above recurred again in T4 (Contact.tsx's
  microcopy: "New enquiry", the readouts map, "Tell me about your store...", the error/success
  panel text) — same minor Spec severity, but this round the deviation wasn't logged in
  `TODO.md` even though the developer's own memory flagged it for the main session to add. Check
  `TODO.md` for the actual entry each round, not just that the finding was mentioned somewhere.
- Sample-data hrefs/srcs marked `sample: true` in `content/site.ts` (resume link, sample-work
  images, headshot fallback) need their target file checked against `public/` and the built
  `out/` — T4 shipped a resume download link (`/resume-sample.pdf`) with no such file anywhere in
  the repo, a real 404 for any visitor who clicks it, on a site whose whole goal is "reads as
  complete." Minor severity (trusted path, no data loss) but worth catching before ship since
  every visitor can trigger it, not just an adversarial one.
- The "Sample" badge JSX (bg-signal chip reading "Sample") is now duplicated across ProofStrip,
  Contact, Testimonials and Work (4 instances) — past this project's own "abstract on the third
  repetition" threshold. Minor DRY finding each round it isn't extracted into a shared component.
- Motion hooks that claim an "SSR-safe default" (e.g. `useReducedMotion` returning `false` when
  `window` is undefined) are guarded in code and asserted in the developer's memory/comments, but
  no test actually renders without `window` to prove it — jsdom always defines `window`, so the
  hook's test suite exercises only the client path. Recurring missing-test gap; check for it on
  every new hook that documents an SSR fallback.
