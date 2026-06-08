"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/i18n/locale-provider";

export function Process() {
  const { dictionary: t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="section-shell scroll-mt-24 border-b border-line">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            description={t.process.description}
          />
        </Reveal>

        <div ref={trackRef} className="relative mt-16">
          <div className="absolute left-[11px] top-3 h-[calc(100%-24px)] w-px bg-line lg:left-0 lg:top-[11px] lg:h-px lg:w-full">
            <motion.div
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : undefined}
              transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.77, 0, 0.175, 1] }}
              className="h-full w-full origin-top bg-accent lg:origin-left lg:[transform:scaleY(1)] lg:[transform-origin:left]"
              style={
                !reduceMotion && inView
                  ? { transform: "scaleX(1)" }
                  : !reduceMotion
                    ? { transform: "scaleX(0)" }
                    : undefined
              }
            />
          </div>
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-5">
            {t.process.steps.map((step, index) => (
              <li
                key={step.title}
                data-testid="process-step"
                className="relative grid grid-cols-[24px_1fr] gap-5 lg:block"
              >
                <span className="relative z-10 grid size-6 place-items-center rounded-full border border-accent/40 bg-background">
                  <span className="size-1.5 rounded-full bg-accent" />
                </span>
                <div className="lg:mt-10">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-accent">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
                  <p className="mt-5 font-mono text-[9px] uppercase leading-4 tracking-[0.1em] text-muted-strong">
                    {step.output}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
