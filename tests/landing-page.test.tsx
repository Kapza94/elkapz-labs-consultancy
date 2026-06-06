import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "@/app/page";
import { LocaleProvider } from "@/i18n/locale-provider";

describe("complete landing page", () => {
  it("composes semantic landmarks and primary section anchors", () => {
    render(
      <LocaleProvider>
        <Home />
      </LocaleProvider>,
    );

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(document.querySelector("#services")).toBeInTheDocument();
    expect(document.querySelector("#why-us")).toBeInTheDocument();
    expect(document.querySelector("#process")).toBeInTheDocument();
    expect(document.querySelector("#pricing")).toBeInTheDocument();
    expect(document.querySelector("#faq")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("updates visible content and document metadata in Serbian", async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <Home />
      </LocaleProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Srpski" }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Praktični AI sistemi za firme/i,
      }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toContain("Praktična AI implementacija");
      expect(
        document.querySelector('meta[name="description"]'),
      ).toHaveAttribute("content", expect.stringContaining("Praktični AI sistemi"));
    });
  });
});
