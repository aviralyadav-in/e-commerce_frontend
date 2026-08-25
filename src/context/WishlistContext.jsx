import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const WISHLIST_STORAGE_KEY = "niyaWishlist";

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (!savedWishlist) {
        return [];
      }

      const parsedWishlist = JSON.parse(savedWishlist);

      if (!Array.isArray(parsedWishlist)) {
        return [];
      }

      /*
       * Supports both:
       *
       * Old format:
       * [
       *   { id: "tote-007", title: "Signature Carry Tote", ... }
       * ]
       *
       * New format:
       * [
       *   "tote-007",
       *   "minibag-001"
       * ]
       *
       * We convert everything to IDs.
       */
      return parsedWishlist
        .map((item) => {
          if (typeof item === "string" || typeof item === "number") {
            return String(item);
          }

          if (item && typeof item === "object") {
            return item?._id || item?.id || null;
          }

          return null;
        })
        .filter(Boolean);
    } catch (error) {
      console.error("LOAD WISHLIST ERROR:", error);
      return [];
    }
  });

  // ============================================================
  // SAVE WISHLIST IDS
  // ============================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(wishlistItems),
      );
    } catch (error) {
      console.error("SAVE WISHLIST ERROR:", error);
    }
  }, [wishlistItems]);

  // ============================================================
  // ADD TO WISHLIST
  // ============================================================

  function addToWishlist(product) {
    if (!product) {
      console.error("ADD WISHLIST: Product missing.");
      return;
    }

    const productId = product?._id || product?.id;

    if (!productId) {
      console.error(
        "ADD WISHLIST: Product ID missing.",
        product,
      );
      return;
    }

    setWishlistItems((currentWishlist) => {
      const exists = currentWishlist.some(
        (id) => String(id) === String(productId),
      );

      if (exists) {
        return currentWishlist;
      }

      return [...currentWishlist, String(productId)];
    });
  }

  // ============================================================
  // REMOVE FROM WISHLIST
  // ============================================================

  function removeFromWishlist(productId) {
    if (!productId) {
      return;
    }

    setWishlistItems((currentWishlist) =>
      currentWishlist.filter(
        (id) => String(id) !== String(productId),
      ),
    );
  }

  // ============================================================
  // TOGGLE WISHLIST
  // ============================================================

  function toggleWishlist(product) {
    if (!product) {
      return;
    }

    const productId = product?._id || product?.id;

    if (!productId) {
      console.error(
        "TOGGLE WISHLIST: Product ID missing.",
        product,
      );
      return;
    }

    const exists = wishlistItems.some(
      (id) => String(id) === String(productId),
    );

    if (exists) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  }

  // ============================================================
  // CHECK WISHLIST
  // ============================================================

  function isInWishlist(productId) {
    if (!productId) {
      return false;
    }

    return wishlistItems.some(
      (id) => String(id) === String(productId),
    );
  }

  // ============================================================
  // CLEAR WISHLIST
  // ============================================================

  function clearWishlist() {
    setWishlistItems([]);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  }

  // ============================================================
  // COUNT
  // ============================================================

  const wishlistCount = wishlistItems.length;

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ============================================================
// HOOK
// ============================================================

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider",
    );
  }

  return context;
}