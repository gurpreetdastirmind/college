import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from the backend ROOT (one folder up from seed/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { connectDB, sequelize } from '../config/db.js';
import {
  User, Course, Department, Faculty, Notification, Committee, Gallery,
} from '../models/index.js';

const seed = async () => {
  await connectDB();

  try {
    // Clear existing (optional, uncomment to wipe)
    // await sequelize.sync({ force: true });

    // 1. Admin user
    const [adminUser, created] = await User.findOrCreate({
      where: { email: 'admin@college.ac.in' },
      defaults: {
        name: 'Admin',
        email: 'admin@college.ac.in',
        password: 'admin123',
        role: 'admin',
      },
    });
    console.log(created ? '✅ Admin user created' : 'ℹ️ Admin already exists');

    // 2. Courses
    const courseCount = await Course.count();
    if (courseCount === 0) {
      await Course.bulkCreate([
        { name: 'B.Ed', stream: 'Education', duration: '2 Years', seats: 100, eligibility: 'Graduation 50%', fees: '₹45,000' },
        { name: 'B.A.', stream: 'Arts', duration: '3 Years', seats: 120, eligibility: '10+2 any', fees: '₹25,000' },
        { name: 'B.Com', stream: 'Commerce', duration: '3 Years', seats: 60, eligibility: '10+2 Comm/Maths', fees: '₹30,000' },
        { name: 'BCA', stream: 'Computer', duration: '3 Years', seats: 60, eligibility: '10+2 40%', fees: '₹40,000' },
        { name: 'M.Ed', stream: 'Education', duration: '2 Years', seats: 50, eligibility: 'B.Ed 50%', fees: '₹55,000' },
        { name: 'M.Com', stream: 'Commerce', duration: '2 Years', seats: 40, eligibility: 'B.Com 50%', fees: '₹45,000' },
      ]);
      console.log('✅ Courses seeded');
    }

    // 3. Departments
    const deptCount = await Department.count();
    if (deptCount === 0) {
      await Department.bulkCreate([
        { name: 'Department of Education', hod: 'Dr. Gurpreet Singh' },
        { name: 'Department of Arts', hod: 'Dr. Harpreet Kaur' },
        { name: 'Department of Commerce', hod: 'Prof. Rajesh Kumar' },
        { name: 'Department of Computer Applications', hod: 'Prof. Simran Kaur' },
        { name: 'Department of Science', hod: 'Dr. Amandeep Singh' },
      ]);
      console.log('✅ Departments seeded');
    }

    // 4. Faculty
    const facCount = await Faculty.count();
    if (facCount === 0) {
      await Faculty.bulkCreate([
        { name: 'Dr. Gurpreet Singh', designation: 'Principal', dept: 'Education', qualification: 'M.Ed, Ph.D.', exp: '20 Years', email: 'principal@college.ac.in' },
        { name: 'Dr. Harpreet Kaur', designation: 'HOD', dept: 'Arts', qualification: 'M.A., Ph.D.', exp: '15 Years', email: 'harpreet@college.ac.in' },
        { name: 'Prof. Rajesh Kumar', designation: 'Assistant Professor', dept: 'Commerce', qualification: 'M.Com, NET', exp: '10 Years', email: 'rajesh@college.ac.in' },
        { name: 'Prof. Simran Kaur', designation: 'Assistant Professor', dept: 'Computer', qualification: 'MCA, NET', exp: '8 Years', email: 'simran@college.ac.in' },
        { name: 'Dr. Amandeep Singh', designation: 'HOD', dept: 'Science', qualification: 'M.Sc., Ph.D.', exp: '12 Years', email: 'amandeep@college.ac.in' },
      ]);
      console.log('✅ Faculty seeded');
    }

    // 5. Notifications
    const notifCount = await Notification.count();
    if (notifCount === 0) {
      await Notification.bulkCreate([
        { title: 'Admissions Open for Session 2026-27', category: 'admission', publish_date: '2026-09-20', description: 'Apply online for all UG and PG programs.' },
        { title: 'Semester Exam Date Sheet Released', category: 'exam', publish_date: '2026-09-22', description: 'Download date sheet from portal.' },
        { title: 'Post-Matric Scholarship Deadline Extended', category: 'scholarship', publish_date: '2026-09-15', description: 'New last date: 30 Oct 2026.' },
        { title: 'National Seminar on Modern Pedagogy', category: 'event', publish_date: '2026-09-25', description: 'Two-day seminar on innovative teaching methods.' },
      ]);
      console.log('✅ Notifications seeded');
    }

    // 6. Committees
    const comCount = await Committee.count();
    if (comCount === 0) {
      await Committee.bulkCreate([
        { name: 'Anti-Ragging Cell', incharge_name: 'Dr. Gurpreet Singh', phone: '+91 98765 43210', email: 'antiragging@college.ac.in' },
        { name: 'Internal Complaints Committee', incharge_name: 'Dr. Harpreet Kaur', phone: '+91 98765 43211', email: 'icc@college.ac.in' },
        { name: 'Student Grievance Redressal Cell', incharge_name: 'Prof. Rajesh Kumar', phone: '+91 98765 43212', email: 'grievance@college.ac.in' },
        { name: 'SC/ST Cell', incharge_name: 'Dr. Amandeep Singh', phone: '+91 98765 43213', email: 'scst@college.ac.in' },
      ]);
      console.log('✅ Committees seeded');
    }


    // 7. Activities (Campus Life)
    const activityCount = await Activity.count();
    if (activityCount === 0) {
      await Activity.bulkCreate([
        { name: 'NSS', icon: 'NSS', description: 'National Service Scheme - social work, blood donation drives, tree plantation.', order: 1 },
        { name: 'NCC', icon: 'NCC', description: 'National Cadet Corps - discipline, leadership, and adventure training.', order: 2 },
        { name: 'Red Ribbon Club', icon: 'RRC', description: 'Health awareness and AIDS prevention initiatives.', order: 3 },
        { name: 'Eco Club', icon: 'ECO', description: 'Environmental conservation projects and cleanliness drives.', order: 4 },
        { name: 'Cultural Club', icon: 'CLT', description: 'Giddha, Bhangra, debates, declamations, and youth festivals.', order: 5 },
        { name: 'Sports Club', icon: 'SPT', description: 'Annual sports meets, inter-college tournaments, and fitness programs.', order: 6 },
      ]);
      console.log('✅ Activities seeded');
    }

    console.log('\n🎉 Seeding complete!');
    console.log('🔐 Admin login: admin@college.ac.in / admin123\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seed();