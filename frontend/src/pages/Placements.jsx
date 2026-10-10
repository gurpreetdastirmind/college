import tcsImg from "../image/tcs.webp"
import infosysImg from "../image/infosys.png"
import wiproImg from "../image/wipro.jpg"
import hdfcImg from "../image/hdfc-bank.png"
import iciciImg from "../image/ICICI-Bank-Logo.png"
import relianceImg from "../image/relinace_4.webp"
import TechMahindra from "../image/Tech_Mahindra-Logo.wine.png"
import Cognizantimg from "../image/Cognizant.png"
export default function Placements() {
  const stats = [
    { label: 'Highest Package', value: '₹6 LPA' },
    { label: 'Average Package', value: '₹3.5 LPA' },
    { label: 'Placement Offers', value: '200+' },
    { label: 'Recruiting Partners', value: '50+' },
  ];

  // Added an 'img' property to each recruiter object
  const recruiters = [
    { name: 'TCS', img: tcsImg},
    { name: 'Infosys', img: infosysImg },
    { name: 'Wipro', img: wiproImg},
    { name: 'HDFC Bank', img: hdfcImg },
    { name: 'ICICI', img: iciciImg},
    { name: 'Reliance', img: relianceImg},
    { name: 'Tech Mahindra', img: TechMahindra },
    { name: 'Cognizant', img: Cognizantimg },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Placements</h1>
          <p className="text-gray-200">Building careers, shaping futures</p>
        </div>
      </section>

      <div className="container-custom py-12 space-y-12">
        {/* TPO Message */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-primary mb-4">Training & Placement Cell</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Training & Placement Cell (TPC) is dedicated to bridging the gap between
            academia and industry. We conduct regular skill development programs,
            interview coaching, and soft-skills training to prepare students for
            successful careers. Top recruiters from IT, banking, education, and
            corporate sectors visit our campus every year.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-accent text-white p-6 rounded-lg text-center">
              <p className="text-3xl font-bold mb-1">{s.value}</p>
              <p className="text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recruiters */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Top Recruiters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recruiters.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center gap-3">
                {/* Added Image Here */}
                <img 
                  src={r.img} 
                  alt={`${r.name} logo`} 
                  className="h-12 w-auto object-contain"
                />
                {/* Text Below Image */}
                <span className="font-bold text-primary text-center">{r.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Amanpreet Kaur', course: 'BCA 2023', company: 'TCS', msg: 'The placement cell helped me crack my dream job!' },
              { name: 'Harmanpreet Kaur', course: 'B.Com 2022', company: 'HDFC Bank', msg: 'Excellent faculty and placement support.' },
              { name: 'Simranjeet Singh', course: 'B.Ed 2023', company: 'Kendriya Vidyalaya', msg: 'Now I am a proud teacher, thanks to my college.' },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 italic mb-4">"{t.msg}"</p>
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.course} • {t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}