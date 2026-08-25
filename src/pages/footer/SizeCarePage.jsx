import { useEffect, useState } from "react";
import { getFooterPage } from "../../api/footerApi";

function SizeCarePage() {
  const [data, setData] = useState(null);

  // ===============================
  // LOAD PAGE DATA
  // ===============================
  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("size-guide");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Size & Care page:", error);
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

          <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.08] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ===============================
          SIZE & CARE
      =============================== */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div className="grid gap-5 md:grid-cols-2">
            {data.sections?.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6"
              >
                {/* NUMBER */}
                <span className="text-xs tracking-widest text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* TITLE */}
                <h2 className="mt-2 font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                  {section.title}
                </h2>

                {/* CONTENT */}
                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
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