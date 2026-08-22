import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiCheckCircle,
  FiShoppingBag,
  FiPrinter,
  FiCalendar,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function OrderPage() {
  const {
    cartItems,
    totalPrice,
    discountAmount,
    totalAmountAfterDiscount,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pinCode: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null);

  const totalUnits = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  const subtotal = Number(totalPrice || 0);
  const discount = Number(discountAmount || 0);
  const grandTotal = Number(totalAmountAfterDiscount || subtotal || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.address.trim()) {
      errors.address = "Delivery address is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.pinCode.trim()) {
      errors.pinCode = "PIN Code is required";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    return errors;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const receipt = {
      orderId: `#NIYA-${Math.floor(100000 + Math.random() * 900000)}`,

      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),

      deliveryDate: new Date(
        Date.now() + 4 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),

      customer: { ...formData },

      items: [...cartItems],

      paymentMethod:
        paymentMethod === "cod"
          ? "Cash on Delivery"
          : paymentMethod === "upi"
            ? "UPI Payment"
            : "Card Payment",

      subtotal,
      discount,
      grandTotal,
    };

    setOrderReceipt(receipt);
    setOrderConfirmed(true);

    if (clearCart) {
      clearCart();
    }
  };

  return (
    <main className="min-h-[70vh] bg-bg-primary px-4 py-8 text-text-primary sm:px-6 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1180px]">
        {/* PAGE HEADER */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">
            COMPLETE YOUR ORDER
          </p>

          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Order Details & Checkout
          </h1>

          <p className="mx-auto mt-2 max-w-[560px] text-xs leading-relaxed text-text-secondary">
            Review your selection and enter your delivery details to place your
            order securely.
          </p>
        </div>

        {/* =========================================================
            ORDER CONFIRMED / RECEIPT
        ========================================================= */}
        {orderConfirmed && orderReceipt ? (
          <div className="mx-auto max-w-[720px]">
            {/* SUCCESS HEADER */}
            <div className="overflow-hidden rounded-sm border border-border-soft bg-bg-secondary shadow-sm">
              <div className="border-b border-border-soft px-5 py-8 text-center md:px-10">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <FiCheckCircle size={32} strokeWidth={1.5} />
                </div>

                <p className="text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">
                  ORDER SUCCESSFUL
                </p>

                <h2 className="mt-2 font-serif text-3xl font-medium text-text-primary">
                  Thank You For Your Order!
                </h2>

                <p className="mt-2 text-xs text-text-secondary">
                  Your order has been successfully placed.
                </p>
              </div>

              {/* ORDER META */}
              <div className="grid grid-cols-1 border-b border-border-soft sm:grid-cols-3">
                <div className="border-b border-border-soft p-5 sm:border-b-0 sm:border-r">
                  <div className="mb-2 flex items-center gap-2 text-text-muted">
                    <FiShoppingBag size={13} />
                    <span className="text-[9px] font-semibold tracking-wider uppercase">
                      Order Number
                    </span>
                  </div>

                  <p className="font-mono text-sm font-bold text-accent">
                    {orderReceipt.orderId}
                  </p>
                </div>

                <div className="border-b border-border-soft p-5 sm:border-b-0 sm:border-r">
                  <div className="mb-2 flex items-center gap-2 text-text-muted">
                    <FiCalendar size={13} />
                    <span className="text-[9px] font-semibold tracking-wider uppercase">
                      Order Date
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-text-primary">
                    {orderReceipt.date}
                  </p>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-text-muted">
                    <FiTruck size={13} />
                    <span className="text-[9px] font-semibold tracking-wider uppercase">
                      Estimated Delivery
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-text-primary">
                    {orderReceipt.deliveryDate}
                  </p>
                </div>
              </div>

              {/* RECEIPT CONTENT */}
              <div className="space-y-7 p-5 md:p-8">
                {/* DELIVERY + PAYMENT */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-sm border border-border-soft bg-bg-primary p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <FiMapPin size={15} className="text-accent" />

                      <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                        DELIVER TO
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-text-primary">
                      {orderReceipt.customer.fullName}
                    </p>

                    <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
                      {orderReceipt.customer.address},{" "}
                      {orderReceipt.customer.city} -{" "}
                      {orderReceipt.customer.pinCode}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[11px] text-text-secondary">
                      <FiPhone size={12} />
                      {orderReceipt.customer.phone}
                    </div>
                  </div>

                  <div className="rounded-sm border border-border-soft bg-bg-primary p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <FiCreditCard size={15} className="text-accent" />

                      <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                        PAYMENT
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-text-primary">
                      {orderReceipt.paymentMethod}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                      <FiCheck size={11} />
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* ITEMS */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                        ORDER ITEMS
                      </p>

                      <h3 className="mt-1 font-serif text-xl text-text-primary">
                        Purchased Items
                      </h3>
                    </div>

                    <span className="text-[10px] text-text-secondary">
                      {orderReceipt.items.length} Items
                    </span>
                  </div>

                  <div className="space-y-3">
                    {orderReceipt.items.map((item, idx) => {
                      const product = item.product;
                      const itemPrice = Number(product?.price || 0);
                      const quantity = item.quantity || 1;

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 rounded-sm border border-border-soft bg-bg-primary p-3 sm:p-4"
                        >
                          <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xs border border-border-soft bg-bg-tertiary sm:h-20 sm:w-16">
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

                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-xs font-semibold text-text-primary sm:text-sm">
                              {product?.name || product?.title}
                            </p>

                            <p className="mt-1 text-[10px] text-text-secondary">
                              ₹{itemPrice.toLocaleString("en-IN")} × {quantity}
                            </p>

                            <p className="mt-1 text-[10px] text-text-muted">
                              Quantity: {quantity}
                            </p>
                          </div>

                          <p className="text-xs font-semibold text-text-primary sm:text-sm">
                            ₹{(itemPrice * quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="rounded-sm border border-border-soft bg-bg-primary p-5">
                  <p className="mb-4 text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                    PAYMENT SUMMARY
                  </p>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span className="font-medium text-text-primary">
                        ₹{orderReceipt.subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {orderReceipt.discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Discount</span>
                        <span className="font-medium">
                          -₹{orderReceipt.discount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-text-secondary">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-600">
                        FREE
                      </span>
                    </div>

                    <div className="border-t border-border-soft pt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-semibold text-text-primary">
                          Total Amount
                        </span>

                        <span className="font-serif text-xl font-semibold text-accent">
                          ₹{orderReceipt.grandTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DELIVERY NOTE */}
                <div className="flex gap-3 rounded-sm border border-border-soft bg-bg-primary p-4">
                  <FiTruck size={17} className="mt-0.5 shrink-0 text-accent" />

                  <div>
                    <p className="text-xs font-semibold text-text-primary">
                      Delivery Information
                    </p>

                    <p className="mt-1 text-[10px] leading-relaxed text-text-secondary">
                      Your order is expected to arrive by{" "}
                      <span className="font-semibold text-text-primary">
                        {orderReceipt.deliveryDate}
                      </span>
                      . You will receive your order at the address provided
                      above.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="grid gap-3 border-t border-border-soft bg-bg-primary p-5 sm:grid-cols-2 md:p-6">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex h-11 items-center justify-center gap-2 rounded-xs border border-border-soft bg-bg-secondary text-xs font-semibold text-text-primary transition hover:bg-bg-tertiary"
                >
                  <FiPrinter size={14} />
                  PRINT RECEIPT
                </button>

                <Link
                  to="/shop"
                  className="flex h-11 items-center justify-center gap-2 rounded-xs bg-text-primary text-xs font-semibold text-bg-primary transition hover:bg-accent"
                >
                  CONTINUE SHOPPING
                  <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* =========================================================
              EMPTY CART
          ========================================================= */
          <div className="mx-auto flex max-w-[580px] flex-col items-center rounded-sm border border-border-soft bg-bg-secondary px-6 py-16 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
              <FiShoppingBag size={26} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-text-primary">
              Your cart is currently empty
            </h2>

            <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-text-secondary">
              Please add products to your cart before proceeding to checkout.
            </p>

            <Link
              to="/shop"
              className="mt-8 flex h-11 items-center gap-2 rounded-xs bg-text-primary px-7 text-xs font-semibold tracking-widest text-bg-primary transition hover:bg-accent"
            >
              BROWSE PRODUCTS
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          /* =========================================================
              CHECKOUT
          ========================================================= */
          <form
            onSubmit={handlePlaceOrder}
            className="grid gap-8 lg:grid-cols-[1fr_390px]"
          >
            {/* LEFT SIDE */}
            <div className="space-y-6">
              {/* SHIPPING ADDRESS */}
              <section className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiMapPin size={17} strokeWidth={1.3} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                      DELIVERY ADDRESS
                    </p>

                    <h2 className="font-serif text-xl text-text-primary">
                      Shipping Details
                    </h2>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* FULL NAME */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-12 w-full rounded-xs border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary"
                    />

                    {formErrors.fullName && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      Street Address / House No. *
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no., street, area"
                      rows="3"
                      className="w-full resize-none rounded-xs border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary"
                    />

                    {formErrors.address && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  {/* CITY */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="h-12 w-full rounded-xs border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary"
                    />

                    {formErrors.city && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  {/* PIN */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-text-secondary">
                      PIN Code *
                    </label>

                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="Enter PIN code"
                      className="h-12 w-full rounded-xs border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary"
                    />

                    {formErrors.pinCode && (
                      <p className="mt-1 text-[10px] font-medium text-red-500">
                        {formErrors.pinCode}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* PHONE */}
              <section className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiPhone size={17} strokeWidth={1.3} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                      CONTACT NUMBER
                    </p>

                    <h2 className="font-serif text-xl text-text-primary">
                      Mobile Number
                    </h2>
                  </div>
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className="h-12 w-full rounded-xs border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary"
                />

                {formErrors.phone && (
                  <p className="mt-1 text-[10px] font-medium text-red-500">
                    {formErrors.phone}
                  </p>
                )}
              </section>

              {/* PAYMENT */}
              <section className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiCreditCard size={17} strokeWidth={1.3} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                      PAYMENT METHOD
                    </p>

                    <h2 className="font-serif text-xl text-text-primary">
                      Choose Payment Option
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex w-full items-center justify-between rounded-xs border p-4 text-left transition ${
                      paymentMethod === "cod"
                        ? "border-text-primary bg-bg-primary"
                        : "border-border-soft bg-bg-secondary hover:bg-bg-primary"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        Cash on Delivery (COD)
                      </p>

                      <p className="mt-1 text-[11px] text-text-secondary">
                        Pay cash when your handbag order arrives.
                      </p>
                    </div>

                    {paymentMethod === "cod" && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-text-primary text-bg-primary">
                        <FiCheck size={13} />
                      </div>
                    )}
                  </button>

                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex w-full items-center justify-between rounded-xs border p-4 text-left transition ${
                      paymentMethod === "upi"
                        ? "border-text-primary bg-bg-primary"
                        : "border-border-soft bg-bg-secondary hover:bg-bg-primary"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        UPI (GPay / PhonePe / Paytm)
                      </p>

                      <p className="mt-1 text-[11px] text-text-secondary">
                        Fast and instant UPI payment.
                      </p>
                    </div>

                    {paymentMethod === "upi" && (
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-text-primary text-bg-primary">
                        <FiCheck size={13} />
                      </div>
                    )}
                  </button>
                </div>
              </section>
            </div>

            {/* =====================================================
                ORDER SUMMARY SIDEBAR
            ===================================================== */}
            <aside className="h-fit rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm lg:sticky lg:top-24">
              {/* SUMMARY HEADER */}
              <div className="border-b border-border-soft pb-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.15em] text-accent uppercase">
                      YOUR ORDER
                    </p>

                    <h2 className="mt-1 font-serif text-xl text-text-primary">
                      Order Summary
                    </h2>
                  </div>

                  <div className="rounded-full bg-bg-primary px-3 py-1.5 text-[10px] font-semibold text-text-secondary">
                    {cartItems.length} Items
                  </div>
                </div>

                <p className="mt-2 text-[10px] text-text-muted">
                  Total {cartItems.length}{" "}
                  {cartItems.length === 1 ? "Item" : "Items"} ({totalUnits}{" "}
                  {totalUnits === 1 ? "Unit" : "Units"})
                </p>
              </div>

              {/* ITEMS */}
              <div className="max-h-[310px] space-y-4 overflow-y-auto border-b border-border-soft py-5 pr-1">
                {cartItems.map((item, idx) => {
                  const product = item.product;
                  const itemPrice = Number(product?.price || 0);
                  const quantity = item.quantity || 1;

                  return (
                    <div key={idx} className="flex gap-3">
                      <div className="relative h-[76px] w-[64px] shrink-0 overflow-hidden rounded-xs border border-border-soft bg-bg-tertiary">
                        <img
                          src={
                            product?.images?.[0] ||
                            product?.thumbnail ||
                            "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg"
                          }
                          alt={product?.name || product?.title || "Product"}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-text-primary px-1 text-[9px] font-semibold text-white">
                          {quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 font-serif text-sm font-medium text-text-primary">
                          {product?.name || product?.title}
                        </h3>

                        <p className="mt-1 text-[10px] text-text-secondary">
                          ₹{itemPrice.toLocaleString("en-IN")} × {quantity}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-text-primary">
                          ₹{(itemPrice * quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* COST BREAKDOWN */}
              <div className="space-y-3 border-b border-border-soft py-5 text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>

                  <span className="font-semibold text-text-primary">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between font-medium text-accent">
                    <span>Discount Applied</span>

                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-text-secondary">
                  <span>Shipping Fee</span>

                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex items-end justify-between gap-4 py-5">
                <div>
                  <p className="text-[9px] tracking-wider text-text-muted uppercase">
                    Total Payable
                  </p>

                  <p className="mt-1 font-serif text-lg font-semibold text-text-primary">
                    Grand Total
                  </p>
                </div>

                <span className="font-serif text-2xl font-semibold text-accent">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* PLACE ORDER */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xs bg-dark-section text-xs font-semibold tracking-[0.15em] text-white shadow-md transition hover:bg-accent"
              >
                CONFIRM & PLACE ORDER
                <FiArrowRight size={14} />
              </button>

              <div className="mt-4 flex items-start gap-2">
                <FiCheckCircle
                  size={13}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <p className="text-[10px] leading-relaxed text-text-muted">
                  By placing your order, you agree to Niya Bags&apos; terms of
                  service and delivery policy.
                </p>
              </div>

              {/* SECURE CHECKOUT */}
              <div className="mt-5 border-t border-border-soft pt-4 text-center">
                <p className="text-[9px] font-semibold tracking-wider text-text-muted uppercase">
                  Secure Checkout
                </p>

                <p className="mt-1 text-[10px] text-text-secondary">
                  Your order details are handled securely.
                </p>
              </div>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}

export default OrderPage;
