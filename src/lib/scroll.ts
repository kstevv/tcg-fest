// /src/lib/scroll.ts

/**
 * Smoothly scrolls to a section by element ID, accounting for
 * different offsets on mobile and desktop (to clear sticky headers).
 */
export function scrollToId(
  id: string,
  opts: { mobileOffset: number; desktopOffset: number }
) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  const isDesktop = window.innerWidth >= 1024; // lg breakpoint
  const offset = isDesktop ? opts.desktopOffset : opts.mobileOffset;

  const rect = el.getBoundingClientRect();
  const absoluteY = window.scrollY + rect.top - offset;

  window.scrollTo({ top: absoluteY, behavior: "smooth" });
}

/**
 * Smoothly scrolls the page back to the top.
 */
export function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
