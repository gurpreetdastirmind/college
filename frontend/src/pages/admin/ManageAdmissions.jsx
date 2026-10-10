// pages/admin/ManageAdmissions.jsx
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaEdit, FaTrash, FaPlus, FaTimes, FaFilePdf,
  FaExternalLinkAlt, FaUpload, FaLink,
} from 'react-icons/fa';
import api from '../../services/api';

export default function ManageAdmissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [sourceMode, setSourceMode] = useState('file'); // 'file' | 'url'
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/admissions/all');
      setItems(data.admissions || []);
    } catch {
      toast.error('Failed to load admissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('description', formData.description || '');
    fd.append('academic_year', formData.academic_year || '');
    fd.append('publish_date', formData.publish_date || '');
    fd.append('is_active', formData.is_active ? 'true' : 'false');

    if (sourceMode === 'file') {
      if (formData.pdf?.[0]) {
        fd.append('pdf', formData.pdf[0]);
      } else if (!editing) {
        toast.error('Please choose a PDF file');
        return;
      }
    } else {
      if (formData.link_url?.trim()) {
        fd.append('link_url', formData.link_url.trim());
      } else if (!editing) {
        toast.error('Please paste a PDF URL');
        return;
      }
    }

    try {
      if (editing) {
        await api.put(`/admissions/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Admission PDF updated');
      } else {
        await api.post('/admissions', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Admission PDF uploaded');
      }
      closeForm();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const closeForm = () => {
    reset();
    setPreview(null);
    setEditing(null);
    setSourceMode('file');
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this PDF?')) return;
    try {
      await api.delete(`/admissions/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setShowForm(true);
    const isRemote = item.link_url && !item.file_url;
    setSourceMode(isRemote ? 'url' : 'file');
    reset({
      title: item.title,
      description: item.description || '',
      academic_year: item.academic_year || '',
      publish_date: item.publish_date || '',
      link_url: isRemote ? item.link_url : '',
      is_active: item.is_active,
    });
    setPreview(item.file_url || item.link_url || null);
  };

  const pdfFile = watch('pdf');
  useEffect(() => {
    if (sourceMode === 'file' && pdfFile?.[0]) {
      const url = URL.createObjectURL(pdfFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfFile, sourceMode]);

  const resolveFile = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Admissions</h1>
          <p className="text-gray-600 mt-1">Upload admission notification PDFs & forms</p>
        </div>
        <button
          onClick={() => (showForm ? closeForm() : setShowForm(true))}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Upload PDF'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-5">
          <h2 className="font-bold text-lg text-primary">
            {editing ? '✏️ Edit Admission PDF' : '➕ Upload Admission PDF'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register('title', { required: true })}
              placeholder="Title (e.g., Admission Notice 2026-27) *"
              className="border rounded-lg px-4 py-2 md:col-span-2"
            />
            <input
              {...register('academic_year')}
              placeholder="Academic Year (e.g., 2026-27)"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="date"
              {...register('publish_date')}
              className="border rounded-lg px-4 py-2"
            />
            <textarea
              {...register('description')}
              rows="2"
              placeholder="Short description (optional)"
              className="border rounded-lg px-4 py-2 md:col-span-2"
            />
            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg md:col-span-2">
              <input type="checkbox" {...register('is_active')} defaultChecked />
              <span className="text-sm">Active (visible on public site)</span>
            </label>
          </div>

          {/* PDF source toggle */}
          <div>
            <label className="block text-sm font-medium mb-2">
              PDF Source {editing && <span className="text-xs text-gray-500">(leave empty to keep current)</span>}
            </label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => { setSourceMode('file'); setPreview(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  sourceMode === 'file'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FaUpload /> Upload PDF
              </button>
              <button
                type="button"
                onClick={() => { setSourceMode('url'); setPreview(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition ${
                  sourceMode === 'url'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FaLink /> Paste PDF URL
              </button>
            </div>

            {sourceMode === 'file' ? (
              <input type="file" accept="application/pdf" {...register('pdf')} className="w-full" />
            ) : (
              <input
                type="url"
                {...register('link_url')}
                placeholder="https://example.com/admission.pdf"
                className="w-full border rounded-lg px-4 py-2"
              />
            )}
          </div>

          {preview && (
            <p className="text-xs text-gray-500">
              Current file:{' '}
              <a href={resolveFile(preview)} target="_blank" rel="noreferrer" className="underline text-primary">
                view
              </a>
            </p>
          )}

          <div className="flex gap-3">
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
              {editing ? 'Update' : 'Save'}
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
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-white text-sm">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Year</th>
                <th className="p-4 text-left">File / Link</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{it.title}</td>
                  <td className="p-4 text-sm">{it.academic_year || '—'}</td>
                  <td className="p-4 text-sm">
                    {it.file_url && (
                      <a href={resolveFile(it.file_url)} target="_blank" rel="noreferrer" className="text-red-600 flex items-center gap-1">
                        <FaFilePdf /> PDF
                      </a>
                    )}
                    {it.link_url && !it.file_url && (
                      <a href={it.link_url} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1">
                        <FaExternalLinkAlt /> Link
                      </a>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{it.publish_date || '—'}</td>
                  <td className="p-4 text-sm">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      it.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {it.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(it)} className="text-blue-600 p-2"><FaEdit /></button>
                    <button onClick={() => handleDelete(it.id)} className="text-red-600 p-2"><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="6" className="p-6 text-center text-gray-500">No admission PDFs yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}