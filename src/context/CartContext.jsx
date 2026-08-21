import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

import { getCart, addCartItem, removeCartItem, clearCart } from "../api/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const { user, loading: authLoading } = useAuth();

  const [cartTotals, setCartTotals] = useState({
    totalPrice: 0,
    discountAmount: 0,
    totalAmountAfterDiscount: 0,
  });

  // ===============================
  // RESET CART
  // ===============================

  function resetCart() {
    setCartItems([]);

    setCartTotals({
      totalPrice: 0,
      discountAmount: 0,
      totalAmountAfterDiscount: 0,
    });
  }

  // ===============================
  // UPDATE CART STATE
  // ===============================

  function updateCartState(response) {
    const cart = response?.cart;

    setCartItems(cart?.items || []);

    setCartTotals({
      totalPrice: cart?.totalPrice || 0,
      discountAmount: cart?.discountAmount || 0,
      totalAmountAfterDiscount: cart?.totalAmountAfterDiscount || 0,
    });
  }

  // ===============================
  // LOAD CART
  // ===============================

  useEffect(() => {
    async function loadCart() {
      if (!user) {
        resetCart();
        return;
      }

      try {
        const response = await getCart();

        updateCartState(response);
      } catch (error) {
        console.error("Failed to load cart:", error);
        resetCart();
      }
    }

    if (!authLoading) {
      loadCart();
    }
  }, [user, authLoading]);

  // ===============================
  // ADD TO CART
  // ===============================

  async function addToCart(product, quantity = 1) {
    if (!user) return;

    try {
      const response = await addCartItem(product.id || product._id, quantity);

      updateCartState(response);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  }

  // ===============================
  // REMOVE FROM CART
  // ===============================

  async function removeFromCart(productId) {
    if (!user) return;

    try {
      const response = await removeCartItem(productId);

      updateCartState(response);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  }

  // ===============================
  // TOGGLE CART
  // ===============================

  async function toggleCart(product, quantity = 1) {
    if (!user) return;

    const productId = product.id || product._id;

    const exists = isInCart(productId);

    if (exists) {
      await removeFromCart(productId);
    } else {
      await addToCart(product, quantity);
    }
  }

  // ===============================
  // INCREASE QUANTITY
  // ===============================

  async function increaseQuantity(productId) {
    if (!user) return;

    const item = cartItems.find(
      (item) => String(item.product?._id) === String(productId),
    );

    if (!item) return;

    const newQuantity = Number(item.quantity || 0) + 1;

    try {
      const response = await addCartItem(productId, newQuantity);

      updateCartState(response);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
    }
  }

  // ===============================
  // DECREASE QUANTITY
  // ===============================

  async function decreaseQuantity(productId) {
    if (!user) return;

    const item = cartItems.find(
      (item) => String(item.product?._id) === String(productId),
    );

    if (!item) return;

    const currentQuantity = Number(item.quantity || 0);

    if (currentQuantity <= 1) {
      await removeFromCart(productId);
      return;
    }

    const newQuantity = currentQuantity - 1;

    try {
      const response = await addCartItem(productId, newQuantity);

      updateCartState(response);
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  }

  // ===============================
  // CLEAR CART
  // ===============================

  async function clearCartItems() {
    if (!user) return;

    try {
      const response = await clearCart();

      updateCartState(response);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  }

  // ===============================
  // CHECK CART
  // ===============================

  function isInCart(productId) {
    return cartItems.some(
      (item) => String(item.product?._id) === String(productId),
    );
  }

  // ===============================
  // CART COUNT
  // ===============================

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  // ===============================
  // CONTEXT
  // ===============================

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,

        totalPrice: cartTotals.totalPrice,
        discountAmount: cartTotals.discountAmount,
        totalAmountAfterDiscount: cartTotals.totalAmountAfterDiscount,

        addToCart,
        removeFromCart,
        clearCart: clearCartItems,

        toggleCart,

        increaseQuantity,
        decreaseQuantity,

        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
