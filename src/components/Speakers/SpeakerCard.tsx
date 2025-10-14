"use client";

import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/app/types";

export default function SpeakerCard({ s }: { s: Speaker }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-[#0e0f19] ring-1 ring-white/5 shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform hover:-translate-y-0.5"
    >
      {/* Headshot */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={s.image}
          alt={s.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center"
          priority={false}
        />
        {/* Subtle dotted texture overlay (optional) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.15),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,.12),transparent_35%)] mix-blend-soft-light opacity-30"></div>

        {/* Top-right social icons */}
        <div className="absolute right-3 top-3 flex gap-2">
          {s.socials?.x && (
            <IconPill href={s.socials.x} label="X">X</IconPill>
          )}
          {s.socials?.linkedin && (
            <IconPill href={s.socials.linkedin} label="LinkedIn">in</IconPill>
          )}
        </div>

        {/* Bottom gradient + text */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Text block */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
          {s.name}
        </h3>
        {s.org && (
          <div className="mt-1 text-[11px] sm:text-xs font-extrabold tracking-wide text-white/85">
            {s.org}
          </div>
        )}
        {s.title && (
          <div className="mt-0.5 text-[10px] sm:text-xs tracking-wide text-white/65">
            {s.title}
          </div>
        )}
      </div>
    </article>
  );
}

function IconPill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-black/50 px-2 text-[11px] font-bold uppercase tracking-wide text-white ring-1 ring-white/15 backdrop-blur hover:bg-black/60"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </Link>
  );
}
