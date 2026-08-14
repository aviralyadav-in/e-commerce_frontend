import { FiHeart, FiShoppingBag, FiMapPin, FiArrowRight } from "react-icons/fi";

function ProfilePage() {
  const user = {
    name: "Your Name",
    phone: "+91 XXXXX XXXXX",
    email: "your@email.com",
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-5 py-14 text-[var(--color-text-primary)] md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-[1050px]">
        {/* PAGE HEADER */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
            MY NIYA
          </p>

          <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)] md:text-[40px]">
            My Profile
          </h1>

          <p className="mt-3 text-[12px] leading-6 text-[var(--color-text-secondary)]">
            Manage your account and discover your Niya favourites.
          </p>
        </div>

        {/* ACCOUNT DETAILS */}
        <section className="border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-[var(--color-border-soft)] pb-5">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.2em] text-[var(--color-accent)]">
                ACCOUNT DETAILS
              </p>

              <h2 className="mt-2 font-serif text-[23px] text-[var(--color-text-primary)]">
                Personal Information
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                Full Name
              </label>

              <div className="flex h-12 items-center border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)]">
                {user.name}
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                Phone Number
              </label>

              <div className="flex h-12 items-center border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)]">
                {user.phone}
              </div>
            </div>

            {/* EMAIL */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
                Email Address
              </label>

              <div className="flex h-12 items-center border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)]">
                {user.email}
              </div>
            </div>
          </div>

          <p className="mt-4 text-[10px] text-[var(--color-text-muted)]">
            Your phone number cannot be changed from your profile.
          </p>
        </section>

        {/* ADDRESS */}
        <section className="mt-6 border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-[var(--color-border-soft)] pb-5">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.2em] text-[var(--color-accent)]">
                DELIVERY
              </p>

              <h2 className="mt-2 font-serif text-[23px] text-[var(--color-text-primary)]">
                My Address
              </h2>
            </div>
          </div>

          <div className="flex min-h-[150px] flex-col items-center justify-center border border-dashed border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] text-center">
            <FiMapPin size={20} className="mb-3 text-[var(--color-accent)]" />

            <p className="text-[12px] text-[var(--color-text-primary)]">
              No address added yet
            </p>

            <p className="mt-1 text-[10px] text-[var(--color-text-muted)]">
              Your saved delivery address will appear here.
            </p>

            <button className="mt-5 flex items-center gap-2 border-b border-[var(--color-accent)] pb-1 text-[10px] font-medium tracking-[0.08em] text-[var(--color-accent)]">
              ADD ADDRESS
              <FiArrowRight size={12} />
            </button>
          </div>
        </section>

        {/* WISHLIST + CART */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* WISHLIST */}
          <button className="group border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 text-left transition hover:border-[var(--color-text-primary)]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <FiHeart size={19} />
              </div>

              <FiArrowRight
                size={15}
                className="text-[var(--color-text-muted)] transition group-hover:translate-x-1"
              />
            </div>

            <p className="mt-6 text-[9px] font-semibold tracking-[0.2em] text-[var(--color-accent)]">
              YOUR FAVOURITES
            </p>

            <h2 className="mt-2 font-serif text-[23px] text-[var(--color-text-primary)]">
              Wishlist
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-[var(--color-text-secondary)]">
              Save the handbags you love and keep them close.
            </p>
          </button>

          {/* CART */}
          <button className="group border border-[var(--color-border-soft)] bg-[var(--color-bg-secondary)] p-6 text-left transition hover:border-[var(--color-text-primary)]">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <FiShoppingBag size={19} />
              </div>

              <FiArrowRight
                size={15}
                className="text-[var(--color-text-muted)] transition group-hover:translate-x-1"
              />
            </div>

            <p className="mt-6 text-[9px] font-semibold tracking-[0.2em] text-[var(--color-accent)]">
              YOUR SHOPPING BAG
            </p>

            <h2 className="mt-2 font-serif text-[23px] text-[var(--color-text-primary)]">
              My Cart
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-[var(--color-text-secondary)]">
              View the pieces you have selected for your next purchase.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
