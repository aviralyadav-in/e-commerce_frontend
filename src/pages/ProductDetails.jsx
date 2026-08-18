import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, getSuggestedProducts } from "../api/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ===============================
  // LOAD PRODUCT
  // ===============================
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const data = await getProductById(id);
        setProduct(data);

        const suggested = await getSuggestedProducts(id);
        setSuggestions(suggested);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // ===============================
  // LOAD CART + WISHLIST STATE
  // ===============================
  useEffect(() => {
    if (!product) return;

    const wishlist = JSON.parse(localStorage.getItem("niyaWishlist") || "[]");

    const cart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    setIsWishlisted(
      wishlist.some((item) => String(item.id) === String(product.id)),
    );

    setCartItems(cart);
  }, [product]);

  // ===============================
  // LOCAL STORAGE HELPERS
  // ===============================
  const getWishlist = () => {
    return JSON.parse(localStorage.getItem("niyaWishlist") || "[]");
  };

  const getCart = () => {
    return JSON.parse(localStorage.getItem("niyaCart") || "[]");
  };

  const saveWishlist = (items) => {
    localStorage.setItem("niyaWishlist", JSON.stringify(items));

    window.dispatchEvent(new Event("niyaWishlistUpdated"));
  };

  const saveCart = (items) => {
    localStorage.setItem("niyaCart", JSON.stringify(items));

    setCartItems(items);

    window.dispatchEvent(new Event("niyaCartUpdated"));
  };

  // ===============================
  // WISHLIST
  // ===============================
  const handleWishlist = (item) => {
    const wishlist = getWishlist();

    const exists = wishlist.some(
      (wishlistItem) => String(wishlistItem.id) === String(item.id),
    );

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(
        (wishlistItem) => String(wishlistItem.id) !== String(item.id),
      );
    } else {
      updatedWishlist = [...wishlist, item];
    }

    saveWishlist(updatedWishlist);

    if (product && String(product.id) === String(item.id)) {
      setIsWishlisted(!exists);
    }

    // Force suggestion cards to update
    setSuggestions((prev) => [...prev]);
  };

  // ===============================
  // ADD / REMOVE FROM CART
  // ===============================
  const toggleCart = (item) => {
    const cart = getCart();

    const exists = cart.some(
      (cartItem) => String(cartItem.id) === String(item.id),
    );

    let updatedCart;

    if (exists) {
      // Remove from cart
      updatedCart = cart.filter(
        (cartItem) => String(cartItem.id) !== String(item.id),
      );
    } else {
      // Add to cart
      updatedCart = [
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ];
    }

    saveCart(updatedCart);
  };

  // ===============================
  // CART CHECK
  // ===============================
  const isInCart = (itemId) => {
    return cartItems.some((item) => String(item.id) === String(itemId));
  };

  // ===============================
  // MAIN PRODUCT QUANTITY
  // ===============================
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // ===============================
  // MAIN PRODUCT CART
  // ===============================
  const handleMainAddToCart = () => {
    if (!product) return;

    const cart = getCart();

    const existingItem = cart.find(
      (cartItem) => String(cartItem.id) === String(product.id),
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.filter(
        (cartItem) => String(cartItem.id) !== String(product.id),
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];
    }

    saveCart(updatedCart);
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-muted)]">
        <p className="text-xs uppercase tracking-[0.25em]">Loading...</p>
      </main>
    );
  }

  // ===============================
  // PRODUCT NOT FOUND
  // ===============================
  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] px-6 text-center text-[var(--color-text-primary)]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            Product not found
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="border border-[var(--color-border)] px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  const price = Math.round(product.price * 83);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        {/* BACK */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
        >
          <FiArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back
        </button>

        {/* ===============================
            PRODUCT DETAILS
        =============================== */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE */}
          <div className="relative overflow-hidden bg-[var(--color-bg-secondary)]">
            <img
              src={product.image}
              alt={product.title}
              className="h-full max-h-[680px] w-full object-cover"
            />

            <button
              type="button"
              onClick={() => handleWishlist(product)}
              className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--color-bg-primary)]/90 backdrop-blur transition ${
                isWishlisted
                  ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              }`}
            >
              <FiHeart
                size={17}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Niya Bags
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              {product.title}
            </h1>

            <p className="mt-5 text-xl text-[var(--color-text-primary)]">
              ₹{price.toLocaleString("en-IN")}
            </p>

            <div className="mt-7 h-px w-full bg-[var(--color-border)]" />

            <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--color-text-secondary)]">
              {product.description}
            </p>

            {/* QUANTITY + CART */}
            <div className="mt-9 flex items-center gap-4">
              <div className="flex h-12 items-center border border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="flex h-full w-12 items-center justify-center text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
                >
                  <FiMinus size={14} />
                </button>

                <span className="w-10 text-center text-sm">{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="flex h-full w-12 items-center justify-center text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleMainAddToCart}
                className={`flex h-12 flex-1 items-center justify-center gap-2 px-6 text-[10px] uppercase tracking-[0.2em] transition ${
                  isInCart(product.id)
                    ? "border border-[var(--color-border)] bg-transparent text-[var(--color-text-primary)] hover:border-red-400 hover:text-red-400"
                    : "bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-bright)]"
                }`}
              >
                <FiShoppingBag size={15} />

                {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>

            {/* WISHLIST */}
            <button
              type="button"
              onClick={() => handleWishlist(product)}
              className="mt-4 flex h-12 items-center justify-center gap-2 border border-[var(--color-border)] text-[10px] uppercase tracking-[0.2em] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <FiHeart
                size={15}
                fill={isWishlisted ? "currentColor" : "none"}
              />

              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        {/* ===============================
            CURATED FOR YOU
        =============================== */}
        <section className="mt-28">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              You May Also Like
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Curated For You
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {suggestions.map((item) => {
              const itemPrice = Math.round(item.price * 83);

              const itemWishlist = getWishlist().some(
                (wishlistItem) => String(wishlistItem.id) === String(item.id),
              );

              const itemInCart = isInCart(item.id);

              return (
                <article key={item.id} className="group min-w-0">
                  {/* PRODUCT IMAGE */}
                  <div
                    className="relative cursor-pointer overflow-hidden bg-[var(--color-bg-tertiary)]"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />

                    {/* WISHLIST */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWishlist(item);
                      }}
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border bg-[var(--color-bg-primary)]/90 backdrop-blur transition ${
                        itemWishlist
                          ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                          : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      }`}
                    >
                      <FiHeart
                        size={15}
                        fill={itemWishlist ? "currentColor" : "none"}
                      />
                    </button>

                    {/* CART */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCart(item);
                      }}
                      className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 px-3 py-3 text-[9px] uppercase tracking-[0.16em] backdrop-blur transition-all duration-300 ${
                        itemInCart
                          ? "bg-[var(--color-bg-primary)]/95 text-[var(--color-text-primary)] opacity-100"
                          : "bg-[var(--color-bg-primary)]/95 text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100"
                      } hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)]`}
                    >
                      <FiShoppingBag size={13} />

                      {itemInCart ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="pt-4">
                    <h3
                      className="cursor-pointer truncate font-serif text-base transition hover:text-[var(--color-accent)]"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      ₹{itemPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
