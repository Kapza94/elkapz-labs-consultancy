import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendContactEmail } = vi.hoisted(() => ({
  sendContactEmail: vi.fn(),
}));

vi.mock("@/lib/contact/mailer", () => ({
  sendContactEmail,
}));

import { POST } from "@/app/api/contact/route";

const validPayload = {
  name: "Luka Test",
  email: "luka@example.com",
  company: "Test Company",
  phone: "",
  service: "build",
  challenge:
    "We manually copy support replies and update our CRM after every customer conversation.",
  consent: true,
  website: "",
  locale: "en",
};

function request(payload: unknown) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendContactEmail.mockReset();
    sendContactEmail.mockResolvedValue({ ok: true });
  });

  it("delivers a valid contact submission", async () => {
    const response = await POST(request(validPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "luka@example.com",
        service: "build",
      }),
    );
  });

  it("returns field errors for invalid input", async () => {
    const response = await POST(request({ ...validPayload, email: "invalid" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      errors: { email: expect.any(String) },
    });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const response = await POST(
      request({ ...validPayload, website: "https://spam.example" }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it("returns 503 when email delivery is not configured", async () => {
    sendContactEmail.mockResolvedValue({
      ok: false,
      reason: "configuration",
    });

    const response = await POST(request(validPayload));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: "service_unavailable",
    });
  });

  it("returns 502 when the email provider rejects delivery", async () => {
    sendContactEmail.mockResolvedValue({ ok: false, reason: "delivery" });

    const response = await POST(request(validPayload));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: "delivery_failed",
    });
  });
});
