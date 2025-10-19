"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(targetMs: number, nowMs: number): Parts {
  let delta = Math.max(0, targetMs - nowMs); // clamp at 0
  const days = Math.floor(delta / 86_400_000);
  delta -= days * 86_400_000;

  const hours = Math.floor(delta / 3_600_000);
  delta -= hours * 3_600_000;

  const minutes = Math.floor(delta / 60_000);
  delta -= minutes * 60_000;

  const seconds = Math.floor(delta / 1000);

  return { days, hours, minutes, seconds };
}

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export type CountdownProps = {
  /** ISO string with timezone (recommended), or a Date instance. */
  startAt: string | Date;
  /** Include seconds? Defaults to true. */
  showSeconds?: boolean;
  /** Optional callback when countdown reaches zero. */
  onEnd?: () => void;
  className?: string;
  /** Render prop for custom layout. */
  children?: (p: Parts) => React.ReactNode;
};

export default function Countdown({
  startAt,
  showSeconds = true,
  onEnd,
  className = "",
  children,
}: CountdownProps) {
  // Parse once
  const targetMs = useMemo(
    () => (startAt instanceof Date ? startAt.getTime() : new Date(startAt).getTime()),
    [startAt]
  );

  const [now, setNow] = useState<number>(() => Date.now());
  const endedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000); // 1s tick
    return () => clearInterval(id);
  }, []);

  const parts = diffParts(targetMs, now);
  const isOver = targetMs - now <= 0;

  useEffect(() => {
    if (isOver && !endedRef.current) {
      endedRef.current = true;
      onEnd?.();
    }
  }, [isOver, onEnd]);

  const defaultView = (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-md ring-1 ring-white/10",
        "bg-gradient-to-b from-[var(--color-lessdark,_#0E0F1A)] to-[rgba(19,19,19,0.5)]",
        "px-3 py-2 text-white",
        className,
      ].join(" ")}
      aria-live="polite"
      aria-atomic="true"
    >
      <TimeBox label="Days" value={parts.days} />
      <Colon />
      <TimeBox label="Hours" value={parts.hours} pad />
      <Colon />
      <TimeBox label="Minutes" value={parts.minutes} pad />
      {showSeconds && (
        <>
          <Colon />
          <TimeBox label="Seconds" value={parts.seconds} pad />
        </>
      )}
    </div>
  );

  return <>{children ? children(parts) : defaultView}</>;
}

function TimeBox({
  label,
  value,
  pad = false,
}: {
  label: string;
  value: number;
  pad?: boolean;
}) {
  return (
    <span className="inline-flex flex-col items-center leading-none">
      <span className="text-xl font-extrabold tabular-nums">
        {pad ? pad2(value) : value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.14em] text-white/70">{label}</span>
    </span>
  );
}

function Colon() {
  return <span className="text-white/40 tabular-nums">:</span>;
}
