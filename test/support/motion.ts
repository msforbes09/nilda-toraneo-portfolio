import { onTestFinished, vi } from "vitest";

const reduceQuery = "(prefers-reduced-motion: reduce)";

/**
 * Makes `(prefers-reduced-motion: reduce)` match or not for this test, and
 * returns `change(next)` to fire the query's change event. Undo with
 * `vi.restoreAllMocks()`.
 */
export function preferReducedMotion(reduce: boolean) {
  let matches = reduce;
  const listeners = new Set<(event: { matches: boolean }) => void>();

  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        get matches() {
          return query === reduceQuery && matches;
        },
        media: query,
        onchange: null,
        addEventListener: (_type: string, listener: never) =>
          listeners.add(listener),
        removeEventListener: (_type: string, listener: never) =>
          listeners.delete(listener),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList,
  );

  return {
    change(next: boolean) {
      matches = next;
      listeners.forEach((listener) => listener({ matches: next }));
    },
  };
}

/**
 * Swaps in an IntersectionObserver whose targets enter the viewport only when
 * the test calls `enterView()`. Restored when the test finishes.
 */
export function stubIntersection() {
  const observers: IntersectionObserverStub[] = [];

  class IntersectionObserverStub {
    readonly targets = new Set<Element>();
    constructor(readonly callback: IntersectionObserverCallback) {
      observers.push(this);
    }
    observe(target: Element) {
      this.targets.add(target);
    }
    unobserve(target: Element) {
      this.targets.delete(target);
    }
    disconnect() {
      this.targets.clear();
    }
  }

  // vitest.setup.ts defines the global non-configurable, so assign, not stub.
  const original = window.IntersectionObserver;
  window.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
  onTestFinished(() => {
    window.IntersectionObserver = original;
  });

  return {
    enterView() {
      for (const observer of observers) {
        const entries = [...observer.targets].map(
          (target) => ({ target, isIntersecting: true }) as never,
        );
        if (entries.length > 0) observer.callback(entries, observer as never);
      }
    },
  };
}

/** Puts every element below the first viewport, as on a fresh page load. */
export function placeBelowFold() {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top: window.innerHeight + 400,
    bottom: window.innerHeight + 600,
    left: 0,
    right: 0,
    width: 0,
    height: 200,
    x: 0,
    y: window.innerHeight + 400,
    toJSON: () => ({}),
  });
}
