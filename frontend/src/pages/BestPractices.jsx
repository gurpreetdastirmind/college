import { FaCheckCircle } from 'react-icons/fa';

export default function BestPractices() {
  const practices = [
    {
      title: 'Mentor–Mentee System',
      desc: 'Each faculty member mentors a small group of students for academic and personal guidance.',
    },
    {
      title: 'Green Campus Initiative',
      desc: 'Tree plantation drives, plastic-free campus, and waste segregation.',
    },
    {
      title: 'Digital Learning',
      desc: 'ICT-enabled classrooms, smart boards, and online resources for all students.',
    },
    {
      title: 'Skill Development Workshops',
      desc: 'Regular workshops on communication, IT skills, and entrepreneurship.',
    },
    {
      title: 'Community Service (NSS)',
      desc: 'Blood donation camps, cleanliness drives, and village outreach programs.',
    },
    {
      title: 'Anti-Ragging & Women Safety',
      desc: 'Strict enforcement, CCTV surveillance, and dedicated helpline.',
    },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Best Practices</h1>
          <p className="text-gray-200">Initiatives that define us</p>
        </div>
      </section>

      <div className="container-custom py-12 max-w-4xl space-y-4">
        {practices.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow flex gap-4">
            <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-primary mb-1">{p.title}</h3>
              <p className="text-sm text-gray-700">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}