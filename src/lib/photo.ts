/**
 * Normalize user photos for badge preview/export.
 * iPhone HEIC/HEIF is often rejected or blank in browsers — convert to JPEG.
 */

const HEIC_MIME = /image\/hei[cf]/i;
const HEIC_EXT = /\.hei[cf]$/i;

export function isHeicLike(file: File): boolean {
  if (HEIC_MIME.test(file.type)) return true;
  if (HEIC_EXT.test(file.name)) return true;
  // iOS sometimes sends an empty MIME with a HEIC name / UTI
  if (!file.type && HEIC_EXT.test(file.name)) return true;
  return false;
}

export function isSupportedPhoto(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  if (isHeicLike(file)) return true;
  return false;
}

function fileToDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Lecture image impossible"));
    };
    reader.onerror = () => reject(new Error("Lecture image impossible"));
    reader.readAsDataURL(file);
  });
}

/** Downscale large photos so export stays reliable on mobile */
async function jpegDataUrlFromBitmap(
  source: CanvasImageSource,
  maxEdge = 1200,
  quality = 0.9,
): Promise<string> {
  const width =
    "naturalWidth" in source && typeof source.naturalWidth === "number"
      ? source.naturalWidth || (source as HTMLImageElement).width
      : (source as ImageBitmap).width;
  const height =
    "naturalHeight" in source && typeof source.naturalHeight === "number"
      ? source.naturalHeight || (source as HTMLImageElement).height
      : (source as ImageBitmap).height;

  const scale = Math.min(1, maxEdge / Math.max(width, height));
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas indisponible");
  ctx.drawImage(source, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality);
}

async function decodeToJpegDataUrl(blob: Blob): Promise<string> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob);
      try {
        return await jpegDataUrlFromBitmap(bitmap);
      } finally {
        bitmap.close();
      }
    } catch {
      // fall through to HTMLImageElement
    }
  }

  const objectUrl = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Décodage image impossible"));
      el.src = objectUrl;
    });
    return jpegDataUrlFromBitmap(img);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export async function photoFileToDataUrl(file: File): Promise<string> {
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Image trop lourde (max 12 Mo).");
  }
  if (!isSupportedPhoto(file)) {
    throw new Error("Choisis une image (JPG, PNG, WebP ou HEIC).");
  }

  let blob: Blob = file;

  if (isHeicLike(file)) {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    });
    blob = Array.isArray(converted) ? converted[0] : converted;
  }

  try {
    return await decodeToJpegDataUrl(blob);
  } catch {
    // Last resort: raw data URL (works for standard JPEG/PNG)
    return fileToDataUrl(blob);
  }
}
