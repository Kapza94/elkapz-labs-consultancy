import nodemailer from "nodemailer";

import type { ContactService, ContactSubmission } from "./types";

type MailResult =
  | { ok: true }
  | { ok: false; reason: "configuration" | "delivery" };

const serviceLabels: Record<ContactService, string> = {
  audit: "AI Business Audit",
  launch: "Launch",
  build: "Build",
  automate: "Automate",
  advisor: "AI Advisor",
  unsure: "Not sure yet",
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

export function buildContactEmail(submission: ContactSubmission) {
  const service = serviceLabels[submission.service];
  const subject =
    submission.locale === "sr-Latn"
      ? `Novi upit sa sajta — ${service}`
      : `New website enquiry — ${service}`;
  const phone = submission.phone || "Not provided";

  const text = [
    subject,
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Locale: ${submission.locale}`,
    "",
    "Biggest repetitive-work problem:",
    submission.challenge,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171917">
      <h1 style="font-size:22px;margin:0 0 24px">${escapeHtml(subject)}</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tr><td style="padding:7px 12px 7px 0;color:#66706a">Name</td><td>${escapeHtml(submission.name)}</td></tr>
        <tr><td style="padding:7px 12px 7px 0;color:#66706a">Email</td><td>${escapeHtml(submission.email)}</td></tr>
        <tr><td style="padding:7px 12px 7px 0;color:#66706a">Company</td><td>${escapeHtml(submission.company)}</td></tr>
        <tr><td style="padding:7px 12px 7px 0;color:#66706a">Phone</td><td>${escapeHtml(phone)}</td></tr>
        <tr><td style="padding:7px 12px 7px 0;color:#66706a">Service</td><td>${escapeHtml(service)}</td></tr>
        <tr><td style="padding:7px 12px 7px 0;color:#66706a">Locale</td><td>${escapeHtml(submission.locale)}</td></tr>
      </table>
      <h2 style="font-size:16px;margin:28px 0 8px">Biggest repetitive-work problem</h2>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(submission.challenge)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

export async function sendContactEmail(
  submission: ContactSubmission,
): Promise<MailResult> {
  const user = process.env.GMAIL_USER?.trim();
  const password = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || user;

  if (!user || !password || !recipient) {
    return { ok: false, reason: "configuration" };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: password,
    },
  });
  const message = buildContactEmail(submission);

  try {
    await transporter.sendMail({
      from: `"elkapz labs website" <${user}>`,
      to: recipient,
      replyTo: submission.email,
      ...message,
    });
    return { ok: true };
  } catch (error) {
    console.error("Contact email delivery failed.", error);
    return { ok: false, reason: "delivery" };
  }
}
