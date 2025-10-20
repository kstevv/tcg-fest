// /src/components/Header/AboutDropdown.tsx
"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Item = { label: string; targetId: string };

/**
 * Order matches your request:
 * Special Guests, Experience, Tournaments, Venue, FAQ
 */
const ITEMS: Item[] = [
  { label: "Special Guests", targetId: "special-guests" },
  { label: "Experience", targetId: "experience" },
  { label: "Tournaments", targetId: "tournaments" },
  { label: "Venue", targetId: "venue" },
  { label: "FAQ", targetId: "faq" },
];

export default function AboutDropdown() {
  const [open, setOpen] = useState(false);
  const menuId = `${useId()}-about-menu`;

  // useRef with proper timeout type (works server & client)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const delayedClose = useCallback(() => {
    clearTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const handleNavigate = useCallback((targetId: string) => {
    // Smooth scroll to section (sections should have scroll-mt- classes)
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update hash without full navigation
      history.replaceState(null, "", `#${targetId}`);
    }
    setOpen(false);
  }, []);

  // Basic keyboard support: open on ArrowDown, close on Escape
  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearTimer();
        setOpen(true);
      }}
      onMouseLeave={delayedClose}
    >
      {/* Trigger — explicit type to avoid hydration mismatches */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onKeyDown={onTriggerKeyDown}
        className="text-sm font-extrabold uppercase tracking-wide text-white/90 hover:text-white transition inline-flex items-center gap-1"
      >
        ABOUT <span className="text-white/70">+</span>
      </button>

      {/* Invisible “bridge” so moving cursor from trigger to panel doesn’t close it */}
      {open && (
        <div
          className="absolute left-0 top-full h-2 w-48"
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        id={menuId}
        role="menu"
        aria-label="About sections"
        className={[
          "absolute left-0 top-[calc(100%+8px)] w-[320px] overflow-hidden rounded-2xl",
          "bg-[rgba(19,19,19,0.9)] backdrop-blur ring-1 ring-white/10 shadow-2xl",
          "transition-opacity duration-150",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onMouseEnter={clearTimer}
        onMouseLeave={delayedClose}
      >
        <ul className="py-3">
          {ITEMS.map((item) => (
            <li key={item.targetId}>
              <button
                role="menuitem"
                onClick={() => handleNavigate(item.targetId)}
                className="w-full text-left px-5 py-4 text-lg font-semibold text-white/95 hover:bg-white/5 focus:outline-none focus-visible:bg-white/10"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
