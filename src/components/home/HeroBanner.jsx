import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getHeroBanners } from "../../api/api";
import { Link } from "react-router-dom";

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    if (slides.length < 2) return;

    const timer = setInterval(() => {
      setCurrent((previous) => (previous + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) {
    return (
      <section className="flex min-h-[540px] items-center bg-[var(--color-dark-section)]">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <div className="h-5 w-28 animate-pulse bg-white/20" />
        </div>
      </section>
    );
  }

  const slide = slides[current];

  return (
    <section className="relative min-h-[540px] overflow-hidden bg-[var(--color-dark-section)] md:min-h-[570px]">
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

      <div className="absolute inset-0 bg-gradient-to-r from-[#073b4c]/95 via-[#073b4c]/65 to-[#073b4c]/10" />

      <div className="relative mx-auto flex min-h-[540px] max-w-[1440px] items-center px-6 md:min-h-[570px] md:px-14">
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

      {/* PREVIOUS */}
      <button
        type="button"
        onClick={() =>
          setCurrent(
            (previous) => (previous - 1 + slides.length) % slides.length,
          )
        }
        className="absolute left-5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/10 text-white"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={16} />
      </button>

      {/* NEXT */}
      <button
        type="button"
        onClick={() => setCurrent((previous) => (previous + 1) % slides.length)}
        className="absolute right-5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/10 text-white"
        aria-label="Next slide"
      >
        <FiChevronRight size={16} />
      </button>

      {/* DOTS */}
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
    </section>
  );
}

export default HeroBanner;
