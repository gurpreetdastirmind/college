import { FaEnvelope } from 'react-icons/fa';

export default function FacultyCard({ teacher }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition text-center p-6">
      <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
        {teacher.name.split(' ').pop()[0]}
      </div>
      <h3 className="font-bold text-primary text-lg">{teacher.name}</h3>
      <p className="text-accent text-sm mb-2">{teacher.designation}</p>
      <p className="text-sm text-gray-600 mb-1">Dept: {teacher.dept}</p>
      <p className="text-sm text-gray-600 mb-1">{teacher.qual}</p>
      <p className="text-sm text-gray-600 mb-3">{teacher.exp} Experience</p>
      <p className="text-xs text-gray-500 flex items-center gap-2 justify-center">
        <FaEnvelope /> {teacher.email}
      </p>
    </div>
  );
}