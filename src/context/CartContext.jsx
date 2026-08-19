import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("niyaCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // ===============================
  // SAVE CART
  // ===============================
  useEffect(() => {
    localStorage.setItem("niyaCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ===============================
  // ADD TO CART
  // COLOR IS PART OF VARIANT
  // ===============================
  function addToCart(product, quantity = 1) {
    setCartItems((currentCart) => {
      const existingItem = currentCart.find(
        (item) =>
          String(item.id) === String(product.id) &&
          (item.selectedColor || null) === (product.selectedColor || null),
      );

      if (existingItem) {
        return currentCart.map((item) =>
          String(item.id) === String(product.id) &&
          (item.selectedColor || null) === (product.selectedColor || null)
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + quantity,
              }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
          variantId:
            product.variantId ||
            `${product.id}-${product.selectedColor || "default"}`,
        },
      ];
    });
  }

  // ===============================
  // UPDATE EXACT QUANTITY
  // ===============================
  function updateQuantity(product, quantity) {
    if (quantity <= 0) {
      removeFromCart(product.id, product.selectedColor);
      return;
    }

    setCartItems((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(product.id) &&
        (item.selectedColor || null) === (product.selectedColor || null)
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  }

  // ===============================
  // REMOVE FROM CART
  // ===============================
  function removeFromCart(productId, selectedColor = null) {
    setCartItems((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            String(item.id) === String(productId) &&
            (item.selectedColor || null) === (selectedColor || null)
          ),
      ),
    );
  }

  // ===============================
  // TOGGLE CART
  // ===============================
  function toggleCart(product, quantity = 1) {
    const exists = isInCart(product.id, product.selectedColor);

    if (exists) {
      removeFromCart(product.id, product.selectedColor);
    } else {
      addToCart(product, quantity);
    }
  }

  // ===============================
  // INCREASE QUANTITY
  // ===============================
  function increaseQuantity(productId, selectedColor = null) {
    setCartItems((currentCart) =>
      currentCart.map((item) =>
        String(item.id) === String(productId) &&
        (item.selectedColor || null) === (selectedColor || null)
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item,
      ),
    );
  }

  // ===============================
  // DECREASE QUANTITY
  // ===============================
  function decreaseQuantity(productId, selectedColor = null) {
    setCartItems((currentCart) =>
      currentCart
        .map((item) =>
          String(item.id) === String(productId) &&
          (item.selectedColor || null) === (selectedColor || null)
            ? {
                ...item,
                quantity: Number(item.quantity || 0) - 1,
              }
            : item,
        )
        .filter((item) => Number(item.quantity) > 0),
    );
  }

  // ===============================
  // CHECK CART
  // ===============================
  function isInCart(productId, selectedColor = null) {
    return cartItems.some(
      (item) =>
        String(item.id) === String(productId) &&
        (item.selectedColor || null) === (selectedColor || null),
    );
  }

  // ===============================
  // TOTAL CART QUANTITY
  // ===============================
  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
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
