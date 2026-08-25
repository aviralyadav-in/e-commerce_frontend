import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getFooterPage } from "../../api/api";

function FooterPage() {
  const location = useLocation();
  const [data, setData] = useState(null);

  // ============================================================
  // GET CURRENT FOOTER PAGE SLUG
  // ============================================================

  const slug = location.pathname.split("/")[1];

  // ============================================================
  // LOAD PAGE DATA
  // ============================================================

  useEffect(() => {
    const loadPage = async () => {
      try {
        setData(null);

        const result = await getFooterPage(slug);

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load footer page:", error);
      }
    };

    if (slug) {
      loadPage();
    }
  }, [slug]);

  // ============================================================
  // LOADING
  // ============================================================

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

      {/* ========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">

          {data.eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
              {data.eyebrow}
            </p>
          )}

          <h1 className="mt-2 max-w-4xl font-serif text-4xl leading-[1.08] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          {data.intro && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
              {data.intro}
            </p>
          )}

        </div>
      </section>

      {/* ========================================================
          MAIN SECTIONS
      ========================================================= */}

      {data.sections?.length > 0 && (
        <section>
          <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8 lg:py-12">

            <div className="space-y-8">

              {data.sections.map((section, index) => (
                <article
                  key={section.id || section.title || index}
                  className="border-b border-[var(--color-border)] pb-7 last:border-b-0 last:pb-0"
                >
                  <div className="flex gap-5">

                    {/* NUMBER */}
                    <span className="shrink-0 pt-1 text-xs tracking-widest text-[var(--color-text-muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* CONTENT */}
                    <div>
                      {section.title && (
                        <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                          {section.title}
                        </h2>
                      )}

                      {section.content && (
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
                          {section.content}
                        </p>
                      )}
                    </div>

                  </div>
                </article>
              ))}

            </div>

          </div>
        </section>
      )}

      {/* ========================================================
          VALUES
      ========================================================= */}

      {data.values?.length > 0 && (
        <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8 lg:py-12">

            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              What Defines Us
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {data.values.map((value, index) => (
                <article
                  key={value.id || value.title || index}
                  className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-5"
                >
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {value.content}
                  </p>
                </article>
              ))}

            </div>

          </div>
        </section>
      )}

    </main>
  );
}

export default FooterPage;