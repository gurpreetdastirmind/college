import { useEffect, useState } from 'react';
import api from '../services/api';
import { FaImage } from 'react-icons/fa';

export default function CampusLife() {
  const [gallery, setGallery] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [galleryRes, activitiesRes] = await Promise.all([
          api.get('/gallery').catch(() => ({ data: {} })),
          api.get('/activities').catch(() => ({ data: {} })),
        ]);
        setGallery(galleryRes.data.gallery || galleryRes.data || []);
        setActivities(activitiesRes.data.activities || []);
      } catch (err) {
        console.error('Failed to load campus life data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  return (
    <div>
      {/* Banner */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Campus Life</h1>
          <p className="text-gray-200">Beyond academics - clubs, culture, and community</p>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Activities — fetched from backend */}
        {loading ? (
          <p className="text-center text-gray-500 mb-16">Loading activities...</p>
        ) : activities.length === 0 ? (
          <p className="text-center text-gray-500 mb-16">No activities added yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {activities.map((a) => (
              <div
                key={a.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-l-4 border-accent"
              >
                <h3 className="text-xl font-bold text-primary mb-2">{a.name}</h3>
                <p className="text-sm text-gray-700">{a.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Event Gallery — same as before */}
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Event Gallery</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : gallery.length === 0 ? (
          <p className="text-center text-gray-500">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((g) => {
              const img = resolveImage(g.image_url);
              return (
                <div
                  key={g.id}
                  className="relative group overflow-hidden rounded-lg shadow-md aspect-square bg-gray-100"
                >
                  {img ? (
                    <img
                      src={img}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300?text=Image+Error';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaImage className="text-4xl text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                    <p className="text-white text-sm font-semibold truncate">{g.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}