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
            MOBILE BACKDROP
            ================================================== */}
        <div
          className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* ==================================================
            MOBILE LEFT DRAWER
            ================================================== */}
        <nav
          className={`fixed bottom-0 left-0 top-0 z-[70] w-[60%] max-w-[320px] overflow-y-auto bg-bg-secondary shadow-[8px_0_30px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out md:hidden ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!menuOpen}
        >
          {/* ==================================================
    DRAWER HEADER
    ================================================== */}
          <div className="flex min-h-[82px] items-center rounded-tr-[28px] bg-gradient-to-br from-[#073b4c] to-[#0b4658] px-5">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-white/70">
                Welcome
              </p>

              <p className="mt-1 truncate font-serif text-2xl font-semibold tracking-tight text-white">
                {isAuthenticated ? user?.name || user?.email || "User" : "User"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="ml-auto shrink-0 p-1 text-white/90 transition hover:text-white"
            >
              <FiX size={20} strokeWidth={1.5} />
            </button>
          </div>
          {/* ==================================================
              DRAWER CONTENT
              ================================================== */}
          <div className="flex flex-col gap-2 px-4 py-5">
            {/* SHOP ALL */}
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary px-3 py-2.5 transition hover:bg-bg-tertiary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiGrid size={14} />
              </div>

              <span className="text-xs font-semibold text-text-primary">
                Shop All Bags
              </span>
            </Link>

            {/* NEW ARRIVALS */}
            <Link
              to="/shop?filter=new-arrivals"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary px-3 py-2.5 transition hover:bg-bg-tertiary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiAward size={14} />
              </div>

              <span className="text-xs font-semibold text-text-primary">
                New Arrivals
              </span>
            </Link>

            {/* BESTSELLERS */}
            <Link
              to="/shop?filter=best-sellers"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary px-3 py-2.5 transition hover:bg-bg-tertiary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiTrendingUp size={14} />
              </div>

              <span className="text-xs font-semibold text-text-primary">
                Bestsellers
              </span>
            </Link>

            {/* SALE */}
            <Link
              to="/sale"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary px-3 py-2.5 transition hover:bg-bg-tertiary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiTag size={14} />
              </div>

              <span className="text-xs font-semibold text-accent">Sale</span>
            </Link>

            {/* ACCOUNT */}
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary px-3 py-2.5 transition hover:bg-bg-tertiary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiUser size={14} />
              </div>

              <span className="text-xs font-semibold text-text-primary">
                {isAuthenticated
                  ? user?.name || user?.email || "My Account"
                  : "Sign In / Register"}
              </span>
            </Link>

            {/* THEME */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-3 rounded-xs border border-border-soft bg-bg-primary px-3 py-2.5 text-left transition hover:bg-bg-tertiary"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                {isDarkMode ? <FiSun size={14} /> : <FiMoon size={14} />}
              </div>

              <span className="text-xs font-semibold text-text-primary">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* LOGOUT */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex items-center gap-3 border-t border-border-soft px-3 py-3 text-left text-red-500 transition hover:text-red-600"
              >
                <FiLogOut size={15} />

                <span className="text-xs font-semibold">Sign Out</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY */}
      <SearchOverlay isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}

export default Navbar;
