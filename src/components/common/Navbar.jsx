import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMoon,
  FiSun,
  FiX,
  FiLogOut,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";

import SearchOverlay from "./SearchOverlay";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ===============================
  // THEME CONTEXT
  // ===============================

  const { isDarkMode, toggleTheme } = useTheme();

  // ===============================
  // CART CONTEXT
  // ===============================

  const { cartCount } = useCart();

  // ===============================
  // WISHLIST CONTEXT
  // ===============================

  const { wishlistCount } = useWishlist();

  // ===============================
  // AUTH CONTEXT
  // ===============================

  const { user, loading, isAuthenticated, logout } = useAuth();

  function handleSearchOpen() {
    setMenuOpen(false);
    setSearchOpen(true);
  }

  function handleSearchClose() {
    setSearchOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
          {/* LOGO */}

          <Link
            to="/"
            className="font-serif text-[20px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] md:text-[23px]"
          >
            Niya Bags
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav className="ml-16 hidden items-center gap-8 md:flex">
            <Link
              to="/shop"
              className="text-[14px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              Shop All
            </Link>

            <Link
              to="/shop?filter=new-arrivals"
              className="text-[14px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              New Arrivals
            </Link>

            <Link
              to="/shop?filter=best-sellers"
              className="text-[14px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              Bestsellers
            </Link>
          </nav>

          {/* RIGHT SIDE */}

          <div className="ml-auto flex items-center gap-2 text-[var(--color-text-primary)] md:gap-4">
            {/* SALE */}

            <Link
              to="/sale"
              className="text-[12px] uppercase tracking-[0.18em] text-[var(--color-accent)] transition hover:opacity-70"
            >
              Sale
            </Link>

            {/* SEARCH */}

            <button
              type="button"
              aria-label="Search"
              onClick={handleSearchOpen}
              className="transition hover:text-[var(--color-accent)]"
            >
              <FiSearch size={17} strokeWidth={1.4} />
            </button>

            {/* THEME */}

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="transition hover:text-[var(--color-accent)]"
            >
              {isDarkMode ? (
                <FiSun size={17} strokeWidth={1.4} />
              ) : (
                <FiMoon size={17} strokeWidth={1.4} />
              )}
            </button>

            {/* ACCOUNT */}

            {!loading && (
              <>
                {isAuthenticated ? (
                  <Link
                    to="/account"
                    aria-label="Account"
                    title={user?.name || user?.email || "Account"}
                    className="transition hover:text-[var(--color-accent)]"
                  >
                    <FiUser size={17} strokeWidth={1.4} />
                  </Link>
                ) : (
                  <Link
                    to="/account"
                    aria-label="Sign In"
                    title="Sign In"
                    className="transition hover:text-[var(--color-accent)]"
                  >
                    <FiUser size={17} strokeWidth={1.4} />
                  </Link>
                )}

                {/* LOGOUT */}

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    title="Logout"
                    className="hidden transition hover:text-[var(--color-accent)] md:block"
                  >
                    <FiLogOut size={17} strokeWidth={1.4} />
                  </button>
                )}
              </>
            )}

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative transition hover:text-[var(--color-accent)]"
            >
              <FiHeart size={17} strokeWidth={1.4} />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[8px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* CART */}

            <Link
              to="/cart"
              aria-label="Shopping bag"
              className="relative transition hover:text-[var(--color-accent)]"
            >
              <FiShoppingBag size={17} strokeWidth={1.4} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[8px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}

            <button
              type="button"
              className="transition hover:text-[var(--color-accent)] md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}

        {menuOpen && (
          <nav className="border-t border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-xs text-[var(--color-text-secondary)]">
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--color-accent)]"
              >
                Shop All
              </Link>

              <Link
                to="/shop?filter=new-arrivals"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--color-accent)]"
              >
                New Arrivals
              </Link>

              <Link
                to="/shop?filter=best-sellers"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--color-accent)]"
              >
                Bestsellers
              </Link>

              {/* MOBILE ACCOUNT */}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="transition hover:text-[var(--color-accent)]"
                  >
                    My Account
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left transition hover:text-[var(--color-accent)]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="text-left transition hover:text-[var(--color-accent)]"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* SEARCH OVERLAY */}

      <SearchOverlay isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}

export default Navbar;
