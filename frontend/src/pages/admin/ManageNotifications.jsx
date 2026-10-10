import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaFilePdf } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/notifications');
      setItems(data.notifications || data);
    } catch {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    const fd = new FormData();
    Object.keys(formData).forEach(k => {
      if (k === 'pdf' && formData.pdf?.[0]) {
        fd.append('pdf', formData.pdf[0]);
      } else {
        fd.append(k, formData[k]);
      }
    });

    try {
      if (editing) {
        await api.put(`/notifications/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Updated');
      } else {
        await api.post('/notifications', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Added');
      }
      reset();
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      await api.delete(`/notifications/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage circulars and notices</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); reset(); }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Notice'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <input {...register('title', { required: true })} placeholder="Notice Title" className="w-full border rounded-lg px-4 py-2" />
          <textarea {...register('description')} rows="3" placeholder="Description" className="w-full border rounded-lg px-4 py-2"></textarea>
          <div className="grid md:grid-cols-2 gap-4">
            <select {...register('category', { required: true })} className="border rounded-lg px-4 py-2">
              <option value="">-- Select Category --</option>
              <option value="admission">Admission</option>
              <option value="exam">Exam</option>
              <option value="event">Event</option>
              <option value="scholarship">Scholarship</option>
              <option value="general">General</option>
            </select>
            <input type="date" {...register('publish_date', { required: true })} className="border rounded-lg px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">PDF (Optional)</label>
            <input type="file" accept="application/pdf" {...register('pdf')} className="w-full" />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
            {editing ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="space-y-3">
          {items.map((n) => (
            <div key={n.id} className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center gap-4">
              <div className="flex-1">
                <div className="flex gap-2 items-center mb-1">
                  <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                    {n.category}
                  </span>
                  <span className="text-xs text-gray-500">{n.publish_date}</span>
                </div>
                <h3 className="font-bold text-primary">{n.title}</h3>
                {n.description && <p className="text-sm text-gray-600 line-clamp-1">{n.description}</p>}
                {n.pdf_url && (
                  <a href={n.pdf_url} className="text-red-600 text-xs flex items-center gap-1 mt-1">
                    <FaFilePdf /> Download PDF
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(n); reset(n); setShowForm(true); }} className="text-blue-600 p-2">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(n.id)} className="text-red-600 p-2">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-center text-gray-500 py-6">No notifications yet</p>}
        </div>
      )}
    </div>
  );
}