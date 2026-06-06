"use client";

import { ArrowDown, Check } from "lucide-react";

import { WorkflowVisual } from "@/components/landing/workflow-visual";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/i18n/locale-provider";

export function Hero() {
  const { dictionary: t } = useLocale();

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="hero-glow" aria-hidden="true" />
      <div className="site-container relative grid min-h-[calc(100dvh-72px)] items-center gap-14 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
        <div className="max-w-[760px]">
          <Reveal>
            <p className="eyebrow">{t.hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.07}>
            <h1 className="mt-6 text-balance text-[clamp(3.3rem,7.4vw,7.3rem)] font-medium leading-[0.88] tracking-[-0.075em] text-foreground">
              {t.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl sm:leading-9">
              {t.hero.description}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contact" showArrow>
                {t.common.bookAudit}
              </ButtonLink>
              <ButtonLink href="#services" variant="secondary">
                {t.common.seeServices}
                <ArrowDown aria-hidden="true" size={15} strokeWidth={1.8} />
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <ul className="mt-11 grid gap-3 border-t border-line pt-6 sm:grid-cols-3">
              {t.hero.proof.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-5 text-muted-strong">
                  <Check aria-hidden="true" className="mt-0.5 shrink-0 text-accent" size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.18} distance={20} className="lg:pl-4">
          <WorkflowVisual copy={t.hero.workflow} />
        </Reveal>
      </div>
    </section>
  );
}
