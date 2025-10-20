// /src/components/Tournaments.tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────── Types ─────────── */
export type Tournament = {
  id: string;
  badge: string;
  title?: string;
  format: string;
  structure: string;
  time: string;
  entry: string;
  prizes: string[];
  cta?: { label: string; href: string }; // ← CTA is optional now
};

/* ─────────── Visual shells ─────────── */
const CARD_SHELL =
  "rounded-2xl ring-1 ring-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] " +
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)] " +
  "px-5 sm:px-6 py-5 sm:py-6";

const CTA_CLASSES =
  "inline-flex items-center justify-center px-6 py-3 rounded-md font-extrabold " +
  "uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow " +
  "bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)] hover:brightness-110 " +
  "active:translate-y-[1px] transition";

/* ─────────── Data ─────────── */
const ONE_PIECE_MAIN: Tournament = {
  id: "one-piece-main-sat",
  badge: "ONE PIECE — MAIN EVENT — SATURDAY",
  title: "One Piece TCG Championship (128-Player Cap)",
  format: "Constructed • 128 players max",
  structure:
    "Seven (7) Swiss rounds; play until a clear winner. Tiered prizing awarded Top 32 → Top 16 → Top 8 → Top 4 → Runner-Up → Champion (higher tiers receive everything listed below them).",
  time:
    "Saturday • Check-in/Player Meeting ~10:00 AM (TBA). Rounds fire immediately after. Expect full-day event.",
  entry:
    "Show admission required + $10–$15 tournament fee (final pricing TBA).",
  prizes: [
    "Top 32 – Product/prize support",
    "Top 16 – Additional product/prize support",
    "Top 8 – Additional product/prize support",
    "Top 4 – Premium prize bundle",
    "Runner-Up – Enhanced premium bundle",
    "Champion – Champion prize bundle (product) + accolades",
  ],
  cta: { label: "REGISTER NOW", href: "/tournaments/one-piece-main" },
};

const RIFTBOUND_MAIN: Tournament = {
  id: "riftbound-main-sun",
  badge: "RIFTBOUND — MAIN EVENT — SUNDAY",
  title: "Riftbound Championship (64-Player Cap)",
  format:
    "Constructed • 64 players max • Planned in partnership with Carde.io (TBC)",
  structure:
    "Five (5) Swiss rounds, cut to Top 4 single-elimination to determine a winner.",
  time:
    "Sunday • Schedule TBA (aiming for morning start). Expect half- to full-day event depending on turnout.",
  entry:
    "Show admission required + $10–$15 tournament fee (final pricing TBA).",
  prizes: [
    "Top 4 – Premium prize bundle",
    "Runner-Up – Enhanced premium bundle",
    "Champion – Champion prize bundle (product) + accolades",
  ],
  cta: { label: "REGISTER NOW", href: "/tournaments/riftbound-main" },
};

const WIN_A_BOX_PODS: Tournament = {
  id: "win-a-box-pods",
  badge: "SIDE EVENT — BOTH DAYS",
  title: "On-Demand 16-Player “Win a Box” Pods",
  format:
    "Single-elimination pods • 16 players • Offered both days; games may include One Piece, Gundam, Union Arena, and more (based on interest).",
  structure:
    "Single-elimination • Pods launch as soon as 16 players register. Quick, self-contained events.",
  time:
    "All weekend • On demand as pods fill. Sign-up on site at the Side Events desk.",
  entry: "$13 per player • Includes a participation pack.",
  prizes: [
    "Winner – 1 sealed booster box (or equivalent prize support)",
    "All players – 1 participation booster pack",
  ],
  // cta intentionally omitted → no button on the third card
};

