import { useEffect, useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../api/api";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    const savedWishlist = JSON.parse(
      localStorage.getItem("niyaWishlist") || "[]",
    );

    const savedCart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    setWishlistItems(savedWishlist);
    setCartItems(savedCart);
  }, []);

  // ===============================
  // TOGGLE WISHLIST
  // ===============================
  function toggleWishlist(product) {
    const existingWishlist = JSON.parse(
      localStorage.getItem("niyaWishlist") || "[]",
    );

    const alreadyExists = existingWishlist.some(
      (item) => item.id === product.id,
    );

    let updatedWishlist;

    if (alreadyExists) {
      updatedWishlist = existingWishlist.filter(
        (item) => item.id !== product.id,
      );
    } else {
      updatedWishlist = [...existingWishlist, product];
    }

    localStorage.setItem("niyaWishlist", JSON.stringify(updatedWishlist));

    setWishlistItems(updatedWishlist);

    window.dispatchEvent(new Event("niyaWishlistUpdated"));
  }

  // ===============================
  // TOGGLE CART
  // ===============================
  function toggleCart(product) {
    const existingCart = JSON.parse(localStorage.getItem("niyaCart") || "[]");

    const alreadyExists = existingCart.some((item) => item.id === product.id);

    let updatedCart;

    if (alreadyExists) {
      updatedCart = existingCart.filter((item) => item.id !== product.id);
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("niyaCart", JSON.stringify(updatedCart));

    setCartItems(updatedCart);

    window.dispatchEvent(new Event("niyaCartUpdated"));
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  function isInCart(productId) {
    return cartItems.some((item) => item.id === productId);
  }

  if (loading) {
    return (
      <section id="featured" className="bg-white px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-center text-[11px] tracking-[0.15em] text-[#6b7f85]">
            LOADING COLLECTION...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[#c39920]">
              CURATED FOR YOU
            </p>

            <h2 className="font-serif text-[34px] text-[#073b4c] md:text-[40px]">
              Featured Pieces
            </h2>

            <p className="mt-3 max-w-[500px] text-[11px] leading-5 text-[#73868c]">
              Timeless silhouettes crafted with intention, designed to become
              part of your everyday story.
            </p>
          </div>

          <a
            href="#categories"
            className="hidden border-b border-[#c39920] pb-1 text-[9px] font-semibold text-[#073b4c] sm:block"
          >
            View All →
          </a>
        </div>

        {products.length === 0 ? (
          <p className="py-10 text-center text-[11px] text-[#6b7f85]">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product) => {
              const wishlistActive = isInWishlist(product.id);
              const cartActive = isInCart(product.id);

              return (
                <article
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f2f1]">
                    <img
                      src={product.thumbnail || product.images?.[0]}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    {/* WISHLIST */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full transition ${
                        wishlistActive
                          ? "bg-[#073b4c] text-white"
                          : "bg-white/90 text-[#073b4c] hover:bg-white"
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <FiHeart
                        size={14}
                        strokeWidth={1.5}
                        fill={wishlistActive ? "currentColor" : "none"}
                      />
                    </button>

                    {/* BADGE */}
                    <span className="absolute left-3 top-3 bg-[#073b4c] px-2 py-1 text-[7px] tracking-wide text-white">
                      {product.discountPercentage ? "SPECIAL" : "FEATURED"}
                    </span>

                    {/* CART */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleCart(product);
                      }}
                      className={`absolute bottom-2 left-2 right-2 flex h-8 items-center justify-center gap-1 px-1 text-[6px] font-semibold tracking-0 transition sm:bottom-3 sm:left-3 sm:right-3 sm:h-9 sm:gap-2 sm:px-2 sm:text-[7px] ${
                        cartActive
                          ? "bg-[#073b4c] text-white opacity-100"
                          : "bg-white/95 text-[#073b4c] opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <FiShoppingBag size={9} className="shrink-0" />

                      <span className="whitespace-nowrap">
                        {cartActive ? "ADDED TO BAG ✓" : "ADD TO BAG"}
                      </span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <p className="text-[8px] uppercase tracking-[0.12em] text-[#9a7a26]">
                      {product.category?.name || "Bags"}
                    </p>

                    <h3 className="mt-1 text-[11px] font-medium text-[#073b4c]">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-[11px] font-semibold text-[#073b4c]">
                      ₹{Math.round(product.price * 83).toLocaleString("en-IN")}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
