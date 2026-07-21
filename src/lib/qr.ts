import QRCode from "qrcode";

export async function lumaQrDataUrl(lumaUrl: string, size = 200) {
  return QRCode.toDataURL(lumaUrl, {
    width: size,
    margin: 1,
    color: { dark: "#000000", light: "#ffffff" },
    errorCorrectionLevel: "M",
  });
}

/** @deprecated Prefer lumaQrDataUrl for canvas/export safety */
export function lumaQrUrl(lumaUrl: string, size = 200) {
  const data = encodeURIComponent(lumaUrl);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=000000&bgcolor=ffffff&data=${data}`;
}
