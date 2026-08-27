import HeroBanner from "../components/home/HeroBanner";
import TrustBadges from "../components/home/TrustBadges";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import CampaignSpotlight from "../components/home/CampaignSpotlight";
import ReelsSection from "../components/home/ReelsSection";
import BrandCraftsmanship from "../components/home/BrandCraftsmanship";
import CustomerReviews from "../components/home/CustomerReviews";

function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroBanner />

      <CategorySection />

      <FeaturedProducts />

      <section className="my-8 sm:my-12 md:my-16 lg:my-20">
        <TrustBadges />
      </section>

      <CampaignSpotlight />

      <ReelsSection />

      <BrandCraftsmanship />

      <CustomerReviews />

      {/* NEWSLETTER SECTION */}
      <section className="bg-[var(--color-dark-section)] px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-12 lg:py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center lg:gap-12">
          
          {/* Content Block */}
          <div className="w-full md:w-auto md:max-w-xl">
            <p className="mb-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-[var(--color-accent-bright)] uppercase">
              STAY IN THE LOOP
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Join the Niya Circle
            </h2>

            <p className="mt-2 sm:mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-white/70">
              Be the first to know about new collections, private sales, and
              styling stories.
            </p>
          </div>

          {/* Form Block (Logic Preserved) */}
          <form className="flex h-12 w-full max-w-md items-center rounded-full bg-[var(--color-dark-section-secondary)] p-1 sm:h-12 border border-white/5 focus-within:border-[var(--color-accent-bright)] transition-colors">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-xs sm:text-sm text-white outline-none placeholder:text-white/40"
            />

            <button
              type="submit"
              className="h-full rounded-full bg-[var(--color-accent-bright)] px-5 sm:px-6 text-[11px] sm:text-xs font-semibold tracking-wide text-[var(--color-text-primary)] transition hover:opacity-90 active:scale-95 whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>

        </div>
      </section>
    </main>
  );
}

export default HomePage;