"use client";

import Image from "next/image";
import { CalendarBlank, Clock, MapPin } from "@phosphor-icons/react";
import { event } from "@/data/event";
import { speakers } from "@/data/speakers";
import { lumaQrUrl } from "@/lib/qr";
import { CursorMark } from "./CursorMark";
import { Reveal } from "./Reveal";

export function SpeakersSection() {
  return (
    <section id="intervenants" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Intervenants
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Animateurs, speakers et panélistes du Cursor Bénin Meetup 2026.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.05, 0.25)}>
              <SpeakerCard speaker={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakerCard({
  speaker,
}: {
  speaker: (typeof speakers)[number];
}) {
  const qr = lumaQrUrl(event.lumaUrl, 160);

  return (
    <article className="grid-bg overflow-hidden rounded-[20px] border border-cursor-orange/80 bg-black">
      <div className="flex items-center justify-center gap-2 px-4 pt-5 text-white">
        <CursorMark className="h-4 w-4" />
        <span className="font-display text-[11px] font-bold tracking-[0.16em]">CURSOR</span>
      </div>

      <div className="px-4 pt-3">
        <p className="font-display text-lg font-bold text-white">Cursor Bénin</p>
        <p className="font-display text-2xl font-bold leading-none">
          <span className="text-cursor-orange">Meetup</span>{" "}
          <span className="text-white">2026</span>
        </p>
        <div className="mt-2 h-1 w-28 bg-cursor-orange" />
      </div>

      <div className="relative mx-4 mt-4 aspect-[3/4] overflow-hidden rounded-[18px] border border-cursor-orange">
        <Image
          src={speaker.photo}
          alt={speaker.name}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-16">
          <p className="font-script text-2xl text-white">{speaker.roleLabel}</p>
          <p className="mt-1 font-display text-lg font-bold text-cursor-orange">
            {speaker.name}
          </p>
          <p className="text-sm italic text-white/85">{speaker.title}</p>
          {speaker.subtitle && (
            <p className="text-sm italic text-white/70">{speaker.subtitle}</p>
          )}
        </div>
      </div>

      <div className="space-y-2 px-4 py-4 text-sm text-white">
        <p className="flex items-center gap-2">
          <MapPin className="shrink-0 text-cursor-orange" weight="fill" size={16} />
          {event.location}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="shrink-0 text-cursor-orange" weight="fill" size={16} />
          {event.timeLabel}
        </p>
        <p className="flex items-center gap-2">
          <CalendarBlank className="shrink-0 text-cursor-orange" weight="fill" size={16} />
          {event.dateLabel}
        </p>
      </div>

      <div className="flex items-end justify-between gap-3 px-4 pb-4">
        <div>
          <span className="inline-block -skew-x-12 bg-cursor-orange px-3 py-1 text-xs font-bold text-white">
            Thème :
          </span>
          <p className="mt-2 max-w-[11rem] text-xs leading-snug text-white/85">
            {event.panelTheme}
          </p>
        </div>
        <div className="rounded-xl border-2 border-cursor-orange bg-black p-2">
          <p className="mb-1 max-w-[5.5rem] text-[9px] leading-tight text-white/80">
            Scannez le QR code pour vous inscrire
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt="QR inscription Luma" width={72} height={72} className="rounded-sm" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 bg-white py-2.5 text-xs font-medium text-black">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cursor-orange text-[10px] font-bold text-white">
          in
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cursor-orange text-[10px] font-bold text-white">
          f
        </span>
        <span>{event.community}</span>
      </div>
    </article>
  );
}
