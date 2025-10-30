// /src/components/ModalProvider.tsx
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { submitApplication } from "@/lib/apply-submit";
import type { Application } from "@/lib/apply-schema";

/** ----- Types & Context ----- */
type ModalTab = "sponsor" | "vendor" | "press";
type Ctx = {
  isOpen: boolean;
  tab: ModalTab;
  open: (tab?: ModalTab) => void;
  close: () => void;
  setTab: (t: ModalTab) => void;
  // Toast trigger available to children
  showToast: (title: string, message?: string) => void;
};

const ApplicationModalContext = createContext<Ctx | null>(null);

export function useApplicationModal() {
  const ctx = useContext(ApplicationModalContext);
  if (!ctx) {
    throw new Error(
      "useApplicationModal must be used inside <ApplicationModalProvider>",
    );
  }
  return ctx;
}

/** Extract the discriminated subtypes so TS knows exact fields in each form */
type SponsorApp = Extract<Application, { type: "sponsor" }>;
type VendorApp = Extract<Application, { type: "vendor" }>;
type PressApp  = Extract<Application, { type: "press" }>;

/* ---------------- Toast ---------------- */
function SuccessToast({
  title,
  message,
  onClose,
}: {
  title: string;
  message?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-auto">
      <div
        className="relative mx-auto w-[92vw] max-w-md rounded-2xl px-4 py-3.5 shadow-2xl ring-1 ring-white/15
                   backdrop-blur-lg text-white transition
                   bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                   before:absolute before:inset-0 before:-z-10 before:rounded-2xl
                   before:bg-[radial-gradient(120%_120%_at_0%_0%,#D52EF566,transparent_60%),radial-gradient(120%_120%_at_100%_0%,#5416DD55,transparent_60%)]
                   animate-toastIn"
      >
        <div className="flex items-start gap-3">
          <div className="grid place-items-center h-9 w-9 rounded-xl ring-1 ring-white/20
                          bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M20 7 9 18l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex-1">
            <div className="text-sm font-extrabold tracking-wide uppercase opacity-95">{title}</div>
            {message ? <div className="mt-0.5 text-sm text-white/85 leading-relaxed">{message}</div> : null}
          </div>

          <button
            aria-label="Close notification"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-white/70 hover:text-white hover:bg-white/10 ring-1 ring-white/10 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Provider ---------------- */

export default function ApplicationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<ModalTab>("sponsor");

  // Toast state
  const [toast, setToast] = useState<{ title: string; message?: string } | null>(null);
  const showToast = useCallback((title: string, message?: string) => {
    setToast({ title, message });
  }, []);
  const hideToast = useCallback(() => setToast(null), []);

  const open = useCallback((t?: ModalTab) => {
    if (t) setTab(t);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // prevent background scroll when modal open
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevPaddingRight = html.style.paddingRight;
    const sbw = window.innerWidth - html.clientWidth;
    if (sbw > 0) html.style.paddingRight = `${sbw}px`;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevOverflow;
      html.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  const value = useMemo<Ctx>(
    () => ({ isOpen, tab, open, close, setTab, showToast }),
    [isOpen, tab, open, close, showToast],
  );

  return (
    <ApplicationModalContext.Provider value={value}>
      {children}

      {/* Global toast portal */}
      <div
        className="pointer-events-none fixed inset-x-0 top-4 z-[110] grid place-items-center"
        aria-live="polite"
      >
        {toast && (
          <SuccessToast
            title={toast.title}
            message={toast.message}
            onClose={hideToast}
          />
        )}
      </div>

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div className="absolute inset-0 flex items-stretch md:items-center justify-center overflow-hidden md:overflow-visible">
        <div
          className="relative w-full h-full md:h-auto md:max-h-[92vh] max-w-none md:max-w-5xl
                     bg-[#0F1117] text-white ring-1 ring-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                     rounded-none md:rounded-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
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

          {/* Tabs (mobile adds spacing below) */}
          <div className="px-5 md:px-6 pb-3 md:pb-4">
            <div className="flex gap-3 mb-3 md:mb-0">
              <TabButton active={tab === "sponsor"} onClick={() => setTab("sponsor")}>Sponsor</TabButton>
              <TabButton active={tab === "vendor"} onClick={() => setTab("vendor")}>Vend</TabButton>
              <TabButton active={tab === "press"} onClick={() => setTab("press")}>Press</TabButton>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-5 md:pb-6">
            {tab === "sponsor" && <SponsorForm onDone={close} />}
            {tab === "vendor" && <VendorForm onDone={close} />}
            {tab === "press" && <PressForm onDone={close} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------- Small UI helpers --------------- */

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

function Row({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 ${className}`}>
      {children}
    </div>
  );
}

const inputBase =
  "w-full rounded-md bg-[#151823] text-white placeholder-white/40 ring-1 ring-white/10 h-11 px-3.5 md:px-4 focus:outline-none focus:ring-2 focus:ring-[#6E61FF]";
const textareaBase =
  "w-full rounded-md bg-[#151823] text-white placeholder-white/40 ring-1 ring-white/10 min-h-[120px] p-3.5 md:p-4 focus:outline-none focus:ring-2 focus:ring-[#6E61FF]";
const labelBase = "text-xs font-bold uppercase tracking-wide text-white/70 mb-1.5";

/* Mobile gets extra vertical padding; desktop retains fixed height */
const submitBtn =
  "w-full mt-4 md:mt-6 h-auto md:h-14 rounded-md font-extrabold uppercase tracking-[0.25em] leading-tight " +
  "bg-gradient-to-r from-[#D52EF5] to-[#5416DD] ring-1 ring-black/15 shadow cursor-pointer " +
  "px-4 py-3 md:py-0 disabled:opacity-70 disabled:cursor-not-allowed";

/* --------------- Forms --------------- */

function SponsorForm({ onDone }: { onDone: () => void }) {
  const { showToast } = useApplicationModal();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;

    try {
      const fd = new FormData(form);

      const app: SponsorApp = {
        type: "sponsor",
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        brand: String(fd.get("brand") || "").trim(),
        phone: String(fd.get("phone") || "").trim() || undefined,
        city: String(fd.get("city") || "").trim() || undefined,
        website: undefined,
        goals: String(fd.get("participation") || "").trim() || undefined,
        budgetRange: (String(fd.get("budgetRange") || "") ||
          undefined) as SponsorApp["budgetRange"],
        notes: undefined,
      };

      await submitApplication(app);
      form.reset();
      onDone();
      showToast("Application submitted", "Thanks! We’ll be in touch shortly.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      // Optional: you can add an error toast variant later
      alert(`Submission failed: ${message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 md:space-y-5">
      {/* mobile-only margin above first row */}
      <Row className="mt-3 md:mt-0">
        <div>
          <div className={labelBase}>Your Name *</div>
          <input name="name" required className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <div className={labelBase}>Email *</div>
          <input name="email" required type="email" className={inputBase} placeholder="name@email.com" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Brand *</div>
          <input name="brand" required className={inputBase} placeholder="Company / Brand" />
        </div>
        <div>
          <div className={labelBase}>Phone Number</div>
          <input name="phone" className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>City</div>
          <input name="city" className={inputBase} placeholder="Austin, TX" />
        </div>
        <div>
          <div className={labelBase}>Budget Range *</div>
          <select
            name="budgetRange"
            required
            defaultValue=""
            onChange={(e) =>
              e.currentTarget.classList.toggle(
                "text-white/40",
                e.currentTarget.value === "",
              )
            }
            className={inputBase.replace("h-11", "h-11 pr-10") + " text-white/40"}
            aria-label="Budget Range"
          >
            <option value="" disabled hidden>
              Select a range
            </option>
            <option value="&lt;$2k">&lt;$2k</option>
            <option value="$2k–$5k">$2k–$5k</option>
            <option value="$5k–$10k">$5k–$10k</option>
            <option value="$10k+">$10k+</option>
          </select>
        </div>
      </Row>
      <div>
        <div className={labelBase}>How you’d like to participate</div>
        <textarea
          name="participation"
          className={textareaBase}
          placeholder="Booth, brand placement, activations…"
        />
      </div>
      {/* Consent (required, not submitted) */}
      <div className="pt-2">
        <label htmlFor="consent-sponsor" className="flex items-center gap-3 cursor-pointer select-none">
          <input
            id="consent-sponsor"
            type="checkbox"
            required
            className="h-5 w-5 rounded accent-[#6E61FF] ring-1 ring-white/15"
          />
          <span className="text-sm font-medium text-white/70">
            I consent to be contacted regarding my application and related opportunities.
          </span>
        </label>
      </div>
      <button type="submit" className={`${submitBtn} mb-8 md:mb-0`} disabled={submitting}>
        {submitting ? "Submitting…" : "SUBMIT SPONSORSHIP APPLICATION"}
      </button>
    </form>
  );
}

function VendorForm({ onDone }: { onDone: () => void }) {
  const { showToast } = useApplicationModal();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;

    try {
      const fd = new FormData(form);
      const app: VendorApp = {
        type: "vendor",
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        brand: String(fd.get("brand") || "").trim(),
        phone: String(fd.get("phone") || "").trim() || undefined,
        city: String(fd.get("city") || "").trim() || undefined,
        numberOfBooths: Number(String(fd.get("numberOfBooths") || "1")) || 1,
        whatTheySell: String(fd.get("whatYouSell") || "").trim() || undefined,
        notes: undefined,
      };

      await submitApplication(app);
      form.reset();
      onDone();
      showToast("Application submitted", "Thanks! We’ll be in touch shortly.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      alert(`Submission failed: ${message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 md:space-y-5">
      {/* mobile-only margin above first row */}
      <Row className="mt-3 md:mt-0">
        <div>
          <div className={labelBase}>Your Name *</div>
          <input name="name" required className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <div className={labelBase}>Phone Number</div>
          <input name="phone" className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Email *</div>
          <input name="email" required type="email" className={inputBase} placeholder="name@email.com" />
        </div>
        <div>
          <div className={labelBase}>City</div>
          <input name="city" className={inputBase} placeholder="Austin, TX" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Brand *</div>
          <input name="brand" required className={inputBase} placeholder="Company / Brand" />
        </div>
        <div>
          <div className={labelBase}>Number of Booths</div>
          <input name="numberOfBooths" className={inputBase} placeholder="1" />
        </div>
      </Row>
      <div>
        <div className={labelBase}>What you sell</div>
        <textarea
          name="whatYouSell"
          className={textareaBase}
          placeholder="Sealed, singles, accessories, grading, etc."
        />
      </div>
      {/* Consent (required, not submitted) */}
      <div className="pt-2">
        <label htmlFor="consent-vendor" className="flex items-center gap-3 cursor-pointer select-none">
          <input
            id="consent-vendor"
            type="checkbox"
            required
            className="h-5 w-5 rounded accent-[#6E61FF] ring-1 ring-white/15"
          />
          <span className="text-sm font-medium text-white/70">
            I consent to be contacted regarding my application and related opportunities.
          </span>
        </label>
      </div>
      <button type="submit" className={`${submitBtn} mb-8 md:mb-0`} disabled={submitting}>
        {submitting ? "Submitting…" : "SUBMIT VENDOR APPLICATION"}
      </button>
    </form>
  );
}

function PressForm({ onDone }: { onDone: () => void }) {
  const { showToast } = useApplicationModal();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;

    try {
      const fd = new FormData(form);
      const channel = String(fd.get("platformChannel") || "").trim();
      const handle = String(fd.get("platformHandle") || "").trim();
      const primary = [channel, handle && `(${handle})`].filter(Boolean).join(" ");

      const app: PressApp = {
        type: "press",
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim() || undefined,
        city: String(fd.get("city") || "").trim() || undefined,
        mediaType: String(fd.get("mediaType") || "").trim() || "Online",
        primaryPlatform: primary || undefined,
        approxFollowers: String(fd.get("followers") || "").trim() || undefined,
        notes: String(fd.get("coverageNotes") || "").trim() || undefined,
      };

      await submitApplication(app);
      form.reset();
      onDone();
      showToast("Application submitted", "Thanks! We’ll be in touch shortly.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : String(err ?? "Unknown error");
      alert(`Submission failed: ${message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 md:space-y-5">
      {/* mobile-only margin above first row */}
      <Row className="mt-3 md:mt-0">
        <div>
          <div className={labelBase}>Your Name *</div>
          <input name="name" required className={inputBase} placeholder="Jane Doe" />
        </div>
        <div>
          <div className={labelBase}>Phone Number</div>
          <input name="phone" className={inputBase} placeholder="(555) 123-4567" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Email *</div>
          <input name="email" required type="email" className={inputBase} placeholder="name@email.com" />
        </div>
        <div>
          <div className={labelBase}>City</div>
          <input name="city" className={inputBase} placeholder="Austin, TX" />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>What kind of media?</div>
          <input name="mediaType" className={inputBase} placeholder="YouTube, Podcast, Blog…" />
        </div>
        <div>
          <div className={labelBase}>Primary Platform (Channel)</div>
          <input name="platformChannel" className={inputBase} placeholder="YouTube / Instagram / TikTok / etc." />
        </div>
      </Row>
      <Row>
        <div>
          <div className={labelBase}>Primary Platform Handle</div>
          <input name="platformHandle" className={inputBase} placeholder="@yourhandle" />
        </div>
        <div>
          <div className={labelBase}>Approx. Followers</div>
          <input name="followers" className={inputBase} placeholder="e.g., 120k total" />
        </div>
      </Row>
      <div>
        <div className={labelBase}>Coverage focus / requests</div>
        <textarea
          name="coverageNotes"
          className={textareaBase}
          placeholder="Interview requests, panels, segments…"
        />
      </div>
      {/* Consent (required, not submitted) */}
      <div className="pt-2">
        <label htmlFor="consent-press" className="flex items-center gap-3 cursor-pointer select-none">
          <input
            id="consent-press"
            type="checkbox"
            required
            className="h-5 w-5 rounded accent-[#6E61FF] ring-1 ring-white/15"
          />
          <span className="text-sm font-medium text-white/70">
            I consent to be contacted regarding my application and related opportunities.
          </span>
        </label>
      </div>
      <button type="submit" className={`${submitBtn} mb-8 md:mb-0`} disabled={submitting}>
        {submitting ? "Submitting…" : "SUBMIT PRESS APPLICATION"}
      </button>
    </form>
  );
}
