import { useEffect, useState } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getSaleProducts } from "../api/api";

function SalePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaleProducts = async () => {
      try {
        const data = await getSaleProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load sale products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSaleProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* =================================
          SALE HERO
      ================================= */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-12 lg:py-28">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
            The Niya Edit
          </p>

          <h1 className="font-serif text-4xl leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            Sale
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
            Discover selected Niya pieces at exclusive prices.
            Timeless silhouettes, thoughtfully crafted and now made
            available for less.
          </p>
        </div>
      </section>

      {/* =================================
          SALE PRODUCTS
      ================================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-10 flex items-end justify-between border-b border-[var(--color-border)] pb-5">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
              Limited selection
            </p>

            <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
              Pieces on Sale
            </h2>
          </div>

          {!loading && (
            <span className="text-xs text-[var(--color-text-muted)]">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] bg-[var(--color-bg-tertiary)]" />

                <div className="mt-4 h-3 w-2/3 bg-[var(--color-bg-tertiary)]" />

                <div className="mt-3 h-3 w-1/3 bg-[var(--color-bg-tertiary)]" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-[var(--color-text-primary)]">
              No sale pieces available
            </p>

            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Check back soon for our next edit.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
              <article key={product.id} className="group">
                {/* Image */}
                <Link
                  to={`/product/${product.id}`}
                  className="relative block overflow-hidden bg-[var(--color-bg-tertiary)]"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Sale Badge */}
                  <span className="absolute left-3 top-3 bg-[var(--color-accent)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-[var(--color-bg-secondary)]">
                    Sale
                  </span>

                  {/* Discount */}
                  <span className="absolute right-3 top-3 border border-[var(--color-accent)] bg-[var(--color-bg-primary)] px-2.5 py-1 text-[9px] font-medium tracking-[0.1em] text-[var(--color-accent)]">
                    -{product.discount}%
                  </span>

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label={`Add ${product.title} to wishlist`}
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                    className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-bg-secondary)]/90 text-[var(--color-text-primary)] opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:opacity-100 hover:text-[var(--color-accent)]"
                  >
                    <FiHeart size={15} strokeWidth={1.5} />
                  </button>
                </Link>

                {/* Product Info */}
                <div className="pt-4">
                  <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {product.category}
                  </p>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xs font-medium tracking-wide text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] sm:text-sm">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--color-accent)]">
                      ₹{product.salePrice.toLocaleString("en-IN")}
                    </span>

                    <span className="text-xs text-[var(--color-text-muted)] line-through">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                    {product.discount}% off
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =================================
          BOTTOM CTA
      ================================= */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-dark-section)]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-8 lg:py-20">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent-bright)]">
            Discover Niya
          </p>

          <h2 className="font-serif text-3xl text-white sm:text-4xl">
            Find your everyday signature.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/70">
            Explore the complete Niya collection and discover silhouettes
            designed to stay with you beyond the season.
          </p>

          <Link
            to="/shop"
            className="group mt-8 inline-flex items-center gap-3 border border-[var(--color-accent)] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-bright)] transition hover:bg-[var(--color-accent)] hover:text-[var(--color-dark-section)]"
          >
            Shop Collection
            <FiArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default SalePage;