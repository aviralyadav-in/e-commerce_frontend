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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("niyaTheme") === "dark",
  );

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      const wishlist = JSON.parse(localStorage.getItem("niyaWishlist") || "[]");

      const cart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

      setWishlistCount(wishlist.length);

      setCartCount(
        cart.reduce((total, item) => total + (item.quantity || 1), 0),
      );
    }

    updateCounts();

    window.addEventListener("niyaWishlistUpdated", updateCounts);
    window.addEventListener("niyaCartUpdated", updateCounts);

    return () => {
      window.removeEventListener("niyaWishlistUpdated", updateCounts);
      window.removeEventListener("niyaCartUpdated", updateCounts);
    };
  }, []);

  function toggleTheme() {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("niyaTheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("niyaTheme", "light");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8eded] bg-white">
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center px-5 md:px-10 lg:px-14">
        {/* LOGO */}
        <Link
          to="/"
          className="font-serif text-[23px] font-semibold tracking-[-0.02em] text-[#073b4c]"
        >
          Niya Bags
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="ml-16 hidden items-center gap-8 md:flex">
          <Link
            to="/shop"
            className="text-[11px] text-[#385b66] transition hover:text-[#c39920]"
          >
            Shop All
          </Link>

          <a
            href="/#featured"
            className="text-[11px] text-[#385b66] transition hover:text-[#c39920]"
          >
            New Arrivals
          </a>

          <a
            href="/#featured"
            className="text-[11px] text-[#385b66] transition hover:text-[#c39920]"
          >
            Bestsellers
          </a>

          <a
            href="/#craftsmanship"
            className="text-[11px] text-[#385b66] transition hover:text-[#c39920]"
          >
            Our Story
          </a>
        </nav>

        {/* RIGHT SIDE ICONS */}
        <div className="ml-auto flex items-center gap-4 text-[#073b4c]">
          {/* THEME */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="transition hover:text-[#c39920]"
          >
            {darkMode ? (
              <FiSun size={17} strokeWidth={1.4} />
            ) : (
              <FiMoon size={17} strokeWidth={1.4} />
            )}
          </button>

          {/* SEARCH */}
          <button
            type="button"
            aria-label="Search"
            className="transition hover:text-[#c39920]"
          >
            <FiSearch size={17} strokeWidth={1.4} />
          </button>

          {/* ACCOUNT */}
          <Link
            to="/account"
            aria-label="Account"
            className="transition hover:text-[#c39920]"
          >
            <FiUser size={17} strokeWidth={1.4} />
          </Link>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative transition hover:text-[#c39920]"
          >
            <FiHeart size={17} strokeWidth={1.4} />

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c39920] px-1 text-[8px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="relative transition hover:text-[#c39920]"
          >
            <FiShoppingBag size={17} strokeWidth={1.4} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c39920] px-1 text-[8px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <nav className="border-t border-[#e8eded] bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-xs text-[#385b66]">
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop All
            </Link>

            <a href="/#featured" onClick={() => setMenuOpen(false)}>
              New Arrivals
            </a>

            <a href="/#featured" onClick={() => setMenuOpen(false)}>
              Bestsellers
            </a>

            <a href="/#craftsmanship" onClick={() => setMenuOpen(false)}>
              Our Story
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
