"use client";

import { event } from "@/data/event";
import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="grid-bg relative overflow-hidden rounded-2xl border border-white/10 px-6 py-12 md:px-12 md:py-16">
            <div className="absolute -right-10 -top-10 h-40 w-40 rotate-12 border border-cursor-orange/30" />
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Réserve ta place
            </h2>
            <p className="mt-3 max-w-lg text-white/65">
              {event.dateLabel} · {event.location} · {event.timeLabel}
            </p>
            <a
              href={event.lumaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-md bg-cursor-orange px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 active:scale-[0.98]"
            >
              Inscription Luma
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
