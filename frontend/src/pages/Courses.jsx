import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data.courses || data);
      } catch (err) {
        toast.error('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build streams list dynamically from fetched courses
  const streams = ['All', ...new Set(courses.map((c) => c.stream).filter(Boolean))];

  const filtered =
    filter === 'All' ? courses : courses.filter((c) => c.stream === filter);

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Our Courses</h1>
          <p className="text-gray-200">Choose from a wide range of programs</p>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {streams.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filter === s
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Loading / Empty / Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading courses...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No courses found</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}