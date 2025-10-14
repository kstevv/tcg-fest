import Link from "next/link";
import { speakers } from "../../data/speakers";
import SpeakerCard from "./SpeakerCard";

export default function SpecialGuestsSection() {
  // show first 8 on homepage; adjust as needed
  const list = speakers.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-8 pb-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Special Guests
        </h2>
        <Link
          href="/speakers"
          className="text-sm font-semibold text-white/80 hover:text-white"
        >
          All guests
        </Link>
      </div>

      {/* Purple divider that matches site container width */}
        {/*<div className="h-px bg-[#D52EF5] mb-8 md:mb-10" /> */}
        <div className="">
          <div className="mx-auto h-px w-full max-w-7xl mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => (
          <SpeakerCard key={s.id} s={s} />
        ))}
      </div>
    </section>
  );
}
