import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';

export default function Examinations() {
  const portals = [
    { name: 'GNDU Exam Portal', url: 'https://gndu.ac.in' },
    { name: 'Panjab University,Chandigarh Exams', url: 'https://punjabiuniversity.ac.in' },
    { name: 'Panjab University', url: 'https://puchd.ac.in' },
    { name: 'IKG-PTU Student Login', url: 'https://ptu.ac.in' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Examinations & Results</h1>
          <p className="text-gray-200">All exam-related updates in one place</p>
        </div>
      </section>

      <div className="container-custom py-12 space-y-10">
        {/* Date Sheets */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Date Sheets & Timetables</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Mid-Term Exam Date Sheet', 'Semester Final Exam Date Sheet', 'Practical Exam Schedule', 'Internal Assessment Schedule'].map(d => (
              <a key={d} href="#" className="flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded transition">
                <FaFilePdf className="text-red-600 text-xl" />
                <span className="font-medium">{d}</span>
              </a>
            ))}
          </div>
        </div>

        {/* University Portals */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">University Exam Portals</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {portals.map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-white shadow rounded hover:shadow-lg transition"
              >
                <span className="font-medium">{p.name}</span>
                <FaExternalLinkAlt className="text-accent" />
              </a>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="bg-yellow-50 border-l-4 border-accent p-6 rounded">
          <h3 className="font-bold text-primary mb-3">Examination Guidelines</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>75% attendance mandatory to appear in semester exams</li>
            <li>Internal assessment based on assignments, tests & attendance</li>
            <li>Admit cards must be downloaded from university portal</li>
            <li>Re-evaluation forms available after result declaration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}