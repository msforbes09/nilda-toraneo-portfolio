import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { StructuredData } from "./StructuredData";

type Node = Record<string, unknown> & { "@type": string };

function readGraph(): Node[] {
  const { container } = render(<StructuredData />);
  const script = container.querySelector('script[type="application/ld+json"]');
  const data = JSON.parse(script?.textContent ?? "");

  expect(data["@context"]).toBe("https://schema.org");
  return data["@graph"];
}

describe("StructuredData", () => {
  it("describes Nilda as a schema.org Person", () => {
    const person = readGraph().find((node) => node["@type"] === "Person");

    expect(person).toMatchObject({
      name: site.person.name,
      jobTitle: site.person.title,
      url: site.meta.siteUrl,
      sameAs: [site.person.linkedin],
      email: site.person.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Alfonso",
        addressRegion: "Calabarzon",
        addressCountry: "PH",
      },
    });
  });

  it("lists her eight services with her as the provider", () => {
    const service = readGraph().find((node) => node["@type"] === "Service");

    expect(service).toMatchObject({
      provider: { "@type": "Person", name: site.person.name },
      serviceType: [
        "Product Research",
        "Inventory Management",
        "Supplier Sourcing",
        "PPC Campaigns",
        "Graphic Design",
        "Keyword Research",
        "Product Listing Optimization",
        "Customer Service",
      ],
    });
  });
});
