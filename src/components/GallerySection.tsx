"use client";

import { galleryBadges } from "@/data/gallery";
import { event } from "@/data/event";
import { CursorMark } from "./CursorMark";
import { Reveal } from "./Reveal";

export function GallerySection() {
  return (
    <section id="galerie" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Ils y seront
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Exemples de badges « J’y serai » (placeholders en attendant vos photos).
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryBadges.map((g, i) => (
            <Reveal key={g.id} delay={Math.min(i * 0.04, 0.2)}>
              <MiniBadge photo={g.photo} name={g.name} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniBadge({ photo, name }: { photo: string; name: string }) {
  return (
    <div className="grid-bg overflow-hidden border border-white/10 bg-black">
      <div className="flex items-center justify-center gap-1.5 pt-4 text-white">
        <CursorMark className="h-3.5 w-3.5" />
        <span className="font-display text-[10px] font-bold tracking-[0.14em]">CURSOR</span>
      </div>
      <div className="px-4 pt-2">
        <p className="font-display text-sm font-bold text-white">Cursor Bénin</p>
        <p className="font-display text-lg font-bold leading-none">
          <span className="text-cursor-orange">Meetup</span> <span className="text-white">2026</span>
        </p>
        <div className="mt-1.5 h-1 w-20 bg-cursor-orange" />
      </div>
      <div className="flex items-center gap-3 px-4 py-4">
        <div
          className="relative h-28 w-28 shrink-0 overflow-hidden border border-cursor-orange"
          style={{ borderRadius: "0 1.5rem 0 1.5rem" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt={`Badge de ${name}`} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-script text-3xl text-white">J’y serai</p>
          <p className="mt-1 text-xs text-white/50">{name}</p>
        </div>
      </div>
      <div className="bg-white py-2 text-center text-[10px] font-medium text-black">
        {event.community}
      </div>
    </div>
  );
}
