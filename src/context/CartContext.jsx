import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // LocalStorage se initial cart load karna
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("niya_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      return [];
    }
  });

  // Cart update hone par localStorage me save karna
  useEffect(() => {
    try {
      localStorage.setItem("niya_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems]);

  // --- HELPER: Variant-Aware Unique ID Extractor ---
  const getVariantKey = (product, selectedVariant = null) => {
    if (!product) return "";
    
    const productId = String(product._id || product.id || product.productId || "").trim();
    const variantId = selectedVariant?.id || selectedVariant?._id || product.variantId || "";

    if (variantId) {
      return `${productId}-${variantId}`;
    }
    return productId;
  };

  const getCleanId = (productOrId) => {
    if (!productOrId) return "";
    if (typeof productOrId === "string" || typeof productOrId === "number") {
      return String(productOrId).trim();
    }
    const rawId = 
      productOrId.variantId || 
      productOrId._id || 
      productOrId.id || 
      productOrId.product?._id || 
      productOrId.product?.id;
      
    return rawId ? String(rawId).trim() : "";
  };

  // --- UNIVERSAL IS IN CART CHECKER ---
  const isInCart = useCallback((product, selectedVariant = null) => {
    const targetKey = getVariantKey(product, selectedVariant);
    const targetId = getCleanId(product);
    if (!targetKey && !targetId) return false;
    const targetProductId = String(product._id || product.id || product.productId || "").trim();

    return cartItems.some((item) => {
      const itemKey = getVariantKey(item, item.selectedVariant);
      const itemId = getCleanId(item);
      const itemProductId = String(item._id || item.id || item.product?._id || item.product?.id || "").trim();
      
      return itemKey === targetKey || itemId === targetId || itemProductId === targetProductId || String(item.id || "").startsWith(targetProductId + "-");
    });
  }, [cartItems]);

  // --- ADD TO CART (Variant Support + Deduplication) ---
  const addToCart = (product, selectedVariant = null, qty = 1) => {
    const uniqueKey = getVariantKey(product, selectedVariant);
    if (!uniqueKey) return;
    const productId = String(product._id || product.id || product.productId || "").trim();

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => {
        const itemKey = getVariantKey(item, item.selectedVariant);
        return itemKey === uniqueKey;
      });

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        const hasExisting = prevItems.some((item) => {
          const itemProductId = String(item._id || item.id || item.product?._id || item.product?.id || "").trim();
          const itemKey = String(item.id || "");
          return itemProductId === productId || itemKey.startsWith(productId + "-");
        });

        if (hasExisting) {
          const filtered = prevItems.filter((item) => {
            const itemProductId = String(item._id || item.id || item.product?._id || item.product?.id || "").trim();
            const itemKey = String(item.id || "");
            return itemProductId !== productId && !itemKey.startsWith(productId + "-");
          });
          const newItem = {
            ...product,
            id: uniqueKey,
            _id: product._id || product.id,
            variantId: selectedVariant?.id || selectedVariant?._id || null,
            selectedVariant: selectedVariant || null,
            quantity: qty,
          };
          return [...filtered, newItem];
        }

        const newItem = {
          ...product,
          id: uniqueKey,
          _id: product._id || product.id,
          variantId: selectedVariant?.id || selectedVariant?._id || null,
          selectedVariant: selectedVariant || null,
          quantity: qty,
        };
        return [...prevItems, newItem];
      }
    });
  };

  // --- REMOVE FROM CART ---
  const removeFromCart = (product, selectedVariant = null) => {
    const targetKey = typeof product === "string" ? product : getVariantKey(product, selectedVariant);
    if (!targetKey) return;

    setCartItems((prevItems) => 
      prevItems.filter((item) => {
        const itemKey = getVariantKey(item, item.selectedVariant);
        const itemId = getCleanId(item);
        return itemKey !== targetKey && itemId !== targetKey;
      })
    );
  };

  // --- TOGGLE CART (Best Practice Action for Cards) ---
  const toggleCart = (product, selectedVariant = null, qty = 1) => {
    if (isInCart(product, selectedVariant)) {
      removeFromCart(product, selectedVariant);
    } else {
      addToCart(product, selectedVariant, qty);
    }
  };

  // --- UPDATE QUANTITY ---
  const updateQuantity = (product, selectedVariant = null, newQty) => {
    if (typeof selectedVariant === "number") {
      newQty = selectedVariant;
      selectedVariant = null;
    }

    const targetKey = typeof product === "string" ? product : getVariantKey(product, selectedVariant);
    
    if (newQty <= 0) {
      removeFromCart(targetKey);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const itemKey = getVariantKey(item, item.selectedVariant);
        const itemId = getCleanId(item);
        if (itemKey === targetKey || itemId === targetKey) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // --- CLEAR CART ---
  const clearCart = () => {
    setCartItems([]);
  };

  // --- CART COUNT ---
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        toggleCart,
        updateQuantity,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}