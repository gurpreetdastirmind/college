import { FaEye, FaBullseye } from 'react-icons/fa';

export default function VisionMission() {
  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Vision & Mission</h1>
          <p className="text-gray-200">Our guiding principles</p>
        </div>
      </section>

      <div className="container-custom py-12 max-w-4xl space-y-6">
        <div className="bg-white p-8 rounded-lg shadow">
          <FaEye className="text-4xl text-accent mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To emerge as an excellent educational institution committed to women
            empowerment by providing quality education, value-based nurturing, and
            holistic development — enabling students to become enlightened and active
            participants in shaping the future of the nation.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <FaBullseye className="text-4xl text-accent mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-3">Our Mission</h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            <li>Provide affordable, quality education to rural and urban students.</li>
            <li>Promote research, innovation, and skill development.</li>
            <li>Instill moral values and cultural pride in students.</li>
            <li>Foster inclusive education as per Punjab Govt. policies.</li>
            <li>Encourage women's leadership and entrepreneurship.</li>
            <li>Build a safe, supportive, and inspiring campus environment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}