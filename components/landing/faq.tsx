"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/i18n/locale-provider";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const { dictionary: t } = useLocale();

  return (
    <section id="faq" className="section-shell scroll-mt-24 border-b border-line">
      <div className="site-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </Reveal>
        <div className="border-t border-line">
          {t.faq.items.map((item, index) => {
            const open = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="group flex min-h-20 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg font-medium tracking-[-0.025em] text-foreground transition-colors duration-150 hover:text-accent"
                >
                  {item.question}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface transition-[background-color,border-color,transform] duration-200 ease-out group-hover:border-accent/40">
                    <Plus
                      aria-hidden="true"
                      size={16}
                      className={`transition-transform duration-200 ease-out ${open ? "rotate-45" : ""}`}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 text-base leading-7 text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
