import { useEffect, useState } from "react";
import { getReels } from "../../api/homeApi";

function ReelsSection() {
  const [reels, setReels] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadReels() {
      try {
        const data = await getReels();

        if (mounted) {
          setReels(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load reels:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadReels();

    return () => {
      mounted = false;
    };
  }, []);

  // ===============================
  // HEADER COMPONENT (DRY Principle for consistency)
  // ===============================
  const SectionHeader = () => (
    <div className="mb-8 text-center sm:mb-10 md:mb-12 lg:mb-14">
      <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs font-semibold tracking-widest text-[var(--color-accent)] uppercase">
        FOLLOW THE STORY
      </p>

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-text-primary)]">
        Niya Reels
      </h2>

      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
        A closer look at the world of Niya.
      </p>
    </div>
  );

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <section className="bg-[var(--color-bg-primary)] px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader />
          <p className="py-12 text-center text-[10px] sm:text-xs tracking-[0.15em] text-[var(--color-text-muted)] animate-pulse">
            LOADING REELS...
          </p>
        </div>
      </section>
    );
  }

  // ===============================
  // EMPTY STATE
  // ===============================
  if (reels.length === 0) {
    return (
      <section className="bg-[var(--color-bg-primary)] px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeader />
          <p className="py-12 text-center text-xs sm:text-sm text-[var(--color-text-muted)]">
            No reels available at the moment.
          </p>
        </div>
      </section>
    );
  }

  const scrollingReels = [...reels, ...reels];

  return (
    <section className="overflow-hidden bg-[var(--color-bg-primary)] px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader />

        {/* CAROUSEL WRAPPER */}
        <div className="relative overflow-hidden">
          <div className="reels-marquee flex w-max gap-3 sm:gap-4 md:gap-5 hover:[animation-play-state:paused]">
            {scrollingReels.map((reel, index) => (
              <button
                key={`${reel.id}-${index}`}
                type="button"
                onClick={() => setSelectedReel(reel)}
                className="group relative aspect-[9/14] w-[calc((100vw-40px)/2)] sm:w-[220px] md:w-[260px] lg:w-[280px] shrink-0 overflow-hidden text-left rounded-sm"
              >
                <img
                  src={reel.image || reel.thumbnail}
                  alt={reel.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-section)]/80 via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                <span className="absolute left-1/2 top-1/2 grid h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-[10px] sm:text-xs text-[var(--color-dark-section)] shadow-md transition-transform group-hover:scale-110">
                  ▶
                </span>

                <span className="absolute bottom-4 left-4 right-4 font-serif text-sm sm:text-base text-white leading-tight">
                  {reel.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 sm:mt-6 text-center text-[9px] sm:text-[10px] tracking-widest text-[var(--color-text-muted)] md:hidden">
          SWIPE TO EXPLORE →
        </p>
      </div>

      {/* ===============================
          MODAL VIEWER
      =============================== */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-dark-section)]/85 px-4 sm:px-6 backdrop-blur-md"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative h-[80vh] w-full max-w-[380px] sm:max-w-[400px] overflow-hidden rounded-md bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedReel.image || selectedReel.thumbnail}
              alt={selectedReel.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <button
              type="button"
              onClick={() => setSelectedReel(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-lg sm:text-xl text-[var(--color-dark-section)] shadow-sm transition hover:bg-white active:scale-95 z-10"
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-6 sm:right-6">
              <p className="font-serif text-xl sm:text-2xl text-white leading-tight">
                {selectedReel.title}
              </p>

              <p className="mt-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70">
                Niya Bags
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===============================
          MARQUEE ANIMATION CSS
      =============================== */}
      <style>{`
        .reels-marquee {
          animation: niyaReelsScroll 35s linear infinite;
          will-change: transform;
        }

        @keyframes niyaReelsScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.75rem)); /* Adjust based on gap */
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reels-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default ReelsSection;