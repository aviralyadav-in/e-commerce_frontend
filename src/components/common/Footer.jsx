import { useEffect, useState } from "react";
import { FiFacebook, FiInstagram, FiMail, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getFooter } from "../../api/api";

const iconMap = {
  Instagram: FiInstagram,
  Facebook: FiFacebook,
  YouTube: FiYoutube,
  Email: FiMail,
};

function Footer() {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    async function loadFooter() {
      try {
        const data = await getFooter();
        setFooter(data);
      } catch (error) {
        console.error("Failed to load footer:", error);
      }
    }

    loadFooter();
  }, []);

  if (!footer) return null;

  return (
    <footer className="bg-dark-section px-5 py-10 text-white md:px-8 md:py-12">
      <div className="mx-auto max-w-[1100px]">
        {/* MAIN */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-5">
          {/* BRAND */}
          <div className="col-span-2 lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold tracking-tight">{footer.brand.name}</h2>

            <p className="mt-3 max-w-[300px] text-xs leading-relaxed text-white/60">
              {footer.brand.description}
            </p>

            {/* SOCIAL */}
            <div className="mt-4 flex gap-2">
              {footer.socialLinks.map((social) => {
                const Icon = iconMap[social.platform];

                if (!Icon) return null;

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    aria-label={social.platform}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-accent-bright hover:text-accent-bright"
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* FOOTER SECTIONS */}
          {footer.sections.map((section, index) => (
            <div
              key={section.id}
              className={
                index === 1 ? "col-span-2 md:col-span-1 lg:col-span-1" : ""
              }
            >
              <h3 className="mb-3 text-[10px] font-semibold tracking-widest text-accent-bright">
                {section.title}
              </h3>

              <div className="flex flex-col gap-2.5 text-xs text-white/60">
                {section.links.map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SUPPORT */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-white/80">
                {footer.customerService.heading}
              </p>

              <p className="mt-1 text-xs text-white/50">
                {footer.customerService.description}
              </p>
            </div>

            <a
              href={`mailto:${footer.customerService.email}`}
              className="mt-2 flex items-center gap-2 text-xs text-white/70 transition hover:text-accent-bright sm:mt-0"
            >
              <FiMail size={13} />
              {footer.customerService.email}
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>

          <div className="flex gap-4">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
