import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Problem } from "@/components/landing/problem";
import { Process } from "@/components/landing/process";
import { Services } from "@/components/landing/services";
import { WhyUs } from "@/components/landing/why-us";
import { LocaleProvider } from "@/i18n/locale-provider";

function renderSections() {
  return render(
    <LocaleProvider>
      <Hero />
      <Problem />
      <Services />
      <WhyUs />
      <Process />
      <Pricing />
      <Faq />
      <FinalCta />
    </LocaleProvider>,
  );
}

describe("landing sections", () => {
  it("renders the full English business narrative", () => {
    renderSections();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Practical AI systems for businesses/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("problem-item")).toHaveLength(6);
    expect(screen.getAllByTestId("service-card")).toHaveLength(3);
    expect(
      screen.queryByRole("heading", { name: "Customer Support AI System" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/8\+ years across customer support/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("process-step")).toHaveLength(4);
    expect(screen.getByText("€999")).toBeInTheDocument();
    expect(screen.getByText("€2,499")).toBeInTheDocument();
    expect(screen.getByText("from €4,999")).toBeInTheDocument();
    expect(screen.getByText("from €499/month")).toBeInTheDocument();
  });

  it("opens FAQ answers accessibly", async () => {
    const user = userEvent.setup();
    renderSections();
    const trigger = screen.getByRole("button", {
      name: "Do I need technical knowledge?",
    });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/translate the technical choices into clear business decisions/i),
    ).toBeVisible();
  });

  it("routes conversion actions to the contact form without mail links", () => {
    renderSections();
    const links = screen.getAllByRole("link");

    expect(
      links.filter((link) => link.getAttribute("href") === "#contact").length,
    ).toBeGreaterThanOrEqual(5);
    expect(
      links.some((link) => link.getAttribute("href")?.startsWith("mailto:")),
    ).toBe(false);
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });
});
