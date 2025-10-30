// /src/components/Header/Header.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AboutDropdown from "@/components/Header/AboutDropdown";
import { useApplicationModal } from "@/components/ModalProvider";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINK =
  "text-[13px] font-extrabold uppercase tracking-wide text-white/90 hover:text-white transition";

// Smooth scroll helper
const scrollToTop = () => {
  if (typeof window === "undefined") return;

  const startY = window.scrollY;
  const startTime = performance.now();
  const duration = 600; // ms — adjust if you want faster/slower

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const animate = (time: number) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuad(progress);
    const newY = startY * (1 - eased);
    window.scrollTo(0, newY);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export default function Header() {
  const { open } = useApplicationModal();
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    const root = document.documentElement;
    if (openMenu) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [openMenu]);

  const handleHomeClick = useCallback(
  (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the homepage, don't navigate—just smooth scroll to top.
    if (pathname === "/") {
      e.preventDefault();

      // Keep URL clean (no hash), match dropdown pattern
      history.pushState(null, "", "/");

      // If the mobile menu is open, close it but don't delay the scroll
      if (openMenu) setOpenMenu(false);

      // Match the dropdown link timing: scroll next frame
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    // Else: let Link do normal navigation to "/"
  },
  [pathname, openMenu, setOpenMenu]
);


  return (
    <header className="sticky top-3 z-[80]">
      <div className="page-container">
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-b from-[var(--color-lessdark)_20%] to-[rgba(19,19,19,0.4)] text-white shadow-xl ring-1 ring-white/10 backdrop-blur px-3 sm:px-5 py-1.5 sm:py-2">
          {/* Brand */}
          <Link
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-transform hover:scale-[1.02]"
          >
            <Image
              src="/images/logos/tcgfest-logo-transparent-bg.png"
              alt="TCGFest"
              width={72}
              height={72}
              priority
              className="object-contain"
            />
            <h1 className="select-none">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                TCGFest
              </span>
            </h1>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" className={NAV_LINK} onClick={handleHomeClick}>
              HOME
            </NavLink>

            {/* ABOUT dropdown uses same style as HOME */}
            <AboutDropdown triggerClassName={NAV_LINK} />

            {/* GET INVOLVED */}
            <button
              onClick={() => open("sponsor")}
              className="relative inline-flex items-center justify-center rounded-md font-extrabold uppercase ring-1 ring-black/15 shadow h-10 px-5 text-[11px] tracking-[0.22em] text-white hover:brightness-110 active:translate-y-[1px] transition cursor-pointer"
              style={{ background: "#D52EF5" }}
            >
              <span>Get Involved</span>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-4 w-4 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
              <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-3.5 w-3.5 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
              <span className="pointer-events-none absolute bottom-[-2px] left-1/2 h-1 w-8 -translate-x-1/2 rounded bg-black/15" />
            </button>

            {/* TICKETS */}
            <Ribbon
              href="/#ticket-tiers"
              label="TICKETS"
              className="bg-[#5416DD] text-white"
              size="md"
            />
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpenMenu(true)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-1.5 text-white/90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <BarsIcon />
          </button>
        </div>
      </div>

      {/* ---------- Mobile dropdown ---------- */}
      {openMenu && (
        <>
          <div
            className="fixed inset-0 z-[89] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenMenu(false)}
          />
          <div className="fixed inset-x-4 top-3 z-[90] rounded-2xl bg-[rgba(18,19,23,0.88)] ring-1 ring-white/10 shadow-2xl text-white">
            <div className="flex items-center justify-between px-5 pt-3 pb-2">
              <p className="text-lg font-extrabold">Menu</p>
              <button
                aria-label="Close menu"
                onClick={() => setOpenMenu(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
              >
                <XIcon />
              </button>
            </div>

            <nav className="px-4 pb-6">
              {/* Home */}
              <MobileItem
                href="/"
                onAfterNavigate={() => {
                  setOpenMenu(false);
                }}
              >
                Home
              </MobileItem>

              {/* Section label: About */}
              <p className="text-left px-1 mt-5 mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                About
              </p>

              {/* About links */}
              <div className="flex flex-col gap-2">
                <MobileItem href="#special-guests" onAfterNavigate={() => setOpenMenu(false)}>
                  Special Guests
                </MobileItem>
                <MobileItem href="#experience" onAfterNavigate={() => setOpenMenu(false)}>
                  Experience
                </MobileItem>
                <MobileItem href="#tournaments" onAfterNavigate={() => setOpenMenu(false)}>
                  Tournaments
                </MobileItem>
                <MobileItem href="#ticket-tiers" onAfterNavigate={() => setOpenMenu(false)}>
                  Ticket Tiers
                </MobileItem>
                <MobileItem href="#venue" onAfterNavigate={() => setOpenMenu(false)}>
                  Venue
                </MobileItem>
                <MobileItem href="#faq" onAfterNavigate={() => setOpenMenu(false)}>
                  FAQ
                </MobileItem>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 grid gap-3">
                <button
                  onClick={() => {
                    setOpenMenu(false);
                    open("sponsor");
                  }}
                  className="h-11 rounded-md bg-[#D52EF5] text-white font-extrabold uppercase tracking-[0.25em] ring-1 ring-black/20 hover:brightness-110 active:translate-y-[1px]"
                >
                  Get Involved
                </button>
                <MobileItem
                  href="#ticket-tiers"
                  onAfterNavigate={() => setOpenMenu(false)}
                  asButton
                >
                  Tickets
                </MobileItem>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

/* ---------- Small helpers ---------- */

function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

const normalizeHash = (hash: string) =>
  hash === "#tickets" ? "#ticket-tiers" : hash;

const getHeaderOffset = (): number => {
  if (typeof window === "undefined") return 80;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const n = parseInt(v || "", 10);
  return Number.isFinite(n) ? n : 80;
};

const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
  window.scrollTo({ top: y, behavior: "smooth" });
  el.focus?.({ preventScroll: true });
};

function MobileItem({
  href,
  onAfterNavigate,
  children,
  asButton = false,
}: {
  href: string;
  onAfterNavigate?: () => void;
  children: React.ReactNode;
  asButton?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const raw = href.startsWith("#")
        ? href
        : href.startsWith("/#")
        ? href.slice(1)
        : href;
      const isHash = raw.startsWith("#");
      if (!isHash) {
        // ✅ Make "Home" on the homepage behave like other hash links.
        if (href === "/" && pathname === "/") {
          e.preventDefault();
          // keep the URL clean (no hash) and mimic the same timing as other items
          history.pushState(null, "", "/");
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
          onAfterNavigate?.(); // close the panel AFTER we’ve queued the scroll, same pattern as other items
          return;
        }

  // Non-hash links (e.g., navigating to another page): just close and let Next route
  onAfterNavigate?.();
  return;
}

      const normalized = normalizeHash(raw);
      const id = normalized.replace(/^#/, "");

      if (pathname === "/") {
        e.preventDefault();
        history.pushState(null, "", `/${normalized}`);
        requestAnimationFrame(() => smoothScrollTo(id));
        onAfterNavigate?.();
        return;
      }

      e.preventDefault();
      router.push(`/${normalized}`);
      onAfterNavigate?.();
    },
    [href, pathname, router, onAfterNavigate]
  );

  const classBase =
    "block w-full rounded-lg px-3 py-2.5 text-[17px] font-semibold ring-1 ring-white/10";
  const classNormal = `${classBase} bg-white/5 hover:bg-white/10`;
  const classButton = `${classBase} grid place-items-center h-11 bg-[#5416DD] text-white uppercase tracking-[0.25em] hover:brightness-110 active:translate-y-[1px]`;

  const renderHref =
    href === "/"
      ? "/"
      : href.startsWith("#")
      ? `/${normalizeHash(href)}`
      : href.startsWith("/#")
      ? `/${normalizeHash(href.slice(1))}`
      : href;

  return (
    <Link
      href={renderHref}
      onClick={onClick}
      className={asButton ? classButton : classNormal}
    >
      {children}
    </Link>
  );
}

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
      ? "h-10 px-5 text-[12px] tracking-[0.22em]"
      : size === "md"
      ? "h-9 px-4 text-[11px] tracking-[0.2em]"
      : "h-8 px-3 text-[10px] tracking-[0.18em]";

  const rightNotch = "h-4 w-4";
  const leftNotch = "h-3.5 w-3.5";
  const bottomTabWidth = "w-8";

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

function BarsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z" />
    </svg>
  );
}
