// /src/components/GetInvolved.tsx
"use client";

import Link from "next/link";

/* ---------- Shared visual shell (matches Ticket Tiers & Tournaments) ---------- */
const CARD_SHELL =
  "rounded-2xl ring-1 ring-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] " +
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)] " +
  "p-6";

/* --- Ribbon (nav-style notched button) --- */
function Ribbon({
  href,
  label,
  className = "",
  size = "md",
}: {
  href: string;
  label: string;
  className?: string;
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
      className={`relative inline-flex items-center justify-center rounded-md font-extrabold uppercase leading-none ring-1 ring-black/15 shadow transition active:translate-y-[1px] hover:brightness-110 ${sizing} ${className}`}
    >
      <span className="text-white">{label}</span>

      {/* right notch */}
      <span
        className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 ${rightNotch} [clip-path:polygon(0_0,100%_50%,0_100%)]`}
        style={{ background: "transparent" }}
      />
      {/* left notch */}
      <span
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 ${leftNotch} [clip-path:polygon(100%_0,0_50%,100%_100%)]`}
        style={{ background: "transparent" }}
      />
      {/* tiny bottom tab */}
      <span
        className={`pointer-events-none absolute bottom-[-2px] left-1/2 h-1 ${bottomTabWidth} -translate-x-1/2 rounded bg-black/15`}
      />
    </Link>
  );
}

export default function GetInvolved() {
  return (
    <section aria-labelledby="get-involved" className="relative isolate mb-0 pb-10">
      {/* Removed dotted overlay entirely for a clean, uniform background */}

      <div className="page-container py-16 md:py-20">
        <div className="mb-6">
          <h2
            id="get-involved"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
          >
            Get Involved
          </h2>
        </div>

        {/* divider – same as other sections */}
        <div className="mx-auto h-px w-full max-w-7xl mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Sponsors */}
          <article className={CARD_SHELL}>
            <span className="inline-flex h-8 items-center rounded-full bg-white/5 px-3 text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              SPONSORS
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
              Apply for Sponsorship
            </h3>
            <p className="mt-3 text-white/80">
              Partner with TCGFest and put your brand in front of thousands of passionate
              collectors and players.
            </p>
            <div className="mt-6">
              <Ribbon
                href="/sponsor"
                label="SPONSOR"
                className="bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)]"
                size="md"
              />
            </div>
          </article>

          {/* Vendors */}
          <article className={CARD_SHELL}>
            <span className="inline-flex h-8 items-center rounded-full bg-white/5 px-3 text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              VENDORS
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
              Become a Vendor
            </h3>
            <p className="mt-3 text-white/80">
              Sell sealed product, singles, accessories, or collectibles — apply to join our vendor
              marketplace.
            </p>
            <div className="mt-6">
              <Ribbon
                href="/vendors/apply"
                label="APPLY TO VEND"
                className="bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)]"
                size="md"
              />
            </div>
          </article>

          {/* Press */}
          <article className={CARD_SHELL}>
            <span className="inline-flex h-8 items-center rounded-full bg-white/5 px-3 text-xs font-bold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
              PRESS
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
              Press Credentials
            </h3>
            <p className="mt-3 text-white/80">
              Cover the event, interview special guests, and access media resources with official
              press access.
            </p>
            <div className="mt-6">
              <Ribbon
                href="/press"
                label="APPLY FOR PRESS"
                className="bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)]"
                size="md"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
