import { useEffect, useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AccountPage() {
  const [mode, setMode] = useState("signin");
  const [user, setUser] = useState(null);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("niyaUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const wishlist = JSON.parse(localStorage.getItem("niyaWishlist") || "[]");

    const cart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    setWishlistCount(wishlist.length);

    setCartCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
  }, []);

  if (user) {
    return (
      <main className="min-h-[calc(100vh-70px)] bg-[#faf9f5] px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[900px]">
          {/* HEADER */}

          <div className="mb-12">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-[#c39920]">
              MY ACCOUNT
            </p>

            <h1 className="font-serif text-[38px] font-medium text-[#073b4c]">
              Welcome, {user.firstName}
            </h1>

            <p className="mt-3 text-[12px] text-[#6b7f85]">
              Manage your Niya Bags account and personal details.
            </p>
          </div>

          {/* PROFILE */}

          <div className="border border-[#e4e9e9] bg-white p-6 md:p-10">
            <div className="mb-8 flex items-center gap-5 border-b border-[#e8eded] pb-8">
              <img
                src={user.image}
                alt={user.firstName}
                className="h-16 w-16 rounded-full object-cover"
              />

              <div>
                <h2 className="font-serif text-[22px] text-[#073b4c]">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="mt-1 text-[11px] text-[#6b7f85]">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* USER DETAILS */}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[#c39920]">
                  EMAIL
                </p>

                <p className="text-[12px] text-[#385b66]">{user.email}</p>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[#c39920]">
                  PHONE
                </p>

                <p className="text-[12px] text-[#385b66]">{user.phone}</p>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[#c39920]">
                  GENDER
                </p>

                <p className="text-[12px] capitalize text-[#385b66]">
                  {user.gender}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[#c39920]">
                  USERNAME
                </p>

                <p className="text-[12px] text-[#385b66]">{user.username}</p>
              </div>
            </div>

            {/* WISHLIST + CART */}

            <div className="mt-10 grid gap-4 border-t border-[#e8eded] pt-10 sm:grid-cols-2">
              <Link
                to="/wishlist"
                className="group border border-[#e2e8e7] bg-[#faf9f5] p-5 transition hover:border-[#073b4c]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#f5f1e6] text-[#c39920]">
                    <FiHeart size={18} strokeWidth={1.3} />
                  </div>

                  <span className="text-[10px] text-[#6b7f85]">
                    {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[20px] text-[#073b4c]">
                  Wishlist
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-[#6b7f85]">
                  View the pieces you have saved.
                </p>

                <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-[#c39920] group-hover:underline">
                  VIEW WISHLIST →
                </p>
              </Link>

              <Link
                to="/cart"
                className="group border border-[#e2e8e7] bg-[#faf9f5] p-5 transition hover:border-[#073b4c]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#f5f1e6] text-[#c39920]">
                    <FiShoppingBag size={18} strokeWidth={1.3} />
                  </div>

                  <span className="text-[10px] text-[#6b7f85]">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[20px] text-[#073b4c]">
                  Shopping Bag
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-[#6b7f85]">
                  Review the pieces in your bag.
                </p>

                <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-[#c39920] group-hover:underline">
                  VIEW BAG →
                </p>
              </Link>
            </div>

            {/* SIGN OUT */}

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("niyaUser");
                setUser(null);
                setMode("signin");
              }}
              className="mt-10 h-11 border border-[#073b4c] px-8 text-[10px] tracking-[0.12em] text-[#073b4c] transition hover:bg-[#073b4c] hover:text-white"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#faf9f5] px-4 py-6 md:px-10 md:py-4">
      <div className="mx-auto flex min-h-[calc(100vh-110px)] max-w-[1200px] flex-col items-center justify-start pt-2 md:pt-3">
        <div className="mb-2 text-center">
          <Link
            to="/"
            className="font-serif text-[22px] font-semibold tracking-[-0.02em] text-[#073b4c]"
          >
            Niya Bags
          </Link>
        </div>

        <div className="w-full max-w-[520px] border border-[#e4e9e9] bg-white px-5 py-6 shadow-[0_10px_40px_rgba(7,59,76,0.04)] sm:px-8 sm:py-8 md:px-12 md:py-10">
          {mode === "signin" ? (
            <SignIn onSwitch={() => setMode("signup")} />
          ) : (
            <SignUp onSwitch={() => setMode("signin")} />
          )}
        </div>
      </div>
    </main>
  );
}

export default AccountPage;
