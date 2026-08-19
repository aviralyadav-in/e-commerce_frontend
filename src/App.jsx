import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <WishlistProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </WishlistProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
