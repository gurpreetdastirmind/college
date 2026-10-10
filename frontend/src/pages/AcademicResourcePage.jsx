import { useEffect, useState } from 'react';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

export default function AcademicResourcePage({ category, title, description, subcategory }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPdf, setSelectedPdf] = useState(null); // { url, title }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ category });
        if (subcategory) params.append('subcategory', subcategory);
        const { data } = await api.get(`/academics?${params.toString()}`);
        setItems(data.items || []);

        // Auto-select the first PDF so it shows inline like the GCG site
        const firstPdf = (data.items || []).find((it) => it.file_url);
        if (firstPdf) {
          setSelectedPdf({
            url: resolveFile(firstPdf.file_url),
            title: firstPdf.title,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);

  const resolveFile = (url) => {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  const handleSelect = (item) => {
    if (item.file_url) {
      setSelectedPdf({
        url: resolveFile(item.file_url),
        title: item.title,
      });
    } else if (item.link_url) {
      window.open(item.link_url, '_blank');
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {description && <p className="text-gray-200">{description}</p>}
        </div>
      </section>

      <div className="container-custom py-12">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* File listing table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="p-4 text-left w-16">Sr</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Type / Status</th>
                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => {
                    const isSelected = selectedPdf && it.file_url &&
                      resolveFile(it.file_url) === selectedPdf.url;

                    return (
                      <tr
                        key={it.id}
                        className={`border-b transition ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="p-4">{i + 1}</td>
                        <td className="p-4">
                          {it.file_url ? (
                            <button
                              type="button"
                              onClick={() => handleSelect(it)}
                              className={`flex items-center gap-3 text-left transition ${
                                isSelected
                                  ? 'text-accent font-semibold'
                                  : 'text-primary hover:text-accent'
                              }`}
                            >
                              <span className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                                <FaFilePdf />
                              </span>
                              <span className="font-medium">{it.title}</span>
                            </button>
                          ) : (
                            <a
                              href={it.link_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-3 text-primary hover:text-accent transition"
                            >
                              <span className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                                <FaExternalLinkAlt />
                              </span>
                              <span className="font-medium">{it.title}</span>
                            </a>
                          )}
                          {it.subcategory && (
                            <span className="text-xs text-gray-500 block ml-13">
                              {it.subcategory}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {it.file_url ? 'PDF' : 'Link'}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {formatDate(it.publish_date)}
                        </td>
                      </tr>
                    );
                  })}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-10 text-center text-gray-500">
                        No items available yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ============================================
                INLINE PDF VIEWER — exactly like GCG site
                ============================================ */}
            {selectedPdf && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-800 text-white px-4 py-2.5 flex items-center gap-4">
                  <span className="font-medium text-sm truncate flex-1">
                    {selectedPdf.title}.pdf
                  </span>

                  <a
                    href={selectedPdf.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-white text-sm flex items-center gap-1"
                    title="Open in new tab"
                  >
                    <FaExternalLinkAlt className="text-xs" /> Open
                  </a>

                  <a
                    href={selectedPdf.url}
                    download
                    className="text-gray-300 hover:text-white text-sm"
                    title="Download"
                  >
                    ⬇
                  </a>
                </div>

                <iframe
                  src={selectedPdf.url}
                  title={selectedPdf.title}
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