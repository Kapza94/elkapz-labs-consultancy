"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/i18n/locale-provider";

export function FinalCta() {
  const { dictionary: t, locale } = useLocale();
  const href = `mailto:${t.common.email}?subject=${encodeURIComponent(
    locale === "en" ? "AI Audit enquiry" : "Upit za AI audit",
  )}`;

  return (
    <section className="section-shell relative overflow-hidden border-b border-line">
      <div className="cta-glow" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal>
          <div className="rounded-[24px] border border-line-strong bg-surface p-7 sm:p-10 lg:p-14">
            <p className="eyebrow">{t.cta.eyebrow}</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="max-w-5xl text-balance text-[clamp(2.7rem,6vw,6.5rem)] font-medium leading-[0.91] tracking-[-0.065em] text-foreground">
                  {t.cta.title}
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  {t.cta.description}
                </p>
              </div>
              <div className="lg:w-64">
                <ButtonLink href={href} showArrow className="w-full">
                  {t.common.bookAudit}
                </ButtonLink>
                <p className="mt-4 text-xs leading-5 text-muted">{t.cta.response}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
