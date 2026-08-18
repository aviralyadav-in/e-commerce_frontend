import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import AnnouncementBar from "../components/common/AnnouncementBar";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import OrderPage from "../pages/OrderPage";
import ProductDetails from "../pages/ProductDetails";
import ShopPage from "../pages/ShopPage";
import CraftsmanshipPage from "../pages/CraftsmanshipPage";
import AccountPage from "../pages/account/AccountPage";

// FOOTER PAGES h hmare
import AboutPage from "../pages/footer/AboutPage";
import OurStoryPage from "../pages/footer/OurStoryPage";
import ContactPage from "../pages/footer/ContactPage";
import ShippingReturnsPage from "../pages/footer/ShippingReturnsPage";
import SizeCarePage from "../pages/footer/SizeCarePage";
import FAQPage from "../pages/footer/FAQPage";
import LegalPage from "../pages/footer/LegalPage";
import SalePage from "../pages/SalePage";
import NotFoundPage from "../pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default function AppRoutes() {
  const location = useLocation();

  const hideLayout = ["/account", "/order"].includes(location.pathname);

  return (
    <>
      {/* Scroll to top whenever route changes */}
      <ScrollToTop />

      {!hideLayout && <AnnouncementBar />}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        <Route path="/sale" element={<SalePage />} />

        {/* MAIN PAGES */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/craftsmanship" element={<CraftsmanshipPage />} />

        {/* ACCOUNT / ORDER */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/order" element={<OrderPage />} />

        {/* FOOTER - ABOUT */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* FOOTER - CUSTOMER CARE */}
        <Route path="/shipping-returns" element={ <ShippingReturnsPage />} />

        <Route path="/size-guide" element={<SizeCarePage />} />
        <Route path="/care-guide" element={<SizeCarePage />} />

        <Route path="/faq" element={<FAQPage />} />

        {/* FOOTER - LEGAL */}
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-use" element={<LegalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}
