import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api/api";

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  // ============================================================
  // PRODUCT ID
  // Same structure as ProductCard
  // ============================================================

  function getProductId(product) {
    return product?._id || product?.id;
  }

  // ============================================================
  // CATEGORY
  // Same structure as ProductCard
  // ============================================================

  function getCategoryName(product) {
    return (
      product?.subcategory ||
      product?.category?.name ||
      product?.category ||
      "Handbags"
    );
  }

  // ============================================================
  // IMAGE
  // Same structure as ProductCard
  // ============================================================

  function getProductImage(product) {
    return (
      product?.thumbnail ||
      product?.images?.[0] ||
      product?.variants?.[0]?.images?.[0] ||
      product?.image ||
      product?.image_link ||
      ""
    );
  }

  // ============================================================
  // PRODUCT TITLE
  // ============================================================

  function getProductTitle(product) {
    return product?.title || product?.name || "Product";
  }

  // ============================================================
  // PRODUCT PRICE
  // Same logic as ProductCard
  // ============================================================

  function getProductPrice(product) {
    return Number(product?.salePrice || product?.price || 0);
  }

  // ============================================================
  // FOCUS INPUT WHEN OPEN
  // ============================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  // ============================================================
  // LOAD PRODUCTS FROM PRODUCT API
  // ============================================================

  useEffect(() => {
    if (!isOpen || products.length > 0) {
      return;
    }

    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getAllProducts();

        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load search products:", error);

        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [isOpen, products.length]);

  // ============================================================
  // ESC KEY
  // ============================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("keydown", handleEscape, true);
    };
  }, [isOpen, onClose]);

  // ============================================================
  // PREVENT BACKGROUND SCROLL
  // ============================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // ============================================================
  // CLOSE
  // ============================================================

  function handleClose() {
    setQuery("");
    onClose();
  }

  // ============================================================
  // PRODUCT CLICK
  // ============================================================

  function handleProductClick(productId) {
    if (!productId) {
      return;
    }

    handleClose();
    navigate(`/product/${productId}`);
  }

  // ============================================================
  // BACKGROUND CLICK
  // ============================================================

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  // ============================================================
  // DO NOT RENDER
  // ============================================================

  if (!isOpen) {
    return null;
  }

  // ============================================================
  // SEARCH TERM
  // ============================================================

  const searchTerm = query.trim().toLowerCase();

  // ============================================================
  // MATCH PRODUCTS
  // ============================================================

  const matchingProducts = searchTerm
    ? products.filter((product) => {
        const title = getProductTitle(product).toLowerCase();

        const category = String(getCategoryName(product)).toLowerCase();

        const description = String(product?.description || "").toLowerCase();

        const subcategory = String(
          product?.subcategory || "",
        ).toLowerCase();

        return (
          title.includes(searchTerm) ||
          category.includes(searchTerm) ||
          subcategory.includes(searchTerm) ||
          description.includes(searchTerm)
        );
      })
    : [];

  // ============================================================
  // BEST MATCH
  // ============================================================

  const exactMatches = matchingProducts.filter((product) =>
    getProductTitle(product).toLowerCase().includes(searchTerm),
  );

  const primaryProduct = exactMatches[0] || matchingProducts[0];

  // ============================================================
  // PRIMARY CATEGORY
  // ============================================================

  const primaryCategory = primaryProduct
    ? String(getCategoryName(primaryProduct))
    : "";

  // ============================================================
  // RELATED PRODUCTS
  // ============================================================

  const primaryProductId = primaryProduct
    ? getProductId(primaryProduct)
    : null;

  const relatedProducts = primaryProduct
    ? products
        .filter(
          (product) =>
            String(getProductId(product)) !== String(primaryProductId),
        )
        .filter(
          (product) =>
            String(getCategoryName(product)).toLowerCase() ===
            primaryCategory.toLowerCase(),
        )
        .slice(0, 4)
    : [];

  // ============================================================
  // SEARCH UI
  // ============================================================

  const overlay = (
    <div
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#faf9f5]/95 backdrop-blur-sm"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="mx-auto min-h-screen w-full max-w-[1000px] px-5 pb-12 pt-6 md:px-8 md:pt-10"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* SEARCH HEADER */}

        <div className="flex items-center gap-4 border-b border-[#073b4c]/20 pb-4">
          <FiSearch
            size={20}
            strokeWidth={1.4}
            className="shrink-0 text-[#073b4c]"
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search bags, styles, categories..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyDown={(event) => {
              event.stopPropagation();

              if (event.key === "Escape") {
                event.preventDefault();
                handleClose();
              }
            }}
            onKeyUp={(event) => {
              event.stopPropagation();
            }}
            className="min-w-0 flex-1 bg-transparent font-serif text-xl text-[#073b4c] outline-none placeholder:text-[#73868c]/60 md:text-2xl"
          />

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close search"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#073b4c] transition hover:bg-[#073b4c] hover:text-white"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* SEARCH CONTENT */}

        <div className="py-8">
          {/* LOADING */}

          {loading && (
            <div className="py-12 text-center">
              <p className="text-[10px] tracking-[0.15em] text-[#73868c]">
                LOADING COLLECTION...
              </p>
            </div>
          )}

          {/* INITIAL STATE */}

          {!loading && !searchTerm && (
            <div className="py-16 text-center">
              <p className="text-[9px] font-semibold tracking-[0.22em] text-[#c39920]">
                DISCOVER NIYA
              </p>

              <h2 className="mt-3 font-serif text-3xl text-[#073b4c]">
                What are you looking for?
              </h2>

              <p className="mx-auto mt-3 max-w-[420px] text-xs leading-6 text-[#73868c]">
                Search for a bag, style, or category to explore the collection.
              </p>
            </div>
          )}

          {/* NO RESULTS */}

          {!loading && searchTerm && !primaryProduct && (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl text-[#073b4c]">
                No products found
              </p>

              <p className="mt-2 text-xs text-[#73868c]">
                Try another product name or category.
              </p>
            </div>
          )}

          {/* RESULTS */}

          {!loading && primaryProduct && (
            <>
              {/* BEST MATCH */}

              <section>
                <p className="mb-4 text-[9px] font-semibold tracking-[0.22em] text-[#c39920]">
                  BEST MATCH
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleProductClick(getProductId(primaryProduct))
                  }
                  className="group flex w-full gap-5 border border-[#e2e7e6] bg-white p-4 text-left transition hover:border-[#c39920]"
                >
                  {/* IMAGE */}

                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#f0efeb]">
                    {getProductImage(primaryProduct) ? (
                      <img
                        src={getProductImage(primaryProduct)}
                        alt={getProductTitle(primaryProduct)}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[9px] text-[#73868c]">
                        NO IMAGE
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}

                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="text-[8px] uppercase tracking-[0.15em] text-[#9a7a26]">
                      {getCategoryName(primaryProduct)}
                    </p>

                    <h3 className="mt-1 font-serif text-xl text-[#073b4c]">
                      {getProductTitle(primaryProduct)}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[11px] font-medium text-[#385b66]">
                        ₹
                        {getProductPrice(primaryProduct).toLocaleString(
                          "en-IN",
                        )}
                      </p>

                      {primaryProduct?.salePrice &&
                        primaryProduct?.price &&
                        primaryProduct.salePrice !== primaryProduct.price && (
                          <p className="text-[10px] text-[#73868c] line-through">
                            ₹
                            {Number(primaryProduct.price).toLocaleString(
                              "en-IN",
                            )}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* ARROW */}

                  <div className="hidden items-center sm:flex">
                    <FiArrowRight
                      size={17}
                      className="text-[#c39920] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </button>
              </section>

              {/* RELATED PRODUCTS */}

              {relatedProducts.length > 0 && (
                <section className="mt-10">
                  <div className="mb-5">
                    <p className="text-[9px] font-semibold tracking-[0.22em] text-[#c39920]">
                      MORE FROM THIS CATEGORY
                    </p>

                    <h2 className="mt-2 font-serif text-2xl text-[#073b4c]">
                      {primaryCategory}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {relatedProducts.map((product) => {
                      const productId = getProductId(product);
                      const productImage = getProductImage(product);
                      const productTitle = getProductTitle(product);
                      const productPrice = getProductPrice(product);

                      return (
                        <button
                          key={productId}
                          type="button"
                          onClick={() => handleProductClick(productId)}
                          className="group text-left"
                        >
                          <div className="aspect-[4/5] overflow-hidden bg-[#f0efeb]">
                            {productImage ? (
                              <img
                                src={productImage}
                                alt={productTitle}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[9px] text-[#73868c]">
                                NO IMAGE
                              </div>
                            )}
                          </div>

                          <p className="mt-3 line-clamp-1 text-[10px] font-medium text-[#073b4c]">
                            {productTitle}
                          </p>

                          <p className="mt-1 text-[10px] text-[#385b66]">
                            ₹{productPrice.toLocaleString("en-IN")}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

export default SearchOverlay;