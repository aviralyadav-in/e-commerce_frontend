import { useEffect, useState } from "react";
import PromoBanner from "../components/home/PromoBanner";
import ProductCard from "../components/product/ProductCard";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/productApi";
import { useWishlist } from "../context/WishlistContext";

function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { wishlistItems } = useWishlist();

  // ============================================================
  // FETCH PRODUCTS FROM PRODUCT API
  // ============================================================
  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getAllProducts();

        if (!mounted) return;

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("WISHLIST PRODUCT FETCH ERROR:", error);
        if (mounted) {
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  // ============================================================
  // GET WISHLIST PRODUCTS (Safe Variant-Aware Support)
  // ============================================================
  const wishlistProducts = products.filter((product) => {
    const productId = String(product?._id || product?.id || "");
    if (!productId) return false;
    
    return wishlistItems.some((wishlistItem) => {
      const itemStr = String(wishlistItem);
      // Exact match OR matches with a hyphen followed by variant info (e.g., prodId-variantId)
      return itemStr === productId || itemStr.startsWith(`${productId}-`);
    });
  });

  // ============================================================
  // LOADING
  // ============================================================
  if (loading) {
    return (
      <main className="min-h-[70vh] bg-[var(--color-bg-primary)] px-5 py-10 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
              SAVED FOR YOU
            </p>
            <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
              Your Wishlist
            </h1>
          </div>
          <div className="flex min-h-[250px] items-center justify-center">
            <p className="text-xs text-[var(--color-text-secondary)]">Loading wishlist...</p>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // EMPTY WISHLIST
  // ============================================================
  if (wishlistItems.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[var(--color-bg-primary)] px-5 py-6 text-[var(--color-text-primary)] md:px-10 md:py-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
              SAVED FOR YOU
            </p>
            <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
              Your Wishlist
            </h1>
            <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-[var(--color-text-secondary)]">
              A collection of pieces you would love to carry.
            </p>
          </div>

          <div className="mx-auto flex max-w-[600px] flex-col items-center border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] px-6 py-16 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <FiHeart size={25} strokeWidth={1.2} />
            </div>
            <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">
              Nothing saved yet
            </h2>
            <p className="mt-3 max-w-[360px] text-[11px] leading-6 text-[var(--color-text-secondary)]">
              Keep the pieces you love close. Your wishlist will hold them here
              until you are ready.
            </p>
            <Link
              to="/shop"
              className="mt-8 flex h-11 items-center gap-2 bg-[var(--color-dark-section)] px-7 text-[10px] font-semibold tracking-[0.12em] text-white transition hover:opacity-90"
            >
              <span className="text-white">DISCOVER NIYA</span>
              <FiArrowRight size={14} className="text-white" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // WISHLIST GRID
  // ============================================================
  return (
    <main className="min-h-[70vh] bg-[var(--color-bg-primary)] px-5 py-6 text-[var(--color-text-primary)] md:px-10 md:py-10">
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
            SAVED FOR YOU
          </p>
          <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
            Your Wishlist
          </h1>
          <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-6 text-[var(--color-text-secondary)]">
            A collection of pieces you would love to carry.
          </p>
        </div>

        {/* PRODUCTS GRID USING REUSABLE PRODUCT CARD */}
        {wishlistProducts.length === 0 ? (
          <div className="mx-auto max-w-[600px] border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] px-6 py-12 text-center">
            <p className="text-xs text-[var(--color-text-secondary)]">
              Wishlist products are no longer available.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-10 items-center gap-2 bg-[var(--color-dark-section)] px-6 text-[10px] font-semibold tracking-wider text-white"
            >
              <span className="text-white">CONTINUE SHOPPING</span>
              <FiArrowRight size={14} className="text-white" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {wishlistProducts.map((product) => {
              const productId = product?._id || product?.id;
              return <ProductCard key={productId} product={product} />;
            })}
          </div>
        )}

        {/* PROMO BANNER */}
        <PromoBanner page="wishlist" position="after-products" />
      </div>
    </main>
  );
}

export default WishlistPage;