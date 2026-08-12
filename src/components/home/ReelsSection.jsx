import { useState } from "react";

const reels = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    title: "Everyday elegance",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=700&q=85",
    title: "Style it your way",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    title: "Behind the craft",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
    title: "The Niya edit",
  },
];

function ReelsSection() {
  const [selectedReel, setSelectedReel] = useState(null);

  return (
    <section className="bg-[#faf9f5] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-7 text-center md:mb-9">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[#c39920]">
            FOLLOW THE STORY
          </p>

          <h2 className="font-serif text-[34px] leading-tight text-[#073b4c] md:text-[40px]">
            Niya Reels
          </h2>

          <p className="mt-2 text-[10px] text-[#73868c]">
            A closer look at the world of Niya.
          </p>
        </div>

        {/* Horizontal swipe container */}
        <div
          className="
            flex
            snap-x
            snap-mandatory
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-none
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {reels.map((reel) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => setSelectedReel(reel)}
              className="
                group
                relative
                aspect-[9/14]
                w-[calc((100vw-37px)/2)]
                shrink-0
                snap-start
                overflow-hidden
                text-left
                sm:w-[220px]
                md:w-[250px]
                lg:w-[280px]
              "
            >
              <img
                src={reel.image}
                alt={reel.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#073b4c]/75 via-transparent to-transparent" />

              {/* Play button */}
              <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[11px] text-[#073b4c] shadow-sm">
                ▶
              </span>

              {/* Reel title */}
              <span className="absolute bottom-4 left-4 right-4 font-serif text-[14px] text-white">
                {reel.title}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p className="mt-3 text-center text-[8px] tracking-[0.15em] text-[#9a9d9c] md:hidden">
          SWIPE TO EXPLORE →
        </p>
      </div>

      {/* Preview Modal */}
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
              src={selectedReel.image}
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
    </section>
  );
}

export default ReelsSection;