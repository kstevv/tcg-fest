// /src/components/Header/MobileNav.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useApplicationModal } from "@/components/ModalProvider";

type Props = { topOffset?: number };

const normalizeId = (id: string) => (id === "tickets" ? "ticket-tiers" : id);
const H = (rawId: string) => `/#${normalizeId(rawId)}`;

export default function MobileNav({ topOffset = 72 }: Props) {
  const [open, setOpen] = useState(false);
  const { open: openApplication } = useApplicationModal();
  const titleId = "mobile-nav-title";
  const panelRef = useRef<HTMLDivElement | null>(null);

  const getHeaderOffset = useCallback((): number => {
    if (typeof window === "undefined") return topOffset;
    const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
    const parsed = parseInt(v || "", 10);
    return Number.isFinite(parsed) ? parsed : topOffset;
  }, [topOffset]);

  const smoothScrollToId = useCallback(
    (rawId: string) => {
      const id = normalizeId(rawId);
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
      el.focus?.({ preventScroll: true });
    },
    [getHeaderOffset]
  );

  // ✅ Type-safe: no TS2345 warning
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";

    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Auto-focus panel when opened
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, rawId: string) => {
    if (typeof window === "undefined") return;
    const id = normalizeId(rawId);

    if (window.location.pathname === "/") {
      e.preventDefault();
      history.pushState(null, "", `/#${id}`);
      requestAnimationFrame(() => smoothScrollToId(id));
    }
    setOpen(false);
  };

  const close = () => setOpen(false);

  return (
    <>
      {/* Hamburger button */}
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
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Slide-down panel */}
      <div
        id="mobile-nav"
        className={`fixed left-0 right-0 z-[61] md:hidden transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          className="mx-4 mt-[calc(env(safe-area-inset-top)+12px)] rounded-2xl ring-1 ring-white/10 shadow-2xl text-white
                     bg-[radial-gradient(120%_200%_at_50%_0%,rgba(255,255,255,0.06),rgba(0,0,0,0.0))]
                     backdrop-blur-md"
        >
          {/* Header row */}
          <div className="sticky top-0 flex items-center justify-between px-5 pt-4 pb-3 rounded-t-2xl">
            <h2 id={titleId} className="text-[17px] font-extrabold tracking-tight">
              Menu
            </h2>
            <button
              aria-label="Close menu"
              onClick={close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  d="M18.3 5.7 12 12m0 0-6.3 6.3M12 12l6.3 6.3M12 12 5.7 5.7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="px-4 pb-3">
            <ul className="flex flex-col gap-2 text-white/95">
              {/* Home */}
              <Li className="pt-2 pb-3">
                <ItemLink
                  href="/"
                  onClick={(e) => {
                    if (typeof window !== "undefined" && window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    close();
                  }}
                >
                  Home
                </ItemLink>
              </Li>

              <SectionDivider label="About" className="mt-4 mb-2" />

              <Li>
                <ItemLink href={H("special-guests")} onClick={(e) => handleAnchor(e, "special-guests")}>
                  Special Guests
                </ItemLink>
              </Li>
              <Li>
                <ItemLink href={H("experience")} onClick={(e) => handleAnchor(e, "experience")}>
                  Experience
                </ItemLink>
              </Li>
              <Li>
                <ItemLink href={H("tournaments")} onClick={(e) => handleAnchor(e, "tournaments")}>
                  Tournaments
                </ItemLink>
              </Li>
              <Li>
                <ItemLink href={H("ticket-tiers")} onClick={(e) => handleAnchor(e, "ticket-tiers")}>
                  Ticket Tiers
                </ItemLink>
              </Li>
              <Li>
                <ItemLink href={H("venue")} onClick={(e) => handleAnchor(e, "venue")}>
                  Venue
                </ItemLink>
              </Li>
              <Li className="pb-2">
                <ItemLink href={H("faq")} onClick={(e) => handleAnchor(e, "faq")}>
                  FAQ
                </ItemLink>
              </Li>
            </ul>
          </nav>

          {/* CTA footer */}
          <div className="sticky bottom-0 px-4 pt-1 pb-[calc(env(safe-area-inset-bottom)+14px)] bg-gradient-to-t from-black/20 to-transparent rounded-b-2xl">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  openApplication("sponsor");
                  setOpen(false);
                }}
                className="inline-flex h-11 items-center justify-center rounded-xl text-[12px] font-extrabold uppercase tracking-[0.22em] text-white ring-1 ring-black/20 shadow hover:brightness-110 active:translate-y-[1px]"
                style={{ background: "#D52EF5" }}
              >
                Get Involved
              </button>

              <Link
                href={H("ticket-tiers")}
                onClick={(e) => handleAnchor(e, "ticket-tiers")}
                className="inline-flex h-11 items-center justify-center rounded-xl text-[12px] font-extrabold uppercase tracking-[0.22em] text-white ring-1 ring-black/20 shadow hover:brightness-110 active:translate-y-[1px] bg-[#5416DD]"
              >
                Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Presentational helpers ---------- */

function Li({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <li className={`list-none ${className}`}>{children}</li>;
}

function ItemLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex min-h-[48px] items-center justify-between rounded-xl px-3 py-3
                 bg-white/[0.06] hover:bg-white/[0.12]
                 ring-1 ring-white/10 shadow-inner transition"
    >
      <span className="text-[16px] font-semibold">{children}</span>
      <ChevronRight className="h-4 w-4 text-white/60 group-hover:text-white/80 transition" />
    </Link>
  );
}

function SectionDivider({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <li className={`px-1 ${className}`}>
      {/* top spacer */}
      <div className="h-3" aria-hidden />   {/* ↑ increase to h-4 if you want more */}

      <div className="flex items-center gap-3 px-2 py-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
          {label}
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* bottom spacer */}
      <div className="h-2" aria-hidden />   {/* ↑ tweak to h-3 for more */}
    </li>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
