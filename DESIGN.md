---
name: Nilda Toraneo VA Portfolio
description: An ops-console/shipping-manifest visual world proving operational fluency for an Amazon Account Manager.
colors:
  ink: "#0f1b2d"
  ink-soft: "#1c2b42"
  ink-line: "#2a3a54"
  paper: "#f4f1ea"
  paper-deep: "#ebe6db"
  paper-line: "#d8d2c4"
  signal: "#e8952e"
  signal-deep: "#c9771a"
  verified: "#1f7a4d"
  text-on-paper: "#17233a"
  text-on-paper-soft: "#4a5568"
  text-on-ink: "#f4f1ea"
  text-on-ink-soft: "#b8c0cf"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.4rem + 2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  hero-display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 1.5rem + 3.6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.12em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
spacing:
  section-y-sm: "6rem"
  section-y-md: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    padding: "0 1.75rem"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "#f2a54a"
  sample-tag:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.125rem 0.375rem"
---

# Design System: Nilda Toraneo VA Portfolio

## Overview

**Creative North Star: "The Ops Console Manifest"**

This world refuses the category default — the soft pastel-card, stock-desk-photo "hire-me" brochure
every freelance-VA template ships. Instead it borrows the visual grammar of the workspace the
subject actually runs: Seller Central dashboards, PPC readouts, shipping and inventory manifests,
SKU and barcode labeling. A dark ink-navy console shell holds structure (nav, hero, dividers,
footer); a warm paper-neutral ground holds content; signal orange is used the way warehouse
signage uses it — flat, high-contrast, reserved for action and proof, never decoration; a verified
green marks credential and checkmark states. Section headers read as manifest-row stamps (heading
+ thin rule + information-bearing mono tag), not soft card titles.

The system fuses two material registers deliberately: dashboard/instrumentation chrome (mono
labels, thin rule frames, count-up stat tiles) and shipping/warehouse signage (corner ticks,
stamped credential tags, barcodes, dashed-rule training rows). It rejects two adjacent registers
considered and set aside in `design/brief.md`: a straight 10-K report treatment (too close to the
corporate-report cliché) and a trading-floor ticker (wrong trust register for a service-hiring
decision — too "finance hype").

**Key Characteristics:**
- Ink-navy structural chrome against a warm paper-neutral content ground; no third neutral competes with the two grounds.
- Signal orange is rationed to primary action and proof highlights — it never decorates.
- Section headers are manifest rows: `h2` + thin rule + mono tag that must say something real (a count, a status), never a decorative eyebrow/kicker.
- One shared easing curve (`easeOutExpo`) and one signature motion moment (staggered proof-strip reveal + count-up); no scattered hover effects elsewhere.
- Every reveal's pre-visible ("armed") opacity is a computed accessibility floor, not a design flourish — it exists to keep WCAG AA contrast while dimmed.

## Colors

Four named roles, deliberately not more; a fifth accent would blur the "signage" reading the brief calls for.

### Primary
- **Signal Orange** (`#e8952e`, hover `#f2a54a`, deep `#c9771a`): the single primary-action and proof-highlight color — CTA buttons, the "Sample" chip, proof-tile top-rule accents, nav underline-on-hover. Never used as a background fill outside these roles.

### Secondary
- **Verified Green** (`#1f7a4d`): credential/checkmark states only — the certification seal, "Issued <Mon Year>" stamp border and text, the credential-tag status dot. Carries a real semantic meaning (verified/confirmed); it must not be reused as a generic secondary accent.

### Neutral
- **Ink Navy** (`#0f1b2d`, soft `#1c2b42`, line `#2a3a54`): structural chrome — nav, hero, footer, dividers (`.tone-ink` surfaces) — and the default text-ink color on paper content (headings, credential-tag text).
- **Paper Neutral** (`#f4f1ea`, deep `#ebe6db`, line `#d8d2c4`): the content ground for every non-hero section, and the reversed text/surface color inside ink chrome.
- **Text-on-paper** (`#17233a`, soft `#4a5568`) / **Text-on-ink** (`#f4f1ea`, soft `#b8c0cf`): paired text roles, never cross-applied (text-on-ink never appears on a paper ground and vice versa).

### Named Rules
**The Warehouse-Signage Rule.** Signal orange is flat and high-contrast, never a gradient, tint, or soft badge — reserved for the primary CTA and verified-proof highlights. If a screen shows more than one orange element competing for attention, that's a defect, not a style choice.

**The Verified-Green Headroom Rule.** `--verified` on `--paper` measures 4.71:1 at rest — just above the 4.5:1 AA floor for the small mono text it labels (`Certifications`'s "Issued" stamp). This is why any scroll-reveal dimming a `--verified` element needs an armed-state opacity floor of ≥0.98, higher than other paper-ground reveals need (see Elevation & Depth → the reveal-opacity floors). Any future component that dims, overlays, or tints a `--verified` element inherits this same floor; darkening the token itself would give real headroom but is a palette change outside this record's scope (tracked in `TODO.md`).

## Typography

**Display Font:** Space Grotesk (with system-ui, sans-serif fallback)
**Body Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback)

