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
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;

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
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] shadow-sm">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-4 sm:px-6 md:px-8 lg:px-14">
          {/* LOGO */}
          <Link
            to="/"
            className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] shrink-0"
          >
            Niya Bags
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}
          <nav className="hidden items-center gap-5 md:ml-8 md:flex lg:ml-12 lg:gap-8 xl:ml-16">
            <Link
              to="/shop"
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              Shop All
            </Link>

            <Link
              to="/shop?filter=new-arrivals"
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              New Arrivals
            </Link>

            <Link
              to="/shop?filter=best-sellers"
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
            >
              Bestsellers
            </Link>

            <Link
              to="/sale"
              className="text-sm font-medium text-[var(--color-accent)] transition-opacity hover:opacity-80"
            >
              Sale
            </Link>
          </nav>

          {/* ==================================================
              RIGHT SIDE
              ================================================== */}
          <div className="ml-auto flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-4 text-[var(--color-text-primary)]">            
            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
              onClick={handleSearchOpen}
              className="p-1.5 sm:p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)]"
            >
              <FiSearch size={18} strokeWidth={1.5} />
            </button>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-1.5 sm:p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)]"
            >
              <FiHeart size={18} strokeWidth={1.5} />

              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[9px] font-semibold text-white shadow-sm">
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
              className="relative p-1.5 sm:p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] md:hidden"
            >
              <FiShoppingBag size={18} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[9px] font-semibold text-white shadow-sm">
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
              className="hidden p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] md:flex items-center justify-center"
            >
              <FiUser size={18} strokeWidth={1.5} />
            </Link>

            {/* DESKTOP THEME */}
            <button
              type="button"
              aria-label="Toggle theme"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
              onClick={toggleTheme}
              className="hidden p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] md:flex items-center justify-center"
            >
              {isDarkMode ? (
                <FiSun size={18} strokeWidth={1.5} />
              ) : (
                <FiMoon size={18} strokeWidth={1.5} />
              )}
            </button>

            {/* DESKTOP CART */}
            <Link
              to="/cart"
              aria-label="Shopping Bag"
              title="Shopping Bag"
              className="relative hidden p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] md:flex items-center justify-center"
            >
              <FiShoppingBag size={18} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[9px] font-semibold text-white shadow-sm">
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
                className="hidden p-2 rounded-full text-[var(--color-text-primary)] transition-colors hover:text-red-500 hover:bg-red-50 md:flex items-center justify-center"
              >
                <FiLogOut size={18} strokeWidth={1.5} />
              </button>
            )}

            {/* ==================================================
                MOBILE HAMBURGER
                ================================================== */}
            <button
              type="button"
              className="p-1.5 sm:p-2 rounded-full transition-colors hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE FULL-SCREEN OVERLAY MENU
            ================================================== */}
        <nav
          className={`fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col bg-[var(--color-bg-secondary)] transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 -translate-y-4"
          }`}
          aria-hidden={!menuOpen}
        >
          {/* DRAWER HEADER (Bigger Text Size) */}
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--color-border-soft)] px-5">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-text-muted)] font-semibold">
                Welcome
              </p>
              <p className="font-serif text-lg sm:text-xl font-medium text-[var(--color-text-primary)]">
                {isAuthenticated ? user?.name || user?.email || "My Account" : "Niya Guest"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-full p-2 text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-tertiary)]"
            >
              <FiX size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* DRAWER CONTENT */}
          <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-4">
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1 font-semibold">
                Menu
              </p>
              
              {/* SHOP ALL */}
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3.5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] border-b border-[var(--color-border-soft)]"
              >
                <FiGrid size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                <span>Shop All Bags</span>
              </Link>

              {/* NEW ARRIVALS */}
              <Link
                to="/shop?filter=new-arrivals"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3.5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] border-b border-[var(--color-border-soft)]"
              >
                <FiAward size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                <span>New Arrivals</span>
              </Link>

              {/* BESTSELLERS */}
              <Link
                to="/shop?filter=best-sellers"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3.5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] border-b border-[var(--color-border-soft)]"
              >
                <FiTrendingUp size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                <span>Bestsellers</span>
              </Link>

              {/* SALE */}
              <Link
                to="/sale"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3.5 py-3 text-sm font-medium text-[var(--color-accent)] transition-opacity hover:opacity-80 border-b border-[var(--color-border-soft)]"
              >
                <FiTag size={18} strokeWidth={1.5} />
                <span>Sale Collection</span>
              </Link>

              <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mt-5 mb-1 font-semibold">
                Preferences & Account
              </p>

              {/* ACCOUNT */}
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3.5 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] border-b border-[var(--color-border-soft)]"
              >
                <FiUser size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
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
                className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)] border-b border-[var(--color-border-soft)]"
              >
                <div className="flex items-center gap-3.5">
                  {isDarkMode ? (
                    <FiSun size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                  ) : (
                    <FiMoon size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                  )}
                  <span>Appearance</span>
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                  {isDarkMode ? "Dark" : "Light"}
                </span>
              </button>
            </div>

            {/* DRAWER FOOTER / LOGOUT */}
            <div className="pt-4 pb-2">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 py-3 text-xs font-semibold uppercase tracking-wider text-red-500 transition-colors hover:bg-red-500/15"
                >
                  <FiLogOut size={16} strokeWidth={1.5} />
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