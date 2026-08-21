import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { getFooterPage } from "../../api/api";

function FAQPage() {
  const [data, setData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("faq");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load FAQ page:", error);
      }
    };

    loadPage();
  }, []);

  // ===============================
  // LOADING
  // ===============================
  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
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
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 lg:px-8 lg:py-7">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {data.eyebrow}
          </p>

          <h1 className="mt-2 font-serif text-4xl leading-[1.08] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ===============================
          FAQ LIST
      =============================== */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {data.faqs?.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-4 text-left transition-colors hover:bg-[var(--color-bg-secondary)]"
                  >
                    <span className="font-serif text-lg text-[var(--color-text-primary)] sm:text-xl">
                      {faq.question}
                    </span>

                    <FiPlus
                      size={18}
                      className={`shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 pr-8">
                      <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default FAQPage;
