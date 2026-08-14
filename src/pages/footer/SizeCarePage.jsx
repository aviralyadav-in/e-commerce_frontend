import { useEffect, useState } from "react";
import { getFooterPage } from "../../api/api";

function SizeCarePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("size-care");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Size & Care page:", error);
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

          <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ================= SIZE & CARE ================= */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div className="grid gap-5 md:grid-cols-2">
            {data.sections?.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6"
              >
                <span className="text-xs tracking-widest text-slate-400 dark:text-slate-500">
                  0{index + 1}
                </span>

                <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
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

export default SizeCarePage;
