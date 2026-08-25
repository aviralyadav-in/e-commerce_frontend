import { useEffect, useState } from "react";
import PromoBanner from "../components/home/PromoBanner";
import {
  FiFilter,
  FiSliders,
  FiX,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

import { useSearchParams } from "react-router-dom";

import {
  getAllProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
} from "../api/api";

import ProductCard from "../components/product/ProductCard";

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ===============================
  // LOCAL STATES
  // ===============================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // PRICE SORT
  const [priceSort, setPriceSort] = useState("");

  // CUSTOMER RATING FILTER
  const [ratingFilter, setRatingFilter] = useState("");

  // CUSTOMER REVIEW SORT
  const [reviewSort, setReviewSort] = useState("");

  // FUNNEL DROPDOWN
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

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

  // ===============================
  // URL FILTER
  // ===============================

  useEffect(() => {
    const filterFromUrl =
      searchParams.get("subcategory") || searchParams.get("filter");

    if (filterFromUrl) {
      setSelectedFilter(filterFromUrl);
    } else {
      setSelectedFilter(null);
    }
  }, [searchParams]);

  // ===============================
  // LOAD PRODUCTS
  // ===============================

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        let data;

        // ===============================
        // SHOP ALL
        // ===============================

        if (!selectedFilter) {
          data = await getAllProducts();
        }

        // ===============================
        // FEATURED
        // ===============================
        else if (selectedFilter === "featured") {
          data = await getFeaturedProducts();
        }

        // ===============================
        // BEST SELLERS
        // ===============================
        else if (selectedFilter === "best-sellers") {
          data = await getBestSellerProducts();
        }

        // ===============================
        // NEW ARRIVALS
        // ===============================
        else if (selectedFilter === "new-arrivals") {
          data = await getNewArrivalProducts();
        }

        // ===============================
        // CATEGORY
        // ===============================
        else {
          data = await getProductsByCategory(selectedFilter);
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [selectedFilter]);

  // ===============================
  // DISPLAYED PRODUCTS
  // ===============================

  const filteredProducts = products.filter((product) => {
    if (!ratingFilter) {
      return true;
    }

    return Number(product.rating) >= Number(ratingFilter);
  });

  // ===============================
  // SORT PRODUCTS
  // ===============================

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // PRICE LOW TO HIGH
    if (priceSort === "low-to-high") {
      return Number(a.price) - Number(b.price);
    }

    // PRICE HIGH TO LOW
    if (priceSort === "high-to-low") {
      return Number(b.price) - Number(a.price);
    }

    // AVERAGE CUSTOMER RATING HIGH TO LOW
    if (reviewSort === "high-to-low") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  // ===============================
  // TOGGLE DESKTOP FILTER SECTION
  // ===============================

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ===============================
  // TOGGLE MOBILE FILTER SECTION
  // ===============================

  const toggleMobileSection = (section) => {
    setMobileOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ===============================
  // HANDLE CATEGORY FILTER CHANGE
  // ===============================

  const handleFilterChange = (filterValue) => {
    const newFilter = selectedFilter === filterValue ? null : filterValue;

    setSelectedFilter(newFilter);

    if (newFilter) {
      setSearchParams({
        subcategory: newFilter,
      });
    } else {
      setSearchParams({});
    }
  };

  // ===============================
  // PRICE OPTIONS
  // ===============================

  const priceOptions = [
    {
      label: "Price: Low to High",
      value: "low-to-high",
    },
    {
      label: "Price: High to Low",
      value: "high-to-low",
    },
  ];

  // ===============================
  // CUSTOMER RATING SORT
  // ===============================

  const reviewSortOptions = [
    {
      label: "Average Customer Rating: High to Low",
      value: "high-to-low",
    },
  ];

  // ===============================
  // CUSTOMER REVIEW FILTER
  // ===============================

  const ratingOptions = [
    {
      label: "4★ & Above",
      value: "4",
    },
    {
      label: "3★ & Above",
      value: "3",
    },
    {
      label: "2★ & Above",
      value: "2",
    },
    {
      label: "1★ & Above",
      value: "1",
    },
  ];

  // ===============================
  // FILTER DATA
  // ===============================

  const womenCategories = [
    {
      label: "Handbags",
      value: "handbags",
    },
    {
      label: "Mini Bags",
      value: "minibags",
    },
    {
      label: "Sling Bags",
      value: "sling",
    },
    {
      label: "Tote Bags",
      value: "tote",
    },
  ];

  const menCategories = [
    {
      label: "Wallets",
      value: "wallet",
    },
  ];

  const collections = [
    {
      label: "Featured",
      value: "featured",
    },
    {
      label: "Best Sellers",
      value: "best-sellers",
    },
    {
      label: "New Arrivals",
      value: "new-arrivals",
    },
  ];

  // ===============================
  // FILTER SECTION COMPONENT
  // ===============================

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
            <div className="space-y-3 pb-5">
              {items.map((item) => (
                <label
                  key={item.value}
                  className="flex cursor-pointer items-center gap-3 text-[11px] text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilter === item.value}
                    onChange={() => handleFilterChange(item.value)}
                    className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                  />

                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===============================
  // BADGE
  // ===============================

  const getBadgeText = () => {
    if (selectedFilter === "featured") {
      return "FEATURED";
    }

    if (selectedFilter === "best-sellers") {
      return "BEST SELLER";
    }

    if (selectedFilter === "new-arrivals") {
      return "NEW";
    }

    return undefined;
  };

  // ===============================
  // CLEAR SORT / REVIEW FILTERS
  // ===============================

  const clearSortFilters = () => {
    setPriceSort("");
    setRatingFilter("");
    setReviewSort("");
  };

  // ===============================
  // RENDER
  // ===============================

  return (
<main className="min-h-dvh w-full text-[13px] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">      {/* ================= PAGE HEADER ================= */}

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
      <PromoBanner page="shop" position="after-hero" />
      {/* ================= SHOP CONTENT ================= */}

      <section className="mx-auto max-w-[1440px] px-5 py-5 md:px-10 md:py-8">
        {/* ================= MOBILE TOOLBAR ================= */}

        <div className="mb-5 flex items-center justify-between md:hidden">
          <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
            {loading ? "LOADING..." : `${sortedProducts.length} PRODUCTS`}
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
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/35"
            />

            <aside className="absolute right-0 top-0 flex h-full w-[82%] max-w-[340px] flex-col bg-[var(--color-bg-primary)] shadow-xl">
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

                <PriceRange />
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
            {/* ================= PRODUCT TOOLBAR ================= */}

            <div className="mb-4 hidden items-center justify-between md:flex">
              <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
                {loading ? "LOADING..." : `${sortedProducts.length} PRODUCTS`}
              </p>

              {/* ================= FUNNEL DROPDOWN ================= */}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-2 text-[9px] font-medium tracking-[0.16em] transition ${
                    priceSort || ratingFilter || reviewSort
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-primary)]"
                  }`}
                >
                  <FiFilter size={14} strokeWidth={1.5} />

                  <span>FILTER</span>

                  <FiChevronDown
                    size={12}
                    strokeWidth={1.4}
                    className={`transition-transform ${
                      filterDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ================= DROPDOWN ================= */}

                {filterDropdownOpen && (
                  <div className="absolute right-0 top-8 z-50 w-[280px] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-5 shadow-lg">
                    {/* ================= SORT BY ================= */}

                    <div>
                      <p className="mb-4 text-[9px] font-semibold tracking-[0.18em] text-[var(--color-text-primary)]">
                        SORT BY
                      </p>

                      <div className="space-y-3">
                        {/* PRICE OPTIONS */}

                        {priceOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setPriceSort(
                                priceSort === option.value ? "" : option.value,
                              );

                              setReviewSort("");
                            }}
                            className={`flex w-full items-center justify-between gap-3 text-left text-[11px] transition ${
                              priceSort === option.value
                                ? "text-[var(--color-accent)]"
                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                            }`}
                          >
                            <span className="whitespace-nowrap">
                              {option.label}
                            </span>

                            {priceSort === option.value && (
                              <FiCheck
                                size={13}
                                strokeWidth={1.5}
                                className="shrink-0"
                              />
                            )}
                          </button>
                        ))}

                        {/* AVERAGE CUSTOMER RATING */}

                        {reviewSortOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setReviewSort(
                                reviewSort === option.value ? "" : option.value,
                              );

                              setPriceSort("");
                            }}
                            className={`flex w-full items-center justify-between gap-3 text-left text-[11px] transition ${
                              reviewSort === option.value
                                ? "text-[var(--color-accent)]"
                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                            }`}
                          >
                            <span className="whitespace-nowrap">
                              {option.label}
                            </span>

                            {reviewSort === option.value && (
                              <FiCheck
                                size={13}
                                strokeWidth={1.5}
                                className="shrink-0"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ================= DIVIDER ================= */}

                    <div className="my-5 border-t border-[var(--color-border)]" />

                    {/* ================= CUSTOMER REVIEWS ================= */}

                    <div>
                      <p className="mb-4 text-[9px] font-semibold tracking-[0.18em] text-[var(--color-text-primary)]">
                        CUSTOMER REVIEWS
                      </p>

                      <div className="space-y-3">
                        {ratingOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setRatingFilter(
                                ratingFilter === option.value
                                  ? ""
                                  : option.value,
                              )
                            }
                            className={`flex w-full items-center justify-between text-left text-[11px] transition ${
                              ratingFilter === option.value
                                ? "text-[var(--color-accent)]"
                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                            }`}
                          >
                            <span>{option.label}</span>

                            {ratingFilter === option.value && (
                              <FiCheck size={13} strokeWidth={1.5} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ================= CLEAR ================= */}

                    {(priceSort || ratingFilter || reviewSort) && (
                      <>
                        <div className="my-5 border-t border-[var(--color-border)]" />

                        <button
                          type="button"
                          onClick={clearSortFilters}
                          className="w-full text-left text-[9px] font-semibold tracking-[0.16em] text-[var(--color-accent)] transition hover:opacity-70"
                        >
                          CLEAR FILTERS
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
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
                {sortedProducts.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-sm text-[var(--color-text-muted)]">
                      No products found.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
                        badgeText={getBadgeText()}
                      />
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
