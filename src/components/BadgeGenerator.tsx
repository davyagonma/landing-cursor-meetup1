"use client";

import {
  CalendarBlank,
  Clock,
  DownloadSimple,
  Image as ImageIcon,
  MapPin,
} from "@phosphor-icons/react";
import { toPng } from "html-to-image";
import { useCallback, useRef, useState } from "react";
import { event } from "@/data/event";
import { lumaQrUrl } from "@/lib/qr";
import { CursorMark } from "./CursorMark";
import { Reveal } from "./Reveal";

export function BadgeGenerator() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const onFile = (file: File | null) => {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choisis une image (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image trop lourde (max 8 Mo).");
      return;
    }
    const url = URL.createObjectURL(file);
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const download = useCallback(async () => {
    if (!badgeRef.current || !photo) return;
    setBusy(true);
    setError(null);
    try {
      const dataUrl = await toPng(badgeRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#000000",
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "cursor-benin-jy-serai.png";
      a.click();
    } catch {
      setError("Échec du téléchargement. Réessaie.");
    } finally {
      setBusy(false);
    }
  }, [photo]);

  return (
    <section id="badge" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Badge J’y serai
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Uploade ta photo, vois le rendu en direct, télécharge et partage-le.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/25 bg-white/[0.03] px-6 py-14 transition hover:border-cursor-orange/60">
              <ImageIcon size={36} className="text-cursor-orange" />
              <span className="text-center text-sm text-white/80">
                Clique pour choisir une photo portrait
              </span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            <button
              type="button"
              disabled={!photo || busy}
              onClick={download}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-cursor-orange px-5 py-3 text-sm font-semibold text-black transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <DownloadSimple size={18} weight="bold" />
              {busy ? "Préparation…" : "Télécharger mon badge"}
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[420px]">
              <JySeraiBadge refEl={badgeRef} photo={photo} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function JySeraiBadge({
  refEl,
  photo,
}: {
  refEl: React.RefObject<HTMLDivElement | null>;
  photo: string | null;
}) {
  const qr = lumaQrUrl(event.lumaUrl, 140);

  return (
    <div
      ref={refEl}
      className="grid-bg relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-black text-white"
    >
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute right-6 top-1/3 h-48 w-48 rotate-12 border border-white" />
      </div>

      <div className="relative flex h-full flex-col px-5 pb-0 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center gap-2">
          <CursorMark className="h-5 w-5" />
          <span className="font-display text-xs font-bold tracking-[0.18em]">CURSOR</span>
        </div>

        <div className="mt-4">
          <p className="font-display text-xl font-bold sm:text-2xl">Cursor Bénin</p>
          <p className="font-display text-3xl font-bold leading-none sm:text-4xl">
            <span className="text-cursor-orange">Meetup</span>{" "}
            <span>2026</span>
          </p>
          <div className="mt-2 h-1.5 w-36 bg-cursor-orange sm:w-44" />
        </div>

        <div className="mt-6 flex flex-1 items-start gap-3 sm:gap-4">
          <div
            className="relative aspect-square w-[48%] shrink-0 overflow-hidden border border-cursor-orange bg-white/5"
            style={{
              borderRadius: "0 2.5rem 0 2.5rem",
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-white/40">
                Ta photo ici
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center pt-4">
            <p className="font-script text-4xl leading-none sm:text-5xl">J’y serai</p>
            <svg
              className="mt-2 w-28"
              viewBox="0 0 120 18"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 12c20-10 40-10 60 0s40 10 56 0"
                stroke="#FF6600"
                strokeWidth="1.5"
              />
              <path
                d="M6 16c18-8 36-8 54 0s38 8 52 0"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-[auto_1fr_auto] items-end gap-3 pb-3 pt-4 sm:gap-4">
          <div className="flex flex-col items-start">
            <CalendarBlank size={28} className="text-white" />
            <p className="mt-1 text-xs text-white">{event.dateShort.month}</p>
            <p className="font-display text-3xl font-bold leading-none text-cursor-orange">
              {event.dateShort.day}
            </p>
            <p className="text-xs text-white">{event.dateShort.year}</p>
          </div>

          <div className="space-y-2 self-center text-[11px] sm:text-xs">
            <p className="flex items-center gap-1.5 uppercase tracking-wide">
              <MapPin size={14} className="text-cursor-orange" weight="fill" />
              {event.location}
            </p>
            <p className="flex items-center gap-1.5">
              <Clock size={14} className="text-cursor-orange" weight="fill" />
              {event.timeLabel}
            </p>
          </div>

          <div className="rounded-md border border-white/80 p-1.5">
            <p className="mb-1 max-w-[72px] text-[8px] leading-tight text-white/85">
              Scannez le <strong>QR</strong> code pour vous inscrire
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr} alt="" width={64} height={64} className="mx-auto" />
          </div>
        </div>

        <div className="mx-[-1.25rem] flex items-center justify-center gap-2 bg-white py-2.5 text-[11px] font-medium text-black sm:mx-[-1.5rem]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cursor-orange text-[9px] font-bold text-white">
            in
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cursor-orange text-[9px] font-bold text-white">
            f
          </span>
          <span>{event.community}</span>
        </div>
      </div>
    </div>
  );
}
