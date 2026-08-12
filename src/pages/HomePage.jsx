
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
    <div>
      <main>
        <HeroBanner />
        <CategorySection />
        <FeaturedProducts />

        <section className="mt-8 mb-10 md:mt-10 md:mb-14">
          <TrustBadges />
        </section>

        <CampaignSpotlight />
        <ReelsSection />
        <BrandCraftsmanship />
        <CustomerReviews />

        <section className="bg-[#073b4c] px-5 py-14 text-white md:px-10">
          <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[#d2a92e]">STAY IN THE LOOP</p>
              <h2 className="font-serif text-3xl md:text-4xl">Join the Niya Circle</h2>
              <p className="mt-3 max-w-[480px] text-xs leading-6 text-white/65">Be the first to know about new collections, private sales, and styling stories.</p>
            </div>

            <form className="flex h-11 w-full max-w-[430px] rounded-full bg-[#0c4658] p-1">
              <input type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-4 text-xs text-white outline-none placeholder:text-white/40" />
              <button type="submit" className="rounded-full bg-[#d2a92e] px-5 text-[10px] font-semibold text-[#073b4c]">Subscribe →</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
;
