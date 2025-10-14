import Link from "next/link";

type Tier = {
  id: string;
  title: string;
  subtitle: string;
  oldPrice?: string;
  newPrice: string;
  term: string;
  finePrint?: string;
  cta: { label: string; href: string };
  badges?: Array<{ label: string }>;
};

const LEFT: Tier = {
  id: "with-tv",
  title: "Saturday Single Day Ticket",
  subtitle: "NEW Month-to-Month",
  oldPrice: "$47.50",
  newPrice: "$34.50/mo",
  term: "for 8 months",
  finePrint: "+$49.99/mo for YouTube TV for your first 2 months, then $82.99/mo",
  cta: { label: "Tickets", href: "/tickets" },
  badges: [{ label: "SATURDAY TICKET" }],
};

const RIGHT: Tier = {
  id: "Sunday Single Day Ticket",
  title: "Sunday Single Day Ticket",
  subtitle: "NEW Month-to-Month",
  oldPrice: "$60",
  newPrice: "$34.50/mo",
  term: "for 8 months",
  finePrint: "+$49.99/mo for YouTube TV for your first 2 months, then $82.99/mo",
  cta: { label: "Tickets", href: "/tickets" },
  badges: [{ label: "SUNDAY TICKET" }],
};

/** Match the lighter/glassy cards used in Get Involved */
const CARD_SHELL =
  "rounded-2xl ring-1 ring-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] " +
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)] " +
  "px-5 sm:px-6 py-5 sm:py-6";

/** Same gradient, square buttons you liked (not full width) */
const CTA_CLASSES =
  "inline-flex items-center justify-center px-6 py-3 rounded-md font-extrabold " +
  "uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow " +
  "bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)] hover:brightness-110 " +
  "active:translate-y-[1px] transition";

export default function TicketTiers() {
  return (
    <section className="relative isolate" aria-labelledby="ticket-hero-heading">
      {/* If you ever want a soft vignette again, re-enable this but keep it subtle */}
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,rgba(0,0,0,.18),transparent_70%)]" /> */}

      <div className="page-container">
        {/* Headline */}
        <h2
          id="ticket-hero-heading"
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white pb-6"
        >
          Ticket Tiers
        </h2>

        {/* Purple divider — same container width */}
        <div className="mt-0">
          <div className="h-px w-full mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <TierCard tier={LEFT} />
          <TierCard tier={RIGHT} />
        </div>

        {/* Explore link */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/tickets"
            className="text-sm font-semibold tracking-wide text-white/90 hover:text-white underline underline-offset-4"
          >
            EXPLORE TIERS
          </Link>
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div className={CARD_SHELL}>
      {/* Badges */}
      <div className="flex items-center gap-2">
        {tier.badges?.map((b, i) => (
          <span
            key={i}
            className="inline-flex h-8 items-center rounded-full bg-neutral-800/80 px-3 text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15"
          >
            {b.label}
          </span>
        ))}
      </div>

      {/* Title / subtitle */}
      <div className="mt-3">
        <div className="text-white/90 text-sm">{tier.title}</div>
        <div className="text-emerald-400 text-xs font-semibold mt-1">
          {tier.subtitle}
        </div>
      </div>

      {/* Pricing block */}
      <div className="mt-4 text-white">
        <div className="flex items-baseline gap-2">
          {tier.oldPrice && (
            <span className="text-sm text-white/60 line-through">
              {tier.oldPrice}
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-extrabold">
            {tier.newPrice}
          </span>
          <span className="text-base sm:text-lg font-semibold">,</span>
        </div>
        <div className="text-base sm:text-lg font-extrabold -mt-1">
          {tier.term}
        </div>
        <div className="mt-1 text-xs text-white/70">
          or <span className="font-semibold">$85/mo,</span> cancel anytime*
        </div>
      </div>

      {/* Fine print */}
      {tier.finePrint && (
        <p className="mt-3 text-[11px] leading-4 text-white/60">{tier.finePrint}</p>
      )}

      {/* CTA (not full width) */}
      <div className="mt-5">
        <Link href={tier.cta.href} className={CTA_CLASSES}>
          {tier.cta.label}
        </Link>
      </div>
    </div>
  );
}
