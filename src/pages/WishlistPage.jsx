import { useEffect, useState } from "react";
import { FiArrowRight, FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const { cartItems, addToCart, removeFromCart } = useCart();

  // ===============================
  // LOAD WISHLIST
  // ===============================
  useEffect(() => {
    function loadWishlist() {
      try {
        const savedWishlist = JSON.parse(
          localStorage.getItem("niyaWishlist") || "[]",
        );

        setWishlistItems(Array.isArray(savedWishlist) ? savedWishlist : []);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        setWishlistItems([]);
      }
    }

    loadWishlist();

    window.addEventListener("niyaWishlistUpdated", loadWishlist);

    return () => {
      window.removeEventListener("niyaWishlistUpdated", loadWishlist);
    };
  }, []);

  // ===============================
  // REMOVE FROM WISHLIST
  // ===============================
  function removeFromWishlist(productId) {
    const updatedWishlist = wishlistItems.filter(
      (item) => String(item.id) !== String(productId),
    );

    setWishlistItems(updatedWishlist);

    localStorage.setItem("niyaWishlist", JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event("niyaWishlistUpdated"));
  }

  // ===============================
  // TOGGLE CART
  // ===============================
  function handleCartToggle(product) {
    const alreadyInCart = cartItems.some(
      (item) => String(item.id) === String(product.id),
    );

    if (alreadyInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product, 1);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[var(--color-bg-primary)] px-5 py-6 text-[var(--color-text-primary)] md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
            SAVED FOR YOU
          </p>

          <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
            Your Wishlist
          </h1>

          <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-[var(--color-text-secondary)]">
            A collection of pieces you would love to carry.
          </p>
        </div>

        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (
          <div className="mx-auto flex max-w-[600px] flex-col items-center border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] px-6 py-16 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <FiHeart size={25} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">
              Nothing saved yet
            </h2>

            <p className="mt-3 max-w-[360px] text-[11px] leading-6 text-[var(--color-text-secondary)]">
              Keep the pieces you love close. Your wishlist will hold them here
              until you are ready.
            </p>

            <Link
              to="/"
              className="mt-8 flex h-11 items-center gap-2 bg-[var(--color-button-primary)] px-7 text-[10px] font-semibold tracking-[0.12em] text-white transition hover:bg-[var(--color-button-primary-hover)]"
            >
              DISCOVER NIYA
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => {
              const image =
                item.thumbnail ||
                item.images?.[0] ||
                item.image ||
                item.image_link;

              const finalPrice = item.salePrice || item.price || 0;

              const alreadyInCart = cartItems.some(
                (cartItem) => String(cartItem.id) === String(item.id),
              );

              return (
                <article
                  key={item.id}
                  className="group border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]"
                >
                  {/* IMAGE */}
                  <Link
                    to={`/product/${item.id}`}
                    className="relative block aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]"
                  >
                    <img
                      src={image}
                      alt={item.title || item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    {/* REMOVE WISHLIST */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        removeFromWishlist(item.id);
                      }}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-secondary)]/90 text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-secondary)]"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 size={13} strokeWidth={1.3} />
                    </button>
                  </Link>

                  {/* DETAILS */}
                  <div className="p-4">
                    <p className="text-[9px] tracking-[0.12em] text-[var(--color-accent)]">
                      {item.category?.name ||
                        item.subcategory ||
                        item.category ||
                        "Bags"}
                    </p>

                    <Link to={`/product/${item.id}`}>
                      <h3 className="mt-1 font-serif text-base text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]">
                        {item.title || item.name}
                      </h3>
                    </Link>

                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">
                        ₹{Number(finalPrice).toLocaleString("en-IN")}
                      </p>

                      {item.salePrice &&
                        item.price &&
                        item.salePrice !== item.price && (
                          <p className="text-[10px] text-[var(--color-text-muted)] line-through">
                            ₹{Number(item.price).toLocaleString("en-IN")}
                          </p>
                        )}
                    </div>

                    {/* ADD / REMOVE CART */}
                    <button
                      type="button"
                      onClick={() => handleCartToggle(item)}
                      className={`mt-5 flex h-10 w-full items-center justify-center gap-2 border text-[10px] font-semibold tracking-[0.1em] transition ${
                        alreadyInCart
                          ? "border-black bg-white text-black hover:bg-gray-100"
                          : "border-black bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <FiShoppingBag size={13} />

                      {alreadyInCart ? "REMOVE FROM BAG" : "ADD TO BAG"}
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
