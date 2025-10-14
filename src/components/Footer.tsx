// /src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[radial-gradient(80%_120%_at_10%_0%,rgba(105,227,241,.08),transparent_60%),radial-gradient(80%_120%_at_90%_100%,rgba(244,114,182,.08),transparent_60%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top badges */}
        <div className="flex flex-wrap items-center gap-4 pt-10">
          <Ribbon href="/sponsor" label="Sponsor" className="bg-[#D52EF5] text-white" />
          <Ribbon href="/early-access" label="Tickets" className="bg-[#5416DD] text-white" />
        </div>

        {/* Follow us */}
        <div className="mt-10">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">Follow us:</h3>
          <ul className="mt-4 flex flex-wrap items-center gap-4">
            <Social href="#" label="X"><XIcon /></Social>
            <Social href="#" label="YouTube"><YouTubeIcon /></Social>
            <Social href="#" label="Instagram"><InstagramIcon /></Social>
          </ul>
        </div>

        {/* --- Purple divider --- */}
        <div className="mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-[#6E61FF]/70 to-transparent shadow-[0_0_12px_#6E61FF80]" />
        </div>

        {/* Legal row */}
        <div className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-white/80 font-semibold">
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>

          <p className="text-center text-white/70">
            © {new Date().getFullYear()} TCGFEST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */

function Ribbon({
  href,
  label,
  className = "",
}: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center rounded-md px-5 py-2 text-[12px] font-extrabold tracking-[0.25em] uppercase shadow ring-1 ring-black/15 ${className}`}
    >
      <span>{label}</span>
      <span className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1 bg-current/0 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
      <span className="pointer-events-none absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 -translate-x-1 bg-current/0 [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
    </Link>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
      >
        {children}
      </Link>
    </li>
  );
}

/* ---------- Icons (inline SVG) ---------- */


function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21l-6.5 7.43L22.5 22h-6.8l-5.32-6.75L3.9 22H1l7.02-8.02L1.8 2h6.86l4.89 6.35L18.244 2Zm-1.19 18h1.87L8.69 4H6.83l10.224 16Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M23.5 7.2a3 3 0 0 0-2.11-2.12C19.7 4.5 12 4.5 12 4.5s-7.7 0-9.39.58A3 3 0 0 0 .5 7.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 4.8 3 3 0 0 0 2.11 2.12c1.69.58 9.39.58 9.39.58s7.7 0 9.39-.58A3 3 0 0 0 23.5 16.8 31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-4.8ZM9.75 15.02v-6.04L15.5 12l-5.75 3.02Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0-5.3c2.02 0 2.27.01 3.07.04.79.03 1.33.16 1.8.34.49.19.91.45 1.33.87.42.42.68.84.87 1.33.18.47.31 1.01.34 1.8.03.8.04 1.05.04 3.07s-.01 2.27-.04 3.07c-.03.79-.16 1.33-.34 1.8a3.77 3.77 0 0 1-.87 1.33c-.42.42-.84.68-1.33.87-.47.18-1.01.31-1.8.34-.8.03-1.05.04-3.07.04s-2.27-.01-3.07-.04c-.79-.03-1.33-.16-1.8-.34a3.77 3.77 0 0 1-1.33-.87c-.42-.42-.68-.84-.87-1.33-.18-.47-.31-1.01-.34-1.8C3.01 14.27 3 14.02 3 12s.01-2.27.04-3.07c.03-.79.16-1.33.34-1.8.19-.49.45-.91.87-1.33.42-.42.84-.68 1.33-.87.47-.18 1.01-.31 1.8-.34C9.73 3.01 9.98 3 12 3Zm0 2c-1.98 0-2.22.01-3 .04-.58.03-.9.12-1.11.2-.28.11-.48.25-.7.47-.22.22-.36.42-.47.7-.08.21-.17.53-.2 1.11C6.49 8.78 6.48 9.02 6.48 12s.01 3.22.04 4c.03.58.12.9.2 1.11.11.28.25.48.47.7.22.22.42.36.7.47.21.08.53.17 1.11.2.78.03 1.02.04 3 .04s2.22-.01 3-.04c.58-.03.9-.12 1.11-.2.28-.11.48-.25.7-.47.22-.22.36-.42.47-.7.08-.21.17-.53.2-1.11.03-.78.04-1.02.04-3s-.01-2.22-.04-3c-.03-.58-.12-.9-.2-1.11a1.9 1.9 0 0 0-.47-.7c-.22-.22-.42-.36-.7-.47-.21-.08-.53-.17-1.11-.2-.78-.03-1.02-.04-3-.04ZM17.5 7A1.5 1.5 0 1 0 17.5 4 1.5 1.5 0 0 0 17.5 7Z" />
    </svg>
  );
}