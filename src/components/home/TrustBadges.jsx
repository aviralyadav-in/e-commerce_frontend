import { FiBox, FiShield, FiRefreshCw, FiHelpCircle } from "react-icons/fi";

const benefits = [
  {
    icon: FiBox,
    title: "Free Shipping",
    text: "Orders over ₹10,000",
  },
  {
    icon: FiShield,
    title: "2-Year Warranty",
    text: "Crafted to last",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    text: "30-day returns",
  },
  {
    icon: FiHelpCircle,
    title: "Help Centre",
    text: "We're here to help",
  },
];

function TrustBadges() {
  return (
    <section className="w-full overflow-hidden border-y border-[var(--color-border)]">
      <div className="flex w-max animate-niya-marquee">
        {[...benefits, ...benefits].map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <div
              key={`${benefit.title}-${index}`}
              className="flex w-[190px] shrink-0 items-center gap-2 border-r border-[var(--color-border)] px-4 py-3 sm:w-[230px] sm:gap-3 sm:px-6"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)]/40 text-[var(--color-accent)]">
                <Icon size={13} strokeWidth={1.3} />
              </div>

              <div className="min-w-0">
                <h3 className="whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-primary)] sm:text-[9px]">
                  {benefit.title}
                </h3>

                <p className="mt-0.5 whitespace-nowrap text-[6.5px] text-[var(--color-text-muted)] sm:text-[8px]">
                  {benefit.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TrustBadges;
