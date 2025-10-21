// /src/components/forms/ApplicationModal.tsx
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

  const title =
    kind === "sponsor"
      ? "Sponsor"
      : kind === "vendor"
      ? "Vend"
      : "Press";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        // close only if the backdrop (not the panel) is clicked
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

          {/* Scrollable content (mobile-safe) */}
          <div className="max-h-[75vh] overflow-y-auto ios-scroll px-4 sm:px-6 py-4">
            <Form kind={kind} />
          </div>

          {/* Footer with submit */}
          <div className="px-4 sm:px-6 py-4 border-t border-white/10">
            <button
              type="button"
              className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-md font-extrabold uppercase tracking-[0.22em] text-white ring-1 ring-black/15 shadow bg-[linear-gradient(90deg,#D52EF5_0%,#5416DD_100%)] hover:brightness-110 active:translate-y-[1px] transition"
              onClick={() => {
                // TODO: hook up to your submit handler
                onClose();
              }}
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

/* Replace with your real form fields; this keeps layout & spacing consistent */
function Form({ kind }: { kind: "sponsor" | "vendor" | "press" }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name *" placeholder="Jane Doe" />
        <Field
          label={kind === "press" ? "Outlet *" : kind === "vendor" ? "Brand *" : "Brand *"}
          placeholder={kind === "press" ? "News outlet / publication" : "Company / Brand"}
        />
        <Field label="Email *" placeholder="name@email.com" type="email" />
        <Field label="Phone *" placeholder="(555) 123-4567" />
        <Field label="City" placeholder="Austin, TX" />
        <Field label={kind === "vendor" ? "Number of Booths" : "Website"} placeholder={kind === "vendor" ? "1" : "https://"} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-white/90 mb-2">
          {kind === "sponsor"
            ? "How you’d like to participate"
            : kind === "vendor"
            ? "What you’re selling"
            : "Coverage focus / requests"}
        </label>
        <textarea
          className="w-full rounded-md bg-white/5 text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#6E61FF] px-3 py-3 min-h-[120px]"
          placeholder={
            kind === "sponsor"
              ? "Booth, brand placement, activations…"
              : kind === "vendor"
              ? "Sealed, singles, accessories, grading, etc."
              : "Interview requests, panels, segments…"
          }
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
