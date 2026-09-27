import Image from "next/image";
import { navLabel, withBasePath } from "@/content/helpers";
import { site } from "@/content/site";
import { Section } from "../Section";

/** The sample-work images are authored at this size (public/samples/*.svg). */
const IMAGE_WIDTH = 640;
const IMAGE_HEIGHT = 440;

/** Sample work shown in place, each tile framed like an inspected manifest page. */
export function Work() {
  return (
    <Section
      id="work"
      title={navLabel(site, "work")}
      tag={`${site.work.length} samples`}
    >
      <ul
        aria-labelledby="work-heading"
        className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
      >
        {site.work.map((item, i) => (
          <li key={item.title} className="flex flex-col">
            <div className="border border-paper-line bg-paper p-2">
              <p className="flex items-center justify-between gap-3 border-b border-paper-line px-1 pb-2 font-mono text-[0.6875rem] tracking-[0.12em] text-text-on-paper-soft uppercase">
                <span className="tabular-nums">
                  File {String(i + 1).padStart(2, "0")}
                </span>
                {item.sample && (
                  <span className="bg-signal px-1.5 py-0.5 text-[0.625rem] font-medium tracking-[0.14em] text-ink">
                    Sample
                  </span>
                )}
              </p>
              <Image
                src={withBasePath(item.image)}
                alt={item.alt}
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                unoptimized
                className="mt-2 aspect-[640/440] w-full bg-paper-deep"
              />
            </div>
            <h3 className="mt-5 font-display text-xl leading-snug font-bold tracking-[-0.015em] text-ink">
              {item.title}
            </h3>
            <p className="mt-2 max-w-[65ch] leading-relaxed text-text-on-paper">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
