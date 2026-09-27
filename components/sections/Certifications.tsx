import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** Stub: T3 replaces the body with the credentials manifest. */
export function Certifications() {
  return (
    <Section
      id="certifications"
      title={navLabel(site, "certifications")}
      tag={`${site.certifications.length} certifications · ${site.trainings.length} training`}
    >
      <p className="text-text-on-paper-soft">Certifications are being added.</p>
    </Section>
  );
}
