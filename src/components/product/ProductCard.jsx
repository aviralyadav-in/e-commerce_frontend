import { FiHeart, FiShoppingBag, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product, badgeText }) {
  const navigate = useNavigate();

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Database standard ID rule (Sirf 'id', koi _id nahi)
  const productId = product?.id;

  // Wishlist aur Cart status check using standard rules
  const wishlistActive = isInWishlist(product);
  const cartActive = isInCart(product || productId);

  // Fallback Dynamic Image Resolver
  const productImage =
    product?.thumbnail ||
    product?.images?.[0] ||
    product?.variants?.[0]?.images?.[0] ||
    product?.image ||
    product?.image_link ||
    "";

  const productTitle = product?.title || product?.name || "Product";

  // Price Calculation Logic
  const priceOriginal = Number(product?.price || 0);
  const priceSale = product?.salePrice ? Number(product.salePrice) : null;
  const finalPrice = priceSale && priceSale < priceOriginal ? priceSale : priceOriginal;
  const hasDiscount = Boolean(priceSale && priceSale < priceOriginal);

  const discountPercentage =
    product?.discountPercentage ||
    (hasDiscount ? Math.round(((priceOriginal - priceSale) / priceOriginal) * 100) : 0);

  const handleProductClick = () => {
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  const handleWishlistClick = (event) => {
    event.stopPropagation();
    toggleWishlist(product);
  };

  const handleCartClick = (event) => {
    event.stopPropagation();
    toggleCart(product, 1);
  };

  return (
    <article
      onClick={handleProductClick}
      className="group flex flex-col justify-between overflow-hidden rounded-md border border-border-theme bg-bg-secondary p-2.5 shadow-xs transition hover:shadow-md cursor-pointer"
    >
      {/* 1. TOP IMAGE CONTAINER */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xs bg-bg-tertiary">
        <img
          src={productImage}
          alt={productTitle}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* COMPACT PROMO BADGE */}
        {(badgeText || product?.isOnSale || hasDiscount) && (
          <span className="absolute left-2 top-2 rounded-xs bg-dark-section px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase text-white shadow-xs">
            {badgeText || (hasDiscount ? `${discountPercentage}% OFF` : "SALE")}
          </span>
        )}

        {/* COMPACT WISHLIST BUTTON */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full transition shadow-xs ${
            wishlistActive
              ? "bg-dark-section text-white"
              : "bg-bg-secondary/90 text-text-primary hover:bg-bg-secondary"
          }`}
          aria-label={wishlistActive ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            size={13}
            strokeWidth={1.5}
            fill={wishlistActive ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* 2. DETAILS & BOTTOM ACTION ROW */}
      <div className="flex flex-1 flex-col justify-between pt-2.5">
        {/* TITLE ONLY (MAX 2 LINES) */}
        <h3 className="line-clamp-2 text-xs font-medium leading-snug text-text-primary min-h-[32px]">
          {productTitle}
        </h3>

        {/* PRICING + SIDE ADD BUTTON ROW */}
        <div className="mt-2 flex items-end justify-between gap-1 border-t border-border-soft pt-2">
          {/* PRICE COL */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-text-primary">
                ₹{finalPrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-[10px] text-text-muted line-through">
                  ₹{priceOriginal.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="text-[9px] font-semibold text-accent">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* SIDE-ALIGNED ADD BUTTON */}
          <button
            type="button"
            onClick={handleCartClick}
            className={`flex h-7 items-center justify-center gap-1 rounded-xs px-2.5 text-[10px] font-semibold tracking-wider transition ${
              cartActive
                ? "bg-accent text-white"
                : "bg-dark-section text-white hover:opacity-95"
            }`}
            aria-label={cartActive ? "Item in bag" : "Add to bag"}
          >
            {cartActive ? (
              <>
                <FiCheck size={12} />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <FiShoppingBag size={12} />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;