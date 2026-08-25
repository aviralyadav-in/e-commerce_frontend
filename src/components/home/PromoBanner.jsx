import { useEffect, useState } from "react";
import { getPromoBanners } from "../../api/homeApi";

function PromoBanner({ page, position }) {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadPromoBanner() {
      try {
        const data = await getPromoBanners();

        if (!mounted || !Array.isArray(data)) return;

        const matchedBanner = data.find(
          (item) =>
            item.page === page &&
            item.position === position &&
            item.isActive === true,
        );

        setBanner(matchedBanner || null);
      } catch (error) {
        console.error("Failed to load promo banner:", error);
      }
    }

    loadPromoBanner();

    return () => {
      mounted = false;
    };
  }, [page, position]);

  if (!banner) {
    return null;
  }

  return (
    <section className="w-full bg-bg-primary px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
      <div className="w-full overflow-hidden">
        <img
          src={banner.image}
          alt={banner.alt || banner.title || "Promo Banner"}
          className="h-[130px] w-full object-cover sm:h-[150px] md:h-[170px] lg:h-[190px]"
        />
      </div>
    </section>
  );
}

export default PromoBanner;
