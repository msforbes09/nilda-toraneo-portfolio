# Design brief — Nilda's portfolio (one-page site + meta pages)

Mode: **Persuade**. Visitor decides whether to reach out; design is part of the pitch.

No live human/structured answer mechanism was available while writing this brief (no
AskUserQuestion-equivalent tool, no image-generation tool in this session), so the visual-world
choice below was reasoned directly against `new-work.md`'s method rather than run through its
interactive decision page. That substitution is disclosed here per the skill's own fallback for
when no answer mechanism exists. Every open call is listed at the end for Mira to route to Arnel.

## 1. Job and audience

A small-to-mid Amazon FBA seller or brand owner, in hiring mode, lands here from a referral,
LinkedIn, or outreach message. They are comparing Nilda against other freelance Amazon VAs whose
sites all look alike (see "Beat the incumbent" below). They skim fast, on phone or desktop, for one
thing: can this person be trusted with my Seller Central account and my ad spend. They are not here
to be entertained; they are here to reduce risk before a discovery call.

## 2. Outcome and proof

Primary action: **submit the contact form** (fallback: click the email link). Secondary action:
open a specific sample-work item or certification for closer inspection.

Success is a legible chain of proof, in this order: a specific, verb-forward promise → a
quantified result or credible proxy for one → named credentials → real sample work shown in place
→ named testimonials → an easy way to start. Every proof element is either real content Nilda
supplies or a clearly labeled placeholder — never invented.

## 3. Selected direction

**THESIS.** This category's default is a soft, templated "hire-me" brochure (pastel cards, stock
desk photo, generic benefit icons). This site refuses that shell: it borrows the visual grammar of
the workspace Nilda actually runs — Seller Central dashboards, PPC readouts, shipping/inventory
manifests, SKU and barcode labeling — so the site itself demonstrates operational fluency instead
of just claiming it.

