import {
  contactServices,
  type ContactField,
  type ContactSubmission,
  type ContactValidationResult,
} from "./types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9()\s.-]+$/;

function valueAsString(input: Record<string, unknown>, field: ContactField) {
  const value = input[field];
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(
  input: unknown,
): ContactValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: { name: "Invalid submission." } };
  }

  const values = input as Record<string, unknown>;
  const name = valueAsString(values, "name");
  const email = valueAsString(values, "email").toLowerCase();
  const company = valueAsString(values, "company");
  const phone = valueAsString(values, "phone");
  const service = valueAsString(values, "service");
  const challenge = valueAsString(values, "challenge");
  const website = valueAsString(values, "website");
  const locale = valueAsString(values, "locale");
  const errors: Partial<Record<ContactField, string>> = {};

  if (name.length < 2 || name.length > 100) {
    errors.name = "Name must contain 2 to 100 characters.";
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (company.length < 2 || company.length > 120) {
    errors.company = "Company must contain 2 to 120 characters.";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (
    phone.length > 0 &&
    (phone.length > 40 ||
      !phonePattern.test(phone) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15)
  ) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!contactServices.includes(service as ContactSubmission["service"])) {
    errors.service = "Select a valid service.";
  }
  if (challenge.length < 20 || challenge.length > 2000) {
    errors.challenge = "Message must contain 20 to 2,000 characters.";
  }
  if (values.consent !== true) {
    errors.consent = "Consent is required.";
  }
  if (locale !== "en" && locale !== "sr-Latn") {
    errors.locale = "Select a valid locale.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      phone,
      service: service as ContactSubmission["service"],
      challenge,
      consent: true,
      website,
      locale: locale as ContactSubmission["locale"],
    },
    spam: website.length > 0,
  };
}
