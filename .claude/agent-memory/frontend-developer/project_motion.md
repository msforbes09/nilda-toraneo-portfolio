---
name: project-motion
description: How site motion is built (rest/armed/shown reveal, Motion under test) and the jsdom test seams and gotchas it needs
metadata:
  type: project
---

- Motion is progressive enhancement: SSR renders everything at rest (export HTML has
  `opacity:1;transform:none`, never `opacity:0`). `lib/use-scroll-reveal.ts` arms an element
  (dimmed start state) only if it is below the fold at mount, reveals on in-view, and returns
  `rest` with reduced motion. Hero entrance runs after mount via `useAnimate` and is skipped
  when `useReducedMotion()` (`lib/`) is true. Never use Motion's `initial` hidden states.
- `vitest.setup.ts` sets `MotionGlobalConfig.skipAnimations = true`: animations jump to their
  end, so tests assert start and end states, never timing. Without it a count-up test raced
  `waitFor`'s 1s timeout.
- Seams in `test/support/motion.ts`: `preferReducedMotion(bool)` (returns `change()`),
  `stubIntersection()` (returns `enterView()`), `placeBelowFold()`. The setup file's
  IntersectionObserver global is non-configurable: `vi.stubGlobal` throws "Cannot redefine
  property", so the helper assigns it and restores it in `onTestFinished`.
- `Number("")` is 0: to assert "dimmed", use `Number(el.style.opacity || "1") < 1`, or the
  check passes vacuously when no style was ever set.
- Don't run `prettier --write test/support` as a directory: it reformats the kit's hook
  fixtures (`run-hook.mjs`, `fixtures/`). Name files explicitly.

**Why:** learned building T5 (motion) of handoff 001, 2026-09-27.

**How to apply:** reuse the seams and the rest/armed/shown hook for any new animated piece; see
[[project-test-gotchas]].
