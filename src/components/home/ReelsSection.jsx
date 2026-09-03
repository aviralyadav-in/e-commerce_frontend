import { useEffect, useRef, useState } from "react";

import { getReels } from "../../api/homeApi";

function ReelsSection() {
  const [reels, setReels] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef([]);
  const modalVideoRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function loadReels() {
      try {
        const data = await getReels();

        if (mounted) {
          setReels(
            Array.isArray(data) ? data.filter((reel) => reel?.video) : [],
          );
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
  // VIDEO HOVER
  // ===============================

  const handleVideoMouseEnter = (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleVideoMouseLeave = (index) => {
    const video = videoRefs.current[index];

    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  // ===============================
  // OPEN REEL MODAL
  // ===============================

  const handleReelClick = (reel) => {
    setIsMuted(true);
    setSelectedReel(reel);
  };

  // ===============================
  // MODAL MUTE / UNMUTE
  // ===============================

  const handleMuteToggle = () => {
    if (!modalVideoRef.current) return;

    const nextMuted = !isMuted;

    modalVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      modalVideoRef.current.volume = 1;
      modalVideoRef.current.play().catch(() => {});
    }
  };

  // ===============================
  // HEADER COMPONENT
  // ===============================

  const SectionHeader = () => (
    <div className="mb-8 text-center sm:mb-10 md:mb-12 lg:mb-14">
      <p className="mb-2 text-[10px] font-semibold tracking-widest text-[var(--color-accent)] uppercase sm:mb-3 sm:text-xs">
        FOLLOW THE STORY
      </p>

      <h2 className="font-serif text-3xl leading-tight text-[var(--color-text-primary)] sm:text-4xl md:text-5xl">
        Niya Reels
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-xs text-[var(--color-text-muted)] sm:mt-3 sm:text-sm">
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

          <p className="animate-pulse py-12 text-center text-[10px] tracking-[0.15em] text-[var(--color-text-muted)] sm:text-xs">
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

          <p className="py-12 text-center text-xs text-[var(--color-text-muted)] sm:text-sm">
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
                onClick={() => handleReelClick(reel)}
                className="group relative aspect-[9/14] w-[calc((100vw-40px)/2)] shrink-0 overflow-hidden rounded-sm text-left sm:w-[220px] md:w-[260px] lg:w-[280px]"
              >
                {/* VIDEO */}

                <video
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={reel.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  draggable="false"
                  onMouseEnter={() => handleVideoMouseEnter(index)}
                  onMouseLeave={() => handleVideoMouseLeave(index)}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* DARK GRADIENT */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-dark-section)]/80 via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                {/* TITLE */}

                <span className="pointer-events-none absolute bottom-4 left-4 right-4 font-serif text-sm leading-tight text-white sm:text-base">
                  {reel.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-[9px] tracking-widest text-[var(--color-text-muted)] sm:mt-6 sm:text-[10px] md:hidden">
          SWIPE TO EXPLORE →
        </p>
      </div>

      {/* ===============================
          MODAL VIEWER
      =============================== */}

      {selectedReel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-dark-section)]/85 px-4 backdrop-blur-md sm:px-6"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative h-[80vh] w-full max-w-[380px] overflow-hidden rounded-md bg-black shadow-2xl sm:max-w-[400px]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL VIDEO */}

            <video
              ref={modalVideoRef}
              key={selectedReel.id}
              src={selectedReel.video}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              controls
              className="h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <button
              type="button"
              onClick={handleMuteToggle}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute bottom-4 right-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-sm text-white backdrop-blur-sm transition hover:bg-black/70 active:scale-95"
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setSelectedReel(null)}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-lg text-[var(--color-dark-section)] shadow-sm transition hover:bg-white active:scale-95 sm:text-xl"
              aria-label="Close preview"
            >
              ×
            </button>

            {/* TITLE */}

            <div className="pointer-events-none absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-6 sm:right-6">
              <p className="font-serif text-xl leading-tight text-white sm:text-2xl">
                {selectedReel.title}
              </p>

              <p className="mt-1.5 text-[9px] uppercase tracking-widest text-white/70 sm:text-[10px]">
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
            transform: translateX(calc(-50% - 0.75rem));
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
