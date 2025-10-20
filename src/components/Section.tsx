type Props = {
  title: string;
  cta?: { href: string; label: string };
  children: React.ReactNode;
  className?: string;
  /** Optional anchor for smooth-scroll targets */
  id?: string;
};

export default function Section({
  title,
  cta,
  children,
  className = "",
  id,
}: Props) {
  return (
    <section
      id={id}
      className={`mt-12 scroll-mt-28 md:scroll-mt-40 ${className}`}
    >
      <div className="page-container">
        <div className="mb-5 flex items-baseline justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {cta && (
            <a
              href={cta.href}
              className="text-sm opacity-80 hover:opacity-100 whitespace-nowrap"
            >
              {cta.label}
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
