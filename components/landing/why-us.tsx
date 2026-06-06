"use client";

import { BriefcaseBusiness, Code2, Plus } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/i18n/locale-provider";

const roleIcons = [BriefcaseBusiness, Code2];

export function WhyUs() {
  const { dictionary: t } = useLocale();

  return (
    <section id="why-us" className="section-shell scroll-mt-24 border-b border-line">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow={t.whyUs.eyebrow}
            title={t.whyUs.title}
            description={t.whyUs.description}
          />
        </Reveal>

        <div className="relative mt-14 grid gap-4 lg:grid-cols-2">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-background text-accent lg:grid"
          >
            <Plus size={18} strokeWidth={1.5} />
          </div>
          {t.whyUs.roles.map((role, index) => {
            const Icon = roleIcons[index];
            return (
              <Reveal key={role.title} delay={index * 0.08}>
                <article className="h-full rounded-[20px] border border-line bg-surface p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">{role.label}</span>
                    <Icon aria-hidden="true" className="text-accent" size={22} strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-12 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1] tracking-[-0.05em] text-foreground">
                    {role.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted sm:text-base">
                    {role.experience}
                  </p>
                  <ul className="mt-9 border-t border-line pt-5">
                    {role.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex min-h-10 items-center justify-between border-b border-line/70 text-sm text-muted-strong last:border-0"
                      >
                        {skill}
                        <span aria-hidden="true" className="font-mono text-[10px] text-accent">
                          +
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-muted">
            {t.whyUs.bridge}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
