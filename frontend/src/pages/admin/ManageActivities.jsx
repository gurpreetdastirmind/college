import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageActivities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/activities/all');
      setItems(data.activities || []);
    } catch {
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await api.put(`/activities/${editing.id}`, formData);
        toast.success('Activity updated');
      } else {
        await api.post('/activities', formData);
        toast.success('Activity added');
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
    if (!window.confirm('Delete this activity?')) return;
    try {
      await api.delete(`/activities/${id}`);
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
      description: item.description || '',
      icon: item.icon || '',
      order: item.order || 0,
      is_active: item.is_active,
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Campus Life Activities</h1>
          <p className="text-gray-600 mt-1">Clubs like NSS, NCC, Eco Club shown on the site</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); reset(); }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Activity'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input {...register('name', { required: true })} placeholder="Activity Name (e.g., NSS) *" className="border rounded-lg px-4 py-2" />
            <input {...register('icon')} placeholder="Short Code (e.g., NSS, NCC)" className="border rounded-lg px-4 py-2" />
            <input type="number" {...register('order')} placeholder="Order (0, 1, 2...)" defaultValue={0} className="border rounded-lg px-4 py-2" />
            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <input type="checkbox" {...register('is_active')} defaultChecked />
              <span className="text-sm">Active (visible on site)</span>
            </label>
          </div>

          <textarea {...register('description')} rows="3" placeholder="Description" className="w-full border rounded-lg px-4 py-2"></textarea>

          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
            {editing ? 'Update Activity' : 'Save Activity'}
          </button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((a) => (
            <div key={a.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-primary text-lg">{a.name}</h3>
                {!a.is_active && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-sm text-gray-700 mb-3">{a.description}</p>
              <p className="text-xs text-gray-400 mb-3">Order: {a.order}</p>
              <div className="flex gap-3 pt-3 border-t">
                <button onClick={() => handleEdit(a)} className="text-blue-600 text-sm flex items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(a.id)} className="text-red-600 text-sm flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-500 col-span-3 text-center py-10">No activities yet.</p>}
        </div>
      )}
    </div>
  );
}