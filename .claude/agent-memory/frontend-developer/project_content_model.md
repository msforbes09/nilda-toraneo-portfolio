---
name: project-content-model
description: How placeholder/sample data and copy-to-approve flags work in content/site.ts, and the gotchas around them
metadata:
  type: project
---

All copy lives in `content/site.ts`; components read only from it. Placeholder items carry
`sample: true` (type `Sample<T>`); drafted copy carries `copyToApprove: true`. `sampleEntries(site)`
in `content/helpers.ts` walks the whole object generically, so any new `sample: true` item shows up
there automatically, and its test pins the exact list (8 paths as of handoff 001).

**Why:** handoff 001 requires every placeholder be flagged and listed in the file's top comment so
Nilda (the client) can replace them; never present sample numbers or quotes as real.

**How to apply:** when adding a placeholder item, flag it `sample: true`, add it to the top comment
AND to the expected list in `content/helpers.test.ts`. Asset paths in content are root-relative;
wrap them with `withBasePath()` in components (GitHub Pages serves under `/nilda-portfolio`).
Real items with a `sample` field (proof tiles) use `sample: false`.
