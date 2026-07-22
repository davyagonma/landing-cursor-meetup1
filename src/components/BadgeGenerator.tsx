"use client";

import {
  CalendarBlank,
  Clock,
  DownloadSimple,
  Image as ImageIcon,
  MapPin,
  X,
} from "@phosphor-icons/react";
import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { event } from "@/data/event";
import { photoFileToDataUrl } from "@/lib/photo";
import { lumaQrDataUrl } from "@/lib/qr";
import { renderJySeraiBadgePng } from "@/lib/renderBadgePng";
import { publishBadge } from "@/lib/supabase";
import { Reveal } from "./Reveal";

export function BadgeGenerator() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [pendingDataUrl, setPendingDataUrl] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [publishBusy, setPublishBusy] = useState(false);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    lumaQrDataUrl(event.lumaUrl, 160)
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onFile = async (file: File | null) => {
    setError(null);
    setPublishMsg(null);
    if (!file) return;

    setConverting(true);
    try {
      const dataUrl = await photoFileToDataUrl(file);
      setPhoto((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
        return dataUrl;
      });
    } catch (err) {
      console.error("photo convert failed", err);
      setError(
        err instanceof Error
          ? err.message
          : "Impossible de lire cette photo (HEIC/JPG). Réessaie.",
      );
    } finally {
      setConverting(false);
    }
  };

  const captureBadge = useCallback(async () => {
    if (!photo || !qrDataUrl) throw new Error("Photo ou QR manquant");

    // Primary path: canvas render (reliable on iOS Safari with HEIC→JPEG)
    try {
      return await renderJySeraiBadgePng({
        photoDataUrl: photo,
        qrDataUrl,
      });
    } catch (canvasErr) {
      console.warn("canvas badge render failed, fallback html-to-image", canvasErr);
    }

    if (!badgeRef.current) throw new Error("Badge introuvable");
    const imgs = badgeRef.current.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve();
              return;
            }
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
      ),
    );
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    return toPng(badgeRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#000000",
      includeQueryParams: true,
      preferredFontFormat: "woff2",
      filter: (node) => {
        if (!(node instanceof HTMLElement)) return true;
        return !node.dataset?.skipExport;
      },
    });
  }, [photo, qrDataUrl]);

  const download = useCallback(async () => {
    if (!photo || !qrDataUrl) return;
    setBusy(true);
    setError(null);
    setPublishMsg(null);
    try {
      const dataUrl = await captureBadge();
      // Blob URL is more reliable than huge data: URLs on iOS Safari
      const blob = await (await fetch(dataUrl)).blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "cursor-benin-jy-serai.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
      setPendingDataUrl(dataUrl);
      setShowPublishModal(true);
    } catch (err) {
      console.error("badge export failed", err);
      setError("Échec du téléchargement. Réessaie avec une autre photo.");
    } finally {
      setBusy(false);
    }
  }, [photo, qrDataUrl, captureBadge]);

  const handlePublishChoice = async (isPublic: boolean) => {
    if (!pendingDataUrl) {
      setShowPublishModal(false);
      return;
    }
    setPublishBusy(true);
    setPublishMsg(null);
    const result = await publishBadge({
      dataUrl: pendingDataUrl,
      displayName: displayName.trim() || undefined,
      isPublic,
    });
    setPublishBusy(false);
    if (!result.ok) {
      setPublishMsg(
        isPublic
          ? `Impossible de publier : ${result.error}`
          : `Badge enregistré en privé échoué : ${result.error}`,
      );
      return;
    }
    setShowPublishModal(false);
    setPendingDataUrl(null);
    setPublishMsg(
      isPublic
        ? "Merci ! Ton badge sera visible dans la galerie."
        : "OK, ton badge reste privé (non affiché sur le site).",
    );
  };

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
                {converting
                  ? "Conversion de la photo…"
                  : "Clique pour choisir une photo portrait"}
              </span>
              <span className="text-center text-xs text-white/45">
                JPG, PNG, WebP ou HEIC (iPhone)
              </span>
              <input
                type="file"
                accept="image/*,.heic,.heif,image/heic,image/heif"
                className="sr-only"
                disabled={converting}
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  void onFile(f);
                  e.target.value = "";
                }}
              />
            </label>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            {publishMsg && (
              <p className="mt-3 text-sm text-cursor-orange">{publishMsg}</p>
            )}
            <button
              type="button"
              disabled={!photo || busy || converting || !qrDataUrl}
              onClick={download}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-cursor-orange px-5 py-3 text-sm font-semibold text-black transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <DownloadSimple size={18} weight="bold" />
              {busy
                ? "Préparation…"
                : converting
                  ? "Conversion…"
                  : "Télécharger mon badge"}
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto w-full max-w-[420px]">
              <JySeraiBadge
                refEl={badgeRef}
                photo={photo}
                qrDataUrl={qrDataUrl}
              />
            </div>
          </Reveal>
        </div>
      </div>

      {showPublishModal && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="publish-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0a0a0a] p-6 text-white shadow-xl">
            <button
              type="button"
              className="absolute right-3 top-3 text-white/60 hover:text-white"
              aria-label="Fermer"
              onClick={() => {
                setShowPublishModal(false);
                void handlePublishChoice(false);
              }}
              disabled={publishBusy}
            >
              <X size={20} />
            </button>
            <h3 id="publish-title" className="font-display text-xl font-bold">
              Afficher ton badge sur le site ?
            </h3>
            <p className="mt-2 text-sm text-white/65">
              Après le téléchargement, tu peux le publier dans la galerie « Ils y
              seront ». Sinon il reste privé.
            </p>
            <label className="mt-4 block text-sm text-white/80">
              Prénom ou pseudo (optionnel)
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-white/20 bg-black px-3 py-2 text-white outline-none focus:border-cursor-orange"
                placeholder="Ex. Amina"
                maxLength={40}
              />
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={publishBusy}
                onClick={() => void handlePublishChoice(true)}
                className="rounded-md bg-cursor-orange px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
              >
                {publishBusy ? "Envoi…" : "Oui, afficher"}
              </button>
              <button
                type="button"
                disabled={publishBusy}
                onClick={() => void handlePublishChoice(false)}
                className="rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                Non, garder privé
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function JySeraiBadge({
  refEl,
  photo,
  qrDataUrl,
}: {
  refEl: React.RefObject<HTMLDivElement | null>;
  photo: string | null;
  qrDataUrl: string | null;
}) {
  return (
    <div
      ref={refEl}
      className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-black text-white"
      style={{
        backgroundColor: "#000000",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute right-6 top-1/3 h-48 w-48 rotate-12 border border-white" />
      </div>

      <div className="relative flex h-full flex-col px-5 pb-0 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center">
          {/* plain img for reliable html-to-image capture */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/lockup-horizontal-2d-dark.svg"
            alt="Cursor"
            height={18}
            style={{ height: 18, width: "auto" }}
            crossOrigin="anonymous"
          />
        </div>

        <div className="mt-4">
          <p
            className="font-display text-xl font-bold sm:text-2xl"
            style={{ color: "#ffffff" }}
          >
            Cursor Bénin
          </p>
          <p className="font-display text-3xl font-bold leading-none sm:text-4xl">
            <span style={{ color: "#ff6600" }}>Meetup</span>{" "}
            <span style={{ color: "#ffffff" }}>2026</span>
          </p>
          <div
            className="mt-2 h-1.5 w-36 sm:w-44"
            style={{ backgroundColor: "#ff6600" }}
          />
        </div>

        <div className="mt-6 flex flex-1 items-start gap-3 sm:gap-4">
          <div
            className="relative aspect-square w-[48%] shrink-0 overflow-hidden bg-white/5"
            style={{
              borderRadius: "0 2.5rem 0 2.5rem",
              border: "1px solid #ff6600",
            }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full items-center justify-center p-4 text-center text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Ta photo ici
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center pt-4">
            <p
              className="font-script text-4xl leading-none sm:text-5xl"
              style={{ color: "#ffffff" }}
            >
              J’y serai
            </p>
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
            <CalendarBlank size={28} color="#ffffff" />
            <p className="mt-1 text-xs" style={{ color: "#ffffff" }}>
              {event.dateShort.month}
            </p>
            <p
              className="font-display text-3xl font-bold leading-none"
              style={{ color: "#ff6600" }}
            >
              {event.dateShort.day}
            </p>
            <p className="text-xs" style={{ color: "#ffffff" }}>
              {event.dateShort.year}
            </p>
          </div>

          <div className="space-y-2 self-center text-[11px] sm:text-xs">
            <p
              className="flex items-center gap-1.5 uppercase tracking-wide"
              style={{ color: "#ffffff" }}
            >
              <MapPin size={14} color="#ff6600" weight="fill" />
              {event.location}
            </p>
            <p className="flex items-center gap-1.5" style={{ color: "#ffffff" }}>
              <Clock size={14} color="#ff6600" weight="fill" />
              {event.timeLabel}
            </p>
          </div>

          <div
            className="rounded-md p-1.5"
            style={{ border: "1px solid rgba(255,255,255,0.8)" }}
          >
            <p
              className="mb-1 max-w-[72px] text-[8px] leading-tight"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Scannez le <strong>QR</strong> code pour vous inscrire
            </p>
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt=""
                width={64}
                height={64}
                className="mx-auto"
              />
            ) : (
              <div className="mx-auto h-16 w-16 bg-white/10" />
            )}
          </div>
        </div>

        <div
          className="mx-[-1.25rem] flex items-center justify-center gap-2 py-2.5 text-[11px] font-medium sm:mx-[-1.5rem]"
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
            style={{ backgroundColor: "#ff6600", color: "#ffffff" }}
          >
            in
          </span>
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
            style={{ backgroundColor: "#ff6600", color: "#ffffff" }}
          >
            f
          </span>
          <span>{event.community}</span>
        </div>
      </div>
    </div>
  );
}
