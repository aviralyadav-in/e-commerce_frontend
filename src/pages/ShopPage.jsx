import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/api";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf9f5]">
      {/* PAGE HEADER */}
      <section className="border-b border-[#e8eded] px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[#c39920]">
            THE COLLECTION
          </p>

          <h1 className="font-serif text-4xl text-[#073b4c] md:text-5xl">
            Shop All
          </h1>

          <p className="mt-4 max-w-[560px] text-xs leading-6 text-[#385b66]">
            Discover the complete Niya Bags collection, thoughtfully designed
            for every moment.
          </p>
        </div>
      </section>

      {/* SHOP CONTENT */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr]">
          {/* SIDEBAR */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <p className="mb-5 text-[10px] font-semibold tracking-[0.2em] text-[#073b4c]">
                FILTERS
              </p>

              <div className="border-t border-[#dfe5e5] pt-5">
                <p className="text-xs font-semibold text-[#073b4c]">WOMEN</p>

                <div className="mt-4 space-y-3 text-xs text-[#385b66]">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled
                      className="h-3.5 w-3.5 accent-[#c39920]"
                    />
                    Tote
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled
                      className="h-3.5 w-3.5 accent-[#c39920]"
                    />
                    Shoulder
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled
                      className="h-3.5 w-3.5 accent-[#c39920]"
                    />
                    Crossbody
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      disabled
                      className="h-3.5 w-3.5 accent-[#c39920]"
                    />
                    Clutch
                  </label>
                </div>
              </div>

              <div className="mt-8 border-t border-[#dfe5e5] pt-5">
                <p className="text-xs font-semibold text-[#073b4c]">MEN</p>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] tracking-[0.15em] text-[#385b66]">
                {loading ? "LOADING..." : `${products.length} PRODUCTS`}
              </p>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item}>
                    <div className="aspect-[4/5] animate-pulse bg-[#eeeeea]" />
                    <div className="mt-4 h-3 w-2/3 animate-pulse bg-[#eeeeea]" />
                    <div className="mt-2 h-3 w-1/3 animate-pulse bg-[#eeeeea]" />
                  </div>
                ))}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="py-16 text-center">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* PRODUCTS */}
            {!loading && !error && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f0efeb]">
                      <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />

                      <button
                        type="button"
                        aria-label={`Add ${product.title} to wishlist`}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#073b4c] transition hover:text-[#c39920]"
                      >
                        <FiHeart size={15} strokeWidth={1.4} />
                      </button>
                    </div>

                    <div className="pt-4">
                      <h2 className="line-clamp-1 text-xs font-medium text-[#073b4c]">
                        {product.title}
                      </h2>

                      <p className="mt-1 text-[11px] text-[#385b66]">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShopPage;
