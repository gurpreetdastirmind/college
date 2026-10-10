import { FaFilePdf } from 'react-icons/fa';

export default function NoticeCard({ notice }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <div className="flex flex-wrap gap-3 items-center mb-2">
        <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold">
          {notice.date}
        </span>
        {notice.category && (
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {notice.category}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-primary mb-2">{notice.title}</h3>
      {notice.description && (
        <p className="text-sm text-gray-600 mb-3">{notice.description}</p>
      )}
      {notice.pdf_url && (
        <a
          href={notice.pdf_url}
          className="inline-flex items-center gap-2 text-red-600 text-sm font-semibold hover:underline"
        >
          <FaFilePdf /> Download Circular
        </a>
      )}
    </div>
  );
}