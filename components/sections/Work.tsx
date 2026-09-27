import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** Stub: T3 replaces the body with the sample-work tiles. */
export function Work() {
  return (
    <Section
      id="work"
      title={navLabel(site, "work")}
      tag={`${site.work.length} samples`}
    >
      <p className="text-text-on-paper-soft">Sample work is being added.</p>
    </Section>
  );
}
