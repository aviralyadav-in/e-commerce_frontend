import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/api";

function CategorySection() {
  const [gender, setGender] = useState("women");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }

    loadCategories();
  }, []);

  const filteredCategories = categories.filter(
    (category) => category.gender === gender,
  );

  const handleCategoryClick = (category) => {
    navigate(`/shop?gender=${category.gender}&subcategory=${category.filter}`);
  };

  return (
    <section
      id="categories"
      className="bg-bg-primary px-5 pt-6 pb-14 md:px-10 md:pt-8 md:pb-16"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[9px] font-semibold tracking-[0.22em] text-[var(--color-accent)]">
              EXPLORE THE COLLECTION
            </p>

            <h2 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
              Shop by Category
            </h2>
          </div>

          {/* GENDER TOGGLE */}
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

        {/* CATEGORY CAROUSEL / GRID */}
        <div
          className={`
   flex gap-4 overflow-x-auto px-[11vw] md:px-0 pb-10 pt-6
snap-x snap-mandatory
scrollbar-hide

    md:grid md:grid-cols-2 md:overflow-visible

    ${
      filteredCategories.length > 4
        ? "lg:flex lg:overflow-x-auto"
        : "lg:grid lg:grid-cols-4"
    }
  `}
        >
          {filteredCategories.map((category) => (
            <button
              type="button"
              onClick={() => handleCategoryClick(category)}
              key={`${category.gender}-${category.filter}`}
              className={`
                group relative shrink-0 overflow-hidden rounded-xl text-left
                transition-all duration-500 ease-out

                /* MOBILE — SQUARE */
                aspect-square w-[78vw] snap-center

                /* TABLET */
                md:w-auto md:aspect-auto md:h-[320px]

                /* DESKTOP */
                ${
                  filteredCategories.length > 4
                    ? "lg:min-w-[280px] lg:h-[360px]"
                    : "lg:w-auto lg:h-[360px]"
                }

                hover:z-10 hover:scale-[1.03]
              `}
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b4c]/90 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-0 w-full text-center text-white">
                <h3 className="font-serif text-[20px] capitalize">
                  {category.name}
                </h3>

                <p className="mt-1 text-[10px] text-white/75">
                  {category.count} Products
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
