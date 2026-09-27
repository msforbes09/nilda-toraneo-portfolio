"use client";

import { type FormEvent, type ReactNode, useEffect, useRef } from "react";
import { navLabel, withBasePath } from "@/content/helpers";
import { site } from "@/content/site";
import type { ContactField, ContactState } from "@/lib/contact-form";
import { useContactForm } from "@/lib/use-contact-form";
import { Section } from "../Section";

const { person, resume } = site;
const mailto = `mailto:${person.email}`;
const linkedinPath = new URL(person.linkedin).pathname.replace(/\/$/, "");

export function Contact() {
  const form = useContactForm();

  return (
    <Section
      id="contact"
      title={navLabel(site, "contact")}
      tag={form.enabled ? "Form · Email · LinkedIn" : "Email · LinkedIn"}
    >
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <DirectLines />
        <IntakeForm {...form} />
      </div>
    </Section>
  );
}

const rowLabel =
  "font-mono text-[0.6875rem] tracking-[0.14em] text-text-on-paper-soft uppercase";
const rowValue =
  "text-ink underline decoration-paper-line decoration-1 underline-offset-[5px] transition-colors duration-150 group-hover:decoration-signal-deep";
const rowLink =
  "group grid min-h-14 grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 py-3";

/** The ways to reach her that never depend on the form. */
function DirectLines() {
  return (
    <div>
      <p className="max-w-[30ch] font-display text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] leading-snug font-medium tracking-[-0.015em] text-ink">
        Tell me about your store and where you need a hand.
      </p>
      <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-text-on-paper">
        Use the form, or reach me directly on any line below.
      </p>

      <ul className="mt-10 border-t-2 border-ink">
        <li className="border-b border-paper-line">
          <a href={mailto} className={rowLink}>
            <span className={rowLabel}>Email</span>{" "}
            <span className={`${rowValue} break-all`}>{person.email}</span>
          </a>
        </li>
        <li className="border-b border-paper-line">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={rowLink}
          >
            <span className={rowLabel}>LinkedIn</span>{" "}
            <span className={rowValue}>
              {linkedinPath}
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </li>
        <li className="border-b border-paper-line">
          <a href={withBasePath(resume.href)} className={rowLink}>
            <span className={rowLabel}>Resume</span>{" "}
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className={rowValue}>{resume.label}</span>{" "}
              {resume.sample && <SampleTag />}
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}

function SampleTag() {
  return (
    <span className="border border-ink px-1.5 py-0.5 font-mono text-[0.625rem] leading-none font-medium tracking-[0.14em] text-ink uppercase">
      Sample
    </span>
  );
}

type IntakeFormProps = {
  state: ContactState;
  enabled: boolean;
  change: (field: ContactField, value: string) => void;
  submit: (honeypot: string) => ContactState;
  retry: () => void;
};

const fieldOrder: ContactField[] = ["name", "email", "message"];

const readouts: Record<ContactState["status"], string> = {
  idle: "Ready",
  invalid: "Check fields",
  submitting: "Sending",
  success: "Delivered",
  error: "Not sent",
};

function IntakeForm({
  state,
  enabled,
  change,
  submit,
  retry,
}: IntakeFormProps) {
  const { status, values, errors } = state;
  const panelRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const previousStatus = useRef(status);

  // Keyboard and screen-reader users land on whatever replaced the button.
  useEffect(() => {
    const previous = previousStatus.current;
    previousStatus.current = status;
    if (status === "success" || status === "error") panelRef.current?.focus();
    else if (status === "idle" && previous === "error")
      sendRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <div
        ref={panelRef}
        role="status"
        tabIndex={-1}
        className="self-start border-2 border-verified bg-paper p-6 sm:p-8"
      >
        <p className="flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.14em] text-verified uppercase">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-verified ring-2 ring-verified/25"
          />
          Delivered
        </p>
        <p className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] text-ink">
          Message sent.
        </p>
        <p className="mt-2 max-w-[48ch] text-lg leading-relaxed text-text-on-paper">
          Thank you for reaching out. I&rsquo;ll reply to the email address you
          gave.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const honeypot = new FormData(form).get("company");
    const next = submit(typeof honeypot === "string" ? honeypot : "");
    const firstInvalid = fieldOrder.find((field) => next.errors[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    }
  }

  return (
    <form
      aria-label="Contact form"
      noValidate
      onSubmit={onSubmit}
      className="self-start border border-text-on-paper-soft/50 bg-paper-deep/50"
    >
      <p className="flex items-center justify-between gap-4 border-b border-text-on-paper-soft/30 px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-text-on-paper-soft uppercase sm:px-7">
        <span>New enquiry</span>
        <span aria-hidden="true" className="flex items-center gap-2">
          <span
            className={`size-1.5 ${enabled ? "bg-signal-deep" : "bg-text-on-paper-soft"}`}
          />
          {enabled ? readouts[status] : "Offline"}
        </span>
      </p>

      <div className="p-5 sm:p-7">
        {!enabled && <OfflineNote />}

        <fieldset
          disabled={!enabled || submitting || status === "error"}
          className="grid gap-6 sm:grid-cols-2"
        >
          <legend className="sr-only">Send a message</legend>
          <Field id="name" label="Name" error={errors.name}>
            {(props) => (
              <input
                {...props}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => change("name", e.target.value)}
              />
            )}
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            {(props) => (
              <input
                {...props}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => change("email", e.target.value)}
              />
            )}
          </Field>
          <Field id="message" label="Message" error={errors.message} wide>
            {(props) => (
              <textarea
                {...props}
                rows={6}
                value={values.message}
                onChange={(e) => change("message", e.target.value)}
              />
            )}
          </Field>

          {/* Honeypot: people never see or reach it; bots that fill it get a fake success. */}
          <div aria-hidden="true" className="sr-only">
            <label htmlFor="contact-company">Company (leave empty)</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {status !== "error" && (
            <div className="sm:col-span-2">
              <button
                ref={sendRef}
                type="submit"
                aria-busy={submitting || undefined}
                className={`group inline-flex min-h-14 items-center gap-3 px-7 font-display text-base font-bold transition-[background-color,scale] duration-150 enabled:active:scale-[0.97] ${
                  submitting
                    ? "cursor-progress bg-signal text-ink"
                    : "bg-signal text-ink hover:bg-[#f2a54a] disabled:cursor-not-allowed disabled:bg-paper-line disabled:text-text-on-paper-soft"
                }`}
              >
                {submitting ? "Sending…" : "Send message"}
                <ArrowIcon />
              </button>
            </div>
          )}
        </fieldset>

        {status === "error" && (
          <div
            ref={panelRef}
            role="alert"
            tabIndex={-1}
            className="mt-6 border-2 border-ink bg-paper p-5"
          >
            <p className="font-display text-lg font-bold text-ink">
              Your message didn&rsquo;t send.
            </p>
            <p className="mt-1.5 max-w-[56ch] leading-relaxed text-text-on-paper">
              The form service didn&rsquo;t accept it, or the connection
              dropped. Your text is kept: try again, or email me at{" "}
              <a
                href={mailto}
                className="break-all text-ink underline decoration-signal-deep underline-offset-4"
              >
                {person.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 inline-flex min-h-12 items-center border-2 border-ink px-5 font-display font-bold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

/** Shown when no form endpoint is configured: the form can't send. */
function OfflineNote() {
  return (
    <p
      role="note"
      className="tone-ink mb-7 bg-ink px-5 py-4 leading-relaxed text-text-on-ink"
    >
      <span className="mb-1.5 flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.14em] text-text-on-ink-soft uppercase">
        <span aria-hidden="true" className="size-1.5 bg-signal" />
        Form offline
      </span>
      The message form isn&rsquo;t connected yet, so it can&rsquo;t send. Email
      me at{" "}
      <a
        href={mailto}
        className="font-semibold break-all text-text-on-ink underline decoration-signal underline-offset-4"
      >
        {person.email}
      </a>{" "}
      and I&rsquo;ll reply from there.
    </p>
  );
}

type ControlProps = {
  id: string;
  name: ContactField;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
  className: string;
};

const controlClass =
  "mt-2 block w-full rounded-none border border-text-on-paper-soft bg-paper px-3.5 py-3 text-base text-ink transition-colors duration-150 hover:border-ink aria-invalid:border-signal-deep aria-invalid:shadow-[inset_0_0_0_1px_var(--signal-deep)] disabled:cursor-not-allowed disabled:opacity-60";

function Field({
  id,
  label,
  error,
  wide = false,
  children,
}: {
  id: ContactField;
  label: string;
  error: string | undefined;
  wide?: boolean;
  children: (props: ControlProps) => ReactNode;
}) {
  const controlId = `contact-${id}`;
  const errorId = `${controlId}-error`;

  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={controlId}
        className="font-mono text-xs font-medium tracking-[0.14em] text-text-on-paper uppercase"
      >
        {label}
      </label>
      {children({
        id: controlId,
        name: id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        className: `${controlClass}${wide ? " min-h-36 resize-y" : " min-h-12"}`,
      })}
      {error && (
        <p
          id={errorId}
          className="mt-2 flex items-center gap-2 text-sm font-medium text-ink"
        >
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 bg-signal-deep"
          />
          {error}
        </p>
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      className="transition-transform duration-200 ease-out group-enabled:group-hover:translate-x-1"
    >
      <path d="M3 9h11M10 4.5L14.5 9 10 13.5" />
    </svg>
  );
}
