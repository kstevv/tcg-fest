"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AboutDropdown from "@/components/Header/AboutDropdown";
import { useApplicationModal } from "@/components/ModalProvider";

export default function Header() {
  const { open } = useApplicationModal();
  const [openMenu, setOpenMenu] = useState(false);

  // lock the page scroll when the mobile menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (openMenu) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
    // cleanup
    return () => root.classList.remove("overflow-hidden");
  }, [openMenu]);

  return (
    <header className="sticky top-4 z-[80]">
      <div className="page-container">
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-b from-[var(--color-lessdark)_20%] to-[rgba(19,19,19,0.4)] text-white shadow-xl ring-1 ring-white/10 backdrop-blur px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 rounded-full pl-1 pr-3 py-1">
            <Image
              src="/images/logos/tcgfest-logo-transparent-bg.png"
              alt="TCGFest"
              width={96}
              height={96}
              priority
            />
            {/* Keep text label on mobile */}
            <h1 className="select-none">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight">TCGFest</span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">HOME</NavLink>

            {/* ABOUT dropdown */}
            <AboutDropdown />

            {/* GET INVOLVED – opens modal */}
            <button
              onClick={() => open("sponsor")}
              className="relative inline-flex items-center justify-center rounded-md font-extrabold uppercase ring-1 ring-black/15 shadow h-11 px-6 text-[12px] tracking-[0.25em] text-white hover:brightness-110 active:translate-y-[1px] transition cursor-pointer"
              style={{ background: "#D52EF5" }}
            >
              <span>Get Involved</span>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-5 w-5 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
              <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-4 w-4 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
              <span className="pointer-events-none absolute bottom-[-2px] left-1/2 h-1 w-10 -translate-x-1/2 rounded bg-black/15" />
            </button>

            {/* TICKETS (desktop only) */}
            <Ribbon
              href="/#tickets"
              label="TICKETS"
              className="bg-[#5416DD] text-white"
              size="lg"
            />
          </nav>

          {/* Mobile: hamburger (Tickets pill removed) */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpenMenu(true)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <BarsIcon />
          </button>
        </div>
      </div>

      {/* ---------- Mobile dropdown (reverted dark glass look) ---------- */}
      {openMenu && (
        <>
          {/* scrim */}
          <div
            className="fixed inset-0 z-[89] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenMenu(false)}
          />
          {/* panel */}
          <div className="fixed inset-x-4 top-4 z-[90] rounded-2xl bg-[rgba(18,19,23,0.88)] ring-1 ring-white/10 shadow-2xl text-white">
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <p className="text-xl font-extrabold">Menu</p>
              <button
                aria-label="Close menu"
                onClick={() => setOpenMenu(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
              >
                <XIcon />
              </button>
            </div>

            <nav className="px-4 pb-4">
              <MobileItem href="/" onClick={() => setOpenMenu(false)}>
                Home
              </MobileItem>

              <p className="px-2 pt-2 pb-1 text-xs font-bold tracking-[0.25em] text-white/60 uppercase">
                About
              </p>
              <MobileItem href="#speakers" onClick={() => setOpenMenu(false)}>
                Special Guests
              </MobileItem>
              <MobileItem href="#experience" onClick={() => setOpenMenu(false)}>
                Experience
              </MobileItem>
              <MobileItem href="#tournaments" onClick={() => setOpenMenu(false)}>
                Tournaments
              </MobileItem>
              <MobileItem href="#tickets" onClick={() => setOpenMenu(false)}>
                Ticket Tiers
              </MobileItem>
              <MobileItem href="#venue" onClick={() => setOpenMenu(false)}>
                Venue
              </MobileItem>
              <MobileItem href="#faq" onClick={() => setOpenMenu(false)}>
                FAQ
              </MobileItem>

              <div className="mt-4 grid gap-3">
                <button
                  onClick={() => {
                    setOpenMenu(false);
                    open("sponsor");
                  }}
                  className="h-12 rounded-md bg-[#D52EF5] text-white font-extrabold uppercase tracking-[0.25em] ring-1 ring-black/20 hover:brightness-110 active:translate-y-[1px]"
                >
                  Get Involved
                </button>
                <Link
                  href="/#tickets"
                  onClick={() => setOpenMenu(false)}
                  className="h-12 rounded-md bg-[#5416DD] text-white font-extrabold uppercase tracking-[0.25em] ring-1 ring-black/20 hover:brightness-110 active:translate-y-[1px] grid place-items-center"
                >
                  Tickets
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

/* ---------- Small helpers ---------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-extrabold uppercase tracking-wide text-white/90 hover:text-white transition"
    >
      {children}
    </Link>
  );
}

function MobileItem({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block w-full rounded-lg px-3 py-3 text-[17px] font-semibold bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
    >
      {children}
    </Link>
  );
}

/* ---------- Ribbon helper ---------- */
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

  const rightNotch = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const leftNotch  = size === "lg" ? "h-4 w-4" : size === "md" ? "h-3.5 w-3.5" : "h-3 w-3";
  const bottomTabWidth = size === "lg" ? "w-10" : size === "md" ? "w-8" : "w-7";

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center rounded-md font-extrabold uppercase leading-none shadow ring-1 ring-black/15 hover:brightness-110 active:translate-y-[1px] transition ${sizing} ${className}`}
    >
      <span>{label}</span>
      <span className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-current/0 ${rightNotch} [clip-path:polygon(0_0,100%_50%,0_100%)]`} />
      <span className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-current/0 ${leftNotch} [clip-path:polygon(100%_0,0_50%,100%_100%)]`} />
      <span className={`pointer-events-none absolute bottom-[-2px] left-1/2 h-1 ${bottomTabWidth} -translate-x-1/2 rounded bg-black/15`} />
    </Link>
  );
}

/* ---------- Icons ---------- */

function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z" />
    </svg>
  );
}
