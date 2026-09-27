import type { PricingTier } from "@/content/site";
import { site } from "@/content/site";
import { Section } from "../Section";

/**
 * The pricing slot ships hidden: it renders nothing until Nilda supplies real
 * tiers in `site.pricing.tiers`, then a rate card per tier.
 */
export function PricingSlot({
  tiers = site.pricing.tiers,
}: {
  tiers?: PricingTier[];
}) {
  if (tiers.length === 0) return null;

  return (
    <Section
      id="pricing"
      title="Pricing"
      tag={`${tiers.length} ${tiers.length === 1 ? "rate" : "rates"}`}
    >
      <ul
        aria-labelledby="pricing-heading"
        className="grid border-t-2 border-ink md:grid-cols-2 lg:grid-cols-3"
      >
        {tiers.map((tier, i) => {
          const nameId = `pricing-tier-${i}`;
          return (
            <li
              key={tier.name}
              aria-labelledby={nameId}
              className="flex flex-col border-b border-paper-line py-7 md:px-6 md:first:pl-0"
            >
              <p
                id={nameId}
                className="font-mono text-xs font-medium tracking-[0.14em] text-text-on-paper-soft uppercase"
              >
                {tier.name}
              </p>
              <p className="mt-3 font-display text-[1.875rem] leading-tight font-bold tracking-[-0.02em] text-ink tabular-nums">
                {tier.price}
              </p>
              <ul className="mt-5 space-y-2 border-t border-paper-line pt-5">
                {tier.includes.map((line) => (
                  <li key={line} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 bg-verified"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
