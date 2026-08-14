import { useState } from "react";
import { FiArrowRight, FiCheck, FiMapPin, FiPhone } from "react-icons/fi";

function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const orderItems = [];

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-[70vh] bg-[var(--color-bg-primary)] px-5 py-6 text-[var(--color-text-primary)] md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
            COMPLETE YOUR ORDER
          </p>

          <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
            Order Details
          </h1>

          <p className="mt-3 text-[12px] leading-6 text-[var(--color-text-secondary)]">
            Almost yours. Just a few details before we prepare your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {/* SHIPPING ADDRESS */}
            <section className="border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <FiMapPin size={16} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="text-[9px] tracking-[0.2em] text-[var(--color-accent)]">
                    DELIVERY
                  </p>

                  <h2 className="font-serif text-xl text-[var(--color-text-primary)]">
                    Shipping Address
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                    Address
                  </label>

                  <textarea
                    placeholder="House no., street, area"
                    rows="3"
                    className="w-full resize-none border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4 py-3 text-[12px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Enter city"
                    className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                    PIN Code
                  </label>

                  <input
                    type="text"
                    placeholder="Enter PIN code"
                    className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)]"
                  />
                </div>
              </div>
            </section>

            {/* PHONE */}
            <section className="border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <FiPhone size={16} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="text-[9px] tracking-[0.2em] text-[var(--color-accent)]">
                    CONTACT
                  </p>

                  <h2 className="font-serif text-xl text-[var(--color-text-primary)]">
                    Phone Number
                  </h2>
                </div>
              </div>

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-input-bg)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-text-primary)]"
              />
            </section>

            {/* PAYMENT */}
            <section className="border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
              <p className="mb-2 text-[9px] tracking-[0.2em] text-[var(--color-accent)]">
                PAYMENT
              </p>

              <h2 className="font-serif text-xl text-[var(--color-text-primary)]">
                Choose Payment Method
              </h2>

              <div className="mt-6 space-y-3">
                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center justify-between border p-4 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-[var(--color-text-primary)] bg-[var(--color-bg-primary)]"
                      : "border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]"
                  }`}
                >
                  <div>
                    <p className="text-[11px] font-medium text-[var(--color-text-primary)]">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                      Pay when your order arrives.
                    </p>
                  </div>

                  {paymentMethod === "cod" && (
                    <FiCheck size={16} className="text-[var(--color-accent)]" />
                  )}
                </button>

                {/* UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex w-full items-center justify-between border p-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-[var(--color-text-primary)] bg-[var(--color-bg-primary)]"
                      : "border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]"
                  }`}
                >
                  <div>
                    <p className="text-[11px] font-medium text-[var(--color-text-primary)]">
                      UPI
                    </p>

                    <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                      Pay securely using UPI.
                    </p>
                  </div>

                  {paymentMethod === "upi" && (
                    <FiCheck size={16} className="text-[var(--color-accent)]" />
                  )}
                </button>
              </div>
            </section>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="h-fit border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6">
            <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)]">
              YOUR ORDER
            </p>

            {orderItems.length === 0 ? (
              <p className="border-b border-[var(--color-border-soft)] pb-5 text-[11px] leading-6 text-[var(--color-text-secondary)]">
                Your selected products will appear here before placing the
                order.
              </p>
            ) : (
              <div className="space-y-5 border-b border-[var(--color-border-soft)] pb-5">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-20 w-16 shrink-0 bg-[var(--color-bg-tertiary)]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-base text-[var(--color-text-primary)]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-2 text-[11px] text-[var(--color-text-primary)]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 border-b border-[var(--color-border-soft)] py-5 text-[11px]">
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Subtotal</span>

                <span className="text-[var(--color-text-primary)]">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span>Shipping</span>

                <span className="text-[var(--color-text-primary)]">
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-5 text-[var(--color-text-primary)]">
              <span className="font-serif text-lg">Total</span>

              <span className="font-medium">₹{total}</span>
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--color-dark-section)] text-[10px] font-semibold tracking-[0.12em] text-white transition hover:opacity-90"
            >
              PLACE ORDER
              <FiArrowRight size={14} />
            </button>

            <p className="mt-4 text-center text-[9px] leading-5 text-[var(--color-text-muted)]">
              By placing your order, you agree to our terms and conditions.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderPage;
