import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiLock,
  FiMapPin,
  FiUser,
  FiPhone,
  FiMail,
  FiShoppingBag,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
// Agar koi order creation API hai toh usko yaha import kar sakte ho
// import { createOrder } from "../api/orderApi";

function OrderPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ============================================================
  // FORM STATE INITIALIZED FROM AUTH USER DATA
  // ============================================================
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "COD", // Default Cash on Delivery / Online
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pinCode: user.pincode || "",
        paymentMethod: "COD",
      });
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
  // PRICING CALCULATIONS (Direct item.price mapping)
  // ============================================================
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const shippingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 100;
  const grandTotal = subtotal + shippingFee;

  // ============================================================
  // HANDLE ORDER SUBMISSION
  // ============================================================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.pinCode) {
      setErrorMessage("Please fill in all required shipping fields.");
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
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
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

      // TODO: Uncomment jab backend order API integration karni ho
      // await createOrder(orderPayload);

      // Simulating network request success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOrderSuccess(true);
      if (typeof clearCart === "function") {
        clearCart();
      }
    } catch (error) {
      console.error("ORDER PLACEMENT ERROR:", error);
      setErrorMessage(error?.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUCCESS STATE VIEW
  // ============================================================
  if (orderSuccess) {
    return (
      <main className="min-h-[70vh] bg-bg-primary px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[600px] rounded-sm border border-border-soft bg-bg-secondary p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FiCheckCircle size={32} />
          </div>
          <h1 className="font-serif text-2xl font-medium text-text-primary md:text-3xl">
            Order Placed Successfully!
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-text-secondary">
            Thank you for shopping with us. We have received your order and are getting it ready for shipment.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/shop"
              className="flex h-11 items-center rounded-xs border border-text-primary bg-bg-primary px-7 text-xs font-semibold tracking-widest text-text-primary transition hover:border-accent hover:bg-accent hover:text-white"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // EMPTY CART GUARD
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
  // CHECKOUT PAGE VIEW
  // ============================================================
  return (
    <main className="min-h-[70vh] bg-bg-primary px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1150px]">
        {/* BACK TO CART LINK */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary transition hover:text-accent"
          >
            <FiArrowLeft size={14} /> Back to Shopping Bag
          </Link>
        </div>

        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-accent">
            SECURE CHECKOUT
          </p>
          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Shipping & Order Details
          </h1>
        </div>

        {errorMessage && (
          <div className="mx-auto mb-6 max-w-[1150px] rounded-sm border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* SHIPPING FORM DETAILS */}
          <div className="space-y-6">
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-lg font-medium text-text-primary">
                Shipping Information
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3.5 text-text-muted" size={14} />
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

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-3.5 text-text-muted" size={14} />
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

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3.5 text-text-muted" size={14} />
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

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3.5 text-text-muted" size={14} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="House no., street name, area"
                      className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary pl-9 pr-3 text-xs text-text-primary outline-none focus:border-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                    className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary px-3 text-xs text-text-primary outline-none focus:border-text-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary px-3 text-xs text-text-primary outline-none focus:border-text-primary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                    Pincode / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                    placeholder="Pincode"
                    className="h-10 w-full rounded-xs border border-border-soft bg-bg-primary px-3 text-xs text-text-primary outline-none focus:border-text-primary"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-lg font-medium text-text-primary">
                Payment Method
              </h2>
              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary p-3.5 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleInputChange}
                    className="text-accent"
                  />
                  <div>
                    <span className="font-semibold text-text-primary">Cash on Delivery (COD)</span>
                    <p className="text-[10px] text-text-muted">Pay securely when your package arrives</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary p-3.5 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={formData.paymentMethod === "ONLINE"}
                    onChange={handleInputChange}
                    className="text-accent"
                  />
                  <div>
                    <span className="font-semibold text-text-primary">Online Payment / UPI / Card</span>
                    <p className="text-[10px] text-text-muted">Pay instantly via gateway</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="space-y-5">
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 shadow-sm">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-accent">
                ORDER SUMMARY ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
              </p>

              {/* MINI ITEMS LIST */}
              <div className="max-h-60 space-y-3 overflow-y-auto border-b border-border-soft pb-4">
                {cartItems.map((item, idx) => (
                  <div key={item.id || idx} className="flex justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <p className="line-clamp-1 font-medium text-text-primary">
                        {item.title || item.name}
                      </p>
                      <span className="text-[10px] text-text-muted">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-text-primary">
                      ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* PRICING BREAKDOWN */}
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
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>
              </div>

              {/* GRAND TOTAL */}
              <div className="flex justify-between py-4 text-text-primary">
                <span className="font-serif text-lg font-semibold">Total Payable</span>
                <span className="font-serif text-lg font-semibold text-accent">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xs border border-text-primary bg-bg-primary text-xs font-semibold tracking-widest text-text-primary shadow-sm transition hover:border-accent hover:bg-accent hover:text-white disabled:opacity-50"
              >
                {loading ? "PROCESSING..." : "PLACE ORDER"}
              </button>

              <p className="mt-4 text-center text-[10px] leading-relaxed text-text-muted flex items-center justify-center gap-1">
                <FiLock size={12} /> Safe & Encrypted Transactions
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default OrderPage;