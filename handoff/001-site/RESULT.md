# Result: 001 site

**Status:** done
**Date:** 2026-09-28
**Branch / PR:** `feature/001-site` → `develop`; PR opened after this file is committed (see the
message to Mira). Base repo: `github.com/msforbes09/nilda-toraneo-portfolio` (public, created for
this handoff; the local project folder stays `nilda-portfolio` per the handoff).
**Preview or run link:** No live GitHub Pages URL yet — see "GitHub Pages preview" below for why,
and "How to run" for a local preview. Repo: https://github.com/msforbes09/nilda-toraneo-portfolio

## Summary

Built a complete Next.js (App Router, static export) one-page portfolio for Nilda Toraneo in the
"ops-console / shipping-manifest" visual world from `design/brief.md`: an ink-navy/paper-neutral/
signal-orange/verified-green palette, Space Grotesk + IBM Plex Mono + Plus Jakarta Sans, manifest-
style section headers, a stamped-credential hero, and a staggered count-up proof strip as the one
signature motion moment. All 11 sections from the brief are in place with her real bio, services,
certifications and tools verbatim, plus clearly flagged sample data for the quantified result,
testimonials, sample work and resume. The contact form has full idle/submitting/success/error
states with an honeypot and an empty-endpoint fallback. Meta pages (privacy, custom 404, sitemap,
robots, OG image, favicon, canonical links, JSON-LD) are complete. 99 Vitest tests plus the kit's
1007 hook tests, lint, typecheck and the static build all pass clean from a fresh `npm ci`.
Lighthouse mobile: 99 performance, 100 accessibility. Two skeptic-reviewer rounds ran (all findings
minor, resolved or accepted with reasons); an impeccable finish review returned **ship**; a
Lighthouse-driven accessibility defect I found independently (a page-wide, pre-reveal contrast
failure) was fixed and re-verified before this report. `DESIGN.md` documents the shipped system.

## Done-when checklist

- [x] `develop` has the commit `chore: install dev-kit 0.5.1` (`f06d169`, on `develop` in the main
  checkout). All work is on `feature/001-site`. **Not yet true:** a PR into `develop` is open — I
  am opening it immediately after this file is committed; its URL will follow in my message to
  Mira, since I cannot edit this file after opening the PR without invalidating "PR body is built
  from RESULT.md."
- [x] `npm install`, `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` all pass
  from a clean checkout. Evidence (fresh `npm ci` on this tree, 2026-09-28):
  - `npm run lint` → `> eslint` (no output, clean)
  - `npm run typecheck` → `> tsc --noEmit` (no output, clean)
  - `npx vitest run` → `Test Files 25 passed (25) · Tests 99 passed (99)`
  - `node --test 'test/hooks/*.test.mjs'` (part of `npm test`) → `tests 1007 · pass 1007 · fail 0`
  - `npm run build` → compiled successfully, 8 static routes generated
- [x] `out/` contains `index.html`, `privacy/index.html`, `404.html`, `sitemap.xml`, `robots.txt`,
  an OG image (`opengraph-image`, 58,109-byte PNG via `next/og`) and a favicon (`icon.svg`).
  Verified directly against the fresh build's `out/` directory listing.
- [x] The page has the 11 sections in the brief's order (hero, results/proof strip, about,
  services, how-I-work/process, certifications, sample work, testimonials, pricing [hidden],
  contact, footer) with working anchor nav and a mobile hamburger. Screenshots: see "Screenshots"
  below.
- [x] Every sample-data item is flagged `sample: true` in `content/site.ts` and listed in its top
  comment; no real company names in sample testimonials (verified in review round A and again in
  round B: "Sample client, UK-based FBA seller" / "Sample client, US-based brand owner", and a
  fictional "Sample Factory" supplier in the sample-work chat mock-up, name itself containing
  "Sample").
- [x] The contact form has idle, submitting, success and error states with tests; with an empty
  endpoint (the default: `NEXT_PUBLIC_FORM_ENDPOINT` unset) it disables the fieldset and shows a
  prominent "FORM OFFLINE" note with a working `mailto:` link. Verified both in Vitest and directly
  in a real browser.
- [x] Animations exist for hero entrance, proof-strip staggered reveal with count-up, section
  reveals, and card/CTA micro-interactions; `prefers-reduced-motion` is respected everywhere
  (tested: reduced motion renders final values immediately, no count-up, no entrance delay).
