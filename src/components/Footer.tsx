// /src/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[radial-gradient(80%_120%_at_10%_0%,rgba(105,227,241,.08),transparent_60%),radial-gradient(80%_120%_at_90%_100%,rgba(244,114,182,.08),transparent_60%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Social rows — left: Follow us, right: Special Delivery */}
        <div className="pt-10 grid gap-10 md:grid-cols-2">
          {/* Left: Follow us */}
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white">Follow us:</h3>
            <ul className="mt-4 flex flex-wrap items-center gap-4">
              {/* TODO: update hrefs to real profiles */}
              <Social href="https://facebook.com" label="Facebook"><FacebookIcon /></Social>
              <Social href="https://instagram.com" label="Instagram"><InstagramIcon /></Social>
              <Social href="https://x.com" label="X (Twitter)"><XIcon /></Social>
            </ul>
          </div>

          {/* Right: Special Delivery (logo + links) */}
          <div className="md:text-right">
            <div className="flex items-center gap-3 md:justify-end">
              <Image
                src="/images/logos/SD_TextLogo_Light.jpg"
                alt="Special Delivery"
                width={220}
                height={44}
                className="h-[28px] w-auto md:h-[32px]"
                priority
              />
            </div>
            <ul className="mt-4 flex flex-wrap items-center gap-4 md:justify-end">
              {/* TODO: update hrefs to SD links */}
              <Social href="https://sdpresents.com/" label="Website"><GlobeIcon /></Social>
              <Social href="https://www.facebook.com/specialdeliverypresents" label="Facebook"><FacebookIcon /></Social>
              <Social href="https://www.instagram.com/specialdeliverytx" label="Instagram"><InstagramIcon /></Social>
             {/* <Social href="https://x.com" label="X (Twitter)"><XIcon /></Social> */}
            </ul>
          </div>
        </div>

        {/* --- Purple divider --- */}
        <div className="mt-12">
          <div className="h-px bg-gradient-to-r from-transparent via-[#6E61FF]/70 to-transparent shadow-[0_0_12px_#6E61FF80]" />
        </div>

        {/* Centered trademark/copyright only */}
        <div className="py-8">
          <p className="text-center text-white/70">
            © {new Date().getFullYear()} TCGFEST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */

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

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.06 5.66 21.2 10.44 22v-7.03H7.9v-2.9h2.54v-2.2c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.06 22 12.06Z" />
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

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm7.93 9h-3.02a15.6 15.6 0 0 0-1.06-4.16A8.02 8.02 0 0 1 19.93 11ZM15.5 11h-7c.2-1.76.78-3.46 1.66-4.88.5-.82 1.06-1.45 1.56-1.83.5.38 1.06 1.01 1.56 1.83.88 1.42 1.46 3.12 1.66 4.88Zm-7 2h7c-.2 1.76-.78 3.46-1.66 4.88-.5.82-1.06 1.45-1.56 1.83-.5-.38-1.06-1.01-1.56-1.83-.88-1.42-1.46-3.12-1.66-4.88Zm8.35 0h3.08a8.02 8.02 0 0 1-4.07 4.16c.44-1.02.8-2.17.99-3.39ZM5.66 6.84A15.6 15.6 0 0 0 4.59 11H1.57a8.02 8.02 0 0 1 4.09-4.16ZM4.07 13h3.08c.2 1.22.55 2.37.99 3.39A8.02 8.02 0 0 1 4.07 13Zm12.35-7.88c.47.75.9 1.7 1.24 2.76H16.2c-.23-1.08-.56-2.03-.98-2.76a8 8 0 0 1 1.2 0ZM8.78 3.36c-.42.73-.75 1.68-.98 2.76H6.34c.34-1.06.78-2.01 1.24-2.76.37-.06.76-.09 1.2-.09.41 0 .8.03 1.2.09Z" />
    </svg>
  );
}
