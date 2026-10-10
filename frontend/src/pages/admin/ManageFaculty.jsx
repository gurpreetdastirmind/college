import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageFaculty() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/faculty');
      setItems(data.faculty || data);
    } catch {
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await api.put(`/faculty/${editing.id}`, formData);
        toast.success('Updated');
      } else {
        await api.post('/faculty', formData);
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
    if (!window.confirm('Delete this faculty member?')) return;
    try {
      await api.delete(`/faculty/${id}`);
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
          <h1 className="text-3xl font-bold text-primary">Faculty Members</h1>
          <p className="text-gray-600 mt-1">Manage teaching staff profiles</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); reset(); }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Faculty'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input {...register('name', { required: true })} placeholder="Full Name" className="border rounded-lg px-4 py-2" />
            <input {...register('designation', { required: true })} placeholder="Designation" className="border rounded-lg px-4 py-2" />
            <input {...register('dept', { required: true })} placeholder="Department" className="border rounded-lg px-4 py-2" />
            <input {...register('qual', { required: true })} placeholder="Qualification" className="border rounded-lg px-4 py-2" />
            <input {...register('exp', { required: true })} placeholder="Experience (e.g., 10 Years)" className="border rounded-lg px-4 py-2" />
            <input {...register('email', { required: true })} type="email" placeholder="Email" className="border rounded-lg px-4 py-2" />
          </div>
          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold">
            {editing ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {loading ? <p>Loading...</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t.id} className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="font-bold text-primary">{t.name}</h3>
              <p className="text-sm text-accent">{t.designation}</p>
              <p className="text-xs text-gray-600 mt-1">Dept: {t.dept}</p>
              <p className="text-xs text-gray-600">{t.qual}</p>
              <p className="text-xs text-gray-600">{t.exp}</p>
              <p className="text-xs text-gray-500 mt-1">{t.email}</p>
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <button onClick={() => { setEditing(t); reset(t); setShowForm(true); }} className="text-blue-600 text-sm flex items-center gap-1">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(t.id)} className="text-red-600 text-sm flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-500 col-span-3 text-center">No faculty yet</p>}
        </div>
      )}
    </div>
  );
}