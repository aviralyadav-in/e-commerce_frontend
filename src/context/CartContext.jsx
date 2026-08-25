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

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("LOAD LOCAL CART ERROR:", error);
      return [];
    }
  });

  const [cartTotals, setCartTotals] = useState(EMPTY_TOTALS);

  // ============================================================
  // SAVE CART
  // ============================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems),
      );
    } catch (error) {
      console.error("SAVE LOCAL CART ERROR:", error);
    }
  }, [cartItems]);

  // ============================================================
  // CALCULATE TOTALS
  // ============================================================

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      const product = item?.product;

      const price = Number(
        product?.salePrice || product?.price || 0,
      );

      const quantity = Number(item?.quantity || 1);

      return total + price * quantity;
    }, 0);

    setCartTotals({
      totalPrice,
      discountAmount: 0,
      totalAmountAfterDiscount: totalPrice,
    });
  }, [cartItems]);

  // ============================================================
  // ADD TO CART
  // ============================================================

  const addToCart = (product, quantity = 1) => {
    if (!product) {
      console.error("ADD TO CART: Product missing.");
      return;
    }

    const productId = product?._id || product?.id;

    if (!productId) {
      console.error(
        "ADD TO CART: Product ID missing.",
        product,
      );
      return;
    }

    setCartItems((currentItems) => {
      const existingIndex = currentItems.findIndex((item) => {
        const id =
          item?.product?._id ||
          item?.product?.id;

        return String(id) === String(productId);
      });

      // Already exists → increase quantity
      if (existingIndex !== -1) {
        return currentItems.map((item, index) => {
          if (index !== existingIndex) {
            return item;
          }

          return {
            ...item,
            quantity:
              Number(item.quantity || 0) +
              Number(quantity || 1),
          };
        });
      }

      // New product
      return [
        ...currentItems,
        {
          product,
          quantity: Number(quantity || 1),
        },
      ];
    });
  };

  // ============================================================
  // REMOVE FROM CART
  // ============================================================

  const removeFromCart = (productId) => {
    if (!productId) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.filter((item) => {
        const id =
          item?.product?._id ||
          item?.product?.id;

        return String(id) !== String(productId);
      }),
    );
  };

  // ============================================================
  // CHECK PRODUCT IN CART
  // ============================================================

  const isInCart = (productId) => {
    if (!productId) {
      return false;
    }

    return cartItems.some((item) => {
      const id =
        item?.product?._id ||
        item?.product?.id;

      return String(id) === String(productId);
    });
  };

  // ============================================================
  // TOGGLE CART
  // ============================================================

  const toggleCart = (product, quantity = 1) => {
    if (!product) {
      return;
    }

    const productId =
      product?._id ||
      product?.id;

    if (!productId) {
      return;
    }

    if (isInCart(productId)) {
      removeFromCart(productId);
    } else {
      addToCart(product, quantity);
    }
  };

  // ============================================================
  // FIND CART ITEM
  // ============================================================

  const findCartItem = (productId) => {
    return cartItems.find((item) => {
      const id =
        item?.product?._id ||
        item?.product?.id;

      return String(id) === String(productId);
    });
  };

  // ============================================================
  // INCREASE QUANTITY
  // ============================================================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        const id =
          item?.product?._id ||
          item?.product?.id;

        if (String(id) !== String(productId)) {
          return item;
        }

        return {
          ...item,
          quantity:
            Number(item.quantity || 1) + 1,
        };
      }),
    );
  };

  // ============================================================
  // DECREASE QUANTITY
  // ============================================================

  const decreaseQuantity = (productId) => {
    const item = findCartItem(productId);

    if (!item) {
      return;
    }

    const currentQuantity =
      Number(item.quantity || 1);

    if (currentQuantity <= 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((cartItem) => {
        const id =
          cartItem?.product?._id ||
          cartItem?.product?.id;

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

  const clearCart = () => {
    setCartItems([]);
    setCartTotals(EMPTY_TOTALS);

    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // ============================================================
  // CART COUNT
  // ============================================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0),
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
        totalAmountAfterDiscount:
          cartTotals.totalAmountAfterDiscount,

        addToCart,
        removeFromCart,
        toggleCart,

        increaseQuantity,
        decreaseQuantity,

        clearCart,
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
    throw new Error(
      "useCart must be used inside CartProvider",
    );
  }

  return context;
}