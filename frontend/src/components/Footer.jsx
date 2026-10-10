import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logoImg from '../image/mtsm.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            {/* Logo + College Name */}
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="Master Tara Singh Memorial College Logo"
                className="h-14 w-14 object-contain bg-white rounded-full p-1"
              />
              <h3 className="text-base font-bold text-accent leading-tight">
                Master Tara Singh<br />Memorial College for Women
              </h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-5">
              Affiliated to Panjab University, Chandigarh. Committed to quality
              education and holistic development of students in Punjab.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/MASTERTARASINGHCOLLEGEFORWOMEN/" className="hover:text-accent transition"><FaFacebook /></a>
              <a href="https://www.instagram.com/mastertarasinghmemorialcollege/" className="hover:text-accent transition"><FaInstagram /></a>
              <a href="#" className="hover:text-accent transition"><FaYoutube /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/admissions" className="hover:text-accent transition">Admissions</Link></li>
              <li><Link to="/courses" className="hover:text-accent transition">Courses</Link></li>
              <li><Link to="/disclosure" className="hover:text-accent transition">Mandatory Disclosure</Link></li>
              <li><Link to="/downloads" className="hover:text-accent transition">Downloads</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Punjab Portals */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Punjab Portals</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="https://admission.punjab.gov.in" target="_blank" rel="noreferrer" className="hover:text-accent transition">
                  Punjab Admission Portal
                </a>
              </li>
              <li>
                <a href="https://scholarships.punjab.gov.in" target="_blank" rel="noreferrer" className="hover:text-accent transition">
                  Dr. Ambedkar Scholarship
                </a>
              </li>
              <li>
                <a href="https://gndu.ac.in" target="_blank" rel="noreferrer" className="hover:text-accent transition">
                  GNDU Exams
                </a>
              </li>
              <li>
                <a href="https://puchd.ac.in" target="_blank" rel="noreferrer" className="hover:text-accent transition">
                  Panjab University, Chandigarh
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-accent flex-shrink-0" />
                <span>Old Sabzi Mandi, Ludhiana, Punjab - 141008</span>
              </li>
              <li className="flex gap-3">
                <FaPhone className="mt-1 text-accent flex-shrink-0" />
                <span>+91 99882-33666</span>
              </li>
              <li className="flex gap-3">
                <FaEnvelope className="mt-1 text-accent flex-shrink-0" />
                <span>mtsmcldh@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-800 py-6">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-3">
          {/* Copyright + Astirmind Credit */}
          <p className="text-center md:text-left">
            © 2026 Master Tara Singh Memorial College. All rights reserved.
            <span className="mx-2 hidden md:inline">|</span>
            <br className="md:hidden" />
            Designed &amp; Developed by{' '}
            <a
              href="https://astirmind.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-white font-semibold underline underline-offset-2 transition"
            >
              Astirmind Software Solutions
            </a>
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition">Terms</Link>
            <Link to="/sitemap" className="hover:text-accent transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}