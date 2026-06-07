"use client";

import { CheckCircle2, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import { useLocale } from "@/i18n/locale-provider";
import type { ContactField } from "@/lib/contact/types";
import { validateContactSubmission } from "@/lib/contact/validation";

type SubmissionState = "idle" | "submitting" | "success" | "error";
type VisibleContactField = Exclude<ContactField, "website" | "locale">;

const visibleFields: VisibleContactField[] = [
  "name",
  "email",
  "company",
  "phone",
  "service",
  "challenge",
  "consent",
];

const fieldClassName =
  "min-h-12 w-full rounded-[10px] border border-line bg-background px-3.5 py-3 text-base text-foreground outline-none transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-muted/65 hover:border-line-strong focus:border-accent/70 focus:bg-surface focus:ring-2 focus:ring-accent/15 aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:focus:border-red-400 aria-[invalid=true]:focus:ring-red-400/15";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [configurationError, setConfigurationError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<VisibleContactField, string>>
  >({});
  const { dictionary: t, locale } = useLocale();

  function localizedErrors(
    errors: Partial<Record<ContactField, string>>,
  ): Partial<Record<VisibleContactField, string>> {
    return Object.fromEntries(
      visibleFields
        .filter((field) => errors[field])
        .map((field) => [field, t.contact.validation[field]]),
    );
  }

  function clearFieldError(field: VisibleContactField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

    const validation = validateContactSubmission(payload);
    if (!validation.ok) {
      setFieldErrors(localizedErrors(validation.errors));
      setSubmissionState("idle");
      const firstInvalidField = visibleFields.find(
        (field) => validation.errors[field],
      );
      if (firstInvalidField) {
        (
          event.currentTarget.elements.namedItem(
            firstInvalidField,
          ) as HTMLElement | null
        )?.focus();
      }
      return;
    }

    setFieldErrors({});
    setSubmissionState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: Partial<Record<ContactField, string>>;
      };

      if (!response.ok || !result.ok) {
        if (response.status === 400 && result.errors) {
          setFieldErrors(localizedErrors(result.errors));
        }
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
    disabled: submissionState === "submitting",
  };

  function validationProps(field: VisibleContactField) {
    const error = fieldErrors[field];
    return {
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      "aria-invalid": error ? true : undefined,
      className: fieldClassName,
      onChange: () => clearFieldError(field),
    };
  }

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

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-6 grid gap-5"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={t.contact.fields.name}
            htmlFor="contact-name"
            error={fieldErrors.name}
          >
            <input
              {...inputProps}
              {...validationProps("name")}
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
          <Field
            label={t.contact.fields.email}
            htmlFor="contact-email"
            error={fieldErrors.email}
          >
            <input
              {...inputProps}
              {...validationProps("email")}
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
          <Field
            label={t.contact.fields.company}
            htmlFor="contact-company"
            error={fieldErrors.company}
          >
            <input
              {...inputProps}
              {...validationProps("company")}
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
          <Field
            label={t.contact.fields.phone}
            htmlFor="contact-phone"
            error={fieldErrors.phone}
          >
            <input
              {...inputProps}
              {...validationProps("phone")}
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              pattern="\+?[0-9() .-]+"
              placeholder={t.contact.placeholders.phone}
            />
          </Field>
        </div>

        <Field
          label={t.contact.fields.service}
          htmlFor="contact-service"
          error={fieldErrors.service}
        >
          <select
            {...inputProps}
            {...validationProps("service")}
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

        <Field
          label={t.contact.fields.challenge}
          htmlFor="contact-challenge"
          error={fieldErrors.challenge}
        >
          <textarea
            {...inputProps}
            {...validationProps("challenge")}
            id="contact-challenge"
            name="challenge"
            rows={6}
            minLength={20}
            maxLength={2000}
            placeholder={t.contact.placeholders.challenge}
            required
            className={`${validationProps("challenge").className} min-h-36 resize-y`}
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
            aria-describedby={
              fieldErrors.consent ? "contact-consent-error" : undefined
            }
            aria-invalid={fieldErrors.consent ? true : undefined}
            onChange={() => clearFieldError("consent")}
            className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
          />
          <span>{t.contact.fields.consent}</span>
        </label>
        {fieldErrors.consent ? (
          <FieldError id="contact-consent-error">
            {fieldErrors.consent}
          </FieldError>
        ) : null}

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
  error,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
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
      {error ? <FieldError id={`${htmlFor}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p id={id} className="mt-2 text-sm leading-5 text-red-200">
      {children}
    </p>
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
