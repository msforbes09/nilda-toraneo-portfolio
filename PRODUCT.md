# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) with TypeScript, static export (`output: "export"`), Tailwind CSS, hosted on
GitHub Pages via GitHub Actions. No server, no API routes, no database. (Decided at intake, recorded
in this repo's `CLAUDE.md`.)

## Users

Small-to-mid Amazon FBA sellers and brand owners who need help running their Seller Central
account: listing optimization, PPC, inventory/supplier coordination, customer service, account
health. They find Nilda through outreach, referral, LinkedIn, or a direct link and land on this
site in a hiring/evaluation mindset — comparing her against other freelance Amazon VAs, skimming on
mobile or desktop, looking for checkable proof (results, tool fluency, certifications, real work
samples) before a discovery call. `ASSUMED`: audience is sellers/brand owners directly, not
agencies reselling her time — not stated by Arnel, inferred from her current site's framing
("your Amazon Store").

## Product Purpose

A professional portfolio site for Nilda, an Amazon Account Manager / Admin Virtual Assistant based
in the Philippines, that gets her hired. It replaces her current Strikingly site
(https://nildatoraneo.mystrikingly.com/). Success is a visitor either submitting the contact form
or emailing her directly to start a conversation about hiring her.

## Positioning

Unlike the template-driven individual-VA portfolios in her category (Strikingly/Wix/Canva one-pagers
with generic service cards and unattributed proof), this site backs every claim with checkable
evidence: real named credentials, real sample work shown on the page (not bare download links), and
room for a quantified result and named testimonials as soon as she supplies them. It reads as
operationally fluent — built around the actual tools and workflow of running an Amazon account —
rather than a generic "hire a VA" template.

## Operating Context

Hiring happens asynchronously: a prospect reads the site, then reaches out by form, email, or
LinkedIn before a discovery call and (if hired) an ongoing engagement with account access and
reporting. Nilda's real tool fluency (Seller Central, Helium 10, SellerAmp SAS, Keepa, Google
Trends, Photoshop/Illustrator/Canva, MS Office/Google Workspace, Hootsuite, Asana) is a trust
signal on this surface, not just a skills list.

## Capabilities and Constraints

- Static site only: no backend, no database, no server-side form processing. A contact form
  requires a third-party static-friendly form service (e.g. Formspree-class provider); a `mailto:`
  link is a required fallback either way. `ASSUMED`: a real contact form is wanted per intake's
  primary assumption; open decision for Arnel either way (see Evidence/Open Decisions).
- Must ship the standard meta pages: privacy policy, custom 404, sitemap.xml + robots.txt, and
  Open Graph/social meta (title, description, share image).
- Must be mobile-friendly (explicit requirement).
- No pricing shown unless Nilda supplies numbers; a slot exists but ships hidden/empty by default.
- GitHub Pages hosting: confirm whether this ships under a project subpath
  (`username.github.io/repo`) or a custom domain — affects Next.js `basePath`/`assetPrefix`.
  Undecided; flagged as an open decision.
- `ASSUMED`: WCAG AA is the accessibility baseline for a public professional site. Not explicitly
  requested; treated as standard practice rather than invented scope.

## Brand Commitments

- Identity permission: yes — Arnel confirmed Nilda's real name, photo, and personal/professional
  details may be used on the new site.
- Name shown on the site: `ASSUMED` "Nilda Toraneo" (matches her current site, her stated email
  `nildatoraneo@gmail.com`, and her LinkedIn `linkedin.com/in/nilda-toraneo/`). This conflicts with
  this repository's own title, "Nilda Forbes VA portfolio," and its `CLAUDE.md` header ("Professional
  static portfolio website for Nilda Forbes"). **This naming conflict must go to Arnel before
  launch** — it affects the domain-facing name, metadata, and every page's copy.
- Existing visual mark (orange bar-chart/arrow icon) and orange accent (~#E8952E) are evidence of
  her current identity, not a confirmed asset grant. Reusing the exact logo file or exact hex is
  `PERMISSION PENDING` until Arnel/Nilda confirm she owns it outright (Strikingly template origin
  is unverified). The orange hue itself is safe to carry forward as a starting palette signal per
  the intake brief.
- Reusable copy she already owns and has publicly published: her two-paragraph bio, footer tagline
  ("Empowering your business with tailored insights for smart decisions and steady growth."), and
  her eight service descriptions. Treated as hers to reuse verbatim or lightly edited, not to be
  replaced with invented claims.

## Evidence on Hand

- Bio (verbatim, reusable — see `design/brief.md` for full text).
- Trainings/certifications (real, named): Amazon Seller VA Masterclass, Freedom Ticket 3.0
  (Helium 10), Sponsored Ads Certification (My Amazon Guy), SEO Course, Amazon PPC Masterclass.
- Eight services with existing paragraph copy: Product Research, Inventory Management, Supplier
  Sourcing, PPC Campaigns, Graphic Design, Keyword Research, Product Listing Optimization, Customer
  Service.
- Tool list (real): Seller Central, Advertising Console, Helium 10, SellerAmp SAS, MBS Retriever,
  Keepa, Google Trends; Photoshop, Illustrator, Animate CC, Toon Boom Harmony, DaVinci Resolve,
  Canva; MS Office, Google Sheets/Docs, Hootsuite, Asana, Hubdoc.
- Contact: email `nildatoraneo@gmail.com`, LinkedIn `https://www.linkedin.com/in/nilda-toraneo/`,
  Skype (handle not captured).
- **Absent, must not be invented:** any quantified result (revenue growth, ACoS/TACoS/ROAS
  change, hours saved), named/attributed client testimonials, real client names, or case-study
  detail. Two unattributed chat-screenshot testimonials exist on the old site — usable on the new
  site only if Nilda confirms who said them and consents to attribution; until then they are
  `PERMISSION PENDING`. The three "Access File" sample-work links on the old site have unknown
  content — the new site needs actual screenshots/images of that work with real captions, not
  invented ones.
- Resume: referenced as a download on the old site; file itself not supplied here — open item.

## Product Principles

1. Lead with outcome and proof, not a features list — the hero and the section right after it
   carry checkable credibility before anything else.
2. Never invent a metric, client, or quote. Every claim ships either real or as a clearly labeled
   placeholder Nilda must fill.
3. Speak to what Amazon sellers actually vet for when hiring: results, tool fluency, reporting
   habits, account-health practice, and an easy next step — not certificates alone.
4. Every content gap becomes an explicit, labeled slot in the build, so Nilda can complete the
   site without a rebuild.
5. Beat the templated one-page-portfolio category this niche defaults to, not just her old site.

## Accessibility & Inclusion

`ASSUMED` WCAG AA as the baseline standard (contrast, keyboard nav, alt text, semantic headings)
for a public-facing professional site. Not explicitly requested by Arnel; no stricter requirement
known.
