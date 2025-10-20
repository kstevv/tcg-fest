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
  if (!ctx) throw new Error("useApplicationModal must be used within ApplicationModalProvider");
  return ctx;
}

export default function ApplicationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <Ctx.Provider value={{ open, close, setTab }}>
      {children}
      {isOpen && (
        <Modal tab={tab} onClose={close} onTabChange={setTab} />
      )}
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
  // simple focus catch on open
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

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Backdrop */}
      <button
        aria-label="Close application modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur"
      />

      {/* Panel */}
      <div className="relative w-[min(92vw,980px)] rounded-2xl ring-1 ring-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.7)] p-5 md:p-7 text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/8 hover:bg-white/12 ring-1 ring-white/10"
          aria-label="Close"
          title="Close"
        >
          ×
        </button>

        {/* Tabs */}
        <div className="mb-5 flex gap-2">
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

        {/* Fake form (fields are shared; you can wire to your API later) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="NAME *">
            <input ref={firstInputRef} className="field" placeholder="Jane Doe" />
          </Field>
          <Field label="BRAND *">
            <input className="field" placeholder="Company / Brand" />
          </Field>
          <Field label="EMAIL *">
            <input className="field" placeholder="name@email.com" />
          </Field>
          <Field label="PHONE *">
            <input className="field" placeholder="(555) 123-4567" />
          </Field>
          <Field label="CITY">
            <input className="field" placeholder="Austin, TX" />
          </Field>
          <Field label="NUMBER OF BOOTHS">
            <input className="field" placeholder="1" />
          </Field>
          <div className="md:col-span-2">
            <Field label={tab === "press" ? "WHAT YOU’LL COVER" : tab === "vendor" ? "WHAT THEY SELL" : "HOW YOU’D LIKE TO PARTICIPATE"}>
              <textarea
                rows={4}
                className="field resize-y"
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

      {/* field styling */}
      <style jsx>{`
        .field {
          width: 100%;
          border-radius: 0.625rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.7rem 0.85rem;
          outline: none;
          color: white;
        }
        .field:focus {
          border-color: rgba(213, 46, 245, 0.6);
          box-shadow: 0 0 0 2px rgba(213, 46, 245, 0.2);
        }
      `}</style>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide ring-1 transition ${
        active
          ? "bg-white/10 ring-white/15 text-white"
          : "bg-white/5 ring-white/10 text-white/90 hover:bg-white/8"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[11px] font-bold uppercase tracking-wide text-white/80">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
