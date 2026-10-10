import { FaBullhorn } from 'react-icons/fa';

export default function NoticeTicker() {
  const notices = [
    { text: 'Admissions Open for Session 2026-27', link: '/admissions' },
    { text: 'Semester Exam Date Sheet Released', link: '/examinations' },
    { text: 'Post-Matric Scholarship Deadline Extended to 30 Oct', link: '/scholarships' },
    { text: 'National Seminar on Modern Pedagogy - 15 Oct', link: '/news' },
    { text: 'Annual Sports Meet 2026 Registration Open', link: '/campus-life' },
  ];

  return (
    <div className="bg-accent text-white py-2 overflow-hidden relative">
      <div className="container-custom flex items-center gap-3">
        {/* Latest Badge */}
        <span className="bg-red-600 px-3 py-1 rounded text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap z-10 shadow-md">
          <FaBullhorn className="animate-pulse" />
          <span className="hidden sm:inline">Latest Updates</span>
          <span className="sm:hidden">Latest</span>
        </span>

        {/* Scrolling Ticker */}
        <div className="overflow-hidden flex-1 relative">
          <div className="animate-marquee whitespace-nowrap">
            {notices.map((n, i) => (
              <span key={i} className="mx-6 text-sm font-medium inline-flex items-center gap-2">
                <span className="text-yellow-200">★</span>
                <a href={n.link} className="hover:underline hover:text-yellow-100 transition">
                  {n.text}
                </a>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {notices.map((n, i) => (
              <span key={`dup-${i}`} className="mx-6 text-sm font-medium inline-flex items-center gap-2">
                <span className="text-yellow-200">★</span>
                <a href={n.link} className="hover:underline hover:text-yellow-100 transition">
                  {n.text}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Inline keyframes (in case index.css not loaded yet) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}