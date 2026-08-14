import { Link } from "react-router-dom";

function BrandCraftsmanship() {
  return (
    <section
      id="craftsmanship"
      className="bg-[var(--color-bg-tertiary)] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="order-2 md:order-1">
          <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[var(--color-accent)]">
            OUR PROMISE
          </p>

          <h2 className="font-serif text-[40px] leading-[1.02] text-[var(--color-text-primary)] md:text-[60px]">
            The Art of
            <br />
            Craftsmanship
          </h2>

          <div className="mt-7 space-y-4 text-[14px] leading-6 text-[var(--color-text-muted)]">
            <p>
              Every Niya bag begins as a sketch and ends in the hands of a
              master artisan.
            </p>

            <p>
              We believe luxury is not just about materials. It is about the
              human touch, patience, precision, and stories woven into every
              stitch.
            </p>
          </div>

          <div className="mt-8 grid max-w-[450px] grid-cols-3 gap-5 border-t border-[var(--color-border)] pt-6">
            <div>
              <strong className="font-serif text-2xl text-[var(--color-text-primary)]">
                25+
              </strong>
              <p className="mt-1 text-[8px] text-[var(--color-text-muted)]">
                Pieces of craft
              </p>
            </div>

            <div>
              <strong className="font-serif text-2xl text-[var(--color-text-primary)]">
                40+
              </strong>
              <p className="mt-1 text-[8px] text-[var(--color-text-muted)]">
                Handcrafted steps
              </p>
            </div>

            <div>
              <strong className="font-serif text-2xl text-[var(--color-text-primary)]">
                100%
              </strong>
              <p className="mt-1 text-[8px] text-[var(--color-text-muted)]">
                Intentional design
              </p>
            </div>
          </div>

          <Link
            to="/craftsmanship"
            className="mt-8 inline-flex border-b border-[var(--color-accent)] pb-2 text-[11px] font-semibold text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
          >
            Discover Our Story →
          </Link>
        </div>

        <div className="order-1 overflow-hidden md:order-2">
          <img
            src="https://images.unsplash.com/photo-1612902456551-333ac5afa26e?auto=format&fit=crop&w=1400&q=85"
            alt="Niya craftsmanship"
            className="h-[430px] w-full object-cover md:h-[600px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default BrandCraftsmanship;