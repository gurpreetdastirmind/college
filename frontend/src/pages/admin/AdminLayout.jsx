import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaTachometerAlt, FaBook, FaBullhorn, FaUserGraduate,
  FaChalkboardTeacher, FaClipboardList, FaImages, FaSignOutAlt, FaHome,FaSlidersH,FaGraduationCap,FaUsers,FaFileAlt,
   FaRunning,
} from 'react-icons/fa';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menu = [
    { to: '/admin', label: 'Dashboard', icon: <FaTachometerAlt />, end: true },
    { to: '/admin/courses', label: 'Courses', icon: <FaBook /> },
    { to: '/admin/notifications', label: 'Notifications', icon: <FaBullhorn /> },
    { to: '/admin/admissions', label: 'Admissions', icon: <FaUserGraduate /> },
    { to: '/admin/faculty', label: 'Faculty', icon: <FaChalkboardTeacher /> },
    { to: '/admin/results', label: 'Results', icon: <FaClipboardList /> },
    { to: '/admin/gallery', label: 'Gallery', icon: <FaImages /> },
     { to: '/admin/hero-slides', label: 'Hero Slider', icon: <FaSlidersH /> },
     { to: '/admin/academics', label: 'Academics', icon: <FaGraduationCap /> }, 
     { to: '/admin/committee', label: 'Committee', icon: <FaUsers /> },
     { to: '/admin/prospectus', label: 'Prospectus', icon: <FaFileAlt /> },
     { to: '/admin/activities', label: 'Campus Life', icon: <FaRunning /> },

  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col">
        <div className="p-5 border-b border-blue-800">
          <h1 className="text-lg font-bold text-accent">Admin Panel</h1>
          <p className="text-xs text-gray-300 mt-1 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 py-4">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-800 text-accent border-l-4 border-accent'
                    : 'text-gray-200 hover:bg-blue-800'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-200 hover:bg-blue-800 rounded transition"
          >
            <FaHome /> View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm bg-red-600 hover:bg-red-700 rounded transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}