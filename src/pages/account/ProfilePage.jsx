import { FiHeart, FiShoppingBag, FiMapPin, FiArrowRight } from "react-icons/fi";

function ProfilePage() {
  const user = {
    name: "Your Name",
    phone: "+91 XXXXX XXXXX",
    email: "your@email.com",
  };

  return (
    <div className="min-h-screen bg-[#f8f9f8] px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-[1050px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[#c39920]">
            MY NIYA
          </p>
          <h1 className="font-serif text-[34px] font-medium text-[#073b4c] md:text-[40px]">
            My Profile
          </h1>
          <p className="mt-3 text-[12px] leading-6 text-[#6b7f85]">
            Manage your account and discover your Niya favourites.
          </p>
        </div>

        <section className="border border-[#e2e8e8] bg-white p-6 md:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-[#edf0f0] pb-5">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#c39920]">
                ACCOUNT DETAILS
              </p>
              <h2 className="mt-2 font-serif text-[23px] text-[#073b4c]">
                Personal Information
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[11px] text-[#385b66]">
                Full Name
              </label>
              <div className="flex h-12 items-center border border-[#dfe6e6] bg-[#fafbfb] px-4 text-[12px] text-[#073b4c]">
                {user.name}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] text-[#385b66]">
                Phone Number
              </label>
              <div className="flex h-12 items-center border border-[#dfe6e6] bg-[#fafbfb] px-4 text-[12px] text-[#073b4c]">
                {user.phone}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] text-[#385b66]">
                Email Address
              </label>
              <div className="flex h-12 items-center border border-[#dfe6e6] bg-[#fafbfb] px-4 text-[12px] text-[#073b4c]">
                {user.email}
              </div>
            </div>
          </div>

          <p className="mt-4 text-[10px] text-[#8a999d]">
            Your phone number cannot be changed from your profile.
          </p>
        </section>

        <section className="mt-6 border border-[#e2e8e8] bg-white p-6 md:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-[#edf0f0] pb-5">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.2em] text-[#c39920]">
                DELIVERY
              </p>
              <h2 className="mt-2 font-serif text-[23px] text-[#073b4c]">
                My Address
              </h2>
            </div>
          </div>

          <div className="flex min-h-[150px] flex-col items-center justify-center border border-dashed border-[#dfe6e6] bg-[#fafbfb] text-center">
            <FiMapPin size={20} className="mb-3 text-[#c39920]" />
            <p className="text-[12px] text-[#073b4c]">No address added yet</p>
            <p className="mt-1 text-[10px] text-[#8a999d]">
              Your saved delivery address will appear here.
            </p>
            <button className="mt-5 flex items-center gap-2 border-b border-[#c39920] pb-1 text-[10px] font-medium tracking-[0.08em] text-[#c39920]">
              ADD ADDRESS <FiArrowRight size={12} />
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <button className="group border border-[#e2e8e8] bg-white p-6 text-left transition hover:border-[#073b4c]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f7f5ec] text-[#c39920]">
                <FiHeart size={19} />
              </div>
              <FiArrowRight
                size={15}
                className="text-[#9aa7aa] transition group-hover:translate-x-1"
              />
            </div>

            <p className="mt-6 text-[9px] font-semibold tracking-[0.2em] text-[#c39920]">
              YOUR FAVOURITES
            </p>
            <h2 className="mt-2 font-serif text-[23px] text-[#073b4c]">
              Wishlist
            </h2>
            <p className="mt-2 text-[11px] leading-5 text-[#7b8b8f]">
              Save the handbags you love and keep them close.
            </p>
          </button>

          <button className="group border border-[#e2e8e8] bg-white p-6 text-left transition hover:border-[#073b4c]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f7f5ec] text-[#c39920]">
                <FiShoppingBag size={19} />
              </div>
              <FiArrowRight
                size={15}
                className="text-[#9aa7aa] transition group-hover:translate-x-1"
              />
            </div>

            <p className="mt-6 text-[9px] font-semibold tracking-[0.2em] text-[#c39920]">
              YOUR SHOPPING BAG
            </p>
            <h2 className="mt-2 font-serif text-[23px] text-[#073b4c]">
              My Cart
            </h2>
            <p className="mt-2 text-[11px] leading-5 text-[#7b8b8f]">
              View the pieces you have selected for your next purchase.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
