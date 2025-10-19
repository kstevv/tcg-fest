// /src/components/Tournaments.tsx
import Link from "next/link";

export type Tournament = {
  id: string;
  badge: string; // top-left pill
  title?: string; // optional heading under badge
  format: string;
  structure: string;
  time: string;
  entry: string;
  prizes: string[];
  cta: { label: string; href: string };
};

/* ---------- Same visual shell & CTA as Ticket Tiers ---------- */
const CARD_SHELL =
  "rounded-2xl ring-1 ring-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] " +
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)] " +
  "px-5 sm:px-6 py-5 sm:py-6";

const CTA_CLASSES =
  "inline-flex items-center justify-center px-6 py-3 rounded-md font-extrabold " +
  "uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow " +
  "bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)] hover:brightness-110 " +
  "active:translate-y-[1px] transition";

/* -------------------- Latest tournament data -------------------- */

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
  cta: { label: "JOIN A POD", href: "/tournaments/win-a-box" },
};

/* -------------------- Section -------------------- */

export default function TournamentsSection({
  tournaments = [ONE_PIECE_MAIN, RIFTBOUND_MAIN, WIN_A_BOX_PODS],
  heading = "Tournaments",
}: {
  tournaments?: Tournament[];
  heading?: string;
}) {
  return (
    <section className="relative w-full">
      <div className="page-container py-16">
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          {heading}
        </h2>

        {/* Purple divider — same as Ticket Tiers */}
        <div className="mt-6">
          <div className="h-px w-full mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {tournaments.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Card -------------------- */

function TournamentCard({ t }: { t: Tournament }) {
  return (
    <div className={CARD_SHELL}>
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

      {/* CTA (same gradient + shape as Ticket Tiers) */}
      <div className="mt-6">
        <Link href={t.cta.href} className={CTA_CLASSES}>
          {t.cta.label}
        </Link>
      </div>
    </div>
  );
}

/* Single helper name (prevents duplicate identifier errors) */
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
