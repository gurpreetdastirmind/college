import { FaPhone, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';

export default function Committees() {
  const committees = [
    {
      name: 'Anti-Ragging Cell',
      incharge: 'Dr. Gurpreet Singh',
      phone: '+91 98765 43210',
      email: 'antiragging@college.ac.in',
    },
    {
      name: 'Internal Complaints Committee (Women Cell)',
      incharge: 'Dr. Harpreet Kaur',
      phone: '+91 98765 43211',
      email: 'icc@college.ac.in',
    },
    {
      name: 'Student Grievance Redressal Cell',
      incharge: 'Prof. Rajesh Kumar',
      phone: '+91 98765 43212',
      email: 'grievance@college.ac.in',
    },
    {
      name: 'SC/ST Cell',
      incharge: 'Dr. Amandeep Singh',
      phone: '+91 98765 43213',
      email: 'scst@college.ac.in',
    },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Statutory Committees</h1>
          <p className="text-gray-200">As per UGC / State Government norms</p>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Anti-Ragging Alert */}
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaExclamationTriangle className="text-red-600 text-xl" />
            <h3 className="font-bold text-red-800 text-lg">National Anti-Ragging Helpline</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">1800-180-5522</p>
          <p className="text-sm text-gray-700 mt-1">
            Or email: helpline@antiragging.in | Report online: www.antiragging.in
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {committees.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-primary mb-4">{c.name}</h3>
              <p className="text-sm text-gray-700 mb-2"><strong>In-Charge:</strong> {c.incharge}</p>
              <p className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                <FaPhone className="text-accent" /> {c.phone}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-accent" /> {c.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}