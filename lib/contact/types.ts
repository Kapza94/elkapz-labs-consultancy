import type { Locale } from "@/i18n/types";

export const contactServices = [
  "audit",
  "launch",
  "build",
  "automate",
  "advisor",
  "unsure",
] as const;

export type ContactService = (typeof contactServices)[number];

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: ContactService;
  challenge: string;
  consent: true;
  website: string;
  locale: Locale;
}

export type ContactField = keyof ContactSubmission;

export type ContactValidationResult =
  | {
      ok: true;
      data: ContactSubmission;
      spam: boolean;
    }
  | {
      ok: false;
      errors: Partial<Record<ContactField, string>>;
    };
