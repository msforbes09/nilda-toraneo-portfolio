import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { PricingSlot } from "@/components/sections/PricingSlot";
import { Process } from "@/components/sections/Process";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Work } from "@/components/sections/Work";
import { StructuredData } from "@/components/StructuredData";

/** Section order per design/brief.md §6; the footer lives in the layout. */
export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <Hero />
      <ProofStrip />
      <About />
      <Services />
      <Process />
      <Certifications />
      <Work />
      <Testimonials />
      <PricingSlot />
      <Contact />
      <StructuredData />
    </main>
  );
}
