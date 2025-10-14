


"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-4 z-50">
      {/* Consistent site container */}
      <div className="page-container">
        {/* Less-rounded container + a bit taller */}
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-b from-[var(--color-lessdark)_20%] to-[rgba(19,19,19,0.4)] text-white shadow-xl ring-1 ring-white/10 backdrop-blur px-4 sm:px-6">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full pl-1 pr-3 py-1"
          >
            <Image
              src="/images/logos/tcgfest-logo.png"
              alt="TCG Con"
              width={96}
              height={96}
              priority
            />
            <h1><span className="text-xl sm:text-2xl font-extrabold tracking-tight">
              TCGFest
            </span></h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">HOME</NavLink>
            <NavLink href="/about">ABOUT<span className="ml-2">+</span></NavLink>

            {/* Taller notched ribbons to better fill the bar */}
            <Ribbon href="/sponsor" label="SPONSOR" className="bg-[#D52EF5] text-white" size="lg" />
            <Ribbon href="/tickets" label="TICKETS" className="bg-[#5416DD] text-white" size="lg" />
          </nav>

          {/* Mobile quick action (slightly taller too) */}
          <div className="md:hidden">
            <Ribbon href="/tickets" label="TICKETS" className="bg-[#5416DD] text-white" size="md" />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-extrabold uppercase tracking-wide text-white/90 hover:text-white transition"
    >
      {children}
    </Link>
  );
}

/* ---------- Ribbon helper (notched “ticket” buttons) ---------- */
function Ribbon({
  href,
  label,
  className = "",
  size = "md",
}: {
  href: string;
  label: string;
  className?: string;
  /** sizes: sm | md | lg */
  size?: "sm" | "md" | "lg";
}) {
  // Height / padding tuned so lg ≈ 44px tall to fill the nav nicely
  const sizing =
    size === "lg"
      ? "h-11 px-6 text-[12px] tracking-[0.25em]" // ~44px tall
      : size === "md"
      ? "h-10 px-5 text-[12px] tracking-[0.22em]"
      : "h-9 px-4 text-[11px] tracking-[0.18em]";

  // Increase notch size a touch for taller buttons
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
      {/* right notch */}
      <span
        className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-current/0 ${rightNotch} [clip-path:polygon(0_0,100%_50%,0_100%)]`}
      />
      {/* left notch */}
      <span
        className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-current/0 ${leftNotch} [clip-path:polygon(100%_0,0_50%,100%_100%)]`}
      />
      {/* tiny bottom tab, subtle */}
      <span
        className={`pointer-events-none absolute bottom-[-2px] left-1/2 h-1 ${bottomTabWidth} -translate-x-1/2 rounded bg-black/15`}
      />
    </Link>
  );
}

