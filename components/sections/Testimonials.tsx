import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** Stub: T3 replaces the body with the quotes. */
export function Testimonials() {
  return (
    <Section
      id="testimonials"
      title={navLabel(site, "testimonials")}
      tag={`${site.testimonials.length} quotes`}
    >
      <p className="text-text-on-paper-soft">Testimonials are being added.</p>
    </Section>
  );
}
