"use client";

import { useTrack } from "@/app/context/TrackContext";

export default function SocialLinks() {
  const { currentTrack } = useTrack();

  const instagramHref = "https://www.instagram.com/subhasishrox/";
  const twitterHref = "https://x.com/subashishrox";

  const youtubeHref = currentTrack
    ? `https://www.youtube.com/watch?v=${currentTrack.videoId}`
    : "https://www.youtube.com";

  const spotifyQuery = currentTrack
    ? `${currentTrack.title} ${currentTrack.film || currentTrack.artist}`
    : "";

  const spotifyHref = currentTrack
    ? `https://open.spotify.com/search/${encodeURIComponent(spotifyQuery)}`
    : "https://open.spotify.com";

  const socials = [
    {
      label: "Instagram",
      href: instagramHref,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: twitterHref,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[16px] w-[16px]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      href: youtubeHref,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: "Spotify",
      href: spotifyHref,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="cursor-pointer text-white/50 transition-colors duration-200 hover:text-white/90"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
