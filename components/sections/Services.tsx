import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** Stub: T3 replaces the body with the eight services. */
export function Services() {
  return (
    <Section
      id="services"
      title={navLabel(site, "services")}
      tag={`${site.services.length} services`}
    >
      <p className="text-text-on-paper-soft">Services are being added.</p>
    </Section>
  );
}
