function CraftsmanshipPage() {
  return (
    <main className="bg-[#faf9f5] text-[#073b4c]">
      {/* HERO */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[#c39920]">
              THE ART BEHIND NIYA
            </p>

            <h1 className="font-serif text-[42px] leading-[1.02] md:text-[64px]">
              Crafted by Hand.
              <br />
              Inspired by India.
            </h1>

            <p className="mt-6 max-w-[500px] text-[14px] leading-7 text-[#60777e]">
              India has always carried its stories through what its hands
              create. At Niya, we bring that spirit into contemporary
              handbags—where traditional craftsmanship meets a modern sense of
              luxury.
            </p>
          </div>

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1612902456551-333ac5afa26e?auto=format&fit=crop&w=1200&q=85"
              alt="Indian craftsmanship"
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-[#f2eee5] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden">
            <img
              src="https://images.openai.com/static-rsc-4/gDjhyfumuWn9zxuBT0BY_mpawKVBjPnX7Box2TUF1HEnlNLZHx_QXauYKcgb36QsmGbTkGpuesP3r1J2LTk3f2B5gDZhsTYfrA-hlDCNxCpWXGCFb2PQNrZbGWsZh9diKAXE3NJlhqB9ygm4wGALHNe0sf_FKEN9tDWxIixUo7SJ7dZtdxXoRR-W9AOMkPws?purpose=fullsize"
              alt="Traditional Indian artisan"
              className="h-[400px] w-full object-cover md:h-[500px]"
            />
          </div>

          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#c39920]">
              A CRAFTING TRADITION
            </p>

            <h2 className="font-serif text-[34px] leading-tight md:text-[48px]">
              A Heritage Made by Hand
            </h2>

            <div className="mt-6 space-y-4 text-[14px] leading-7 text-[#60777e]">
              <p>
                For centuries, Indian artisans have transformed simple materials
                into objects of beauty and purpose.
              </p>

              <p>
                From hand embroidery and intricate weaving to leatherwork and
                decorative detailing, craftsmanship has always been part of
                India's visual language.
              </p>

              <p>
                Niya draws from this heritage—not to recreate the past, but to
                carry its spirit forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT TECHNIQUES */}
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 max-w-[600px]">
            <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[#c39920]">
              THE DETAILS
            </p>

            <h2 className="font-serif text-[34px] leading-tight md:text-[48px]">
              Where Patience Becomes Craft
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="border-t border-[#d5cdbd] pt-5">
              <h3 className="font-serif text-2xl">Hand Stitching</h3>

              <p className="mt-3 text-[14px] leading-6 text-[#60777e]">
                Slow, deliberate and precise. Every stitch reflects the patience
                behind handmade work.
              </p>
            </article>

            <article className="border-t border-[#d5cdbd] pt-5">
              <h3 className="font-serif text-2xl">Weaving</h3>

              <p className="mt-3 text-[14px] leading-6 text-[#60777e]">
                Inspired by India's rich textile traditions, where threads
                become patterns, texture and character.
              </p>
            </article>

            <article className="border-t border-[#d5cdbd] pt-5">
              <h3 className="font-serif text-2xl">Hand Finishing</h3>

              <p className="mt-3 text-[11px] leading-6 text-[#60777e]">
                The final details are where a piece comes alive—carefully
                finished by hand rather than rushed.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-[#073b4c] px-5 py-16 text-white md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div>
            <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[#c39920]">
              OUR PHILOSOPHY
            </p>

            <h2 className="font-serif text-[36px] leading-tight md:text-[52px]">
              Made Slowly.
              <br />
              Made to Last.
            </h2>

            <p className="mt-6 max-w-[520px] text-[14px] leading-7 text-white/65">
              We believe a bag should feel personal. That is why we value the
              details that cannot be hurried—the texture of the material, the
              precision of a stitch and the quiet finishing touches that give
              every piece its character.
            </p>

            <p className="mt-4 text-[14px] leading-7 text-white/65">
              Luxury, to us, is not excess. It is intention.
            </p>
          </div>

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85"
              alt="Luxury handbag craftsmanship"
              className="h-[420px] w-full object-cover md:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* INDIA TO NIYA */}
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.25em] text-[#c39920]">
            OUR INSPIRATION
          </p>

          <h2 className="font-serif text-[36px] leading-tight md:text-[50px]">
            From Indian Heritage
            <br />
            to Modern Luxury
          </h2>

          <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-7 text-[#60777e]">
            Niya takes inspiration from India's many craft traditions while
            keeping the language distinctly contemporary.
          </p>

          <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-7 text-[#60777e]">
            The colours, textures, patience and artistry found across Indian
            craftsmanship influence the way we think about our bags.
          </p>

          <p className="mx-auto mt-4 max-w-[650px] text-[14px] leading-7 text-[#60777e]">
            The result is not a replica of tradition. It is our interpretation
            of it.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-t border-[#e1e7e6] bg-[#f2eee5] px-5 py-16 text-center md:px-10 md:py-20">
        <p className="mb-3 text-[9px] font-semibold tracking-[0.25em] text-[#c39920]">
          THE NIYA PROMISE
        </p>

        <h2 className="font-serif text-[36px] leading-tight md:text-[50px]">
          Every Bag Carries a Story.
        </h2>

        <p className="mx-auto mt-5 max-w-[550px] text-[14px] leading-7 text-[#60777e]">
          A story of skilled hands, thoughtful design and a heritage that
          continues to inspire.
        </p>

        <p className="mt-2 text-[14px] text-[#60777e]">
          Made for today. Rooted in where we come from.
        </p>
      </section>
    </main>
  );
}

export default CraftsmanshipPage;
