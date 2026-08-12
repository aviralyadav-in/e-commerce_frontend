import { Link } from "react-router-dom";
function BrandCraftsmanship() {
  return (
    <section
      id="craftsmanship"
      className="bg-[#f2eee5] px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="order-2 md:order-1">
          <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[#c39920]">
            OUR PROMISE
          </p>

          <h2 className="font-serif text-[40px] leading-[1.02] text-[#073b4c] md:text-[60px]">
            The Art of
            <br />
            Craftsmanship
          </h2>

          <div className="mt-7 space-y-4 text-[14px] leading-6 text-[#60777e]">
            <p>
              Every Niya bag begins as a sketch and ends in the hands of a
              master artisan.
            </p>

            <p>
              We believe luxury is not just about materials. It is about the
              human touch, patience, precision, and stories woven into every
              stitch.
            </p>
          </div>

          <div className="mt-8 grid max-w-[450px] grid-cols-3 gap-5 border-t border-[#d5cdbd] pt-6">
            <div>
              <strong className="font-serif text-2xl text-[#073b4c]">
                25+
              </strong>
              <p className="mt-1 text-[8px] text-[#73868c]">Pieces of craft</p>
            </div>

            <div>
              <strong className="font-serif text-2xl text-[#073b4c]">
                40+
              </strong>
              <p className="mt-1 text-[8px] text-[#73868c]">
                Handcrafted steps
              </p>
            </div>

            <div>
              <strong className="font-serif text-2xl text-[#073b4c]">
                100%
              </strong>
              <p className="mt-1 text-[8px] text-[#73868c]">
                Intentional design
              </p>
            </div>
          </div>

          <Link
            to="/craftsmanship"
            className="mt-8 inline-flex border-b border-[#c39920] pb-2 text-[11px] font-semibold text-[#073b4c]"
          >
            Discover Our Story →
          </Link>
        </div>

        <div className="order-1 overflow-hidden md:order-2">
          <img
            src="https://images.unsplash.com/photo-1612902456551-333ac5afa26e?auto=format&fit=crop&w=1400&q=85"
            alt="Niya craftsmanship"
            className="h-[430px] w-full object-cover md:h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}

export default BrandCraftsmanship;
