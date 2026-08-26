import { useEffect, useState, useMemo } from "react";
import PromoBanner from "../components/home/PromoBanner";
import {
  FiFilter,
  FiSliders,
  FiX,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";

import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../api/api";
import ProductCard from "../components/product/ProductCard";

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // LOCAL STATES
  const [allBaseProducts, setAllBaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  // MULTIPLE SUBCATEGORIES SELECTION
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // SORT STATES
  const [sortBy, setSortBy] = useState("low-to-high");

  // DYNAMIC FILTER STATES
  const [selectedColors, setSelectedColors] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // DROPDOWNS & ACCORDIONS
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    women: true,
    men: true,
  });

  const [mobileOpenSections, setMobileOpenSections] = useState({
    category: true,
    women: false,
    men: false,
    availability: false,
    color: false,
    price: false,
  });

  // URL PARAMS SYNC
  useEffect(() => {
    const subcats = searchParams.getAll("subcategory");
    if (subcats.length > 0) {
      setSelectedSubcategories(subcats);
    }
  }, [searchParams]);

  // LOAD BASE PRODUCTS ONCE
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();
        const productList = Array.isArray(data) ? data : [];
        setAllBaseProducts(productList);

        if (productList.length > 0) {
          const maxP = Math.max(...productList.map((p) => Number(p.price || 0)));
          setPriceRange((prev) => ({ ...prev, max: maxP }));
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again.");
        setAllBaseProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // DYNAMIC FILTER EXTRACTORS
  const dynamicWomenSubcategories = useMemo(() => {
    const subs = new Set();
    allBaseProducts.forEach((p) => {
      if (p.gender?.toLowerCase() === "women" && p.subcategory) {
        subs.add(p.subcategory);
      }
    });
    return Array.from(subs).map((sub) => ({
      label: sub.charAt(0).toUpperCase() + sub.slice(1),
      value: sub.toLowerCase(),
    }));
  }, [allBaseProducts]);

  const dynamicMenSubcategories = useMemo(() => {
    const subs = new Set();
    allBaseProducts.forEach((p) => {
      if (p.gender?.toLowerCase() === "men" && p.subcategory) {
        subs.add(p.subcategory);
      }
    });
    return Array.from(subs).map((sub) => ({
      label: sub.charAt(0).toUpperCase() + sub.slice(1),
      value: sub.toLowerCase(),
    }));
  }, [allBaseProducts]);

  const dynamicColors = useMemo(() => {
    const colorSet = new Set();
    allBaseProducts.forEach((p) => {
      if (Array.isArray(p.variants)) {
        p.variants.forEach((v) => {
          if (v.name) colorSet.add(v.name.trim());
        });
      }
    });
    return Array.from(colorSet);
  }, [allBaseProducts]);

  // MULTI-FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    return allBaseProducts.filter((p) => {
      if (selectedSubcategories.length > 0) {
        if (
          !p.subcategory ||
          !selectedSubcategories.includes(p.subcategory.toLowerCase())
        ) {
          return false;
        }
      }

      if (selectedColors.length > 0) {
        const productVariantNames =
          p.variants?.map((v) => v.name?.toLowerCase()) || [];
        const hasMatchingColor = selectedColors.some((c) =>
          productVariantNames.includes(c.toLowerCase())
        );
        if (!hasMatchingColor) return false;
      }

      if (availabilityFilter.includes("sale") && !p.isOnSale) return false;
      if (availabilityFilter.includes("featured") && !p.isFeatured) return false;
      if (availabilityFilter.includes("best-sellers") && !p.isBestSeller) return false;
      if (availabilityFilter.includes("new-arrivals")) {
        const productDate = new Date(p.createdAt || 0);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        if (productDate < thirtyDaysAgo) return false;
      }

      const productPrice = Number(p.price || 0);
      if (productPrice < priceRange.min || productPrice > priceRange.max) {
        return false;
      }

      return true;
    });
  }, [allBaseProducts, selectedSubcategories, selectedColors, availabilityFilter, priceRange]);

  // MULTI-SORTING LOGIC
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "low-to-high") {
        return Number(a.price || 0) - Number(b.price || 0);
      }
      if (sortBy === "high-to-low") {
        return Number(b.price || 0) - Number(a.price || 0);
      }
      if (sortBy === "rating") {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleMobileSection = (section) => {
    setMobileOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubcategoryToggle = (value) => {
    setSelectedSubcategories((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      if (updated.length > 0) {
        setSearchParams({ subcategory: updated });
      } else {
        setSearchParams({});
      }
      return updated;
    });
  };

  const handleColorToggle = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const handleAvailabilityToggle = (value) => {
    setAvailabilityFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSortBy("low-to-high");
    setSelectedSubcategories([]);
    setSelectedColors([]);
    setAvailabilityFilter([]);
    setSearchParams({});
  };

  const sortOptions = [
    { label: "Price: Low to High", value: "low-to-high" },
    { label: "Price: High to Low", value: "high-to-low" },
    { label: "Customer Rating", value: "rating" },
  ];

  // BADGE HELPER FOR PRODUCT CARD
  const getProductBadge = (product) => {
    if (product.isBestSeller) return "BESTSELLER";
    if (product.isFeatured) return "FEATURED";
    if (product.isOnSale) return "SALE";
    return null;
  };

  return (
    <main className="min-h-dvh w-full bg-bg-primary text-[13px] text-text-primary">
      {/* HEADER SECTION */}
      <section className="border-b border-border-theme">
        <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-8 md:py-6">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <p className="mb-1 text-[9px] font-semibold tracking-[0.2em] text-accent">
                THE COLLECTION
              </p>
              <h1 className="font-serif text-2xl leading-none text-text-primary md:text-3xl">
                Shop All
              </h1>
            </div>
            <p className="max-w-[420px] text-[11px] leading-relaxed text-text-muted md:text-right">
              Discover the complete Niya Bags collection, thoughtfully designed for every moment.
            </p>
          </div>
        </div>
      </section>

      <PromoBanner page="shop" position="after-hero" />

      {/* MAIN CONTAINER */}
      <section className="mx-auto max-w-[1440px] px-4 py-4 md:px-8 md:py-6">
        {/* MOBILE TOOLBAR */}
        <div className="mb-4 flex items-center justify-between border-b border-border-theme pb-2.5 md:hidden">
          <p className="text-[10px] tracking-wider text-text-muted">
            {loading ? "LOADING..." : `${sortedProducts.length} PRODUCTS`}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileSortOpen(true)}
              className="flex items-center gap-1 border border-border-theme px-2.5 py-1 text-[10px] font-medium tracking-wider"
            >
              <span>SORT</span>
              <FiChevronDown size={11} />
            </button>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-1 border border-border-theme px-2.5 py-1 text-[10px] font-medium tracking-wider"
            >
              <FiSliders size={11} />
              <span>FILTER</span>
            </button>
          </div>
        </div>

        {/* MOBILE SORT BOTTOM SHEET */}
        {mobileSortOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <button
              type="button"
              onClick={() => setMobileSortOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-bg-secondary p-4 shadow-2xl">
              <div className="mb-3 flex items-center justify-between border-b border-border-theme pb-2">
                <p className="text-[10px] font-semibold tracking-[0.16em]">SORT BY</p>
                <button type="button" onClick={() => setMobileSortOpen(false)}>
                  <FiX size={16} />
                </button>
              </div>
              <div className="space-y-2 py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setMobileSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between py-1.5 text-xs ${
                      sortBy === option.value
                        ? "font-semibold text-accent"
                        : "text-text-muted"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.value && <FiCheck size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block">
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
              <div className="mb-3 flex items-center justify-between border-b border-border-theme pb-2">
                <p className="text-[10px] font-semibold tracking-[0.16em]">FILTERS</p>
                {(selectedSubcategories.length > 0 ||
                  selectedColors.length > 0 ||
                  availabilityFilter.length > 0) && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-[9px] font-semibold text-accent"
                  >
                    RESET
                  </button>
                )}
              </div>

              {/* WOMEN CATEGORIES */}
              {dynamicWomenSubcategories.length > 0 && (
                <div className="border-b border-border-soft pb-3 pt-1">
                  <button
                    type="button"
                    onClick={() => toggleSection("women")}
                    className="flex w-full items-center justify-between py-1.5 text-left"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.14em]">WOMEN</span>
                    <FiChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${
                        openSections.women ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSections.women && (
                    <div className="mt-1 space-y-1.5 pl-1">
                      {dynamicWomenSubcategories.map((item) => (
                        <label
                          key={item.value}
                          className="flex cursor-pointer items-center gap-2 text-[11px] text-text-muted hover:text-text-primary"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(item.value)}
                            onChange={() => handleSubcategoryToggle(item.value)}
                            className="h-3 w-3 accent-accent"
                          />
                          <span
                            className={
                              selectedSubcategories.includes(item.value)
                                ? "font-semibold text-accent"
                                : ""
                            }
                          >
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MEN CATEGORIES */}
              {dynamicMenSubcategories.length > 0 && (
                <div className="border-b border-border-soft pb-3 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleSection("men")}
                    className="flex w-full items-center justify-between py-1.5 text-left"
                  >
                    <span className="text-[10px] font-semibold tracking-[0.14em]">MEN</span>
                    <FiChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${
                        openSections.men ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSections.men && (
                    <div className="mt-1 space-y-1.5 pl-1">
                      {dynamicMenSubcategories.map((item) => (
                        <label
                          key={item.value}
                          className="flex cursor-pointer items-center gap-2 text-[11px] text-text-muted hover:text-text-primary"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(item.value)}
                            onChange={() => handleSubcategoryToggle(item.value)}
                            className="h-3 w-3 accent-accent"
                          />
                          <span
                            className={
                              selectedSubcategories.includes(item.value)
                                ? "font-semibold text-accent"
                                : ""
                            }
                          >
                            {item.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* PRODUCTS CONTAINER */}
          <div className="min-w-0">
            {/* DESKTOP TOOLBAR */}
            <div className="mb-4 hidden items-center justify-between border-b border-border-theme pb-2.5 md:flex">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider"
                >
                  <FiFilter size={13} />
                  <span>SORT BY</span>
                  <FiChevronDown
                    size={11}
                    className={`transition-transform ${
                      filterDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {filterDropdownOpen && (
                  <div className="absolute left-0 top-7 z-50 w-[200px] border border-border-theme bg-bg-secondary p-3 shadow-md">
                    <div className="space-y-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setSortBy(option.value);
                            setFilterDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between text-left text-[11px] ${
                            sortBy === option.value
                              ? "font-semibold text-accent"
                              : "text-text-muted hover:text-text-primary"
                          }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && <FiCheck size={12} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[10px] tracking-wider text-text-muted">
                {loading ? "LOADING..." : `${sortedProducts.length} PRODUCTS`}
              </p>
            </div>

            {/* SKELETON LOADING */}
            {loading && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="aspect-[4/5] animate-pulse rounded-xs bg-bg-tertiary"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="py-12 text-center text-xs text-red-500">{error}</div>
            )}

            {/* PRODUCTS GRID */}
            {!loading && !error && (
              <>
                {sortedProducts.length === 0 ? (
                  <div className="py-16 text-center text-xs text-text-muted">
                    No products matching your selected filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
                        badgeText={getProductBadge(product)}
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