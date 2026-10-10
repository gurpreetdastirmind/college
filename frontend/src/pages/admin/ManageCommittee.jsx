import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageCommittee() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/committees/all');
      setItems(data.committees || []);
    } catch {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('role', formData.role);
    fd.append('order', formData.order || 0);
    fd.append('is_active', formData.is_active ? 'true' : 'false');
    if (formData.image?.[0]) fd.append('image', formData.image[0]);

    try {
      if (editing) {
        await api.put(`/committees/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Member updated');
      } else {
        await api.post('/committees', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Member added');
      }
      reset();
      setPreview(null);
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await api.delete(`/committees/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    reset({
      name: item.name,
      role: item.role,
      order: item.order,
      is_active: item.is_active,
    });
    setPreview(item.image_url || null);
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

  const closeForm = () => {
    reset();
    setPreview(null);
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Managing Committee</h1>
          <p className="text-gray-600 mt-1">Manage the Pillars of the Institution</p>
        </div>
        <button
          onClick={() => (showForm ? closeForm() : setShowForm(true))}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register('name', { required: true })}
              placeholder="Full Name *"
              className="border rounded-lg px-4 py-2"
            />
            <input
              {...register('role', { required: true })}
              placeholder="Role (e.g., President) *"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="number"
              {...register('order')}
              placeholder="Display Order (0, 1, 2...)"
              defaultValue={0}
              className="border rounded-lg px-4 py-2"
            />
            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <input type="checkbox" {...register('is_active')} defaultChecked />
              <span className="text-sm">Active (visible on site)</span>
            </label>
          </div>

          {/* ============ PHOTO UPLOAD ============ */}
          <div>
            <label className="block text-sm font-medium mb-2">Member Photo</label>

            <div className="flex items-center gap-5">
              {/* Preview — 96×96 with object-top so the face is fully visible */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                {preview ? (
                  <img
                    src={resolveImage(preview)}
                    alt="Preview"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/96?text=Error';
                    }}
                  />
                ) : (
                  <FaImage className="text-2xl text-gray-300" />
                )}
              </div>

              {/* File input + remove */}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WEBP — recommended 400×400px or larger
                </p>
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      reset({ ...watch(), image: null });
                    }}
                    className="mt-2 text-xs text-red-600 hover:underline flex items-center gap-1"
                  >
                    <FaTimes className="text-[10px]" /> Remove photo
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* ============ END PHOTO UPLOAD ============ */}

          <div className="flex gap-3">
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
              {editing ? 'Update Member' : 'Save Member'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={closeForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2.5 rounded-lg font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((m) => {
            const img = resolveImage(m.image_url);
            return (
              <div
                key={m.id}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center border-t-4 border-accent"
              >
                {/* Card avatar — 96×96 with object-top */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-blue-100 bg-gray-100 flex items-center justify-center">
                  {img ? (
                    <img
                      src={img}
                      alt={m.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <FaImage className="text-2xl text-gray-400" />
                  )}
                </div>
                <h3 className="font-bold text-primary text-lg">{m.name}</h3>
                <p className="text-accent text-sm font-semibold">{m.role}</p>
                <p className="text-xs text-gray-500 mt-1">Order: {m.order}</p>
                <div className="flex gap-3 mt-4 pt-3 border-t w-full justify-center">
                  <button
                    onClick={() => handleEdit(m)}
                    className="text-blue-600 flex items-center gap-1 text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-600 flex items-center gap-1 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center py-10">No members added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}