import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

const { process, tools } = site;

const toolCount = tools.reduce((sum, group) => sum + group.tools.length, 0);

const monoLabel =
  "font-mono text-[0.6875rem] tracking-[0.14em] text-text-on-ink-soft uppercase";

/** How she works (three ordered steps) beside the tool stack readout. */
export function Process() {
  return (
    <Section
      id="process"
      title={navLabel(site, "process")}
      tag={`${process.steps.length} steps · ${toolCount} tools`}
      tone="ink"
    >
      <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <p id="process-steps-label" className={monoLabel}>
            Steps
          </p>
          <ol aria-labelledby="process-steps-label" className="mt-6">
            {process.steps.map((step, i) => (
              <li
                key={step.title}
                className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-6 pb-12 last:pb-0"
              >
                {i < process.steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-12 bottom-0 left-6 w-px bg-ink-line"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center border border-text-on-ink/40 bg-ink font-mono text-lg font-medium text-signal tabular-nums"
                >
                  {i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] text-text-on-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[58ch] leading-relaxed text-text-on-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="self-start border border-text-on-ink/25">
          <p className="flex items-baseline justify-between gap-4 border-b border-text-on-ink/25 px-5 py-3">
            <span className={monoLabel}>Tool stack</span>
            <span className={`${monoLabel} tabular-nums`}>
              {toolCount} running
            </span>
          </p>
          {tools.map((group, i) => {
            const labelId = `tools-group-${i}`;
            return (
              <div
                key={group.name}
                className="grid gap-x-6 gap-y-3 border-b border-text-on-ink/15 px-5 py-5 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
              >
                <p
                  id={labelId}
                  className="font-mono text-xs font-medium tracking-[0.12em] text-text-on-ink uppercase"
                >
                  {group.name}
                </p>
                <ul
                  aria-labelledby={labelId}
                  className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.8125rem] leading-snug text-text-on-ink-soft"
                >
                  {group.tools.map((tool) => (
                    <li key={tool} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 bg-verified"
                      />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
