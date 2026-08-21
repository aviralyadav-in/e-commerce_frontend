import { useEffect, useState } from "react";
import { FiHeart, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AccountPage() {
  const [mode, setMode] = useState("signin");
  const { user: authUser, logout } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const navigate = useNavigate();
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
    const displayName =
      currentUser.firstName || currentUser.name || currentUser.email || "User";

    const username =
      currentUser.username || currentUser.email?.split("@")[0] || "user";

    return (
      <main className="min-h-[calc(100vh-70px)] bg-[var(--color-bg-primary)] px-5 py-8 text-[var(--color-text-primary)] md:px-10 md:py-10">
        <div className="mx-auto max-w-[900px]">
          {/* HEADER */}
          <div className="mb-12">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
              MY ACCOUNT
            </p>

            <h1 className="font-serif text-[38px] font-medium text-[var(--color-text-primary)]">
              Welcome, {displayName}
            </h1>

            <p className="mt-3 text-[12px] text-[var(--color-text-secondary)]">
              Manage your Niya Bags account and personal details.
            </p>
          </div>

          {/* PROFILE */}
          <div className="border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-[var(--color-border-soft)] pb-8">
              <div className="flex items-center gap-5">
                {currentUser.image ? (
                  <img
                    src={currentUser.image}
                    alt={displayName}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-xl font-medium text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h2 className="font-serif text-[22px] text-[var(--color-text-primary)]">
                    {currentUser.firstName
                      ? `${currentUser.firstName} ${currentUser.lastName || ""}`
                      : displayName}
                  </h2>

                  <p className="mt-1 text-[11px] text-[var(--color-text-secondary)]">
                    @{username}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-2 border-b border-[var(--color-accent)] pb-1 text-[10px] font-medium tracking-[0.08em] text-[var(--color-accent)] transition hover:opacity-70"
              >
                SIGN OUT
                <FiLogOut size={13} />
              </button>
            </div>

            {/* USER DETAILS */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[var(--color-accent)]">
                  EMAIL
                </p>

                <p className="text-[12px] text-[var(--color-text-secondary)]">
                  {currentUser.email || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[var(--color-accent)]">
                  PHONE
                </p>

                <p className="text-[12px] text-[var(--color-text-secondary)]">
                  {currentUser.phone || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[var(--color-accent)]">
                  GENDER
                </p>

                <p className="text-[12px] capitalize text-[var(--color-text-secondary)]">
                  {currentUser.gender || "—"}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.12em] text-[var(--color-accent)]">
                  USERNAME
                </p>

                <p className="text-[12px] text-[var(--color-text-secondary)]">
                  {username}
                </p>
              </div>
            </div>

            {/* WISHLIST + CART */}
            <div className="mt-10 grid gap-4 border-t border-[var(--color-border-soft)] pt-10 sm:grid-cols-2">
              <Link
                to="/wishlist"
                className="group border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] p-5 transition hover:border-[var(--color-text-primary)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <FiHeart size={18} strokeWidth={1.3} />
                  </div>

                  <span className="text-[10px] text-[var(--color-text-secondary)]">
                    {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[20px] text-[var(--color-text-primary)]">
                  Wishlist
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-[var(--color-text-secondary)]">
                  View the pieces you have saved.
                </p>

                <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-[var(--color-accent)] group-hover:underline">
                  VIEW WISHLIST →
                </p>
              </Link>

              <Link
                to="/cart"
                className="group border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] p-5 transition hover:border-[var(--color-text-primary)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <FiShoppingBag size={18} strokeWidth={1.3} />
                  </div>

                  <span className="text-[10px] text-[var(--color-text-secondary)]">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[20px] text-[var(--color-text-primary)]">
                  Shopping Bag
                </h3>

                <p className="mt-2 text-[11px] leading-5 text-[var(--color-text-secondary)]">
                  Review the pieces in your bag.
                </p>

                <p className="mt-4 text-[9px] font-semibold tracking-[0.12em] text-[var(--color-accent)] group-hover:underline">
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
    <main className="min-h-[calc(100vh-70px)] bg-[var(--color-bg-primary)] px-4 py-6 text-[var(--color-text-primary)] md:px-10 md:py-4">
      <div className="mx-auto flex min-h-[calc(100vh-110px)] max-w-[1200px] flex-col items-center justify-start pt-2 md:pt-3">
        <div className="mb-2 text-center">
          <Link
            to="/"
            className="font-serif text-[22px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
          >
            Niya Bags
          </Link>
        </div>

        <div className="w-full max-w-[520px] border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] px-5 py-6 shadow-[0_10px_40px_rgba(7,59,76,0.04)] sm:px-8 sm:py-8 md:px-12 md:py-10">
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
