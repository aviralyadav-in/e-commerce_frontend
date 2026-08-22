import { useEffect, useState } from "react";
import { getAnnouncements } from "../../api/api";

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
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-around gap-8 px-5 text-[10px] font-medium tracking-wider">
        {announcements.map((item) => (
          <span
            key={item.id}
            className="hidden items-center gap-2 whitespace-nowrap first:flex sm:flex"
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
