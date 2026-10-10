import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then(({ data }) => setCourse(data.course || data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container-custom py-20 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Course not found</h1>
        <Link to="/courses" className="text-accent hover:underline">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  const facilities = [
    'ICT Classroom',
    'Language Lab',
    'Library Access',
    'Teaching Practice School',
    'Psychology Lab',
  ];

  const displayFees =
    typeof course.fees === 'string' && course.fees.includes('₹')
      ? course.fees
      : `₹${course.fees}`;

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom">
          <p className="text-accent mb-2">{course.stream}</p>
          <h1 className="text-4xl font-bold">{course.name}</h1>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description ||
                `The ${course.name} program prepares students for a successful career with strong theoretical foundations and practical experience.`}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-3">Syllabus Downloads</h2>
            <div className="space-y-2">
              {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100 rounded transition"
                >
                  <FaFilePdf className="text-red-600" />
                  <span className="font-medium">Download {s} Syllabus PDF</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-3">Facilities</h2>
            <div className="grid grid-cols-2 gap-3">
              {facilities.map((f) => (
                <div key={f} className="flex items-center gap-2 text-gray-700">
                  <FaCheckCircle className="text-green-600" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-white p-6 rounded-lg shadow h-fit sticky top-24">
          <h2 className="text-xl font-bold text-primary mb-4">Quick Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold">{course.duration} Years</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Seats</span>
              <span className="font-semibold">{course.seats}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Fees</span>
              <span className="font-semibold">{displayFees}/yr</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Eligibility</p>
            <p className="text-sm font-semibold">{course.eligibility}</p>
          </div>
          <Link
            to="/admissions/apply"
            className="block mt-6 bg-accent hover:bg-accent-dark text-white text-center py-3 rounded-lg font-semibold transition"
          >
            Apply Now
          </Link>
        </aside>
      </div>
    </div>
  );
}