**Character:** A technical, confident grotesk for display type paired with mono for anything that reads as data (labels, stats, stamps, tags), and a warm humanist sans for body copy — so the console register never turns cold for a non-technical audience.

### Hierarchy
- **Hero Display** (700, `clamp(2.375rem, 1.5rem + 3.6vw, 4.5rem)`, line-height 1.02, letter-spacing -0.035em): the hero `h1` only.
- **Section Display** (700, `clamp(1.875rem, 1.4rem + 2vw, 3rem)`, line-height 1.05, letter-spacing -0.03em): every `Section` `h2` manifest-row heading.
- **Body** (400, 1.125rem–1.25rem, line-height 1.625, max ~52ch on the hero subline): paragraph copy.
- **Label/Mono** (400–500, 0.625rem–0.75rem, letter-spacing 0.12em–0.14em, uppercase): manifest tags, proof-tile labels, credential stamps, the SampleTag chip, nav's collapsed credential badge.

### Named Rules
**The No-Eyebrow Rule.** A section's mono tag is a manifest-row label, not a decorative kicker: it always carries real information (an item count, a status, a ratio like "5 certifications · 1 training"). No section header may carry a mono tag with no informational content — that would be the eyebrow the world's manifest-stamp grammar exists to replace.

## Layout

Single long-scroll page, max-width `6xl` (72rem) container, mobile-first fluid stacking. Section vertical rhythm: `pt-24 pb-20` on phones, scaling to `pt-32 pb-28` (`md:`) — generous, consistent top-weighting so the manifest-row header always has room to breathe before its body. The hero and proof strip break the section pattern only in their own components (hero: `pt-12/pb-24` to `lg:pt-24/pb-32`; proof strip: `pt-20/pb-16` to `md:pt-24/pb-20`).

**Responsive nav divergence from the brief:** the handoff named "collapsing to a hamburger under ~768px." The shipped build collapses at `lg:` (1024px) instead — accepted and recorded in `TODO.md` because the subject's full name plus all eight anchor links do not fit one row between 768–1023px; the hamburger's *behavior* (a working collapsed menu below the breakpoint) holds at every width under 1024px, just at a wider named threshold. This DESIGN.md records the shipped 1024px breakpoint as the current rule; it is not a brief violation to repair silently, and it is not promoted here as evidence the breakpoint should move further in future work — revisit if the width is called out specifically.

## Elevation & Depth

Flat by default: sections are flat paper or ink fills with no ambient shadow. The one true elevation gesture is the hero's stamped credential tag (`box-shadow: 0 10px 24px -8px rgb(0 0 0 / 0.55)`, `-rotate-2`), which reads as a physically stamped tag lifted off the manifest card, not generic UI elevation. Depth elsewhere is conveyed by rule-frames and thin borders (proof-tile grid lines, certification row dividers), not shadows.

### Named Rules
**The Stamp-Is-The-Only-Shadow Rule.** Box-shadow is reserved for the rotated credential-tag stamp motif. No card, button, or tile outside that one signature element gets a drop shadow; depth elsewhere comes from a 1px rule or a grid-gap border, never a shadow.

**The Reveal-Opacity Floor Rule.** Every scroll-reveal's pre-visible ("armed") state is an accessibility-computed opacity floor, not an art-directed dim level, because dimming text scales its foreground and background together and can push a passing color below AA. Two floors are in force today: `components/Section.tsx`'s generic reveal arms at `opacity: 0.98` (set for the `--verified` green text it sometimes contains — see Colors → Verified-Green Headroom Rule); `components/sections/ProofStrip.tsx`'s tile reveal arms at `opacity: 0.9` (its content never carries `--verified` text, so it can sit lower). A future reveal component copying this rest/armed/shown pattern (`lib/use-scroll-reveal.ts`) must compute its own floor against whatever color it dims, defaulting to 0.98 if it may ever contain `--verified` text.

## Shapes

Square corners everywhere — no `border-radius` anywhere in the shipped chrome or components; the manifest/signage register reads as printed labels and stamped tags, not soft app UI. Borders are 1px hairlines (`ink-line` on ink, `paper-line` on paper) except the credential tag and manifest photo frame, which use a slightly heavier `border` for a physical-object read. Corner ticks (small L-shaped marks) frame the hero photo card as a "targeting/registration mark" motif, used once, only there.

## Components

