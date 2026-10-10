import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserGraduate, FaBook, FaBullhorn, FaChalkboardTeacher,
  FaCheckCircle, FaClock, FaTimesCircle, FaChartLine,
} from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from 'recharts';
import toast from 'react-hot-toast';
import api from '../../services/api';

const STATUS_COLORS = {
  approved: '#10b981',   // green
  pending: '#f59e0b',    // amber
  rejected: '#ef4444',   // red
};

const PIE_COLORS = ['#1e3a8a', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    admissions: 0,
    courses: 0,
    notifications: 0,
    faculty: 0,
  });
  const [recent, setRecent] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [admRes, coursesRes, notifRes, facRes] = await Promise.all([
          api.get('/admissions'),
          api.get('/courses'),
          api.get('/notifications'),
          api.get('/faculty'),
        ]);

        const admissions = admRes.data.admissions || admRes.data || [];
        const courses = coursesRes.data.courses || coursesRes.data || [];
        const notifications = notifRes.data.notifications || notifRes.data || [];
        const faculty = facRes.data.faculty || facRes.data || [];

        setCounts({
          admissions: admissions.length,
          courses: courses.length,
          notifications: notifications.length,
          faculty: faculty.length,
        });

        // ---------- Status breakdown ----------
        const statusCounts = { pending: 0, approved: 0, rejected: 0 };
        admissions.forEach((a) => {
          const s = (a.status || 'pending').toLowerCase();
          if (statusCounts[s] !== undefined) statusCounts[s]++;
        });
        setStatusData([
          { name: 'Pending', value: statusCounts.pending, key: 'pending' },
          { name: 'Approved', value: statusCounts.approved, key: 'approved' },
          { name: 'Rejected', value: statusCounts.rejected, key: 'rejected' },
        ]);

        // ---------- Course breakdown (top 6) ----------
        const courseMap = {};
        admissions.forEach((a) => {
          const name =
            a.course?.name ||
            (a.course_id ? `Course #${a.course_id}` : 'Unknown');
          courseMap[name] = (courseMap[name] || 0) + 1;
        });
        const courseArr = Object.entries(courseMap)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6);
        setCourseData(courseArr);

        // ---------- 7-day trend ----------
        const days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          days.push({
            key,
            label: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
            count: 0,
          });
        }
        admissions.forEach((a) => {
          const created = a.createdAt || a.date;
          if (!created) return;
          const key = new Date(created).toISOString().slice(0, 10);
          const day = days.find((d) => d.key === key);
          if (day) day.count++;
        });
        setTrendData(days);

        // ---------- Recent 4 ----------
        const sortedAdmissions = [...admissions].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecent(sortedAdmissions.slice(0, 4));
      } catch (err) {
        toast.error('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      icon: <FaUserGraduate />,
      label: 'Total Admissions',
      value: counts.admissions,
      color: 'bg-blue-500',
      to: '/admin/admissions',
    },
    {
      icon: <FaBook />,
      label: 'Active Courses',
      value: counts.courses,
      color: 'bg-green-500',
      to: '/admin/courses',
    },
    {
      icon: <FaBullhorn />,
      label: 'Notifications',
      value: counts.notifications,
      color: 'bg-orange-500',
      to: '/admin/notifications',
    },
    {
      icon: <FaChalkboardTeacher />,
      label: 'Faculty Members',
      value: counts.faculty,
      color: 'bg-purple-500',
      to: '/admin/faculty',
    },
  ];

  // ---------- Analysis metrics ----------
  const totalAdm = counts.admissions || 1; // avoid /0
  const approved = statusData.find((s) => s.key === 'approved')?.value || 0;
  const pending = statusData.find((s) => s.key === 'pending')?.value || 0;
  const rejected = statusData.find((s) => s.key === 'rejected')?.value || 0;
  const approvalRate = ((approved / totalAdm) * 100).toFixed(1);
  const pendingRate = ((pending / totalAdm) * 100).toFixed(1);
  const rejectionRate = ((rejected / totalAdm) * 100).toFixed(1);

  // Weekly total
  const weeklyTotal = trendData.reduce((sum, d) => sum + d.count, 0);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  };

  const getCourseName = (admission) => {
    if (admission.course?.name) return admission.course.name;
    if (admission.course_id) return `Course #${admission.course_id}`;
    return '—';
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <Link
            key={i}
            to={s.to}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex items-center gap-4"
          >
            <div className={`${s.color} text-white p-4 rounded-lg text-2xl`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {loading ? '…' : s.value}
              </p>
              <p className="text-sm text-gray-600">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ==================== ANALYSIS CARDS ==================== */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
          <FaChartLine /> Admission Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <FaCheckCircle />
              <span className="text-sm font-semibold">Approval Rate</span>
            </div>
            <p className="text-3xl font-bold text-primary">{approvalRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {approved} of {counts.admissions} admissions approved
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-yellow-500">
            <div className="flex items-center gap-2 text-yellow-600 mb-2">
              <FaClock />
              <span className="text-sm font-semibold">Pending Rate</span>
            </div>
            <p className="text-3xl font-bold text-primary">{pendingRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {pending} applications awaiting review
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-red-500">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <FaTimesCircle />
              <span className="text-sm font-semibold">Rejection Rate</span>
            </div>
            <p className="text-3xl font-bold text-primary">{rejectionRate}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {rejected} of {counts.admissions} rejected
            </p>
          </div>
        </div>
      </div>

      {/* ==================== CHARTS ROW ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart — Status */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-primary mb-4">
            Admissions by Status
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusData.map((entry) => (
                  <Cell key={entry.key} fill={STATUS_COLORS[entry.key]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart — Courses */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-bold text-primary mb-4">
            Admissions by Course
          </h3>
          {courseData.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-16">
              No admission data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={courseData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {courseData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ==================== 7-DAY TREND ==================== */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-primary">
            Last 7 Days — Admission Trend
          </h3>
          <span className="text-sm text-gray-500">
            Total this week: <strong className="text-primary">{weeklyTotal}</strong>
          </span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1e3a8a"
              strokeWidth={3}
              dot={{ r: 5, fill: '#f59e0b' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ==================== RECENT ADMISSIONS ==================== */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">Recent Admissions</h2>
          <Link
            to="/admin/admissions"
            className="text-sm text-accent hover:underline"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No admissions yet.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={r.id || i} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">
                    {r.student_name || r.name || '—'}
                  </td>
                  <td className="p-4 text-gray-600">{getCourseName(r)}</td>
                  <td className="p-4 text-gray-600">
                    {formatDate(r.createdAt || r.date)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
                        r.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : r.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {r.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}