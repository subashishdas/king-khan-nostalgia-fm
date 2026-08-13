"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Track } from "@/app/data/tracks";

interface TrackContextType {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
}

const TrackContext = createContext<TrackContextType>({
  currentTrack: null,
  setCurrentTrack: () => {},
});

export function TrackProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
}

export function useTrack() {
  return useContext(TrackContext);
}
