import { FiHeart, FiShoppingBag, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product, badgeText }) {
  const navigate = useNavigate();

  const { toggleCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = product?._id || product?.id;

  const wishlistActive = isInWishlist(productId);
  const cartActive = isInCart(productId);

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
// import { FiHeart, FiShoppingBag } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { useWishlist } from "../../context/WishlistContext";

// function ProductCard({ product, badgeText = "FEATURED" }) {
//   const navigate = useNavigate();

//   const { toggleCart, isInCart } = useCart();
//   const { toggleWishlist, isInWishlist } = useWishlist();

//   const productId = product?._id || product?.id;

//   const wishlistActive = isInWishlist(productId);
//   const cartActive = isInCart(productId);

//   const productImage =
//     product?.thumbnail ||
//     product?.images?.[0] ||
//     product?.variants?.[0]?.images?.[0] ||
//     product?.image ||
//     product?.image_link ||
//     "";

//   const productTitle = product?.title || product?.name || "Product";

//   const finalPrice = product?.salePrice || product?.price || 0;

//   const handleProductClick = () => {
//     navigate(`/product/${productId}`);
//   };

//   const handleWishlistClick = (event) => {
//     event.stopPropagation();
//     toggleWishlist(product);
//   };

//   const handleCartClick = (event) => {
//     event.stopPropagation();
//     toggleCart(product, 1);
//   };

//   return (
//     <article
//       onClick={handleProductClick}
//       className="group cursor-pointer"
//     >
//       {/* PRODUCT IMAGE */}
//       <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-bg-tertiary">
//         <img
//           src={productImage}
//           alt={productTitle}
//           loading="lazy"
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//         />

//         {/* WISHLIST */}
//         <button
//           type="button"
//           onClick={handleWishlistClick}
//           className={`
//             absolute right-3 top-3
//             grid h-8 w-8 place-items-center
//             rounded-full transition shadow-sm
//             ${
//               wishlistActive
//                 ? "bg-dark-section text-white"
//                 : "bg-bg-secondary/90 text-text-primary hover:bg-bg-secondary"
//             }
//           `}
//           aria-label={
//             wishlistActive
//               ? "Remove from wishlist"
//               : "Add to wishlist"
//           }
//         >
//           <FiHeart
//             size={14}
//             strokeWidth={1.5}
//             fill={wishlistActive ? "currentColor" : "none"}
//           />
//         </button>

//         {/* BADGE */}
//         {badgeText && (
//           <span
//             className="
//               absolute left-3 top-3
//               rounded-xs bg-dark-section
//               px-2 py-1
//               text-[9px] font-semibold
//               uppercase tracking-wider
//               text-white
//             "
//           >
//             {badgeText}
//           </span>
//         )}

//         {/* CART BUTTON */}
//         <button
//           type="button"
//           onClick={handleCartClick}
//           className={`
//             absolute bottom-3 left-3 right-3
//             flex h-9 items-center justify-center
//             gap-2 rounded-xs px-3
//             text-xs font-medium tracking-wider
//             shadow-sm transition
//             ${
//               cartActive
//                 ? "bg-dark-section text-white opacity-100"
//                 : "bg-bg-secondary/95 text-text-primary opacity-0 group-hover:opacity-100"
//             }
//           `}
//           aria-label={
//             cartActive
//               ? "Remove from shopping bag"
//               : "Add to shopping bag"
//           }
//         >
//           <FiShoppingBag size={14} className="shrink-0" />

//           <span className="whitespace-nowrap uppercase">
//             {cartActive ? "In Bag ✓" : "Add to Bag"}
//           </span>
//         </button>
//       </div>

//       {/* PRODUCT INFO */}
//       <div className="pt-3">
//         <p
//           className="
//             text-[10px]
//             font-semibold
//             uppercase
//             tracking-widest
//             text-accent
//           "
//         >
//           {product?.subcategory ||
//             product?.category?.name ||
//             product?.category ||
//             "Handbags"}
//         </p>

//         <h3
//           className="
//             mt-1
//             truncate
//             text-sm
//             font-medium
//             text-text-primary
//           "
//         >
//           {productTitle}
//         </h3>

//         <div className="mt-1.5 flex items-center gap-2">
//           <p className="text-sm font-semibold text-text-primary">
//             ₹{Number(finalPrice).toLocaleString("en-IN")}
//           </p>

//           {product?.salePrice &&
//             product?.price &&
//             product.salePrice !== product.price && (
//               <p className="text-xs text-text-secondary line-through">
//                 ₹{Number(product.price).toLocaleString("en-IN")}
//               </p>
//             )}
//         </div>

//         {product?.discountPercentage > 0 && (
//           <p className="mt-1 text-[9px] font-semibold tracking-wider text-accent">
//             {product.discountPercentage}% OFF
//           </p>
//         )}
//       </div>
//     </article>
//   );
// }

// export default ProductCard;