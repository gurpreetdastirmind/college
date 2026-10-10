import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaChevronDown,
} from 'react-icons/fa';
import logoImg from '../image/mtsm.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAcademicsOpen, setMobileAcademicsOpen] = useState(false);

  const aboutRef = useRef(null);
  const academicsRef = useRef(null);
  const closeTimer = useRef(null);
  const academicsTimer = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
      if (academicsRef.current && !academicsRef.current.contains(e.target)) {
        setAcademicsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const aboutLinks = [
    { to: '/about/principal-message', label: "Principal's Message" },
    { to: '/about/vision-mission', label: 'Vision & Mission' },
    { to: '/about/patrons', label: 'Our Patrons' },
    { to: '/about/code-of-conduct', label: 'Code of Conduct' },
    { to: '/about/distinctiveness', label: 'Institutional Distinctiveness' },
    { to: '/about/best-practices', label: 'Best Practices' },
    { to: '/about/contacts', label: 'Contacts' },
  ];

  // ============================================
  // ACADEMICS dropdown — with nested submenus
  // ============================================
  const academicsLinks = [
    { to: '/academics/programmes', label: 'Programmes Offered' },
    {
      label: 'Programme Outcomes',
      children: [
        { to: '/academics/outcomes/ba', label: 'B.A.' },
        { to: '/academics/outcomes/bcom', label: 'B.Com' },
        { to: '/academics/outcomes/bsc', label: 'B.Sc' },
        { to: '/academics/outcomes/ma', label: 'M.A.' },
        { to: '/academics/outcomes/mcom', label: 'M.Com' },
      ],
    },
    { to: '/faculty', label: 'Faculty' },
    { to: '/academics/calendar', label: 'Academic Calendar' },
    { to: '/academics/time-table', label: 'Time Table' },
    { to: '/academics/syllabus', label: 'Syllabus' },
    { to: '/academics/prospectus', label: 'Prospectus' },
    {
      label: 'Examination',
      children: [
        { to: '/academics/examination/datesheet', label: 'Date Sheet' },
        { to: '/academics/examination/schedule', label: 'Exam Schedule' },
        { to: '/academics/examination/guidelines', label: 'Guidelines' },
      ],
    },
    { href: 'https://results.puexam.in/', label: 'Results', external: true },
    { to: '/academics/e-content', label: 'e-Content' },
  ];

  // `dropdownOnly: true` = no route, just opens dropdown on hover/click
  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/about', label: 'About Us', dropdown: 'about', dropdownOnly: true },
    { to: '/academics', label: 'Academics', dropdown: 'academics', dropdownOnly: true },
    { to: '/courses', label: 'Courses' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/faculty', label: 'Faculty' },
    { to: '/facilities', label: 'Facilities' },
    { to: '/placements', label: 'Placements' },
    { to: '/contact', label: 'Contact' },
  ];

  const socials = [
    { href: 'https://www.facebook.com/MASTERTARASINGHCOLLEGEFORWOMEN/', icon: <FaFacebookF />, label: 'Facebook', color: 'hover:bg-blue-600' },
    { href: 'https://www.instagram.com/mastertarasinghmemorialcollege/', icon: <FaInstagram />, label: 'Instagram', color: 'hover:bg-pink-600' },
    { href: 'https://wa.me/919988233666', icon: <FaWhatsapp />, label: 'WhatsApp', color: 'hover:bg-green-600' },
  ];

  // Desktop dropdown handlers
  const handleAboutEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAboutOpen(true);
  };
  const handleAboutLeave = () => {
    closeTimer.current = setTimeout(() => setAboutOpen(false), 200);
  };

  const handleAcademicsEnter = () => {
    if (academicsTimer.current) clearTimeout(academicsTimer.current);
    setAcademicsOpen(true);
  };
  const handleAcademicsLeave = () => {
    academicsTimer.current = setTimeout(() => setAcademicsOpen(false), 200);
  };

  // Toggle handler used by the dropdown-only button (mobile)
  const toggleMobile = (which) => {
    if (which === 'about') setMobileAboutOpen(!mobileAboutOpen);
    if (which === 'academics') setMobileAcademicsOpen(!mobileAcademicsOpen);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-primary text-white text-xs sm:text-sm py-2">
        <div className="container-custom flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-4 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-2 flex-row-reverse">
              <FaPhone /> +91 99882 33666
            </span>
            <span className="flex items-center gap-2 flex-row-reverse">
              <FaEnvelope /> mtsmcldh@gmail.com
            </span>
          </div>
          <div className="flex gap-4 sm:gap-5">
            <Link to="/scholarships" className="hover:text-accent transition">Scholarships</Link>
            <Link to="/downloads" className="hover:text-accent transition">Downloads</Link>
            <Link to="/academics/prospectus" className="hover:text-accent transition">Prospectus</Link>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4 md:py-5 flex items-center gap-4 md:gap-6">
          <Link to="/" className="flex-shrink-0">
            <img
              src={logoImg}
              alt="Master Tara Singh Memorial College for Women"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
            />
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
              ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਮੈਮੋਰੀਅਲ ਕਾਲਜ (ਲੜਕੀਆਂ), ਲੁਧਿਆਣਾ
            </h1>
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-tight mt-0.5">
              Master Tara Singh Memorial College for Women, Ludhiana
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-1">
              Old Sabzi Mandi, Ludhiana, Punjab - 141008
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-2 items-center">
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center transition ${s.color} hover:text-white`}>
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-[10px] text-gray-500">Follow us</p>
          </div>
        </div>
      </div>

      {/* NAV MENU */}
      <nav className="bg-blue-100 shadow-md sticky top-0 z-50 border-b border-blue-200">
        <div className="container-custom flex justify-between items-center">
          <ul className="hidden lg:flex flex-wrap items-center">
            {links.map((link) => (
              <li
                key={link.to}
                className="relative"
                ref={
                  link.dropdown === 'about' ? aboutRef :
                    link.dropdown === 'academics' ? academicsRef : null
                }
                onMouseEnter={
                  link.dropdown === 'about' ? handleAboutEnter :
                    link.dropdown === 'academics' ? handleAcademicsEnter : undefined
                }
                onMouseLeave={
                  link.dropdown === 'about' ? handleAboutLeave :
                    link.dropdown === 'academics' ? handleAcademicsLeave : undefined
                }
              >
                {link.dropdown ? (
                  <>
                    {/* --- Dropdown trigger: button if dropdownOnly, NavLink otherwise --- */}
                    {link.dropdownOnly ? (
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-3 font-semibold text-sm xl:text-base transition border-b-4 text-gray-800 hover:text-primary border-transparent cursor-pointer"
                      >
                        {link.label}
                        <FaChevronDown
                          className={`text-xs transition-transform ${(link.dropdown === 'about' && aboutOpen) ||
                              (link.dropdown === 'academics' && academicsOpen)
                              ? 'rotate-180'
                              : ''
                            }`}
                        />
                      </button>
                    ) : (
                      <NavLink
                        to={link.to}
                        end={false}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-4 py-3 font-semibold text-sm xl:text-base transition border-b-4 ${isActive
                            ? 'text-green-700 border-green-600'
                            : 'text-gray-800 hover:text-primary border-transparent'
                          }`
                        }
                      >
                        {link.label}
                        <FaChevronDown
                          className={`text-xs transition-transform ${(link.dropdown === 'about' && aboutOpen) ||
                              (link.dropdown === 'academics' && academicsOpen)
                              ? 'rotate-180'
                              : ''
                            }`}
                        />
                      </NavLink>
                    )}

                    {/* ABOUT dropdown */}
                    {link.dropdown === 'about' && aboutOpen && (
                      <div
                        className="absolute left-0 top-full bg-white shadow-xl border border-gray-200 rounded-b-md min-w-[260px] py-2 z-50"
                        onMouseEnter={handleAboutEnter}
                        onMouseLeave={handleAboutLeave}
                      >
                        {aboutLinks.map((sub) => (
                          <NavLink key={sub.to} to={sub.to}
                            onClick={() => setAboutOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-sm transition ${isActive ? 'bg-blue-50 text-primary font-semibold'
                                : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                              }`}>
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}

                    {/* ACADEMICS dropdown */}
                    {link.dropdown === 'academics' && academicsOpen && (
                      <div
                        className="absolute left-0 top-full bg-white shadow-xl border border-gray-200 rounded-b-md min-w-[280px] py-2 z-50"
                        onMouseEnter={handleAcademicsEnter}
                        onMouseLeave={handleAcademicsLeave}
                      >
                        {academicsLinks.map((sub, i) =>
                          sub.children ? (
                            <div key={i} className="relative group/sub">
                              <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition">
                                {sub.label}
                                <FaChevronDown className="text-xs -rotate-90" />
                              </button>
                              <div className="absolute left-full top-0 bg-white shadow-xl border border-gray-200 rounded-md min-w-[220px] py-2 hidden group-hover/sub:block">
                                {sub.children.map((c) => (
                                  <NavLink key={c.to} to={c.to}
                                    onClick={() => setAcademicsOpen(false)}
                                    className={({ isActive }) =>
                                      `block px-4 py-2 text-sm transition ${isActive ? 'bg-blue-50 text-primary font-semibold'
                                        : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                                      }`}>
                                    {c.label}
                                  </NavLink>
                                ))}
                              </div>
                            </div>
                          ) : sub.external ? (
                            <a
                              key={sub.href}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setAcademicsOpen(false)}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"
                            >
                              {sub.label} ↗
                            </a>
                          ) : (
                            <NavLink key={sub.to} to={sub.to}
                              onClick={() => setAcademicsOpen(false)}
                              className={({ isActive }) =>
                                `block px-4 py-2.5 text-sm transition ${isActive ? 'bg-blue-50 text-primary font-semibold'
                                  : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
                                }`}>
                              {sub.label}
                            </NavLink>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink to={link.to} end={link.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-3 font-semibold text-sm xl:text-base transition border-b-4 ${isActive ? 'text-green-700 border-green-600'
                        : 'text-gray-800 hover:text-primary border-transparent'
                      }`}>
                    {link.icon && <span className="text-primary">{link.icon}</span>}
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)}
            className="lg:hidden text-2xl text-primary p-3 ml-auto"
            aria-label="Toggle menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile socials */}
          <div className="lg:hidden flex gap-1.5 mr-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center text-sm">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t">
            <ul className="container-custom py-4 flex flex-col gap-1">
              {links.map((link) =>
                link.dropdown ? (
                  <li key={link.to}>
                    <button
                      onClick={() => toggleMobile(link.dropdown)}
                      className="w-full flex items-center justify-between py-3 px-3 rounded font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <span>{link.label}</span>
                      <FaChevronDown className={`text-xs transition-transform ${(link.dropdown === 'about' && mobileAboutOpen) ||
                          (link.dropdown === 'academics' && mobileAcademicsOpen)
                          ? 'rotate-180' : ''
                        }`} />
                    </button>

                    {/* Mobile About submenu */}
                    {link.dropdown === 'about' && mobileAboutOpen && (
                      <ul className="pl-4 pb-2">
                        {aboutLinks.map((sub) => (
                          <li key={sub.to}>
                            <NavLink to={sub.to}
                              onClick={() => { setOpen(false); setMobileAboutOpen(false); }}
                              className={({ isActive }) =>
                                `block py-2.5 px-3 rounded text-sm transition ${isActive ? 'bg-blue-50 text-primary font-semibold'
                                  : 'text-gray-600 hover:bg-gray-50'
                                }`}>
                              {sub.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Mobile Academics submenu */}
                    {link.dropdown === 'academics' && mobileAcademicsOpen && (
                      <ul className="pl-4 pb-2">
                        {academicsLinks.map((sub, i) =>
                          sub.children ? (
                            <li key={i}>
                              <p className="py-2 px-3 text-xs uppercase text-gray-400">{sub.label}</p>
                              <ul className="pl-3">
                                {sub.children.map((c) => (
                                  <li key={c.to}>
                                    <NavLink to={c.to}
                                      onClick={() => { setOpen(false); setMobileAcademicsOpen(false); }}
                                      className={({ isActive }) =>
                                        `block py-2 px-3 rounded text-sm ${isActive ? 'bg-blue-50 text-primary font-semibold'
                                          : 'text-gray-600 hover:bg-gray-50'
                                        }`}>
                                      {c.label}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ) : sub.external ? (
                            <li key={sub.href}>
                              <a
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => { setOpen(false); setMobileAcademicsOpen(false); }}
                                className="block py-2.5 px-3 rounded text-sm text-gray-600 hover:bg-gray-50"
                              >
                                {sub.label} ↗
                              </a>
                            </li>
                          ) : (
                            <li key={sub.to}>
                              <NavLink to={sub.to}
                                onClick={() => { setOpen(false); setMobileAcademicsOpen(false); }}
                                className={({ isActive }) =>
                                  `block py-2.5 px-3 rounded text-sm ${isActive ? 'bg-blue-50 text-primary font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50'
                                  }`}>
                                {sub.label}
                              </NavLink>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={link.to}>
                    <NavLink to={link.to} end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-3 px-3 rounded font-medium transition ${isActive ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}>
                      {link.icon && <span className="text-primary">{link.icon}</span>}
                      {link.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}