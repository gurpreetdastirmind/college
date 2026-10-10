import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phone = '9988233666'; // country code + number (no +)
  const message = 'Hello, I would like to inquire about admissions.';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}