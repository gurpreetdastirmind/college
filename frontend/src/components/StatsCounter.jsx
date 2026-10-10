import { useEffect, useRef, useState } from 'react';
import { FaUsers, FaGraduationCap, FaTrophy, FaBook } from 'react-icons/fa';

export default function StatsCounter() {
  const stats = [
    { icon: <FaUsers />, target: 50, suffix: '+', label: 'Expert Faculty' },
    { icon: <FaGraduationCap />, target: 15, suffix: '+', label: 'Courses Offered' },
    { icon: <FaTrophy />, target: 95, suffix: '%', label: 'Placement Rate' },
    { icon: <FaBook />, target: 10000, suffix: '+', label: 'Library Books' },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    stats.forEach((s, i) => {
      const step = s.target / 50;
      let value = 0;
      const timer = setInterval(() => {
        value += step;
        if (value >= s.target) {
          value = s.target;
          clearInterval(timer);
        }
        setCounts((prev) => {
          const next = [...prev];
          next[i] = Math.floor(value);
          return next;
        });
      }, 30);
    });
  }, [started]);

  return (
    <section ref={ref} className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="text-5xl text-primary mb-4 flex justify-center">
                {s.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {counts[i].toLocaleString()}
                {s.suffix}
              </h3>
              <p className="text-gray-600 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}