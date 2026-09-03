
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
    <section className="w-full bg-bg-primary px-0 py-1.5 sm:px-0 sm:py-2 md:px-2 md:py-3 lg:px-4 lg:py-4">
      <div className="w-full overflow-hidden rounded-lg md:rounded-xl shadow-sm">
        <img
          src={banner.image}
          alt={banner.alt || banner.title || "Promo Banner"}
          className="block h-auto w-full lg:h-[190px] lg:object-cover"
        />
      </div>
    </section>
  );
}

export default PromoBanner;
