import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** "SVC-01": the service's line code on the manifest. */
function lineCode(index: number): string {
  return `SVC-${String(index + 1).padStart(2, "0")}`;
}

/**
 * The eight services as manifest lines: a line code and the service name on
 * the left, the seller's question and her description on the right.
 */
export function Services() {
  return (
    <Section
      id="services"
      title={navLabel(site, "services")}
      tag={`${site.services.length} services`}
    >
      <ol aria-labelledby="services-heading" className="border-t-2 border-ink">
        {site.services.map((service, i) => (
          <li
            key={service.name}
            className="group relative grid gap-x-10 gap-y-3 border-b border-paper-line py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:py-10"
          >
            {/* Hover scans the manifest line: its rule fills in signal orange. */}
            <span
              aria-hidden="true"
              className="absolute -bottom-px left-0 h-0.5 w-0 bg-signal transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
            />
            <p className="flex items-baseline gap-3 font-mono text-xs tracking-[0.12em] uppercase md:flex-col md:gap-2">
              <span className="text-text-on-paper-soft tabular-nums transition-colors duration-200 group-hover:text-ink">
                {lineCode(i)}
              </span>
              <span className="font-medium text-ink">{service.name}</span>
            </p>
            <div>
              <h3 className="max-w-[30ch] font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-ink">
                {service.question}
              </h3>
              <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-text-on-paper md:text-[1.0625rem]">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
