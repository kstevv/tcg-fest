// /src/components/Speakers/SpecialGuestsSection.tsx

import type { Speaker } from "@/app/types";
import SpeakerCard from "./SpeakerCard";

type Props = {
  /** Guest list (can be empty). When empty, placeholder tiles are shown. */
  speakers?: Speaker[];
  /** Section title text */
  title?: string;
  /** Short blurb displayed on the right of the title row */
  blurb?: string;
  /** Optional override for the section id used by the header dropdown */
  id?: string;
  /** Extra class names for the outer section */
  className?: string;
};

export default function SpecialGuestsSection({
  speakers = [],
  title = "Special Guests",
  id = "special-guests",
  className = "",
}: Props) {
  const _blurb = "Meet creators, artists, and pros.";

  const showPlaceholders = speakers.length === 0;
  const placeholderCount = 8;

  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-28 md:scroll-mt-40 ${className}`}
    >
      <div className="page-container py-16">
        {/* Header row */}
        <div className="grid grid-cols-1 items-start gap-6 pb-4 lg:pb-6 md:grid-cols-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
         {/*<p className="max-w-prose text-balance text-base text-neutral-300 md:justify-self-end">
            {blurb}
          </p>*/}
        </div>

        {/* Purple divider */}
        <div className="mx-auto h-px w-full max-w-7xl mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showPlaceholders
            ? Array.from({ length: placeholderCount }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-[320px] rounded-2xl bg-[#0e0f19] ring-1 ring-white/5 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
                />
              ))
            : speakers.map((s, i) => (
                <SpeakerCard key={s.id ?? i} s={s} />
              ))}
        </div>
      </div>
    </section>
  );
}
