import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";

import { ContactForm } from "@/components/landing/contact-form";
import { LocaleProvider } from "@/i18n/locale-provider";

function renderForm() {
  return render(
    <LocaleProvider>
      <ContactForm />
    </LocaleProvider>,
  );
}

async function completeRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Full name"), "Ana Petrović");
  await user.type(screen.getByLabelText("Business email"), "ana@example.com");
  await user.type(screen.getByLabelText("Company name"), "Primer d.o.o.");
  await user.selectOptions(screen.getByLabelText("Interested service"), "build");
  await user.type(
    screen.getByLabelText("Biggest repetitive-work problem"),
    "Our team manually copies replies and updates reports every day.",
  );
  await user.click(
    screen.getByRole("checkbox", {
      name: /I agree that elkapz labs may contact me/i,
    }),
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders accessible English fields", () => {
    renderForm();

    expect(screen.getByLabelText("Full name")).toBeRequired();
    expect(screen.getByLabelText("Business email")).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByLabelText("Company name")).toBeRequired();
    expect(screen.getByLabelText("Phone (optional)")).not.toBeRequired();
    expect(screen.getByLabelText("Interested service")).toBeRequired();
    expect(
      screen.getByLabelText("Biggest repetitive-work problem"),
    ).toBeRequired();
    expect(screen.getByRole("button", { name: "Send enquiry" })).toBeEnabled();
  });

  it("submits JSON, shows success, and resets the form", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    renderForm();
    await completeRequiredFields(user);

    await user.click(screen.getByRole("button", { name: "Send enquiry" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "content-type": "application/json" },
      }),
    );
    const request = vi.mocked(fetch).mock.calls[0][1];
    expect(JSON.parse(String(request?.body))).toMatchObject({
      name: "Ana Petrović",
      email: "ana@example.com",
      company: "Primer d.o.o.",
      service: "build",
      consent: true,
      locale: "en",
    });
    expect(
      await screen.findByText("Thanks — your enquiry has been sent."),
    ).toBeVisible();
    expect(screen.getByLabelText("Full name")).toHaveValue("");
  });

  it("preserves values and shows a recovery message when delivery fails", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "delivery_failed" }), {
        status: 502,
        headers: { "content-type": "application/json" },
      }),
    );
    renderForm();
    await completeRequiredFields(user);

    await user.click(screen.getByRole("button", { name: "Send enquiry" }));

    expect(
      await screen.findByText(
        "We could not send your enquiry. Please try again in a moment.",
      ),
    ).toBeVisible();
    expect(screen.getByLabelText("Full name")).toHaveValue("Ana Petrović");
  });

  it("renders Serbian Latin form copy from saved locale", async () => {
    window.localStorage.setItem("elkapz-locale", "sr-Latn");
    renderForm();

    expect(await screen.findByLabelText("Ime i prezime")).toBeRequired();
    expect(screen.getByLabelText("Poslovni imejl")).toBeRequired();
    expect(screen.getByRole("button", { name: "Pošaljite upit" })).toBeEnabled();
  });
});
