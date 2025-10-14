import Link from "next/link";
import SpecialGuests from "@/components/Speakers/SpecialGuestsSection";
import Programming from "@/components/Programming";
import TournamentsSection from "@/components/Tournaments";
import TicketTiers from "@/components/TicketTiers";
import FAQSection from "@/components/FAQ";

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
              Two days of tournaments, vendors, trading, and panels. January 31st & Feb 1st • Travis County Exposition Center
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/tickets"
                className="rounded-xl bg-[#5416DD] text-white px-4 py-2 font-semibold"
              >
                Get Tickets
              </Link>
              <Link
                href="/schedule"
                className="rounded-xl bg-black/20 px-4 py-2 font-semibold"
              >
                View Schedule
              </Link>
            </div>
          </section>
        </div>
      </header>

      {/* Main content */}
      <main className="space-y-20 md:space-y-24">
        <SpecialGuests />
       

        {/* Programming section already uses .page-container internally */}
        <Programming />
        <TournamentsSection />
        <TicketTiers />
        <FAQSection />
      </main>
    </>
  );
}
