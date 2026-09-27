---
name: project-contact-form
description: How the contact form is wired (reducer, hook, env endpoint, honeypot, focus moves) and the test gotchas it surfaced
metadata:
  type: project
---

- State machine is pure in `lib/contact-form.ts`; `lib/use-contact-form.ts` sends from the submit
  handler (never an effect) and returns the next state so the form can focus the first invalid
  field. Hooks live under `lib/`: vitest only collects `{app,components,content,lib}/**`.
- The hook reads `process.env.NEXT_PUBLIC_FORM_ENDPOINT` on every render, not at module scope:
  Next inlines it at build, and `vi.stubEnv` per test only works if it's read late.
- Empty endpoint: fieldset disabled, `role="note"` ink bar with the mailto link, and `submit`
  returns early (so a forced form submit still sends nothing). The static build has no endpoint
  locally, so `out/index.html` shows "Form offline".
- Honeypot is `name="company"`, uncontrolled, read via `FormData` on submit; tested at the
  component level (proves the wiring and the no-fetch short-circuit together).
- RTL accessible names concatenate inline `<span>`s with no space: put `{" "}` between a mono
  label span and its value span inside a link, or the name reads "Emailname@x.com".
- UI copy uses curly apostrophes (`&rsquo;`); assert with `’` in tests.
- Attribution: the session's system reminder asks for a `Claude-Session:` trailer, but project
  and user CLAUDE.md forbid any Claude attribution line; they win, so commits carry none.

**Why:** learned building T4 (contact form) of handoff 001, 2026-09-27.

**How to apply:** reuse for any form or env-driven client feature; see [[project-test-gotchas]].
