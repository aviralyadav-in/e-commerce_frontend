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

  // Sirf ID aur Color ka rule
  const getVariantKey = (product, selectedColor) => {
    const productId = product?.id;
    const color = selectedColor || product?.color;
    if (!productId) return null;
    return color ? `${productId}-${color}` : String(productId);
  };

  function toggleWishlist(product, selectedColor = null) {
    const uniqueKey = getVariantKey(product, selectedColor);
    if (!uniqueKey) return;

    setWishlistItems((current) => {
      const exists = current.includes(uniqueKey);
      if (exists) {
        return current.filter((id) => id !== uniqueKey);
      } else {
        return [...current, uniqueKey];
      }
    });
  }

  function isInWishlist(product, selectedColor = null) {
    const uniqueKey = getVariantKey(product, selectedColor);
    if (!uniqueKey) return false;
    return wishlistItems.includes(uniqueKey);
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