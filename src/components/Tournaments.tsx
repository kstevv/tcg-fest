// /src/components/Tournaments.tsx
import Link from "next/link";

type Tournament = {
  id: string;
  badge: string;                 // top-left pill
  title?: string;                // optional heading under badge
  format: string;
  structure: string;
  time: string;
  entry: string;
  prizes: string[];
  cta: { label: string; href: string };
};

const T1: Tournament = {
  id: "mtg-modern-lcq",
  badge: "MAGIC — MODERN — LCQ",
  title: "Regional Championship LCQ",
  format: "Modern",
  structure: "Five (5) single-elimination rounds.",
  time:
    "Every 30 minutes. Starting at 9:30AM, 10:00AM, 10:30AM, 11:00AM, 11:30AM, 12:00PM, 12:30PM, 1:00PM, 1:30PM, 2:00PM, 2:30PM, 3:00PM, 3:30PM, 4:00PM, 4:30PM, 5:00PM.",
  entry: "$25*",
  prizes: [
    "5 Wins – Regional Championship Qualification, 1000 Prize Wall Tickets",
    "4 Wins – 1000 Prize Wall Tickets",
    "3 Wins – 600 Prize Wall Tickets",
    "2 Wins – 300 Prize Wall Tickets",
    "1 Win – 100 Prize Wall Tickets",
  ],
  cta: { label: "REGISTER NOW", href: "/tournaments/modern-lcq" },
};

const T2: Tournament = {
  id: "mtg-avatar-sealed-lcq",
  badge: "MAGIC — AVATAR SEALED — LCQ",
  title: "Regional Championship LCQ",
  format: "Magic: The Gathering® | Avatar: The Last Airbender™ Sealed",
  structure: "Four (4) single-elimination rounds.",
  time:
    "Every 60 minutes. Starting at 9:30AM, 10:30AM, 11:30AM, 12:30PM, 1:30PM, 2:30PM, 3:30PM, 4:30PM.",
  entry: "$50*",
  prizes: [
    "4 Wins – Regional Championship Qualification, 600 Prize Wall Tickets",
    "3 Wins – 600 Prize Wall Tickets",
    "2 Wins – 300 Prize Wall Tickets",
    "1 Win – 100 Prize Wall Tickets",
  ],
  cta: { label: "REGISTER NOW", href: "/tournaments/avatar-sealed-lcq" },
};

export default function TournamentsSection({
  tournaments = [T1, T2],
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

        {/* Purple divider (same as Ticket Tiers) */}
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

function TournamentCard({ t }: { t: Tournament }) {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-[var(--color-lessdark)_20%] to-[rgba(19,19,19,0.4)] ring-1 ring-white/10 backdrop-blur shadow-2xl px-5 sm:px-6 py-5 sm:py-6">
      {/* Badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 items-center rounded-full bg-neutral-800 px-3 text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
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
        <DetailLine label="Format" value={t.format} />
        <DetailLine label="Structure" value={t.structure} />
        <DetailLine label="Time" value={t.time} />
        <DetailLine label="Entry" value={t.entry} />

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

      {/* CTA */}
      <div className="mt-6">
        <Link
          href={t.cta.href}
          className="block w-full rounded-xl bg-[#D52EF5] px-5 py-3 text-center text-sm font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,.2)] ring-1 ring-black/20 hover:brightness-110 active:translate-y-[1px] transition"
        >
          {t.cta.label}
        </Link>
      </div>
    </div>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="block text-white/60 text-[11px] uppercase tracking-wide">
        {label}
      </span>
      <p className="mt-1 text-white/90">{value}</p>
    </div>
  );
}
