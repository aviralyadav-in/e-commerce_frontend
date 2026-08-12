function CampaignSpotlight() {
  return (
    <section className="bg-[#073b4c] px-4 py-10 sm:px-5 sm:py-14 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden md:grid-cols-2">
        {/* Image */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
            alt="Niya campaign"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex min-h-0 items-center bg-[#0b4658] px-6 py-8 sm:px-8 sm:py-10 md:min-h-[500px] md:px-14 md:py-12">
          <div className="max-w-[480px] text-white">
            <p className="mb-2 text-[8px] font-semibold tracking-[0.22em] text-[#d2a92e] sm:text-[9px]">
              THE LATEST CAMPAIGN
            </p>

            <h2 className="font-serif text-[32px] leading-[1.05] sm:text-[38px] md:text-[52px]">
              Made for
              <br />
              Your Moment
            </h2>

            <p className="mt-4 max-w-[420px] text-[10px] leading-5 text-white/65 sm:text-[11px] sm:leading-6">
              A celebration of modern elegance, effortless movement, and the
              quiet confidence that comes with carrying something beautifully
              made.
            </p>

            <a
              href="#featured"
              className="mt-5 inline-flex border-b border-[#d2a92e] pb-1.5 text-[8px] font-semibold tracking-wide text-white sm:mt-6 sm:text-[9px]"
            >
              Explore the Campaign →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CampaignSpotlight;