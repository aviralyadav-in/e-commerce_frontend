import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // ===============================
  // LOAD CART
  // ===============================
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    setCartItems(savedCart);
  }, []);

  // ===============================
  // UPDATE LOCAL STORAGE
  // ===============================
  function saveCart(updatedCart) {
    setCartItems(updatedCart);
    localStorage.setItem("niyaCart", JSON.stringify(updatedCart));
  }

  // ===============================
  // INCREASE QUANTITY
  // ===============================
  function increaseQuantity(productId) {
    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    saveCart(updatedCart);
  }

  // ===============================
  // DECREASE QUANTITY
  // ===============================
  function decreaseQuantity(productId) {
    const updatedCart = cartItems
      .map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  }

  // ===============================
  // REMOVE FROM CART
  // ===============================
  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);

    saveCart(updatedCart);
  }

  // ===============================
  // PRICE CALCULATIONS
  // ===============================
  const subtotal = cartItems.reduce(
    (total, item) => total + Math.round(item.price * 83) * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 0 : 0;

  const total = subtotal + shipping;

  return (
    <main className="min-h-[70vh] bg-[#f8f8f6] px-5 py-6 md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[#c39920]">
            YOUR SELECTION
          </p>

          <h1 className="font-serif text-[34px] font-medium text-[#073b4c] md:text-[40px]">
            Shopping Bag
          </h1>

          <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-[#6b7f85]">
            Pieces chosen to become part of your story.
          </p>
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="mx-auto flex max-w-[600px] flex-col items-center border border-[#e2e8e7] bg-white px-6 py-16 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f1e6] text-[#c39920]">
              <FiShoppingBag size={25} strokeWidth={1.2} />
            </div>

            <h2 className="font-serif text-2xl text-[#073b4c]">
              Your bag is waiting
            </h2>

            <p className="mt-3 max-w-[360px] text-[11px] leading-6 text-[#6b7f85]">
              Discover a piece that feels unmistakably yours and add it to your
              collection.
            </p>

            <Link
              to="/"
              className="mt-8 flex h-11 items-center gap-2 bg-[#073b4c] px-7 text-[10px] font-semibold tracking-[0.12em] text-white transition hover:bg-[#0b4d60]"
            >
              EXPLORE COLLECTION
              <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* CART ITEMS */}
            <div className="border border-[#e2e8e7] bg-white">
              <div className="border-b border-[#e8eded] px-5 py-4">
                <p className="text-[9px] font-semibold tracking-[0.18em] text-[#c39920]">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "PIECE" : "PIECES"}
                </p>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#e8eded] p-5 last:border-b-0 md:gap-6"
                >
                  {/* IMAGE */}
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#f1f1ed] md:h-32 md:w-28">
                    <img
                      src={item.thumbnail || item.images?.[0]}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-[#c39920]">
                        {item.category?.name || "Bags"}
                      </p>

                      <h3 className="mt-1 font-serif text-lg text-[#073b4c]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[11px] font-medium text-[#385b66]">
                        ₹{Math.round(item.price * 83).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* CONTROLS */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex h-8 items-center border border-[#dfe6e6]">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-full w-8 items-center justify-center text-[#385b66] transition hover:bg-[#f7f5ef]"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={11} />
                        </button>

                        <span className="w-8 text-center text-[11px] text-[#073b4c]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-full w-8 items-center justify-center text-[#385b66] transition hover:bg-[#f7f5ef]"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={11} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9a7777] transition hover:text-[#073b4c]"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={15} strokeWidth={1.3} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="h-fit border border-[#e2e8e7] bg-white p-6">
              <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[#c39920]">
                ORDER SUMMARY
              </p>

              <div className="space-y-4 border-b border-[#e8eded] pb-5 text-[11px]">
                <div className="flex justify-between text-[#6b7f85]">
                  <span>Subtotal</span>

                  <span className="text-[#073b4c]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-[#6b7f85]">
                  <span>Shipping</span>

                  <span className="text-[#073b4c]">
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-5 font-medium text-[#073b4c]">
                <span className="font-serif text-lg">Total</span>

                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <Link
                to="/order"
                className="flex h-12 w-full items-center justify-center gap-2 bg-[#073b4c] text-[10px] font-semibold tracking-[0.12em] text-white transition hover:bg-[#0b4d60]"
              >
                PROCEED TO ORDER
                <FiArrowRight size={14} />
              </Link>

              <p className="mt-4 text-center text-[9px] leading-5 text-[#8a999d]">
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
