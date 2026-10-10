import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export default function AboutContacts() {
  const contacts = [
    { role: 'Principal', name: 'Dr. Kirandeep Kaur', phone: '0161-2740380', email: 'principal@mtsmcollege.ac.in' },
    { role: 'Admission Office', name: 'Admission Cell', phone: '+91 99882 33666', email: 'admissions@mtsmcollege.ac.in' },
    { role: 'Office', name: 'General Office', phone: '0161-2740380', email: 'mtsmcldh@gmail.com' },
    { role: 'Anti-Ragging Cell', name: 'Committee', phone: '1800-180-5522', email: 'antiragging@mtsmcollege.ac.in' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Contacts</h1>
          <p className="text-gray-200">Get in touch with the right department</p>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-2 gap-8">
        {/* Left column: Address + Map */}
        <div className="space-y-6">
          {/* Address block */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-primary mb-4">College Address</h2>
            <div className="space-y-3 text-gray-700 text-sm">
              <p className="flex gap-3">
                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                <span>
                  Master Tara Singh Memorial College for Women<br />
                  Old Sabzi Mandi, Ludhiana, Punjab - 141008
                </span>
              </p>
              <p className="flex gap-3">
                <FaPhone className="text-accent mt-1" />
                <span>0161-2740380</span>
              </p>
              <p className="flex gap-3">
                <FaEnvelope className="text-accent mt-1" />
                <span>mtsmcldh@gmail.com</span>
              </p>
              <p className="flex gap-3">
                <FaClock className="text-accent mt-1" />
                <span>Mon – Sat: 8:00 AM – 3:00 PM</span>
              </p>
            </div>
          </div>

          {/* Google Map */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <iframe
              title="College Location"
              src="https://maps.google.com/maps?q=Master%20Tara%20Singh%20Memorial%20College%20for%20Women%2C%20Ludhiana&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Department contacts */}
        <div className="space-y-4">
          {contacts.map((c, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-bold text-primary">{c.role}</h3>
              <p className="text-xs text-gray-500 mb-2">{c.name}</p>
              <p className="text-sm text-gray-700 flex items-center gap-2">
                <FaPhone className="text-accent text-xs" /> {c.phone}
              </p>
              <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
                <FaEnvelope className="text-accent text-xs" /> {c.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}