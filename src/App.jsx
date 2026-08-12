import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AnnouncementBar from "./components/common/AnnouncementBar";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import OrderPage from "./pages/OrderPage";
import ProductDetails from "./pages/ProductDetails";
import ShopPage from "./pages/ShopPage";
import CraftsmanshipPage from "./pages/CraftsmanshipPage";
import AccountPage from "./pages/account/AccountPage";

function AppContent() {
  const location = useLocation();

  const hideLayout = ["/account", "/order"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <AnnouncementBar />}
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
