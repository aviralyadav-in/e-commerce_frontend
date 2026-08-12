import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiTwitter,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-[#073b4c] px-5 py-12 text-white md:px-10 md:py-14">
      <div className="mx-auto max-w-[1100px]">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h2 className="font-serif text-2xl">Niya Bags</h2>

            <p className="mt-4 max-w-[320px] text-[10px] leading-6 text-white/55">
              Modern luxury handbags thoughtfully designed and handcrafted
              for the woman who carries her own story.
            </p>

            <div className="mt-5 flex gap-3">
              {[FiInstagram, FiFacebook, FiTwitter, FiMail].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-[#d2a92e] hover:text-[#d2a92e]"
                  >
                    <Icon size={13} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-[9px] font-semibold tracking-[0.18em] text-[#d2a92e]">
              SHOP
            </h3>

            <div className="flex flex-col gap-3 text-[9px] text-white/60">
              <a href="#categories">All Bags</a>
              <a href="#categories">New Arrivals</a>
              <a href="#featured">Bestsellers</a>
              <a href="#categories">Women</a>
              <a href="#categories">Men</a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-5 text-[9px] font-semibold tracking-[0.18em] text-[#d2a92e]">
              ABOUT
            </h3>

            <div className="flex flex-col gap-3 text-[9px] text-white/60">
              <a href="#craftsmanship">Our Story</a>
              <a href="#craftsmanship">Craftsmanship</a>
              <a href="#featured">Journal</a>
              <a href="#reviews">Reviews</a>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-5 text-[9px] font-semibold tracking-[0.18em] text-[#d2a92e]">
              HELP
            </h3>

            <div className="flex flex-col gap-3 text-[9px] text-white/60">
              <a href="#">Contact Us</a>
              <a href="#">Shipping & Returns</a>
              <a href="#">Care Guide</a>
              <a href="#">FAQs</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[8px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Niya Bags. All rights reserved.</p>

          <div className="flex gap-5">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

