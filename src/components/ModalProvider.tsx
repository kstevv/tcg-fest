// /src/components/ModalProvider.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Tab = "sponsor" | "vendor" | "press";

type ModalCtx = {
  open: (tab?: Tab) => void;
  close: () => void;
  setTab: (tab: Tab) => void;
};

const Ctx = createContext<ModalCtx | null>(null);

export function useApplicationModal() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useApplicationModal must be used within ApplicationModalProvider");
  }
  return ctx;
}

export default function ApplicationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("sponsor");

  const open = useCallback((t: Tab = "sponsor") => {
    setTab(t);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Lock background scroll while open
  useLockBodyScroll(isOpen);

  return (
    <Ctx.Provider value={{ open, close, setTab }}>
      {children}
      {isOpen && <Modal tab={tab} onClose={close} onTabChange={setTab} />}
    </Ctx.Provider>
  );
}

function Modal({
  tab,
  onClose,
  onTabChange,
}: {
  tab: Tab;
  onClose: () => void;
  onTabChange: (t: Tab) => void;
}) {
  // Focus first input when opened
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const t = setTimeout(() => firstInputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const submitLabel =
    tab === "sponsor"
      ? "SUBMIT SPONSOR APPLICATION"
      : tab === "vendor"
      ? "SUBMIT VENDOR APPLICATION"
      : "SUBMIT PRESS APPLICATION";

  // Solid, dark input styling + focus ring
  const FIELD =
    "w-full rounded-[10px] bg-[#1a1a22] border border-white/10 px-[0.85rem] py-[0.7rem] text-white outline-none " +
    "placeholder:text-white/50 focus:border-[rgba(213,46,245,0.6)] focus:[box-shadow:0_0_0_2px_rgba(213,46,245,0.2)]";

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[9999]">
      {/* Backdrop (opaque) */}
      <button
        aria-label="Close application modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/80"
      />

      {/* Wrapper: fullscreen on mobile; centered on desktop, no wasted space */}
      <div className="relative z-10 flex h-full w-full items-center justify-center md:py-10">
        <div
          className="
            relative text-white
            w-screen h-[100svh] rounded-none
            md:w-[min(95vw,1400px)] md:h-auto md:max-h-[85vh] md:rounded-2xl
            bg-[#121219] ring-1 ring-white/10 shadow-2xl
            overflow-hidden
          "
        >
          {/* Sticky header with safe-area padding + extra top space */}
          <div className="sticky top-0 z-10 px-5 md:px-8 pb-3 pt-[calc(env(safe-area-inset-top)+14px)] bg-[#121219] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div role="tablist" aria-label="Get involved" className="flex flex-1 gap-2 overflow-x-auto">
                <TabButton active={tab === "sponsor"} onClick={() => onTabChange("sponsor")}>
                  SPONSOR
                </TabButton>
                <TabButton active={tab === "vendor"} onClick={() => onTabChange("vendor")}>
                  VENDOR
                </TabButton>
                <TabButton active={tab === "press"} onClick={() => onTabChange("press")}>
                  PRESS
                </TabButton>
              </div>

              {/* Close button (kept visible and aligned) */}
              <button
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/8 hover:bg-white/12 ring-1 ring-white/10"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Scrollable content (form). When capped by max-h, this scrolls. */}
          <div className="overflow-y-auto overscroll-contain px-5 md:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+18px)]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="NAME *">
                <input ref={firstInputRef} className={FIELD} placeholder="Jane Doe" />
              </Field>
              <Field label="BRAND *">
                <input className={FIELD} placeholder="Company / Brand" />
              </Field>
              <Field label="EMAIL *">
                <input className={FIELD} placeholder="name@email.com" />
              </Field>
              <Field label="PHONE *">
                <input className={FIELD} placeholder="(555) 123-4567" />
              </Field>
              <Field label="CITY">
                <input className={FIELD} placeholder="Austin, TX" />
              </Field>
              <Field label="NUMBER OF BOOTHS">
                <input className={FIELD} placeholder="1" />
              </Field>
              <div className="md:col-span-2">
                <Field
                  label={
                    tab === "press"
                      ? "WHAT YOU’LL COVER"
                      : tab === "vendor"
                      ? "WHAT THEY SELL"
                      : "HOW YOU’D LIKE TO PARTICIPATE"
                  }
                >
                  <textarea
                    rows={4}
                    className={FIELD + " resize-y"}
                    placeholder={
                      tab === "press"
                        ? "Editorial plan, interviews, outlets…"
                        : tab === "vendor"
                        ? "Singles, sealed product, accessories…"
                        : "Booth, brand placement, activations…"
                    }
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="rounded-xl px-6 py-3 font-extrabold uppercase tracking-[0.22em] text-white shadow ring-1 ring-black/15 active:translate-y-[1px]"
                style={{ background: "linear-gradient(90deg,#D52EF5 0%,#5416DD 100%)" }}
              >
                {submitLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Active tab uses the same gradient as the submit button */
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const base =
    "rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 transition focus:outline-none focus-visible:ring-2";
  return active ? (
    <button
      onClick={onClick}
      role="tab"
      aria-selected="true"
      className={`${base} text-white ring-white/15`}
      style={{ background: "linear-gradient(90deg,#D52EF5 0%,#5416DD 100%)" }}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      role="tab"
      aria-selected="false"
      className={`${base} bg-white/5 ring-white/10 text-white/90 hover:bg-white/8`}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-wide text-white/80">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/* -----------------------
   Body scroll lock hook
   ----------------------- */
function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    const { body, documentElement: html } = document;
    const scrollY = window.scrollY || window.pageYOffset;

    // Compensate for scrollbar (desktop) to avoid layout shift
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const prevPaddingRight = body.style.paddingRight;

    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    // Fix body in place (iOS-friendly)
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overscrollBehavior = "contain";
    html.style.overscrollBehavior = "contain";

    return () => {
      const y = Math.abs(parseInt(body.style.top || "0", 10)) || 0;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overscrollBehavior = "";
      body.style.paddingRight = prevPaddingRight;
      html.style.overscrollBehavior = "";
      window.scrollTo(0, y);
    };
  }, [lock]);
}
