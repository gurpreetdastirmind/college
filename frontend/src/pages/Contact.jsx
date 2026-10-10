import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import api from '../services/api';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', data);
      toast.success('Message sent! We will contact you soon.');
      reset();
    } catch {
      toast.error('Failed to send. Try again.');
    }
  };

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-200">Get in touch with us</p>
        </div>
      </section>

      <div className="container-custom py-12 grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-primary mb-4">Reach Us</h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex gap-3">
                <FaMapMarkerAlt className="text-accent mt-1" />
                <span>
                  Master Tara Singh Memorial College for Women<br />
                  Old Sabzi Mandi, Ludhiana, Punjab - 141008
                </span>
              </p>
              <p className="flex gap-3">
                <FaPhone className="text-accent mt-1" />
                <span>
                  Office: 0161-2740380<br />
                  Admission: +91 99882-33666<br />
                </span>
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

          {/* Map — shows the college by NAME so the place card appears */}
          <div className="bg-white p-2 rounded-lg shadow">
            <iframe
              title="Master Tara Singh Memorial College for Women, Ludhiana"
              src="https://www.google.com/maps?q=Master+Tara+Singh+Memorial+College+for+Women+Ludhiana&z=16&output=embed"
              className="w-full h-64 rounded"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>

            {/* Action buttons below the map */}
            <div className="flex justify-center gap-6 mt-3 text-sm font-semibold">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Master+Tara+Singh+Memorial+College+for+Women+Ludhiana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                🧭 Get Directions
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Master+Tara+Singh+Memorial+College+for+Women+Ludhiana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                📍 View Place
              </a>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-white p-8 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold text-primary mb-4">Send an Inquiry</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('name', { required: 'Name required' })}
                placeholder="Full Name *"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register('email', {
                  required: 'Email required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Email *"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('subject', { required: 'Subject required' })}
                placeholder="Subject *"
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <textarea
                {...register('message', { required: 'Message required' })}
                rows="5"
                placeholder="Your Message *"
                className="w-full border rounded-lg px-4 py-2"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}