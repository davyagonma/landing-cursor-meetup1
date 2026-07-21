"use client";

import { motion, useReducedMotion } from "motion/react";
import { event } from "@/data/event";
import { CursorMark } from "./CursorMark";
import { Reveal } from "./Reveal";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pb-16 pt-24 md:justify-center md:pb-24 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute -right-20 top-24 h-[420px] w-[420px] rotate-12 rounded-[40%] border border-white/10" />
        <div className="absolute bottom-10 left-[-80px] h-[280px] w-[280px] -rotate-6 border border-cursor-orange/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="mb-8 flex items-center gap-2 text-white md:mb-10">
            <CursorMark className="h-7 w-7" />
            <span className="font-display text-base font-bold tracking-[0.18em]">CURSOR</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-display text-3xl font-bold text-white md:text-5xl">
            {event.shortName}
          </p>
          <h1 className="mt-1 font-display text-5xl font-bold leading-none md:text-7xl">
            <span className="text-cursor-orange">Meetup</span>{" "}
            <span className="text-white">2026</span>
          </h1>
          <div className="mt-3 h-1.5 w-40 bg-cursor-orange md:w-56" />
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
            {event.theme}
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={event.lumaUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]"
            >
              Rejoindre sur Luma
            </a>
            <a
              href="#badge"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-cursor-orange hover:text-cursor-orange active:scale-[0.98]"
            >
              Créer mon badge
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/70 md:gap-10">
            <span>{event.dateLabel}</span>
            <span>{event.location}</span>
            <span>{event.timeLabel}</span>
          </div>
        </Reveal>
      </div>

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-cursor-orange to-transparent"
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </section>
  );
}
