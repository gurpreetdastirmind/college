import { FaQuoteLeft, FaGraduationCap, FaEnvelope, FaPhone } from 'react-icons/fa';
import principalImg from '../image/primsg.png';

export default function PrincipalMessage() {
  return (
    <div>
      {/* Banner */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Principal's Message</h1>
          <p className="text-gray-200">A word from our Principal</p>
        </div>
      </section>

      <div className="container-custom py-12 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Left: Principal photo + info */}
            <div className="bg-gradient-to-br from-primary to-blue-900 text-white p-8 flex flex-col items-center justify-start">
              {/* Photo */}
              <div className="w-40 h-40 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center mb-4 overflow-hidden">
                <img
                  src={principalImg}
                  alt="Dr. Kirandeep Kaur — Principal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to icon if the image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center">
                  <FaGraduationCap className="text-7xl text-white/80" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-center">Dr. Kirandeep Kaur</h3>
              <p className="text-accent text-sm font-semibold mt-1">Principal</p>
              <p className="text-xs text-gray-200 mt-1 text-center">
                M.Ed, Ph.D. (Education)
              </p>

              <div className="mt-6 space-y-2 text-xs w-full">
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-accent" />
                  <span className="truncate">mtsmcldh@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-accent" />
                  <span>0161-2740380</span>
                </p>
              </div>
            </div>

            {/* Right: Message */}
            <div className="md:col-span-2 p-8 md:p-10">
              <FaQuoteLeft className="text-4xl text-accent mb-4" />

              <h2 className="text-2xl font-bold text-primary mb-6">
                Welcome to Master Tara Singh Memorial College for Women
              </h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  It gives me immense pleasure to welcome you to{' '}
                  <strong>Master Tara Singh Memorial College for Women, Ludhiana</strong> — an
                  institution committed to empowering young women through quality education,
                  moral values, and holistic development.
                </p>

                <p>
                  Since our establishment, we have strived to create an environment where
                  every student is encouraged to discover her potential, sharpen her
                  intellect, and develop the confidence to face the challenges of the
                  modern world. Our dedicated faculty, modern infrastructure, and
                  student-centric approach ensure that learning here goes beyond textbooks.
                </p>

                <p>
                  We believe that education is not merely about acquiring degrees — it is
                  about building character, fostering critical thinking, and nurturing
                  socially responsible citizens. At MTSM College, we are proud to uphold
                  the rich cultural heritage of Punjab while embracing innovation and
                  global standards of higher education.
                </p>

                <p>
                  Our college is affiliated with Panjab University,Chandigarh, recognized
                  under UGC 2(f) & 12(B), and approved by NCTE for the B.Ed program. We
                  offer a wide range of undergraduate and postgraduate programs designed
                  to meet the aspirations of today's students and the demands of the
                  industry.
                </p>

                <p>
                  I invite all aspiring students to become a part of our vibrant academic
                  community. Together, let us build a future where education becomes the
                  most powerful tool for women's empowerment and social transformation.
                </p>

                <p className="font-semibold text-primary pt-2">
                  With warm regards,
                </p>
                <p className="font-bold text-primary">
                  Dr. Kirandeep Kaur<br />
                  <span className="text-sm font-normal text-gray-600">
                    Principal, Master Tara Singh Memorial College for Women, Ludhiana
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights / quick facts */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 border-l-4 border-primary p-5 rounded">
            <h4 className="font-bold text-primary mb-1">Our Vision</h4>
            <p className="text-sm text-gray-700">
              Empowering women through excellence in education and character building.
            </p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-accent p-5 rounded">
            <h4 className="font-bold text-primary mb-1">Our Mission</h4>
            <p className="text-sm text-gray-700">
              Affordable quality education, research, and moral values for all.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded">
            <h4 className="font-bold text-primary mb-1">Our Promise</h4>
            <p className="text-sm text-gray-700">
              A safe, inclusive, and inspiring campus for every student.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}