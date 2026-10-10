import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaTrash, FaPlus, FaTimes, FaImage, FaUpload, FaLink, FaEdit,
} from 'react-icons/fa';
import api from '../../services/api';

const DEFAULT_CATEGORIES = [
  'Sports Day',
  'Youth Fest',
  'Seminars',
  'Convocation',
  'Cultural Events',
  'Annual Day',
];

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);          // ← NEW
  const [imageMode, setImageMode] = useState('file');
  const [categoryMode, setCategoryMode] = useState('select');
  const [preview, setPreview] = useState(null);
  const [customCats, setCustomCats] = useState([]);

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const allCategories = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...customCats,
      ...items.map((i) => i.category).filter(Boolean),
    ])
  );

  const load = async () => {
    try {
      const { data } = await api.get('/gallery');
      setItems(data.gallery || data || []);
    } catch {
      toast.error('Failed to load');
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ---------- SUBMIT (create OR update) ----------
  const onSubmit = async (formData) => {
    const fd = new FormData();
    fd.append('title', formData.title);

    const finalCategory =
      categoryMode === 'new' ? formData.new_category?.trim() : formData.category;

    if (!finalCategory) {
      toast.error('Please select or enter a category');
      return;
    }
    fd.append('category', finalCategory);

    if (categoryMode === 'new' && !allCategories.includes(finalCategory)) {
      setCustomCats((prev) => [...prev, finalCategory]);
    }

    // Image — required for create; optional for edit
    if (imageMode === 'file') {
      if (formData.image?.[0]) {
        fd.append('image', formData.image[0]);
      } else if (!editing) {
        toast.error('Please choose an image file');
        return;
      }
    } else {
      if (formData.image_url?.trim()) {
        fd.append('image_url', formData.image_url.trim());
      } else if (!editing) {
        toast.error('Please paste an image URL');
        return;
      }
    }

    try {
      if (editing) {
        await api.put(`/gallery/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Image updated');
      } else {
        await api.post('/gallery', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Image uploaded');
      }
      closeForm();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const closeForm = () => {
    reset();
    setPreview(null);
    setEditing(null);
    setImageMode('file');
    setCategoryMode('select');
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  // ---------- EDIT ----------
  const handleEdit = (item) => {
    setEditing(item);
    setShowForm(true);
    setPreview(item.image_url || null);

    // Determine image mode based on stored value
    const isRemote =
      item.image_url?.startsWith('http') ||
      item.image_url?.startsWith('data:');
    setImageMode(isRemote ? 'url' : 'file');

    // Category mode — if it's in dropdown, use select; else new
    if (allCategories.includes(item.category)) {
      setCategoryMode('select');
      reset({
        title: item.title,
        category: item.category,
        new_category: '',
        image: null,
        image_url: isRemote ? item.image_url : '',
      });
    } else {
      setCategoryMode('new');
      reset({
        title: item.title,
        category: '',
        new_category: item.category,
        image: null,
        image_url: isRemote ? item.image_url : '',
      });
    }
  };

  const imageFile = watch('image');
  const imageUrlField = watch('image_url');

  useEffect(() => {
    if (imageMode === 'file' && imageFile?.[0]) {
      const url = URL.createObjectURL(imageFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (imageMode === 'url' && imageUrlField) {
      setPreview(imageUrlField);
    }
  }, [imageFile, imageUrlField, imageMode]);

  const resolveImage = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
    const base =
      import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gallery</h1>
          <p className="text-gray-600 mt-1">
            {editing ? 'Edit image details' : 'Upload campus photos — from file or URL'}
          </p>
        </div>
        <button
          onClick={() => (showForm ? closeForm() : setShowForm(true))}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Upload'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-5"
        >
          <h2 className="font-bold text-lg text-primary">
            {editing ? '✏️ Edit Image' : '➕ Upload New Image'}
          </h2>

          {/* Title */}
          <input
            {...register('title', { required: true })}
            placeholder="Image Title"
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* Category */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Category</label>
              <button
                type="button"
                onClick={() => {
                  setCategoryMode(categoryMode === 'select' ? 'new' : 'select');
                  setValue('category', '');
                  setValue('new_category', '');
                }}
                className="text-xs text-primary hover:text-accent font-semibold flex items-center gap-1"
              >
                {categoryMode === 'select' ? (
                  <>
                    <FaPlus className="text-[10px]" /> Add New Category
                  </>
                ) : (
                  <>
                    <FaTimes className="text-[10px]" /> Choose from list
                  </>
                )}
              </button>
            </div>

            {categoryMode === 'select' ? (
              <select
                {...register('category', { required: categoryMode === 'select' })}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">-- Select Category --</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register('new_category', { required: categoryMode === 'new' })}
                placeholder="Type new category"
                className="w-full border rounded-lg px-4 py-2"
              />
            )}
          </div>

          {/* Image Source */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Image Source {editing && <span className="text-xs text-gray-500">(leave empty to keep current)</span>}
            </label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  setImageMode('file');
                  setPreview(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  imageMode === 'file'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FaUpload /> Upload File
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageMode('url');
                  setPreview(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  imageMode === 'url'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FaLink /> Paste Image URL
              </button>
            </div>

            {imageMode === 'file' ? (
              <input
                type="file"
                accept="image/*"
                {...register('image')}
                className="w-full"
              />
            ) : (
              <input
                type="url"
                {...register('image_url')}
                placeholder="https://example.com/photo.jpg"
                className="w-full border rounded-lg px-4 py-2"
              />
            )}
          </div>

          {preview && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <img
                src={resolveImage(preview)}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg shadow"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="flex gap-3">
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
              {editing ? 'Update Image' : 'Upload'}
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

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((g) => {
          const img = resolveImage(g.image_url);
          return (
            <div
              key={g.id}
              className="relative group bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="aspect-square bg-gray-100">
                {img ? (
                  <img
                    src={img}
                    alt={g.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/300?text=Image+Error';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaImage className="text-4xl text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold truncate">{g.title}</p>
                <p className="text-xs text-gray-500">{g.category}</p>
              </div>

              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(g)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(g.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="text-gray-500 col-span-4 text-center py-6">No images yet</p>
        )}
      </div>
    </div>
  );
}