/* ─────────── Section ─────────── */
export default function TournamentsSection({
  tournaments = [ONE_PIECE_MAIN, RIFTBOUND_MAIN, WIN_A_BOX_PODS],
  heading = "Tournaments",
}: {
  tournaments?: Tournament[];
  heading?: string;
}) {
  return (
    <section id="tournaments" className="relative w-full scroll-mt-28 md:scroll-mt-40">
      <div className="page-container py-16">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          {heading}
        </h2>

        <div className="mt-6">
          <div className="h-px w-full mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

        {/* Desktop: 2-up grid with equal-height items */}
        <div className="hidden md:grid gap-6 md:grid-cols-2 items-stretch">
          {tournaments.map((t) => (
            <div key={t.id} className="h-full">
              <div className={`${CARD_SHELL} h-full flex flex-col`}>
                <TournamentCardInner t={t} />
                {/* CTA anchored to bottom, only when present */}
                {t.cta && (
                  <div className="mt-auto pt-6">
                    <Link href={t.cta.href} className={CTA_CLASSES}>
                      {t.cta.label}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single-slide carousel */}
        <MobileCarousel items={tournaments} className="md:hidden" />
      </div>
    </section>
  );
}

/* ─────────── Mobile Carousel (equal-height slides + fixed dots) ─────────── */
function MobileCarousel({
  items,
  className = "",
}: {
  items: Tournament[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [slideW, setSlideW] = useState<number>(0);
  const [maxH, setMaxH] = useState<number>(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      const cw = containerRef.current?.clientWidth ?? 0;
      setSlideW(cw);
      const heights = slideRefs.current.map((n) => n?.offsetHeight ?? 0);
      setMaxH(Math.max(0, ...heights));
    };

    measure();
    const ro = new ResizeObserver(measure);
    const c = containerRef.current;
    const t = trackRef.current;
    if (c) ro.observe(c);
    if (t) ro.observe(t);
    slideRefs.current.forEach((n) => n && ro.observe(n));
    return () => ro.disconnect();
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handler = () => {
      const i = Math.round(el.scrollLeft / (slideW || 1));
      setIndex(i);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, [slideW]);

  const scrollTo = useCallback((i: number) => {
    trackRef.current?.scrollTo({ left: i * slideW, behavior: "smooth" });
  }, [slideW]);

  return (
    <div ref={containerRef} className={["relative", className].join(" ")}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar -mx-0"
        style={{ paddingBottom: 56 }} // fixed space for dots
      >
        {items.map((t, i) => (
          <div
            key={t.id}
            ref={(n) => (slideRefs.current[i] = n)}
            className="snap-start shrink-0 px-0"
            style={{ width: slideW || "100%" }}
          >
            <div
              className={`${CARD_SHELL} flex flex-col h-full`}
              style={{ minHeight: maxH || undefined }}
            >
              <TournamentCardInner t={t} />
              {t.cta && (
                <div className="mt-auto pt-6">
                  <Link href={t.cta.href} className={CTA_CLASSES}>
                    {t.cta.label}
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="pointer-events-auto h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor:
                i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────── Card inner content (no CTA here) ─────────── */
function TournamentCardInner({ t }: { t: Tournament }) {
  return (
    <>
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 items-center rounded-full bg-neutral-800/80 px-3 text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
          {t.badge}
        </span>
      </div>

      {/* Optional title */}
      {t.title && (
        <div className="mt-3">
          <div className="text-white/90 text-sm">{t.title}</div>
        </div>
      )}

      {/* Details */}
      <div className="mt-5 space-y-3 text-sm text-white/85">
        <InfoRow label="Format" value={t.format} />
        <InfoRow label="Structure" value={t.structure} />
        <InfoRow label="Time" value={t.time} />
        <InfoRow label="Entry" value={t.entry} />

        <div className="pt-1">
          <span className="block text-white/60 text-[11px] uppercase tracking-wide">
            Prizes
          </span>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
            {t.prizes.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="block text-white/60 text-[11px] uppercase tracking-wide">
        {label}
      </span>
      <p className="mt-1 text-white/90">{value}</p>
    </div>
  );
}
