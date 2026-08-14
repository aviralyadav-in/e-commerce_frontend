import { useEffect, useState } from "react";
import { getReels } from "../../api/api";

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

  if (loading) {
    return (
      <section className="bg-[var(--color-bg-primary)] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 text-center md:mb-9">
            <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
              FOLLOW THE STORY
            </p>

            <h2 className="font-serif text-[34px] leading-tight text-[var(--color-text-primary)] md:text-[40px]">
              Niya Reels
            </h2>

            <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">
              A closer look at the world of Niya.
            </p>
          </div>

          <p className="py-10 text-center text-[10px] tracking-[0.12em] text-[var(--color-text-muted)]">
            LOADING REELS...
          </p>
        </div>
      </section>
    );
  }

  if (reels.length === 0) {
    return (
      <section className="bg-[var(--color-bg-primary)] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-7 text-center md:mb-9">
            <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
              FOLLOW THE STORY
            </p>

            <h2 className="font-serif text-[34px] leading-tight text-[var(--color-text-primary)] md:text-[40px]">
              Niya Reels
            </h2>

            <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">
              A closer look at the world of Niya.
            </p>
          </div>

          <p className="py-10 text-center text-[10px] text-[var(--color-text-muted)]">
            No reels available.
          </p>
        </div>
      </section>
    );
  }

  /*
    Duplicate the reels so the animation can loop seamlessly.
    The second set follows immediately after the first set.
  */
  const scrollingReels = [...reels, ...reels];

  return (
    <section className="overflow-hidden bg-[var(--color-bg-primary)] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-7 text-center md:mb-9">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
            FOLLOW THE STORY
          </p>

          <h2 className="font-serif text-[34px] leading-tight text-[var(--color-text-primary)] md:text-[40px]">
            Niya Reels
          </h2>

          <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">
            A closer look at the world of Niya.
          </p>
        </div>

        {/* AUTO-SCROLL REELS */}
        <div className="relative overflow-hidden">
          <div className="reels-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
            {scrollingReels.map((reel, index) => (
              <button
                key={`${reel.id}-${index}`}
                type="button"
                onClick={() => setSelectedReel(reel)}
                className="group relative aspect-[9/14] w-[calc((100vw-37px)/2)] shrink-0 overflow-hidden text-left sm:w-[220px] md:w-[250px] lg:w-[280px]"
              >
                <img
                  src={reel.image || reel.thumbnail}
                  alt={reel.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#073b4c]/75 via-transparent to-transparent" />

                <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[11px] text-[#073b4c] shadow-sm">
                  ▶
                </span>

                <span className="absolute bottom-4 left-4 right-4 font-serif text-[14px] text-white">
                  {reel.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-center text-[8px] tracking-[0.15em] text-[var(--color-text-muted)] md:hidden">
          SWIPE TO EXPLORE →
        </p>
      </div>

      {/* MODAL */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#021f29]/80 px-5 backdrop-blur-sm"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative h-[78vh] w-full max-w-[390px] overflow-hidden bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedReel.image || selectedReel.thumbnail}
              alt={selectedReel.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <button
              type="button"
              onClick={() => setSelectedReel(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-sm text-[#073b4c]"
              aria-label="Close preview"
            >
              ×
            </button>

            <div className="absolute bottom-6 left-5 right-5">
              <p className="font-serif text-xl text-white">
                {selectedReel.title}
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/60">
                Niya Bags
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MARQUEE ANIMATION */}
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
            transform: translateX(calc(-50% - 6px));
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
