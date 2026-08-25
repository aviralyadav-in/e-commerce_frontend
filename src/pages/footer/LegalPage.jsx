import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getFooterPage } from "../../api/footerApi";

function LegalPage() {
  const location = useLocation();
  const [data, setData] = useState(null);

  // Current URL se correct footer page slug
  const slug = location.pathname.split("/")[1];

  useEffect(() => {
    const loadPage = async () => {
      try {
        setData(null);

        const result = await getFooterPage(slug);

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Legal page:", error);
      }
    };

    if (slug) {
      loadPage();
    }
  }, [slug]);

  // Scroll to hash section
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
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
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

          <h1 className="mt-2 font-serif text-4xl leading-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          {data.intro && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
              {data.intro}
            </p>
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section>
        <div className="mx-auto max-w-4xl px-5 py-9 sm:px-6 lg:px-8 lg:py-11">
          <div className="space-y-7">
            {data.sections?.map((section, index) => (
              <article
                key={section.id || section.title || index}
                id={section.id}
                className="scroll-mt-24 border-b border-[var(--color-border)] pb-7 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-4">
                  <span className="pt-1 text-xs tracking-widest text-[var(--color-text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                      {section.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)] sm:text-base">
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
