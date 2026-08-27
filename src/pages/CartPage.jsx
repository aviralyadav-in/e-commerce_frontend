import { useEffect, useState } from "react";

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
import { getAllProducts } from "../api/productApi";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);
  const [promoError, setPromoError] = useState("");

  // ============================================================
  // FETCH PRODUCTS FROM PRODUCT API
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoadingProducts(true);

        const data = await getAllProducts();

        if (!isMounted) return;

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("CART PRODUCTS FETCH ERROR:", error);

        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // ============================================================
  // FIND PRODUCT FROM API DATA
  // ============================================================

  const getProductId = (product) => {
    return product?._id || product?.id;
  };

  const getCartProduct = (item) => {
    const rawCartId =
      item?.product?._id ||
      item?.product?.id ||
      item?.productId ||
      item?._id ||
      item?.id ||
      item;

    const cartIdStr = String(rawCartId);

    const baseProductId = cartIdStr.includes("-")
      ? cartIdStr.split("-")[0]
      : cartIdStr;

    return products.find((product) => {
      const productId = String(getProductId(product) || "");

      return productId === baseProductId || productId === cartIdStr;
    });
  };

  // ============================================================
  // PRODUCT IMAGE & VARIANT DETAILS
  // ============================================================

  const getProductImage = (product, item) => {
    if (!product && !item) return "";

    if (item?.variant?.images?.[0]) {
      return item.variant.images[0];
    }

    return (
      product?.thumbnail ||
      product?.images?.[0] ||
      product?.variants?.[0]?.images?.[0] ||
      product?.image ||
      product?.image_link ||
      ""
    );
  };

  // ============================================================
  // DYNAMIC CART CALCULATIONS
  // ============================================================

  const totalUnits = cartItems.reduce(
    (sum, item) => sum + Number(item?.quantity || 1),
    0,
  );

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getCartProduct(item);

    const itemPrice = Number(
      item?.variant?.price ||
        product?.price ||
        item?.product?.price ||
        0,
    );

    const quantity = Number(item?.quantity || 1);

    return sum + itemPrice * quantity;
  }, 0);

  // Unique products / line items
  const uniqueProductIds = new Set(
    cartItems.map((item) => {
      return (
        item?.id ||
        item?._id ||
        item?.product?._id ||
        item?.product?.id ||
        item?.productId
      );
    }),
  );

  const totalProducts = uniqueProductIds.size;

  // ============================================================
  // FREE SHIPPING
  // ============================================================

  const FREE_SHIPPING_LIMIT = 2000;

  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_LIMIT) * 100,
    100,
  );

  const amountRemaining = Math.max(
    FREE_SHIPPING_LIMIT - subtotal,
    0,
  );

  const isFreeShipping = subtotal >= FREE_SHIPPING_LIMIT;

  // Shipping is currently FREE on the cart
  const estimatedShipping = 0;

  // ============================================================
  // PROMO
  // ============================================================

  const promoDiscount =
    appliedCode === "NIYA10" ? subtotal * 0.1 : 0;

  const grandTotal =
    subtotal - promoDiscount + estimatedShipping;

  const handleApplyPromo = (event) => {
    event.preventDefault();

    setPromoError("");

    const cleanCode = promoCode.trim().toUpperCase();

    if (cleanCode === "NIYA10") {
      setAppliedCode("NIYA10");
      setPromoCode("");
      return;
    }

    if (cleanCode === "") {
      setPromoError("Please enter a valid coupon code.");
      return;
    }

    setPromoError("Invalid promo code. Try 'NIYA10'");
  };

  // ============================================================
  // EMPTY CART
  // ============================================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-bg-primary px-5 py-8 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1150px]">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
              YOUR SELECTION
            </p>

            <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
              Shopping Bag
            </h1>

            <p className="mx-auto mt-2 max-w-[420px] text-xs leading-relaxed text-text-secondary">
              Handcrafted luxury pieces chosen to become
              part of your story.
            </p>
          </div>

          <div className="mx-auto flex max-w-[580px] flex-col items-center rounded-sm border border-border-soft bg-bg-secondary px-6 py-16 text-center shadow-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
              <FiShoppingBag size={26} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-text-primary">
              Your shopping bag is empty
            </h2>

            <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-text-secondary">
              Discover a piece that feels unmistakably
              yours and add it to your collection.
            </p>

            <Link
              to="/shop"
              className="mt-8 flex h-11 items-center gap-2 rounded-xs border border-text-primary bg-bg-primary px-7 text-xs font-semibold tracking-widest text-text-primary transition hover:border-accent hover:bg-accent hover:text-white"
            >
              EXPLORE COLLECTION
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // CART PAGE
  // ============================================================

  return (
    <main className="min-h-[70vh] bg-bg-primary px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1150px]">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
            YOUR SELECTION
          </p>

          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Shopping Bag
          </h1>

          <p className="mx-auto mt-2 max-w-[420px] text-xs leading-relaxed text-text-secondary">
            Handcrafted luxury pieces chosen to become
            part of your story.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* =====================================================
              CART ITEMS
          ===================================================== */}

          <div className="space-y-6">
            {/* SHIPPING PROGRESS */}

            <div className="rounded-sm border border-border-soft bg-bg-secondary px-5 py-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FiTruck
                    className={
                      isFreeShipping
                        ? "text-emerald-600"
                        : "text-accent"
                    }
                    size={15}
                  />

                  <span
                    className={`text-xs font-medium ${
                      isFreeShipping
                        ? "text-emerald-600"
                        : "text-text-primary"
                    }`}
                  >
                    {isFreeShipping
                      ? "FREE SHIPPING"
                      : `Add ₹${amountRemaining.toLocaleString(
                          "en-IN",
                        )} more for FREE shipping`}
                  </span>
                </div>

                <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-accent sm:block">
                  3–5 DAYS
                </span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary">
                <div
                  className={`h-full transition-all duration-500 ${
                    isFreeShipping
                      ? "bg-emerald-600"
                      : "bg-accent"
                  }`}
                  style={{
                    width: `${shippingProgress}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[9px] text-text-muted">
                  Shipping progress
                </span>

                <span
                  className={`text-[9px] font-semibold ${
                    isFreeShipping
                      ? "text-emerald-600"
                      : "text-accent"
                  }`}
                >
                  {Math.round(shippingProgress)}%
                </span>
              </div>
            </div>

            {/* SHIPPING ANNOUNCEMENT */}

            <div className="flex items-center justify-between rounded-sm border border-border-soft bg-accent-soft/60 px-5 py-3.5 text-xs text-text-primary">
              <div className="flex items-center gap-3">
                <FiTruck className="shrink-0 text-base text-accent" />

                <span>
                  <strong>Free Domestic Shipping</strong>{" "}
                  on your selection!
                </span>
              </div>

              <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-accent sm:inline">
                3–5 DAYS DELIVERY
              </span>
            </div>

            {/* CART TABLE */}

            <div className="overflow-hidden rounded-sm border border-border-soft bg-bg-secondary shadow-sm">
              {/* CART HEADER */}

              <div className="flex items-center justify-between border-b border-border-soft bg-bg-primary/50 px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                    BAG ITEMS
                  </p>

                  <p className="mt-1 text-xs text-text-secondary">
                    Total {totalProducts}{" "}
                    {totalProducts === 1 ? "Item" : "Items"}{" "}
                    ({totalUnits}{" "}
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

              {cartItems.map((item, index) => {
                const product = getCartProduct(item);

                const itemUniqueKey =
                  item?.id ||
                  item?._id ||
                  item?.product?._id ||
                  item?.product?.id ||
                  index;

                const baseProductId =
                  getProductId(product) ||
                  item?.product?._id ||
                  item?.product?.id;

                const quantity = Number(
                  item?.quantity || 1,
                );

                const itemPrice = Number(
                  item?.variant?.price ||
                    product?.price ||
                    item?.product?.price ||
                    0,
                );

                const productImage = getProductImage(
                  product,
                  item,
                );

                const productTitle =
                  product?.title ||
                  product?.name ||
                  item?.product?.title ||
                  item?.product?.name ||
                  "Product";

                const productCategory =
                  product?.subcategory ||
                  product?.category ||
                  item?.product?.subcategory ||
                  item?.product?.category ||
                  "Handbags";

                return (
                  <div
                    key={itemUniqueKey}
                    className="flex gap-4 border-b border-border-soft p-5 last:border-b-0 md:gap-6"
                  >
                    {/* IMAGE */}

                    <Link
                      to={`/product/${baseProductId}`}
                      className="h-28 w-24 shrink-0 overflow-hidden rounded-xs border border-border-soft bg-bg-tertiary md:h-32 md:w-28"
                    >
                      {loadingProducts && !product ? (
                        <div className="flex h-full w-full items-center justify-center text-[9px] text-text-muted">
                          LOADING...
                        </div>
                      ) : productImage ? (
                        <img
                          src={productImage}
                          alt={productTitle}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[9px] text-text-muted">
                          NO IMAGE
                        </div>
                      )}
                    </Link>

                    {/* DETAILS */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[9px] font-semibold uppercase tracking-widest text-accent">
                            {productCategory}
                          </p>

                          <span className="text-xs font-semibold text-text-primary">
                            ₹
                            {(
                              itemPrice * quantity
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <Link
                          to={`/product/${baseProductId}`}
                          className="mt-1 block"
                        >
                          <h3 className="line-clamp-1 font-serif text-lg text-text-primary hover:text-accent">
                            {productTitle}
                          </h3>
                        </Link>

                        {/* Variant description */}
                        {item?.variant && (
                          <p className="mt-0.5 text-[11px] text-text-muted">
                            Variant:{" "}
                            {item.variant.name ||
                              item.variant.color ||
                              "Selected"}
                          </p>
                        )}

                        <p className="mt-1 text-xs text-text-secondary">
                          ₹
                          {itemPrice.toLocaleString(
                            "en-IN",
                          )}{" "}
                          each
                        </p>
                      </div>

                      {/* QUANTITY */}

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex h-8 items-center rounded-xs border border-border-soft bg-bg-primary">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(
                                item?.id ||
                                  baseProductId,
                              )
                            }
                            className="flex h-full w-8 items-center justify-center text-text-secondary transition hover:bg-accent-soft hover:text-accent"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={11} />
                          </button>

                          <span className="w-8 text-center text-xs font-semibold text-text-primary">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(
                                item?.id ||
                                  baseProductId,
                              )
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
                            removeFromCart(
                              item?.id ||
                                baseProductId,
                            )
                          }
                          className="flex items-center gap-1 text-xs text-red-500 transition hover:text-red-700"
                          aria-label={`Remove ${productTitle}`}
                        >
                          <FiTrash2 size={14} />

                          <span className="hidden text-[11px] sm:inline">
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

          {/* =====================================================
              ORDER SUMMARY
          ===================================================== */}

          <div className="space-y-5">
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-accent">
                ORDER BREAKDOWN
              </p>

              <div className="space-y-3.5 border-b border-border-soft pb-5 text-xs">
                {/* TOTAL PRODUCTS */}

                <div className="flex justify-between text-text-secondary">
                  <span>Total Products</span>

                  <span className="font-semibold text-text-primary">
                    {totalProducts}{" "}
                    {totalProducts === 1
                      ? "Item"
                      : "Items"}
                  </span>
                </div>

                {/* TOTAL UNITS */}

                <div className="flex justify-between text-text-secondary">
                  <span>Total Units</span>

                  <span className="font-semibold text-text-primary">
                    {totalUnits}{" "}
                    {totalUnits === 1
                      ? "Piece"
                      : "Pieces"}
                  </span>
                </div>

                {/* SUBTOTAL */}

                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>

                  <span className="font-semibold text-text-primary">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                {/* DISCOUNT */}

                {promoDiscount > 0 && (
                  <div className="flex justify-between font-medium text-accent">
                    <span className="flex items-center gap-1">
                      <FiCheckCircle size={12} />
                      Discount (-10%)
                    </span>

                    <span>
                      -₹
                      {promoDiscount.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 0,
                        },
                      )}
                    </span>
                  </div>
                )}

                {/* SHIPPING */}

                <div className="flex justify-between text-text-secondary">
                  <span>Estimated Shipping</span>

                  <span className="font-semibold text-emerald-600">
                    FREE
                  </span>
                </div>
              </div>

              {/* GRAND TOTAL */}

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
                  {grandTotal.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    },
                  )}
                </span>
              </div>

              {/* PROMO */}

              <form
                onSubmit={handleApplyPromo}
                className="mb-5"
              >
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
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
                      onChange={(event) =>
                        setPromoCode(
                          event.target.value,
                        )
                      }
                      placeholder="Try 'NIYA10'"
                      className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary pl-9 pr-3 text-xs uppercase text-text-primary outline-none focus:border-text-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-10 rounded-xs border border-border-soft bg-bg-tertiary px-4 text-xs font-semibold text-text-primary transition hover:bg-accent-soft"
                  >
                    APPLY
                  </button>
                </div>

                {promoError && (
                  <p className="mt-1.5 text-[10px] font-medium text-red-500">
                    {promoError}
                  </p>
                )}

                {appliedCode && (
                  <p className="mt-1.5 text-[10px] font-medium text-emerald-600">
                    Coupon '{appliedCode}' applied
                    successfully!
                  </p>
                )}
              </form>

              {/* CHECKOUT */}

              <Link
                to="/order"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xs border border-text-primary bg-bg-primary text-xs font-semibold tracking-widest text-text-primary shadow-sm transition hover:border-accent hover:bg-accent hover:text-white"
              >
                PROCEED TO ORDER
                <FiArrowRight size={14} />
              </Link>

              <p className="mt-4 text-center text-[10px] leading-relaxed text-text-muted">
                🔒 Safe & Encrypted Checkout •
                Complimentary Shipping
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;