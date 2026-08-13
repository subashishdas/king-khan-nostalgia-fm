"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track as vaTrack } from "@vercel/analytics";
import { playlists, type Track } from "@/app/data/tracks";

/* ─── Augment Window for YouTube callback ──────────────────────────── */
declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

/* ─── Helpers ──────────────────────────────────────────────────────── */
function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ─── SVG Icons (module-scope) ─────────────────────────────────────── */
function PrevIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  );
}

function NextIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z" />
    </svg>
  );
}

function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6zm8-14v14h4V5z" />
    </svg>
  );
}

/* ─── SeekBar (module-scope) ───────────────────────────────────────── */
function SeekBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (frac: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  const getFraction = (e: React.PointerEvent | PointerEvent) => {
    const rect = barRef.current!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    onSeek(getFraction(e));

    const onMove = (ev: PointerEvent) => onSeek(getFraction(ev));
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  return (
    <div
      ref={barRef}
      className="group relative flex h-5 w-full cursor-pointer touch-none items-center"
      onPointerDown={handlePointerDown}
    >
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div
        className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        style={{ left: `calc(${progress * 100}% - 5px)` }}
      />
    </div>
  );
}

/* ─── Transport Controls (module-scope) ────────────────────────────── */
function TransportControls({
  isPlaying,
  onPrev,
  onPlayPause,
  onNext,
  size = "desktop",
}: {
  isPlaying: boolean;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
  size?: "desktop" | "mobile";
}) {
  const isMobile = size === "mobile";

  return (
    <div className={`flex items-center ${isMobile ? "gap-6" : "gap-2"}`}>
      <button
        onClick={onPrev}
        aria-label="Previous track"
        className={`flex cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-white ${isMobile ? "h-10 w-10" : ""}`}
      >
        <PrevIcon size={isMobile ? 22 : 18} />
      </button>

      {isMobile ? (
        <button
          onClick={onPlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-accent to-accent-light text-black ring-1 ring-white/25 shadow-[0_4px_16px_var(--color-accent)] transition-transform active:scale-95"
        >
          {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
        </button>
      ) : (
        <button
          onClick={onPlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        </button>
      )}

      <button
        onClick={onNext}
        aria-label="Next track"
        className={`flex cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-white ${isMobile ? "h-10 w-10" : ""}`}
      >
        <NextIcon size={isMobile ? 22 : 18} />
      </button>
    </div>
  );
}

/* ─── Vinyl Disc with album art (module-scope) ─────────────────────── */
function VinylDisc({
  isPlaying,
  videoId,
  size,
}: {
  isPlaying: boolean;
  videoId: string;
  size: number;
}) {
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <div
        className="h-full w-full overflow-hidden rounded-full"
        style={{
          animation: "spin 8s linear infinite",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        {/* Album art thumbnail */}
        <img
          src={thumbUrl}
          alt="Album art"
          className="absolute inset-0 h-full w-full scale-[1.6] object-cover"
          draggable={false}
        />
        {/* Dark tint to blend with vinyl look */}
        <div className="absolute inset-0 rounded-full bg-black/25" />
        {/* Concentric grooves overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `repeating-radial-gradient(
              circle at center,
              transparent 0px,
              transparent 3px,
              rgba(255,255,255,0.12) 3px,
              rgba(255,255,255,0.12) 4px
            )`,
          }}
        />
      </div>
      {/* Spindle hole */}
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-[1.5px] ring-white/40" />
    </div>
  );
}

/* ─── Desktop / Tablet Player (module-scope) ───────────────────────── */
function DesktopPlayer({
  track,
  isPlaying,
  progress,
  elapsed,
  onSeek,
  onPrev,
  onPlayPause,
  onNext,
}: {
  track: Track;
  isPlaying: boolean;
  progress: number;
  elapsed: number;
  onSeek: (frac: number) => void;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
}) {
  return (
    <div className="hidden sm:flex items-center gap-3.5 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.14] to-white/[0.05] px-4 py-2.5 pr-5 backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all">
      <VinylDisc isPlaying={isPlaying} videoId={track.videoId} size={54} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight text-white md:text-[15px]">
              {track.title}
            </p>
            <p className="truncate text-xs leading-tight text-white/60 md:text-[12.5px]">
              {track.artist}
              {track.film && (
                <span className="text-white/35">
                  {" · "}
                  {track.film}
                  {track.year ? ` (${track.year})` : ""}
                </span>
              )}
            </p>
          </div>
          <TransportControls
            isPlaying={isPlaying}
            onPrev={onPrev}
            onPlayPause={onPlayPause}
            onNext={onNext}
            size="desktop"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <SeekBar progress={progress} onSeek={onSeek} />
          <span className="flex-shrink-0 text-[10.5px] tabular-nums text-white/45 md:text-xs">
            {formatTime(elapsed)} / {formatTime(track.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Player (module-scope) ─────────────────────────────────── */
function MobilePlayer({
  track,
  isPlaying,
  progress,
  elapsed,
  onSeek,
  onPrev,
  onPlayPause,
  onNext,
}: {
  track: Track;
  isPlaying: boolean;
  progress: number;
  elapsed: number;
  onSeek: (frac: number) => void;
  onPrev: () => void;
  onPlayPause: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.14] to-white/[0.05] p-3.5 backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] sm:hidden">
      {/* Row 1: vinyl + info */}
      <div className="flex items-center gap-3">
        <VinylDisc isPlaying={isPlaying} videoId={track.videoId} size={46} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold leading-tight text-white">
            {track.title}
          </p>
          <p className="truncate text-xs leading-tight text-white/60">
            {track.artist}
            {track.film && (
              <span className="text-white/35">
                {" · "}
                {track.film}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Row 2: seek bar + timestamps */}
      <div className="flex flex-col gap-1">
        <SeekBar progress={progress} onSeek={onSeek} />
        <div className="flex items-center justify-between text-[10.5px] tabular-nums text-white/45">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Row 3: centered control buttons */}
      <div className="flex items-center justify-center pt-0.5">
        <TransportControls
          isPlaying={isPlaying}
          onPrev={onPrev}
          onPlayPause={onPlayPause}
          onNext={onNext}
          size="mobile"
        />
      </div>
    </div>
  );
}

/* ─── Playlist Switcher (module-scope) ─────────────────────────────── */
function PlaylistSwitcher({
  activeIndex,
  onSwitch,
}: {
  activeIndex: number;
  onSwitch: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
      {playlists.map((pl, i) => (
        <button
          key={pl.name}
          onClick={() => onSwitch(i)}
          className={`cursor-pointer rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 ${
            i === activeIndex
              ? "bg-white/15 text-white shadow-sm"
              : "text-white/50 hover:text-white/80"
          }`}
        >
          {pl.name}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main PlayerClient Component
   ═══════════════════════════════════════════════════════════════════ */
const YT_EMBED_ID = "yt-embed";

export default function PlayerClient() {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);

  const playerRef = useRef<YT.Player | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const apiReady = useRef(false);
  const pendingVideoId = useRef<string | null>(null);
  const consecutiveErrors = useRef(0);
  const errorSkipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentPlaylist = playlists[playlistIndex];
  const currentTrack = currentPlaylist.tracks[trackIndex];

  /* ── Load YouTube IFrame API ─────────────────────────────────────── */
  useEffect(() => {
    if (document.getElementById("yt-api-script")) return;

    const tag = document.createElement("script");
    tag.id = "yt-api-script";
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      apiReady.current = true;
      if (pendingVideoId.current) {
        createPlayer(pendingVideoId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Create or load player ───────────────────────────────────────── */
  const createPlayer = useCallback((videoId: string) => {
    // Destroy existing player
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch { /* ignore */ }
      playerRef.current = null;
    }

    // Recreate the div since destroy removes it
    const container = document.getElementById(YT_EMBED_ID);
    if (!container) {
      const parent = document.getElementById("yt-embed-parent");
      if (parent) {
        const div = document.createElement("div");
        div.id = YT_EMBED_ID;
        parent.appendChild(div);
      }
    }

    playerRef.current = new window.YT.Player(YT_EMBED_ID, {
      videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onStateChange: handleStateChange,
        onError: handleError,
      },
    });
  }, []);

  /* ── Initialize player on first render ──────────────────────────── */
  useEffect(() => {
    if (apiReady.current) {
      createPlayer(currentTrack.videoId);
    } else {
      pendingVideoId.current = currentTrack.videoId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const historyStack = useRef<number[]>([]);

  /* ── Handle track / playlist changes ─────────────────────────────── */
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      playerRef.current.loadVideoById(currentTrack.videoId);
      setElapsed(0);
      setProgress(0);
      setIsPlaying(true);
    } catch {
      createPlayer(currentTrack.videoId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistIndex, trackIndex]);

  /* ── State change handler ────────────────────────────────────────── */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStateChange = useCallback((event: any) => {
    const state = event.data;
    if (state === 1) {
      // PLAYING — reset error counter, this track works
      consecutiveErrors.current = 0;
      setIsPlaying(true);
    } else if (state === 2) {
      setIsPlaying(false);
    } else if (state === 0) {
      setIsPlaying(false);
      consecutiveErrors.current = 0;
      nextTrackRef.current();
    }
  }, []);

  /* ── Error handler (debounced, capped at 3 consecutive) ──────────── */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = useCallback((event: any) => {
    console.warn(`YouTube error ${event.data} for video ${currentTrack.videoId}`);
    try {
      vaTrack("youtube_error", {
        code: String(event.data),
        videoId: currentTrack.videoId,
      });
    } catch { /* analytics not loaded yet */ }

    // Stop auto-skipping after 3 consecutive errors
    consecutiveErrors.current += 1;
    if (consecutiveErrors.current > 3) {
      console.warn("Too many consecutive errors — stopping auto-skip.");
      return;
    }

    // Debounce: wait 1.5s before skipping to avoid rapid chain-skipping
    if (errorSkipTimer.current) clearTimeout(errorSkipTimer.current);
    errorSkipTimer.current = setTimeout(() => {
      nextTrackRef.current();
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack.videoId]);

  /* ── Progress ticker ─────────────────────────────────────────────── */
  useEffect(() => {
    if (progressTimer.current) clearInterval(progressTimer.current);

    if (isPlaying && playerRef.current) {
      progressTimer.current = setInterval(() => {
        try {
          const current = playerRef.current?.getCurrentTime?.() ?? 0;
          const duration = playerRef.current?.getDuration?.() ?? currentTrack.duration;
          setElapsed(current);
          setProgress(duration > 0 ? current / duration : 0);
        } catch { /* player not ready */ }
      }, 400);
    }

    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [isPlaying, currentTrack.duration]);

  /* ── Transport handlers (Random / History) ───────────────────────── */
  const getRandomTrackIndex = useCallback(
    (currentIndex: number, total: number) => {
      if (total <= 1) return 0;
      let nextIndex = currentIndex;
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * total);
      }
      return nextIndex;
    },
    []
  );

  const nextTrack = useCallback(() => {
    consecutiveErrors.current = 0;
    if (errorSkipTimer.current) clearTimeout(errorSkipTimer.current);

    setTrackIndex((prev) => {
      historyStack.current.push(prev);
      return getRandomTrackIndex(prev, currentPlaylist.tracks.length);
    });
  }, [currentPlaylist.tracks.length, getRandomTrackIndex]);

  const prevTrack = useCallback(() => {
    consecutiveErrors.current = 0;
    if (errorSkipTimer.current) clearTimeout(errorSkipTimer.current);

    if (historyStack.current.length > 0) {
      const lastIndex = historyStack.current.pop()!;
      setTrackIndex(lastIndex);
    } else {
      setTrackIndex((prev) => getRandomTrackIndex(prev, currentPlaylist.tracks.length));
    }
  }, [currentPlaylist.tracks.length, getRandomTrackIndex]);

  const nextTrackRef = useRef(nextTrack);
  nextTrackRef.current = nextTrack;

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch { /* ignore */ }
  }, [isPlaying]);

  const handleSeek = useCallback(
    (frac: number) => {
      if (!playerRef.current) return;
      const duration = playerRef.current.getDuration?.() ?? currentTrack.duration;
      const seekTo = frac * duration;
      try {
        playerRef.current.seekTo(seekTo, true);
      } catch { /* ignore */ }
      setElapsed(seekTo);
      setProgress(frac);
    },
    [currentTrack.duration]
  );

  const switchPlaylist = useCallback((i: number) => {
    historyStack.current = [];
    setPlaylistIndex(i);
    setTrackIndex(0);
    setElapsed(0);
    setProgress(0);
  }, []);

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <>
      <div className="mx-auto flex w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl flex-col items-center gap-2.5">
        <PlaylistSwitcher activeIndex={playlistIndex} onSwitch={switchPlaylist} />

        {/* Desktop player */}
        <div className="w-full hidden sm:block">
          <DesktopPlayer
            track={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            elapsed={elapsed}
            onSeek={handleSeek}
            onPrev={prevTrack}
            onPlayPause={togglePlayPause}
            onNext={nextTrack}
          />
        </div>

        {/* Mobile player */}
        <div className="w-full sm:hidden">
          <MobilePlayer
            track={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            elapsed={elapsed}
            onSeek={handleSeek}
            onPrev={prevTrack}
            onPlayPause={togglePlayPause}
            onNext={nextTrack}
          />
        </div>
      </div>

      {/* YouTube iframe — fully isolated off-screen container */}
      <div
        className="pointer-events-none"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          clipPath: "inset(50%)",
          zIndex: -100,
          opacity: 0,
        }}
      >
        <div id="yt-embed-parent" style={{ width: 320, height: 180 }}>
          <div id={YT_EMBED_ID} />
        </div>
      </div>
    </>
  );
}
