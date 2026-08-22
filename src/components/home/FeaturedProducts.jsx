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
            relative aspect-[4/5] overflow-hidden rounded-sm
            bg-bg-tertiary
          "
        >
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            loading="lazy"
            className="
              h-full w-full object-cover
              transition duration-500
              group-hover:scale-105
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
              rounded-full transition shadow-sm
              ${
                wishlistActive
                  ? "bg-dark-section text-white"
                  : "bg-bg-secondary/90 text-text-primary hover:bg-bg-secondary"
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
              bg-dark-section
              px-2 py-1
              text-[9px] font-semibold
              tracking-wider uppercase
              text-white rounded-xs
            "
          >
            {badgeText}
          </span>

          {/* CART BUTTON */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleCart(product, 1);
            }}
            className={`
              absolute bottom-3 left-3 right-3
              flex h-9 items-center justify-center
              gap-2 px-3 text-xs font-medium tracking-wider
              transition rounded-xs shadow-sm

              ${
                cartActive
                  ? "bg-dark-section text-white opacity-100"
                  : "bg-bg-secondary/95 text-text-primary opacity-0 group-hover:opacity-100"
              }
            `}
            aria-label={
              cartActive ? "Remove from shopping bag" : "Add to shopping bag"
            }
          >
            <FiShoppingBag size={14} className="shrink-0" />

            <span className="whitespace-nowrap uppercase">
              {cartActive ? "In Bag ✓" : "Add to Bag"}
            </span>
          </button>
        </div>

        {/* PRODUCT INFO */}
        <div className="pt-3">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-widest
              text-accent
            "
          >
            {product.subcategory || product.category?.name || "Handbags"}
          </p>

          <h3
            className="
              mt-1
              text-sm
              font-medium
              text-text-primary
              truncate
            "
          >
            {product.title}
          </h3>

          <p
            className="
              mt-1.5
              text-sm
              font-semibold
              text-text-primary
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
          bg-bg-secondary
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
                  tracking-widest
                  text-accent
                "
              >
                {eyebrow}
              </p>

              <h2
                className="
                  font-serif
                  text-3xl
                  font-medium
                  text-text-primary
                  md:text-4xl
                "
              >
                {title}
              </h2>

              <p
                className="
                  mt-2
                  max-w-[560px]
                  text-xs
                  leading-relaxed
                  text-text-muted
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
                border-accent
                pb-1
                text-sm
                font-semibold
                text-text-primary
                transition
                hover:opacity-70
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
                text-xs
                text-text-muted
              "
            >
              No products available.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
