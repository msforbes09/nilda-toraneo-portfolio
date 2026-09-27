import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** Stub: T4 replaces the body with the form, email, LinkedIn and resume slot. */
export function Contact() {
  return (
    <Section
      id="contact"
      title={navLabel(site, "contact")}
      tag="Email · LinkedIn"
    >
      <p className="text-text-on-paper-soft">
        The contact form is being added.
      </p>
    </Section>
  );
}
