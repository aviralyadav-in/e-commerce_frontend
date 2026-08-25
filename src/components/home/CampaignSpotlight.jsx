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
  // LOADING
  // ===============================
  if (!campaign) {
    return (
      <section className="bg-[var(--color-dark-section)] px-4 py-10 sm:px-5 sm:py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden md:grid-cols-2">
          <div className="relative h-[300px] animate-pulse bg-white/10 sm:h-[350px] md:h-[500px]" />

          <div className="flex min-h-0 items-center bg-[var(--color-dark-section-secondary)] px-6 py-8 sm:px-8 sm:py-10 md:min-h-[500px] md:px-14 md:py-12">
            <div className="h-6 w-40 animate-pulse bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-dark-section)] px-4 py-10 sm:px-5 sm:py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden md:grid-cols-2">
        {/* IMAGE */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[500px]">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* CONTENT */}
        <div className="flex min-h-0 items-center bg-[var(--color-dark-section-secondary)] px-6 py-8 sm:px-8 sm:py-10 md:min-h-[500px] md:px-14 md:py-12">
          <div className="max-w-[480px] text-white">
            <p className="mb-2 text-[8px] font-semibold tracking-[0.22em] text-[var(--color-accent-bright)] sm:text-[9px]">
              {campaign.eyebrow}
            </p>

            <h2 className="whitespace-pre-line font-serif text-[32px] leading-[1.05] sm:text-[38px] md:text-[52px]">
              {campaign.title}
            </h2>

            <p className="mt-4 max-w-[420px] text-[10px] leading-5 text-white/65 sm:text-[11px] sm:leading-6">
              {campaign.description}
            </p>

            {campaign.buttonText && campaign.buttonLink && (
              <Link
                to={campaign.buttonLink}
                className="mt-5 inline-flex border-b border-[var(--color-accent-bright)] pb-1.5 text-[14px] font-semibold tracking-wide text-white transition-opacity hover:opacity-70 sm:mt-6 sm:text-[12px]"
              >
                {campaign.buttonText} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CampaignSpotlight;