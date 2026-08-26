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
  FiGrid,
  FiAward,
  FiTrendingUp,
  FiTag,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const { user, isAuthenticated, logout } = useAuth();

  // ===============================
  // BODY SCROLL LOCK
  // ===============================
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // ===============================
  // SEARCH
  // ===============================
  function handleSearchOpen() {
    setMenuOpen(false);
    setSearchOpen(true);
  }

  function handleSearchClose() {
    setSearchOpen(false);
  }

  // ===============================
  // LOGOUT
  // ===============================
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
      {/* ==================================================
          NAVBAR
          ================================================== */}
      <header className="sticky top-0 z-50 border-b border-border-soft bg-bg-secondary">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
          {/* LOGO */}
          <Link
            to="/"
            className="font-serif text-xl font-semibold tracking-tight text-text-primary transition hover:text-accent md:text-2xl"
          >
            Niya Bags
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}
          <nav className="ml-16 hidden items-center gap-8 md:flex">
            <Link
              to="/shop"
              className="text-sm font-medium text-text-secondary transition hover:text-accent"
            >
              Shop All
            </Link>

            <Link
              to="/shop?filter=new-arrivals"
              className="text-sm font-medium text-text-secondary transition hover:text-accent"
            >
              New Arrivals
            </Link>

            <Link
              to="/shop?filter=best-sellers"
              className="text-sm font-medium text-text-secondary transition hover:text-accent"
            >
              Bestsellers
            </Link>

            <Link
              to="/sale"
              className="text-sm font-medium text-accent transition hover:text-text-primary"
            >
              Sale
            </Link>
          </nav>

          {/* ==================================================
              RIGHT SIDE
              ================================================== */}
          <div className="ml-auto flex items-center gap-2 text-text-primary md:gap-4">
            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
              onClick={handleSearchOpen}
              className="p-1 transition hover:text-accent"
            >
              <FiSearch size={17} strokeWidth={1.4} />
            </button>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-1 transition hover:text-accent"
            >
              <FiHeart size={17} strokeWidth={1.4} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[8px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* ==================================================
                MOBILE SHOPPING BAG
                ================================================== */}
            <Link
              to="/cart"
              aria-label="Shopping Bag"
              title="Shopping Bag"
              className="relative p-1 transition hover:text-accent md:hidden"
            >
              <FiShoppingBag size={18} strokeWidth={1.4} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[8px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* ==================================================
                DESKTOP ACCOUNT
                ================================================== */}
            <Link
              to="/account"
              aria-label="Account"
              title="Account"
              className="hidden p-1 transition hover:text-accent md:block"
            >
              <FiUser size={18} strokeWidth={1.4} />
            </Link>

            {/* DESKTOP THEME */}
            <button
              type="button"
              aria-label="Toggle theme"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
              onClick={toggleTheme}
              className="hidden p-1 transition hover:text-accent md:block"
            >
              {isDarkMode ? (
                <FiSun size={18} strokeWidth={1.4} />
              ) : (
                <FiMoon size={18} strokeWidth={1.4} />
              )}
            </button>

            {/* DESKTOP CART */}
            <Link
              to="/cart"
              aria-label="Shopping Bag"
              title="Shopping Bag"
              className="relative hidden p-1 transition hover:text-accent md:block"
            >
              <FiShoppingBag size={18} strokeWidth={1.4} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[8px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* DESKTOP LOGOUT */}
            {isAuthenticated && (
              <button
                type="button"
                aria-label="Sign Out"
                title="Sign Out"
                onClick={handleLogout}
                className="hidden p-1 text-text-primary transition hover:text-red-500 md:block"
              >
                <FiLogOut size={18} strokeWidth={1.4} />
              </button>
            )}

            {/* ==================================================
                MOBILE HAMBURGER
                ================================================== */}
            <button
              type="button"
              className="p-1 transition hover:text-accent md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE FULL-SCREEN OVERLAY MENU
            ================================================== */}
        <nav
          className={`fixed inset-0 z-[70] flex w-full flex-col bg-[var(--color-bg-secondary)] transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 -translate-y-4"
          }`}
          aria-hidden={!menuOpen}
        >
          {/* DRAWER HEADER */}
          <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-[var(--color-border)] px-6 md:px-10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-medium">
                Welcome
              </p>
              <p className="font-serif text-lg font-medium text-[var(--color-text-primary)]">
                {isAuthenticated ? user?.name || user?.email || "My Account" : "Niya Guest"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg-tertiary)]"
            >
              <FiX size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* DRAWER CONTENT */}
          <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-8 md:px-10">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-3 font-semibold">
                Menu
              </p>
              
              {/* SHOP ALL */}
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 py-3.5 text-base font-medium text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] border-b border-[var(--color-border)]/40"
              >
                <FiGrid size={18} strokeWidth={1.4} className="text-[var(--color-accent)]" />
                <span>Shop All Bags</span>
              </Link>

              {/* NEW ARRIVALS */}
              <Link
                to="/shop?filter=new-arrivals"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 py-3.5 text-base font-medium text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] border-b border-[var(--color-border)]/40"
              >
                <FiAward size={18} strokeWidth={1.4} className="text-[var(--color-accent)]" />
                <span>New Arrivals</span>
              </Link>

              {/* BESTSELLERS */}
              <Link
                to="/shop?filter=best-sellers"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 py-3.5 text-base font-medium text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] border-b border-[var(--color-border)]/40"
              >
                <FiTrendingUp size={18} strokeWidth={1.4} className="text-[var(--color-accent)]" />
                <span>Bestsellers</span>
              </Link>

              {/* SALE */}
              <Link
                to="/sale"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 py-3.5 text-base font-medium text-[var(--color-accent)] transition hover:opacity-80 border-b border-[var(--color-border)]/40"
              >
                <FiTag size={18} strokeWidth={1.4} />
                <span>Sale Collection</span>
              </Link>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mt-8 mb-3 font-semibold">
                Preferences & Account
              </p>

              {/* ACCOUNT */}
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 py-3.5 text-base font-medium text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] border-b border-[var(--color-border)]/40"
              >
                <FiUser size={18} strokeWidth={1.4} className="text-[var(--color-accent)]" />
                <span>
                  {isAuthenticated
                    ? user?.name || user?.email || "My Account"
                    : "Sign In / Register"}
                </span>
              </Link>

              {/* THEME TOGGLE */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-width justify-between w-full py-3.5 text-base font-medium text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)] border-b border-[var(--color-border)]/40 text-left"
              >
                <div className="flex items-center gap-4">
                  {isDarkMode ? (
                    <FiSun size={18} strokeWidth={1.4} className="text-[var(--color-accent)]" />
                  ) : (
                    <FiMoon size={18} strokeWidth={1.4} className="text-[var(--color-accent)]" />
                  )}
                  <span>Appearance</span>
                </div>
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                  {isDarkMode + " Dark Mode" ? (isDarkMode ? "Dark" : "Light") : ""}
                </span>
              </button>
            </div>

            {/* DRAWER FOOTER / LOGOUT */}
            <div className="pt-6 pb-4">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 py-3.5 text-xs font-semibold uppercase tracking-wider text-red-500 transition hover:bg-red-500/20"
                >
                  <FiLogOut size={16} />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY */}
      <SearchOverlay isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}

export default Navbar;