import { useEffect, useState } from "react";

import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";

import { getAllProducts } from "../api/api";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // ===============================
  // SELECTED COLOR
  // ===============================
  const [selectedColor, setSelectedColor] = useState(null);

  // ===============================
  // CURRENT IMAGE
  // ===============================
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ===============================
  // CART
  // ===============================
  const { addToCart, removeFromCart, isInCart } = useCart();

  // ===============================
  // WISHLIST
  // ===============================
  const { toggleWishlist, isInWishlist } = useWishlist();

  // ===============================
  // LOAD PRODUCT
  // ===============================
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const data = await getAllProducts();
        const allProducts = Array.isArray(data) ? data : [];

        const selectedProduct = allProducts.find(
          (item) => String(item._id) === String(id),
        );
        /////for testing purpose
        console.log("ALL PRODUCTS:", allProducts);
        console.log("SELECTED PRODUCT:", selectedProduct);
        setProduct(selectedProduct || null);

        if (selectedProduct) {
          const suggestedProducts = allProducts
            .filter(
              (item) =>
                String(item._id) !== String(selectedProduct._id) &&
                item.category === selectedProduct.category,
            )
            .slice(0, 4);

          setSuggestions(suggestedProducts);

          // First color selected by default
          const firstColor = selectedProduct.colors?.[0];

          setSelectedColor(
            typeof firstColor === "object"
              ? firstColor.name
              : firstColor || null,
          );
        } else {
          setSuggestions([]);
          setSelectedColor(null);
        }

        setQuantity(1);
        setCurrentImageIndex(0);
      } catch (error) {
        console.error("Failed to load product:", error);

        setProduct(null);
        setSuggestions([]);
        setSelectedColor(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // ===============================
  // QUANTITY
  // ===============================
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // ===============================
  // SELECTED COLOR DATA
  // ===============================
  const selectedColorData = product?.colors?.find((color) => {
    if (typeof color === "object") {
      return color.name === selectedColor;
    }

    return color === selectedColor;
  });

  // ===============================
  // PRODUCT IMAGES real api
  // ===============================
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `${API_BASE_URL.replace("/api", "")}${image}`;
  };

  const productImages =
    selectedColorData &&
    typeof selectedColorData === "object" &&
    Array.isArray(selectedColorData.images) &&
    selectedColorData.images.length > 0
      ? selectedColorData.images.map(getImageUrl)
      : Array.isArray(product?.images?.desktop) &&
          product.images.desktop.length > 0
        ? product.images.desktop.map(getImageUrl)
        : Array.isArray(product?.images?.mobile) &&
            product.images.mobile.length > 0
          ? product.images.mobile.map(getImageUrl)
          : product?.thumbnail || product?.image
            ? [getImageUrl(product.thumbnail || product.image)]
            : [];
  // ===============================
  // MAIN PRODUCT CART
  // ===============================
  const handleMainCart = () => {
    if (!product) return;

    const variantId = `${product._id}-${selectedColor || "default"}`;

    if (isInCart(product._id, selectedColor)) {
      removeFromCart(product._id, selectedColor);
      return;
    }

    addToCart(
      {
        ...product,
        selectedColor,
        variantId,
      },
      quantity,
    );
  };

  // ===============================
  // SUGGESTION CART
  // ===============================
  const handleSuggestionCart = (item) => {
    if (isInCart(item._id)) {
      removeFromCart(item._id);
    } else {
      addToCart(item, 1);
    }
  };

  // ===============================
  // NEXT IMAGE
  // ===============================
  const nextImage = () => {
    if (productImages.length <= 1) return;

    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  // ===============================
  // PREVIOUS IMAGE
  // ===============================
  const previousImage = () => {
    if (productImages.length <= 1) return;

    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  // ===============================
  // CHANGE COLOR
  // ===============================
  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);

    // New color = first image
    setCurrentImageIndex(0);
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-muted)]">
        <p className="text-xs uppercase tracking-[0.25em]">Loading...</p>
      </main>
    );
  }

  // ===============================
  // PRODUCT NOT FOUND
  // ===============================
  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] px-6 text-center text-[var(--color-text-primary)]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            Product not found
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="border border-[var(--color-border)] px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  // ===============================
  // PRODUCT DATA
  // ===============================
  const currentImage = productImages[currentImageIndex] || productImages[0];

  const finalPrice = product.salePrice || product.price || 0;

  const originalPrice = product.price || 0;

  const wishlisted = isInWishlist(product._id);

  // Cart state depends on product + selected color
  const cartActive = isInCart(product._id, selectedColor);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        {/* ===============================
            BACK
        =============================== */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
        >
          <FiArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back
        </button>

        {/* ===============================
            PRODUCT DETAILS
        =============================== */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ===============================
              IMAGE GALLERY
          =============================== */}
          <div>
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row">
              {/* ===============================
                  THUMBNAILS
              =============================== */}
              {productImages.length > 1 && (
                <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:w-[78px] lg:flex-col lg:overflow-y-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      aria-label={`View product image ${index + 1}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 overflow-hidden border transition ${
                        currentImageIndex === index
                          ? "border-[var(--color-accent)]"
                          : "border-[var(--color-border)] opacity-70 hover:border-[var(--color-accent)] hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="h-20 w-16 object-cover sm:h-24 sm:w-20 lg:h-[92px] lg:w-[72px]"
                      />

                      {/* ACTIVE THUMBNAIL INDICATOR */}
                      {currentImageIndex === index && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--color-accent)]" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* ===============================
                  MAIN IMAGE
              =============================== */}
              <div className="order-1 min-w-0 flex-1 lg:order-2">
                <div className="relative overflow-hidden bg-[var(--color-bg-secondary)]">
                  <img
                    src={currentImage}
                    alt={`${product.name}${
                      selectedColor ? ` - ${selectedColor}` : ""
                    }`}
                    className="aspect-[4/5] w-full object-cover"
                  />

                  {/* SALE */}
                  {product.isOnSale && (
                    <span className="absolute left-4 top-4 bg-[var(--color-accent)] px-3 py-1.5 text-[8px] font-semibold tracking-[0.14em] text-white">
                      SALE
                    </span>
                  )}

                  {/* WISHLIST */}
                  <button
                    type="button"
                    aria-label={
                      wishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    onClick={() => toggleWishlist(product)}
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border bg-[var(--color-bg-primary)]/90 backdrop-blur transition ${
                      wishlisted
                        ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                        : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    }`}
                  >
                    <FiHeart
                      size={16}
                      fill={wishlisted ? "currentColor" : "none"}
                    />
                  </button>

                  {/* LEFT ARROW */}
                  {productImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={previousImage}
                      className="group absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 text-[var(--color-text-primary)] shadow-sm backdrop-blur transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white sm:left-4"
                    >
                      <FiChevronLeft
                        size={18}
                        className="transition-transform duration-200 group-hover:-translate-x-0.5"
                      />
                    </button>
                  )}

                  {/* RIGHT ARROW */}
                  {productImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={nextImage}
                      className="group absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 text-[var(--color-text-primary)] shadow-sm backdrop-blur transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white sm:right-4"
                    >
                      <FiChevronRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </button>
                  )}

                  {/* IMAGE COUNT */}
                  {productImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-bg-primary)]/90 px-3 py-1 text-[9px] tracking-[0.12em] backdrop-blur">
                      {currentImageIndex + 1} / {productImages.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===============================
              PRODUCT INFO
          =============================== */}
          <div className="flex flex-col justify-start lg:pt-0">
            {/* CATEGORY */}
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              {product.subcategory || product.category || "Niya Bags"}
            </p>

            {/* TITLE */}
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-xl text-[var(--color-text-primary)]">
                ₹{Number(finalPrice).toLocaleString("en-IN")}
              </p>

              {product.isOnSale &&
                product.salePrice &&
                product.price &&
                product.salePrice !== product.price && (
                  <p className="text-sm text-[var(--color-text-muted)] line-through">
                    ₹{Number(originalPrice).toLocaleString("en-IN")}
                  </p>
                )}

              {product.isOnSale && product.discountPercentage > 0 && (
                <span className="text-[10px] font-semibold tracking-[0.08em] text-[var(--color-accent)]">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* DIVIDER */}
            <div className="mt-5 h-px w-full bg-[var(--color-border)]" />

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
              {product.description}
            </p>

            {/* COLORS */}
            {product.colors?.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    Color
                  </p>

                  <p className="text-[9px] text-[var(--color-text-secondary)]">
                    {selectedColor || "Select"}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const colorName =
                      typeof color === "object" ? color.name : color;

                    const isSelected = selectedColor === colorName;

                    return (
                      <button
                        key={colorName}
                        type="button"
                        onClick={() => handleColorChange(colorName)}
                        className={`border px-4 py-2 text-[10px] transition ${
                          isSelected
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                            : "border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        }`}
                      >
                        {colorName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===============================
                QUANTITY + CART
            =============================== */}
            <div className="mt-7 flex items-center gap-3">
              {/* QUANTITY */}
              <div className="flex h-12 items-center border border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-full w-11 items-center justify-center text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
                >
                  <FiMinus size={14} />
                </button>

                <span className="w-8 text-center text-sm">{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-full w-11 items-center justify-center text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              {/* CART */}
              <button
                type="button"
                onClick={handleMainCart}
                className={`flex h-12 flex-1 items-center justify-center gap-2 px-5 text-[10px] uppercase tracking-[0.18em] transition ${
                  cartActive
                    ? "border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    : "bg-[var(--color-accent)] text-white hover:opacity-90"
                }`}
              >
                <FiShoppingBag size={15} />

                {cartActive ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* ===============================
            CURATED FOR YOU
        =============================== */}
        {suggestions.length > 0 && (
          <section className="mt-20">
            <div className="mb-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
                You May Also Like
              </p>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                Curated For You
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
              {suggestions.map((item) => {
                const itemImage =
                  item.images?.desktop?.[0] ||
                  item.images?.mobile?.[0] ||
                  item.thumbnail ||
                  item.image ||
                  "";

                const itemPrice = item.salePrice || item.price || 0;

                const itemWishlist = isInWishlist(item._id);

                const itemInCart = isInCart(item._id);

                return (
                  <article key={item._id} className="group min-w-0">
                    {/* IMAGE */}
                    <div
                      className="relative cursor-pointer overflow-hidden bg-[var(--color-bg-tertiary)]"
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      <img
                        src={getImageUrl(itemImage)}
                        alt={item.title}
                        className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />

                      {/* SALE */}
                      {item.isOnSale && (
                        <span className="absolute left-3 top-3 bg-[var(--color-accent)] px-2.5 py-1 text-[8px] font-semibold tracking-[0.14em] text-white">
                          SALE
                        </span>
                      )}

                      {/* WISHLIST */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(item);
                        }}
                        className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border bg-[var(--color-bg-primary)]/90 backdrop-blur transition ${
                          itemWishlist
                            ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                            : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                        }`}
                      >
                        <FiHeart
                          size={15}
                          fill={itemWishlist ? "currentColor" : "none"}
                        />
                      </button>

                      {/* CART */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSuggestionCart(item);
                        }}
                        className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 px-3 py-3 text-[9px] uppercase tracking-[0.16em] backdrop-blur transition-all duration-300 ${
                          itemInCart
                            ? "bg-[var(--color-bg-primary)]/95 text-[var(--color-text-primary)] opacity-100"
                            : "bg-[var(--color-bg-primary)]/95 text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100"
                        } hover:bg-[var(--color-accent)] hover:text-white`}
                      >
                        <FiShoppingBag size={13} />

                        {itemInCart ? "Remove from Cart" : "Add to Cart"}
                      </button>
                    </div>

                    {/* INFO */}
                    <div className="pt-3">
                      <h3
                        className="cursor-pointer truncate font-serif text-sm transition hover:text-[var(--color-accent)]"
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {item.title}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <p className="text-[11px] text-[var(--color-text-primary)]">
                          ₹{Number(itemPrice).toLocaleString("en-IN")}
                        </p>

                        {item.isOnSale &&
                          item.salePrice &&
                          item.price &&
                          item.salePrice !== item.price && (
                            <p className="text-[9px] text-[var(--color-text-muted)] line-through">
                              ₹{Number(item.price).toLocaleString("en-IN")}
                            </p>
                          )}
                      </div>

                      {/* DISCOUNT */}
                      {item.isOnSale && item.discountPercentage > 0 && (
                        <p className="mt-1 text-[9px] font-semibold tracking-[0.08em] text-[var(--color-accent)]">
                          {item.discountPercentage}% OFF
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ProductDetails;
