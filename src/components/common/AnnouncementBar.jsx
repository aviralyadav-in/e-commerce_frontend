import { useEffect, useState } from "react";
import { getAnnouncements } from "../../api/homeApi";

function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadAnnouncements() {
      try {
        const data = await getAnnouncements();

        if (mounted) {
          setAnnouncements(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load announcements:", error);
      }
    }

    loadAnnouncements();

    return () => {
      mounted = false;
    };
  }, []);

  if (!announcements.length) {
    return null;
  }

  return (
    <div className="h-7 overflow-hidden bg-dark-section text-white">
      {/* Mobile / Tablet */}
      <div className="announcement-mobile h-full overflow-hidden sm:hidden">
        <div className="announcement-carousel h-full">
          {announcements.map((item) => (
            <span
              key={item.id}
              className="announcement-slide flex h-full items-center justify-center gap-2 whitespace-nowrap px-5 text-[10px] font-medium tracking-wider"
            >
              <span className="text-accent-bright">✦</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden h-full max-w-[1440px] items-center justify-around gap-8 px-5 text-[10px] font-medium tracking-wider sm:flex">
        {announcements.map((item) => (
          <span
            key={item.id}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-accent-bright">✦</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;
