"use client";

import {
  Bot,
  Route,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/i18n/locale-provider";

const icons: LucideIcon[] = [SearchCheck, Bot, Route];
const spans = [
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-12",
];

export function Services() {
  const { dictionary: t } = useLocale();

  return (
    <section id="services" className="section-shell scroll-mt-24 border-b border-line">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            description={t.services.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <Reveal
                key={service.title}
                delay={index * 0.05}
                className={spans[index]}
              >
                <article
                  data-testid="service-card"
                  className="group relative h-full min-h-[390px] overflow-hidden rounded-[20px] border border-line bg-surface p-6 transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-line-strong hover:bg-surface-raised active:scale-[0.995] sm:p-8"
                >
                  <div
                    className="absolute -right-16 -top-20 size-52 rounded-full bg-accent/[0.035] blur-3xl transition-colors duration-200 group-hover:bg-accent/[0.07]"
                    aria-hidden="true"
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-line bg-background text-accent">
                        <Icon aria-hidden="true" size={21} strokeWidth={1.4} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                        SERVICE / 0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-14 max-w-lg text-[clamp(1.7rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.05em] text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                      {service.description}
                    </p>
                    <ul className="mt-auto grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-5 text-muted-strong"
                        >
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
