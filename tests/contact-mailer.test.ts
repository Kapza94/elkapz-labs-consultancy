import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send } = vi.hoisted(() => ({
  send: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { buildContactEmail, sendContactEmail } from "@/lib/contact/mailer";
import type { ContactSubmission } from "@/lib/contact/types";

const submission = {
  name: "Ana Petrović",
  email: "ana@example.com",
  company: "Primer d.o.o.",
  phone: "+381 60 123 4567",
  service: "audit",
  challenge: "Ručno pripremamo iste izveštaje svake nedelje.",
  consent: true,
  website: "",
  locale: "sr-Latn",
} satisfies ContactSubmission;

describe("contact mailer", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv(
      "RESEND_FROM_EMAIL",
      "elkapz labs website <onboarding@resend.dev>",
    );
    vi.stubEnv("CONTACT_TO_EMAIL", "elkapzlabs@gmail.com");
    send.mockReset();
    send.mockResolvedValue({ data: { id: "email_123" }, error: null });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("sends a contact enquiry through Resend", async () => {
    const result = await sendContactEmail(submission);

    expect(result).toEqual({ ok: true });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "elkapz labs website <onboarding@resend.dev>",
        to: ["elkapzlabs@gmail.com"],
        replyTo: "ana@example.com",
        subject: "Novi upit sa sajta — AI Business Audit",
        text: expect.stringContaining("Company: Primer d.o.o."),
        html: expect.stringContaining("Ručno pripremamo iste izveštaje"),
      }),
    );
  });

  it("reports missing Resend configuration without sending", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    await expect(sendContactEmail(submission)).resolves.toEqual({
      ok: false,
      reason: "configuration",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("reports a Resend API delivery error", async () => {
    send.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "Invalid sender" },
    });

    await expect(sendContactEmail(submission)).resolves.toEqual({
      ok: false,
      reason: "delivery",
    });
  });

  it("reports a thrown delivery error", async () => {
    send.mockRejectedValue(new Error("network failure"));

    await expect(sendContactEmail(submission)).resolves.toEqual({
      ok: false,
      reason: "delivery",
    });
  });

  it("escapes visitor input in the HTML email", () => {
    const message = buildContactEmail({
      ...submission,
      company: "<script>alert('x')</script>",
    });

    expect(message.html).not.toContain("<script>");
    expect(message.html).toContain("&lt;script&gt;");
  });
});
