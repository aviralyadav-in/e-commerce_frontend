import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCampaign } from "../../api/homeApi";

function CampaignSpotlight() {
  const [campaign, setCampaign] = useState(null);

  // ===============================
  // LOAD CAMPAIGN
  // ===============================
  useEffect(() => {
    let mounted = true;

    async function loadCampaign() {
      try {
        const data = await getCampaign();

        if (mounted) {
          setCampaign(data);
        }
      } catch (error) {
        console.error("Failed to load campaign:", error);
      }
    }

    loadCampaign();

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // LOADING SKELETON
  // ===============================
  if (!campaign) {
    return (
      <section className="bg-[var(--color-dark-section)] px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden md:grid-cols-2">
          {/* Skeleton Image */}
          <div className="relative h-[350px] sm:h-[450px] md:h-full md:min-h-[500px] lg:min-h-[600px] animate-pulse bg-white/5" />

          {/* Skeleton Content */}
          <div className="flex items-center bg-[var(--color-dark-section-secondary)] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
            <div className="w-full max-w-[480px]">
              <div className="mb-4 h-3 w-24 animate-pulse bg-white/10 rounded" />
              <div className="mb-4 h-12 w-3/4 animate-pulse bg-white/10 rounded" />
              <div className="h-4 w-full animate-pulse bg-white/10 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-dark-section)] px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden md:grid-cols-2 shadow-sm">
        
        {/* IMAGE */}
        <div className="relative h-[350px] sm:h-[450px] md:h-full md:min-h-[500px] lg:min-h-[600px]">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* CONTENT */}
        <div className="flex items-center bg-[var(--color-dark-section-secondary)] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-20">
          <div className="max-w-[480px] text-white">
            
            <p className="mb-3 text-[10px] sm:text-xs font-semibold tracking-widest text-[var(--color-accent-bright)] uppercase">
              {campaign.eyebrow}
            </p>

            <h2 className="whitespace-pre-line font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              {campaign.title}
            </h2>

            <p className="mt-4 sm:mt-5 max-w-[420px] text-xs sm:text-sm lg:text-base leading-relaxed text-white/70 font-normal">
              {campaign.description}
            </p>

            {campaign.buttonText && campaign.buttonLink && (
              <Link
                to={campaign.buttonLink}
                className="mt-6 sm:mt-8 inline-flex items-center border-b border-[var(--color-accent-bright)] pb-1 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all hover:text-[var(--color-accent-bright)] hover:opacity-90 active:opacity-70"
              >
                {campaign.buttonText} <span className="ml-2 font-normal">→</span>
              </Link>
            )}
            
          </div>
        </div>

      </div>
    </section>
  );
}

export default CampaignSpotlight;