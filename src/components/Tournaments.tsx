// /src/components/Tournaments.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- Tournament type ---------- */
export type Tournament = {
  id: string;
  badge: string;
  title?: string;
  logo?: string;
  format: string;
  structure: string;
  time: string;
  entry: string;
  prizes: string[];
  cta?: { label: string; href: string }; // optional for on-site-only events
};

/* ---------- Shared styles ---------- */
/** Fixed min height on the CARD itself ensures all pills are the same height */
const CARD_SHELL =
  "flex h-full min-h-[560px] flex-col rounded-2xl ring-1 ring-white/10 " +
  "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] " +
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)] " +
  "px-5 sm:px-6 py-5 sm:py-6";

const CTA_CLASSES =
  "inline-flex items-center justify-center px-6 py-3 rounded-md font-extrabold " +
  "uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow " +
  "bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)] hover:brightness-110 " +
  "active:translate-y-[1px] transition";

/** Keep CTA area equal across cards: height matches button (+ breathing room) */
const CTA_FOOTER_WRAPPER = "mt-auto pt-6";
const CTA_FOOTER_INNER = "min-h-[52px] flex justify-center md:justify-start"; // spacer height

/* ---------- Tournament data ---------- */

const ONE_PIECE_MAIN: Tournament = {
  id: "one-piece-main-sat",
  badge: "ONE PIECE — MAIN EVENT — SATURDAY",
  title: "One Piece TCG Championship Tournament",
  logo: "/images/logos/one-piece-logo.png",
  format: "Constructed • 128 players max",
  structure: "Seven (7) Swiss rounds; play until a clear winner.",
  time:
    "Saturday • Check-in/Player Meeting ~10:00 AM (TBA). Rounds fire immediately after. Expect full-day event.",
  entry:
    "$25 tournament fee (2-day general admission show admission included).",
  prizes: [
    "Tiered prizing awarded Top 32 → Top 16 → Top 8 → Top 4 → Runner-Up → Champion (higher tiers receive everything listed below them).",
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
  title: "Riftbound TCG Championship Tournament",
  logo: "/images/logos/riftbound-logo.jpeg",
  format:
    "Constructed • 64 players max • Planned in partnership with Carde.io",
  structure:
    "Five (5) Swiss rounds, cut to Top 4 single-elimination to determine a winner.",
  time:
    "Sunday • Schedule TBA (aiming for morning start). Expect half to full-day event depending on turnout.",
  entry:
    "$25 tournament fee (2-day general admission show admission included).",
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
  logo: "",
  format:
    "Single-elimination pods • 16 players • Offered both days; games may include One Piece, Gundam, Union Arena, and more (based on interest).",
  structure:
    "Single-elimination • Pods launch as soon as 16 players register. Quick, self-contained events.",
  time:
    "All weekend • On demand as pods fill. Sign-up on site at the Side Events desk.",
  entry: "$13 per player (includes a participation pack).",
  prizes: [
    "Winner – 1 sealed booster box (or equivalent prize support)",
    "All players – 1 participation booster pack",
  ],
  // no CTA (on-site only)
};

/* ---------- Section ---------- */

export default function TournamentsSection({
  tournaments = [ONE_PIECE_MAIN, RIFTBOUND_MAIN, WIN_A_BOX_PODS],
  heading = "Tournaments",
}: {
  tournaments?: Tournament[];
  heading?: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  // clean ref setter
  const setSlideRef = (index: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[index] = el;
  };

  // Update active index on scroll (mobile)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!slideRefs.current.length) return;
      const left = el.getBoundingClientRect().left;
      const offsets = slideRefs.current.map((n) =>
        n ? Math.abs(n.getBoundingClientRect().left - left) : Number.MAX_SAFE_INTEGER
      );
      const next = offsets.indexOf(Math.min(...offsets));
      setActive(next < 0 ? 0 : next);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const dots = useMemo(() => tournaments.length, [tournaments.length]);

  return (
    <section id="tournaments" className="relative w-full scroll-mt-28 md:scroll-mt-40">
      <div className="page-container py-16">
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          {heading}
        </h2>

        {/* Divider — tighter on mobile, unchanged on desktop */}
        <div className="mt-2 md:mt-6">
          <div className="h-px w-full mb-5 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

        {/* Mobile: 1-up carousel */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            className="flex flex-nowrap snap-x snap-mandatory overflow-x-auto scroll-smooth gap-3 scroll-px-4 [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {tournaments.map((t, i) => (
              <div
                key={t.id}
                ref={setSlideRef(i)}
                className="flex-none basis-[calc(100%-0.75rem)] snap-center snap-always"
              >
                {/* Card has min-h baked in, so no wrapper min-h needed */}
                <TournamentCard t={t} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: dots }).map((_, i) => (
              <span
                key={i}
                className={["h-2 w-2 rounded-full", i === active ? "bg-white" : "bg-white/30"].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 2-up grid */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6">
          {tournaments.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */

function TournamentCard({ t }: { t: Tournament }) {
  return (
    <div className={CARD_SHELL}>
      {/* Header */}
      <div className="mb-4">
        {/* Mobile */}
        <div className="md:hidden">
          {t.logo && (
            <div className="flex justify-center mb-3">
              <img
                src={t.logo}
                alt={`${t.title || t.badge} logo`}
                className="h-10 w-auto object-contain"
              />
            </div>
          )}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center justify-center rounded-full bg-neutral-800/80 px-3 py-[6px] text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15 text-center leading-none">
              {t.badge}
            </span>
          </div>
          {t.title && (
            <div className="mt-3 text-center">
              <div className="text-white/90 text-sm font-extrabold">{t.title}</div>
            </div>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex md:items-center md:justify-between md:gap-6">
          <div className="min-w-0">
            <span className="inline-flex items-center justify-center rounded-full bg-neutral-800/80 px-3 py-[6px] text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15 leading-none">
              {t.badge}
            </span>
            {t.title && (
              <div className="mt-3">
                <div className="text-white/90 text-sm font-extrabold">{t.title}</div>
              </div>
            )}
          </div>
          {t.logo && (
            <div className="shrink-0 flex items-center">
              <Image
                src={t.logo}
                alt={`${t.title || t.badge} logo`}
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 md:mt-3 space-y-3 text-sm text-white/85">
        <InfoRow label="Format" value={t.format} />
        <InfoRow label="Structure" value={t.structure} />
        <InfoRow label="Time" value={t.time} />
        <InfoRow label="Entry" value={t.entry} />
        <div className="pt-1">
          <span className="block text-white/60 text-[11px] uppercase tracking-wide">
            Prizes
          </span>

          {/* If the first prize line starts with "Tiered prizing" — show it as plain text */}
          {t.prizes.length > 0 && t.prizes[0].startsWith("Tiered prizing") ? (
            <>
              <p className="mt-2 text-white/85">{t.prizes[0]}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
                {t.prizes.slice(1).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-white/85">
              {t.prizes.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer — fixed-height zone so CTAs align across cards */}
      <div className={CTA_FOOTER_WRAPPER}>
        <div className={CTA_FOOTER_INNER}>
          {t.cta ? (
            <Link href={t.cta.href} className={CTA_CLASSES}>
              {t.cta.label}
            </Link>
          ) : (
            // Equal spacer when no CTA so bottom margin matches
            <div className="h-[44px]" aria-hidden /> // ~button visual height
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Info Row ---------- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="block text-white/60 text-[11px] uppercase tracking-wide">{label}</span>
      <p className="mt-1 text-white/90">{value}</p>
    </div>
  );
}
