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
      <section className="relative min-h-[620px] overflow-hidden bg-[var(--color-dark-section)] md:min-h-[680px]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#073b4c]/95 via-[#073b4c]/65 to-[#073b4c]/10" />

        {/* CONTENT */}
        <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-center px-6 md:min-h-[680px] md:px-14">
          <div className="max-w-[560px] text-white">
            <p className="mb-4 text-[9px] font-semibold tracking-[0.28em] text-[var(--color-accent-bright)]">
              THE NIYA EDIT
            </p>

            <h1 className="font-serif text-[48px] font-medium leading-[0.98] tracking-[-0.02em] sm:text-[58px] md:text-[72px]">
              {slide.title.split("\n").map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line}
                  {index < slide.title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="mt-6 max-w-[420px] text-[12px] leading-6 text-white/80">
              {slide.subtitle}
            </p>

            <Link
              to={slide.buttonLink}
              className="mt-7 inline-flex items-center gap-4 rounded-full bg-[var(--color-accent-bright)] px-6 py-3 text-[10px] font-semibold text-[#073b4c] transition hover:opacity-90"
            >
              {slide.buttonText}
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* DOTS */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === current
                    ? "w-6 bg-[var(--color-accent-bright)]"
                    : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </section>

      {/* ===============================
          POSTER
      =============================== */}
      <section className="w-full bg-[var(--color-bg-primary)] px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-[1440px] overflow-hidden">
          <img
            src="/products/bags/image.png"
            alt="Niya Collection"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </>
  );
}

export default HeroBanner;
