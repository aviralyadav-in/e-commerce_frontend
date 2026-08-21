import { useEffect, useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import {
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
} from "../../api/api";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ===============================
  // CART CONTEXT
  // ===============================
  const { toggleCart, isInCart } = useCart();

  // ===============================
  // WISHLIST CONTEXT
  // ===============================
  const { toggleWishlist, isInWishlist } = useWishlist();

  // ===============================
  // LOAD PRODUCTS
  // ===============================
  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const [featured, bestSellers, newArrivals] = await Promise.all([
          getFeaturedProducts(),
          getBestSellerProducts(),
          getNewArrivalProducts(),
        ]);

        if (mounted) {
          setFeaturedProducts(Array.isArray(featured) ? featured : []);
          setBestSellerProducts(Array.isArray(bestSellers) ? bestSellers : []);
          setNewArrivalProducts(Array.isArray(newArrivals) ? newArrivals : []);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // PRODUCT CARD
  // ===============================
  function renderProductCard(product, sectionType) {
    const wishlistActive = isInWishlist(product.id);
    const cartActive = isInCart(product.id);

    let badgeText = "FEATURED";

    if (sectionType === "bestSeller") {
      badgeText = "BEST SELLER";
    } else if (sectionType === "newArrival") {
      badgeText = "NEW";
    } else if (product.discountPercentage) {
      badgeText = "SPECIAL";
    }

    return (
      <article
        key={product.id}
        onClick={() => navigate(`/product/${product.id}`)}
        className="group cursor-pointer"
      >
        {/* PRODUCT IMAGE */}
        <div
          className="
            relative aspect-[4/5] overflow-hidden
            bg-[var(--color-bg-tertiary)]
          "
        >
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition duration-500
              group-hover:scale-[1.03]
            "
          />

          {/* WISHLIST */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist(product);
            }}
            className={`
              absolute right-3 top-3
              grid h-8 w-8 place-items-center
              rounded-full transition
              ${
                wishlistActive
                  ? "bg-[var(--color-dark-section)] text-white"
                  : "bg-[var(--color-bg-secondary)]/90 text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
              }
            `}
            aria-label={
              wishlistActive ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <FiHeart
              size={14}
              strokeWidth={1.5}
              fill={wishlistActive ? "currentColor" : "none"}
            />
          </button>

          {/* BADGE */}
          <span
            className="
              absolute left-3 top-3
              bg-[var(--color-dark-section)]
              px-2 py-1
              text-[7px]
              tracking-wide
              text-white
            "
          >
            {badgeText}
          </span>

          {/* CART */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleCart(product, 1);
            }}
            className={`
              absolute bottom-2 left-2 right-2
              flex h-8 items-center justify-center
              gap-1 px-1
              text-[4px] font-semibold tracking-0
              transition

              sm:bottom-3 sm:left-3 sm:right-3
              sm:h-9 sm:gap-2 sm:px-2 sm:text-[6px]

              ${
                cartActive
                  ? "bg-[var(--color-dark-section)] text-white opacity-100"
                  : "bg-[var(--color-bg-secondary)]/95 text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100"
              }
            `}
            aria-label={
              cartActive ? "Remove from shopping bag" : "Add to shopping bag"
            }
          >
            <FiShoppingBag size={9} className="shrink-0" />

            <span className="whitespace-nowrap">
              {cartActive ? "ADDED  ✓" : "ADD "}
            </span>
          </button>
        </div>

        {/* PRODUCT INFO */}
        <div className="pt-4">
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.12em]
              text-[var(--color-accent)]
            "
          >
            {product.subcategory || product.category?.name || "Bags"}
          </p>

          <h3
            className="
              mt-1
              text-[15px]
              font-medium
              text-[var(--color-text-primary)]
            "
          >
            {product.title}
          </h3>

          <p
            className="
              mt-2
              text-[15px]
              font-semibold
              text-[var(--color-text-primary)]
            "
          >
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </p>
        </div>
      </article>
    );
  }

  // ===============================
  // PRODUCT SECTION
  // ===============================
  function renderSection({
    id,
    eyebrow,
    title,
    description,
    products,
    sectionType,
  }) {
    const filterMap = {
      featured: "featured",
      bestSeller: "best-sellers",
      newArrival: "new-arrivals",
    };

    const shopFilter = filterMap[sectionType];

    return (
      <section
        id={id}
        className="
          bg-[var(--color-bg-secondary)]
          px-5 py-12
          transition-colors duration-300
          md:px-10 md:py-16
        "
      >
        <div className="mx-auto max-w-[1440px]">
          {/* SECTION HEADER */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p
                className="
                  mb-2
                  text-[10px]
                  font-semibold
                  tracking-[0.22em]
                  text-[var(--color-accent)]
                "
              >
                {eyebrow}
              </p>

              <h2
                className="
                  font-serif
                  text-[34px]
                  text-[var(--color-text-primary)]
                  md:text-[40px]
                "
              >
                {title}
              </h2>

              <p
                className="
                  mt-2
                  max-w-[560px]
                  text-[12px]
                  leading-5
                  text-[var(--color-text-muted)]
                "
              >
                {description}
              </p>
            </div>

            {/* VIEW ALL */}
            <Link
              to={`/shop?filter=${shopFilter}`}
              className="
                hidden
                border-b
                border-[var(--color-accent)]
                pb-1
                text-[16px]
                font-semibold
                text-[var(--color-text-primary)]
                transition
                hover:opacity-60
                sm:block
              "
            >
              View All →
            </Link>
          </div>

          {/* PRODUCTS */}
          {products.length === 0 ? (
            <p
              className="
                py-10
                text-center
                text-[11px]
                text-[var(--color-text-muted)]
              "
            >
              No products available.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-4">
              {products.map((product) =>
                renderProductCard(product, sectionType),
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <section
        id="featured"
        className="
          bg-[var(--color-bg-secondary)]
          px-5 py-12
          transition-colors duration-300
          md:px-10 md:py-16
        "
      >
        <div className="mx-auto max-w-[1440px]">
          <p
            className="
              text-center
              text-[11px]
              tracking-[0.15em]
              text-[var(--color-text-muted)]
            "
          >
            LOADING COLLECTION...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* FEATURED PIECES */}
      {renderSection({
        id: "featured",
        eyebrow: "CURATED FOR YOU",
        title: "Featured Pieces",
        description:
          "Timeless silhouettes crafted with intention, designed to become part of your everyday story.",
        products: featuredProducts,
        sectionType: "featured",
      })}

      {/* BEST SELLERS */}
      {renderSection({
        id: "best-sellers",
        eyebrow: "MOST LOVED",
        title: "Best Sellers",
        description:
          "Discover the pieces our customers love most, chosen for their timeless appeal and everyday elegance.",
        products: bestSellerProducts,
        sectionType: "bestSeller",
      })}

      {/* NEW ARRIVALS */}
      {renderSection({
        id: "new-arrivals",
        eyebrow: "JUST IN",
        title: "New Arrivals",
        description:
          "Explore the latest silhouettes and refined designs created to bring a fresh touch to your collection.",
        products: newArrivalProducts,
        sectionType: "newArrival",
      })}
    </>
  );
}

export default FeaturedProducts;
