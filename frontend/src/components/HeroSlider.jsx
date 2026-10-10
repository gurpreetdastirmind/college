import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaGraduationCap } from 'react-icons/fa';
import api from '../services/api';

// Fallback slides — shown while loading or if API returns nothing
const FALLBACK_SLIDES = [
  {
    title: 'Welcome to Punjab College',
    subtitle: 'Empowering Education in Punjab Since 1995',
    cta_label: 'Apply Online Now',
    cta_link: '/admissions/apply',
    cta2_label: 'Download Prospectus',
    cta2_link: '/downloads',
    image_url: null,
    bg: 'from-primary to-blue-800',
  },
  {
    title: 'Admissions Open 2026-27',
    subtitle: 'Choose from 15+ UG & PG Programs',
    cta_label: 'View Courses',
    cta_link: '/courses',
    cta2_label: 'Fee Structure',
    cta2_link: '/admissions',
    image_url: null,
    bg: 'from-blue-900 to-primary',
  },
  {
    title: 'NAAC Accredited Institution',
    subtitle: 'Quality Education • Expert Faculty • Modern Labs',
    cta_label: 'About Us',
    cta_link: '/about',
    cta2_label: 'Our Facilities',
    cta2_link: '/facilities',
    image_url: null,
    bg: 'from-indigo-900 to-blue-800',
  },
];

const FALLBACK_BGS = [
  'from-primary to-blue-800',
  'from-blue-900 to-primary',
  'from-indigo-900 to-blue-800',
];

export default function HeroSlider() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);

  // Fetch slides from backend
  useEffect(() => {
    api
      .get('/hero-slides')
      .then(({ data }) => {
        const list = data.slides || data;
        if (Array.isArray(list) && list.length > 0) {
          setSlides(
            list.map((s, i) => ({
              ...s,
              bg: FALLBACK_BGS[i % FALLBACK_BGS.length],
            }))
          );
          setCurrent(0);
        }
      })
      .catch(() => {
        // Silent — keep fallback
      });
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  const bgImage = resolveImage(slide.image_url);

  return (
    <section className={`relative bg-gradient-to-r ${slide.bg} text-white overflow-hidden`}>
      {/* Background image overlay (if set) */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      <div className="relative container-custom py-24 grid md:grid-cols-2 gap-12 items-center min-h-[520px]">
        {/* Left content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-lg md:text-xl text-gray-100 max-w-xl drop-shadow">
              {slide.subtitle}
            </p>
          )}
          <div className="flex gap-4 flex-wrap pt-2">
            {slide.cta_label && slide.cta_link && (
              <Link
                to={slide.cta_link}
                className="bg-accent hover:bg-accent-dark text-white px-7 py-3.5 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                {slide.cta_label}
              </Link>
            )}
            {slide.cta2_label && slide.cta2_link && (
              <Link
                to={slide.cta2_link}
                className="bg-white text-primary hover:bg-gray-100 px-7 py-3.5 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
              >
                {slide.cta2_label}
              </Link>
            )}
          </div>
        </div>

        {/* Right visual (hidden if a custom image is used) */}
        {!bgImage && (
          <div className="hidden md:flex justify-center items-center">
            <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-float">
              <FaGraduationCap className="text-9xl text-accent" />
            </div>
          </div>
        )}
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition backdrop-blur-sm"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition backdrop-blur-sm"
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === current ? 'bg-accent w-10' : 'bg-white/50 w-3 hover:bg-white/80'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}