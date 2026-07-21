"use client";

import Image from "next/image";
import type { SpeakerFlyer } from "@/data/speakers";
import { Reveal } from "./Reveal";

/**
 * Affiche les flyers designer (JPG) — pas de génération de cartes.
 * Section commentée sur la home tant que tous les flyers ne sont pas livrés.
 */
export function SpeakersSection({ flyers }: { flyers: SpeakerFlyer[] }) {
  return (
    <section id="intervenants" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Intervenants
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Animateurs, speakers et panélistes — flyers officiels du meetup.
          </p>
        </Reveal>

        {flyers.length === 0 ? (
          <p className="mt-10 text-sm text-white/50">
            Les flyers des intervenants seront publiés prochainement.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {flyers.map((f, i) => (
              <Reveal key={f.id} delay={Math.min(i * 0.05, 0.25)}>
                <figure className="overflow-hidden rounded-[16px] border border-cursor-orange/70 bg-black">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={f.flyerSrc}
                      alt={`${f.roleLabel} — ${f.name}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width:768px) 100vw, 33vw"
                      priority={i < 2}
                    />
                  </div>
                  <figcaption className="border-t border-white/10 px-3 py-2.5 text-center">
                    <p className="font-script text-lg text-white">{f.roleLabel}</p>
                    <p className="font-display text-sm font-bold text-cursor-orange">
                      {f.name}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
