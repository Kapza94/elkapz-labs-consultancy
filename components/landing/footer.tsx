"use client";

import { ArrowDownRight } from "lucide-react";

import { useLocale } from "@/i18n/locale-provider";

export function Footer() {
  const { dictionary: t } = useLocale();
  const navItems = [
    [t.nav.services, "#services"],
    [t.nav.whyUs, "#why-us"],
    [t.nav.process, "#process"],
    [t.nav.pricing, "#pricing"],
    [t.nav.faq, "#faq"],
  ];

  return (
    <footer className="bg-background">
      <div className="site-container grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:py-16">
        <div>
          <a href="#top" className="inline-flex min-h-11 items-center gap-3 rounded-md">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            <span className="font-semibold tracking-[-0.03em] text-foreground">elkapz labs</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{t.footer.description}</p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.11em] text-muted">
            {t.common.location}
          </p>
        </div>
        <div>
          <p className="eyebrow">{t.footer.navigation}</p>
          <nav aria-label={t.footer.navigation} className="mt-5 grid">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="inline-flex min-h-10 items-center text-sm text-muted transition-colors duration-150 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <p className="eyebrow">{t.footer.contact}</p>
          <a
            href="#contact"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-foreground transition-colors duration-150 hover:text-accent"
          >
            {t.footer.contactForm}
            <ArrowDownRight aria-hidden="true" size={15} strokeWidth={1.7} />
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="site-container flex flex-col gap-3 py-5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} elkapz labs. {t.footer.rights}</span>
          <span>{t.common.brandLabel}</span>
        </div>
      </div>
    </footer>
  );
}
