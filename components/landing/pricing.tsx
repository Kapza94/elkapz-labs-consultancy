"use client";

import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/i18n/locale-provider";

export function Pricing() {
  const { dictionary: t, locale } = useLocale();

  return (
    <section id="pricing" className="section-shell scroll-mt-24 border-b border-line">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            description={t.pricing.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {t.pricing.items.map((item, index) => {
            const subject = encodeURIComponent(
              locale === "en"
                ? `Enquiry about ${item.name}`
                : `Upit za ${item.name} paket`,
            );
            return (
              <Reveal key={item.name} delay={index * 0.045}>
                <article
                  className={`relative flex h-full min-h-[480px] flex-col rounded-[20px] border p-6 transition-transform duration-200 ease-out hover:-translate-y-1 sm:p-7 ${
                    item.badge
                      ? "border-accent/55 bg-accent/[0.055]"
                      : "border-line bg-surface"
                  }`}
                >
                  {item.badge ? (
                    <span className="absolute right-5 top-5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
                      {item.badge}
                    </span>
                  ) : null}
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    0{index + 1}
                  </p>
                  <h3 className="mt-8 text-2xl font-medium tracking-[-0.04em] text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                  <p className="mt-8 font-mono text-[clamp(1.7rem,3vw,2.35rem)] font-medium tracking-[-0.055em] text-foreground">
                    {item.price}
                  </p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm leading-5 text-muted-strong">
                        <Check aria-hidden="true" className="mt-0.5 shrink-0 text-accent" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href={`mailto:${t.common.email}?subject=${subject}`}
                    variant={item.badge ? "primary" : "secondary"}
                    showArrow
                    className="mt-auto w-full"
                  >
                    {t.common.getStarted}
                  </ButtonLink>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <p className="mt-7 max-w-3xl text-sm leading-6 text-muted">{t.pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
