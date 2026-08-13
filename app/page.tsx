import Clock from "@/app/components/Clock";
import ListenerCount from "@/app/components/ListenerCount";
import SocialLinks from "@/app/components/SocialLinks";
import PlayerClient from "@/app/components/PlayerClient";

/* Grain SVG data URI */
const GRAIN_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E`;

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-between overflow-x-hidden">
      {/* ── 1. Fixed Background ───────────────────────────────────── */}
      <div className="hero-bg fixed inset-0 -z-20" />
      {/* Gradient overlay */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-black/35 via-transparent to-black/80" />

      {/* ── 2. Fixed Grain Overlay ────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── 3. Top Row ────────────────────────────────────────────── */}
      <header className="safe-top safe-x z-10 flex w-full max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-5">
        {/* Top-left: Clock */}
        <div className="flex-shrink-0">
          <Clock />
        </div>

        {/* Top-centre: Listener count */}
        <div className="flex-shrink-0">
          <ListenerCount />
        </div>

        {/* Top-right: Social links */}
        <div className="flex-shrink-0">
          <SocialLinks />
        </div>
      </header>

      {/* ── Spacer ────────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── 4. Fixed Player (always visible at bottom on all screens) ── */}
      <footer className="fixed bottom-0 inset-x-0 safe-bottom z-20 flex w-full justify-center px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
          <PlayerClient />
        </div>
      </footer>
    </main>
  );
}
