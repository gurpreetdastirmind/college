import { useEffect, useState } from 'react';
import { FaFolder, FaFilePdf, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../services/api';

export default function AcademicResourcePage({ category, title, description }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/academics?category=${category}`)
      .then(({ data }) => setItems(data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [category]);

  const resolveFile = (url) => {
    if (!url) return '#';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  // Filter by search
  const filtered = items.filter((it) =>
    it.title?.toLowerCase().includes(search.toLowerCase()) ||
    it.folder_name?.toLowerCase().includes(search.toLowerCase()) ||
    it.subcategory?.toLowerCase().includes(search.toLowerCase())
  );

  // Group items by folder_name
  const groupedData = filtered.reduce((acc, item) => {
    const folder = item.folder_name || 'General Resources';
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(item);
    return acc;
  }, {});

  const folderNames = Object.keys(groupedData).sort();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          {description && <p className="mt-2 text-blue-100 max-w-2xl">{description}</p>}
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Search Bar */}
        {!loading && items.length > 0 && (
          <div className="mb-8 max-w-md relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, folder, or subject..."
              className="w-full bg-white border border-gray-200 rounded-lg pl-11 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FaFolder className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No resources available in this section yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {folderNames.map((folderName) => {
              const files = groupedData[folderName];
              return (
                <div
                  key={folderName}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Folder Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200 flex items-center gap-3">
                    <FaFolder className="text-yellow-500 text-2xl flex-shrink-0" />
                    <h2 className="text-lg md:text-xl font-bold text-primary">{folderName}</h2>
                    <span className="ml-auto bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {files.length} {files.length === 1 ? 'file' : 'files'}
                    </span>
                  </div>

                  {/* Files List */}
                  <ul className="divide-y divide-gray-100">
                    {files.map((file) => (
                      <li
                        key={file.id}
                        className="px-6 py-4 hover:bg-gray-50 transition flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 break-words">{file.title}</p>
                          {file.subcategory && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                {file.subcategory}
                              </span>
                            </p>
                          )}
                          {file.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{file.description}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            📅 Published: {file.publish_date || 'N/A'}
                          </p>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          {file.file_url && (
                            <a
                              href={resolveFile(file.file_url)}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                            >
                              <FaFilePdf /> View PDF
                            </a>
                          )}
                          {file.link_url && (
                            <a
                              href={file.link_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
                            >
                              <FaExternalLinkAlt /> Open Link
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}