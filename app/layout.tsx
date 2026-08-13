import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackProvider } from "@/app/context/TrackContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nostalgia FM — SRK Era Music",
  description:
    "A curated listening experience. Bollywood SRK nostalgia and late-night vibes — all in one place.",
  keywords: ["srk", "bollywood", "nostalgia", "music", "radio", "ambient"],
  openGraph: {
    title: "Nostalgia FM — The Classic SRK Era",
    description: "Curated Bollywood SRK music for late-night nostalgia.",
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
        <TrackProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </TrackProvider>
      </body>
    </html>
  );
}
