// /src/components/Header/AboutDropdown.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

type Item = { label: string; id: string };

const ITEMS: Item[] = [
  { label: "Special Guests", id: "special-guests" },
  { label: "Experience", id: "experience" },
  { label: "Tournaments", id: "tournaments" },
  { label: "Ticket Tiers", id: "ticket-tiers" }, // ✅ correct id
  { label: "Venue", id: "venue" },
  { label: "FAQ", id: "faq" },
];

const normalizeId = (id: string) => (id === "tickets" ? "ticket-tiers" : id);

function getHeaderOffset(): number {
  if (typeof window === "undefined") return 80;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const n = parseInt(v || "", 10);
  return Number.isFinite(n) ? n : 80;
}

function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
  window.scrollTo({ top: y, behavior: "smooth" });
  el.focus?.({ preventScroll: true });
}

export default function AboutDropdown({
  triggerClassName,
}: {
  /** Classes applied to the ABOUT trigger; pass same as your other nav links */
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const safeOpen = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setOpen(true);
  };
  const safeClose = (delay = 140) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(false), delay) as unknown as number;
  };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, [open]);

  const onItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, rawId: string) => {
      const id = normalizeId(rawId);
      setOpen(false);

      if (pathname === "/") {
        e.preventDefault();
        history.pushState(null, "", `/#${id}`);
        requestAnimationFrame(() => smoothScrollToId(id));
        return;
      }

      e.preventDefault();
      router.push(`/#${id}`);
    },
    [pathname, router]
  );

  const TRIGGER_FALLBACK =
    "text-[13px] font-extrabold uppercase tracking-wide text-white/90 hover:text-white transition";

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={safeOpen}
      onMouseLeave={() => safeClose(160)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 ${triggerClassName ?? TRIGGER_FALLBACK}`}
      >
        <span>ABOUT</span>
        <span aria-hidden>+</span>
      </button>

      {open && <div aria-hidden className="absolute left-0 top-full h-3 w-56" />}

      {open && (
        <div
          role="menu"
          aria-label="About"
          className="absolute left-0 top-[calc(100%+10px)] z-50 w-[320px] max-w-[85vw]
                     rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur shadow-2xl"
          onMouseEnter={safeOpen}
          onMouseLeave={() => safeClose(160)}
        >
          <div className="max-h-[70vh] overflow-y-auto overscroll-contain p-2">
            <ul className="py-2">
              {ITEMS.map((it) => {
                const id = normalizeId(it.id);
                return (
                  <li key={id}>
                    <Link
                      href={`/#${id}`}
                      prefetch={false}
                      className="block rounded-xl px-4 py-3 text-base hover:bg-white/5 focus:bg-white/10"
                      onClick={(e) => onItemClick(e, id)}
                    >
                      <span className="font-semibold">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
