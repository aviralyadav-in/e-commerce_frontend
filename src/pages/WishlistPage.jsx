import { useEffect, useState } from "react";
import { FiArrowRight, FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("niyaWishlist") || "[]",
    );

    setWishlistItems(savedWishlist);
  }, []);

  // ===============================
  // REMOVE FROM WISHLIST
  // ===============================
  function removeFromWishlist(productId) {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId,
    );

    setWishlistItems(updatedWishlist);

    localStorage.setItem("niyaWishlist", JSON.stringify(updatedWishlist));
  }

  // ===============================
  // ADD TO CART
  // ===============================
  function addToCart(product) {
    const existingCart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("niyaCart", JSON.stringify(updatedCart));
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
          /* PRODUCTS */
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <article
                key={item.id}
                className="group border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-tertiary)]">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  {/* REMOVE */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg-secondary)]/90 text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-secondary)]"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 size={13} strokeWidth={1.3} />
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <p className="text-[9px] tracking-[0.12em] text-[var(--color-accent)]">
                    {item.category?.name || "Bags"}
                  </p>

                  <h3 className="mt-1 font-serif text-base text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[11px] font-medium text-[var(--color-text-secondary)]">
                    ₹{Math.round(item.price * 83).toLocaleString("en-IN")}
                  </p>

                  {/* ADD TO BAG */}
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="mt-5 flex h-9 w-full items-center justify-center gap-2 bg-[var(--color-button-primary)] text-[9px] font-semibold tracking-[0.1em] text-white transition hover:bg-[var(--color-button-primary-hover)]"
                  >
                    <FiShoppingBag size={13} />
                    ADD TO BAG
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default WishlistPage;
