import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

import { enrichedProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function SalePage() {
  // ===============================
  // CART
  // ===============================
  const { toggleCart, isInCart } = useCart();

  // ===============================
  // WISHLIST
  // ===============================
  const { toggleWishlist, isInWishlist } = useWishlist();

  // ===============================
  // GET ONLY SALE PRODUCTS
  // ===============================
  const saleProducts = enrichedProducts.filter((product) => product.isOnSale);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[9px] font-semibold tracking-[0.24em] text-[var(--color-accent)]">
                LIMITED OFFERS
              </p>

              <h1 className="font-serif text-3xl leading-none md:text-5xl">
                Sale
              </h1>
            </div>

            <p className="max-w-[420px] text-[10px] leading-5 text-[var(--color-text-muted)] md:text-right">
              Discover selected Niya Bags at special prices.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
            {saleProducts.length} PRODUCTS ON SALE
          </p>
        </div>

        {saleProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              No sale products available right now.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-block border border-[var(--color-border)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
            {saleProducts.map((product) => {
              const isWishlisted = isInWishlist(product.id);
              const isAddedToCart = isInCart(product.id);

              const productImage =
                product.thumbnail || product.images?.[0] || product.image;

              const finalPrice = product.salePrice || product.price || 0;

              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  {/* ================= IMAGE ================= */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]">
                    <img
                      src={productImage}
                      alt={product.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    {/* SALE BADGE */}
                    {product.isOnSale && (
                      <span className="absolute left-3 top-3 bg-[var(--color-accent)] px-2.5 py-1 text-[8px] font-semibold tracking-[0.14em] text-white">
                        SALE
                      </span>
                    )}

                    {/* WISHLIST */}
                    <button
                      type="button"
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.title} from wishlist`
                          : `Add ${product.title} to wishlist`
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        toggleWishlist(product);
                      }}
                      className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-secondary)]/90 transition ${
                        isWishlisted
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                      }`}
                    >
                      <FiHeart
                        size={15}
                        strokeWidth={1.4}
                        fill={isWishlisted ? "currentColor" : "none"}
                      />
                    </button>

                    {/* CART */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        toggleCart(product, 1);
                      }}
                      className={`absolute bottom-3 left-3 right-3 flex h-9 items-center justify-center gap-2 text-[9px] font-semibold tracking-[0.12em] transition ${
                        isAddedToCart
                          ? "bg-[var(--color-accent)] text-white hover:opacity-90"
                          : "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent)]"
                      }`}
                    >
                      <FiShoppingBag size={13} strokeWidth={1.5} />

                      {isAddedToCart ? "REMOVE FROM BAG" : "ADD TO BAG"}
                    </button>
                  </div>

                  {/* ================= PRODUCT INFO ================= */}
                  <div className="pt-3.5">
                    <p className="mb-1 text-[8px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
                      {product.subcategory || "Bags"}
                    </p>

                    <h2 className="line-clamp-1 text-xs font-medium text-[var(--color-text-primary)]">
                      {product.title}
                    </h2>

                    {/* PRICE */}
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-[11px] text-[var(--color-text-primary)]">
                        ₹{Number(finalPrice).toLocaleString("en-IN")}
                      </p>

                      {product.salePrice &&
                        product.price &&
                        product.salePrice !== product.price && (
                          <p className="text-[9px] text-[var(--color-text-muted)] line-through">
                            ₹{Number(product.price).toLocaleString("en-IN")}
                          </p>
                        )}
                    </div>

                    {/* DISCOUNT */}
                    {product.discountPercentage > 0 && (
                      <p className="mt-1 text-[9px] font-semibold tracking-[0.08em] text-[var(--color-accent)]">
                        {product.discountPercentage}% OFF
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default SalePage;
