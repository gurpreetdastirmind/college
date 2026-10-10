import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NoticeTicker from '../components/NoticeTicker';
import HeroSlider from '../components/HeroSlider';
import AffiliationBadges from '../components/AffiliationBadges';
import StatsCounter from '../components/StatsCounter';
import CourseCard from '../components/CourseCard';
import api from '../services/api';

import aboutimg from '../image/01.jpg'
import aboutimg1 from '../image/images.jpg'
import {
  FaGraduationCap, FaBook, FaFlask, FaLaptop, FaFutbol,
  FaBus, FaHome, FaUserTie, FaAward, FaBullhorn, FaCalendarAlt,
  FaQuoteLeft, FaArrowRight, FaUniversity,
} from 'react-icons/fa';

import tcsLogo from '../image/tcs.webp'
import infosysLogo from '../image/infosys.png'
import wiproLogo from '../image/wipro.jpg'
import principalImg from '../image/primsg.png';
import HCLImg from '../image/HCL.png'
import CapgeniLogo from '../image/capgeni.png'
import accentureLogo from '../image/accenture-Logo.png'

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    api.get('/courses').then(({ data }) => setCourses((data.courses || data).slice(0, 4))).catch(() => { });
    api.get('/notifications').then(({ data }) => setNotices((data.notifications || data).slice(0, 4))).catch(() => { });
    api.get('/gallery').then(({ data }) => setGallery((data.gallery || data).slice(0, 6))).catch(() => { });
  }, []);

  return (
    <div className="bg-gray-50">
      <NoticeTicker />
      <HeroSlider />

      <div className="bg-white">
        <AffiliationBadges />
      </div>

      {/* ================= WELCOME / ABOUT ================= */}
      <section className="py-20 bg-white">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent font-semibold uppercase tracking-wide text-sm">Welcome to MTSM College</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-5 leading-tight">
              Empowering Women Through Quality Education Since 1968
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Master Tara Singh Memorial College for Women, Ludhiana, is a premier institution
              affiliated to Panjab University, Chandigarh. For nearly five decades, we have been
              committed to academic excellence, holistic development, and empowering young women
              to become leaders in every field.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our campus offers state-of-the-art facilities, experienced faculty, and a vibrant
              learning environment that nurtures intellectual curiosity and social responsibility.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Read More About Us <FaArrowRight className="text-sm" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={aboutimg}
              alt="College Campus"
              className="rounded-xl shadow-lg h-64 w-full object-cover"
            />
            <img
              src={aboutimg1}
              alt="Students"
              className="rounded-xl shadow-lg h-64 w-full object-cover mt-8"
            />
          </div>
        </div>
      </section>

      {/* ================= PRINCIPAL'S MESSAGE ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-3">
            <div className="bg-primary p-10 text-white flex flex-col justify-center">
              <img
                src={principalImg}
                alt="Dr. Kirandeep Kaur - Principal"
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-accent shadow-lg"
              />
              <h3 className="text-xl font-bold text-center">Dr. Kirandeep Kaur</h3>
              <p className="text-accent text-center text-sm">Principal</p>
            </div>
            <div className="md:col-span-2 p-10">
              <FaQuoteLeft className="text-4xl text-accent mb-4" />
              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "At MTSM College, we believe that education is the most powerful tool for
                transforming lives. Our mission is to provide an environment where young women
                can discover their potential, develop critical thinking, and emerge as confident,
                compassionate leaders ready to serve society."
              </p>
              <Link to="/about/principal-message" className="text-primary font-semibold hover:text-accent inline-flex items-center gap-2">
                Read Full Message <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <StatsCounter />
      </div>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Us</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A legacy of excellence built on strong values, quality education, and modern infrastructure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaGraduationCap />, title: 'Expert Faculty', desc: 'Highly qualified and experienced teaching staff dedicated to student success.' },
              { icon: <FaBook />, title: 'Rich Curriculum', desc: 'Comprehensive UG, PG, and vocational programs aligned with industry needs.' },
              { icon: <FaFlask />, title: 'Modern Labs', desc: 'Well-equipped science, computer, and language labs for hands-on learning.' },
              { icon: <FaLaptop />, title: 'Smart Classrooms', desc: 'ICT-enabled classrooms with audio-visual aids for interactive learning.' },
              { icon: <FaUniversity />, title: 'Digital Library', desc: '10,000+ books, journals, and e-resources for academic enrichment.' },
              { icon: <FaFutbol />, title: 'Sports & Culture', desc: 'Excellent sports facilities and vibrant cultural activities year-round.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:border-accent transition-all">
                <div className="text-3xl text-accent mb-3">{item.icon}</div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FACILITIES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Campus Facilities</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaUniversity />, title: 'Library', color: 'from-blue-500 to-blue-700' },
              { icon: <FaLaptop />, title: 'Computer Lab', color: 'from-purple-500 to-purple-700' },
              { icon: <FaFlask />, title: 'Science Labs', color: 'from-green-500 to-green-700' },
              { icon: <FaFutbol />, title: 'Sports', color: 'from-orange-500 to-orange-700' },
              { icon: <FaBus />, title: 'Transport', color: 'from-yellow-500 to-yellow-700' },
              { icon: <FaHome />, title: 'Hostel', color: 'from-pink-500 to-pink-700' },
              { icon: <FaBullhorn />, title: 'Auditorium', color: 'from-red-500 to-red-700' },
              { icon: <FaAward />, title: 'Scholarships', color: 'from-teal-500 to-teal-700' },
            ].map((f, i) => (
              <div key={i} className={`bg-gradient-to-br ${f.color} text-white p-6 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer`}>
                <div className="text-4xl mb-3 flex justify-center">{f.icon}</div>
                <p className="font-semibold">{f.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/facilities" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition">
              Explore All Facilities →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED COURSES ================= */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Courses</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular programs designed for career success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition">
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= LATEST NEWS & NOTICES ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest News & Notices</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Notices list */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <FaBullhorn className="text-accent" /> Notices & Announcements
              </h3>
              <ul className="space-y-3">
                {(notices.length ? notices : [
                  { id: 1, title: 'Admissions Open for Session 2026-27', publish_date: '2026-10-05' },
                  { id: 2, title: 'National Seminar on Modern Pedagogy - 15 Oct', publish_date: '2026-10-01' },
                  { id: 3, title: 'Annual Sports Meet 2026 Registration Open', publish_date: '2026-09-28' },
                  { id: 4, title: 'Scholarship Applications Now Open', publish_date: '2026-09-25' },
                ]).map((n) => (
                  <li key={n.id} className="flex gap-3 border-b border-gray-100 pb-3 last:border-0">
                    <FaCalendarAlt className="text-accent mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {n.publish_date ? new Date(n.publish_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/news" className="inline-block mt-4 text-primary font-semibold text-sm hover:text-accent">
                View All Notices →
              </Link>
            </div>

            {/* Events */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-accent" /> Upcoming Events
              </h3>
              <ul className="space-y-4">
                {[
                  { date: '15', month: 'OCT', title: 'National Seminar on Modern Pedagogy', venue: 'Main Auditorium' },
                  { date: '22', month: 'OCT', title: 'Annual Sports Meet 2026', venue: 'College Ground' },
                  { date: '05', month: 'NOV', title: 'Inter-College Youth Festival', venue: 'Campus-wide' },
                  { date: '18', month: 'NOV', title: 'Annual Convocation 2026', venue: 'Convention Hall' },
                ].map((e, i) => (
                  <li key={i} className="flex gap-4 border-b border-gray-100 pb-3 last:border-0">
                    <div className="bg-primary text-white text-center rounded-lg w-14 h-14 flex-shrink-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold leading-none">{e.date}</span>
                      <span className="text-[10px] tracking-wider">{e.month}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{e.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">📍 {e.venue}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/news" className="inline-block mt-4 text-primary font-semibold text-sm hover:text-accent">
                View All Events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO GALLERY ================= */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Campus Life</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Glimpses of academic, cultural, and sports activities at our campus
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(gallery.length ? gallery : Array.from({ length: 6 }).map((_, i) => ({
              id: i,
              image_url: `https://images.unsplash.com/photo-${['1523050854058-8df90110c9f1', '1522202176988-66273c2fd55f', '1541339907198-e08756dedf3f',
                  '1517486808906-6ca8b3f04846', '1531482615713-2afd69097998', '1523580494863-6f3031224c94'][i]
                }?w=600`,
              title: 'Campus Life',
            }))).map((g) => (
              <div key={g.id} className="relative group overflow-hidden rounded-xl shadow-md aspect-video">
                <img
                  src={g.image_url}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <p className="text-white text-sm font-semibold">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

            {/* ================= PLACEMENTS / RECRUITERS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Recruiters</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top companies trust our graduates — 95% placement rate year after year
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {/* We changed this from a simple array of strings to an array of objects */}
            {[
              { name: 'TCS', logo: tcsLogo },
              { name: 'Infosys', logo: infosysLogo }, // Add logos for these later if you have them
              { name: 'Wipro', logo: wiproLogo },
              { name: 'HCL', logo: HCLImg },
              { name: 'Capgemini', logo: CapgeniLogo },
              { name: 'Accenture', logo: accentureLogo }
            ].map((c) => (
              <div key={c.name} className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition flex items-center justify-center h-24">
                {c.logo ? (
                  <img 
                    src={c.logo} 
                    alt={`${c.name} logo`} 
                    className="max-h-12 max-w-full object-contain"
                  />
                ) : (
                  <p className="font-bold text-primary">{c.name}</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/placements" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition">
              See Placement Records →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Students Say</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Simran Kaur', course: 'B.Com (2024)', msg: 'The faculty here is incredibly supportive. I gained confidence and skills that helped me land my dream job.' },
              { name: 'Harpreet Kaur', course: 'BCA (2023)', msg: 'The computer labs and hands-on projects gave me real-world experience. Truly a life-changing journey.' },
              { name: 'Amanpreet Kaur', course: 'M.A. English (2024)', msg: 'From seminars to cultural events, every day here shaped me into a better version of myself.' },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition">
                <FaQuoteLeft className="text-accent text-2xl mb-4" />
                <p className="text-gray-700 text-sm italic mb-4">{t.msg}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Quick Links</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { to: '/admissions', label: 'Admissions', icon: '📝' },
              { to: '/scholarships', label: 'Scholarships', icon: '🎓' },
              { to: '/disclosure', label: 'Disclosure', icon: '📋' },
              { to: '/downloads', label: 'Downloads', icon: '📥' },
            ].map((q, i) => (
              <Link
                key={i}
                to={q.to}
                className="bg-white hover:bg-primary group border-2 border-gray-100 hover:border-primary p-8 rounded-xl text-center transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="text-4xl mb-3">{q.icon}</div>
                <p className="font-semibold text-primary group-hover:text-white transition">
                  {q.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Applications for the 2026-27 academic session are now open. Join a legacy of excellence and shape your future with us.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/admissions/apply"
              className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              Apply Now <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}