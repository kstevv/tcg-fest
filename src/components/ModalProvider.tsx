// /src/components/ModalProvider.tsx
"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ModalTab = "sponsor" | "vendor" | "press";
type Ctx = {
  isOpen: boolean;
  tab: ModalTab;
  open: (tab?: ModalTab) => void;
  close: () => void;
  setTab: (t: ModalTab) => void;
};

const ApplicationModalContext = createContext<Ctx | null>(null);

export function useApplicationModal() {
  const ctx = useContext(ApplicationModalContext);
  if (!ctx) throw new Error("useApplicationModal must be used inside <ApplicationModalProvider>");
  return ctx;
}

export default function ApplicationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<ModalTab>("sponsor");

  const open = useCallback((t?: ModalTab) => {
    if (t) setTab(t);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // lock background scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevPaddingRight = html.style.paddingRight;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    if (scrollBarWidth > 0) html.style.paddingRight = `${scrollBarWidth}px`;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  const value = useMemo<Ctx>(() => ({ isOpen, tab, open, close, setTab }), [isOpen, tab, open, close]);

  return (
    <ApplicationModalContext.Provider value={value}>
      {children}
      {isOpen && <Modal tab={tab} close={close} setTab={setTab} />}
    </ApplicationModalContext.Provider>
  );
}

/* ---------------- Modal UI ---------------- */

function Modal({
  tab,
  close,
  setTab,
}: {
  tab: ModalTab;
  close: () => void;
  setTab: (t: ModalTab) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Get Involved">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />

      {/* Layout:
          - Mobile: full-screen content (items-stretch), internal body scroll
          - Desktop: centered, rounded card */}
      <div className="absolute inset-0 flex items-stretch md:items-center justify-center overflow-hidden md:overflow-visible">
        <div
          className={`
            relative w-full h-full md:h-auto md:max-h-[92vh] max-w-none md:max-w-5xl
            bg-[#0F1117] text-white ring-1 ring-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
            rounded-none md:rounded-2xl
            flex flex-col
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header (sticky) */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 md:px-6 py-4 md:py-5 bg-[#0F1117] rounded-none md:rounded-t-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Get Involved</h2>
            <button
              onClick={close}
              aria-label="Close"
              className="h-9 w-9 md:h-10 md:w-10 grid place-items-center rounded-md bg-white/10 hover:bg-white/15 ring-1 ring-white/15 cursor-pointer"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="px-5 md:px-6 pb-3 md:pb-4">
            <div className="flex gap-3">
              <TabButton active={tab === "sponsor"} onClick={() => setTab("sponsor")}>
                Sponsor
              </TabButton>
              <TabButton active={tab === "vendor"} onClick={() => setTab("vendor")}>
                Vend
              </TabButton>
              <TabButton active={tab === "press"} onClick={() => setTab("press")}>
                Press
              </TabButton>
            </div>
          </div>

          {/* Body (flex-1 scroll area on mobile; also scrolls if content exceeds desktop max-h) */}
          <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-5 md:pb-6">
            {tab === "sponsor" && <SponsorForm />}
            {tab === "vendor" && <VendorForm />}
            {tab === "press" && <PressForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Tab Button ---------- */

function TabButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "cursor-pointer rounded-md px-4 md:px-5 h-10 md:h-11 font-extrabold uppercase tracking-[0.22em] text-[11px] md:text-[12px] ring-1 ring-white/15",
        active
          ? "bg-gradient-to-r from-[#8A2BE2] to-[#5416DD] text-white"
          : "bg-white/10 text-white/85 hover:bg-white/14",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ---------- Form pieces ---------- */

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">{children}</div>;
}

const inputBase =
  "w-full rounded-md bg-[#151823] text-white placeholder-white/40 ring-1 ring-white/10 " +
  "h-11 px-3.5 md:px-4 focus:outline-none focus:ring-2 focus:ring-[#6E61FF]";

const textareaBase =
  "w-full rounded-md bg-[#151823] text-white placeholder-white/40 ring-1 ring-white/10 " +
  "min-h-[120px] p-3.5 md:p-4 focus:outline-none focus:ring-2 focus:ring-[#6E61FF]";

const labelBase = "text-xs font-bold uppercase tracking-wide text-white/70 mb-1.5";

const submitBtn =
  "w-full mt-4 md:mt-6 h-12 md:h-14 rounded-md font-extrabold uppercase tracking-[0.25em] " +
  "bg-gradient-to-r from-[#D52EF5] to-[#5416DD] ring-1 ring-black/15 shadow cursor-pointer";

/* ----- Forms (same structure, solid fields) ----- */

function SponsorForm() {
  return (
    <form className="space-y-4 md:space-y-5">
      <Row>
        <div>
          <div className={labelBase}>Name *</div>
          <input className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <div className={labelBase}>Brand *</div>
          <input className={inputBase} placeholder="Company / Brand" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Email *</div>
          <input className={inputBase} placeholder="name@email.com" />
        </div>
        <div>
          <div className={labelBase}>Phone *</div>
          <input className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>City</div>
          <input className={inputBase} placeholder="Austin, TX" />
        </div>
        <div>
          <div className={labelBase}>Number of Booths</div>
          <input className={inputBase} placeholder="1" />
        </div>
      </Row>
      <div>
        <div className={labelBase}>How you’d like to participate</div>
        <textarea className={textareaBase} placeholder="Booth, brand placement, activations…" />
      </div>
      <button className={submitBtn}>SUBMIT SPONSORSHIP APPLICATION</button>
    </form>
  );
}

function VendorForm() {
  return (
    <form className="space-y-4 md:space-y-5">
      <Row>
        <div>
          <div className={labelBase}>Your Name</div>
          <input className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <div className={labelBase}>Phone Number</div>
          <input className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Email</div>
          <input className={inputBase} placeholder="name@email.com" />
        </div>
        <div>
          <div className={labelBase}>City</div>
          <input className={inputBase} placeholder="Austin, TX" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Brand *</div>
          <input className={inputBase} placeholder="Company / Brand" />
        </div>
        <div>
          <div className={labelBase}>Number of Booths</div>
          <input className={inputBase} placeholder="1" />
        </div>
      </Row>
      <div>
        <div className={labelBase}>How you’d like to participate</div>
        <textarea className={textareaBase} placeholder="Booth, brand placement, activations…" />
      </div>
      <button className={submitBtn}>SUBMIT VENDOR APPLICATION</button>
    </form>
  );
}

function PressForm() {
  return (
    <form className="space-y-4 md:space-y-5">
      <Row>
        <div>
          <div className={labelBase}>Your Name</div>
          <input className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <div className={labelBase}>Phone Number</div>
          <input className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Email</div>
          <input className={inputBase} placeholder="name@email.com" />
        </div>
        <div>
          <div className={labelBase}>City</div>
          <input className={inputBase} placeholder="Austin, TX" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>What kind of media?</div>
          <input className={inputBase} placeholder="YouTube, Podcast, Blog…" />
        </div>
        <div>
          <div className={labelBase}>Primary platform?</div>
          <input className={inputBase} placeholder="Channel / Handle" />
        </div>
      </Row>
      <div>
        <div className={labelBase}>Approx. followers</div>
        <textarea className={textareaBase} placeholder="e.g., 120k total" />
      </div>
      <button className={submitBtn}>SUBMIT PRESS APPLICATION</button>
    </form>
  );
}
