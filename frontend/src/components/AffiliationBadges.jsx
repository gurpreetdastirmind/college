export default function AffiliationBadges() {
  const badges = [
    { name: 'Panjab University', sub: 'Affiliated', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { name: 'UGC', sub: 'Recognized 2(f) & 12(B)', color: 'bg-green-50 text-green-800 border-green-200' },
    { name: 'NCTE', sub: 'Approved', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { name: 'NAAC', sub: "Accredited 'A' Grade", color: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-10 font-bold">
          Accreditations & Affiliations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`${b.color} border-2 p-6 rounded-xl text-center font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
            >
              <p className="text-base md:text-lg font-bold">{b.name}</p>
              <p className="text-xs opacity-80 mt-2">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}