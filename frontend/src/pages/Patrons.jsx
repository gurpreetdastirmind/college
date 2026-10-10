import React, { useEffect, useState } from 'react';
import MastertaraSinghImg from "../image/master-tara-singh.jpg";
import api from '../services/api';
import { FaImage } from 'react-icons/fa';

export default function Patrons() {
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const { data } = await api.get('/committees');
        setCommittee(data.committees || []);
      } catch (err) {
        console.error("Failed to load committee members", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommittee();
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
          <h1 className="text-4xl font-bold mb-2">Our Patrons</h1>
          <p className="text-gray-200">Guiding lights of our institution</p>
        </div>
      </section>

      <div className="container-custom py-12 space-y-16">

        {/* ==============================================
            SECTION 1: MASTER TARA SINGH JI
        ============================================== */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={MastertaraSinghImg}
              alt="Master Tara Singh Ji"
              className="rounded-lg shadow-md max-w-full h-auto object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-bold text-primary mb-2">A Great Missionary</h2>
            <h3 className="text-2xl font-semibold text-accent mb-6">Master Tara Singh Ji</h3>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-gray-700 text-lg leading-relaxed italic mb-4">
                "ਦੇਹ ਸਿਵਾ ਬਰ ਮੋਹਿ ਇਹੈ,<br/>
                ਸ਼ੁਭ ਕਰਮਨ ਤੇ ਕਬਹੂੰ ਨ ਟਰੋਂ ॥<br/>
                ਨ ਡਰੋਂ ਅਰਿ ਸੋ ਜਬ ਜਾਇ ਲਰੋਂ,<br/>
                ਨਿਸ਼ਚੈ ਕਰ ਅਪਨੀ ਜੀਤ ਕਰੋ ॥<br/>
                ਅਰੁ ਸਿਖਹੋਂ ਆਪਨੇ ਹੀ ਮਨ ਕੌ,<br/>
                ਇਹ ਲਾਲਚ ਹਉ ਗੁਨ ਤਉ ਉਚਰੋਂ ॥ <br />
                ਜਬ ਆਵ ਕੀ ਅਉਧ ਨਿਦਾਨ ਬਨੈ, <br />
                ਅਤਿ ਹੀ ਰਨ ਮੈ ਤਬ ਜੂਝ ਮਰੋਂ ॥"
              </p>
              <p className="text-gray-600 text-sm">
                (Translation: To be a Sikh, one must prioritize Sikhism above all, never fear for one's faith, sacrifice for it, and live and die by it. Applying these principles to oneself is our first duty.)
              </p>
            </div>
          </div>
        </div>

        {/* ==============================================
            SECTION 2: MANAGING COMMITTEE (Dynamic from Backend)
        ============================================== */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">Pillars of the Institution</h2>
            <h3 className="text-xl text-gray-600">Members of the Managing Committee</h3>
            <div className="w-24 h-1 bg-accent mx-auto mt-4"></div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading committee members...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {committee.map((member) => {
                const imgUrl = resolveImage(member.image_url);
                return (
                  <div
                    key={member.id}
                    className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border-t-4 border-accent text-center flex flex-col items-center"
                  >
                    {/* FIXED: w-24 h-24 + object-top so turban/face is visible */}
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100 bg-gray-100 flex items-center justify-center">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/96?text=Image+Error';
                          }}
                        />
                      ) : (
                        <FaImage className="text-3xl text-gray-400" />
                      )}
                    </div>

                    <h3 className="font-bold text-primary text-lg leading-tight">
                      {member.name}
                    </h3>

                    <p className="text-accent text-sm font-semibold mt-1">
                      {member.role}
                    </p>
                  </div>
                );
              })}
              {committee.length === 0 && (
                <p className="text-gray-500 col-span-3 text-center py-6">No committee members listed yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}