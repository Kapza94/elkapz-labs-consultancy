"use client";

import { CheckCircle2, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import { useLocale } from "@/i18n/locale-provider";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "min-h-12 w-full rounded-[10px] border border-line bg-background px-3.5 py-3 text-base text-foreground outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-muted/65 hover:border-line-strong focus:border-accent/70 focus:bg-surface focus:ring-2 focus:ring-accent/15";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [configurationError, setConfigurationError] = useState(false);
  const { dictionary: t, locale } = useLocale();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setConfigurationError(false);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      phone: String(form.get("phone") ?? ""),
      service: String(form.get("service") ?? ""),
      challenge: String(form.get("challenge") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
      locale,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setConfigurationError(result.error === "service_unavailable");
        setSubmissionState("error");
        return;
      }

      formRef.current?.reset();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  const inputProps = {
    className: fieldClassName,
    disabled: submissionState === "submitting",
  };

  return (
    <div className="rounded-[20px] border border-line-strong bg-surface-raised p-5 shadow-[0_24px_80px_rgba(0,0,0,.2)] sm:p-7">
      <div className="border-b border-line pb-6">
        <p className="eyebrow">Contact / 01</p>
        <h3 className="mt-4 text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-foreground">
          {t.contact.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          {t.contact.description}
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="mt-6 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.contact.fields.name} htmlFor="contact-name">
            <input
              {...inputProps}
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              placeholder={t.contact.placeholders.name}
              required
            />
          </Field>
          <Field label={t.contact.fields.email} htmlFor="contact-email">
            <input
              {...inputProps}
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder={t.contact.placeholders.email}
              required
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={t.contact.fields.company} htmlFor="contact-company">
            <input
              {...inputProps}
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              minLength={2}
              maxLength={120}
              placeholder={t.contact.placeholders.company}
              required
            />
          </Field>
          <Field label={t.contact.fields.phone} htmlFor="contact-phone">
            <input
              {...inputProps}
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder={t.contact.placeholders.phone}
            />
          </Field>
        </div>

        <Field label={t.contact.fields.service} htmlFor="contact-service">
          <select
            {...inputProps}
            id="contact-service"
            name="service"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {t.contact.services.prompt}
            </option>
            <option value="audit">{t.contact.services.audit}</option>
            <option value="launch">{t.contact.services.launch}</option>
            <option value="build">{t.contact.services.build}</option>
            <option value="automate">{t.contact.services.automate}</option>
            <option value="advisor">{t.contact.services.advisor}</option>
            <option value="unsure">{t.contact.services.unsure}</option>
          </select>
        </Field>

        <Field label={t.contact.fields.challenge} htmlFor="contact-challenge">
          <textarea
            {...inputProps}
            id="contact-challenge"
            name="challenge"
            rows={6}
            minLength={20}
            maxLength={2000}
            placeholder={t.contact.placeholders.challenge}
            required
            className={`${fieldClassName} min-h-36 resize-y`}
          />
        </Field>

        <div
          aria-hidden="true"
          className="absolute left-[-10000px] top-auto size-px overflow-hidden"
        >
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-left text-sm leading-6 text-muted-strong">
          <input
            name="consent"
            type="checkbox"
            required
            disabled={submissionState === "submitting"}
            className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span>{t.contact.fields.consent}</span>
        </label>

        <div aria-live="polite">
          {submissionState === "success" ? (
            <StatusMessage variant="success" message={t.contact.success} />
          ) : null}
          {submissionState === "error" ? (
            <StatusMessage
              variant="error"
              message={
                configurationError ? t.contact.unavailable : t.contact.error
              }
            />
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submissionState === "submitting"}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-accent bg-accent px-5 text-sm font-semibold text-ink transition-[background-color,border-color,transform,opacity] duration-150 ease-out hover:border-accent-strong hover:bg-accent-strong active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {submissionState === "submitting" ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />
          ) : (
            <Send aria-hidden="true" size={16} />
          )}
          {submissionState === "submitting"
            ? t.contact.submitting
            : t.contact.submit}
        </button>
        <p className="text-center text-xs leading-5 text-muted">
          {t.contact.privacy}
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function StatusMessage({
  variant,
  message,
}: {
  variant: "success" | "error";
  message: string;
}) {
  const Icon = variant === "success" ? CheckCircle2 : TriangleAlert;
  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm leading-5 ${
        variant === "success"
          ? "border-accent/30 bg-accent/[0.07] text-accent"
          : "border-red-400/30 bg-red-400/[0.07] text-red-200"
      }`}
    >
      <Icon aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
      {message}
    </p>
  );
}
