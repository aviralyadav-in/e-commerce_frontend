import { useEffect, useState } from "react";
import { getFooterPage } from "../../api/api";

function ShippingReturnsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("shipping-returns");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Shipping & Returns page:", error);
      }
    };

    loadPage();
  }, []);

  useEffect(() => {
    if (!data) return;

    const id = window.location.hash.replace("#", "");

    if (id) {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [data]);

  if (!data) {
    return (
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* ================= HERO ================= */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-8 lg:py-9">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            {data.eyebrow}
          </p>

          <h1 className="mt-2 max-w-4xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ================= SHIPPING / RETURNS CONTENT ================= */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div>
            {data.sections?.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-b border-slate-200 py-7 first:pt-0 last:border-b-0 last:pb-0 dark:border-slate-800"
              >
                <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    0{index + 1}
                  </span>

                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl">
                      {section.title}
                    </h2>

                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
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
