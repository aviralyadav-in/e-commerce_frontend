import { useEffect, useState } from "react";

import { FiHeart, FiShoppingBag, FiLogOut } from "react-icons/fi";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import SignIn from "./SignIn";

import SignUp from "./SignUp";

function AccountPage() {
  const [mode, setMode] = useState("signin");

  const { user: authUser, logout } = useAuth();

  const [localUser, setLocalUser] = useState(null);

  const [wishlistCount, setWishlistCount] = useState(0);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("niyaUser");

    if (savedUser) {
      try {
        setLocalUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse niyaUser from localStorage", e);
      }
    }

    const wishlist = JSON.parse(localStorage.getItem("niyaWishlist") || "[]");

    const cart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    setWishlistCount(wishlist.length);

    setCartCount(cart.reduce((total, item) => total + (item.quantity || 1), 0));
  }, []);

  const currentUser = authUser || localUser;

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout error", e);
    }

    localStorage.removeItem("niyaUser");

    setLocalUser(null);

    setMode("signin");
  };

  if (currentUser) {
    const displayName = currentUser.name || "User";

    return (
      <main className="min-h-[calc(100vh-70px)] bg-bg-primary px-5 py-8 text-text-primary md:px-10 md:py-10">
        <div className="mx-auto max-w-[900px]">
          {/* HEADER */}
          <div className="mb-12">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-accent font-medium">
              MY ACCOUNT
            </p>

            <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
              Welcome, {displayName}
            </h1>

            <p className="mt-3 text-xs text-text-secondary">
              Manage your Niya Bags account and personal details.
            </p>
          </div>

          {/* PROFILE CARD */}
          <div className="border border-border-soft bg-bg-secondary p-6 md:p-10 rounded-sm">
            <div className="mb-8 flex items-center justify-between border-b border-border-soft pb-8">
              <div className="flex items-center gap-5">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={displayName}
                    className="h-16 w-16 rounded-full object-cover border border-border-soft"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-medium text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h2 className="font-serif text-2xl text-text-primary">
                    {displayName}
                  </h2>
                </div>
              </div>

              {/* EDIT PROFILE + SIGN OUT */}
              <div className="flex items-center gap-5">
                <Link
                  to="/profile"
                  className="border-b border-text-primary pb-1 text-[10px] font-medium tracking-[0.08em] text-text-primary transition hover:opacity-70"
                >
                  EDIT PROFILE
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 border-b border-accent pb-1 text-[10px] font-medium tracking-[0.08em] text-accent transition hover:opacity-70"
                >
                  SIGN OUT
                  <FiLogOut size={13} />
                </button>
              </div>
            </div>

            {/* USER DETAILS */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* NAME */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  NAME
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.name || "—"}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  EMAIL
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.email || "—"}
                </p>
              </div>

              {/* PHONE */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  PHONE
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.phone || "—"}
                </p>
              </div>

              {/* GENDER */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  GENDER
                </p>

                <p className="text-xs capitalize text-text-secondary">
                  {currentUser.gender || "—"}
                </p>
              </div>

              {/* DATE OF BIRTH */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  DATE OF BIRTH
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.dateOfBirth || "—"}
                </p>
              </div>

              {/* ADDRESS */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  ADDRESS
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.address || "—"}
                </p>
              </div>

              {/* CITY */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  CITY
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.city || "—"}
                </p>
              </div>

              {/* STATE */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  STATE
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.state || "—"}
                </p>
              </div>

              {/* PINCODE */}
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-accent font-medium">
                  PINCODE
                </p>

                <p className="text-xs text-text-secondary">
                  {currentUser.pincode || "—"}
                </p>
              </div>
            </div>

            {/* WISHLIST + CART LINKS */}
            <div className="mt-10 grid gap-4 border-t border-border-soft pt-10 sm:grid-cols-2">
              <Link
                to="/wishlist"
                className="group border border-border-soft bg-bg-primary p-5 transition hover:border-text-primary rounded-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-accent-soft text-accent rounded-full">
                    <FiHeart size={18} strokeWidth={1.3} />
                  </div>

                  <span className="text-[10px] text-text-secondary">
                    {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl text-text-primary">
                  Wishlist
                </h3>

                <p className="mt-2 text-xs leading-5 text-text-secondary">
                  View the pieces you have saved.
                </p>

                <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-accent group-hover:underline">
                  VIEW WISHLIST →
                </p>
              </Link>

              <Link
                to="/cart"
                className="group border border-border-soft bg-bg-primary p-5 transition hover:border-text-primary rounded-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-accent-soft text-accent rounded-full">
                    <FiShoppingBag size={18} strokeWidth={1.3} />
                  </div>

                  <span className="text-[10px] text-text-secondary">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl text-text-primary">
                  Shopping Bag
                </h3>

                <p className="mt-2 text-xs leading-5 text-text-secondary">
                  Review the pieces in your bag.
                </p>

                <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-accent group-hover:underline">
                  VIEW BAG →
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-70px)] bg-bg-primary px-4 py-6 text-text-primary md:px-10 md:py-4">
      <div className="mx-auto flex min-h-[calc(100vh-110px)] max-w-[1200px] flex-col items-center justify-start pt-2 md:pt-3">
        <div className="mb-2 text-center">
          <Link
            to="/"
            className="font-serif text-2xl font-semibold tracking-tight text-text-primary"
          >
            Niya Bags
          </Link>
        </div>

        <div className="w-full max-w-[520px] border border-border-soft bg-bg-secondary px-5 py-6 shadow-sm sm:px-8 sm:py-8 md:px-12 md:py-10 rounded-sm">
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
