import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQ() {
  const faqs = [
    { q: 'Is the college affiliated with a state university?', a: 'Yes, we are approved by UGC/NCTE and affiliated with Panjab University,Chandigarh.' },
    { q: 'How can SC/ST students apply for Punjab Post-Matric Scholarship?', a: 'Eligible students can apply via the Dr. Ambedkar Punjab Scholarship portal (scholarships.punjab.gov.in) after locking their admission.' },
    { q: 'Is transport available for students from nearby towns?', a: 'Yes, our bus network covers major routes across the district.' },
    { q: 'What is the minimum attendance required for exams?', a: 'As per university guidelines, 75% attendance is strictly required.' },
    { q: 'Are hostels available for girls?', a: 'Yes, hostels with 24/7 security and mess facilities are available.' },
    { q: 'How can I apply for admission?', a: 'You can apply online through our website or via the Punjab Centralized Admission Portal (admission.punjab.gov.in).' },
    { q: 'What documents are required for admission?', a: '10th/12th marksheet, Punjab Residence Certificate, Caste Certificate (if applicable), Migration Certificate, and passport-size photos.' },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">FAQ</h1>
          <p className="text-gray-200">Frequently asked questions</p>
        </div>
      </section>

      <div className="container-custom py-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50"
            >
              <span className="font-semibold text-primary pr-4">{f.q}</span>
              <FaChevronDown className={`transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="p-5 pt-0 text-gray-700 border-t">{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}