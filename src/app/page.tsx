// /src/app/page.tsx
import Link from "next/link";
import Programming from "@/components/Programming";
import SpecialGuestsSection from "@/components/Speakers/SpecialGuestsSection";
import TournamentsSection from "@/components/Tournaments";
import TicketTiers from "@/components/TicketTiers";
import GetInvolved from "@/components/GetInvolved";
import Venue from "@/components/Venue";
import FAQSection from "@/components/FAQ";
import { TCGFEST_FAQ } from "@/data/faq";
import { GUESTS } from "@/data/guests";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="pt-8 md:pt-12">
        <div className="page-container">
          <section className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white p-8 md:p-14 shadow-card">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              TCGFest 2026
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-90">
              Two days of tournaments, vendors, trading, and panels. January 31st &amp; Feb 1st •
              Travis County Exposition Center
            </p>

            <div className="mt-6 flex gap-3">
              <Ribbon
                href="/tickets"
                label="GET TICKETS"
                className="bg-[#5416DD] text-white"
                size="lg"
              />
            </div>
          </section>
        </div>
      </header>

      {/* Main content (order matches the About dropdown) */}
      <main className="space-y-20 md:space-y-24">
        {/* 1) Special Guests */}
        <SpecialGuestsSection speakers={GUESTS} />

        {/* 2) Experience */}
        <Programming />

        {/* 3) Tournaments */}
        <TournamentsSection />

        {/* 4) Ticket tiers */}
        <TicketTiers />

        {/* 5) Get involved */}
        <GetInvolved />

        {/* 6) Venue (moved here — below Get Involved) */}
        <Venue
          title="Travis County Exposition Center"
          address="7311 Decker Ln, Austin, TX 78724"
        />

        {/* 7) FAQ */}
        <FAQSection items={TCGFEST_FAQ} />
      </main>
    </>
  );
}

/* ---------- Notched "ticket" button (same style as header) ---------- */
function Ribbon({
  href,
  label,
  className = "",
  size = "md",
}: {
  href: string;
  label: string;
  className?: string;
  /** sm | md | lg */
  size?: "sm" | "md" | "lg";
}) {
  const sizing =
    size === "lg"
      ? "h-11 px-6 text-[12px] tracking-[0.25em]"
      : size === "md"
      ? "h-10 px-5 text-[12px] tracking-[0.22em]"
      : "h-9 px-4 text-[11px] tracking-[0.18em]";

  const rightNotch =
    size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const leftNotch =
    size === "lg" ? "h-4 w-4" : size === "md" ? "h-3.5 w-3.5" : "h-3 w-3";
  const bottomTabWidth = size === "lg" ? "w-10" : size === "md" ? "w-8" : "w-7";

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center rounded-md font-extrabold uppercase leading-none shadow ring-1 ring-black/15 hover:brightness-110 active:translate-y-[1px] transition ${sizing} ${className}`}
    >
      <span>{label}</span>
      <span
        className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-current/0 ${rightNotch} [clip-path:polygon(0_0,100%_50%,0_100%)]`}
      />
      <span
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-current/0 ${leftNotch} [clip-path:polygon(100%_0,0_50%,100%_100%)]`}
      />
      <span
        className={`pointer-events-none absolute bottom-[-2px] left-1/2 h-1 ${bottomTabWidth} -translate-x-1/2 rounded bg-black/15`}
      />
    </Link>
  );
}
