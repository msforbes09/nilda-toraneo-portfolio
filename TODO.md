# TODO

Deferred minors from review, accepted with reasons per CLAUDE.md ("Minors: fix the ones on
untrusted paths in one final wave before the PR; accept the rest with a reason in `TODO.md`").
None of the items below sit on an untrusted path (visitor input): they are UI chrome, static
copy and test coverage on content the team authors, not a visitor supplies.

## Review round A (T1 + T2), 2026-09-27

- **Nav hamburger breakpoint is 1024px (`lg:`), not the handoff's literal "under 768px".**
  `components/Nav.tsx` — Spec minor. Her name plus all 8 anchor links don't fit one row between
  768–1023px; a hamburger from 768px still ships (the requirement's *behavior* holds at every
  width below 1024px, just wider than named). Accepted: fixing it would mean cramming or
  truncating the nav in that range, a worse result than the handoff intended. Revisit if Nilda or
  Arnel calls out the tablet width specifically.
- **Some UI chrome strings are hardcoded in components instead of `content/site.ts`.**
  "Skip to content", "Open menu"/"Close menu", table headers, "Email"/"LinkedIn"/"Privacy policy",
  the "Sample" badge text, and the stub sections' placeholder sentences. Spec minor under a
  literal reading of "all copy and data in one typed file... components read only from this
  file." Accepted as-is: these are structural UI labels rather than Nilda's facts or approvable
  copy, low value to move, and the stub placeholders disappear once T3/T4 replace those sections.
- **No test asserts that `Escape` returns focus to the nav's menu button**, only that
  `aria-expanded` flips back to false. Correctness minor (missing test). Accepted: real behavior
  is implemented and works; the gap is a regression guard, not a defect. Low cost if a future
  refactor drops it (a keyboard user would notice immediately in the browser check).
- **No automated guard against a real company name landing in a sample testimonial.**
  Correctness minor (missing test). Accepted: `content/site.ts` is a trusted, reviewed file only
  the team edits; the current testimonials already comply. Revisit if the testimonials become
  editable by someone outside the team.

## T5 (motion), 2026-09-27

- **Proof readout split has no fallback when `display` lacks `${value}${suffix}`.**
  `components/sections/ProofStrip.tsx` `splitReadout` finds the number to count up inside the
  tile's display text. A tile whose display omits that number would render garbled. Accepted:
  `content/site.ts` is trusted and the existing ProofStrip test pins every current display
  string, so a mismatched edit fails CI. Add a plain-text fallback if tiles become
  client-editable.
- **Hero entrance replays if a visitor turns reduced motion off mid-visit.** The entrance effect
  keys on the live setting. Accepted: rare, harmless (the lines just re-settle), and
  guarding it adds state for no visitor-facing gain.
- **Hero entrance starts after hydration, from the server-rendered visible page.** On slow
  phones the headline paints at rest, then dips to its faint start state and settles (under
  1s). This is deliberate (progressive enhancement: no JS failure can hide the headline); the
  browser check should judge whether the dip reads as a flicker at phone width.
