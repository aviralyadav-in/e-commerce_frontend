import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiLock,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiPlus,
  FiCheck,
} from "react-icons/fi";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import OrderReceipt from "../components/order/OrderReceipt";

// import { createOrder } from "../api/orderApi";

function formatAddress(addr) {
  if (!addr) return "";
  return [addr.address, addr.city, addr.state, addr.pincode]
    .filter(Boolean)
    .join(", ");
}

function OrderPage() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  // ============================================================
  // FORM STATE — contact + payment (address is selected, not edited)
  // ============================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // ADDRESS SELECTION — fetch from user.addresses, select only
  // ============================================================

  const savedAddresses = Array.isArray(user?.addresses)
    ? user.addresses.filter(
        (a) => a && a.address && a.city && a.pincode,
      )
    : [];

  const defaultAddress =
    savedAddresses.find((a) => a.isDefault) || savedAddresses[0] || null;

  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress?.id || "",
  );

  // Derived: if the current selection is no longer in the saved list,
  // fall back to the default / first available address.
  const selectedAddress =
    savedAddresses.find((a) => a.id === selectedAddressId) ||
    defaultAddress ||
    null;

  // ============================================================
  // PRICING
  // ============================================================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const shippingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 100;

  const grandTotal = subtotal + shippingFee;

  // ============================================================
  // PLACE ORDER
  // ============================================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!formData.fullName || !formData.phone) {
      setErrorMessage("Please fill in your name and phone number.");
      return;
    }

    if (!selectedAddress) {
      setErrorMessage(
        "Please select a delivery address to continue.",
      );
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage("Your shopping bag is empty.");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        shippingDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: selectedAddress.address,
          city: selectedAddress.city,
          state: selectedAddress.state || "",
          pinCode: selectedAddress.pincode,
          addressId: selectedAddress.id,
        },

        items: cartItems.map((item) => ({
          productId: item._id || item.id,
          variantId: item.variantId || null,
          title: item.title || item.name,
          price: item.price,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant || item.variant || null,
        })),

        subtotal,
        shippingFee,
        totalAmount: grandTotal,
        paymentMethod: formData.paymentMethod,
      };

      // ========================================================
      // BACKEND ORDER API
      // ========================================================

      // await createOrder(orderPayload);

      // Simulated network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ========================================================
      // SAVE COMPLETED ORDER
      // ========================================================

      const newOrderId = `NIYA-${Date.now()}`;

      const completedOrderData = {
        ...orderPayload,
        orderId: newOrderId,
        date: new Date().toLocaleString("en-IN"),
        status: "ORDER PLACED",
      };

      const existingOrders = JSON.parse(
        localStorage.getItem("niyaOrders") || "[]",
      );

      localStorage.setItem(
        "niyaOrders",
        JSON.stringify([completedOrderData, ...existingOrders]),
      );

      // Keep the actual order available for receipt
      setCompletedOrder(completedOrderData);

      // ========================================================
      // CLEAR CART
      // ========================================================

      if (typeof clearCart === "function") {
        clearCart();
      }

      // ========================================================
      // SHOW SUCCESS SCREEN
      // ========================================================

      setOrderSuccess(true);
    } catch (error) {
      console.error("ORDER PLACEMENT ERROR:", error);

      setErrorMessage(
        error?.response?.data?.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUCCESS / RECEIPT SCREEN
  // ============================================================

  if (orderSuccess) {
    return (
      <main className="min-h-[70vh] bg-bg-primary px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[620px]">
          <OrderReceipt
            order={completedOrder}
            showPrintButton={true}
          />

          {/* SUCCESS ACTIONS */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="flex h-11 flex-1 items-center justify-center border border-emerald-600 bg-emerald-600 px-5 text-[10px] font-semibold tracking-[0.16em] text-white transition hover:opacity-90"
            >
              CONTINUE SHOPPING
            </Link>

            <Link
              to="/my-orders"
              className="flex h-11 flex-1 items-center justify-center border border-border-soft bg-bg-primary px-5 text-[10px] font-semibold tracking-[0.16em] text-text-primary transition hover:border-emerald-600 hover:text-emerald-600"
            >
              VIEW MY ORDERS
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // EMPTY CART
  // ============================================================

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-bg-primary px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[600px] rounded-sm border border-border-soft bg-bg-secondary p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
            <FiShoppingBag size={28} strokeWidth={1.2} />
          </div>

          <h1 className="font-serif text-2xl font-medium text-text-primary">
            Your bag is empty
          </h1>

          <p className="mt-2 text-xs text-text-secondary">
            You need items in your cart before proceeding to checkout.
          </p>

          <Link
            to="/cart"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xs border border-text-primary bg-bg-primary px-7 text-xs font-semibold tracking-widest text-text-primary transition hover:border-accent hover:bg-accent hover:text-white"
          >
            RETURN TO CART
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // CHECKOUT PAGE
  // ============================================================

  return (
    <main className="min-h-[70vh] bg-bg-primary px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1150px]">

        {/* BACK TO CART */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary transition hover:text-accent"
          >
            <FiArrowLeft size={14} />
            Back to Shopping Bag
          </Link>
        </div>

        {/* HEADER */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
            SECURE CHECKOUT
          </p>

          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Shipping & Order Details
          </h1>
        </div>

        {/* ERROR */}
        {errorMessage && (
          <div className="mx-auto mb-6 max-w-[1150px] rounded-sm border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          {/* ================================================== */}
          {/* SHIPPING INFORMATION — contact fields are editable,
              ADDRESS is fetched & selected only */}
          {/* ================================================== */}

          <div className="space-y-6">
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg font-medium text-text-primary">
                  Shipping Information
                </h2>
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider text-accent transition hover:opacity-70"
                >
                  <FiPlus size={11} />
                  MANAGE ADDRESSES
                </Link>
              </div>

              {/* CONTACT FIELDS (editable) */}
              <div className="grid gap-4 sm:grid-cols-2">

                {/* FULL NAME */}
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FiUser
                      className="absolute left-3 top-3.5 text-text-muted"
                      size={14}
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter full name"
                      className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary pl-9 pr-3 text-xs text-text-primary outline-none focus:border-text-primary"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <FiPhone
                      className="absolute left-3 top-3.5 text-text-muted"
                      size={14}
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="10-digit mobile number"
                      className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary pl-9 pr-3 text-xs text-text-primary outline-none focus:border-text-primary"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail
                      className="absolute left-3 top-3.5 text-text-muted"
                      size={14}
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary pl-9 pr-3 text-xs text-text-primary outline-none focus:border-text-primary"
                    />
                  </div>
                </div>
              </div>

              {/* DELIVERY ADDRESS — fetched & selected, no editing here */}
              <div className="mt-6 border-t border-border-soft pt-6">
                <p className="mb-3 text-[10px] font-semibold tracking-widest text-accent uppercase">
                  Delivery Address
                </p>

                {savedAddresses.length === 0 ? (
                  <div className="rounded-xs border border-dashed border-border-soft bg-bg-primary p-6 text-center">
                    <FiMapPin
                      className="mx-auto mb-3 text-text-muted"
                      size={20}
                      strokeWidth={1.3}
                    />
                    <p className="text-xs font-semibold text-text-primary">
                      No saved addresses yet
                    </p>
                    <p className="mt-1 text-[10px] text-text-muted">
                      Add an address from Edit Profile to place an order.
                    </p>
                    <Link
                      to="/profile"
                      className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-xs bg-accent px-4 text-[10px] font-semibold tracking-widest text-white transition hover:opacity-90"
                    >
                      <FiPlus size={11} />
                      ADD ADDRESS
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedAddresses.map((addr) => {
                      const isActive = addr.id === selectedAddress?.id;
                      return (
                        <label
                          key={addr.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-xs border p-4 transition ${
                            isActive
                              ? "border-accent bg-accent-soft/30"
                              : "border-border-soft bg-bg-primary hover:border-text-secondary"
                          }`}
                        >
                          <input
                            type="radio"
                            name="deliveryAddress"
                            value={addr.id}
                            checked={isActive}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1 text-accent"
                          />

                          <div className="flex-1">
                            <p className="text-[11px] leading-relaxed text-text-secondary">
                              {formatAddress(addr)}
                            </p>
                          </div>

                          {isActive && (
                            <FiCheck
                              className="mt-1 text-accent"
                              size={14}
                              strokeWidth={2}
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ================================================== */}
            {/* PAYMENT METHOD */}
            {/* ================================================== */}

            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-lg font-medium text-text-primary">
                Payment Method
              </h2>

              <div className="space-y-3 text-xs">

                {/* COD */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xs border border-border-soft bg-bg-primary p-3.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleInputChange}
                    className="text-accent"
                  />

                  <div>
                    <span className="font-semibold text-text-primary">
                      Cash on Delivery (COD)
                    </span>

                    <p className="text-[10px] text-text-muted">
                      Pay securely when your package arrives
                    </p>
                  </div>
                </label>

                {/* ONLINE */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xs border border-border-soft bg-bg-primary p-3.5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={formData.paymentMethod === "ONLINE"}
                    onChange={handleInputChange}
                    className="text-accent"
                  />

                  <div>
                    <span className="font-semibold text-text-primary">
                      Online Payment / UPI / Card
                    </span>

                    <p className="text-[10px] text-text-muted">
                      Pay instantly via gateway
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* ORDER SUMMARY */}
          {/* ================================================== */}

          <div className="space-y-5">
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-accent">
                ORDER SUMMARY ({cartItems.length}{" "}
                {cartItems.length === 1 ? "Item" : "Items"})
              </p>

              <div className="max-h-60 space-y-3 overflow-y-auto border-b border-border-soft pb-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex justify-between gap-3 text-xs"
                  >
                    <div className="flex-1">
                      <p className="line-clamp-1 font-medium text-text-primary">
                        {item.title || item.name}
                      </p>

                      <span className="text-[10px] text-text-muted">
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <span className="font-semibold text-text-primary">
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-b border-border-soft py-4 text-xs">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>

                  <span className="font-semibold text-text-primary">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>Shipping Fee</span>

                  <span className="font-semibold text-emerald-600">
                    {shippingFee === 0
                      ? "FREE"
                      : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-text-primary">
                <span className="font-serif text-lg font-semibold">
                  Total Payable
                </span>

                <span className="font-serif text-lg font-semibold text-accent">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xs border border-text-primary bg-bg-primary text-xs font-semibold tracking-widest text-text-primary shadow-sm transition hover:border-accent hover:bg-accent hover:text-white disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "PLACE ORDER"}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1 text-center text-[10px] leading-relaxed text-text-muted">
                <FiLock size={12} />
                Safe & Encrypted Transactions
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default OrderPage;