"use client";

import { useEffect, useRef, useState } from "react";

export default function ListenerCount() {
  const [count, setCount] = useState(0);
  const base = useRef(Math.floor(Math.random() * 220) + 80);

  useEffect(() => {
    setCount(base.current);
    const id = setInterval(() => {
      base.current += Math.random() > 0.5 ? 1 : -1;
      base.current = Math.max(50, Math.min(500, base.current));
      setCount(base.current);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  if (count === 0) return <div className="h-5 w-24" />;

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-white/70">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums">{count.toLocaleString()}</span>
      <span className="text-white/40">listening</span>
    </div>
  );
}
