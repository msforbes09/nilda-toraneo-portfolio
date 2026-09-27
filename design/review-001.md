# Design review — Handoff 001 (site)

**Verdict: ready** (ship, with two minors worth a fast follow-up; no majors)

Reviewed: static build served at http://localhost:3210/, `/privacy/`, `/does-not-exist`, against
`design/brief.md` and `PRODUCT.md`. Browser inspection via Claude in Chrome (desktop ~896px
viewport and the site's own mobile hamburger breakpoint); code inspection for reduced-motion and
metadata; `curl` for header/HTML checks. No forms submitted, no buttons clicked beyond navigation
and the nav hamburger toggle.

## Summary against the brief

The build matches `design/brief.md`'s selected direction closely. The ops-console/manifest world
is fully committed, not partially applied: ink-navy hero with a grid backdrop, a stamped
manifest-style headshot card with a barcode and rotated credential tag, mono/small-caps section
labels with rule dividers, a signal-orange primary CTA, and a verified-green checkmark treatment
on certifications. Type stack (Space Grotesk display, IBM Plex Mono labels, Plus Jakarta Sans
body) reads exactly as specified. All 11 sections are present, in the brief's order, with working
anchor nav and a mobile hamburger.

## Beat the incumbent — checked against the three weaknesses

1. **No checkable proof.** Answered. The proof strip has a labeled `SAMPLE RESULT · PPC` tile
   with a visible SAMPLE badge, real certification/experience readouts, and a count-up entrance
   animation. Sample work renders as three on-page, styled artifacts (research sheet, supplier
   chat, optimized listing mock) rather than bare download links — a direct, visible improvement
   over the old site's "Access File" links.
2. **Generic template look.** Answered. Nothing about this build reads as a template; the
   manifest/barcode/stamp motifs are distinctive and consistently applied through hero, proof
   strip, certifications and sample work.
3. **Generic headline / no "who this is for" / no pricing signal.** Answered. Headline is
   mechanism-specific ("Keep your Amazon account healthy, your listings ranking, and your ad
   spend earning"), an explicit "For Amazon FBA sellers and brand owners" line sits in About, and
   the pricing slot is simply absent rather than a dead promise (matches "hidden by default").

## Sample-data labelling

Checked every sample item found in `content/site.ts` and on the page: the proof-strip result tile,
both testimonials ("J. Whitmore — Sample client, UK-based FBA seller", second quote similarly
attributed to a sample client), all three sample-work tiles (each carries a baked-in "SAMPLE"
stamp or badge and a caption beginning "Sample:"), the fictional supplier name "Sample Factory,"
the sample Amazon listing ("amazon.com/dp/B0SAMPLE00"), and the resume download (labeled `SAMPLE`
next to the link). Nothing reads as an invented real fact — every placeholder is visually and
textually flagged as sample, and no real client name or real metric is presented as real. This is
the strongest part of the build against the "never invent facts" constraint.

## Animations and reduced motion

The signature moment (staggered proof-strip reveal with count-up) fires correctly and reads as the
one orchestrated motion event, matching the brief's "signature interaction." Hero entrance
(headline lines rising with a blur-to-sharp transition, credential tag landing like a stamp) is a
genuinely well-crafted touch that supports the "impress the client" instruction — it's the kind of
detail a template site doesn't have. Hover/focus states on CTAs and cards are present and subtle.

Reduced-motion handling, read from `lib/use-reduced-motion.ts` and `lib/use-scroll-reveal.ts`: the
architecture is correct and matches best practice — content renders at `rest` (fully visible, no
opacity/blur penalty) by default and only ever "arms" for a reveal once an element is confirmed
off-screen at mount; `useReducedMotion` short-circuits every reveal straight back to `rest`. This
means a reduced-motion visitor, a crawler, and a JS-disabled visitor all see fully-visible content
immediately — the RESULT.md's claim of a pre-existing "armed" contrast defect having been fixed is
consistent with what's in the code now. I could not toggle the OS/browser
`prefers-reduced-motion` media feature directly through the available browser tools, so this is
verified by code reading rather than by observing the reduced-motion path live in the browser (see
"Couldn't check" below).

## Search visibility basics

- `<title>`: "Nilda Toraneo — Amazon Account Manager & Admin Virtual Assistant" — her name and
  role both present, on `/`, `/privacy/`, and the 404 page.
- Headings: her name appears in an `h2` ("About Nilda Toraneo"); the `h1` itself is the outcome
  headline without her name, which is fine — the requirement (findable name in title/headings) is
  met via title + h2 + nav brand + footer + JSON-LD, not just the h1.
- Canonical: present (`<link rel="canonical">`) on every page checked.
- JSON-LD: present, `@graph` with `Person` (name, jobTitle, email, sameAs LinkedIn, address) and
  `Service` (name, serviceType list, provider) — solid structured data for a personal-services
  site.
- One caveat: canonical and OG URLs resolve to `http://localhost:3000` in this local preview
  build, because `NEXT_PUBLIC_SITE_URL` wasn't set for it. That's an artifact of the local/preview
  build environment, not a code defect — confirm it resolves to the real GitHub Pages/custom
  domain URL once `NEXT_PUBLIC_SITE_URL` is set for the production build.

## Responsive / narrow width

Tested at the browser's default viewport (~896px, which already crosses the site's own hamburger
breakpoint) — nav correctly collapses to a hamburger, opens as a full-screen list of anchors, and
closes cleanly. Proof-strip tiles, sample-work tiles and the manifest headshot card all stack
sensibly at this width with no overflow or clipping observed. I could not force a true phone-width
(e.g., 375px) viewport with the available browser tools (no explicit resize control), so the
narrowest width actually exercised is ~896px, not a phone. See "Couldn't check."

## Majors

None. Nothing found breaks the brief's direction, harms the primary action (contact form/email
path is clear and correctly shows the FORM OFFLINE fallback with a live mailto: link since
`NEXT_PUBLIC_FORM_ENDPOINT` is unset), fails an obvious accessibility or responsive basic, or
leaves the site anything other than clearly better than the incumbent.

