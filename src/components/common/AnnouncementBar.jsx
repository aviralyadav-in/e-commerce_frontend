import { useEffect, useState } from "react";
import { getAnnouncements } from "../../api/api";

function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements().then(setAnnouncements);
  }, []);

  return (
    <div className="h-7 overflow-hidden bg-[#073b4c] text-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-around gap-8 px-5 text-[9px] tracking-wide">
        {announcements.map((item) => (
          <span
            key={item.id}
            className="hidden items-center gap-2 whitespace-nowrap first:flex sm:flex"
          >
            <span className="text-[#d2a92e]">✦</span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementBar;