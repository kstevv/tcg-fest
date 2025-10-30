"use client";

import { useState } from "react";
import type { JSX } from "react";

export type FAQItem = { q: string; a: string };

const DEFAULT_FAQ: FAQItem[] = [];

export default function FAQSection({
  items = DEFAULT_FAQ,
}: {
  items?: FAQItem[];
}): JSX.Element {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full scroll-mt-28 md:scroll-mt-40">
      <div className="page-container py-16">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white pb-2 md:pb-0">
          Frequently Asked Questions
        </h2>

        {/* Divider — tighter on mobile */}
        <div className="mt-0">
          <div className="h-px w-full mb-5 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={[
                  "rounded-2xl overflow-hidden transition-all",
                  "ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]",
                  "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_100%)]",
                  isOpen
                    ? "ring-1 ring-[#D52EF5]/50 shadow-[0_0_0_1px_rgba(213,46,245,.25),0_20px_40px_rgba(213,46,245,.08)]"
                    : "",
                ].join(" ")}
              >
                {/* Header */}
                <button
                  type="button"
                  className="group w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="flex-1 pr-4">
                    <span className="block text-[13px] sm:text-sm font-extrabold uppercase tracking-wide text-white">
                      {item.q}
                    </span>
                  </span>

                  {/* plus / close chip */}
                  <span
                    className={[
                      "inline-flex h-7 w-7 items-center justify-center rounded-md",
                      "ring-1 ring-white/15 text-white/90",
                      "bg-white/5 backdrop-blur-sm",
                      isOpen
                        ? "bg-[#D52EF5]/10 ring-[#D52EF5]/40 text-[#E88BFF]"
                        : "group-hover:bg-white/10",
                    ].join(" ")}
                  >
                    {isOpen ? <CloseIcon /> : <PlusIcon />}
                  </span>
                </button>

                {/* Divider under header when open */}
                <div
                  className={[
                    "mx-5 sm:mx-6 h-px bg-white/10 transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />

                {/* Panel */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 py-4 text-sm leading-6 text-white/80">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Icons ---------- */
const PlusIcon: React.FC = (): JSX.Element => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    aria-hidden="true"
    className="fill-current"
  >
    <path d="M6 0h2v6h6v2H8v6H6V8H0V6h6z" />
  </svg>
);

const CloseIcon: React.FC = (): JSX.Element => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    aria-hidden="true"
    className="fill-current"
  >
    <path d="M10.95 1.05 1.05 10.95 0 9.9 9.9 0l1.05 1.05ZM9.9 10.95 0 1.05 1.05 0l9.9 9.9-1.05 1.05Z" />
  </svg>
);
