"use client";

import { FacebookLogo, LinkedinLogo } from "@phosphor-icons/react";
import { event } from "@/data/event";
import { CursorLogo } from "./CursorMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="text-white">
          <CursorLogo variant="lockup" height={22} className="h-[22px] w-auto" />
          <p className="mt-2 text-xs text-white/55">{event.community}</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={event.linkedinUrl}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cursor-orange text-white transition hover:brightness-110"
            aria-label="LinkedIn"
            target={event.linkedinUrl === "#" ? undefined : "_blank"}
            rel="noreferrer"
          >
            <LinkedinLogo size={18} weight="fill" />
          </a>
          <a
            href={event.facebookUrl}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cursor-orange text-white transition hover:brightness-110"
            aria-label="Facebook"
            target={event.facebookUrl === "#" ? undefined : "_blank"}
            rel="noreferrer"
          >
            <FacebookLogo size={18} weight="fill" />
          </a>
          <a
            href={event.lumaUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            S’inscrire
          </a>
        </div>
      </div>
      <div className="bg-white py-3 text-center text-sm font-medium text-black">
        {event.community} · {event.dateLabel}
      </div>
    </footer>
  );
}
