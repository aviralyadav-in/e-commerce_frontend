import { useEffect, useState } from "react";
import { getFooterPage } from "../../api/footerApi";

function ShippingReturnsPage() {
  const [data, setData] = useState(null);

  // ===============================
  // LOAD PAGE DATA
  // ===============================
  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("shipping-returns");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error(
          "Failed to load Shipping & Returns page:",
          error
        );
      }
    };

    loadPage();
  }, []);

  // ===============================
  // HASH SCROLL
  // ===============================
  useEffect(() => {
    if (!data) return;

    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [data]);

  // ===============================
  // LOADING
  // ===============================
  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--color-text-muted)]">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300">
      {/* ===============================
          HERO
      =============================== */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-8 lg:py-9">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {data.eyebrow}
          </p>

          <h1 className="mt-2 max-w-4xl font-serif text-4xl leading-[1.08] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ===============================
          SHIPPING / RETURNS / EXCHANGE
      =============================== */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div>
            {data.sections?.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-b border-[var(--color-border)] py-7 first:pt-0 last:border-b-0 last:pb-0"
              >
                <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                  {/* SECTION NUMBER */}
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* CONTENT */}
                  <div>
                    <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                      {section.title}
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                      {section.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShippingReturnsPage;