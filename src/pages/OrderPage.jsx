import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiCreditCard,
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiPrinter,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function OrderPage() {
  const { cartItems, totalPrice, discountAmount, totalAmountAfterDiscount, clearCart } = useCart();

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

  const totalUnits = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = Number(totalPrice || 0);
  const discount = Number(discountAmount || 0);
  const grandTotal = Number(totalAmountAfterDiscount || subtotal || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.address.trim()) errors.address = "Delivery address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.pinCode.trim()) errors.pinCode = "PIN Code is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
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
      deliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      customer: { ...formData },
      items: [...cartItems],
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "upi" ? "UPI Payment" : "Card Payment",
      subtotal,
      discount,
      grandTotal,
    };

    setOrderReceipt(receipt);
    setOrderConfirmed(true);
    if (clearCart) clearCart();
  };

  return (
    <main className="min-h-[70vh] bg-bg-primary px-5 py-8 text-text-primary md:px-10 md:py-12">
      <div className="mx-auto max-w-[1150px]">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[10px] font-semibold tracking-widest text-accent uppercase">
            COMPLETE YOUR ORDER
          </p>

          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Order Details & Checkout
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-text-secondary">
            Review your selection and enter delivery details to place your order.
          </p>
        </div>

        {/* ORDER CONFIRMED RECEIPT MODAL VIEW */}
        {orderConfirmed && orderReceipt ? (
          <div className="mx-auto max-w-[650px] border border-border-soft bg-bg-secondary p-6 md:p-10 rounded-sm shadow-xl animate-fadeIn">
            <div className="text-center pb-6 border-b border-border-soft">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <FiCheckCircle size={32} />
              </div>
              <p className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                ORDER SUCCESSFUL
              </p>
              <h2 className="font-serif text-3xl font-medium text-text-primary mt-1">
                Thank You For Your Order!
              </h2>
              <p className="mt-2 text-xs text-text-secondary">
                Order confirmation invoice has been generated.
              </p>
            </div>

            {/* RECEIPT DETAILS */}
            <div className="py-6 border-b border-border-soft space-y-4 text-xs">
              <div className="flex justify-between items-center bg-bg-primary p-3 rounded-xs border border-border-soft">
                <div>
                  <span className="text-text-muted text-[10px] uppercase tracking-wider block">ORDER NUMBER</span>
                  <span className="font-mono font-bold text-sm text-accent">{orderReceipt.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-text-muted text-[10px] uppercase tracking-wider block">ESTIMATED DELIVERY</span>
                  <span className="font-semibold text-text-primary">{orderReceipt.deliveryDate}</span>
                </div>
              </div>

              {/* CUSTOMER ADDRESS RECAP */}
              <div className="grid gap-3 sm:grid-cols-2 bg-bg-primary p-4 rounded-xs border border-border-soft">
                <div>
                  <span className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">DELIVER TO</span>
                  <p className="font-semibold text-text-primary">{orderReceipt.customer.fullName}</p>
                  <p className="text-text-secondary text-[11px] mt-0.5">{orderReceipt.customer.address}, {orderReceipt.customer.city} - {orderReceipt.customer.pinCode}</p>
                  <p className="text-text-secondary text-[11px]">Ph: {orderReceipt.customer.phone}</p>
                </div>
                <div>
                  <span className="text-text-muted text-[10px] uppercase tracking-wider block mb-1">PAYMENT METHOD</span>
                  <p className="font-semibold text-text-primary">{orderReceipt.paymentMethod}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold">
                    Confirmed
                  </span>
                </div>
              </div>

              {/* ITEMS SUMMARY */}
              <div>
                <span className="text-text-muted text-[10px] uppercase tracking-wider block mb-2">PURCHASED ITEMS ({orderReceipt.items.length})</span>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {orderReceipt.items.map((item, idx) => {
                    const product = item.product;
                    return (
                      <div key={idx} className="flex items-center justify-between bg-bg-primary p-2.5 rounded-xs border border-border-soft">
                        <div className="flex items-center gap-3">
                          <img
                            src={product?.images?.[0] || product?.thumbnail || "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg"}
                            alt={product?.name || product?.title}
                            className="h-10 w-10 object-cover rounded-xs"
                          />
                          <div>
                            <p className="font-semibold text-text-primary line-clamp-1">{product?.name || product?.title}</p>
                            <p className="text-[10px] text-text-secondary">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-text-primary">
                          ₹{(Number(product?.price || 0) * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TOTAL BREAKDOWN */}
              <div className="pt-2 space-y-1.5 text-xs border-t border-border-soft">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>₹{orderReceipt.subtotal.toLocaleString("en-IN")}</span>
                </div>
                {orderReceipt.discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Discount</span>
                    <span>-₹{orderReceipt.discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-text-primary text-sm font-semibold pt-2 border-t border-border-soft">
                  <span className="font-serif text-base">Total Amount Paid</span>
                  <span className="text-accent font-serif text-lg">₹{orderReceipt.grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 flex h-11 items-center justify-center gap-2 border border-border-soft bg-bg-primary text-xs font-semibold text-text-primary hover:bg-bg-tertiary transition rounded-xs"
              >
                <FiPrinter size={14} /> Print Receipt
              </button>
              <Link
                to="/shop"
                className="flex-1 flex h-11 items-center justify-center gap-2 bg-text-primary text-xs font-semibold text-bg-primary hover:bg-accent transition rounded-xs"
              >
                CONTINUE SHOPPING <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="mx-auto flex max-w-[580px] flex-col items-center border border-border-soft bg-bg-secondary px-6 py-16 text-center rounded-sm">
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
              className="mt-8 flex h-11 items-center gap-2 bg-text-primary px-7 text-xs font-semibold tracking-widest text-bg-primary transition hover:bg-accent rounded-xs"
            >
              BROWSE PRODUCTS
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {/* SHIPPING ADDRESS SECTION */}
              <section className="border border-border-soft bg-bg-secondary p-6 md:p-8 rounded-sm shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-accent-soft text-accent rounded-full">
                    <FiMapPin size={16} strokeWidth={1.3} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold tracking-widest text-accent uppercase">
                      DELIVERY ADDRESS
                    </p>

                    <h2 className="font-serif text-xl text-text-primary">
                      Shipping Details
                    </h2>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
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
                      className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary rounded-xs"
                    />
                    {formErrors.fullName && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.fullName}</p>}
                  </div>

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
                      className="w-full resize-none border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary rounded-xs"
                    />
                    {formErrors.address && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.address}</p>}
                  </div>

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
                      className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary rounded-xs"
                    />
                    {formErrors.city && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.city}</p>}
                  </div>

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
                      className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary rounded-xs"
                    />
                    {formErrors.pinCode && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.pinCode}</p>}
                  </div>
                </div>
              </section>

              {/* PHONE SECTION */}
              <section className="border border-border-soft bg-bg-secondary p-6 md:p-8 rounded-sm shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-accent-soft text-accent rounded-full">
                    <FiPhone size={16} strokeWidth={1.3} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold tracking-widest text-accent uppercase">
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
                  className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none placeholder:text-text-muted focus:border-text-primary rounded-xs"
                />
                {formErrors.phone && <p className="mt-1 text-[10px] text-red-500 font-medium">{formErrors.phone}</p>}
              </section>

              {/* PAYMENT SECTION */}
              <section className="border border-border-soft bg-bg-secondary p-6 md:p-8 rounded-sm shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center bg-accent-soft text-accent rounded-full">
                    <FiCreditCard size={16} strokeWidth={1.3} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold tracking-widest text-accent uppercase">
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
                    className={`flex w-full items-center justify-between border p-4 text-left transition rounded-xs ${
                      paymentMethod === "cod"
                        ? "border-text-primary bg-bg-primary"
                        : "border-border-soft bg-bg-secondary"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        Cash on Delivery (COD)
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        Pay cash when your handbag order arrives.
                      </p>
                    </div>
                    {paymentMethod === "cod" && <FiCheck size={16} className="text-accent" />}
                  </button>

                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex w-full items-center justify-between border p-4 text-left transition rounded-xs ${
                      paymentMethod === "upi"
                        ? "border-text-primary bg-bg-primary"
                        : "border-border-soft bg-bg-secondary"
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-text-primary">
                        UPI (GPay / PhonePe / Paytm)
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        Fast and instant UPI payment.
                      </p>
                    </div>
                    {paymentMethod === "upi" && <FiCheck size={16} className="text-accent" />}
                  </button>
                </div>
              </section>
            </div>

            {/* ORDER SUMMARY SIDEBAR */}
            <aside className="h-fit border border-border-soft bg-bg-secondary p-6 rounded-sm shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border-soft pb-4">
                <p className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                  ORDER SUMMARY ({cartItems.length} ITEMS)
                </p>
                <span className="text-[10px] text-text-secondary">{totalUnits} Units</span>
              </div>

              {/* ITEMS BREAKDOWN */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-1 border-b border-border-soft pb-5">
                {cartItems.map((item, idx) => {
                  const product = item.product;
                  const itemPrice = Number(product?.price || 0);

                  return (
                    <div key={idx} className="flex gap-3">
                      <div className="h-16 w-14 shrink-0 bg-bg-tertiary rounded-xs overflow-hidden border border-border-soft">
                        <img
                          src={product?.images?.[0] || product?.thumbnail || "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg"}
                          alt={product?.name || product?.title || "Product"}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-sm font-medium text-text-primary line-clamp-1">
                          {product?.name || product?.title}
                        </h3>

                        <p className="mt-1 text-[11px] text-text-secondary">
                          Qty: {item.quantity} × ₹{itemPrice.toLocaleString("en-IN")}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-text-primary">
                          ₹{(itemPrice * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* COST BREAKDOWN */}
              <div className="space-y-3 border-b border-border-soft pb-5 text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-semibold text-text-primary">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-accent font-medium">
                    <span>Discount Applied</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-text-secondary">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
              </div>

              {/* TOTAL AMOUNT */}
              <div className="flex justify-between items-baseline py-2 text-text-primary">
                <span className="font-serif text-lg font-semibold">Total Amount</span>
                <span className="font-serif text-2xl font-semibold text-accent">₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* PLACE ORDER BUTTON */}
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 bg-dark-section text-xs font-semibold tracking-widest text-white transition hover:opacity-90 rounded-xs shadow-md"
              >
                CONFIRM & PLACE ORDER
                <FiArrowRight size={14} />
              </button>

              <p className="mt-4 text-center text-[10px] leading-relaxed text-text-muted">
                By placing your order, you agree to Niya Bags' terms of service and delivery policy.
              </p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}

export default OrderPage;
