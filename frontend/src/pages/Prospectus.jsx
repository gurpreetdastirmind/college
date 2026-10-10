import { useEffect, useState } from 'react';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

export default function Prospectus() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/prospectus');
        const list = data.items || [];
        setItems(list);

        // Auto-select first PDF
        const first = list.find((i) => i.file_url) || list.find((i) => i.link_url);
        if (first) setSelected(first);
      } catch (err) {
        console.error('Failed to load prospectus:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const resolveFile = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  const selectedUrl = selected
    ? resolveFile(selected.file_url || selected.link_url)
    : null;

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">College Prospectus</h1>
          <p className="text-gray-200">Official admission brochure & information</p>
        </div>
      </section>

      <div className="container-custom py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">No prospectus available yet.</p>
        ) : (
          <>
            {/* List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="p-4 text-left w-16">Sr</th>
                    <th className="p-4 text-left">Title</th>
                    <th className="p-4 text-left">Year</th>
                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => {
                    const isSelected = selected?.id === it.id;
                    return (
                      <tr
                        key={it.id}
                        className={`border-b transition ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="p-4">{i + 1}</td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => setSelected(it)}
                            className={`flex items-center gap-3 text-left transition ${
                              isSelected ? 'text-accent font-semibold' : 'text-primary hover:text-accent'
                            }`}
                          >
                            <span className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                              <FaFilePdf />
                            </span>
                            <span className="font-medium">{it.title}</span>
                          </button>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{it.academic_year || '—'}</td>
                        <td className="p-4 text-sm text-gray-600">{it.publish_date || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Inline PDF viewer */}
            {selectedUrl && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2.5 flex items-center gap-4">
                  <span className="font-medium text-sm truncate flex-1">
                    {selected.title}.pdf
                  </span>
                  <a
                    href={selectedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-white text-sm flex items-center gap-1"
                  >
                    <FaExternalLinkAlt className="text-xs" /> Open
                  </a>
                  <a
                    href={selectedUrl}
                    download
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    ⬇
                  </a>
                </div>
                <iframe
                  src={selectedUrl}
                  title={selected.title}
                  className="w-full border-0"
                  style={{ height: '80vh' }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}