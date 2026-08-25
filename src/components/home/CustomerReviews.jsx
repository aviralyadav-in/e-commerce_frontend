import { FiStar } from "react-icons/fi";
import { getReviews } from "../../api/homeApi";

function CustomerReviews() {
  const reviews = getReviews();

  if (!reviews?.length) {
    return null;
  }

  return (
    <section
      id="reviews"
      className="bg-[var(--color-bg-secondary)] px-5 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
            THE NIYA EXPERIENCE
          </p>

          <h2 className="font-serif text-[34px] text-[var(--color-text-primary)] md:text-[40px]">
            Loved by Women Everywhere
          </h2>
        </div>

        {/* REVIEWS */}
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id || review.name}
              className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6"
            >
              {/* STARS */}
              <div className="flex gap-1 text-[var(--color-accent)]">
                {Array.from({ length: review.rating || 5 }).map(
                  (_, index) => (
                    <FiStar
                      key={index}
                      size={11}
                      fill="currentColor"
                      strokeWidth={1}
                    />
                  ),
                )}
              </div>

              {/* REVIEW */}
              <p className="mt-5 font-serif text-[16px] leading-6 text-[var(--color-text-primary)]">
                “{review.text}”
              </p>

              {/* CUSTOMER */}
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <p className="text-[9px] font-semibold text-[var(--color-text-primary)]">
                  {review.name}
                </p>

                <p className="mt-1 text-[8px] text-[var(--color-text-muted)]">
                  {review.location} · Verified Customer
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;