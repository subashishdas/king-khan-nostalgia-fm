"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<{ h: string; m: string; period: string } | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    function tick() {
      const raw = fmt.format(new Date());
      // raw looks like "9:07 pm"
      const [timePart, period] = raw.split(" ");
      const [h, m] = timePart.split(":");
      setTime({ h, m, period: period.toUpperCase() });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return <div className="h-6 w-20" />; // SSR placeholder

  return (
    <div className="flex items-baseline gap-0.5 font-mono text-sm font-medium tracking-wider text-white/80">
      <span>{time.h}</span>
      <span className="animate-blink">:</span>
      <span>{time.m}</span>
      <span className="ml-1 text-[10px] text-white/50">{time.period}</span>
    </div>
  );
}
