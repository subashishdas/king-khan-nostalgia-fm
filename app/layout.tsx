import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nostalgia FM — Lofi & Chill Music",
  description:
    "A curated listening experience. Lofi beats, Bollywood nostalgia, and late-night vibes — all in one place.",
  keywords: ["lofi", "music", "nostalgia", "chill", "radio", "ambient"],
  openGraph: {
    title: "Nostalgia FM",
    description: "Curated lofi & chill music for late nights.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
