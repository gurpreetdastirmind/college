import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const load = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data.courses || data);
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await api.put(`/courses/${editing.id}`, formData);
        toast.success('Course updated');
      } else {
        await api.post('/courses', formData);
        toast.success('Course added');
      }
      reset();
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    }
  };

  const handleEdit = (course) => {
    setEditing(course);
    reset(course);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleCancel = () => {
    reset();
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Manage Courses</h1>
          <p className="text-gray-600 mt-1">Add, edit or remove courses</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditing(null); reset(); }}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
          <h2 className="font-bold text-lg text-primary mb-2">
            {editing ? 'Edit Course' : 'Add New Course'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input {...register('name', { required: true })} placeholder="Course Name (e.g., B.Ed)" className="border rounded-lg px-4 py-2" />
            <input {...register('stream', { required: true })} placeholder="Stream (e.g., Education)" className="border rounded-lg px-4 py-2" />
            <input {...register('duration', { required: true })} placeholder="Duration (e.g., 2 Years)" className="border rounded-lg px-4 py-2" />
            <input {...register('seats', { required: true })} type="number" placeholder="Seats" className="border rounded-lg px-4 py-2" />
            <input {...register('eligibility', { required: true })} placeholder="Eligibility" className="border rounded-lg px-4 py-2 md:col-span-2" />
            <input {...register('fees', { required: true })} placeholder="Fees (e.g., ₹45,000)" className="border rounded-lg px-4 py-2" />
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold">
            {editing ? 'Update Course' : 'Save Course'}
          </button>
        </form>
      )}

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary text-white text-sm">
              <tr>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Stream</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Seats</th>
                <th className="p-4 text-left">Fees</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{c.name}</td>
                  <td className="p-4 text-gray-600">{c.stream}</td>
                  <td className="p-4 text-gray-600">{c.duration}</td>
                  <td className="p-4 text-gray-600">{c.seats}</td>
                  <td className="p-4 text-accent font-semibold">{c.fees}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800 p-2">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800 p-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr><td colSpan="6" className="p-6 text-center text-gray-500">No courses yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}