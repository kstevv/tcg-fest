"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApplicationModal } from "@/components/ModalProvider";

type Props = {
  /** Brand height used by your header so the panel clears it nicely */
  topOffset?: number; // px
};

export default function MobileNav({ topOffset = 72 }: Props) {
  const [open, setOpen] = useState(false);
  const { open: openApplication } = useApplicationModal();

  // Lock background scroll when menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // Close after clicking a link
  const goto = () => setOpen(false);

  return (
    <>
      {/* Hamburger */}
      <button
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        id="mobile-nav"
        className={`fixed left-0 right-0 z-[61] md:hidden transition-transform duration-300 ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: 0 }}
        role="dialog"
        aria-modal="true"
      >
        {/* The rounded “card” that matches your header look */}
        <div
          className="mx-4 mt-4 rounded-2xl ring-1 ring-white/10 shadow-xl
                     bg-[radial-gradient(120%_200%_at_50%_0%,rgba(255,255,255,0.04),rgba(0,0,0,0.0))] 
                     backdrop-blur text-white"
        >
          {/* Header row */}
          <div className="flex items-center justify-between p-4">
            <span className="text-lg font-extrabold tracking-tight">Menu</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.3 5.7 12 12m0 0-6.3 6.3M12 12l6.3 6.3M12 12 5.7 5.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="px-4 pb-4">
            <ul className="space-y-2 text-white/90">
              <Li>
                <Link href="/" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  Home
                </Link>
              </Li>

              {/* About section items (collapsed into simple list on mobile) */}
              <SectionLabel>About</SectionLabel>
              <Li>
                <Link href="/#special-guests" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  Special Guests
                </Link>
              </Li>
              <Li>
                <Link href="/#experience" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  Experience
                </Link>
              </Li>
              <Li>
                <Link href="/#tournaments" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  Tournaments
                </Link>
              </Li>
              <Li>
                <Link href="/#ticket-tiers" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  Ticket Tiers
                </Link>
              </Li>
              <Li>
                <Link href="/#venue" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  Venue
                </Link>
              </Li>
              <Li>
                <Link href="/#faq" className="block w-full py-3 px-3 rounded-md hover:bg-white/10" onClick={goto}>
                  FAQ
                </Link>
              </Li>

              {/* Actions */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    openApplication("sponsor");
                    setOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-md h-11 text-[12px] font-extrabold uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow
                             hover:brightness-110 active:translate-y-[1px]"
                  style={{ background: "#D52EF5" }}
                >
                  Sponsor
                </button>

                <Link
                  href="/#tickets"
                  onClick={goto}
                  className="inline-flex items-center justify-center rounded-md h-11 text-[12px] font-extrabold uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow
                             hover:brightness-110 active:translate-y-[1px] bg-[#5416DD]"
                >
                  Tickets
                </Link>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

/* ---- tiny helpers ---- */
function Li({ children }: { children: React.ReactNode }) {
  return <li className="list-none">{children}</li>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <li className="pt-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
      {children}
    </li>
  );
}
