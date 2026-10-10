import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
        <h3 className="text-2xl font-bold text-white">{course.name}</h3>
        <p className="text-accent text-sm mt-1 font-medium">{course.stream}</p>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="space-y-3 text-sm text-gray-700 flex-1">
          <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
            <span className="text-gray-500">Duration</span>
            <span className="font-semibold">{course.duration} Years</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
            <span className="text-gray-500">Seats</span>
            <span className="font-semibold">{course.seats}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
            <span className="text-gray-500">Eligibility</span>
            <span className="font-semibold text-right">{course.eligibility}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Fees</span>
            <span className="font-bold text-accent">
              {typeof course.fees === 'string' && course.fees.includes('₹')
                ? course.fees
                : `₹${course.fees}`}
            </span>
          </div>
        </div>

        <Link
          to={`/courses/${course.id}`}
          className="mt-6 bg-accent hover:bg-accent-dark text-white text-center px-5 py-3 rounded-lg font-semibold transition block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}