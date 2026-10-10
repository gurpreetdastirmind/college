import { FaBullseye, FaEye } from 'react-icons/fa';

export default function About() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-gray-200">Know more about our institution</p>
        </div>
      </section>

      <div className="container-custom py-12 space-y-12">
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <FaEye className="text-4xl text-accent mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to emerge as an excellent educational institution that is committed towards women empowerment by providing quality education. Through value based nurturing, we strive to make our students enlightened and active participants in shaping the future of world.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow">
            <FaBullseye className="text-4xl text-accent mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-3">Our Mission</h2>
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>Provide affordable, quality education to rural and urban students</li>
              <li>Promote research, innovation, and skill development</li>
              <li>Instill moral values and cultural pride in students</li>
              <li>Foster inclusive education as per Punjab Govt. policies</li>
            </ul>
          </div>
        </div>

        {/* History */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4">Our History</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
           MASTER TARA SINGH MEMORIAL COLLEGE FOR WOMEN, LUDHIANA was established in 1968. Since its inception, the college, while embarking on its never ending. quest for excellence, has grown fledge by fledge as a prestigious multi-faculty post graduate institution offering wide-ranging graduate and post graduate programmes to nearly twenty-two hundred students. The institution has taken a tremendous leap in the academic, cultural and sports field and carved an enviable niche for itself among the women colleges of the city.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The institution is managed by a trust committed to the educational
            upliftment of the region, in alignment with the state's higher education
            policies and Dr. Ambedkar Scholarship schemes.
          </p>
        </div>

        {/* Leadership */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Leadership Messages
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sh. Rajinder Singh', role: 'Chairman', msg: 'Our vision is to make quality education accessible to every student of Punjab.' },
              { name: 'Smt. Harpreet Kaur', role: 'Secretary', msg: 'We are committed to holistic development and moral values.' },
              { name: 'Dr. Gurpreet Singh', role: 'Principal', msg: 'I welcome all students to a journey of academic excellence and character building.' },
            ].map((p, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {p.name.split(' ').pop()[0]}
                </div>
                <h3 className="font-bold text-primary">{p.name}</h3>
                <p className="text-accent text-sm mb-3">{p.role}</p>
                <p className="text-gray-600 text-sm italic">"{p.msg}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditation */}
        <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
          <h2 className="text-xl font-bold text-primary mb-3">
            Accreditations & Affiliations
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Affiliated to Panjab University, Chandigarh</li>
            <li>✅ Recognized by UGC under Section 2(f) & 12(B)</li>
            <li>✅ NCTE Approved (for B.Ed program)</li>
            <li>✅ NAAC Accredited</li>
          </ul>
        </div>
      </div>
    </div>
  );
}