import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageHeroSlides() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/hero-slides/all');
      setItems(data.slides || data);
    } catch {
      toast.error('Failed to load slides');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (formData) => {
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('subtitle', formData.subtitle || '');
    fd.append('cta_label', formData.cta_label || '');
    fd.append('cta_link', formData.cta_link || '');
    fd.append('cta2_label', formData.cta2_label || '');
    fd.append('cta2_link', formData.cta2_link || '');
    fd.append('order', formData.order ?? 0);
    fd.append('is_active', formData.is_active ? 'true' : 'false');
    if (formData.image?.[0]) fd.append('image', formData.image[0]);

    try {
      if (editing) {
        await api.put(`/hero-slides/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Slide updated');
      } else {
        await api.post('/hero-slides', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Slide added');
      }
      reset();
      setPreview(null);
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this slide?')) return;
    try {
      await api.delete(`/hero-slides/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const handleEdit = (slide) => {
    setEditing(slide);
    reset({
      title: slide.title,
      subtitle: slide.subtitle || '',
      cta_label: slide.cta_label || '',
      cta_link: slide.cta_link || '',
      cta2_label: slide.cta2_label || '',
      cta2_link: slide.cta2_link || '',
      order: slide.order,
      is_active: slide.is_active,
    });
    setPreview(slide.image_url || null);
    setShowForm(true);
  };

  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile?.[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Hero Slider</h1>
          <p className="text-gray-600 mt-1">Manage homepage slides & images</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditing(null);
            setPreview(null);
            reset();
          }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Slide'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register('title', { required: true })}
              placeholder="Title *"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register('subtitle')}
              placeholder="Subtitle"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register('cta_label')}
              placeholder="Primary button label (e.g., Apply Now)"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register('cta_link')}
              placeholder="Primary button link (e.g., /admissions/apply)"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register('cta2_label')}
              placeholder="Secondary button label"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register('cta2_link')}
              placeholder="Secondary button link"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="number"
              {...register('order')}
              placeholder="Order (0, 1, 2...)"
              defaultValue={0}
              className="border rounded-lg px-4 py-2"
            />
            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <input type="checkbox" {...register('is_active')} defaultChecked />
              <span className="text-sm">Active (visible on site)</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Background Image (optional)
            </label>
            <input type="file" accept="image/*" {...register('image')} />
            {preview && (
              <div className="mt-3">
                <img
                  src={resolveImage(preview)}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg shadow"
                />
              </div>
            )}
          </div>

          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
            {editing ? 'Update Slide' : 'Save Slide'}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s) => {
            const img = resolveImage(s.image_url);
            return (
              <div
                key={s.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="aspect-video bg-gray-100 relative">
                  {img ? (
                    <img
                      src={img}
                      alt={s.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                      <FaImage className="text-3xl" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}
                  {!s.is_active && (
                    <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      Inactive
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                    #{s.order}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary truncate">{s.title}</h3>
                  {s.subtitle && (
                    <p className="text-xs text-gray-600 truncate">{s.subtitle}</p>
                  )}
                  <div className="flex gap-3 mt-3 pt-3 border-t text-sm">
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-blue-600 flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-600 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center py-10">
              No slides yet. Click "Add Slide" to create your first one.
            </p>
          )}
        </div>
      )}
    </div>
  );
}