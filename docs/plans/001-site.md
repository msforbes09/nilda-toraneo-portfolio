# Plan: handoff 001 — site

Spec: `handoff/001-site/HANDOFF.md` (requirements, threat model, done-when). Design contract:
`design/brief.md`, `PRODUCT.md`. Data: `handoff/001-site/content.md`. Approved by Mira on
2026-09-27 (Motion for animation, SVG mock-UIs for sample work, Opus developer / Sonnet reviewer).

Handoff risk tier: low (static export, no server). UI tasks are reviewed at medium (standard
depth) because the handoff asks for the skeptic-reviewer explicitly.

| #   | Task                                                                                           | Tier   | Side     | Parallel-safe |
| --- | ---------------------------------------------------------------------------------------------- | ------ | -------- | ------------- |
| T0  | Toolchain: dev-kit commit on develop, worktree, Next.js scaffold (static export), Vitest, scripts, env example, fonts + tokens, deploy workflow, headshot, surface brief, repo + Pages | low    | frontend | no            |
| T1  | Content model `content/site.ts` with `sample: true` flags and helpers (`sampleEntries`, `withBasePath`, `formatIssued`) | medium | frontend | no            |
| T2  | Page shell: layout + metadata, sticky anchor nav with hamburger, 11 section anchors in order, Hero, Proof strip, About, Footer (static) | medium | frontend | no            |
| T3  | Body sections: Services, How I work + tools, Certifications, Sample work, Testimonials, Pricing slot | medium | frontend | yes           |
| T4  | Contact: reducer state machine, hook, form with idle/submitting/success/error and empty-endpoint fallback, email/LinkedIn/resume slot | medium | frontend | yes           |
| T5  | Motion: hero entrance, proof-strip stagger + count-up, section reveals, micro-interactions, reduced motion | medium | frontend | no            |
| T6  | Meta pages: /privacy, not-found, sitemap, robots, OG image, favicon                              | low    | frontend | yes           |

Order: T0 → T1 → T2 → first Pages dispatch → T3 + T4 + T6 (parallel worktrees, merged in plan
order) → T5 → reviews → impeccable detect/polish/finish review/DESIGN.md → browser check →
Lighthouse → final dispatch → RESULT.md → /ship.

Reviews: skeptic-reviewer at standard depth, round A after T2 (T1+T2 diff) and round B after T5
(T3–T6 diff), findings reported on the Spec and Correctness axes per the handoff.
