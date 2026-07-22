import { event } from "@/data/event";

const W = 1080;
const H = 1350;
const ORANGE = "#ff6600";
const WHITE = "#ffffff";
const BLACK = "#000000";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Impossible de charger: ${src.slice(0, 48)}`));
    // data: and same-origin don't need crossOrigin; setting it can break data URLs on Safari
    if (!src.startsWith("data:") && !src.startsWith("blob:")) {
      img.crossOrigin = "anonymous";
    }
    img.src = src;
  });
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radii: { tl: number; tr: number; br: number; bl: number },
) {
  const { tl, tr, br, bl } = radii;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

/** Cover-fit drawImage into a rect */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const ir = img.naturalWidth / img.naturalHeight;
  const tr = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (ir > tr) {
    sw = img.naturalHeight * tr;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / tr;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;
  const step = 28 * (W / 420);
  for (let x = 0; x <= W; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Rasterize the J'y serai badge on canvas (Safari-safe).
 * Avoids html-to-image which drops large data-URL photos on iOS.
 */
export async function renderJySeraiBadgePng(params: {
  photoDataUrl: string;
  qrDataUrl: string;
}): Promise<string> {
  const [photo, logo, qr] = await Promise.all([
    loadImage(params.photoDataUrl),
    loadImage("/brand/lockup-horizontal-2d-dark.svg").catch(() => null),
    loadImage(params.qrDataUrl),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponible");

  // Background
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, W, H);
  drawGrid(ctx);

  const padX = 56;
  let y = 48;

  // Logo
  if (logo) {
    const logoH = 36;
    const logoW = logoH * (logo.naturalWidth / Math.max(1, logo.naturalHeight));
    ctx.drawImage(logo, (W - logoW) / 2, y, logoW, logoH);
  } else {
    ctx.fillStyle = WHITE;
    ctx.font = "bold 28px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CURSOR", W / 2, y + 28);
  }
  y += 80;

  // Titles
  ctx.textAlign = "left";
  ctx.fillStyle = WHITE;
  ctx.font = "bold 48px system-ui, sans-serif";
  ctx.fillText("Cursor Bénin", padX, y);
  y += 70;
  ctx.font = "bold 84px system-ui, sans-serif";
  const meetup = "Meetup";
  const year = " 2026";
  ctx.fillStyle = ORANGE;
  ctx.fillText(meetup, padX, y);
  const meetupW = ctx.measureText(meetup).width;
  ctx.fillStyle = WHITE;
  ctx.fillText(year, padX + meetupW, y);
  y += 24;
  ctx.fillStyle = ORANGE;
  ctx.fillRect(padX, y, 220, 10);
  y += 56;

  // Photo frame (asymmetric radii: TR + BL rounded)
  const photoSize = 460;
  const photoX = padX;
  const photoY = y;
  roundRectPath(ctx, photoX, photoY, photoSize, photoSize, {
    tl: 0,
    tr: 72,
    br: 0,
    bl: 72,
  });
  ctx.save();
  ctx.clip();
  drawCover(ctx, photo, photoX, photoY, photoSize, photoSize);
  ctx.restore();
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 3;
  roundRectPath(ctx, photoX, photoY, photoSize, photoSize, {
    tl: 0,
    tr: 72,
    br: 0,
    bl: 72,
  });
  ctx.stroke();

  // "J'y serai" script-ish
  const textX = photoX + photoSize + 40;
  ctx.fillStyle = WHITE;
  ctx.font = "italic 72px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "left";
  ctx.fillText("J’y serai", textX, photoY + photoSize / 2 - 10);
  // swooshes
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(textX, photoY + photoSize / 2 + 20);
  ctx.bezierCurveTo(
    textX + 80,
    photoY + photoSize / 2 + 4,
    textX + 160,
    photoY + photoSize / 2 + 4,
    textX + 240,
    photoY + photoSize / 2 + 20,
  );
  ctx.stroke();
  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(textX + 8, photoY + photoSize / 2 + 34);
  ctx.bezierCurveTo(
    textX + 80,
    photoY + photoSize / 2 + 20,
    textX + 160,
    photoY + photoSize / 2 + 20,
    textX + 220,
    photoY + photoSize / 2 + 34,
  );
  ctx.stroke();

  // Bottom info row
  const footerH = 88;
  const bottomY = H - footerH;
  const infoY = bottomY - 200;

  // Date block
  ctx.textAlign = "left";
  ctx.fillStyle = WHITE;
  ctx.font = "28px system-ui, sans-serif";
  ctx.fillText(event.dateShort.month, padX, infoY);
  ctx.fillStyle = ORANGE;
  ctx.font = "bold 96px system-ui, sans-serif";
  ctx.fillText(event.dateShort.day, padX, infoY + 90);
  ctx.fillStyle = WHITE;
  ctx.font = "28px system-ui, sans-serif";
  ctx.fillText(event.dateShort.year, padX, infoY + 130);

  // Location / time
  const midX = 280;
  ctx.fillStyle = WHITE;
  ctx.font = "bold 26px system-ui, sans-serif";
  ctx.fillText(event.location, midX, infoY + 40);
  ctx.font = "24px system-ui, sans-serif";
  ctx.fillText(event.timeLabel, midX, infoY + 80);

  // QR card
  const qrBox = 168;
  const qrX = W - padX - qrBox - 16;
  const qrY = infoY - 10;
  ctx.strokeStyle = "rgba(255,255,255,0.85)";
  ctx.lineWidth = 2;
  ctx.strokeRect(qrX - 12, qrY - 40, qrBox + 24, qrBox + 64);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "16px system-ui, sans-serif";
  ctx.fillText("Scannez le QR", qrX - 4, qrY - 16);
  ctx.drawImage(qr, qrX, qrY, qrBox, qrBox);

  // White footer bar
  ctx.fillStyle = WHITE;
  ctx.fillRect(0, bottomY, W, footerH);
  // orange social dots
  const cy = bottomY + footerH / 2;
  const cx1 = W / 2 - 170;
  const cx2 = W / 2 - 130;
  ctx.fillStyle = ORANGE;
  ctx.beginPath();
  ctx.arc(cx1, cy, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx2, cy, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = WHITE;
  ctx.font = "bold 14px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("in", cx1, cy + 5);
  ctx.fillText("f", cx2, cy + 5);
  ctx.fillStyle = BLACK;
  ctx.font = "500 26px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(event.community, cx2 + 30, cy + 8);

  return canvas.toDataURL("image/png");
}
