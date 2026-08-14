import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchOverlay from "./SearchOverlay";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      try {
        const wishlist = JSON.parse(
          localStorage.getItem("niyaWishlist") || "[]",
        );

        const cart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

        setWishlistCount(Array.isArray(wishlist) ? wishlist.length : 0);

        setCartCount(
          Array.isArray(cart)
            ? cart.reduce(
                (total, item) => total + Number(item.quantity || 1),
                0,
              )
            : 0,
        );
      } catch {
        setWishlistCount(0);
        setCartCount(0);
      }
    }

    updateCounts();

    window.addEventListener("niyaWishlistUpdated", updateCounts);
    window.addEventListener("niyaCartUpdated", updateCounts);

    return () => {
      window.removeEventListener("niyaWishlistUpdated", updateCounts);
      window.removeEventListener("niyaCartUpdated", updateCounts);
    };
  }, []);

  function handleSearchOpen() {
    setMenuOpen(false);
    setSearchOpen(true);
  }

  function handleSearchClose() {
    setSearchOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
          {/* LOGO */}
          <Link
            to="/"
            className="font-serif text-[23px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
          >
            Niya Bags
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="ml-16 hidden items-center gap-8 md:flex">
            <Link
              to="/shop"
              className="text-[11px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              Shop All
            </Link>

            <a
              href="/#featured"
              className="text-[11px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              New Arrivals
            </a>

            <a
              href="/#featured"
              className="text-[11px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              Bestsellers
            </a>

            <a
              href="/#craftsmanship"
              className="text-[11px] text-[var(--color-text-secondary)] transition hover:text-[var(--color-accent)]"
            >
              Our Story
            </a>
          </nav>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-4 text-[var(--color-text-primary)]">
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

            {/* SEARCH */}
            <button
              type="button"
              aria-label="Search"
              onClick={handleSearchOpen}
              className="transition hover:text-[var(--color-accent)]"
            >
              <FiSearch size={17} strokeWidth={1.4} />
            </button>

            {/* ACCOUNT */}
            <Link
              to="/account"
              aria-label="Account"
              className="transition hover:text-[var(--color-accent)]"
            >
              <FiUser size={17} strokeWidth={1.4} />
            </Link>

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

              <a
                href="/#featured"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--color-accent)]"
              >
                New Arrivals
              </a>

              <a
                href="/#featured"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--color-accent)]"
              >
                Bestsellers
              </a>

              <Link
                to="/craftsmanship"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[var(--color-accent)]"
              >
                Our Story
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* SEARCH OVERLAY
          IMPORTANT:
          It is outside the header so it can safely cover
          the complete viewport.
      */}
      <SearchOverlay isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}

export default Navbar;
