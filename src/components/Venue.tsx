"use client";

type Props = {
  title?: string;
  address?: string;
  // If you ever need to swap the map location, pass a different embed URL
  mapSrc?: string;
  className?: string;
};

export default function Venue({
  title = "Travis County Exposition Center",
  address = "7311 Decker Ln, Austin, TX 78724",
  mapSrc = "https://www.google.com/maps?q=Travis%20County%20Exposition%20Center%207311%20Decker%20Ln,%20Austin,%20TX%2078724&output=embed",
  className = "",
}: Props) {
  return (
    <section
      id="venue"
      className={`relative w-full overflow-hidden py-16 sm:py-24 ${className}`}
      aria-labelledby="venue-heading"
    >
      {/* Decorative dotted gradient background on the right side */}
      {/* Mesh gradient */}
{/* Dots on transparent */}
<div aria-hidden="true" className="absolute inset-0 -z-10">
  <div
    className="
      h-full w-full
      [background-image:radial-gradient(#D52EF566_1.2px,transparent_1.6px)]
      [background-size:14px_14px]
    "
  />
</div>

      <div className="page-container">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Left: copy */}
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wider text-[#D52EF5]">
              THE VENUE
            </p>

            <h2
              id="venue-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              {title}
            </h2>

            <p className="mt-4 text-base text-white/80">{address}</p>
          </div>

          {/* Right: embedded map */}
          <div className="relative">
            <div className="relative h-80 w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] md:h-[440px]">
              <iframe
                title={`${title} map`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
