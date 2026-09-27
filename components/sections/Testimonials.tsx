import { navLabel } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** Client quotes as annotated notes on the manifest, each tagged while it is a sample. */
export function Testimonials() {
  return (
    <Section
      id="testimonials"
      title={navLabel(site, "testimonials")}
      tag={`${site.testimonials.length} quotes`}
    >
      <ul
        aria-labelledby="testimonials-heading"
        className="grid gap-x-12 gap-y-14 lg:grid-cols-2"
      >
        {site.testimonials.map((testimonial, i) => (
          <li key={testimonial.name} className={i % 2 === 1 ? "lg:mt-20" : ""}>
            <figure className="border-t-2 border-ink">
              <p className="flex items-center justify-between gap-3 border-b border-paper-line py-2.5 font-mono text-[0.6875rem] tracking-[0.12em] text-text-on-paper-soft uppercase">
                <span className="tabular-nums">
                  Note {String(i + 1).padStart(2, "0")}
                </span>
                {testimonial.sample && (
                  <span className="bg-signal px-1.5 py-0.5 text-[0.625rem] font-medium tracking-[0.14em] text-ink">
                    Sample
                  </span>
                )}
              </p>
              <blockquote className="mt-6 max-w-[40ch] font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] leading-snug font-medium tracking-[-0.015em] text-ink">
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption className="mt-6 font-mono text-xs leading-relaxed tracking-[0.04em] text-text-on-paper-soft">
                {testimonial.attribution}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
