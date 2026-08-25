import { Link } from "react-router-dom";
import { getCraftsmanship } from "../../api/homeApi";

function BrandCraftsmanship() {
  const data = getCraftsmanship();

  return (
    <section
      id="craftsmanship"
      className="bg-[var(--color-bg-tertiary)] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[var(--color-accent)]">
            {data.eyebrow}
          </p>

          <h2 className="whitespace-pre-line font-serif text-[40px] leading-[1.02] text-[var(--color-text-primary)] md:text-[60px]">
            {data.title}
          </h2>

          <div className="mt-7 space-y-4 text-[14px] leading-6 text-[var(--color-text-muted)]">
            {data.description?.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          {/* STATS */}
          {data.stats?.length > 0 && (
            <div className="mt-8 grid max-w-[450px] grid-cols-3 gap-5 border-t border-[var(--color-border)] pt-6">
              {data.stats.map((stat) => (
                <div key={stat.label}>
                  <strong className="font-serif text-2xl text-[var(--color-text-primary)]">
                    {stat.value}
                  </strong>

                  <p className="mt-1 text-[8px] text-[var(--color-text-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* BUTTON */}
          {data.buttonText && data.buttonLink && (
            <Link
              to={data.buttonLink}
              className="mt-8 inline-flex border-b border-[var(--color-accent)] pb-2 text-[11px] font-semibold text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
            >
              {data.buttonText} →
            </Link>
          )}
        </div>

        {/* IMAGE */}
        <div className="order-1 overflow-hidden md:order-2">
          <img
            src={data.image}
            alt={data.imageAlt || data.title}
            className="h-[430px] w-full object-cover md:h-[600px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default BrandCraftsmanship;