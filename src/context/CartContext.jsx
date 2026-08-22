import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "niya_bags_cart";

const EMPTY_TOTALS = {
  totalPrice: 0,
  discountAmount: 0,
  totalAmountAfterDiscount: 0,
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (!savedCart) return [];

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("LOAD LOCAL CART ERROR:", error);
      return [];
    }
  });

  const [cartTotals, setCartTotals] = useState(EMPTY_TOTALS);

  // ============================================================
  // CALCULATE TOTALS
  // ============================================================

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      const price = Number(item?.product?.price || 0);
      const quantity = Number(item?.quantity || 0);

      return total + price * quantity;
    }, 0);

    setCartTotals({
      totalPrice,
      discountAmount: 0,
      totalAmountAfterDiscount: totalPrice,
    });
  }, [cartItems]);

  // ============================================================
  // SAVE CART TO LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("SAVE LOCAL CART ERROR:", error);
    }
  }, [cartItems]);

  // ============================================================
  // RESET
  // ============================================================

  const resetCart = () => {
    setCartItems([]);

    setCartTotals(EMPTY_TOTALS);

    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // ============================================================
  // ADD TO CART
  // ============================================================

  const addToCart = async (product, quantity = 1) => {
    console.log("========== ADD TO CART ==========");
    console.log("Product:", product);

    const productId = product?._id || product?.id;

    console.log("Product ID:", productId);

    if (!productId) {
      console.error("ADD TO CART BLOCKED: Product ID is missing.", product);

      return;
    }

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => {
        const id = item?.product?._id || item?.product?.id;

        return String(id) === String(productId);
      });

      if (existingItemIndex !== -1) {
        return prevItems.map((item, index) => {
          if (index !== existingItemIndex) {
            return item;
          }

          return {
            ...item,
            quantity: Number(item.quantity || 0) + Number(quantity || 1),
          };
        });
      }

      return [
        ...prevItems,
        {
          product,
          quantity: Number(quantity || 1),
        },
      ];
    });

    console.log("ADD TO CART SUCCESS - LOCAL");
  };

  // ============================================================
  // REMOVE FROM CART
  // ============================================================

  const removeFromCart = async (productId) => {
    if (!productId) {
      console.error("Product ID missing.");
      return;
    }

    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const id = item?.product?._id || item?.product?.id;

        return String(id) !== String(productId);
      }),
    );

    console.log("REMOVE CART SUCCESS - LOCAL");
  };

  // ============================================================
  // CHECK PRODUCT IN CART
  // ============================================================

  const isInCart = (productId) => {
    if (!productId) return false;

    return cartItems.some((item) => {
      const id = item?.product?._id || item?.product?.id;

      return String(id) === String(productId);
    });
  };

  // ============================================================
  // TOGGLE CART
  // ============================================================

  const toggleCart = async (product, quantity = 1) => {
    console.log("========== TOGGLE CART ==========");
    console.log("Product:", product);

    if (!product) {
      console.error("toggleCart: Product missing.");
      return;
    }

    const productId = product?._id || product?.id;

    if (!productId) {
      console.error("toggleCart: Product ID missing.", product);

      return;
    }

    const alreadyInCart = isInCart(productId);

    console.log("Product ID:", productId);
    console.log("Already in cart:", alreadyInCart);

    if (alreadyInCart) {
      await removeFromCart(productId);
    } else {
      await addToCart(product, quantity);
    }
  };

  // ============================================================
  // FIND CART ITEM
  // ============================================================

  const findCartItem = (productId) => {
    return cartItems.find((item) => {
      const id = item?.product?._id || item?.product?.id;

      return String(id) === String(productId);
    });
  };

  // ============================================================
  // INCREASE QUANTITY
  // ============================================================

  const increaseQuantity = async (productId) => {
    const item = findCartItem(productId);

    if (!item) {
      console.error("Cart item not found:", productId);

      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((cartItem) => {
        const id = cartItem?.product?._id || cartItem?.product?.id;

        if (String(id) !== String(productId)) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: Number(cartItem.quantity || 0) + 1,
        };
      }),
    );
  };

  // ============================================================
  // DECREASE QUANTITY
  // ============================================================

  const decreaseQuantity = async (productId) => {
    const item = findCartItem(productId);

    if (!item) {
      console.error("Cart item not found:", productId);

      return;
    }

    const currentQuantity = Number(item.quantity || 0);

    if (currentQuantity <= 1) {
      await removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((cartItem) => {
        const id = cartItem?.product?._id || cartItem?.product?.id;

        if (String(id) !== String(productId)) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: currentQuantity - 1,
        };
      }),
    );
  };

  // ============================================================
  // CLEAR CART
  // ============================================================

  const clearCartItems = async () => {
    resetCart();

    console.log("CLEAR CART SUCCESS - LOCAL");
  };

  // ============================================================
  // CART COUNT
  // ============================================================

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item?.quantity || 0),
    0,
  );

  // ============================================================
  // PROVIDER
  // ============================================================

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

// ============================================================
// HOOK
// ============================================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
