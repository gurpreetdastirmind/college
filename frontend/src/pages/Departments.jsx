export default function Departments() {
  const depts = [
    { name: 'Department of Education', hod: 'Dr. Gurpreet Singh', courses: 'B.Ed, M.Ed' },
    { name: 'Department of Arts', hod: 'Dr. Harpreet Kaur', courses: 'B.A. (Punjabi, English, History)' },
    { name: 'Department of Commerce', hod: 'Prof. Rajesh Kumar', courses: 'B.Com, M.Com' },
    { name: 'Department of Computer Applications', hod: 'Prof. Simran Kaur', courses: 'BCA' },
    { name: 'Department of Science', hod: 'Dr. Amandeep Singh', courses: 'B.Sc.' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Departments</h1>
          <p className="text-gray-200">Academic departments of our college</p>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {depts.map((d, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-t-4 border-accent">
            <h3 className="text-lg font-bold text-primary mb-3">{d.name}</h3>
            <p className="text-sm text-gray-700 mb-1"><strong>HOD:</strong> {d.hod}</p>
            <p className="text-sm text-gray-700"><strong>Courses:</strong> {d.courses}</p>
          </div>
        ))}
      </div>
    </div>
  );
}