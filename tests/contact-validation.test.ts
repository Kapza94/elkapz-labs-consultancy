import { validateContactSubmission } from "@/lib/contact/validation";

const validSubmission = {
  name: "Ana Petrović",
  email: "ana@example.com",
  company: "Primer d.o.o.",
  phone: "+381 60 123 4567",
  service: "audit",
  challenge:
    "Naš tim svakodnevno ručno kopira odgovore i priprema iste nedeljne izveštaje.",
  consent: true,
  website: "",
  locale: "sr-Latn",
};

describe("validateContactSubmission", () => {
  it("normalizes a valid submission", () => {
    const result = validateContactSubmission({
      ...validSubmission,
      name: "  Ana Petrović  ",
      email: " ANA@EXAMPLE.COM ",
      phone: "  +381 60 123 4567 ",
    });

    expect(result).toEqual({
      ok: true,
      data: {
        ...validSubmission,
        name: "Ana Petrović",
        email: "ana@example.com",
        phone: "+381 60 123 4567",
      },
      spam: false,
    });
  });

  it("rejects missing and malformed required values", () => {
    const result = validateContactSubmission({
      name: "A",
      email: "not-an-email",
      company: "",
      service: "unknown",
      challenge: "Too short",
      consent: false,
      website: "",
      locale: "fr",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        company: expect.any(String),
        service: expect.any(String),
        challenge: expect.any(String),
        consent: expect.any(String),
        locale: expect.any(String),
      });
    }
  });

  it("accepts an empty optional phone and identifies honeypot spam", () => {
    const result = validateContactSubmission({
      ...validSubmission,
      phone: "",
      website: "https://spam.example",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.phone).toBe("");
      expect(result.spam).toBe(true);
    }
  });

  it.each([
    "call me maybe",
    "+381 six zero 123",
    "☎️ +381 60 123",
    "+381 60 123 4567 ext 42",
    "12345",
    "+1234567890123456",
  ])("rejects malformed phone number %s", (phone) => {
    const result = validateContactSubmission({
      ...validSubmission,
      phone,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.phone).toBeDefined();
    }
  });

  it("rejects oversized values", () => {
    const result = validateContactSubmission({
      ...validSubmission,
      name: "a".repeat(101),
      email: `${"a".repeat(250)}@example.com`,
      company: "a".repeat(121),
      phone: "1".repeat(41),
      challenge: "a".repeat(2001),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors)).toEqual(
        expect.arrayContaining(["name", "email", "company", "phone", "challenge"]),
      );
    }
  });
});
