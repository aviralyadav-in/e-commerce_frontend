import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product, badgeText = "FEATURED" }) {
  const navigate = useNavigate();

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = product?._id || product?.id;

  const wishlistActive = isInWishlist(productId);
  const cartActive = isInCart(productId);

  const productImage =
    product?.thumbnail ||
    product?.images?.[0] ||
    product?.variants?.[0]?.images?.[0] ||
    product?.image ||
    product?.image_link ||
    "";

  const productTitle = product?.title || product?.name || "Product";

  const finalPrice = product?.salePrice || product?.price || 0;

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
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
      className="group cursor-pointer"
    >
      {/* PRODUCT IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bg-tertiary">
        <img
          src={productImage}
          alt={productTitle}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlistClick}
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
            wishlistActive
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <FiHeart
            size={14}
            strokeWidth={1.5}
            fill={wishlistActive ? "currentColor" : "none"}
          />
        </button>

        {/* BADGE */}
        {badgeText && (
          <span
            className="
              absolute left-3 top-3
              rounded-xs bg-dark-section
              px-2 py-1
              text-[9px] font-semibold
              uppercase tracking-wider
              text-white
            "
          >
            {badgeText}
          </span>
        )}

        {/* CART BUTTON */}
        <button
          type="button"
          onClick={handleCartClick}
          className={`
            absolute bottom-3 left-3 right-3
            flex h-9 items-center justify-center
            gap-2 rounded-xs px-3
            text-xs font-medium tracking-wider
            shadow-sm transition
            ${
              cartActive
                ? "bg-dark-section text-white opacity-100"
                : "bg-bg-secondary/95 text-text-primary opacity-0 group-hover:opacity-100"
            }
          `}
          aria-label={
            cartActive
              ? "Remove from shopping bag"
              : "Add to shopping bag"
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
          {product?.subcategory ||
            product?.category?.name ||
            product?.category ||
            "Handbags"}
        </p>

        <h3
          className="
            mt-1
            truncate
            text-sm
            font-medium
            text-text-primary
          "
        >
          {productTitle}
        </h3>

        <div className="mt-1.5 flex items-center gap-2">
          <p className="text-sm font-semibold text-text-primary">
            ₹{Number(finalPrice).toLocaleString("en-IN")}
          </p>

          {product?.salePrice &&
            product?.price &&
            product.salePrice !== product.price && (
              <p className="text-xs text-text-secondary line-through">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
            )}
        </div>

        {product?.discountPercentage > 0 && (
          <p className="mt-1 text-[9px] font-semibold tracking-wider text-accent">
            {product.discountPercentage}% OFF
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;