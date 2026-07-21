"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { event } from "@/data/event";
import { CursorLogo } from "./CursorMark";

const links = [
  { href: "#programme", label: "Programme" },
  // { href: "#intervenants", label: "Intervenants" }, // réactiver avec SpeakersSection
  { href: "#badge", label: "Badge" },
  { href: "#galerie", label: "Galerie" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "border-b border-white/10 bg-black/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[72px] md:px-6">
        <a href="#top" className="flex items-center py-2" aria-label="Cursor">
          <CursorLogo variant="lockup" height={22} priority className="h-[22px] w-auto" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={event.lumaUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-cursor-orange px-4 py-2 text-sm font-semibold text-black transition active:scale-[0.98]"
          >
            S’inscrire
          </a>
        </nav>

        <button
          type="button"
          className="text-white md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2 text-white/90"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={event.lumaUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-cursor-orange px-4 py-3 text-center text-sm font-semibold text-black"
              onClick={() => setOpen(false)}
            >
              S’inscrire
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
