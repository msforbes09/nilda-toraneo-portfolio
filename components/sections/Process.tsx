import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

const toolCount = site.tools.reduce(
  (sum, group) => sum + group.tools.length,
  0,
);

/** Stub: T3 replaces the body with the process steps and the tool stack. */
export function Process() {
  return (
    <Section
      id="process"
      title={navLabel(site, "process")}
      tag={`${site.process.steps.length} steps · ${toolCount} tools`}
      tone="ink"
    >
      <p className="text-text-on-ink-soft">
        The process and tool stack are being added.
      </p>
    </Section>
  );
}