**OWN-WORLD.** A dashboard/ops-console language: a dark ink-navy chrome for structural elements
(nav, section dividers, footer) against a warm paper-neutral content ground; her existing signal
orange (~#E8952E lineage, exact hex TBD pending asset confirmation) used the way warehouse/logistics
signage uses it — flat, high-contrast, reserved for action and verified-proof states, never as soft
decoration; a verified-green for certification/checkmark states. Section headers and stat callouts
read like manifest stamps and SKU tags (small-caps or mono labels, tracked letterforms, thin rule
underlines) rather than soft card headings. Full palette, four named roles: ink navy (structure/
text), paper neutral (ground), signal orange (primary action + proof highlights), verified green
(credential/checkmark accents) — a Persuade surface earns this commitment; Restrained would
undersell the "impress her" ask, Drenched would fight the trust register this audience needs.

**Type.** Display: **Space Grotesk** (technical, confident grotesk with a point of view — avoids
the serif-display-portfolio cliché every competitor and template defaults to). Data/labels/stat
callouts: **IBM Plex Mono** (reads as instrumentation, reinforces "data-driven" positioning).
Body: **Plus Jakarta Sans** (warm enough to keep the console language from feeling cold, since the
audience is a small business owner, not an engineer). Reason for each: named per new-work's
guidance against training-data defaults, chosen because the console/manifest world calls for grotesk
+ mono, not because "tech wants a mono."

**Imagery.** Nilda's real headshot (permission granted) in the hero and about section — no stock
desk photography (the single biggest generic tell on her current site and every competitor site).
Sample work ships as real annotated screenshots with captions, styled like inspected manifest
pages, not bare "Access File" links. No synthetic charts carrying invented numbers; where a real
metric is missing, the slot is an explicit placeholder card, not a decorative fake graph.

**FIRST VIEWPORT.** Full-bleed ink-navy hero. Left: a verb-forward, outcome-specific headline (not
"Let's ensure your store thrives" — something naming the actual mechanism, e.g. built around
listing health / PPC / account management, final copy hers to approve), one sub-line, primary CTA
button (signal orange, "Book a discovery call" or equivalent) and a quieter secondary link ("See
the work"). Right: her real headshot inside a manifest-style framed card, with a small stamped
"Amazon Account Manager · Admin VA" credential tag beside it — the tag is the first thing that reads
as a dashboard/verification artifact rather than a portrait caption.

**Signature interaction.** A horizontal "proof strip" directly under the hero: 3–4 stat/credential
tiles styled as dashboard readouts (monospace labels, thin rule frames) that reveal with a short
staggered fade/slide on scroll-into-view — the site's one orchestrated motion moment, not scattered
hover effects elsewhere.

**FORM.** Fused world: ops-console/dashboard chrome (structure, type, proof strip) + shipping/
warehouse signage material (stamp motifs, SKU-tag labels, signal-orange-as-safety-color) — chosen
over a straight "10-K performance report" treatment (too close to the corporate-report cliché this
model defaults to) and over a trading-floor/ticker treatment (wrong trust register — too "finance
hype" for a service-trust decision). No `concept-seed` key: produced by direct reasoning against
`new-work.md`'s method in the absence of the interactive tournament tool.

**FINISH.** Unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance.

## 4. Scope and boundaries

- Fidelity: production-ready static site, not a prototype.
- Breadth: one long-scroll page (anchor nav) + `/privacy`, custom `404`, `sitemap.xml`/`robots.txt`,
  and Open Graph/social meta on every page.
- In scope: full visual system, all copy slots (real copy where she has it, labeled placeholders
  where she doesn't), responsive behavior, contact form UX (including its no-backend constraint).
- Out of scope / anti-goals: no backend, no CMS, no blog, no multi-page marketing funnel, no
  invented client names/metrics/quotes, no reuse of the exact old logo file or old stock photography,
  no pricing table unless she supplies numbers.
- What must remain untouched: her real bio text, her real service descriptions, her real
  certifications list, her real tool list — these are hers to reuse, not to be rewritten into
  invented claims.

## 5. States and ranges

- **Quantified result / mini case study slot:** empty-state placeholder card ("Result coming
  soon — ask Nilda directly" or similar, non-fabricated) until she supplies a real number; full
  state shows one stat with context (metric, before/after or timeframe, one line of what she did).
- **Testimonials:** empty/placeholder state by default; the two existing chat screenshots may only
  render if Nilda confirms attribution (name + consent) — otherwise the section ships with a
  "testimonials coming soon" placeholder, never anonymous quotes presented as evidence.
- **Sample work:** each of the 3 items needs a real screenshot/image + caption; until supplied,
  render a labeled "sample coming soon" placeholder tile rather than a dead link.
- **Contact form:** idle, submitting/loading, success, error (network/service failure) states; a
  visible `mailto:` fallback is present regardless of form state.
- **Pricing:** hidden by default; the slot exists in code but does not render until real numbers
  are supplied.
- **404 page:** on-brand, in the same console/manifest language, with a way back to the main page.
- **Empty/loading states for images:** skeleton or solid-color placeholder while sample-work
  screenshots load, since this is a static export without an image-optimization service.

## 6. Interaction and layout

- Sticky anchor nav (logo/name + Results, Services, How I Work, Certifications, Sample Work,
  Testimonials, Contact), collapsing to a hamburger under ~768px; smooth-scroll to anchors.
- Section order (outcome/proof first, per Product Principle 1):
  1. Hero (headline, sub-line, primary + secondary CTA, headshot + credential tag)
  2. Proof strip (quantified-result slot + certification badges) — the signature reveal moment
  3. About/bio (verbatim bio, headshot, one line on who this is for)
  4. Services (the 8 existing services, framed as the pain-point questions they answer rather than
     a flat list — a copy technique, not new facts)
  5. How I work / tools (process + real tool list, styled as a console "stack" readout)
  6. Certifications / trainings (the 5 real trainings as a credentials manifest)
  7. Sample work (3 real items, screenshot + caption on-page, not bare file links)
  8. Testimonials (named quotes when supplied; placeholder otherwise)
  9. Pricing slot (hidden unless supplied)
  10. Contact (form + email fallback + LinkedIn + resume-download slot)
  11. Footer (her tagline, social links, copyright, link to `/privacy`)
- Hierarchy: proof and CTA outrank decoration everywhere; no section may bury the contact path
  below a fold of pure atmosphere.
- Feedback: button/link hover and focus states in signal orange or verified green depending on
  role; visible focus rings for keyboard use (WCAG AA).
- Responsive: mobile-first stacking, fluid type scale, hamburger nav; test the proof-strip reveal
  and manifest-style stat tiles specifically at phone width since they're the signature moment.

## 7. Constraints and open decisions

**Binding constraints:** static export (no server/API), Next.js + TypeScript + Tailwind, GitHub
Pages hosting, mobile-friendly, WCAG AA baseline (`ASSUMED`, see PRODUCT.md), no invented facts.

**A builder must not invent:** her name as shown, final headline copy, the quantified result, any
testimonial attribution, sample-work images/captions, pricing, resume file, exact hex values beyond
the palette roles above, GitHub Pages base path.

**Open decisions for Arnel (Mira to route):**

1. **Name conflict** — the old site and her email/LinkedIn say "Nilda Toraneo"; this repo's own
   `CLAUDE.md` says "Nilda Forbes." Which name goes on the site, and in the domain/repo metadata?
   This is the single highest-priority open item — it touches every page.
2. Services scope: Amazon-only (assumed) or add general admin VA services?
3. Contact method: real third-party form service + email fallback (assumed), or email-link only?
   If a form, which free service, and to what inbox?
4. Does she have any real quantified result to share (an ACoS/TACoS change, revenue growth, hours
   saved, listings improved)? Without one, the proof strip ships with an honest placeholder instead
   of a stat.
5. Testimonials: may the two existing chat-screenshot testimonials be attributed to named clients,
   or does she need to gather new named testimonials?
6. Sample work: can she supply real screenshots/images for the three existing samples (product
   research, supplier negotiation, optimized listing) with captions?
7. Logo/asset reuse: can the existing orange bar-chart/arrow mark and exact hex be reused, or should
   a new mark be designed within the same signal-orange family?
8. Pricing: supply real numbers, or leave the slot hidden indefinitely?
9. Resume: can she provide a current PDF for the download link?
10. Hosting: GitHub Pages project subpath vs. a custom domain — affects `basePath` and the site's
    canonical URL for OG/sitemap metadata.

## Beat the incumbent

Her current site (https://nildatoraneo.mystrikingly.com/) has three biggest weaknesses this brief
answers directly:

1. **No checkable proof — no results, no attributed testimonials, no visible sample work** (only
   bare "Access File" links). *Answered by:* an explicit proof-strip slot for a quantified result,
   a testimonials section that only ever shows attributed quotes (real or clearly pending), and
   sample work rendered on-page as captioned screenshots instead of blind download links.
2. **Generic, stock-photo, unfinished-template look with leftover placeholder text and a builder
   badge** — visually indistinguishable from every other Strikingly/Wix/Canva individual-VA site in
   this niche. *Answered by:* a committed ops-console/manifest visual world built from her real
   working tools rather than a generic template, her real headshot instead of stock desk photography,
   and no leftover placeholder or platform-badge chrome since this ships as a controlled static
   build.
3. **A generic, single-niche headline with no stated "who this is for" and no pricing signal at
   all.** *Answered by:* a verb-forward, mechanism-specific headline (final wording hers to
   approve), an explicit "who this is for" line in the About section, and a pricing slot that is
   honest about being hidden rather than silently absent.

## Brand assets found (with sources) and what is placeholder

| Asset | Source | Status |
|---|---|---|
| Bio copy (two paragraphs) | researcher report / her current site | Real, reusable verbatim |
| 8 service descriptions | her current site | Real, reusable verbatim |
| 5 training/certification names | her current site | Real |
| Tool list | her current site | Real |
| Footer tagline | her current site | Real, reusable verbatim |
| Email `nildatoraneo@gmail.com` | her current site | Real |
| LinkedIn URL | her current site | Real |
| Headshot photo | her current site (real photo, not stock) | Real; permission granted by Arnel; exact source file to be supplied by Nilda for production use |
| Orange bar-chart/arrow logo mark | her current site | **PERMISSION PENDING** — reuse of the exact file/hex not yet confirmed |
| Two client chat-screenshot testimonials | her current site | **PERMISSION PENDING** — unattributed; usable only with confirmed names + consent |
| 3 "Access File" sample-work files | her current site (links only, content unseen) | Placeholder — real screenshots/images needed from Nilda |
| Quantified result/case study | none exists | Placeholder only — must not be invented |
| Resume PDF | referenced on old site, file not supplied | Placeholder — needs sourcing |
| Named testimonials (new) | none yet | Placeholder — needs sourcing |
