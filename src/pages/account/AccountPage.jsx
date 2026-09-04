
import { useEffect, useState } from "react";

import {
  FiHeart,
  FiShoppingBag,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import BackButton from "../../components/common/BackButton";

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

    const wishlist = JSON.parse(
      localStorage.getItem("niyaWishlist") || "[]"
    );

    const cart = JSON.parse(
      localStorage.getItem("niyaCart") || "[]"
    );

    setWishlistCount(wishlist.length);

    setCartCount(
      cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      )
    );
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

          {/* BACK */}
          <BackButton className="mb-7" />

          {/* HEADER */}
          <div className="mb-12">
            <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-accent">
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
          <div className="rounded-sm border border-border-soft bg-bg-secondary p-6 md:p-10">

            {/* PROFILE HEADER */}
            <div className="mb-8 flex items-center justify-between border-b border-border-soft pb-8">
              <div className="flex items-center gap-5">

                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={displayName}
                    className="h-16 w-16 rounded-full border border-border-soft object-cover"
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
            </div>

            {/* USER DETAILS */}
            <div className="grid gap-6 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <p className="mb-2 text-[10px] font-medium tracking-[0.12em] text-accent">
                  NAME
                </p>
                <p className="text-xs text-text-secondary">
                  {currentUser.name || "—"}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <p className="mb-2 text-[10px] font-medium tracking-[0.12em] text-accent">
                  EMAIL
                </p>
                <p className="text-xs text-text-secondary">
                  {currentUser.email || "—"}
                </p>
              </div>

              {/* PHONE */}
              <div>
                <p className="mb-2 text-[10px] font-medium tracking-[0.12em] text-accent">
                  PHONE
                </p>
                <p className="text-xs text-text-secondary">
                  {currentUser.phone || "—"}
                </p>
              </div>
            </div>

            {/* SAVED ADDRESSES — only render the ones that are actually filled */}
            <div className="mt-10 border-t border-border-soft pt-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[10px] font-medium tracking-[0.12em] text-accent">
                  SAVED ADDRESSES
                </p>
                <Link
                  to="/profile"
                  className="text-[10px] font-semibold tracking-wider text-accent transition hover:opacity-70"
                >
                  + ADD / EDIT
                </Link>
              </div>

              {(() => {
                const savedAddresses = Array.isArray(
                  currentUser.addresses,
                )
                  ? currentUser.addresses.filter(
                      (a) =>
                        a && a.address && a.city && a.pincode,
                    )
                  : [];

                if (savedAddresses.length === 0) {
                  return (
                    <p className="text-xs text-text-muted">
                      You have not saved any addresses yet. Add one from
                      Edit Profile to use it during checkout.
                    </p>
                  );
                }

                return (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {savedAddresses.map((addr, idx) => (
                      <div
                        key={addr.id || idx}
                        className="rounded-xs border border-border-soft bg-bg-primary p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-[10px] font-semibold tracking-wider text-text-primary">
                            {`Address ${idx + 1}`}
                          </p>
                          {addr.isDefault && (
                            <span className="rounded-xs bg-accent-soft px-2 py-0.5 text-[9px] font-semibold tracking-wider text-accent uppercase">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="text-xs leading-relaxed text-text-secondary">
                          {addr.address}
                        </p>
                        <p className="mt-1 text-xs text-text-secondary">
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ""}
                          {addr.pincode ? ` — ${addr.pincode}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* EDIT PROFILE + SIGN OUT */}
            <div className="mt-10 border-t border-border-soft pt-6">

              <div className="mb-6 flex items-center justify-between">

                <Link
                  to="/profile"
                  className="w-32 border-b border-text-primary pb-1 text-center text-[16px] font-medium tracking-[0.08em] text-text-primary transition hover:opacity-70"
                >
                  EDIT PROFILE
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-28 items-center justify-center gap-2 border-b border-accent pb-1 text-center text-[10px] font-medium tracking-[0.08em] text-accent transition hover:opacity-70"
                >
                  <span>SIGN OUT</span>
                  <FiLogOut size={13} />
                </button>

              </div>

              {/* WISHLIST + CART + MY ORDERS */}
              <div className="grid gap-4 sm:grid-cols-2">

                {/* WISHLIST */}
                <Link
                  to="/wishlist"
                  className="group rounded-sm border border-border-soft bg-bg-primary p-5 transition hover:border-text-primary"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <FiHeart size={18} strokeWidth={1.3} />
                    </div>

                    <span className="text-[10px] text-text-secondary">
                      {wishlistCount}{" "}
                      {wishlistCount === 1 ? "item" : "items"}
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

                {/* CART */}
                <Link
                  to="/cart"
                  className="group rounded-sm border border-border-soft bg-bg-primary p-5 transition hover:border-text-primary"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <FiShoppingBag size={18} strokeWidth={1.3} />
                    </div>

                    <span className="text-[10px] text-text-secondary">
                      {cartCount}{" "}
                      {cartCount === 1 ? "item" : "items"}
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

                {/* MY ORDERS */}
                <Link
                  to="/my-orders"
                  className="group rounded-sm border border-border-soft bg-bg-primary p-5 transition hover:border-text-primary"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <FiPackage size={18} strokeWidth={1.3} />
                    </div>

                  </div>

                  <h3 className="mt-5 font-serif text-xl text-text-primary">
                    My Orders
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-text-secondary">
                    Track and view your placed orders.
                  </p>

                  <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-accent group-hover:underline">
                    VIEW ORDERS →
                  </p>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-bg-primary px-5 py-6 md:px-10 md:py-8 flex flex-col justify-between">

      {/* LOGO */}
      <div className="w-full">
        <Link
          to="/"
          className="font-serif text-lg font-bold tracking-wider text-text-primary"
        >
          NIYA BAGS
        </Link>
      </div>

      {/* SIGN IN / SIGN UP */}
      <div className="mx-auto my-auto w-full max-w-[520px] rounded-sm border border-border-soft bg-bg-secondary px-5 py-6 shadow-sm sm:px-8 sm:py-8 md:px-12 md:py-10">

        {mode === "signin" ? (
          <SignIn onSwitch={() => setMode("signup")} />
        ) : (
          <SignUp onSwitch={() => setMode("signin")} />
        )}

      </div>

      {/* BALANCE */}
      <div />

    </main>
  );
}

export default AccountPage;
