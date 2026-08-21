import { useEffect, useState } from "react";
import { getFooterPage } from "../../api/api";

function OurStoryPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("our-story");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Our Story page:", error);
      }
    };

    loadPage();
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300">
      {/* ================= HERO ================= */}
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

      {/* ================= JOURNEY ================= */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              The Journey
            </p>

            <h2 className="mt-1 font-serif text-3xl leading-tight text-[var(--color-text-primary)] sm:text-4xl">
              From an idea to Niya.
            </h2>
          </div>

          <div className="mt-7 grid gap-7 border-t border-[var(--color-border)] pt-7 md:grid-cols-3">
            {data.sections?.map((section, index) => (
              <article key={section.title}>
                <span className="text-xs tracking-widest text-[var(--color-text-muted)]">
                  0{index + 1}
                </span>

                <h3 className="mt-2 font-serif text-2xl text-[var(--color-text-primary)]">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[var(--color-text-secondary)]">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
          <p className="max-w-2xl font-serif text-2xl leading-relaxed text-[var(--color-text-primary)] sm:text-3xl">
            “The best designs are the ones that become part of your everyday
            life.”
          </p>
        </div>
      </section>
    </main>
  );
}

export default OurStoryPage;