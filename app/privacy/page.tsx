import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

const { person } = site;

export const metadata: Metadata = {
  title: "Privacy Policy — Nilda Toraneo",
  description:
    "How this site handles the information you send through its contact form, and who to ask about it.",
};

export default function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <section className="bg-paper px-5 pt-24 pb-20 text-text-on-paper sm:px-8 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-3 md:mb-14">
            <h1 className="font-display text-[clamp(1.875rem,1.4rem+2vw,3rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
              Privacy policy
            </h1>
            <span
              aria-hidden="true"
              className="hidden h-px min-w-12 flex-1 self-center bg-paper-line sm:block"
            />
            <span className="font-mono text-xs tracking-[0.14em] text-text-on-paper-soft uppercase">
              {person.name}
            </span>
          </header>

          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              This is a placeholder policy: real text, but sample copy pending{" "}
              {person.name}&apos;s review before it goes live.
            </p>

            <section>
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">
                What this site collects
              </h2>
              <p className="mt-3">
                The only information this site collects is what you choose to
                type into the contact form: your name, your email address and
                your message. There is no other tracking on this site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">
                Where it goes
              </h2>
              <p className="mt-3">
                This site is a static export with no server and no database.
                When you submit the contact form, your name, email and message
                are sent directly from your browser to a third-party form
                service (a free service such as Formspree or equivalent; the
                exact provider is not yet chosen), which forwards them to{" "}
                {person.name}&apos;s inbox. That service stores the submission
                on its own systems under its own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">
                Cookies
              </h2>
              <p className="mt-3">
                This site itself sets no cookies and runs no analytics.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">
                Questions
              </h2>
              <p className="mt-3">
                For any privacy question, email{" "}
                <a
                  href={`mailto:${person.email}`}
                  className="underline decoration-paper-line underline-offset-4 hover:decoration-signal"
                >
                  {person.email}
                </a>
                .
              </p>
            </section>

            <p>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center underline decoration-paper-line underline-offset-4 hover:decoration-signal"
              >
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
