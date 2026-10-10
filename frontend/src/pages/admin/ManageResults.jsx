import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageResults() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/results');
      setItems(data.results || data);
    } catch {
      toast.error('Failed to load');
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    try {
      await api.post('/results', formData);
      toast.success('Result uploaded');
      reset();
      setShowForm(false);
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this result?')) return;
    try {
      await api.delete(`/results/${id}`);
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
          <h1 className="text-3xl font-bold text-primary">Manage Results</h1>
          <p className="text-gray-600 mt-1">Upload student results</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); reset(); }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Result'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 grid md:grid-cols-2 gap-4">
          <input {...register('roll_no', { required: true })} placeholder="Roll No" className="border rounded-lg px-4 py-2" />
          <input {...register('student_name', { required: true })} placeholder="Student Name" className="border rounded-lg px-4 py-2" />
          <input {...register('course_id', { required: true })} placeholder="Course ID" className="border rounded-lg px-4 py-2" />
          <input {...register('semester', { required: true })} placeholder="Semester" className="border rounded-lg px-4 py-2" />
          <input {...register('marks', { required: true })} placeholder="Marks / Grade" className="border rounded-lg px-4 py-2" />
          <input {...register('status', { required: true })} placeholder="Pass / Fail" className="border rounded-lg px-4 py-2" />
          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold md:col-span-2">
            Save Result
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary text-white text-sm">
            <tr>
              <th className="p-4 text-left">Roll No</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Semester</th>
              <th className="p-4 text-left">Marks</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono">{r.roll_no}</td>
                <td className="p-4">{r.student_name}</td>
                <td className="p-4">{r.semester}</td>
                <td className="p-4">{r.marks}</td>
                <td className="p-4">
                  <span className={r.status === 'Pass' ? 'text-green-600' : 'text-red-600'}>
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(r.id)} className="text-red-600 p-2">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan="6" className="p-6 text-center text-gray-500">No results</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}