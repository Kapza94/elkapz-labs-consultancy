"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/i18n/locale-provider";

export function Problem() {
  const { dictionary: t } = useLocale();

  return (
    <section className="section-shell border-b border-line">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow={t.problem.eyebrow}
            title={t.problem.title}
            description={t.problem.description}
          />
        </Reveal>
        <div className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {t.problem.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.035}>
              <article
                data-testid="problem-item"
                className="min-h-44 border-b border-r border-line bg-surface/20 p-6 transition-colors duration-200 ease-out hover:bg-surface/60 sm:p-7"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-xl font-medium tracking-[-0.035em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 max-w-4xl border-l-2 border-accent pl-5 text-xl leading-8 tracking-[-0.025em] text-foreground sm:text-2xl sm:leading-9">
            {t.problem.conclusion}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