### Buttons
- **Shape:** square corners (0 radius), `min-h-14` (primary) / `min-h-11` (secondary link).
- **Primary:** signal orange fill, ink text, `font-display font-bold`, horizontal padding `1.75rem`; hover shifts fill to `#f2a54a`, active scales to 0.97.
- **Secondary:** an underlined text link (never a second button style) with a decoration color shift from `ink-line` to `signal` on hover — deliberately quieter than the primary, per the brief's "quieter secondary."

### Chips
- **SampleTag** (`components/SampleTag.tsx`): the shared "Sample" flag marking placeholder/sample content. `solid` variant: signal-orange fill, ink text, mono, uppercase, tracked. `outline` variant: ink border only, for use inside underlined link text where a solid chip would compete. This is the system's only content-integrity marker — it always reads "Sample," never a synonym, so it stays recognizable wherever it appears (proof tiles, sample-work items).

### Cards / Containers
- **Corner Style:** square.
- **Background:** paper or paper-deep on paper sections; ink or ink-soft inside `.tone-ink`.
- **Shadow Strategy:** none (see Elevation & Depth); grid-gap borders (`bg-paper-line` gap, e.g. the proof-strip grid) substitute for card separation.
- **Border:** 1px hairline in the section's line-color, or none where a grid gap already separates tiles.
- **Internal Padding:** `p-6 pt-7` to `md:p-7 pt-8` (proof tiles); `py-6` per row (certification list items).

### Navigation
- **Style:** sticky ink bar (`.tone-ink`, `bg-ink`, bottom hairline), name + optional collapsed credential badge left, links right.
- **Typography:** display font for the name, body-weight medium for links, mono for the collapsed credential badge.
- **States:** link hover/focus draws an animated signal-orange underline (`scale-x` transform, never a color-only change) to keep the affordance visible without relying on color alone.
- **Mobile treatment:** collapses to a hamburger below `lg:` (1024px) — a shipped divergence from the brief's literal "768px," recorded above under Layout and in `TODO.md`. Escape closes the menu and returns focus to the trigger button.

### Manifest Card (signature component)
The hero's framed headshot card (`components/sections/Hero.tsx`'s `ManifestCard`): a bordered photo frame with corner ticks, a mono name strip above the photo, a mono location + generated barcode strip below it (the barcode's bars are deterministically derived from the subject's name, so it is stable between builds — not decorative noise), and a rotated, stamped credential tag overlapping the frame's corner with the system's one drop-shadow. This is the clearest expression of the "manifest stamp" grammar and the pattern any future credential-style callout should follow: frame + mono metadata strip + stamped tag, never a plain captioned photo.

### Proof Readout Tile (signature component)
The proof-strip's dashboard tile (`components/sections/ProofStrip.tsx`): mono uppercase label, a signal-orange top-rule accent bar, a large display-font stat that counts up from a starting value on scroll-into-view, an optional mono context line, and an optional `SampleTag` when the figure is placeholder/sample data. Tiles reveal staggered left-to-right within a row (desktop) or in document order (stacked mobile) using the shared `easeOutExpo` curve — the page's one orchestrated motion moment, deliberately not repeated as a generic scroll-reveal everywhere (`components/Section.tsx`'s section-level reveal is a plainer rise+fade, intentionally less choreographed than this signature tile).

## Do's and Don'ts

### Do:
- **Do** ration signal orange to primary actions and verified-proof highlights; if you can't name the action or proof it marks, it isn't signal orange.
- **Do** give every section-header mono tag real information (a count, ratio, or status) — the manifest-row header pattern requires it.
- **Do** compute a new reveal component's armed-state opacity against whatever color it dims, not against a flat "looks fine" default; verified green needs ≥0.98, most other paper-ground text can go lower.
- **Do** use the shared `easeOutExpo` curve (`lib/motion.ts`) for any new motion; it is the system's one easing, not one of several to choose from.
- **Do** respect `prefers-reduced-motion` (`lib/use-reduced-motion.ts`) for any new animated component — every existing animation gates on it.

### Don't:
- **Don't** add a decorative eyebrow/kicker above a heading. The system's only header ornament is the manifest-row mono tag, and it must carry real information — an eyebrow with no data is a device this world's own craft floor prohibits, not a lighter version of the tag.
- **Don't** add a drop shadow to anything except the hero's stamped credential tag. Depth elsewhere comes from hairline borders and grid gaps.
- **Don't** round a corner. No component in this system uses `border-radius`; introducing one breaks the printed-label/stamped-tag read the whole world is built on.
- **Don't** reuse `--verified` green as a generic secondary accent color outside credential/checkmark states — its contrast margin is thin (4.71:1 at rest) and its meaning is semantic (verified), not decorative.
- **Don't** treat the proof-strip's staggered count-up as a generic reveal pattern to sprinkle elsewhere; it is the page's one deliberate orchestrated motion moment per the brief, and repeating it dilutes the signature.
