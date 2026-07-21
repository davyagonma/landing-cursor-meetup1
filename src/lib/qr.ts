export function lumaQrUrl(lumaUrl: string, size = 200) {
  const data = encodeURIComponent(lumaUrl);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=000000&bgcolor=ffffff&data=${data}`;
}
