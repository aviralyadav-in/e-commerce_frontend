import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import BackButton from "../components/common/BackButton";
import ProductCard from "../components/product/ProductCard";
import { getProductById, getSuggestedProducts } from "../api/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  // States
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Touch Swipe Handling States
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Accordion state
  const [showDescription, setShowDescription] = useState(true);

  // Contexts
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const currentProd = await getProductById(id);
        if (!isMounted) return;
        setProduct(currentProd || null);
        if (currentProd) {
          const currentId = currentProd._id || currentProd.id;
          const rawSuggestions = await getSuggestedProducts(currentId);
          if (isMounted && Array.isArray(rawSuggestions)) {
            const filtered = rawSuggestions.filter((item) => {
              const itemId = item?._id || item?.id;
              if (String(itemId) === String(currentId)) return false;
              const matchSub =
                currentProd.subcategory &&
                item.subcategory &&
                item.subcategory.toLowerCase() === currentProd.subcategory.toLowerCase();
              const matchCat =
                currentProd.category &&
                item.category &&
                item.category.toLowerCase() === currentProd.category.toLowerCase();
              return matchSub || matchCat;
            });
            setSuggestions(filtered.slice(0, 4));
          }
          if (Array.isArray(currentProd.variants) && currentProd.variants.length > 0) {
            setSelectedColor(currentProd.variants[0]?.name || null);
          } else {
            setSelectedColor(null);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        if (isMounted) {
          setProduct(null);
          setSuggestions([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    setQuantity(1);
    setCurrentImageIndex(0);
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Base Product ID
  const productId = product?._id || product?.id;
  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;

  // DYNAMIC VARIANT ID: productId + selectedColor
  const currentVariantId = useMemo(() => {
    if (!productId) return "";
    return selectedColor ? `${productId}-${selectedColor}` : String(productId);
  }, [productId, selectedColor]);

  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null;
    return product.variants.find((v) => v?.name === selectedColor) || product.variants[0];
  }, [product, selectedColor, hasVariants]);

  const productImages = useMemo(() => {
    let images = [];
    if (selectedVariant?.images?.length > 0) {
      images = selectedVariant.images;
    } else if (Array.isArray(product?.images) && product.images.length > 0) {
      images = product.images;
    } else if (product?.thumbnail) {
      images = [product.thumbnail];
    } else if (product?.image) {
      images = [product.image];
    }
    return images
      .filter(Boolean)
      .map((img) => (img.startsWith("http") || img.startsWith("/") ? img : `/${img}`));
  }, [selectedVariant, product]);

  const currentImage = productImages[currentImageIndex] || productImages[0] || null;
  const finalPrice = Number(product?.salePrice || product?.price || 0);
  const originalPrice = Number(product?.price || 0);
  const wishlisted = isInWishlist(productId);

  // Dynamic Rating & Reviews
  const rating = Number(product?.rating || product?.averageRating || 0);
  const reviewsList = Array.isArray(product?.reviews) ? product.reviews : [];
  const reviewCount = Number(product?.numReviews || product?.reviewsCount || reviewsList.length || 0);

  // Discount Percentage
  const discountPercentage = useMemo(() => {
    if (originalPrice > finalPrice && finalPrice > 0) {
      return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
    }
    return 0;
  }, [originalPrice, finalPrice]);

  // CHECK CART STATUS USING DYNAMIC VARIANT ID
  const cartActive = useMemo(() => {
    if (!currentVariantId) return false;
    return isInCart(currentVariantId);
  }, [isInCart, currentVariantId]);

  // ADD / REMOVE FROM CART HANDLER
  const handleMainCart = () => {
    if (!product || !productId) return;
    if (cartActive) {
      removeFromCart(currentVariantId);
    } else {
      const itemToCart = {
        ...product,
        id: currentVariantId,
        _id: currentVariantId,
        variantId: currentVariantId,
        baseProductId: productId,
        selectedColor: selectedColor || null,
        price: finalPrice,
        image: currentImage,
        thumbnail: currentImage,
      };
      addToCart(itemToCart, quantity);
    }
  };

  // Touch Swipe Gesture logic
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;
    if (isLeftSwipe && currentImageIndex < productImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Loading Product...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] px-6 text-center">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Product Not Found</p>
          <BackButton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-7xl px-4 pt-2 pb-12 sm:px-6 lg:px-8">
        <BackButton className="mb-4" />
        
        {/* MAIN CONTAINER: Desktop par flex row jisse left side thumbnail preview aur right side details match karein */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* LEFT SIDE: DESKTOP THUMBNAILS PREVIEW (VERTICAL STACK) + MAIN IMAGE */}
          <div className="flex flex-col sm:flex-row lg:col-span-6 gap-4 w-full">
            
            {/* Desktop Vertical Thumbnails Sidebar (Choti Preview Images) */}
            {productImages.length > 1 && (
              <div className="hidden lg:flex flex-col gap-2.5 w-16 shrink-0">
                {productImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative overflow-hidden rounded border transition-all ${
                      currentImageIndex === idx
                        ? "border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                        : "border-[var(--color-border)] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="aspect-[4/5] w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image Wrapper */}
            <div className="flex-1 flex flex-col items-center w-full">
              <div
                className="relative w-full overflow-hidden rounded-xl bg-[var(--color-bg-secondary)] select-none touch-pan-y shadow-sm"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt={product.title || product.name}
                    className="aspect-[4/5] w-full object-cover transition-opacity duration-300"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center text-xs uppercase text-[var(--color-text-muted)]">
                    No Image Available
                  </div>
                )}
                {discountPercentage > 0 && (
                  <span className="absolute left-3 top-3 rounded bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white shadow">
                    {discountPercentage}% OFF
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border bg-[var(--color-bg-primary)]/80 backdrop-blur transition ${
                    wishlisted
                      ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-text-primary)]"
                  }`}
                >
                  <FiHeart size={16} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* MOBILE/TABLET DOTS PAGINATION */}
              {productImages.length > 1 && (
                <div className="mt-3 flex lg:hidden items-center justify-center gap-1.5">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentImageIndex === idx
                          ? "w-6 bg-[var(--color-accent)]"
                          : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: PRODUCT DETAILS (EXPANDED TO MATCH IMAGE HEIGHT & BREATHING SPACE) */}
          <div className="flex flex-col justify-between lg:col-span-6 w-full py-1">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-accent)]">
                {product.subcategory || product.category || "Niya Collection"}
              </p>
              
              <h1 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text-primary)] leading-snug">
                {product.title || product.name}
              </h1>

              {/* PRICE + REVIEWS */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[var(--color-text-primary)]">
                    ₹{finalPrice.toLocaleString("en-IN")}
                  </span>
                  {originalPrice > finalPrice && (
                    <span className="text-sm text-[var(--color-text-muted)] line-through">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                {rating > 0 && (
                  <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                    <FiStar size={13} className="fill-amber-500 text-amber-500" />
                    <span className="font-semibold text-[var(--color-text-primary)]">{rating}</span>
                    {reviewCount > 0 && <span>({reviewCount} reviews)</span>}
                  </div>
                )}
              </div>

              <div className="mt-4 h-px w-full bg-[var(--color-border)] opacity-60" />

              {/* VARIANTS SELECTION */}
              {hasVariants && (
                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Color:</span>
                    <span className="text-xs font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedColor === v.name;
                      return (
                        <button
                          key={v.name}
                          type="button"
                          onClick={() => {
                            setSelectedColor(v.name);
                            setCurrentImageIndex(0);
                          }}
                          className={`rounded-md border px-3 py-1.5 text-xs transition-all font-medium ${
                            isSelected
                              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                              : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          {v.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUANTITY & ADD TO CART */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  >
                    <FiMinus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  >
                    <FiPlus size={13} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleMainCart}
                  className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg px-6 text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                    cartActive
                      ? "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]"
                      : "bg-[var(--color-accent)] text-white hover:opacity-95"
                  }`}
                >
                  <FiShoppingBag size={15} />
                  {cartActive ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>

              {/* TRUST BADGES */}
              <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl border border-[var(--color-border)] py-3 px-2 text-center bg-[var(--color-bg-secondary)]/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                  <FiTruck size={14} className="text-[var(--color-accent)]" />
                  <span className="text-[10px] font-semibold">Free Shipping</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 border-x border-[var(--color-border)]">
                  <FiRefreshCw size={14} className="text-[var(--color-accent)]" />
                  <span className="text-[10px] font-semibold">7 Days Return</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                  <FiShield size={14} className="text-[var(--color-accent)]" />
                  <span className="text-[10px] font-semibold">Authentic</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <button
                  onClick={() => setShowDescription((prev) => !prev)}
                  className="flex justify-between items-center w-full text-left font-serif text-sm tracking-wide font-medium"
                >
                  <span>Product Description</span>
                  {showDescription ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
                {showDescription && (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {product.description || "Crafted with premium materials, designed for style, elegance, and durability."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RECOMMENDATIONS SECTION */}
        {suggestions.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">You May Also Like</p>
              <h2 className="mt-1 font-serif text-xl sm:text-2xl">Curated For You</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-4">
              {suggestions.map((item) => (
                <ProductCard key={item.id || item._id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetails;