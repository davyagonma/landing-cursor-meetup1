import type { Metadata } from "next";
import { Caveat, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cursor Bénin Meetup 2026",
  description:
    "Meetup Cursor Community Bénin — agents IA, démos live, panels et badges J’y serai. 25 juillet 2026 à SOROC ZOGBO.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/icons/app-icon-2d-dark.png", type: "image/png" },
    ],
    apple: [{ url: "/brand/icons/app-icon-2d-dark.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
