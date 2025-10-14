"use client";

import Image from "next/image";
import Link from "next/link";

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
    title: "MEET INDUSTRY LEADERS",
    description:
      "Direct access to industry leaders at our exclusive Speaker networking events and lounges",
    image: "/images/program/meet.jpg",
    href: "#meet",
  },
  {
    title: "GET GLOBAL EXPOSURE",
    description:
      "Exposure to global media and VCs actively looking for their next investment",
    image: "/images/program/exposure.jpg",
    href: "#exposure",
  },
  {
    title: "SHOWCASE AT TOKEN2049",
    description: "A dedicated startup stand at TOKEN2049 Singapore",
    image: "/images/program/showcase.jpg",
    href: "#showcase",
  },
    {
    title: "MEET INDUSTRY LEADERS",
    description:
      "Direct access to industry leaders at our exclusive Speaker networking events and lounges",
    image: "/images/program/meet.jpg",
    href: "#meet",
  },
  {
    title: "GET GLOBAL EXPOSURE",
    description:
      "Exposure to global media and VCs actively looking for their next investment",
    image: "/images/program/exposure.jpg",
    href: "#exposure",
  },
  {
    title: "SHOWCASE AT TOKEN2049",
    description: "A dedicated startup stand at TOKEN2049 Singapore",
    image: "/images/program/showcase.jpg",
    href: "#showcase",
  },
];

export default function ProgramSection({
  title = "Experience",
  blurb =
    "",
  items = DEFAULT_ITEMS,
  className = "",
}: ProgramSectionProps) {
  return (
    <section className={`relative w-full text-neutral-50 ${className}`}>
      <div className="page-container">
        {/* Header row */}
        <div className="grid grid-cols-1 items-start gap-6 pb-6 md:grid-cols-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="max-w-prose text-balance text-base text-neutral-300 md:justify-self-end">
            {blurb}
          </p>
        </div>

        {/* Purple divider that matches site container width */}
        <div className="">
          <div className="mx-auto h-px w-full max-w-7xl mb-8 md:mb-10 bg-gradient-to-r from-transparent via-[#D52EF5]/80 to-transparent shadow-[0_0_12px_#D52EF580]" />
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

function Card({ title, description, image, href }: ProgramItem) {
  const Inner = (
    <div className="group relative h-72 w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition">
      {/* Background image */}
      <Image
        src={image}
        alt=""
        fill
        priority={false}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
      />

      {/* Dark overlay gradient for text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 space-y-2 p-6">
        <h3 className="text-xl font-semibold tracking-wide">{title}</h3>
        <p className="text-sm text-neutral-200/90">{description}</p>
      </div>
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      {Inner}
    </Link>
  ) : (
    Inner
  );
}