import { useEffect, useState } from "react";
import { FiHeart, FiSliders, FiX, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/api";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    women: true,
    men: false,
    collection: false,
  });

  const [mobileOpenSections, setMobileOpenSections] = useState({
    women: true,
    men: false,
    collection: false,
  });

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

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleMobileSection = (section) => {
    setMobileOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const womenCategories = [
    "Tote Bags",
    "Shoulder Bags",
    "Clutches",
    "Mini Bags",
  ];

  const menCategories = ["Wallets", "Office Bags"];

  const collections = ["Featured", "Best Sellers", "New Arrivals"];

  const FilterSection = ({ title, section, items, mobile = false }) => {
    const isOpen = mobile ? mobileOpenSections[section] : openSections[section];

    const handleToggle = mobile
      ? () => toggleMobileSection(section)
      : () => toggleSection(section);

    return (
      <div className="border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={handleToggle}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--color-text-primary)]">
            {title}
          </span>

          <FiChevronDown
            size={14}
            strokeWidth={1.4}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pb-5 space-y-3">
              {items.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3 text-[11px] text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
                >
                  <input
                    type="checkbox"
                    disabled
                    className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-4 md:px-10 md:py-8">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="mb-1.5 text-[8px] font-semibold tracking-[0.24em] text-[var(--color-accent)]">
                THE COLLECTION
              </p>

              <h1 className="font-serif text-3xl leading-none text-[var(--color-text-primary)] md:text-4xl">
                Shop All
              </h1>
            </div>

            <p className="max-w-[420px] text-[10px] leading-5 text-[var(--color-text-muted)] md:text-right">
              Discover the complete Niya Bags collection, thoughtfully designed
              for every moment.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SHOP CONTENT ================= */}
      <section className="mx-auto max-w-[1440px] px-5 py-5 md:px-10 md:py-8">
        {/* ================= MOBILE TOOLBAR ================= */}
        <div className="mb-5 flex items-center justify-between md:hidden">
          <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
            {loading ? "LOADING..." : `${products.length} PRODUCTS`}
          </p>

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
            <aside className="absolute right-0 top-0 flex h-full w-[82%] max-w-[340px] flex-col bg-[var(--color-bg-primary)] shadow-xl">
              {/* PANEL HEADER */}
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-5">
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

              {/* SCROLLABLE FILTERS */}
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <FilterSection
                  title="WOMEN"
                  section="women"
                  items={womenCategories}
                  mobile
                />

                <FilterSection
                  title="MEN"
                  section="men"
                  items={menCategories}
                  mobile
                />

                <FilterSection
                  title="COLLECTION"
                  section="collection"
                  items={collections}
                  mobile
                />
              </div>
            </aside>
          </div>
        )}

        {/* ================= MAIN SHOP LAYOUT ================= */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr]">
          {/* ================= DESKTOP SIDEBAR ================= */}
          <aside className="hidden md:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3">
              <div className="mb-2">
                <p className="text-[9px] font-semibold tracking-[0.2em] text-[var(--color-text-primary)]">
                  FILTERS
                </p>
              </div>

              <FilterSection
                title="WOMEN"
                section="women"
                items={womenCategories}
              />

              <FilterSection title="MEN" section="men" items={menCategories} />

              <FilterSection
                title="COLLECTION"
                section="collection"
                items={collections}
              />
            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div className="min-w-0">
            {/* PRODUCT COUNT */}
            <div className="mb-4 hidden items-center justify-between md:flex">
              <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
                {loading ? "LOADING..." : `${products.length} PRODUCTS`}
              </p>
            </div>

            {/* ================= LOADING ================= */}
            {loading && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
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
                  <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
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
                        <div className="pt-3.5">
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
