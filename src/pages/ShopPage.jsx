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

  // ===============================
  // LOCAL STATES
  // ===============================
  const [allBaseProducts, setAllBaseProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  // MULTIPLE SUBCATEGORIES SELECTION
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // SORT STATES
  const [sortBy, setSortBy] = useState("");

  // DYNAMIC FILTER STATES
  const [selectedColors, setSelectedColors] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  // FUNNEL DROPDOWN
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // ACCORDIONS
  const [openSections, setOpenSections] = useState({
    category: true,
    women: true,
    men: false,
    availability: false,
    color: false,
    price: false,
  });

  const [mobileOpenSections, setMobileOpenSections] = useState({
    category: true,
    women: true,
    men: false,
    availability: false,
    color: false,
    price: false,
  });

  // URL se ?filter= parameter read karke state update karna
  useEffect(() => {
    const filterParam = searchParams.get("filter");
    
    if (filterParam) {
      if (filterParam === "new-arrivals") {
        setAvailabilityFilter(["new-arrivals"]);
      } else if (filterParam === "best-sellers") {
        setAvailabilityFilter(["best-sellers"]);
      } else if (filterParam === "sale") {
        setAvailabilityFilter(["sale"]);
      }
    } else {
      setAvailabilityFilter([]);
    }
  }, [searchParams]);

  // ===============================
  // DYNAMIC FILTER OPTIONS EXTRACTOR
  // ===============================
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

  // ===============================
  // LOAD ALL BASE PRODUCTS ONCE
  // ===============================
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

  // ===============================
  // URL PARAMS SYNC & DYNAMIC ACCORDION EXPANSION
  // ===============================
  useEffect(() => {
    const subcats = searchParams.getAll("subcategory");
    if (subcats.length > 0) {
      setSelectedSubcategories(subcats);
    }

    if (allBaseProducts.length > 0) {
      const isWomenSubcat = subcats.some((sub) =>
        dynamicWomenSubcategories.some((item) => item.value === sub)
      );
      const isMenSubcat = subcats.some((sub) =>
        dynamicMenSubcategories.some((item) => item.value === sub)
      );

      if (isWomenSubcat) {
        setOpenSections((prev) => ({ ...prev, category: true, women: true }));
        setMobileOpenSections((prev) => ({ ...prev, category: true, women: true }));
      } else if (isMenSubcat) {
        setOpenSections((prev) => ({ ...prev, category: true, men: true, women: false }));
        setMobileOpenSections((prev) => ({ ...prev, category: true, men: true, women: false }));
      }
    }
  }, [searchParams, allBaseProducts, dynamicWomenSubcategories, dynamicMenSubcategories]);

  // ===============================
  // MULTI-FILTERING LOGIC
  // ===============================
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

      if (availabilityFilter.includes("sale") && !p.isOnSale) {
        return false;
      }
      if (availabilityFilter.includes("featured") && !p.isFeatured) {
        return false;
      }
      if (availabilityFilter.includes("best-sellers") && !p.isBestSeller) {
        return false;
      }
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

  // ===============================
  // CLEAN MULTI-SORTING LOGIC
  // ===============================
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (!sortBy) return 0;

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

  // ===============================
  // TOGGLE ACCORDIONS
  // ===============================
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleMobileSection = (section) => {
    setMobileOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // ===============================
  // HANDLERS
  // ===============================
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
    setSortBy("");
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

  // ===============================
  // PRICE RANGE COMPONENT
  // ===============================
  const PriceRangeContent = ({ isMobile = false }) => {
    const isOpen = isMobile ? mobileOpenSections.price : openSections.price;
    const toggleFn = isMobile ? () => toggleMobileSection("price") : () => toggleSection("price");

    return (
      <div className="border-t border-[var(--color-border)] py-2.5">
        <button
          type="button"
          onClick={toggleFn}
          className="flex w-full items-center justify-between py-1 text-left"
        >
          <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--color-text-primary)]">
            PRICE RANGE
          </span>
          <FiChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="mt-2.5 space-y-3 pb-2">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[9px] text-[var(--color-text-muted)]">
                  Min (₹)
                </label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: Number(e.target.value) })
                  }
                  className="w-full border border-[var(--color-border)] bg-transparent p-1.5 text-xs text-[var(--color-text-primary)]"
                />
              </div>
              <span className="mt-4 text-[var(--color-text-muted)]">-</span>
              <div className="flex-1">
                <label className="text-[9px] text-[var(--color-text-muted)]">
                  Max (₹)
                </label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: Number(e.target.value) })
                  }
                  className="w-full border border-[var(--color-border)] bg-transparent p-1.5 text-xs text-[var(--color-text-primary)]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ===============================
  // FILTER SECTION COMPONENT
  // ===============================
  const FilterSection = ({ title, section, items, mobile = false }) => {
    const isOpen = mobile ? mobileOpenSections[section] : openSections[section];
    const handleToggle = mobile
      ? () => toggleMobileSection(section)
      : () => toggleSection(section);

    if (!items || items.length === 0) return null;

    return (
      <div className="border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={handleToggle}
          className="flex w-full items-center justify-between py-2.5 text-left"
        >
          <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--color-text-primary)]">
            {title}
          </span>
          <FiChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="space-y-2 pb-3 pt-1">
            {items.map((item) => {
              const isSelected = selectedSubcategories.includes(item.value);
              return (
                <label
                  key={item.value}
                  className={`flex cursor-pointer items-center gap-2.5 text-[11px] font-medium transition ${
                    isSelected
                      ? "font-semibold text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSubcategoryToggle(item.value)}
                    className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                  />
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ===============================
  // SHARED FILTERS CONTENT
  // ===============================
  const renderAllFiltersContent = (isMobile = false) => {
    const catOpen = isMobile ? mobileOpenSections.category : openSections.category;
    const toggleCat = isMobile ? () => toggleMobileSection("category") : () => toggleSection("category");

    const colorOpen = isMobile ? mobileOpenSections.color : openSections.color;
    const toggleColor = isMobile ? () => toggleMobileSection("color") : () => toggleSection("color");

    const availOpen = isMobile ? mobileOpenSections.availability : openSections.availability;
    const toggleAvail = isMobile ? () => toggleMobileSection("availability") : () => toggleSection("availability");

    return (
      <div className="space-y-1">
        {/* SHOP BY CATEGORY */}
        <div className="border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={toggleCat}
            className="flex w-full items-center justify-between py-2.5 text-left"
          >
            <span className="text-[10px] font-semibold tracking-[0.16em]">
              SHOP BY CATEGORY
            </span>
            <FiChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                catOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {catOpen && (
            <div className="pl-2 space-y-1">
              {dynamicWomenSubcategories.length > 0 && (
                <FilterSection
                  title="WOMEN"
                  section="women"
                  items={dynamicWomenSubcategories}
                  mobile={isMobile}
                />
              )}
              {dynamicMenSubcategories.length > 0 && (
                <FilterSection
                  title="MEN"
                  section="men"
                  items={dynamicMenSubcategories}
                  mobile={isMobile}
                />
              )}
            </div>
          )}
        </div>

        {/* SHOP BY COLOR */}
        {dynamicColors.length > 0 && (
          <div className="border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={toggleColor}
              className="flex w-full items-center justify-between py-2.5 text-left"
            >
              <span className="text-[10px] font-semibold tracking-[0.16em]">
                SHOP BY COLOR
              </span>
              <FiChevronDown
                size={14}
                className={`transition-transform ${
                  colorOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {colorOpen && (
              <div className="flex flex-wrap gap-2 pb-3 pt-1">
                {dynamicColors.map((colorName) => {
                  const isSelected = selectedColors.includes(colorName);
                  return (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => handleColorToggle(colorName)}
                      className={`rounded-full border px-3 py-1 text-[10px] transition ${
                        isSelected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white font-semibold"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                      }`}
                    >
                      {colorName}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* COLLECTIONS & AVAILABILITY */}
        <div className="border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={toggleAvail}
            className="flex w-full items-center justify-between py-2.5 text-left"
          >
            <span className="text-[10px] font-semibold tracking-[0.16em]">
              COLLECTIONS & AVAILABILITY
            </span>
            <FiChevronDown
              size={14}
              className={`transition-transform ${
                availOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {availOpen && (
            <div className="space-y-2 pb-3 pt-1">
              {[
                { id: "new-arrivals", label: "New Arrivals" },
                { id: "best-sellers", label: "Best Sellers" },
                { id: "featured", label: "Featured Items" },
                { id: "sale", label: "On Sale" },
              ].map((item) => {
                const isChecked = availabilityFilter.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-2.5 text-[11px] text-[var(--color-text-muted)]"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleAvailabilityToggle(item.id)}
                      className="h-3.5 w-3.5 accent-[var(--color-accent)]"
                    />
                    <span className={isChecked ? "text-[var(--color-accent)] font-semibold" : ""}>
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* PRICE RANGE */}
        <PriceRangeContent isMobile={isMobile} />
      </div>
    );
  };

  return (
    <main className="min-h-dvh w-full bg-[var(--color-bg-primary)] text-[13px] text-[var(--color-text-primary)]">
      {/* HEADER */}
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

      {/* CONTENT */}
      <section className="mx-auto max-w-[1440px] px-5 py-5 md:px-10 md:py-8">
        {/* MOBILE TOOLBAR */}
        <div className="mb-5 flex items-center justify-between border-b border-[var(--color-border)] pb-3 md:hidden">
          <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
            {loading ? "LOADING..." : `${sortedProducts.length} PRODUCTS`}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileSortOpen(true)}
              className="flex items-center gap-1.5 border border-[var(--color-border)] px-3 py-1.5 text-[10px] font-medium tracking-wider"
            >
              <span>SORT</span>
              <FiChevronDown size={12} />
            </button>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-1.5 border border-[var(--color-border)] px-3 py-1.5 text-[10px] font-medium tracking-wider"
            >
              <FiSliders size={12} />
              <span>FILTER</span>
            </button>
          </div>
        </div>

        {/* MOBILE SORT SHEET */}
        {mobileSortOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <button
              type="button"
              onClick={() => setMobileSortOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-[var(--color-bg-primary)] p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                <p className="text-[10px] font-semibold tracking-[0.2em]">
                  SORT BY
                </p>
                <button type="button" onClick={() => setMobileSortOpen(false)}>
                  <FiX size={18} />
                </button>
              </div>
              <div className="space-y-3 py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setMobileSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between text-xs py-1.5 ${
                      sortBy === option.value
                        ? "font-semibold text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)]"
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

        {/* MOBILE FILTER PANEL */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

<aside className="absolute inset-0 flex h-full w-full flex-col bg-[var(--color-bg-primary)] shadow-2xl">              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3">
                <p className="text-[10px] font-semibold tracking-[0.2em]">
                  FILTERS
                </p>
                <button type="button" onClick={() => setMobileFiltersOpen(false)}>
                  <FiX size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-2">
                {renderAllFiltersContent(true)}
              </div>

              <div className="border-t border-[var(--color-border)] p-4">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-[var(--color-text-primary)] py-3 text-[10px] font-semibold tracking-[0.2em] text-[var(--color-bg-primary)]"
                >
                  VIEW RESULTS ({sortedProducts.length})
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-[210px_1fr] lg:grid-cols-[240px_1fr]">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden md:block sticky top-24">
            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto pr-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="mb-2 flex items-center justify-between pb-2">
                <p className="text-[9px] font-semibold tracking-[0.2em]">
                  FILTERS
                </p>
                {(selectedSubcategories.length > 0 ||
                  selectedColors.length > 0 ||
                  availabilityFilter.length > 0 ||
                  sortBy !== "") && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-[9px] font-semibold text-[var(--color-accent)]"
                  >
                    RESET
                  </button>
                )}
              </div>

              {renderAllFiltersContent(false)}
            </div>
          </aside>

          {/* PRODUCTS GRID & SORT TOOLBAR */}
          <div className="min-w-0">
            <div className="mb-4 hidden items-center justify-between md:flex">
              {/* DROPDOWN SORT TOOLBAR */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-[9px] font-medium tracking-[0.16em]"
                >
                  <FiFilter size={14} />
                  <span>SORT BY</span>
                  <FiChevronDown
                    size={12}
                    className={`transition-transform ${
                      filterDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {filterDropdownOpen && (
                  <div className="absolute left-0 top-8 z-50 w-[240px] border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-4 shadow-lg">
                    <p className="mb-3 text-[9px] font-semibold tracking-[0.18em]">
                      SORTING OPTIONS
                    </p>
                    <div className="space-y-2.5">
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
                              ? "font-semibold text-[var(--color-accent)]"
                              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && <FiCheck size={13} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
                {loading ? "LOADING..." : `${sortedProducts.length} PRODUCTS`}
              </p>
            </div>

            {loading && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="aspect-[4/5] animate-pulse bg-[var(--color-bg-tertiary)]"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="py-16 text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {sortedProducts.length === 0 ? (
                  <div className="py-16 text-center text-sm text-[var(--color-text-muted)]">
                    No products matching your filters.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id || product._id}
                        product={product}
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