import { useState } from "react";
import {
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
  FiTag,
  FiTruck,
  FiCheckCircle,
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

  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);
  const [promoError, setPromoError] = useState("");

  const totalUnits = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  // Free shipping progress
  const FREE_SHIPPING_LIMIT = 2000;
  const currentAmount = Number(totalAmountAfterDiscount || totalPrice || 0);
  const shippingProgress = Math.min(
    (currentAmount / FREE_SHIPPING_LIMIT) * 100,
    100,
  );

  const amountRemaining = Math.max(FREE_SHIPPING_LIMIT - currentAmount, 0);

  const shipping = cartItems.length > 0 ? 0 : 0;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");

    const cleanCode = promoCode.trim().toUpperCase();

    if (
      cleanCode === "NIYA10" ||
      cleanCode === "FIRST10" ||
      cleanCode === "WELCOME"
    ) {
      setAppliedCode(cleanCode);
      setPromoCode("");
    } else if (cleanCode === "") {
      setPromoError("Please enter a valid coupon code.");
    } else {
      setPromoError("Invalid promo code. Try 'NIYA10'");
    }
  };

  return (
    <main className="min-h-[70vh] bg-bg-primary px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1150px]">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-semibold tracking-widest text-accent uppercase">
            YOUR SELECTION
          </p>

          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Shopping Bag
          </h1>

          <p className="mx-auto mt-2 max-w-[420px] text-xs leading-relaxed text-text-secondary">
            Handcrafted luxury pieces chosen to become part of your story.
          </p>
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="mx-auto flex max-w-[580px] flex-col items-center border border-border-soft bg-bg-secondary px-6 py-16 text-center rounded-sm shadow-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
              <FiShoppingBag size={26} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-text-primary">
              Your shopping bag is empty
            </h2>

            <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-text-secondary">
              Discover a piece that feels unmistakably yours and add it to your
              collection.
            </p>

            <Link
              to="/shop"
              className="mt-8 flex h-11 items-center gap-2 border border-text-primary bg-bg-primary px-7 text-xs font-semibold tracking-widest text-text-primary transition hover:bg-accent hover:text-white hover:border-accent rounded-xs"
            >
              EXPLORE COLLECTION
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* CART ITEMS LIST */}
            <div className="space-y-6">
              {/* SHIPPING PROGRESS */}
              <div className="border border-border-soft bg-bg-secondary px-5 py-4 rounded-sm shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FiTruck className="text-accent" size={15} />

                    <span className="text-xs font-medium text-text-primary">
                      {amountRemaining > 0
                        ? `Add ₹${amountRemaining.toLocaleString(
                            "en-IN",
                          )} more for FREE shipping`
                        : "Free shipping unlocked!"}
                    </span>
                  </div>

                  <span className="hidden text-[10px] font-semibold tracking-wider text-accent uppercase sm:block">
                    3–5 DAYS
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] text-text-muted">
                    Shipping progress
                  </span>

                  <span className="text-[9px] font-semibold text-accent">
                    {Math.round(shippingProgress)}%
                  </span>
                </div>
              </div>

              {/* SHIPPING ANNOUNCEMENT */}
              <div className="flex items-center justify-between border border-border-soft bg-accent-soft/60 px-5 py-3.5 rounded-sm text-xs text-text-primary">
                <div className="flex items-center gap-3">
                  <FiTruck className="text-accent text-base shrink-0" />

                  <span>
                    <strong>Free Domestic Shipping</strong> on your selection!
                  </span>
                </div>

                <span className="text-[10px] font-semibold text-accent uppercase tracking-wider hidden sm:inline">
                  3–5 DAYS DELIVERY
                </span>
              </div>

              {/* CART TABLE */}
              <div className="border border-border-soft bg-bg-secondary rounded-sm overflow-hidden shadow-sm">
                {/* CART HEADER */}
                <div className="border-b border-border-soft px-5 py-4 flex items-center justify-between bg-bg-primary/50">
                  <div>
                    <p className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                      BAG ITEMS
                    </p>

                    <p className="mt-1 text-xs text-text-secondary">
                      Total {cartItems.length}{" "}
                      {cartItems.length === 1 ? "Item" : "Items"} ({totalUnits}{" "}
                      {totalUnits === 1 ? "Unit" : "Units"})
                    </p>
                  </div>

                  <Link
                    to="/shop"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    + Add More
                  </Link>
                </div>

                {/* ITEMS */}
                {cartItems.map((item) => {
                  const product = item.product;
                  const itemPrice = Number(product?.price || 0);

                  return (
                    <div
                      key={item._id || product?._id || product?.id}
                      className="flex gap-4 border-b border-border-soft p-5 last:border-b-0 md:gap-6"
                    >
                      {/* IMAGE */}
                      <div className="h-28 w-24 shrink-0 overflow-hidden bg-bg-tertiary rounded-xs md:h-32 md:w-28 border border-border-soft">
                        <img
                          src={
                            product?.images?.[0] ||
                            product?.thumbnail ||
                            "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg"
                          }
                          alt={product?.name || product?.title || "Product"}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[9px] font-semibold uppercase tracking-widest text-accent">
                              {product?.category ||
                                product?.subcategory ||
                                "HANDBAG"}
                            </p>

                            <span className="text-xs font-semibold text-text-primary">
                              ₹
                              {(itemPrice * item.quantity).toLocaleString(
                                "en-IN",
                              )}
                            </span>
                          </div>

                          <h3 className="mt-1 font-serif text-lg text-text-primary line-clamp-1">
                            {product?.name || product?.title}
                          </h3>

                          <p className="mt-1 text-xs text-text-secondary">
                            ₹{itemPrice.toLocaleString("en-IN")} each
                          </p>
                        </div>

                        {/* QUANTITY */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex h-8 items-center border border-border-soft rounded-xs bg-bg-primary">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(product?._id || product?.id)
                              }
                              className="flex h-full w-8 items-center justify-center text-text-secondary transition hover:bg-accent-soft hover:text-accent"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus size={11} />
                            </button>

                            <span className="w-8 text-center text-xs font-semibold text-text-primary">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(product?._id || product?.id)
                              }
                              className="flex h-full w-8 items-center justify-center text-text-secondary transition hover:bg-accent-soft hover:text-accent"
                              aria-label="Increase quantity"
                            >
                              <FiPlus size={11} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(product?._id || product?.id)
                            }
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
                            aria-label="Remove item"
                          >
                            <FiTrash2 size={14} />

                            <span className="hidden sm:inline text-[11px]">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="space-y-5">
              <div className="border border-border-soft bg-bg-secondary p-6 rounded-sm shadow-sm">
                <p className="mb-4 text-[10px] font-semibold tracking-widest text-accent uppercase">
                  ORDER BREAKDOWN
                </p>

                <div className="space-y-3.5 border-b border-border-soft pb-5 text-xs">
                  <div className="flex justify-between text-text-secondary">
                    <span>Total Products</span>

                    <span className="font-semibold text-text-primary">
                      {cartItems.length} Items
                    </span>
                  </div>

                  <div className="flex justify-between text-text-secondary">
                    <span>Total Units</span>

                    <span className="font-semibold text-text-primary">
                      {totalUnits} Pieces
                    </span>
                  </div>

                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>

                    <span className="font-semibold text-text-primary">
                      ₹{Number(totalPrice || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {appliedCode && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span className="flex items-center gap-1">
                        <FiCheckCircle size={12} />
                        Promo ({appliedCode})
                      </span>

                      <span>-10% Applied</span>
                    </div>
                  )}

                  {Number(discountAmount || 0) > 0 && (
                    <div className="flex justify-between text-accent font-medium">
                      <span>Discount</span>

                      <span>
                        -₹
                        {Number(discountAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-text-secondary">
                    <span>Estimated Shipping</span>

                    <span className="font-semibold text-emerald-600">FREE</span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="flex justify-between py-5 text-text-primary">
                  <div>
                    <span className="font-serif text-xl font-semibold">
                      Grand Total
                    </span>

                    <p className="text-[10px] text-text-muted">
                      Includes all taxes
                    </p>
                  </div>

                  <span className="font-serif text-xl font-semibold text-accent">
                    ₹
                    {Number(
                      totalAmountAfterDiscount || totalPrice || 0,
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* PROMO */}
                <form onSubmit={handleApplyPromo} className="mb-5">
                  <label className="mb-1.5 block text-[10px] font-semibold tracking-wider text-text-secondary uppercase">
                    PROMO / GIFT CODE
                  </label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <FiTag
                        className="absolute left-3 top-3 text-text-muted"
                        size={14}
                      />

                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try 'NIYA10'"
                        className="h-10 w-full border border-border-soft bg-bg-primary pl-9 pr-3 text-xs text-text-primary uppercase outline-none focus:border-text-primary rounded-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="h-10 bg-bg-tertiary px-4 text-xs font-semibold text-text-primary border border-border-soft hover:bg-accent-soft transition rounded-xs"
                    >
                      APPLY
                    </button>
                  </div>

                  {promoError && (
                    <p className="mt-1.5 text-[10px] text-red-500 font-medium">
                      {promoError}
                    </p>
                  )}

                  {appliedCode && (
                    <p className="mt-1.5 text-[10px] text-emerald-600 font-medium">
                      Coupon '{appliedCode}' applied successfully!
                    </p>
                  )}
                </form>

                {/* CHECKOUT */}
                <Link
                  to="/order"
                  className="flex h-12 w-full items-center justify-center gap-2 border border-text-primary bg-bg-primary text-xs font-semibold tracking-widest text-text-primary transition hover:bg-accent hover:text-white hover:border-accent rounded-xs shadow-sm"
                >
                  PROCEED TO ORDER
                  <FiArrowRight size={14} />
                </Link>
                <p className="mt-4 text-center text-[10px] leading-relaxed text-text-muted">
                  🔒 Safe & Encrypted Checkout • Complimentary Shipping
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
