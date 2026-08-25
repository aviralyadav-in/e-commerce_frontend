import { useEffect, useState } from "react";

import { getHeroBanners } from "../../api/api";

import { Link } from "react-router-dom";

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // ===============================
  // LOAD HERO BANNERS
  // ===============================
  useEffect(() => {
    let mounted = true;

    async function loadHeroBanners() {
      try {
        const data = await getHeroBanners();

        if (mounted) {
          setSlides(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load hero banners:", error);
      }
    }

    loadHeroBanners();

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // AUTO CAROUSEL
  // ===============================
  useEffect(() => {
    if (slides.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [slides.length]);

  // ===============================
  // LOADING
  // ===============================
  if (!slides.length) {
    return (
      <section className="bg-[var(--color-dark-section)]">
        <div className="flex min-h-[620px] items-center">
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <div className="h-5 w-28 animate-pulse bg-white/20" />
          </div>
        </div>

        {/* POSTER */}
        <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 md:px-8">
          <img
            src="/products/bags/handbags/WhatsApp%20Image%202026-08-17%20at%205.37.34%20PM%20%281%29.jpeg"
            alt="Niya Collection"
            className="h-full w-full object-contain"
          />
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <>
      {/* ===============================
          HERO CAROUSEL
      =============================== */}
      <section className="relative min-h-[calc(100vh-70px)] w-full overflow-hidden bg-dark-section">
        {/* SLIDES */}
        {slides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title.replace("\n", " ")}
              className="h-full w-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-section/95 via-dark-section/65 to-dark-section/10" />

        {/* CONTENT (POSITIONED SLIGHTLY LOWER) */}
        <div className="relative mx-auto flex min-h-[calc(100vh-70px)] max-w-[1440px] items-end pb-16 pt-32 px-6 md:pb-24 md:px-14">
          <div className="max-w-[620px] text-white">
            <p className="mb-4 text-[11px] font-semibold tracking-widest text-accent-bright uppercase">
              THE NIYA EDIT
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              {slide.title.split("\n").map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < slide.title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* LARGER DESCRIPTION FONT SIZE */}
            <p className="mt-5 max-w-[480px] text-sm sm:text-base md:text-lg leading-relaxed text-white/90 font-normal">
              {slide.subtitle}
            </p>

            <Link
              to={slide.buttonLink}
              className="mt-7 inline-flex items-center gap-4 rounded-full bg-accent-bright px-7 py-3.5 text-xs font-semibold text-dark-section transition hover:opacity-90 shadow-lg"
            >
              {slide.buttonText}
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* DOTS */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === current
                    ? "w-8 bg-accent-bright"
                    : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </section>

      {/* ===============================
          POSTER (FULL-WIDTH EDGE-TO-EDGE, HALF-HEIGHT BANNER)
    {/* POSTER */}
{/* POSTER */}
{/* POSTER */}
<section className="w-full bg-bg-primary py-6">
  <div className="w-full px-6 md:px-14">
    <div className="w-full overflow-hidden">
      <img
        src="/products/bags/image.png"
        alt="Niya Collection Promo Banner"
        className="h-[130px] w-full object-cover sm:h-[150px] md:h-[170px] lg:h-[190px]"
      />
    </div>
  </div>
</section>
    </>
  );
}

export default HeroBanner;
