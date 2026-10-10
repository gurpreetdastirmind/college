import FacultyCard from '../components/FacultyCard';

export default function Faculty() {
  const teachers = [
    { name: 'Dr. Gurpreet Singh', designation: 'Principal', dept: 'Education', qual: 'M.Ed, Ph.D.', exp: '20 Years', email: 'principal@college.ac.in' },
    { name: 'Dr. Harpreet Kaur', designation: 'HOD', dept: 'Arts', qual: 'M.A., Ph.D.', exp: '15 Years', email: 'harpreet@college.ac.in' },
    { name: 'Prof. Rajesh Kumar', designation: 'Assistant Professor', dept: 'Commerce', qual: 'M.Com, NET', exp: '10 Years', email: 'rajesh@college.ac.in' },
    { name: 'Prof. Simran Kaur', designation: 'Assistant Professor', dept: 'Computer', qual: 'MCA, NET', exp: '8 Years', email: 'simran@college.ac.in' },
    { name: 'Dr. Amandeep Singh', designation: 'HOD', dept: 'Science', qual: 'M.Sc., Ph.D.', exp: '12 Years', email: 'amandeep@college.ac.in' },
    { name: 'Prof. Manpreet Kaur', designation: 'Assistant Professor', dept: 'Education', qual: 'M.Ed, NET', exp: '6 Years', email: 'manpreet@college.ac.in' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Our Faculty</h1>
          <p className="text-gray-200">Meet our experienced teaching staff</p>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t, i) => (
          <FacultyCard key={i} teacher={t} />
        ))}
      </div>
    </div>
  );
}