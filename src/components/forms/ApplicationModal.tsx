"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "sponsor" | "vendor" | "press";

export default function ApplicationModal({
  open,
  kind: initialKind = "sponsor",
  onClose,
}: {
  open: boolean;
  kind?: Kind;
  onClose: () => void;
}) {
  const [kind, setKind] = useState<Kind>(initialKind);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // keep tab selection in sync when parent changes
  useEffect(() => setKind(initialKind), [initialKind]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const _title = kind === "sponsor" ? "Sponsor" : kind === "vendor" ? "Vend" : "Press";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      {/* Centering wrapper */}
      <div className="flex min-h-full items-end sm:items-center justify-center p-2 sm:p-4">
        {/* Panel */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl rounded-2xl bg-[rgba(15,15,25,0.95)] ring-1 ring-white/10 shadow-2xl"
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
            <div className="flex gap-2">
              <Tab label="Sponsor" active={kind === "sponsor"} onClick={() => setKind("sponsor")} />
              <Tab label="Vend" active={kind === "vendor"} onClick={() => setKind("vendor")} />
              <Tab label="Press" active={kind === "press"} onClick={() => setKind("press")} />
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15"
            >
              ×
            </button>
          </div>

          {/* Scrollable content */}
          <div className="max-h-[75vh] overflow-y-auto ios-scroll px-4 sm:px-6 py-4">
            <Form kind={kind} />
          </div>

          {/* Footer — tighter space above/below consent, keep extra mobile bottom space */}
          <div className="px-4 sm:px-6 pt-1 pb-16 sm:pt-3 sm:pb-6 border-t border-white/10">
            <ConsentCheckbox />
            <button
              type="button"
              className="mt-2 cursor-pointer inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-md font-extrabold uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)] hover:brightness-110 active:translate-y-[1px] transition"
              onClick={onClose}
            >
              {kind === "sponsor"
                ? "Submit Sponsorship Application"
                : kind === "vendor"
                ? "Submit Vendor Application"
                : "Submit Press Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----- Small Components ----- */

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "cursor-pointer rounded-md px-3 py-2 text-sm font-extrabold uppercase tracking-wide",
        active
          ? "bg-white/15 text-white ring-1 ring-white/20"
          : "bg-white/5 text-white/80 hover:bg-white/10 ring-1 ring-white/10",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ConsentCheckbox() {
  return (
    <label className="flex items-center gap-2 text-white/90 text-sm leading-tight mt-0.5 mb-1 sm:mt-1.5 sm:mb-2">
      <input
        type="checkbox"
        className="h-4 w-4 rounded-md bg-white/5 border border-white/30 accent-[#6E61FF] cursor-pointer"
      />
      <span>I consent to be contacted regarding my application and related opportunities.</span>
    </label>
  );
}

/* ----- Form Fields ----- */
function Form({ kind }: { kind: "sponsor" | "vendor" | "press" }) {
  if (kind === "sponsor") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name *" placeholder="Jane Doe" />
          <Field label="Email *" placeholder="name@email.com" type="email" />
          <Field label="Brand *" placeholder="Company / Brand" />
          <Field label="Phone *" placeholder="(555) 123-4567" />
          <Field label="City" placeholder="Austin, TX" />
          <Field label="Budget (USD)" placeholder="5000" type="number" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            How you’d like to participate
          </label>
          <textarea
            className="w-full rounded-md bg-white/5 text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#6E61FF] px-3 py-3 min-h-[120px]"
            placeholder="Booth, brand placement, activations…"
          />
        </div>
      </div>
    );
  }

  if (kind === "vendor") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Your Name" placeholder="Jane Doe" />
          <Field label="Phone Number" placeholder="(555) 123-4567" />
          <Field label="Email" placeholder="name@email.com" type="email" />
          <Field label="City" placeholder="Austin, TX" />
          <Field label="Brand *" placeholder="Company / Brand" />
          <Field label="Number of Booths" placeholder="1" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            What you sell
          </label>
          <textarea
            className="w-full rounded-md bg-white/5 text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#6E61FF] px-3 py-3 min-h-[120px]"
            placeholder="Sealed, singles, accessories, grading, etc."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your Name" placeholder="Jane Doe" />
        <Field label="Phone Number" placeholder="(555) 123-4567" />
        <Field label="Email" placeholder="name@email.com" type="email" />
        <Field label="City" placeholder="Austin, TX" />
        <Field label="What kind of media?" placeholder="YouTube, Podcast, Blog…" />
        <Field label="Primary Platform (Channel)" placeholder="YouTube / Instagram / TikTok / etc." />
        <Field label="Primary Platform Handle" placeholder="@yourhandle" />
        <Field label="Approx. Followers" placeholder="e.g., 120k total" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-2">
          Coverage focus / requests
        </label>
        <textarea
          className="w-full rounded-md bg-white/5 text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#6E61FF] px-3 py-3 min-h-[120px]"
          placeholder="Interview requests, panels, segments…"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-white/90 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md bg-white/5 text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#6E61FF] px-3 py-3"
      />
    </div>
  );
}
