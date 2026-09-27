import { formatIssued, navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

const { certifications, trainings } = site;

/** Credentials manifest: verified certifications, then training on its own line. */
export function Certifications() {
  return (
    <Section
      id="certifications"
      title={navLabel(site, "certifications")}
      tag={`${certifications.length} certifications · ${trainings.length} training`}
    >
      <ul
        aria-labelledby="certifications-heading"
        className="grid border-t-2 border-ink md:grid-cols-2 md:gap-x-12"
      >
        {certifications.map((cert) => (
          <li
            key={cert.name}
            className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-x-4 border-b border-paper-line py-6"
          >
            <VerifiedSeal />
            <div>
              <p className="font-display text-xl leading-snug font-bold tracking-[-0.015em] text-ink">
                {cert.name}
              </p>
              <p className="mt-1 text-[0.9375rem] text-text-on-paper">
                {cert.issuer}
              </p>
              <p className="mt-3 inline-block border border-verified px-2 py-0.5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-verified uppercase tabular-nums">
                {formatIssued(cert.issued)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-x-4 gap-y-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-baseline">
        <p
          id="certifications-training-label"
          className="font-mono text-xs tracking-[0.14em] text-text-on-paper-soft uppercase"
        >
          Training
        </p>
        <ul aria-labelledby="certifications-training-label">
          {trainings.map((training) => (
            <li
              key={training.name}
              className="flex items-center gap-3 border-y border-dashed border-paper-line py-3 text-[1.0625rem] font-medium text-ink"
            >
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 border border-ink"
              />
              {training.name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** A drawn stamp-style seal with a check: the credential mark. */
function VerifiedSeal() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 36"
      className="size-9 text-verified"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="18" cy="18" r="16.5" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="12.5" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M12.5 18.5l3.75 3.75 7.25-8" strokeWidth="2.25" />
    </svg>
  );
}
