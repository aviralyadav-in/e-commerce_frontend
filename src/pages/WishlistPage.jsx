import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiHeart,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { getAllProducts } from "../api/productApi";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    toggleCart,
    isInCart,
  } = useCart();

  const {
    wishlistItems,
    removeFromWishlist,
  } = useWishlist();

  // ============================================================
  // FETCH PRODUCTS FROM PRODUCT API
  // ============================================================

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getAllProducts();

        if (!mounted) {
          return;
        }

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          "WISHLIST PRODUCT FETCH ERROR:",
          error,
        );

        if (mounted) {
          setProducts([]);
        }
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

  // ============================================================
  // GET WISHLIST PRODUCTS
  // ============================================================

  const wishlistProducts = products.filter((product) => {
    const productId = product?._id || product?.id;

    return wishlistItems.some(
      (wishlistId) =>
        String(wishlistId) === String(productId),
    );
  });

  // ============================================================
  // REMOVE FROM WISHLIST
  // ============================================================

  const handleRemoveWishlist = (event, productId) => {
    event.preventDefault();
    event.stopPropagation();

    removeFromWishlist(productId);
  };

  // ============================================================
  // CART TOGGLE
  // ============================================================

  const handleCartToggle = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    toggleCart(product, 1);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-bg-primary px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-accent">
              SAVED FOR YOU
            </p>

            <h1 className="font-serif text-[34px] font-medium text-text-primary md:text-[40px]">
              Your Wishlist
            </h1>
          </div>

          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-xs text-text-secondary">
              Loading wishlist...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // EMPTY WISHLIST
  // ============================================================

  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-bg-primary px-5 py-6 text-text-primary md:px-10 md:py-10">
        <div className="mx-auto max-w-[1100px]">

          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-accent">
              SAVED FOR YOU
            </p>

            <h1 className="font-serif text-[34px] font-medium text-text-primary md:text-[40px]">
              Your Wishlist
            </h1>

            <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-text-secondary">
              A collection of pieces you would love to carry.
            </p>
          </div>

          <div className="mx-auto flex max-w-[600px] flex-col items-center border border-border-soft bg-bg-secondary px-6 py-16 text-center">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
              <FiHeart size={25} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-text-primary">
              Nothing saved yet
            </h2>

            <p className="mt-3 max-w-[360px] text-[11px] leading-6 text-text-secondary">
              Keep the pieces you love close. Your wishlist will
              hold them here until you are ready.
            </p>

            <Link
              to="/shop"
              className="mt-8 flex h-11 items-center gap-2 bg-dark-section px-7 text-[10px] font-semibold tracking-[0.12em] text-white transition hover:opacity-90"
            >
              DISCOVER NIYA
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // WISHLIST
  // ============================================================

  return (
    <main className="min-h-[70vh] bg-bg-primary px-5 py-6 text-text-primary md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">

        {/* HEADER */}

        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-accent">
            SAVED FOR YOU
          </p>

          <h1 className="font-serif text-[34px] font-medium text-text-primary md:text-[40px]">
            Your Wishlist
          </h1>

          <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-text-secondary">
            A collection of pieces you would love to carry.
          </p>
        </div>

        {/* PRODUCTS */}

        {wishlistProducts.length === 0 ? (
          <div className="mx-auto max-w-[600px] border border-border-soft bg-bg-secondary px-6 py-12 text-center">
            <p className="text-xs text-text-secondary">
              Wishlist products are no longer available.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex h-10 items-center gap-2 bg-dark-section px-6 text-[10px] font-semibold tracking-wider text-white"
            >
              CONTINUE SHOPPING
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {wishlistProducts.map((product) => {
              const productId =
                product?._id || product?.id;

              /*
               * IMPORTANT:
               * Your current product structure has images inside:
               *
               * variants[0].images[0]
               *
               * So this fallback handles that.
               */

              const productImage =
                product?.thumbnail ||
                product?.images?.[0] ||
                product?.variants?.[0]?.images?.[0] ||
                product?.image ||
                product?.image_link ||
                "";

              const productTitle =
                product?.title ||
                product?.name ||
                "Product";

              const finalPrice =
                product?.salePrice ||
                product?.price ||
                0;

              const alreadyInCart =
                isInCart(productId);

              return (
                <article
                  key={productId}
                  className="group overflow-hidden border border-border-soft bg-bg-secondary"
                >

                  {/* IMAGE */}

                  <Link
                    to={`/product/${productId}`}
                    className="relative block aspect-[4/5] overflow-hidden bg-bg-tertiary"
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={productTitle}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-text-muted">
                        No Image
                      </div>
                    )}

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={(event) =>
                        handleRemoveWishlist(
                          event,
                          productId,
                        )
                      }
                      className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-bg-secondary/90 text-text-primary shadow-sm transition hover:bg-bg-secondary"
                      aria-label={`Remove ${productTitle} from wishlist`}
                    >
                      <FiTrash2
                        size={13}
                        strokeWidth={1.3}
                      />
                    </button>
                  </Link>

                  {/* DETAILS */}

                  <div className="p-4">

                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-accent">
                      {product?.subcategory ||
                        product?.category?.name ||
                        product?.category ||
                        "Handbags"}
                    </p>

                    <Link
                      to={`/product/${productId}`}
                    >
                      <h3 className="mt-1 truncate font-serif text-base text-text-primary transition hover:text-accent">
                        {productTitle}
                      </h3>
                    </Link>

                    {/* PRICE */}

                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[11px] font-medium text-text-secondary">
                        ₹
                        {Number(finalPrice).toLocaleString(
                          "en-IN",
                        )}
                      </p>

                      {product?.salePrice &&
                        product?.price &&
                        Number(product.salePrice) !==
                          Number(product.price) && (
                          <p className="text-[10px] text-text-muted line-through">
                            ₹
                            {Number(
                              product.price,
                            ).toLocaleString("en-IN")}
                          </p>
                        )}
                    </div>

                    {/* CART */}

                    <button
                      type="button"
                      onClick={(event) =>
                        handleCartToggle(
                          event,
                          product,
                        )
                      }
                      className={`mt-5 flex h-10 w-full items-center justify-center gap-2 border text-[10px] font-semibold tracking-[0.1em] transition ${
                        alreadyInCart
                          ? "border-text-primary bg-bg-primary text-text-primary hover:bg-bg-tertiary"
                          : "border-dark-section bg-dark-section text-white hover:opacity-90"
                      }`}
                    >
                      <FiShoppingBag size={13} />

                      {alreadyInCart
                        ? "REMOVE FROM BAG"
                        : "ADD TO BAG"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default WishlistPage;