import { useEffect, useState } from "react";
import { FiMail, FiMessageCircle } from "react-icons/fi";
import { getFooterPage } from "../../api/api";

function ContactPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("contact");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Contact page:", error);
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

          <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ===============================
          CONTACT INFORMATION
      =============================== */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {data.sections?.map((section, index) => (
              <article
                key={section.title}
                className="border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
              >
                {/* ICON */}
                {index === 0 && (
                  <FiMessageCircle
                    size={21}
                    className="mb-4 text-slate-700 dark:text-slate-200"
                  />
                )}

                {index === 1 && (
                  <FiMail
                    size={21}
                    className="mb-4 text-slate-700 dark:text-slate-200"
                  />
                )}

                {index > 1 && <div className="mb-4 h-[21px]" />}

                <h2 className="font-serif text-2xl text-slate-900 dark:text-white">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
