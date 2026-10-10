// pages/Admissions.jsx
import { useEffect, useState } from 'react';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

export default function Admissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/admissions');
        setItems(data.admissions || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const resolveFile = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Admissions</h1>
          <p className="text-gray-200">Notifications, forms and important PDFs</p>
        </div>
      </section>

      <div className="container-custom py-12 max-w-4xl">
        <h2 className="text-2xl font-bold text-primary mb-6">Admission Documents</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            No admission documents available yet. Please check back later.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="bg-white p-5 rounded-lg shadow flex items-center justify-between gap-4 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <FaFilePdf className="text-red-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{it.title}</h3>
                    {it.description && (
                      <p className="text-sm text-gray-600 mt-1">{it.description}</p>
                    )}
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      {it.academic_year && <span>📅 {it.academic_year}</span>}
                      {it.publish_date && <span>Published: {it.publish_date}</span>}
                    </div>
                  </div>
                </div>

                {it.file_url ? (
                  <a
                    href={resolveFile(it.file_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 whitespace-nowrap"
                  >
                    <FaFilePdf /> View PDF
                  </a>
                ) : it.link_url ? (
                  <a
                    href={it.link_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 whitespace-nowrap"
                  >
                    <FaExternalLinkAlt /> Open Link
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}