import { useEffect, useRef, useState } from "react";

import { getHeroBanners } from "../../api/homeApi";

import PromoBanner from "./PromoBanner";

import { Link } from "react-router-dom";

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const touchStartX = useRef(0);

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
      setImageLoaded(false);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // ===============================
  // MOBILE SWIPE
  // ===============================

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (slides.length < 2) return;

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) < 50) return;

    if (distance > 0) {
      setCurrent((previous) => (previous + 1) % slides.length);
    } else {
      setCurrent((previous) => (previous - 1 + slides.length) % slides.length);
    }

    setImageLoaded(false);
  };

  // ===============================
  // LOADING STATE
  // ===============================

  if (!slides.length) {
    return (
      <section className="bg-[var(--color-bg-primary)] transition-colors duration-300">
        <div className="flex h-[calc(100vh-80px)] items-center lg:min-h-[680px]">
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <div className="h-5 w-28 animate-pulse bg-current opacity-10" />
          </div>
        </div>
      </section>
    );
  }

  // Current slide is still used for carousel images
  const heroContent = slides[current] || slides[0];

  // ONLY FIRST API ITEM is used for heading + subtitle
  const heroText = slides[0] || {};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

        .editorial-heading {
          font-family: "Playfair Display", Georgia, serif !important;
          font-size: clamp(52px, 6vw, 92px) !important;
          line-height: 0.95 !important;
          font-weight: 600 !important;
          letter-spacing: -0.055em !important;
          max-width: 760px !important;
        }

        /* ================================
           NIYA BAGS HERO THEME COLORS
           TYPOGRAPHY UNCHANGED
        ================================ */

        .niyabags-hero {
          color: var(--color-text-primary);
        }

        .niyabags-hero .niyabags-hero-text {
          color: var(--color-text-primary) !important;
        }

        .niyabags-hero .niyabags-hero-subtitle {
          color: var(--color-text-secondary) !important;
        }

        .niyabags-hero .niyabags-hero-button {
          background-color: var(--color-text-primary);
          color: var(--color-bg-primary);
        }
      `}</style>

      <section
        className="niyabags-hero relative flex w-full flex-col justify-between overflow-hidden transition-colors duration-300"
        style={{
          minHeight: "calc(100vh - 80px)",
          backgroundColor: "var(--color-bg-primary)",
          color: "var(--color-text-primary)",
        }}
      >
        <div className="mx-auto my-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-10 px-6 py-8 lg:flex-row lg:gap-16 lg:px-14">
          {/* ===============================
              LEFT — TEXT CONTENT
          =============================== */}

          <div className="flex w-full flex-col justify-center lg:w-[52%]">
            <div className="max-w-[580px]">
              {/* SMALL TOP LABEL */}

              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: "var(--color-text-primary)",
                  }}
                />

                <p className="niyabags-hero-text text-[11px] font-bold uppercase tracking-[0.22em]">
                  {heroContent.tag || "STREET EDIT"}
                </p>
              </div>

              {/* MAIN HEADING */}

              <h1 className="editorial-heading niyabags-hero-heading niyabags-hero-text">
                {heroText.title
                  ? heroText.title.split("\n").map((line, index) => (
                      <span key={`${line}-${index}`}>
                        {line}

                        {index < heroText.title.split("\n").length - 1 && (
                          <br />
                        )}
                      </span>
                    ))
                  : ""}
              </h1>

              {/* SUBTITLE */}

              <p className="niyabags-hero-text mt-5 max-w-[460px] text-sm leading-relaxed sm:text-base">
                {heroText.subtitle || heroText.description || ""}
              </p>

              {/* SINGLE SHOP BUTTON */}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="niyabags-hero-button inline-flex items-center gap-3 px-7 py-3.5 text-xs font-semibold transition hover:opacity-90"
                >
                  EXPLORE THE COLLECTION <span>→</span>
                </Link>
              </div>

              {/* FOOTER COUNTER */}

              <div className="mt-12 flex items-center gap-4 text-xs font-semibold tracking-widest">
                <span className="niyabags-hero-text">
                  {String(current + 1).padStart(2, "0")}
                </span>

                <div
                  className="h-[1px] w-12"
                  style={{
                    backgroundColor: "var(--color-border)",
                  }}
                />

                <span className="niyabags-hero-text">
                  DESIGNED FOR YOUR EVERYDAY
                </span>
              </div>
            </div>
          </div>

          {/* ===============================
              RIGHT — IMAGE CAROUSEL
          =============================== */}

          <div className="flex w-full items-center justify-center lg:w-[44%]">
            {/* 
              MOBILE:
              Existing square behavior preserved.

              TABLET:
              Same tall height style as desktop.

              DESKTOP:
              BAGWATI-style responsive height.
            */}

            <div
              className="relative aspect-square w-full max-w-[480px] overflow-visible md:aspect-auto md:h-[500px] md:min-h-[500px] md:w-full md:max-w-[700px] lg:h-[min(68vh,690px)] lg:min-h-[500px] lg:max-w-[700px] lg:shrink-0"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* ===============================
                  IMAGE CONTAINER
              =============================== */}

              <div
                className="relative h-full w-full overflow-hidden transition-colors"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-tertiary)",
                }}
              >
                {slides.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === current ? "z-10 opacity-100" : "z-0 opacity-0"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={
                        item.title
                          ? item.title.replace("\n", " ")
                          : "Bag collection"
                      }
                      className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
                        index === current && imageLoaded
                          ? "opacity-100"
                          : index === current
                            ? "opacity-90"
                            : "opacity-0"
                      }`}
                      onLoad={() => {
                        if (index === current) {
                          setImageLoaded(true);
                        }
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}

                {/* TOP IMAGE OVERLAY */}

                <div className="pointer-events-none absolute left-3 right-3 top-3 z-20 flex justify-between text-[9px] font-semibold tracking-[0.18em] text-white drop-shadow-md">
                  <span>NIYA</span>

                  <span>
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* ===============================
                  CIRCLE BADGE
              =============================== */}

              <div
                className="absolute right-1 top-9 z-35 flex h-25 w-25 items-center justify-center rounded-full text-center text-[10px] font-bold leading-tight tracking-[0.20em] text-white shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 md:-right-12"
                style={{
                  backgroundColor: "var(--color-accent)",
                }}
              >
                <span>
                  EXPLORE
                  <br />
                  THE
                  <br />
                  EDIT
                </span>
              </div>

              {/* ===============================
                  FLOATING CARD
              =============================== */}

              <div
                className="absolute -bottom-6 left-4 z-30 flex min-h-[60px] min-w-[150px] flex-col justify-center px-4 py-2.5 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span className="niyabags-hero-text text-[9px] font-bold tracking-widest">
                  {String(current + 1).padStart(2, "0")}
                </span>

                <span className="niyabags-hero-text mt-0.5 text-[10px] font-bold tracking-wider">
                  THE EVERYDAY EDIT
                </span>

                <span className="niyabags-hero-text text-[9px]">
                  Bags made to move with you.
                </span>
              </div>

              {/* ===============================
                  DOTS NAVIGATION
              =============================== */}

              {slides.length > 1 && (
                <div className="absolute -bottom-10 right-0 flex items-center justify-center gap-2">
                  {slides.map((item, index) => (
                    <button
                      key={item.id || index}
                      type="button"
                      onClick={() => {
                        setCurrent(index);
                        setImageLoaded(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === current ? "w-5" : "w-1.5 opacity-40"
                      }`}
                      style={{
                        backgroundColor: "var(--color-text-primary)",
                      }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===============================
            BOTTOM POPULAR STYLES SECTION
        =============================== */}

        <div
          className="w-full px-6 py-4 flex flex-col items-start justify-between gap-4 transition-colors md:flex-row md:items-center lg:px-12"
          style={{
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <span className="niyabags-hero-text shrink-0 text-xs font-bold tracking-widest">
            POPULAR STYLES
          </span>

          {/* ================= MOBILE / TABLET ================= */}

          <div className="w-full overflow-hidden md:hidden">
            <div className="popular-styles-carousel flex w-max">
              <span className="flex items-center gap-2 whitespace-nowrap px-4 text-xs font-semibold tracking-wider">
                <span className="niyabags-hero-text text-[10px]">01</span>
                <span className="niyabags-hero-text">STRUCTURED TOTE</span>
              </span>

              <span className="flex items-center gap-2 whitespace-nowrap px-4 text-xs font-semibold tracking-wider">
                <span className="niyabags-hero-text text-[10px]">02</span>
                <span className="niyabags-hero-text">EVERYDAY CROSSBODY</span>
              </span>

              <span className="flex items-center gap-2 whitespace-nowrap px-4 text-xs font-semibold tracking-wider">
                <span className="niyabags-hero-text text-[10px]">03</span>
                <span className="niyabags-hero-text">SLOUCHY HOBO</span>
              </span>

              <span className="flex items-center gap-2 whitespace-nowrap px-4 text-xs font-semibold tracking-wider">
                <span className="niyabags-hero-text text-[10px]">04</span>
                <span className="niyabags-hero-text">STATEMENT CLUTCH</span>
              </span>
            </div>
          </div>

          {/* ================= DESKTOP ================= */}

          <div className="hidden w-full flex-wrap items-center gap-x-8 gap-y-2 text-xs font-semibold tracking-wider md:flex md:w-auto">
            <span className="flex items-center gap-2">
              <span className="niyabags-hero-text text-[10px]">01</span>
              <span className="niyabags-hero-text">STRUCTURED TOTE</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="niyabags-hero-text text-[10px]">02</span>
              <span className="niyabags-hero-text">EVERYDAY CROSSBODY</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="niyabags-hero-text text-[10px]">03</span>
              <span className="niyabags-hero-text">SLOUCHY HOBO</span>
            </span>

            <span className="flex items-center gap-2">
              <span className="niyabags-hero-text text-[10px]">04</span>
              <span className="niyabags-hero-text">STATEMENT CLUTCH</span>
            </span>
          </div>
        </div>
      </section>

      <PromoBanner page="home" position="after-hero" />
    </>
  );
}

export default HeroBanner;
