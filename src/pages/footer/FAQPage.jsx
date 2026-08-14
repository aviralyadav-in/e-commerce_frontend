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
      <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* ===============================
          HERO
      =============================== */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 lg:px-8 lg:py-7">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            {data.eyebrow}
          </p>

          <h1 className="mt-2 font-serif text-4xl leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ===============================
          FAQ LIST
      =============================== */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {data.faqs?.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-900"
                  >
                    <span className="font-serif text-lg text-slate-900 sm:text-xl dark:text-white">
                      {faq.question}
                    </span>

                    <FiPlus
                      size={18}
                      className={`shrink-0 text-slate-700 transition-transform duration-200 dark:text-slate-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-5 pr-8">
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
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
