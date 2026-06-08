"use client";

import { ContactForm } from "@/components/landing/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/i18n/locale-provider";

export function FinalCta() {
  const { dictionary: t } = useLocale();

  return (
    <section
      id="contact"
      className="section-shell relative scroll-mt-24 overflow-hidden border-b border-line"
    >
      <div className="cta-glow" aria-hidden="true" />
      <div className="site-container relative">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:gap-12">
          <Reveal className="lg:sticky lg:top-28">
            <div className="py-2 lg:py-8">
            <p className="eyebrow">{t.cta.eyebrow}</p>
              <h2 className="mt-7 max-w-3xl text-balance text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[0.91] tracking-[-0.065em] text-foreground">
                {t.cta.title}
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {t.cta.description}
              </p>
              <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-6 text-muted-strong">
                {t.cta.response}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
