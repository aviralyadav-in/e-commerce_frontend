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
    <main className="min-h-[70vh] bg-[#f8f8f6] px-5 py-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[#c39920]">
            COMPLETE YOUR ORDER
          </p>
          <h1 className="font-serif text-[34px] font-medium text-[#073b4c] md:text-[40px]">
            Order Details
          </h1>
          <p className="mt-3 text-[12px] leading-6 text-[#6b7f85]">
            Almost yours. Just a few details before we prepare your order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="border border-[#e2e8e7] bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#f5f1e6] text-[#c39920]">
                  <FiMapPin size={16} strokeWidth={1.3} />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-[#c39920]">
                    DELIVERY
                  </p>
                  <h2 className="font-serif text-xl text-[#073b4c]">
                    Shipping Address
                  </h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] text-[#385b66]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none focus:border-[#073b4c]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-[11px] text-[#385b66]">
                    Address
                  </label>
                  <textarea
                    placeholder="House no., street, area"
                    rows="3"
                    className="w-full resize-none border border-[#dfe6e6] bg-white px-4 py-3 text-[12px] text-[#073b4c] outline-none focus:border-[#073b4c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] text-[#385b66]">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none focus:border-[#073b4c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] text-[#385b66]">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter PIN code"
                    className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none focus:border-[#073b4c]"
                  />
                </div>
              </div>
            </section>

            <section className="border border-[#e2e8e7] bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#f5f1e6] text-[#c39920]">
                  <FiPhone size={16} strokeWidth={1.3} />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-[#c39920]">
                    CONTACT
                  </p>
                  <h2 className="font-serif text-xl text-[#073b4c]">
                    Phone Number
                  </h2>
                </div>
              </div>

              <input
                type="tel"
                placeholder="Enter your phone number"
                className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none focus:border-[#073b4c]"
              />
            </section>

            <section className="border border-[#e2e8e7] bg-white p-6 md:p-8">
              <p className="mb-2 text-[9px] tracking-[0.2em] text-[#c39920]">
                PAYMENT
              </p>
              <h2 className="font-serif text-xl text-[#073b4c]">
                Choose Payment Method
              </h2>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center justify-between border p-4 text-left transition ${paymentMethod === "cod" ? "border-[#073b4c] bg-[#f8f8f6]" : "border-[#dfe6e6] bg-white"}`}
                >
                  <div>
                    <p className="text-[11px] font-medium text-[#073b4c]">
                      Cash on Delivery
                    </p>
                    <p className="mt-1 text-[10px] text-[#6b7f85]">
                      Pay when your order arrives.
                    </p>
                  </div>
                  {paymentMethod === "cod" && (
                    <FiCheck size={16} className="text-[#c39920]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex w-full items-center justify-between border p-4 text-left transition ${paymentMethod === "upi" ? "border-[#073b4c] bg-[#f8f8f6]" : "border-[#dfe6e6] bg-white"}`}
                >
                  <div>
                    <p className="text-[11px] font-medium text-[#073b4c]">
                      UPI
                    </p>
                    <p className="mt-1 text-[10px] text-[#6b7f85]">
                      Pay securely using UPI.
                    </p>
                  </div>
                  {paymentMethod === "upi" && (
                    <FiCheck size={16} className="text-[#c39920]" />
                  )}
                </button>
              </div>
            </section>
          </div>

          <aside className="h-fit border border-[#e2e8e7] bg-white p-6">
            <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[#c39920]">
              YOUR ORDER
            </p>

            {orderItems.length === 0 ? (
              <p className="border-b border-[#e8eded] pb-5 text-[11px] leading-6 text-[#6b7f85]">
                Your selected products will appear here before placing the
                order.
              </p>
            ) : (
              <div className="space-y-5 border-b border-[#e8eded] pb-5">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-20 w-16 shrink-0 bg-[#f1f1ed]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-base text-[#073b4c]">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-[10px] text-[#6b7f85]">
                        Qty: {item.quantity}
                      </p>
                      <p className="mt-2 text-[11px] text-[#073b4c]">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 border-b border-[#e8eded] py-5 text-[11px]">
              <div className="flex justify-between text-[#6b7f85]">
                <span>Subtotal</span>
                <span className="text-[#073b4c]">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-[#6b7f85]">
                <span>Shipping</span>
                <span className="text-[#073b4c]">
                  {shipping === 0 ? "Free" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-5 text-[#073b4c]">
              <span className="font-serif text-lg">Total</span>
              <span className="font-medium">₹{total}</span>
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 bg-[#073b4c] text-[10px] font-semibold tracking-[0.12em] text-white transition hover:bg-[#0b4d60]"
            >
              PLACE ORDER <FiArrowRight size={14} />
            </button>

            <p className="mt-4 text-center text-[9px] leading-5 text-[#8a999c]">
              By placing your order, you agree to our terms and conditions.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderPage;
