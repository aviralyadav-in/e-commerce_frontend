import { useEffect, useState } from "react";
import { getFooterPage } from "../../api/api";

function LegalPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("legal");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Legal page:", error);
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

          <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div className="space-y-7">
            {data.sections?.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-b border-slate-200 pb-7 last:border-b-0 last:pb-0 dark:border-slate-800"
              >
                <div className="flex items-start gap-4">
                  <span className="pt-1 text-xs tracking-widest text-slate-400 dark:text-slate-500">
                    0{index + 1}
                  </span>

                  <div className="flex-1">
                    <h2 className="font-serif text-2xl sm:text-3xl">
                      {section.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
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

export default LegalPage;
