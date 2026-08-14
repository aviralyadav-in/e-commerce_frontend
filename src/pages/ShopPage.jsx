import { useEffect, useState } from "react";
import { FiHeart, FiSliders, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/api";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
          <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[var(--color-accent)]">
            THE COLLECTION
          </p>

          <h1 className="font-serif text-4xl text-[var(--color-text-primary)] md:text-5xl">
            Shop All
          </h1>

          <p className="mt-4 max-w-[560px] text-xs leading-6 text-[var(--color-text-muted)]">
            Discover the complete Niya Bags collection, thoughtfully designed
            for every moment.
          </p>
        </div>
      </section>

      {/* ================= SHOP CONTENT ================= */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-14">
        {/* ================= MOBILE TOOLBAR ================= */}
        <div className="mb-7 flex items-center justify-between md:hidden">
          <p className="text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]">
            {loading ? "LOADING..." : `${products.length} PRODUCTS`}
          </p>

          {/* SMALL FILTER ICON */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            aria-label="Open filters"
            className="flex h-8 w-8 items-center justify-center border border-[var(--color-border)] text-[var(--color-text-primary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <FiSliders size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* ================= MOBILE FILTER PANEL ================= */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* BACKDROP */}
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/35"
            />

            {/* PANEL */}
            <aside className="absolute right-0 top-0 h-full w-[82%] max-w-[340px] overflow-y-auto bg-[var(--color-bg-primary)] px-5 py-6 shadow-xl">
              {/* PANEL HEADER */}
              <div className="mb-7 flex items-center justify-between border-b border-[var(--color-border)] pb-5">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-primary)]">
                  FILTERS
                </p>

                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-8 w-8 items-center justify-center text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
                >
                  <FiX size={17} strokeWidth={1.4} />
                </button>
              </div>

              {/* WOMEN */}
              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  WOMEN
                </p>

                <div className="mt-4 space-y-3 text-xs text-[var(--color-text-muted)]">
                  {[
                    "Tote Bags",
                    "Shoulder Bags",
                    "Crossbody Bags",
                    "Clutches",
                    "Mini Bags",
                    "Backpacks",
                  ].map((category) => (
                    <label key={category} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled
                        className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* MEN */}
              <div className="mt-8 border-t border-[var(--color-border)] pt-5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  MEN
                </p>

                <div className="mt-4 space-y-3 text-xs text-[var(--color-text-muted)]">
                  {[
                    "Handbags",
                    "Office Bags",
                    "Briefcases",
                    "Crossbody Bags",
                    "Travel Bags",
                    "Backpacks",
                  ].map((category) => (
                    <label key={category} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled
                        className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* COLLECTION */}
              <div className="mt-8 border-t border-[var(--color-border)] pt-5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  COLLECTION
                </p>

                <div className="mt-4 space-y-3 text-xs text-[var(--color-text-muted)]">
                  {["Featured", "Best Sellers", "New Arrivals"].map(
                    (collection) => (
                      <label
                        key={collection}
                        className="flex items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          disabled
                          className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                        />
                        {collection}
                      </label>
                    ),
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
          {/* ================= DESKTOP SIDEBAR ================= */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[var(--color-text-primary)]">
                FILTERS
              </p>

              {/* WOMEN */}
              <div className="border-t border-[var(--color-border)] pt-5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  WOMEN
                </p>

                <div className="mt-4 space-y-3 text-xs text-[var(--color-text-muted)]">
                  {[
                    "Tote Bags",
                    "Shoulder Bags",
                    "Crossbody Bags",
                    "Clutches",
                    "Mini Bags",
                    "Backpacks",
                  ].map((category) => (
                    <label key={category} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled
                        className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* MEN */}
              <div className="mt-8 border-t border-[var(--color-border)] pt-5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  MEN
                </p>

                <div className="mt-4 space-y-3 text-xs text-[var(--color-text-muted)]">
                  {[
                    "Handbags",
                    "Office Bags",
                    "Briefcases",
                    "Crossbody Bags",
                    "Travel Bags",
                    "Backpacks",
                  ].map((category) => (
                    <label key={category} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled
                        className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* COLLECTION */}
              <div className="mt-8 border-t border-[var(--color-border)] pt-5">
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  COLLECTION
                </p>

                <div className="mt-4 space-y-3 text-xs text-[var(--color-text-muted)]">
                  {["Featured", "Best Sellers", "New Arrivals"].map(
                    (collection) => (
                      <label
                        key={collection}
                        className="flex items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          disabled
                          className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                        />
                        {collection}
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div>
            {/* DESKTOP PRODUCT COUNT */}
            <div className="mb-6 hidden items-center justify-between md:flex">
              <p className="text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]">
                {loading ? "LOADING..." : `${products.length} PRODUCTS`}
              </p>
            </div>

            {/* ================= LOADING ================= */}
            {loading && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item}>
                    <div className="aspect-[4/5] animate-pulse bg-[var(--color-bg-tertiary)]" />

                    <div className="mt-4 h-3 w-2/3 animate-pulse bg-[var(--color-bg-tertiary)]" />

                    <div className="mt-2 h-3 w-1/3 animate-pulse bg-[var(--color-bg-tertiary)]" />
                  </div>
                ))}
              </div>
            )}

            {/* ================= ERROR ================= */}
            {error && (
              <div className="py-16 text-center">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* ================= PRODUCTS ================= */}
            {!loading && !error && (
              <>
                {products.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-sm text-[var(--color-text-muted)]">
                      No products available.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group"
                      >
                        {/* IMAGE */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]">
                          <img
                            src={product.thumbnail || product.images?.[0]}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          />

                          {/* WISHLIST */}
                          <button
                            type="button"
                            aria-label={`Add ${product.title} to wishlist`}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                            }}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-secondary)]/90 text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
                          >
                            <FiHeart size={15} strokeWidth={1.4} />
                          </button>
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="pt-4">
                          <p className="mb-1 text-[8px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
                            {product.category?.name || "Bags"}
                          </p>

                          <h2 className="line-clamp-1 text-xs font-medium text-[var(--color-text-primary)]">
                            {product.title}
                          </h2>

                          <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                            ₹
                            {Math.round(product.price * 83).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShopPage;
