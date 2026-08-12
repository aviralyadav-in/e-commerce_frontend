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
  const [cartAdded, setCartAdded] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const productData = await getProductById(id);
        const suggestedData = await getSuggestedProducts(id);

        setProduct(productData);
        setSuggestions(suggestedData);

        const existingWishlist = JSON.parse(
          localStorage.getItem("niyaWishlist") || "[]",
        );
        const existingCart = JSON.parse(
          localStorage.getItem("niyaCart") || "[]",
        );

        setWishlistAdded(
          existingWishlist.some((item) => item.id === productData.id),
        );

        setCartAdded(existingCart.some((item) => item.id === productData.id));
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function addToWishlist() {
    if (!product) return;

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

    setWishlistAdded(!alreadyExists);

    window.dispatchEvent(new Event("niyaWishlistUpdated"));
  }

  function addToCart() {
    if (!product) return;

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
          quantity,
        },
      ];
    }

    localStorage.setItem("niyaCart", JSON.stringify(updatedCart));

    setCartAdded(!alreadyExists);

    window.dispatchEvent(new Event("niyaCartUpdated"));
  }

  function getCategoryName(category) {
    if (!category) return "Bags";

    if (typeof category === "string") {
      return category;
    }

    return category.name || category.slug || "Bags";
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[#faf9f5] px-5 py-20">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="text-[10px] tracking-[0.2em] text-[#6b7f85]">
            LOADING PRODUCT...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-[70vh] bg-[#faf9f5] px-5 py-20">
        <div className="mx-auto max-w-[600px] text-center">
          <h1 className="font-serif text-3xl text-[#073b4c]">
            Product not found
          </h1>

          <button
            onClick={() => navigate("/")}
            className="mt-8 bg-[#073b4c] px-7 py-3 text-[10px] font-semibold tracking-[0.12em] text-white"
          >
            BACK TO COLLECTION
          </button>
        </div>
      </main>
    );
  }

  const image = product.thumbnail || product.images?.[0] || product.image;
  const categoryName = getCategoryName(product.category);
  const price = Math.round(product.price * 83);

  return (
    <main className="bg-[#faf9f5]">
      {/* PRODUCT DETAILS */}
      <section className="px-8 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1200px]">
          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-[9px] font-semibold tracking-[0.12em] text-[#385b66]"
          >
            <FiArrowLeft size={13} />
            BACK
          </button>

          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            {/* IMAGE */}
            <div className="relative overflow-hidden bg-[#f0f2f1]">
              <img
                src={image}
                alt={product.title}
                className="h-full max-h-[700px] min-h-[420px] w-full object-cover"
              />

              <button
                type="button"
                onClick={addToWishlist}
                className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 transition ${
                  wishlistAdded ? "text-[#c39920]" : "text-[#073b4c]"
                }`}
                aria-label="Add to wishlist"
              >
                <FiHeart
                  size={17}
                  strokeWidth={1.4}
                  fill={wishlistAdded ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* DETAILS */}
            <div className="flex flex-col justify-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c39920]">
                {categoryName}
              </p>

              <h1 className="mt-3 font-serif text-[34px] leading-tight text-[#073b4c] md:text-[44px]">
                {product.title}
              </h1>

              <p className="mt-4 text-xl font-medium text-[#073b4c]">
                ₹{price.toLocaleString("en-IN")}
              </p>

              {product.discountPercentage && (
                <p className="mt-2 text-[10px] tracking-[0.08em] text-[#9a7777]">
                  {Math.round(product.discountPercentage)}% SPECIAL OFFER
                </p>
              )}

              <div className="my-8 h-px bg-[#e1e7e6]" />

              <p className="text-[12px] leading-7 text-[#6b7f85]">
                {product.description ||
                  "Thoughtfully designed with timeless details and a refined finish, made to become part of your everyday story."}
              </p>

              {/* QUANTITY */}
              <div className="mt-8">
                <p className="mb-3 text-[9px] font-semibold tracking-[0.15em] text-[#073b4c]">
                  QUANTITY
                </p>

                <div className="flex h-11 w-fit items-center border border-[#dfe6e6] bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                    className="flex h-full w-11 items-center justify-center text-[#385b66]"
                  >
                    <FiMinus size={12} />
                  </button>

                  <span className="w-10 text-center text-[11px] text-[#073b4c]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="flex h-full w-11 items-center justify-center text-[#385b66]"
                  >
                    <FiPlus size={12} />
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={addToCart}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 px-4 text-[6px] font-semibold tracking-[0.08em] transition ${
                    cartAdded
                      ? "bg-[#c39920] text-white"
                      : "bg-[#073b4c] text-white hover:bg-[#0b4d60]"
                  }`}
                >
                  <FiShoppingBag size={11} />

                  {cartAdded ? "ADDED ✓" : "ADD"}
                </button>

                <button
                  type="button"
                  onClick={addToWishlist}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 px-4 text-[7px] font-semibold tracking-[0.08em] transition ${
                    wishlistAdded
                      ? "border-[#c39920] bg-[#c39920] text-white"
                      : "border-[#073b4c] text-[#073b4c] hover:bg-[#073b4c] hover:text-white"
                  }`}
                >
                  <FiHeart
                    size={11}
                    fill={wishlistAdded ? "currentColor" : "none"}
                  />

                  {wishlistAdded ? "ADDED TO WISHLIST ✓" : "WISHLIST"}
                </button>
              </div>

              <div className="mt-8 border-t border-[#e1e7e6] pt-6">
                <div className="flex justify-between text-[10px] text-[#6b7f85]">
                  <span>AVAILABILITY</span>
                  <span className="text-[#073b4c]">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (
        <section className="border-t border-[#e5e9e8] bg-white px-8 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8">
              <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[#c39920]">
                YOU MAY ALSO LOVE
              </p>

              <h2 className="font-serif text-[30px] text-[#073b4c] md:text-[36px]">
                Curated For You
              </h2>

              <p className="mt-2 text-[11px] text-[#6b7f85]">
                More pieces worth discovering.
              </p>
            </div>

            {/* HORIZONTAL STRIP */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {suggestions.map((item) => {
                const itemImage =
                  item.thumbnail || item.images?.[0] || item.image;

                const itemCategory = getCategoryName(item.category);

                return (
                  <article
                    key={item.id}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-[190px] shrink-0 cursor-pointer md:w-[220px]"
                  >
                    <div className="group relative aspect-[4/5] overflow-hidden bg-[#f0f2f1]">
                      <img
                        src={itemImage}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          const existingWishlist = JSON.parse(
                            localStorage.getItem("niyaWishlist") || "[]",
                          );

                          const exists = existingWishlist.some(
                            (saved) => saved.id === item.id,
                          );

                          let updatedWishlist;

                          if (exists) {
                            updatedWishlist = existingWishlist.filter(
                              (saved) => saved.id !== item.id,
                            );
                          } else {
                            updatedWishlist = [...existingWishlist, item];
                          }

                          localStorage.setItem(
                            "niyaWishlist",
                            JSON.stringify(updatedWishlist),
                          );

                          window.dispatchEvent(
                            new Event("niyaWishlistUpdated"),
                          );
                        }}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#073b4c]"
                        aria-label="Add to wishlist"
                      >
                        <FiHeart size={14} />
                      </button>
                    </div>

                    <div className="pt-3">
                      <p className="text-[8px] uppercase tracking-[0.12em] text-[#9a7a26]">
                        {itemCategory}
                      </p>

                      <h3 className="mt-1 truncate text-[11px] font-medium text-[#073b4c]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-[10px] font-semibold text-[#073b4c]">
                        ₹{Math.round(item.price * 83).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetails;
