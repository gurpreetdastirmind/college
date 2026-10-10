import { useEffect, useState } from 'react';
import api from '../services/api';
import { FaImage, FaTimes } from 'react-icons/fa';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [cats, setCats] = useState(['All']); // ← dynamic now

  // ---- Fetch from backend ----
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        const items = data.gallery || data || [];
        setImages(items);

        // Build category list from fetched data (auto-updates when admin adds new categories)
        const uniqueCats = [
          ...new Set(items.map((i) => i.category).filter(Boolean)),
        ].sort();

        setCats(['All', ...uniqueCats]);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // ---- Resolve relative image paths ----
  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    const base =
      import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  // ---- Filter by category ----
  const filtered =
    filter === 'All' ? images : images.filter((i) => i.category === filter);

  return (
    <div>
      {/* Banner */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Photo Gallery</h1>
          <p className="text-gray-200">Moments from our campus</p>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filter === c
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading gallery...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            {filter === 'All'
              ? 'No photos uploaded yet.'
              : `No photos in "${filter}" category yet.`}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => {
              const src = resolveImage(img.image_url);
              return (
                <div
                  key={img.id}
                  onClick={() => setLightbox(src)}
                  className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer"
                >
                  {src ? (
                    <img
                      src={src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://via.placeholder.com/400?text=Image+Error';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaImage className="text-4xl text-gray-300" />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                    <div>
                      <p className="text-white text-sm font-semibold truncate">
                        {img.title}
                      </p>
                      {img.category && (
                        <p className="text-white/80 text-xs">{img.category}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-2xl bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}