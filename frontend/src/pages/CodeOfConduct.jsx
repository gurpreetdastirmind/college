export default function CodeOfConduct() {
  const sections = [
    {
      title: 'For Students',
      rules: [
        'Attend classes regularly (minimum 75% attendance mandatory).',
        'Wear the prescribed uniform / carry ID card at all times on campus.',
        'Maintain discipline and respect faculty and fellow students.',
        'Use of mobile phones is prohibited during lectures.',
        'Ragging in any form is strictly prohibited and punishable.',
        'Keep the campus clean and green.',
      ],
    },
    {
      title: 'For Faculty & Staff',
      rules: [
        'Maintain punctuality and regular attendance.',
        'Prepare and deliver lessons as per the prescribed syllabus.',
        'Treat all students with dignity and fairness.',
        'Participate in college activities and committees.',
        'Maintain confidentiality of student records.',
      ],
    },
    {
      title: 'For Visitors',
      rules: [
        'Report to the reception / security desk on arrival.',
        'Carry a valid photo ID for verification.',
        'Respect campus timings and instructions.',
      ],
    },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Code of Conduct</h1>
          <p className="text-gray-200">Standards we uphold</p>
        </div>
      </section>

      <div className="container-custom py-12 max-w-4xl space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-primary mb-3">{s.title}</h2>
            <ul className="space-y-2 text-gray-700 list-disc list-inside">
              {s.rules.map((r, j) => (
                <li key={j}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}