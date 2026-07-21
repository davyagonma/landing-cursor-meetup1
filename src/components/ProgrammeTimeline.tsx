"use client";

import { Clock, MapPin } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { programme } from "@/data/programme";
import { Reveal } from "./Reveal";

export function ProgrammeTimeline() {
  const reduce = useReducedMotion();

  return (
    <section id="programme" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Programme
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Une matinée pour explorer les agents IA, démos live, panels et ateliers
            collaboratifs.
          </p>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/15 md:left-1/2 md:-translate-x-px" />
          {!reduce && (
            <motion.div
              className="absolute left-[15px] h-24 w-px bg-gradient-to-b from-transparent via-cursor-orange to-transparent md:left-1/2 md:-translate-x-px"
              animate={{ top: ["0%", "85%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          )}

          <ol className="space-y-10">
            {programme.map((slot, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={slot.id} delay={Math.min(i * 0.04, 0.24)}>
                  <li className="relative grid gap-4 md:grid-cols-2 md:gap-10">
                    <div
                      className={`pl-10 md:pl-0 ${left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}
                    >
                      <p className="text-sm font-semibold text-cursor-orange">{slot.time}</p>
                      <h3 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">
                        {slot.title}
                      </h3>
                      {slot.description && (
                        <p className="mt-2 text-white/70">{slot.description}</p>
                      )}
                      {slot.bullets && (
                        <ul
                          className={`mt-3 space-y-1 text-sm text-white/55 ${left ? "md:ml-auto" : ""} max-w-md`}
                        >
                          {slot.bullets.map((b) => (
                            <li key={b}>· {b}</li>
                          ))}
                        </ul>
                      )}
                      {(slot.speakers || slot.role) && (
                        <p className="mt-3 text-sm text-white/80">
                          {slot.role ? `${slot.role}` : ""}
                          {slot.speakers ? ` · ${slot.speakers.join(", ")}` : ""}
                        </p>
                      )}
                    </div>

                    <span className="absolute left-[11px] top-1.5 h-2.5 w-2.5 rounded-full bg-cursor-orange ring-4 ring-black md:left-1/2 md:-translate-x-1/2" />
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-14 flex flex-wrap gap-6 text-sm text-white/70">
          <span className="inline-flex items-center gap-2">
            <MapPin className="text-cursor-orange" weight="fill" />
            SOROC ZOGBO
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="text-cursor-orange" weight="fill" />
            8h30 à 13h00 GMT+1
          </span>
        </Reveal>
      </div>
    </section>
  );
}
