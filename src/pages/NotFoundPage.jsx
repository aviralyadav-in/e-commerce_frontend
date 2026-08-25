import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome, FiShoppingBag } from "react-icons/fi";
import { getNotFoundBags } from "../api/notFoundApi";

const bagAnimations = [
  "bag-fly-one",
  "bag-fly-two",
  "bag-fly-three",
  "bag-fly-four",
  "bag-fly-five",
  "bag-fly-six",
  "bag-fly-seven",
  "bag-fly-eight",
];

const bagPositions = [
  "left-[-30px] top-[8%] sm:left-[4%] sm:top-[14%]",
  "right-[-30px] top-[10%] sm:right-[4%] sm:top-[16%]",
  "left-[-25px] top-[42%] sm:left-[5%]",
  "right-[-25px] top-[44%] sm:right-[5%]",
  "left-[5%] bottom-[6%] sm:left-[14%]",
  "right-[5%] bottom-[5%] sm:right-[14%]",
  "left-[20%] top-[4%] hidden sm:block",
  "right-[20%] bottom-[4%] hidden sm:block",
];

function NotFoundPage() {
  const [bags, setBags] = useState([]);

  useEffect(() => {
    async function loadBags() {
      try {
        const data = await getNotFoundBags();
        setBags([...data, ...data]);
      } catch (error) {
        console.error("Failed to load 404 bags:", error);
      }
    }

    loadBags();
  }, []);

  return (
    <>
      <style>{`
        @keyframes bag-fly-one {
          0% {
            transform: translate(-80px, 60px) rotate(-8deg) scale(.75);
            opacity: 0;
          }

          18% {
            opacity: 1;
          }

          50% {
            transform: translate(110px, -70px) rotate(8deg) scale(1);
          }

          78% {
            transform: translate(220px, 50px) rotate(-5deg) scale(.95);
          }

          100% {
            transform: translate(360px, -60px) rotate(7deg) scale(.7);
            opacity: 0;
          }
        }

        @keyframes bag-fly-two {
          0% {
            transform: translate(80px, -50px) rotate(7deg) scale(.75);
            opacity: 0;
          }

          18% {
            opacity: 1;
          }

          50% {
            transform: translate(-120px, 70px) rotate(-8deg) scale(1);
          }

          78% {
            transform: translate(-230px, -40px) rotate(5deg) scale(.95);
          }

          100% {
            transform: translate(-370px, 70px) rotate(-7deg) scale(.7);
            opacity: 0;
          }
        }

        @keyframes bag-fly-three {
          0% {
            transform: translate(-40px, 50px) rotate(-5deg) scale(.7);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translate(100px, -80px) rotate(7deg) scale(1);
          }

          80% {
            transform: translate(230px, 20px) rotate(-4deg) scale(.9);
          }

          100% {
            transform: translate(350px, -80px) rotate(6deg) scale(.65);
            opacity: 0;
          }
        }

        @keyframes bag-fly-four {
          0% {
            transform: translate(40px, 40px) rotate(6deg) scale(.7);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translate(-110px, -70px) rotate(-7deg) scale(1);
          }

          80% {
            transform: translate(-230px, 30px) rotate(4deg) scale(.9);
          }

          100% {
            transform: translate(-360px, -70px) rotate(-6deg) scale(.65);
            opacity: 0;
          }
        }

        @keyframes bag-fly-five {
          0% {
            transform: translate(0, 40px) rotate(5deg) scale(.7);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translate(90px, -100px) rotate(-6deg) scale(1);
          }

          80% {
            transform: translate(-40px, -170px) rotate(4deg) scale(.9);
          }

          100% {
            transform: translate(150px, -280px) rotate(-5deg) scale(.65);
            opacity: 0;
          }
        }

        @keyframes bag-fly-six {
          0% {
            transform: translate(0, -40px) rotate(-5deg) scale(.7);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translate(-100px, 90px) rotate(6deg) scale(1);
          }

          80% {
            transform: translate(50px, 170px) rotate(-4deg) scale(.9);
          }

          100% {
            transform: translate(-160px, 280px) rotate(5deg) scale(.65);
            opacity: 0;
          }
        }

        @keyframes bag-fly-seven {
          0% {
            transform: translate(0, 0) rotate(-4deg) scale(.7);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translate(70px, 100px) rotate(6deg) scale(1);
          }

          80% {
            transform: translate(-80px, 180px) rotate(-5deg) scale(.9);
          }

          100% {
            transform: translate(120px, 280px) rotate(4deg) scale(.65);
            opacity: 0;
          }
        }

        @keyframes bag-fly-eight {
          0% {
            transform: translate(0, 0) rotate(5deg) scale(.7);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translate(-80px, -100px) rotate(-6deg) scale(1);
          }

          80% {
            transform: translate(70px, -180px) rotate(4deg) scale(.9);
          }

          100% {
            transform: translate(-130px, -280px) rotate(-5deg) scale(.65);
            opacity: 0;
          }
        }

        @keyframes not-found-reveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bag-fly-one {
          animation: bag-fly-one 6s ease-in-out infinite;
        }

        .bag-fly-two {
          animation: bag-fly-two 6.5s ease-in-out infinite 1s;
        }

        .bag-fly-three {
          animation: bag-fly-three 6.2s ease-in-out infinite 1.8s;
        }

        .bag-fly-four {
          animation: bag-fly-four 6.8s ease-in-out infinite 2.4s;
        }

        .bag-fly-five {
          animation: bag-fly-five 5.8s ease-in-out infinite 1.2s;
        }

        .bag-fly-six {
          animation: bag-fly-six 6.4s ease-in-out infinite 2s;
        }

        .bag-fly-seven {
          animation: bag-fly-seven 6.1s ease-in-out infinite .7s;
        }

        .bag-fly-eight {
          animation: bag-fly-eight 6.7s ease-in-out infinite 2.8s;
        }

        .not-found-reveal {
          animation: not-found-reveal 800ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .bag-fly-one,
          .bag-fly-two,
          .bag-fly-three,
          .bag-fly-four,
          .bag-fly-five,
          .bag-fly-six,
          .bag-fly-seven,
          .bag-fly-eight,
          .not-found-reveal {
            animation: none;
          }
        }
      `}</style>

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-bg-primary)] px-6 text-[var(--color-text-primary)]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl" />

        {bags.map((bag, index) => (
          <div
            key={`${bag.id}-${index}`}
            className={`pointer-events-none absolute z-10 ${
              bagPositions[index % bagPositions.length]
            }`}
          >
            <img
              src={bag.image}
              alt=""
              aria-hidden="true"
              className={`${bagAnimations[index % bagAnimations.length]} h-28 w-24 rounded-md object-cover shadow-xl sm:h-40 sm:w-32 lg:h-48 lg:w-40`}
            />
          </div>
        ))}

        <section className="not-found-reveal relative z-30 w-full max-w-xl text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-accent)]">
              <FiShoppingBag size={16} strokeWidth={1.4} />
            </div>
          </div>

          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Niya Bags
          </p>

          <h1 className="mt-5 font-serif text-[clamp(7rem,20vw,12rem)] leading-[0.75] tracking-[-0.07em]">
            404
          </h1>

          <div className="mx-auto mt-8 h-px w-12 bg-[var(--color-accent)]" />

          <h2 className="mt-7 font-serif text-2xl sm:text-3xl">
            Oops... this bag got away.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[var(--color-text-secondary)]">
            Looks like the page you're looking for slipped out of our hands.
            Don't worry — your next favourite bag is still here.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span className="h-px w-8 bg-[var(--color-border)]" />
            Lost in the collection
            <span className="h-px w-8 bg-[var(--color-border)]" />
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 bg-[var(--color-accent)] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-bg-primary)] transition-all duration-300 hover:bg-[var(--color-accent-bright)]"
            >
              <FiHome size={14} />
              Take Me Home
            </Link>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 border border-[var(--color-border)] px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-primary)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <FiArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Go Back
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default NotFoundPage;
