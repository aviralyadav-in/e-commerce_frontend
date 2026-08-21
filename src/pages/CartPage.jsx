import {
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    totalPrice,
    discountAmount,
    totalAmountAfterDiscount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const shipping = cartItems.length > 0 ? 0 : 0;

  return (
    <main className="min-h-[70vh] bg-[var(--color-bg-primary)] px-5 py-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}

        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
            YOUR SELECTION
          </p>

          <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
            Shopping Bag
          </h1>

          <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-[var(--color-text-secondary)]">
            Pieces chosen to become part of your story.
          </p>
        </div>

        {/* EMPTY CART */}

        {cartItems.length === 0 ? (
          <div className="mx-auto flex max-w-[600px] flex-col items-center border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] px-6 py-16 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <FiShoppingBag size={25} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">
              Your bag is waiting
            </h2>

            <p className="mt-3 max-w-[360px] text-[11px] leading-6 text-[var(--color-text-secondary)]">
              Discover a piece that feels unmistakably yours and add it to your
              collection.
            </p>

            <Link
              to="/"
              className="mt-8 flex h-11 items-center gap-2 bg-[var(--color-text-primary)] px-7 text-[10px] font-semibold tracking-[0.12em] text-[var(--color-bg-primary)] transition hover:bg-[var(--color-accent)]"
            >
              EXPLORE COLLECTION
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* CART ITEMS */}

            <div className="border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]">
              <div className="border-b border-[var(--color-border-soft)] px-5 py-4">
                <p className="text-[9px] font-semibold tracking-[0.18em] text-[var(--color-accent)]">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "PIECE" : "PIECES"}
                </p>
              </div>

              {cartItems.map((item) => {
                const product = item.product;

                return (
                  <div
                    key={item._id || product?._id}
                    className="flex gap-4 border-b border-[var(--color-border-soft)] p-5 last:border-b-0 md:gap-6"
                  >
                    {/* IMAGE */}

                    <div className="h-28 w-24 shrink-0 overflow-hidden bg-[var(--color-bg-tertiary)] md:h-32 md:w-28">
                      <img
                        src={product?.images?.[0]}
                        alt={product?.name || "Product"}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                          Bags
                        </p>

                        <h3 className="mt-1 font-serif text-lg text-[var(--color-text-primary)]">
                          {product?.name}
                        </h3>

                        <p className="mt-2 text-[11px] font-medium text-[var(--color-text-secondary)]">
                          ₹{Number(product?.price || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* CONTROLS */}

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex h-8 items-center border border-[var(--color-border-soft)]">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(product?._id)}
                            className="flex h-full w-8 items-center justify-center text-[var(--color-text-secondary)] transition hover:bg-[var(--color-accent-soft)]"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={11} />
                          </button>

                          <span className="w-8 text-center text-[11px] text-[var(--color-text-primary)]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(product?._id)}
                            className="flex h-full w-8 items-center justify-center text-[var(--color-text-secondary)] transition hover:bg-[var(--color-accent-soft)]"
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product?._id)}
                          className="text-[#9a7777] transition hover:text-[var(--color-text-primary)]"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={15} strokeWidth={1.3} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}

            <div className="h-fit border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6">
              <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)]">
                ORDER SUMMARY
              </p>

              <div className="space-y-4 border-b border-[var(--color-border-soft)] pb-5 text-[11px]">
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Subtotal</span>

                  <span className="text-[var(--color-text-primary)]">
                    ₹{Number(totalPrice || 0).toLocaleString("en-IN")}
                  </span>
                </div>

                {Number(discountAmount || 0) > 0 && (
                  <div className="flex justify-between text-[var(--color-text-secondary)]">
                    <span>Discount</span>

                    <span className="text-[var(--color-accent)]">
                      -₹
                      {Number(discountAmount || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Shipping</span>

                  <span className="text-[var(--color-text-primary)]">
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-5 font-medium text-[var(--color-text-primary)]">
                <span className="font-serif text-lg">Total</span>

                <span>
                  ₹
                  {Number(totalAmountAfterDiscount || 0).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>

              <Link
                to="/order"
                className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[10px] font-semibold tracking-[0.12em] text-[var(--color-bg-primary)] transition hover:bg-[var(--color-accent)]"
              >
                PROCEED TO ORDER
                <FiArrowRight size={14} />
              </Link>

              <p className="mt-4 text-center text-[9px] leading-5 text-[var(--color-text-muted)]">
                Complimentary shipping on your Niya selection.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
