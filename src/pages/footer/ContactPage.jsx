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

          <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.08] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
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
                className="border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 transition-colors duration-300"
              >
                {/* ICON */}
                {index === 0 && (
                  <FiMessageCircle
                    size={21}
                    className="mb-4 text-[var(--color-accent)]"
                  />
                )}

                {index === 1 && (
                  <FiMail
                    size={21}
                    className="mb-4 text-[var(--color-accent)]"
                  />
                )}

                {index > 1 && <div className="mb-4 h-[21px]" />}

                <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
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
