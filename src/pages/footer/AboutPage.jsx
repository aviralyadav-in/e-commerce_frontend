import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getFooterPage } from "../../api/api";

function AboutPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("about");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load About page:", error);
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
          MAIN CONTENT
      =============================== */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[0.7fr_1.5fr] lg:gap-10 lg:px-8 lg:py-8">
          {/* LEFT */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
              The Niya Way
            </p>

            <h2 className="mt-1 font-serif text-3xl leading-tight text-[var(--color-text-primary)] sm:text-4xl">
              Made with intention.
            </h2>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            {data.sections?.map((section) => (
              <article
                key={section.title}
                className="border-b border-[var(--color-border)] pb-5 last:border-b-0 last:pb-0"
              >
                <h3 className="font-serif text-2xl text-[var(--color-text-primary)]">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===============================
          VALUES
      =============================== */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            What Defines Us
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {data.values?.map((value) => (
              <article
                key={value.title}
                className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-5 transition-colors duration-300"
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

      {/* ===============================
          CTA
      =============================== */}
      <section>
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-7">
          <div>
            <h2 className="font-serif text-2xl text-[var(--color-text-primary)] sm:text-3xl">
              Discover the Niya collection.
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Explore pieces designed for everyday elegance.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 border border-[var(--color-text-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white"
          >
            Shop Collection
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