- [x] `/privacy` and the custom 404 render in the same visual language; `<title>` and description
  contain "Nilda Toraneo" and "Amazon Account Manager"; OG/Twitter meta present on every page (via
  the root layout, inherited); canonical links added this session.
- [ ] **Partial.** GitHub repo `nilda-toraneo-portfolio` exists under Arnel's account (public), and
  the deploy workflow is committed and ready — but it has never run and `workflow_dispatch` 404s.
  Root cause identified (see "GitHub Pages preview" below); this is expected to self-resolve once
  the PR merges to `main`. No live Pages URL exists yet.
- [x] Lighthouse mobile performance and accessibility ≥ 90: **99 / 100** (see "Lighthouse" below).
- [x] Matches `design/brief.md`; the impeccable finish reviewer's verdict was **ship** (full report
  under "Design review" below). I independently found and fixed one accessibility defect the
  reviewer's evidence didn't surface (see "Deviations").
- [x] This file is complete.

## How to run

From a fresh clone of `feature/001-site`:

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm test           # Vitest + the kit's node:test hook tests
npm run build       # static export into out/
npx serve out       # preview the static export locally
```

Copy `.env.example` to `.env.local` to set `NEXT_PUBLIC_FORM_ENDPOINT` /
`NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BASE_PATH` for local development; all are optional locally.

## Rulings

Every decision I made that wasn't fully settled in the handoff, in order:

- **Ruling: pushed only `feature/001-site` to origin, never `main`/`develop`** — the handoff's
  Deploy section said to push all three, but `CLAUDE.md`'s hard rule ("never push directly to
  main or develop... follow guards even where they wouldn't catch you") wins on conflict per
  `handoff/README.md`, and the repo's own guard-bash hook blocked `git push origin main`. Mira
  confirmed this was her error in the handoff and ruled: proceed with `feature/001-site` as the
  only remote branch; she pushes `main`/`develop` and sets the default branch to `main` herself
  when she merges. — **Cost if wrong:** none; this is the safer default, and Mira explicitly
  ruled on it.
- **Ruling: repo name is `nilda-toraneo-portfolio`, not `nilda-portfolio`** — Mira relayed a new
  naming rule from Arnel after the handoff was written (which said `nilda-portfolio`); I renamed
  every repo-path reference (workflow, `.env.example`, `README.md`) accordingly. The local project
  folder stays `nilda-portfolio` per her instruction. **Conflict with `HANDOFF.md`:** §"Deploy" and
  the done-when checklist both say `nilda-portfolio`; superseded by Arnel's later instruction via
  Mira. — **Cost if wrong:** low; a repo rename is a one-line GitHub Settings change plus updating
  three env references.
- **Ruling: skipped the temporary `push: branches: [feature/001-site]` deploy-workflow trigger**
  — Mira pre-approved adding this if `workflow_dispatch` 404'd (it did). The harness's own
  permission classifier denied the Edit itself (tagged "Production Deploy"), independent of Mira's
  approval; per that denial's own instruction, I did not pursue the same outcome through another
  tool or path. I diagnosed the actual root cause instead (see "GitHub Pages preview" below).
- **Ruling: certification issuer follows `content.md`, not `PRODUCT.md`** — `content.md` says
  "Sponsored Ads Certification — Amazon Ads, May 2024"; `PRODUCT.md`'s own Evidence-on-Hand section
  mispairs it as "(My Amazon Guy)" (which is actually the SEO Course's issuer). Per `HANDOFF.md`
  §5, `content.md` is the authoritative data source; review round B independently verified this
  resolution was correct and flagged the mismatch as `PRODUCT.md`'s own error, not mine to fix.
- **Ruling: nav hamburger breakpoint is 1024px (`lg:`), not the handoff's literal "under 768px"**
  — her name plus all 8 anchor links don't fit one row between 768–1023px. Accepted in review round
  A with a reason in `TODO.md`; the requirement's behavior (a hamburger below the breakpoint) holds
  everywhere below 1024px, just wider than the number named.
- **Ruling: added "Nilda Toraneo" to the About section's heading** — Arnel clarified via Mira
  that "meta pages" meant search-engine findability, and her name appeared in no `h1`/`h2` on the
  page (only in the title, nav brand, hero card and footer as plain text). I changed About's
  heading from "About" to "About Nilda Toraneo" (test-first), a one-line, low-risk copy change
  directly serving that explicit request, without restructuring any other section's heading
  pattern. — **Cost if wrong:** trivial to revert (one line).
- **Ruling: sample-work "screenshots" are authored SVG mock-UIs, not real images** — no
  image-generation tool exists in this session; Mira pre-approved this substitution. Each of the
  three SVGs (a product-research spreadsheet, a supplier chat with a fictional "Sample Factory"
  supplier, an optimized Amazon listing) carries a baked-in "SAMPLE" stamp and is captioned "Sample:
  ..." in `content/site.ts`.
- **Ruling: resume link points to a hand-authored placeholder PDF, not a 404** — `content/site.ts`
  originally pointed `resume.href` at a file that didn't exist. The handoff calls this a "resume
  download slot (placeholder link marked sample)," which permits a non-functional placeholder, but
  a review finding correctly noted that a labelled "Sample" link that 404s undercuts "the site
  reads as complete." I had a developer author a minimal, valid one-page PDF
  (`public/resume-sample.pdf`) that plainly states it's a placeholder, rather than leave a dead
  link or invent a fake resume. — **Cost if wrong:** trivial; delete the file and the link 404s
  again exactly as the bare-minimum spec reading would have shipped.
- **Ruling: fixed a page-wide contrast defect the reviewers didn't catch, before shipping** — a
  Lighthouse audit I ran (not requested by name in the handoff, but implied by "browser check" and
  the ≥90 accessibility gate) found 156 text elements across nearly every section failing WCAG AA
  contrast, because the shared scroll-reveal's pre-reveal ("armed") state dimmed content to 20%
  opacity — which Lighthouse, search-engine crawlers, and any JS-enabled visitor's first paint all
  see before scrolling. This also directly violated the project's own craft-floor rule ("exponential
  ease-out from an already-visible default"). I had it fixed (opacity raised to 0.9–0.98,
  empirically verified against a fresh Lighthouse run per element, since one token — verified
  green — has a thin 4.71:1 contrast margin at full opacity) rather than merely logging it, since
  it affected the explicit ≥90 accessibility requirement's spirit even though the aggregate score
  (97) technically still cleared 90 before the fix. Final score: 100. — **Cost if wrong:** none;
  purely additive contrast headroom, verified empirically, no behavior change.
- **Ruling: worked around a harness limitation by serializing "parallel" tasks (T3/T4/T6)** — this
  session's git-worktree isolation is scoped to the whole session, not per-subagent, so three
  worktree-pinned subagents launched "in parallel" all raced for the same isolation slot and two
  of the three blocked on every write. I re-ran each task from a session explicitly switched into
  its own worktree, one at a time, merging each back into `feature/001-site` before starting the
  next. Net effect: the same three tasks completed correctly, just sequentially instead of
  concurrently; no work was lost, no files were touched out of scope in either attempt. Flagged
  under "Suggestions for Mira" below since this is a harness/process fact, not a project one.
- **Ruling: browser check used claude-in-chrome directly, not the `browser-checker` agent** — the
  kit's `browser-checker` agent requires `mcp__Claude_Browser__*` tools this session doesn't have.
  I ran the same walk (screenshots at two widths, keyboard-only pass, console check, form states,
  meta pages) myself via `mcp__claude-in-chrome__*` tools and folded its evidence into both the
  impeccable finish review and this report. Noted as the kit's own workflow anticipates ("Skip it
  when the project has no UI or the session has no browser tools, and say so in the result" — I
  had a browser tool, just not the named one, so I used it rather than skipping the check).

## Deferred minors

All logged with reasons in `TODO.md` (not repeated in full here; see that file for the complete
text). Summary by round:

- **Review round A** (T1+T2): nav breakpoint (see Rulings above); some UI chrome copy hardcoded in
  components instead of `content/site.ts`; no test for Escape-returns-focus on the nav menu; no
  automated guard against a real company name in sample testimonials.
- **T5 (motion)**: `ProofStrip`'s number-parsing has no fallback for a malformed `display` string
  (content is trusted); the hero entrance replays if reduced-motion is toggled off mid-visit
  (harmless); the hero entrance's post-hydration settle was flagged for the browser check to judge
  — checked directly in a real browser: it resolves in well under a second once the tab has focus,
  no perceptible flicker, not a defect (see "Browser check" below for the full explanation of an
  automation-only artifact I ruled out).
- **Review round B** (T3–T6): the same chrome-copy pattern recurred in `Contact.tsx`; no test for
  `use-reduced-motion`'s server-side branch (jsdom always defines `window`); no simulated
  keyboard-only walk of the contact form in Vitest (covered instead by the real browser check).
- **Browser check / Lighthouse**: the `--verified` green token's thin 4.71:1 contrast margin at
  rest, which is why `Section.tsx`'s reveal floor needed to go as high as 0.98. Not a defect today
  (Lighthouse accessibility is 100), but a real constraint on any future component that might dim
  or tint over that color.

## Merge danger

**Two-way door.** This PR only touches `feature/001-site`; nothing has been pushed to `main` or
`develop`, and no destructive or irreversible action has occurred anywhere (no data store, no
external service configured yet — `NEXT_PUBLIC_FORM_ENDPOINT` is unset). Merging squashes new,
additive code into `develop`; reverting is a single revert of the squash commit. The GitHub repo
itself (`nilda-toraneo-portfolio`) is new and public but empty of any real user data. Blast radius
if something is wrong post-merge: cosmetic or content-only, since there is no backend, no database
and no secrets in the repo. **How to revert:** `git revert` the squash-merge commit on `develop`,
or simply don't merge to `main`.

## Conflicts with CLAUDE.md

One, noted above under Rulings: `HANDOFF.md`'s Deploy section asked to push `main`, `develop` and
the feature branch; `CLAUDE.md`'s hard rule (never push to `main`/`develop`, follow guards even
where they wouldn't catch you) wins per `handoff/README.md`'s own conflict rule, and Mira confirmed
the handoff line was her error. No other conflicts found.

## Tests

- **Coverage:** content helpers (`content/helpers.ts`: `sampleEntries`, `withBasePath`,
  `formatIssued`, `formatRange`, `navLabel`), the contact form's full state machine
  (`lib/contact-form.ts`) and its React binding (`lib/use-contact-form.ts`, mocked `fetch`), every
  rendered section component (Hero, ProofStrip, About, Services, Process, Certifications, Work,
  Testimonials, PricingSlot, Contact), the shared `Section`/`SampleTag`/`Nav`/`Footer` components,
  the reduced-motion and scroll-reveal hooks, the page's section order, layout metadata (including
  the new canonical links and JSON-LD structured data), the privacy page, the custom 404, and the
  sitemap/robots generators.
- **How to run:** `npm test` (runs `vitest run` then the kit's `node --test 'test/hooks/*.test.mjs'`
  in one command) or `npm run test:watch` for just the site's Vitest suite during development.
- **Latest result** (fresh `npm ci`, 2026-09-28): Vitest — 25 test files, 99 tests, all passed.
  Kit hooks — 59 suites, 1007 tests, all passed, 0 failed. No red tests, pre-existing or otherwise.

## Design review

**Impeccable finish reviewer, verdict: ship.**

- **Persistence:** pass. `PRODUCT.md` present and consistent with the brief; no comp-round
  artifacts exist, correctly, since this was a code-led build; the brief's disclosed
  concept-seed substitution ("no concept-seed key... produced by direct reasoning... in the
  absence of the interactive tournament tool") was treated as a sanctioned, disclosed exception,
  not a silent skip.
- **Fidelity** (judged against the direction contract's FIRST VIEWPORT block and named signature
  interaction, since no comp exists): headline, sub-line, both CTAs, the manifest-framed headshot
  card with its stamped credential tag, the proof strip's staggered count-up, the type system
  (genuinely self-hosted via `next/font`, not a fallback), the palette (`--paper`/`--ink`/`--signal`
  hexes match the brief's named values exactly), and the manifest-list services/certifications/
  testimonials patterns all matched the contract with no missing, contradicted, or
  unapproved-addition rows found against the evidence available.
- **Ceiling:** no QUALITY BAR card existed to judge against (none was generated in this session);
  judged informally against the world's own device repertoire. One minor unevenness noted, not
  blocking: the rotated-stamp gesture appears only on the hero credential tag, not echoed on the
  Certifications "Issued" marks.
- **Material fixes:** none from the reviewer's own evidence.
- **What to keep:** the proof strip as the one orchestrated motion moment (don't spread
  scroll-triggered flourish onto every section); the manifest card's authored details (corner
  ticks, name-seeded barcode, rotated stamp) — don't dilute them into a generic circle-avatar
  treatment in future work.
- **Disclosed gap in the reviewer's own evidence:** it worked from the hero-viewport screenshots I
  gave it plus reading component source for the rest (no rendered screenshots existed yet for
  About, Process, Work, Testimonials, Contact's states, the mobile nav-open state, `/privacy` or
  `404`). I closed this gap myself in the browser check below, which independently confirmed every
  one of those sections renders correctly and found one real defect (the contrast issue) the
  reviewer's evidence didn't surface — fixed and re-verified before this report, as described
  above.

**`DESIGN.md`** was written from the shipped build (not from aspiration) and flags two known drifts
rather than silently canonizing or repairing them: the nav breakpoint (1024px vs. the brief's
"~768px") and the `--verified` green token's thin contrast margin. `.impeccable/design.json` holds
the token-bearing companion file. One correction I made after the documenter's pass: it had pulled
the project's stale "Nilda Forbes" title from an old, superseded header instead of "Nilda Toraneo"
(the resolved, correct name) — found and fixed in both `DESIGN.md` and `.impeccable/design.json`
before committing.

**Browser check** (via `mcp__claude-in-chrome__*`, since this session had no `Claude_Browser`
tools for the kit's own `browser-checker` agent): walked the built static site
(`npx serve out`) at a settled ~1420px-wide desktop viewport and the narrowest width this
session's browser-resize tool could reach (~500–924px, not the requested 375px/390px — a tool
limitation, not a site defect; explained below). Confirmed: the hero, proof strip (mid-count-up
and fully resolved), About's experience table, Services' 8 manifest rows, the process steps + tool
stack readout, Certifications (verified-green seals, "Issued <Mon Year>" stamps, the training row
visually distinct, the word "expired" never appears), the 3 sample-work SVG tiles (each reads
clearly as its subject, each stamped SAMPLE), the mobile hamburger menu (opens, closes on Escape,
returns focus to the toggle button), the contact form's offline state (fieldset disabled, a
prominent "FORM OFFLINE" note, working `mailto:` link, resume link resolving to the real
placeholder PDF), `/privacy`, and the custom `404` page all render correctly, in the same visual
language, with zero console errors or warnings across every page visited.

**One thing I investigated and ruled out as a non-defect:** the hero's line-by-line entrance
(blur/opacity/position settling to sharp) appeared stuck mid-animation in several automated
screenshots, even after multi-second waits. Direct DOM inspection traced this to
`document.visibilityState`/`hasFocus()` — freshly created automation tabs in this session start
without real OS focus, which correctly pauses the CSS-transition-driven entrance (standard browser
behavior, not a bug). The moment a tab gained real focus (a single click), the entrance resolved to
sharp within under a second, matching T5's own tested design. A real visitor's tab is always
focused when they're looking at it, so this never manifests for anyone actually using the site. Not
a finding.

**Tool limitation, disclosed rather than worked around:** this session's `resize_window` browser
tool enforces an apparent ~500px floor on an existing tab and inconsistently on a fresh one (best
achieved: ~500–924px physical capture width, not the requested 375/390px). The hamburger
breakpoint (1024px) and all responsive behavior were still verified correctly at this narrower-
than-desktop width; true 375px-exact visual QA would need a different tool or Arnel's own device.

## Lighthouse

Run twice against the static build served locally (`npx serve out`, headless Chrome, mobile
form factor), before and after the contrast fix:

| | Performance | Accessibility |
|---|---|---|
| Before the contrast fix | 95 | 97 (156 `color-contrast` failures) |
| **Final** | **99** | **100** (0 failures) |

Key mobile metrics on the final run: first contentful paint 2.3s, largest contentful paint 2.3s,
total blocking time 50ms, cumulative layout shift 0, speed index 2.4s. Only the home page (`/`) was
audited; `/privacy` and `404` were checked visually in the browser walk but not run through
Lighthouse separately.

## GitHub Pages preview

**No live URL exists yet.** What's done: the repo `nilda-toraneo-portfolio` exists (public, under
Arnel's GitHub account via `msforbes09`), Pages is enabled with `build_type: workflow`, and
`feature/001-site` is pushed and is currently the repo's default branch (since it's the only branch
pushed — per Mira's ruling, `main`/`develop` stay local until she merges).

**What's blocked, and why:** `gh workflow run deploy.yml --repo msforbes09/nilda-toraneo-portfolio
--ref feature/001-site` returns `HTTP 404: workflow deploy.yml not found on the default branch`,
every time, across many pushes and over an hour of elapsed session time (ruling out simple indexing
lag). Root cause, confirmed via `gh api repos/msforbes09/nilda-toraneo-portfolio/actions/workflows`
(returns `{"total_count":0}`) and `.../actions/runs` (also 0): GitHub's Actions service only
registers a workflow for `workflow_dispatch` once a push event actually matches one of its `on:`
triggers at least once. `deploy.yml`'s only push trigger is `branches: [main]`, and this session has
correctly never pushed to `main` (the repo's own guard blocks it, and Mira ruled that stands). The
workflow file's mere presence in the default branch isn't sufficient for the dispatch API, contrary
to some GitHub documentation's phrasing.

**Mira's ruling on this** (already given): "If it still 404s after that, put the exact command and
error in RESULT.md, finish everything else, and I'll get the dispatch run from Arnel's side in the
morning; the build isn't blocked on it." I did try one path that would have unblocked this myself —
adding a temporary `push: branches: [feature/001-site]` trigger, which Mira pre-approved — but the
harness's own permission classifier denied that specific Edit (tagged "Production Deploy"),
independent of her approval, and I did not attempt to route around that denial.

**What actually resolves this:** the workflow will register and become dispatchable automatically
the first time `main` receives a push — which will happen naturally when Mira merges this PR to
`develop` and later Arnel says "release" (per the git flow in `CLAUDE.md`), or sooner if Arnel adds
the temporary push trigger himself and pushes once. No further action is needed from a worker
session; Lighthouse and the browser check above already validated the exact static output that
`out/` will contain when Pages does build it.

## Open questions for Mira / Arnel

1. The nav hamburger ships at 1024px, not the handoff's literal 768px (see Rulings). Fine as is, or
   should a future task specifically redesign the 768–1023px range to fit the full nav?
2. The `--verified` green token has only a 4.71:1 contrast margin at full opacity — comfortably
   passing today, but tight for any future design work that dims, tints, or overlays it. Worth a
   small palette adjustment in a future pass, or leave as documented in `TODO.md` and `DESIGN.md`?
3. Once Nilda approves the sample data, a follow-up handoff will need to replace: the quantified
   result tile, both testimonials, all 3 sample-work images, the resume PDF, and the hero
   headline/bio copy flagged `copyToApprove`. Should that be its own handoff, or folded into
   whatever comes after her review?

## Suggestions for Mira

<!-- One line each with evidence. Mira logs these for Arnel; nothing changes until he decides. -->

- **Git-worktree isolation in this harness is scoped to the whole session, not per-subagent.**
  Evidence: three subagents launched "in parallel," each pointed at its own worktree
  (`feature-001-site-t3/-t4/-t6`), all inherited the SAME pinned worktree as the orchestrating
  session at spawn time; two of three could not write anywhere and reported the block verbatim
  (`This session is isolated in the worktree .../feature-001-site, but this command's working
  directory resolved to...`). Fix used: re-run each task after explicitly switching the
  orchestrating session's own pinned worktree first (`EnterWorktree`), one at a time. If Mira's
  process or plan templates assume true multi-worktree parallelism is available to a worker
  session, they should assume sequential-with-worktree-switching instead until the harness changes.
- **`gh workflow run --ref <feature-branch>` cannot work on a brand-new repo whose only push
  trigger is `main`, until `main` gets its first push.** Evidence: this handoff's own preview-URL
  step (§"Deploy") assumed `workflow_dispatch` would work once the file exists on the default
  branch; it does not, per GitHub's actual registration behavior (see "GitHub Pages preview"
  above). Future handoffs that want a pre-merge Pages preview should either add a temporary
  matching push trigger from the start (and have that pre-approved at the handoff-writing stage,
  since the harness's own permission classifier treats editing a deploy workflow as sensitive
  regardless of task-level pre-approval), or accept that the first real preview only exists after
  the first merge to `main`.
- **The harness's auto-mode permission classifier can deny an action Mira has already
  pre-approved**, and that denial does not resolve by re-asking or trying another tool. Evidence:
  `gh repo create` (in the project's own command allowlist) was denied as "Create Public Surface";
  editing the deploy workflow's trigger list (which Mira explicitly pre-approved in writing) was
  separately denied as "Production Deploy." Both required Mira/Arnel to act from their own session
  instead. Worth knowing this class of action needs a human in a differently-permissioned session,
  not just Mira's sign-off, when planning a handoff's steps.
