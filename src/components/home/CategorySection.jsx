import { useState } from "react";

const categories = {
  women: [
    ["Totes", "14 styles", "1594223274512-ad4803739b7c"],
    ["Crossbody Bags", "9 styles", "1584917865442-de89df76afd3"],
    ["Shoulder Bags", "11 styles", "1591561954557-26941169b49e"],
    ["Clutches", "7 styles", "1566150905458-1bf1fc113f0d"],
    ["Mini Bags", "6 styles", "1553062407-98eeb64c6a62"],
    ["Backpacks", "5 styles", "1548036328-c9fa89d128fa"],
  ],
  men: [
    ["Briefcases", "8 styles", "1553062407-98eeb64c6a62"],
    ["Backpacks", "7 styles", "1548036328-c9fa89d128fa"],
    ["Crossbody Bags", "6 styles", "1584917865442-de89df76afd3"],
    ["Totes", "5 styles", "1594223274512-ad4803739b7c"],
    ["Travel Bags", "5 styles", "1590874103328-eac38a683ce7"],
    ["Mini Bags", "4 styles", "1566150905458-1bf1fc113f0d"],
  ],
};

function CategorySection() {
  const [gender, setGender] = useState("women");

  return (
    <section
      id="categories"
      className="bg-[var(--color-bg-primary)] px-5 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
              EXPLORE THE COLLECTION
            </p>

            <h2 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
              Shop by Category
            </h2>
          </div>

          <div className="flex w-fit items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
            <button
              type="button"
              onClick={() => setGender("women")}
              className={`rounded-full px-4 py-2 text-[9px] transition ${
                gender === "women"
                  ? "bg-[var(--color-dark-section)] text-white"
                  : "text-[var(--color-text-muted)]"
              }`}
            >
              Women
            </button>

            <button
              type="button"
              onClick={() => setGender("men")}
              className={`rounded-full px-4 py-2 text-[9px] transition ${
                gender === "men"
                  ? "bg-[var(--color-dark-section)] text-white"
                  : "text-[var(--color-text-muted)]"
              }`}
            >
              Men
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories[gender].map(([name, count, image]) => (
            <a
              href="#featured"
              key={name}
              className="group relative h-[220px] overflow-hidden rounded-xl"
            >
              <img
                src={`https://images.unsplash.com/photo-${image}?auto=format&fit=crop&w=700&q=85`}
                alt={name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b4c]/90 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-0 w-full text-center text-white">
                <h3 className="font-serif text-[16px]">{name}</h3>

                <p className="mt-1 text-[8px] text-white/75">{count}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
