import { FaFilePdf } from 'react-icons/fa';

export default function Downloads() {
  const categories = [
    {
      title: 'Admission & Registration',
      files: ['Prospectus 2026-27', 'Offline Admission Form', 'Category Certificate Format'],
    },
    {
      title: 'Student Leave & Bonafide',
      files: ['Leave Application Form', 'Bonafide Certificate Request', 'Bus/Train Pass Request'],
    },
    {
      title: 'Hostel Forms',
      files: ['Hostel Admission Form', 'Out-pass / No Objection Form'],
    },
    {
      title: 'Examination Forms',
      files: ['Re-evaluation Request Form', 'No Dues Certificate Clearance'],
    },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Download Center</h1>
          <p className="text-gray-200">All official forms & documents</p>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-2 gap-6">
        {categories.map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-primary mb-4">{c.title}</h3>
            <div className="space-y-2">
              {c.files.map(f => (
                <a
                  key={f}
                  href="#"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-red-50 rounded transition"
                >
                  <FaFilePdf className="text-red-600" />
                  <span className="text-sm font-medium">{f}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}