import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { getAllProducts } from "../api/api"; // API se data fetch karne ke liye (agar api use karte hain)

function SalePage() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchSaleProducts() {
      try {
        setLoading(true);
        // Sabhi products laakar sirf sale wale filter kar lenge
        const allProducts = await getAllProducts();
        if (!isMounted) return;

        if (Array.isArray(allProducts)) {
          const filtered = allProducts.filter((product) => product.isOnSale);
          setSaleProducts(filtered);
        }
      } catch (error) {
        console.error("Error loading sale products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchSaleProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)]">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Loading Sale...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* ================= PAGE HEADER ================= */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-[9px] font-semibold tracking-[0.24em] text-[var(--color-accent)]">
                LIMITED OFFERS
              </p>
              <h1 className="font-serif text-3xl leading-none md:text-5xl">
                Sale
              </h1>
            </div>

            <p className="max-w-[420px] text-[10px] leading-5 text-[var(--color-text-muted)] md:text-right">
              Discover selected Niya Bags at special prices.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">
            {saleProducts.length} PRODUCTS ON SALE
          </p>
        </div>

        {saleProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              No sale products available right now.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-block border border-[var(--color-border)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                badgeText="SALE"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default SalePage;