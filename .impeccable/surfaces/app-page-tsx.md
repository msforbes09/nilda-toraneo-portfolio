---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/privacy/page.tsx","app/not-found.tsx"]
---

# Surface brief — `/` (one-page portfolio)

Scope: the long-scroll home page and its meta pages (`/privacy`, custom 404). Mode: **Persuade**.
Source of truth: `design/brief.md` (pinned by Arnel on 2026-09-27) and `PRODUCT.md`. This brief
records the direction contract for builders and reviewers; it adds nothing the design brief did
not decide.

Audience: small-to-mid Amazon FBA sellers and brand owners in hiring mode, skimming on phone or
desktop, asking "can I trust this person with my Seller Central account and ad spend".
Job: reduce that risk before a discovery call. Action: submit the contact form (fallback: email
link). Proof: verb-forward promise → quantified result (sample until Nilda supplies one) → named
credentials → sample work shown on the page → named testimonials (sample) → easy next step.
Constraints: static export, no invented facts (sample data flagged), WCAG AA, JavaScript
animation required (Motion), `prefers-reduced-motion` respected.

## Direction contract

THESIS: The category default is a soft "hire-me" brochure (pastel cards, stock desk photo,
benefit icons). This page refuses it: it borrows the visual grammar of the workspace Nilda
actually runs (Seller Central dashboards, PPC readouts, shipping and inventory manifests, SKU
tags) so the site demonstrates operational fluency instead of claiming it.

OWN-WORLD: Dark ink-navy chrome for structure (nav, section dividers, footer, hero) on a warm
paper-neutral content ground. Signal orange (#E8952E lineage) used like warehouse signage: flat,
high-contrast, reserved for the primary action and verified-proof highlights, never decoration.
Verified green for credential and checkmark states. Section headers and stat callouts read as
manifest stamps and SKU tags: tracked mono labels, thin rule frames and underlines, not soft card
headings. Type: Space Grotesk (display), IBM Plex Mono (labels, data, stats), Plus Jakarta Sans
(body). Full palette, four named roles. Real headshot; no stock photography; sample work as
captioned mock-UI images labelled SAMPLE; no decorative fake charts.

STORY: The visitor lands on a specific promise and a face beside a stamped credential, sees a
readout strip of checkable numbers and credentials reveal, reads what she does in the seller's
own pain-point language, sees how she works and the real tools she runs, inspects sample work in
place, reads named quotes, and books a call from a form that never hides the email fallback.

FIRST VIEWPORT: Full-bleed ink-navy hero. Left: verb-forward outcome headline (copy for Nilda to
approve), one sub-line, primary CTA "Book a discovery call" in signal orange, quieter secondary
"See the work". Right: her real headshot inside a manifest-style framed card with a stamped
"Amazon Account Manager · Admin VA" credential tag beside it. Directly below: the proof strip, 3–4
dashboard-readout tiles (mono labels, thin rule frames) that reveal with a staggered fade/slide and
count-up on scroll-into-view; the page's one orchestrated motion moment.

FORM: Fused world: ops-console/dashboard chrome (structure, type, proof strip) plus
shipping/warehouse signage material (stamp motifs, SKU-tag labels, signal orange as safety colour).
Chosen in `design/brief.md` over a 10-K report treatment and a trading-floor ticker. No
concept-seed key: the direction was pinned by the approved design brief, which beats the roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

Hero headline wording, the quantified result, testimonial attribution, sample-work images, resume
file and pricing all ship as labelled sample slots until Nilda supplies real content.
