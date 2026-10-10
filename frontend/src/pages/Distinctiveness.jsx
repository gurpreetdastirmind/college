export default function Distinctiveness() {
  const points = [
    { title: 'Women Empowerment Focus', desc: 'Dedicated to empowering young women through education.' },
    { title: 'Affordable Quality Education', desc: 'Merit-based fee structure with scholarships for deserving students.' },
    { title: 'Strong Community Outreach', desc: 'NSS, NCC, and Red Ribbon Club activities in nearby villages.' },
    { title: 'Experienced Faculty', desc: 'Highly qualified teaching staff with Ph.D. and NET credentials.' },
    { title: 'Modern Infrastructure', desc: 'ICT-enabled classrooms, language lab, library, and psychology lab.' },
    { title: 'Placement Support', desc: 'Dedicated Training & Placement Cell with industry tie-ups.' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Institutional Distinctiveness</h1>
          <p className="text-gray-200">What makes us unique</p>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow border-t-4 border-accent">
            <h3 className="font-bold text-primary mb-2">{p.title}</h3>
            <p className="text-sm text-gray-700">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}