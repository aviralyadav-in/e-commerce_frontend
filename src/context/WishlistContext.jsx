import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("niyaWishlist");

      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  // ===============================
  // SAVE WISHLIST
  // ===============================
  useEffect(() => {
    localStorage.setItem("niyaWishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // ===============================
  // ADD TO WISHLIST
  // ===============================
  function addToWishlist(product) {
    setWishlistItems((currentWishlist) => {
      const alreadyExists = currentWishlist.some(
        (item) => String(item.id) === String(product.id),
      );

      if (alreadyExists) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  }

  // ===============================
  // REMOVE FROM WISHLIST
  // ===============================
  function removeFromWishlist(productId) {
    setWishlistItems((currentWishlist) =>
      currentWishlist.filter((item) => String(item.id) !== String(productId)),
    );
  }

  // ===============================
  // TOGGLE WISHLIST
  // ===============================
  function toggleWishlist(product) {
    const exists = wishlistItems.some(
      (item) => String(item.id) === String(product.id),
    );

    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }

  // ===============================
  // CHECK WISHLIST
  // ===============================
  function isInWishlist(productId) {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  }

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
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
