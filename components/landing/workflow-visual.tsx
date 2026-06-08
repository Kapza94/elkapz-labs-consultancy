"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Layers3 } from "lucide-react";

import type { Dictionary } from "@/i18n/types";

export function WorkflowVisual({
  copy,
}: {
  copy: Dictionary["hero"]["workflow"];
}) {
  const reduceMotion = useReducedMotion();
  const itemTransition = (delay: number) => ({
    duration: 0.48,
    delay: reduceMotion ? 0 : delay,
    ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
  });

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-line bg-surface p-4 shadow-[0_30px_100px_rgba(0,0,0,.28)] sm:p-5">
      <div className="absolute inset-0 workflow-grid opacity-40" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              {copy.label}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">elkapz / ops-01</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {copy.status}
          </span>
        </div>

        <div className="grid items-stretch gap-3 py-5 md:grid-cols-[1fr_auto_1.05fr_auto_1fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={itemTransition(0.08)}
            className="rounded-xl border border-line bg-background/75 p-3"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              01 / {copy.input}
            </p>
            <div className="mt-3 space-y-2">
              {copy.inputItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-2.5 py-2 text-[11px] text-muted-strong"
                >
                  <span className="font-mono text-[9px] text-muted">0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="hidden items-center text-muted md:flex">
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={itemTransition(0.2)}
            className="relative overflow-hidden rounded-xl border border-accent/30 bg-accent/[0.06] p-3"
          >
            <div
              className="absolute -right-10 -top-10 size-28 rounded-full bg-accent/10 blur-2xl"
              aria-hidden="true"
            />
            <p className="relative font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
              02 / {copy.system}
            </p>
            <div className="relative mt-4 flex justify-center">
              <div className="grid size-16 place-items-center rounded-2xl border border-accent/30 bg-background shadow-[inset_0_0_22px_rgba(201,244,122,.08)]">
                <Layers3 aria-hidden="true" className="text-accent" size={25} strokeWidth={1.4} />
              </div>
            </div>
            <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
              {copy.systemItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-background/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted-strong"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="hidden items-center text-muted md:flex">
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={itemTransition(0.32)}
            className="rounded-xl border border-line bg-background/75 p-3"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              03 / {copy.output}
            </p>
            <div className="mt-3 space-y-2">
              {copy.outputItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-line bg-surface-raised px-2.5 py-2 text-[11px] text-foreground"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-accent text-ink">
                    <Check aria-hidden="true" size={10} strokeWidth={2.5} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.12,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="h-full origin-left rounded-full bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
