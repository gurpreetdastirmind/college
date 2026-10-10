import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Alumni() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success('Registration submitted! We will connect soon.');
    reset();
  };

  const alumni = [
    { name: 'Dr. Manpreet Kaur', batch: '2005', role: 'IAS Officer', place: 'Punjab Cadre' },
    { name: 'Sh. Harmeet Singh', batch: '2008', role: 'Entrepreneur', place: 'Chandigarh' },
    { name: 'Ms. Jaspreet Kaur', batch: '2010', role: 'Professor', place: 'Panjab University,Chandigarh' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Alumni Association</h1>
          <p className="text-gray-200">Once a student, always a family member</p>
        </div>
      </section>

      <div className="container-custom py-12 space-y-12">
        {/* Distinguished Alumni */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Distinguished Alumni</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {alumni.map((a, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="w-20 h-20 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {a.name.split(' ').pop()[0]}
                </div>
                <h3 className="font-bold text-primary">{a.name}</h3>
                <p className="text-sm text-gray-600">Batch {a.batch}</p>
                <p className="text-sm text-accent font-semibold mt-1">{a.role}</p>
                <p className="text-xs text-gray-500">{a.place}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Register as Alumni</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow space-y-4">
            <input
              {...register('name', { required: true })}
              placeholder="Full Name *"
              className="w-full border rounded-lg px-4 py-2"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register('batch', { required: true })}
                placeholder="Batch Year *"
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                {...register('course', { required: true })}
                placeholder="Course Studied *"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <input
              {...register('current_role')}
              placeholder="Current Designation & Company"
              className="w-full border rounded-lg px-4 py-2"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="Email *"
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                {...register('phone')}
                placeholder="Phone"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <button className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-yellow-600">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}