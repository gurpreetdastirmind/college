export default function Scholarships() {
  const schemes = [
    {
      name: 'Post-Matric Scholarship (PMS)',
      for: 'SC / ST / BC students',
      benefit: 'Full tuition fee + maintenance allowance',
      link: 'https://scholarships.punjab.gov.in',
    },
    {
      name: 'Merit-Cum-Means Scholarship',
      for: 'Economically weaker meritorious students',
      benefit: 'Partial fee waiver + monthly stipend',
      link: '#',
    },
    {
      name: 'Ashirwad Scheme',
      for: 'SC/BC Girl students',
      benefit: 'Financial assistance for education',
      link: '#',
    },
    {
      name: 'Sports Scholarship',
      for: 'State/National level players',
      benefit: 'Fee concession + sports kit',
      link: '#',
    },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Scholarships</h1>
          <p className="text-gray-200">Financial support for deserving students</p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="bg-yellow-50 border-l-4 border-accent p-6 rounded mb-8">
          <h3 className="font-bold text-primary mb-2">Important</h3>
          <p className="text-gray-700">
            All SC/BC students must apply through the{' '}
            <a
              href="https://scholarships.punjab.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline font-semibold"
            >
              Dr. Ambedkar Scholarship Portal, Punjab
            </a>{' '}
            after locking their admission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {schemes.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-primary mb-3">{s.name}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>For:</strong> {s.for}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Benefit:</strong> {s.benefit}</p>
              {s.link !== '#' ? (
                <a href={s.link} target="_blank" rel="noreferrer" className="text-accent font-semibold hover:underline">
                  Apply Now →
                </a>
              ) : (
                <span className="text-gray-400 text-sm">Contact office for details</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}