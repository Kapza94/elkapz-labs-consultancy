"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { useLocale } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/types";

const localeOptions: Array<{ locale: Locale; short: string; label: string }> = [
  { locale: "en", short: "EN", label: "English" },
  { locale: "sr-Latn", short: "SR", label: "Srpski" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { dictionary: t, locale, setLocale } = useLocale();
  const navItems = [
    [t.nav.services, "#services"],
    [t.nav.whyUs, "#why-us"],
    [t.nav.process, "#process"],
    [t.nav.pricing, "#pricing"],
    [t.nav.faq, "#faq"],
  ];
  const auditHref = `mailto:${t.common.email}?subject=${encodeURIComponent(
    locale === "en" ? "AI Audit enquiry" : "Upit za AI audit",
  )}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/88 backdrop-blur-xl">
      <div className="site-container flex min-h-[72px] items-center justify-between gap-5">
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-3 rounded-md focus-visible:outline-none"
          onClick={closeMenu}
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-accent shadow-[0_0_16px_rgba(201,244,122,.45)] transition-transform duration-150 ease-out group-hover:scale-125"
          />
          <span className="text-[15px] font-semibold tracking-[-0.03em] text-foreground">
            elkapz labs
          </span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted transition-colors duration-150 ease-out hover:bg-white/5 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            aria-label={t.common.language}
            className="hidden rounded-lg border border-line bg-surface p-1 sm:flex"
            role="group"
          >
            {localeOptions.map((option) => (
              <button
                key={option.locale}
                type="button"
                aria-label={option.label}
                aria-pressed={locale === option.locale}
                onClick={() => setLocale(option.locale)}
                className="min-h-9 min-w-10 cursor-pointer rounded-md px-2 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted transition-[background-color,color,transform] duration-150 ease-out hover:text-foreground active:scale-[0.96] aria-pressed:bg-white/9 aria-pressed:text-foreground"
              >
                {option.short}
              </button>
            ))}
          </div>

          <ButtonLink
            href={auditHref}
            className="hidden xl:inline-flex"
            showArrow
          >
            {t.common.bookAudit}
          </ButtonLink>

          <button
            type="button"
            aria-label={menuOpen ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-surface text-foreground transition-[background-color,border-color,transform] duration-150 ease-out hover:border-line-strong hover:bg-surface-raised active:scale-[0.96] lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="border-t border-line bg-background lg:hidden"
          >
            <div className="site-container grid gap-2 py-4">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-lg border border-transparent px-3 text-base text-muted transition-colors duration-150 hover:border-line hover:bg-surface hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-line pt-4">
                <div
                  aria-label={t.common.language}
                  className="flex rounded-lg border border-line bg-surface p-1"
                  role="group"
                >
                  {localeOptions.map((option) => (
                    <button
                      key={option.locale}
                      type="button"
                      aria-label={`${option.label} mobile`}
                      aria-pressed={locale === option.locale}
                      onClick={() => setLocale(option.locale)}
                      className="min-h-10 min-w-12 rounded-md px-2 font-mono text-xs font-semibold text-muted aria-pressed:bg-white/9 aria-pressed:text-foreground"
                    >
                      {option.short}
                    </button>
                  ))}
                </div>
                <ButtonLink href={auditHref} showArrow>
                  {t.common.bookAudit}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
