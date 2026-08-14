import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Ananya M.",
    location: "Mumbai",
    text: "The craftsmanship is even more beautiful in person. It feels luxurious without being overdone.",
  },
  {
    name: "Priya R.",
    location: "Delhi",
    text: "My Niya bag has become my everyday favourite. The quality, details and packaging were exceptional.",
  },
  {
    name: "Meera S.",
    location: "Bengaluru",
    text: "Elegant, practical and beautifully made. I have already recommended Niya to my friends.",
  },
];

function CustomerReviews() {
  return (
    <section
      id="reviews"
      className="bg-[var(--color-bg-secondary)] px-5 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
            THE NIYA EXPERIENCE
          </p>

          <h2 className="font-serif text-[34px] text-[var(--color-text-primary)] md:text-[40px]">
            Loved by Women Everywhere
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6"
            >
              <div className="flex gap-1 text-[var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FiStar
                    key={index}
                    size={11}
                    fill="currentColor"
                    strokeWidth={1}
                  />
                ))}
              </div>

              <p className="mt-5 font-serif text-[16px] leading-6 text-[var(--color-text-primary)]">
                “{review.text}”
              </p>

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
