import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
} from "../../api/api";

import ProductCard from "../product/ProductCard";

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD PRODUCTS
  // ===============================

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const [featured, bestSellers, newArrivals] =
          await Promise.all([
            getFeaturedProducts(),
            getBestSellerProducts(),
            getNewArrivalProducts(),
          ]);

        if (mounted) {
          // Homepage: show only first 4
          setFeaturedProducts(
            Array.isArray(featured) ? featured.slice(0, 4) : [],
          );

          setBestSellerProducts(
            Array.isArray(bestSellers) ? bestSellers.slice(0, 4) : [],
          );

          setNewArrivalProducts(
            Array.isArray(newArrivals) ? newArrivals.slice(0, 4) : [],
          );
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

    const badgeMap = {
      featured: "FEATURED",
      bestSeller: "BEST SELLER",
      newArrival: "NEW",
    };

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
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badgeText={badgeMap[sectionType]}
                />
              ))}
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
          bg-bg-secondary
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
              text-text-muted
            "
          >
            LOADING COLLECTION...
          </p>
        </div>
      </section>
    );
  }

  // ===============================
  // RENDER
  // ===============================

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