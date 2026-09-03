import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = "niyaWishlist";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!savedWishlist) return [];
      const parsed = JSON.parse(savedWishlist);
      return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
    } catch (error) {
      console.error("LOAD WISHLIST ERROR:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("SAVE WISHLIST ERROR:", error);
    }
  }, [wishlistItems]);

  const getVariantKey = (product, selectedColor) => {
    const productId = product?.id;
    const color = selectedColor || product?.color;
    if (!productId) return null;
    return color ? `${productId}-${color}` : String(productId);
  };

  function toggleWishlist(product, selectedColor = null) {
    const uniqueKey = getVariantKey(product, selectedColor);
    if (!uniqueKey) return;
    const productId = String(product?.id || "");

    setWishlistItems((current) => {
      const exists = current.includes(uniqueKey);
      if (exists) {
        return current.filter((id) => id !== uniqueKey);
      } else {
        const hasExisting = current.some(
          (id) => id === productId || id.startsWith(productId + "-")
        );
        if (hasExisting) {
          return current.filter(
            (id) => id !== productId && !id.startsWith(productId + "-")
          );
        }
        return [...current, uniqueKey];
      }
    });
  }

  function isInWishlist(product, selectedColor = null) {
    const uniqueKey = getVariantKey(product, selectedColor);
    if (!uniqueKey) return false;
    const productId = String(product?.id || "");
    return wishlistItems.some(
      (item) => item === uniqueKey || item.startsWith(productId + "-")
    );
  }

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
}
