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
  FiSettings,
  FiTag,
  FiGrid,
  FiAward,
  FiTrendingUp,
  FiFeather,
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
  const [settingsOpen, setSettingsOpen] = useState(false);
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
    setSettingsOpen(false);
    setSearchOpen(true);
  }

  function handleSearchClose() {
    setSearchOpen(false);
  }

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      setSettingsOpen(false);
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border-soft bg-bg-secondary">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
          {/* LOGO */}
          <Link
            to="/"
            className="font-serif text-xl font-semibold tracking-tight text-text-primary transition hover:text-accent md:text-2xl"
          >
            Niya Bags
          </Link>

          {/* DESKTOP NAVIGATION */}
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
          </nav>

          {/* RIGHT SIDE ICONS */}
          <div className="ml-auto flex items-center gap-2 text-text-primary md:gap-4">
            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
              onClick={handleSearchOpen}
              className="transition hover:text-accent p-1"
            >
              <FiSearch size={17} strokeWidth={1.4} />
            </button>

            {/* WISHLIST */}
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative transition hover:text-accent p-1"
            >
              <FiHeart size={17} strokeWidth={1.4} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[8px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* QUICK SETTINGS GEAR ICON (DESKTOP & MOBILE) */}
            <button
              type="button"
              className="transition hover:text-accent p-1"
              onClick={() => {
                setMenuOpen(false);
                setSettingsOpen((prev) => !prev);
              }}
              aria-label="Settings"
              title="Quick Settings"
            >
              <FiSettings
                size={18}
                strokeWidth={1.4}
                className={
                  settingsOpen
                    ? "text-accent rotate-90 transition duration-300"
                    : "transition duration-300"
                }
              />
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              className="transition hover:text-accent p-1 md:hidden"
              onClick={() => {
                setSettingsOpen(false);
                setMenuOpen((prev) => !prev);
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>

        {/* RICH MOBILE NAVIGATION DRAWER */}
        {menuOpen && (
          <nav className="absolute left-0 right-0 top-[70px] z-50 border-b border-border-soft bg-bg-secondary px-5 py-6 md:hidden shadow-2xl animate-fadeIn">
            <div className="mb-4 pb-3 border-b border-border-soft flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                COLLECTIONS & MENU
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs font-medium text-text-primary">
              {/* SHOP ALL */}
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition border border-border-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiGrid size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Shop All Bags
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Browse our entire catalogue
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-accent uppercase">
                  →
                </span>
              </Link>

              {/* NEW ARRIVALS */}
              <Link
                to="/shop?filter=new-arrivals"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition border border-border-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiAward size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      New Arrivals
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Explore latest silhouettes
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-semibold text-white uppercase">
                  NEW
                </span>
              </Link>

              {/* BESTSELLERS */}
              <Link
                to="/shop?filter=best-sellers"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition border border-border-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiTrendingUp size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Bestsellers
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Most loved by customers
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-dark-section px-2 py-0.5 text-[9px] font-semibold text-white uppercase">
                  POPULAR
                </span>
              </Link>

              {/* CRAFTSMANSHIP STORY */}
              <Link
                to="/craftsmanship"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition border border-border-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiFeather size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Artisan Craftsmanship
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Behind our handmade process
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-accent uppercase">
                  Story →
                </span>
              </Link>
            </div>
          </nav>
        )}

        {/* QUICK SETTINGS DROPDOWN (DESKTOP & MOBILE) */}
        {settingsOpen && (
          <div className="absolute right-4 md:right-10 top-[70px] z-50 w-80 md:w-84 border border-border-soft bg-bg-secondary px-5 py-6 shadow-2xl rounded-sm animate-fadeIn">
            <div className="mb-4 pb-3 border-b border-border-soft flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                QUICK SETTINGS
              </span>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs font-medium text-text-primary">
              {/* PROFILE LINK */}
              <Link
                to="/account"
                onClick={() => setSettingsOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <FiUser size={15} />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">
                    {isAuthenticated
                      ? user?.name || user?.email || "My Account"
                      : "Sign In / Register"}
                  </p>
                  <p className="text-[10px] text-text-secondary">
                    {isAuthenticated
                      ? "Manage personal profile"
                      : "Access your account"}
                  </p>
                </div>
              </Link>

              {/* THEME TOGGLE */}
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                }}
                className="flex items-center justify-between p-2.5 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                    {isDarkMode ? <FiSun size={15} /> : <FiMoon size={15} />}
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Theme Mode
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Current: {isDarkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-accent uppercase">
                  Switch
                </span>
              </button>

              {/* CART LINK */}
              <Link
                to="/cart"
                onClick={() => setSettingsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiShoppingBag size={15} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Shopping Bag
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Review your bag items
                    </p>
                  </div>
                </div>
                {cartCount > 0 && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                    {cartCount} items
                  </span>
                )}
              </Link>

              {/* SALE LINK */}
              <Link
                to="/sale"
                onClick={() => setSettingsOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xs bg-bg-primary hover:bg-bg-tertiary transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <FiTag size={15} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      Sale & Discounts
                    </p>
                    <p className="text-[10px] text-text-secondary">
                      Explore special offers
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-accent uppercase">
                  View →
                </span>
              </Link>

              {/* LOGOUT BUTTON IF AUTHENTICATED */}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center justify-center gap-2 border border-border-soft p-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition rounded-xs"
                >
                  <FiLogOut size={15} />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* SEARCH OVERLAY */}

      <SearchOverlay isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}

export default Navbar;
