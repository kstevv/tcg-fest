"use client";

import Image from "next/image";

export type ProgramItem = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

interface ProgramSectionProps {
  title?: string;
  blurb?: string;
  items?: ProgramItem[];
  className?: string;
}

const DEFAULT_ITEMS: ProgramItem[] = [
  {
    title: "CHAMPIONSHIP TOURNAMENTS",
    description:
      "Main events and side events across One Piece, Riftbound, Gundham, Lorcana, MTG, and more.",
    image: "/images/program/tournaments.png",
    href: "/tournaments",
  },
  {
    title: "VENDOR MARKETPLACE",
    description:
      "Sealed product, singles, accessories, vintage grails — shop dozens of top vendors.",
    image: "/images/program/vendors.png",
    href: "/vendors",
  },
  {
    title: "PRIZE GIVEAWAYS",
    description:
      "Raffles, stage giveaways, and bounty events running throughout the show.",
    image: "/images/program/giveaways.png",
    href: "#giveaways",
  },
  {
    title: "SPECIAL GUESTS & SIGNINGS",
    description:
      "Creators, artists, casters, and pros — meet, greet, and grab autographs.",
    image: "/images/program/signings.png",
    href: "/guests",
  },
  {
    title: "LEARN-TO-PLAY & DEMOS",
    description:
      "Jump in fast with coaches and demo decks. Perfect for new and returning players.",
    image: "/images/program/learn-to-play.png",
    href: "/schedule",
  },
  {
    title: "TRADING & GRADING LOUNGE",
    description:
      "Safe-trade zone with trade boards; on-site grading/submissions when available.",
    image: "/images/program/trading.png",
    href: "/trading",
  },
];

export default function ProgramSection({
  title = "Experience",
  blurb = "",
  items = DEFAULT_ITEMS,
  className = "",
}: ProgramSectionProps) {
  return (
    <section className={`relative w-full text-neutral-50 ${className}`}>
      {/* ✅ Anchor shim for perfect offset on mobile/desktop */}
      <span
        id="experience"
        className="block -mt-16 pt-16 md:-mt-16 md:pt-16 lg:-mt-20 lg:pt-20"
        aria-hidden="true"
      />

      <div className="page-container">
        {/* Header row — even tighter spacing */}
        <div className="grid grid-cols-1 items-start gap-4 pb-1 md:grid-cols-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="max-w-prose text-balance text-base text-neutral-300 md:justify-self-end">
            {blurb}
          </p>
        </div>

        {/* Purple divider — perfectly matched to Special Guests */}
        <div>
          <div className="mx-auto h-px w-full max-w-7xl mb-5 md:mb-8 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ title, description, image }: ProgramItem) {
  return (
    <div
      className="
        group relative h-72 w-full overflow-hidden rounded-2xl
        bg-neutral-900 ring-1 ring-white/10
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]
        transition
        cursor-default select-none
      "
      aria-label={title}
    >
      <Image
        src={image}
        alt=""
        fill
        priority={false}
        sizes='(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
        className="z-0 object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[60%] bg-gradient-to-t from-black/92 via-black/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_-80px_120px_-20px_rgba(0,0,0,0.95)]" />
      <div className="absolute inset-x-0 bottom-0 z-20 space-y-2 p-6">
        <h3 className="text-xl font-semibold tracking-wide">{title}</h3>
        <p className="text-sm text-neutral-200/90">{description}</p>
      </div>
    </div>
  );
}