## Minors

1. On the very first cold navigation to `/` in a fresh tab, one screenshot briefly showed a plain,
   unstyled "404 / The requested path could not be found" instead of the homepage; a reload
   immediately after rendered the correct homepage every subsequent time, and `curl` against the
   same URL consistently returned the correct 200 page throughout. I could not reproduce it on
   demand across several more reloads, so I'm treating it as a one-off (likely a browser/extension
   race on first paint) rather than a defect in the served output, but it's worth a quick sanity
   check by a human loading the real preview URL cold once or twice — if it recurs there, it would
   be a major (worst first impression possible: the home page showing 404).
2. Footer's social-link list is just email + LinkedIn (no other socials), which is accurate to
   the real content in `content.md`, not a defect — flagging only because the brief's interaction
   section says "social links" (plural) and a reader might expect more than two; no action needed
   unless Nilda has more channels to add later.

## What I couldn't check

- Reduced-motion behaviour was verified by reading `lib/use-reduced-motion.ts` and
  `lib/use-scroll-reveal.ts`, not by toggling the OS/browser media feature live in the browser
  (no such control was available in this session's tool set).
- True phone-width layout (~375px) was not exercised; testing stopped at the ~896px viewport the
  browser tool provided, which already triggers the site's own mobile nav.
- The contact form's submitting/success/error network states were not exercised (form was never
  submitted, per instruction) — RESULT.md reports these are covered by Vitest tests instead.
- Lighthouse/axe scores were not independently re-run in this review; RESULT.md's reported
  99/100 performance and accessibility, and the contrast-defect fix, were taken on the basis of
  the code now matching that fix (rest-state visibility confirmed by reading the reveal hook) plus
  what was directly visible in screenshots, not by rerunning Lighthouse myself.
- Did not inspect the actual GitHub Pages deployment (per RESULT.md, no live Pages URL exists yet)
  — this review is against the local static-export preview at localhost:3210 only.
