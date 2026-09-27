import { formatRange, navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

const { about, experience } = site;

export function About() {
  return (
    <Section
      id="about"
      title={`${navLabel(site, "about")} ${site.person.name}`}
      tag={`${experience.length} roles on file`}
    >
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          {about.bio.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                i === 0
                  ? "max-w-[34ch] font-display text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] leading-snug font-medium tracking-[-0.015em] text-ink"
                  : "mt-6 max-w-[65ch] text-lg leading-relaxed text-text-on-paper"
              }
            >
              {paragraph}
            </p>
          ))}
          <p className="mt-10 inline-flex -rotate-1 items-center gap-2.5 border-2 border-ink px-3.5 py-2 font-mono text-xs font-medium tracking-[0.12em] text-ink uppercase">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            {about.audience}
          </p>
        </div>

        <table className="w-full self-start border-t-2 border-ink text-left">
          <caption className="mb-3 text-left font-mono text-xs tracking-[0.14em] text-text-on-paper-soft uppercase">
            Experience
          </caption>
          <thead>
            <tr className="border-b border-paper-line font-mono text-[0.6875rem] tracking-[0.12em] text-text-on-paper-soft uppercase">
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Role
              </th>
              <th scope="col" className="py-2.5 pr-4 font-normal">
                Employer
              </th>
              <th scope="col" className="py-2.5 font-normal">
                Dates
              </th>
            </tr>
          </thead>
          <tbody>
            {experience.map((job) => (
              <tr
                key={`${job.employer}-${job.start}`}
                className="border-b border-paper-line align-top"
              >
                <th
                  scope="row"
                  className="py-4 pr-4 text-[0.9375rem] leading-snug font-semibold text-ink"
                >
                  {job.role}
                </th>
                <td className="py-4 pr-4 text-[0.9375rem] leading-snug">
                  {job.employer}
                  {job.detail && (
                    <span className="mt-1 block text-sm text-text-on-paper-soft">
                      {job.detail}
                    </span>
                  )}
                </td>
                <td className="py-4 font-mono text-xs leading-relaxed text-text-on-paper-soft tabular-nums">
                  {formatRange(job.start, job.end)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
