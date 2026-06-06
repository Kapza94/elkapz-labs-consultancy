import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "@/components/landing/header";
import { LocaleProvider } from "@/i18n/locale-provider";

describe("Header", () => {
  it("shows navigation and the audit email action", () => {
    render(
      <LocaleProvider>
        <Header />
      </LocaleProvider>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#services",
    );
    expect(
      screen.getByRole("link", { name: "Book an AI Audit" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("switches the visible navigation to Serbian", async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <Header />
      </LocaleProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Srpski" }));

    expect(screen.getByRole("link", { name: "Usluge" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Srpski" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
