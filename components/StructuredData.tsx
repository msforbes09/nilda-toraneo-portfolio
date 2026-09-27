import { site } from "@/content/site";

const { person, meta, services } = site;

/** schema.org description of Nilda and her services, built only from `site`. */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: person.name,
      jobTitle: person.title,
      url: meta.siteUrl,
      email: person.email,
      sameAs: [person.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: person.address.locality,
        addressRegion: person.address.region,
        addressCountry: person.address.countryCode,
      },
    },
    {
      "@type": "Service",
      name: person.title,
      serviceType: services.map((service) => service.name),
      provider: { "@type": "Person", name: person.name },
    },
  ],
};

// `<` escaped so the JSON can never close the script element early.
const json = JSON.stringify(graph).replace(/</g, "\\u003c");

/**
 * JSON-LD for search engines. The one sanctioned `dangerouslySetInnerHTML`:
 * the payload is JSON.stringify'd from the repo's own content, never from
 * visitor input.
 */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
