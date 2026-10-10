import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaFilePdf, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import api from '../../services/api';

const CATEGORIES = [
  { value: 'syllabus', label: 'Syllabus' },
  { value: 'time-table', label: 'Time Table' },
  { value: 'academic-calendar', label: 'Academic Calendar' },
  { value: 'e-content', label: 'e-Content' },
  { value: 'examination', label: 'Examination' },
  { value: 'results', label: 'Results' },
  { value: 'programme-outcomes', label: 'Programme Outcomes' },
];

export default function ManageAcademics() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('');
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  const load = async () => {
    try {
      const url = filter ? `/academics/all?category=${filter}` : '/academics/all';
      const { data } = await api.get(url);
      setItems(data.items || []);
    } catch {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const onSubmit = async (formData) => {
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('category', formData.category);
    fd.append('folder_name', formData.folder_name || '');
    fd.append('subcategory', formData.subcategory || '');
    fd.append('description', formData.description || '');
    fd.append('link_url', formData.link_url || '');
    fd.append('publish_date', formData.publish_date || '');
    if (formData.pdf?.[0]) fd.append('pdf', formData.pdf[0]);

    try {
      if (editing) {
        await api.put(`/academics/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Updated');
      } else {
        await api.post('/academics', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Added');
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
    if (!window.confirm('Delete this resource?')) return;
    try {
      await api.delete(`/academics/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    reset({
      title: item.title,
      category: item.category,
      folder_name: item.folder_name || '',
      subcategory: item.subcategory || '',
      description: item.description || '',
      link_url: item.link_url || '',
      publish_date: item.publish_date || '',
    });
    setPreview(item.file_url || null);
    setShowForm(true);
  };

  const pdfFile = watch('pdf');
  useEffect(() => {
    if (pdfFile?.[0]) {
      const url = URL.createObjectURL(pdfFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfFile]);

  const resolveFile = (url) => {
    if (!url) return '#';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const base = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    return `${base}${url}`;
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Academic Resources</h1>
          <p className="text-gray-600 mt-1">Upload syllabus, time tables, calendar, etc.</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); setPreview(null); reset(); }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === '' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All ({items.length})
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === c.value ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input {...register('title', { required: true })} placeholder="Title (e.g., BBA Syllabus 2024) *" className="border rounded-lg px-4 py-2" />
            
            <select {...register('category', { required: true })} className="border rounded-lg px-4 py-2">
              <option value="">-- Select Category * --</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>

            {/* NEW: Folder Name Input */}
            <div className="relative">
              <FaFolder className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                {...register('folder_name')} 
                placeholder="Folder Name (e.g., BBA, Botany, Commerce) *" 
                className="w-full border rounded-lg pl-10 pr-4 py-2" 
              />
            </div>

            <input {...register('subcategory')} placeholder="Subcategory (e.g., Semester 1, B.Com)" className="border rounded-lg px-4 py-2" />
            <input type="date" {...register('publish_date')} className="border rounded-lg px-4 py-2" />
            <input {...register('link_url')} placeholder="External link (optional)" className="border rounded-lg px-4 py-2 md:col-span-2" />
            <textarea {...register('description')} rows="2" placeholder="Description (optional)" className="border rounded-lg px-4 py-2 md:col-span-2"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PDF File</label>
            <input type="file" accept="application/pdf" {...register('pdf')} />
            {preview && (
              <p className="text-xs text-green-600 mt-2">
                Current file: <a href={resolveFile(preview)} target="_blank" rel="noreferrer" className="underline">view</a>
              </p>
            )}
          </div>

          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
            {editing ? 'Update Resource' : 'Save Resource'}
          </button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-white text-sm">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Folder</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">File / Link</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{it.title}</td>
                  <td className="p-4 text-sm font-medium text-primary">
                    {it.folder_name ? `📁 ${it.folder_name}` : '—'}
                  </td>
                  <td className="p-4 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{it.category}</span>
                  </td>
                  <td className="p-4 text-sm">
                    {it.file_url && (
                      <a href={resolveFile(it.file_url)} target="_blank" rel="noreferrer" className="text-red-600 flex items-center gap-1">
                        <FaFilePdf /> PDF
                      </a>
                    )}
                    {it.link_url && (
                      <a href={it.link_url} target="_blank" rel="noreferrer" className="text-blue-600 flex items-center gap-1 mt-1">
                        <FaExternalLinkAlt /> Link
                      </a>
                    )}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{it.publish_date || '—'}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(it)} className="text-blue-600 p-2"><FaEdit /></button>
                    <button onClick={() => handleDelete(it.id)} className="text-red-600 p-2"><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="6" className="p-6 text-center text-gray-500">No resources yet. Click "Add Resource".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}