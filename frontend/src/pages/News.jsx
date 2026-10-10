import { useState } from 'react';
import NoticeCard from '../components/NoticeCard';

export default function News() {
  const [filter, setFilter] = useState('All');

  const news = [
    { date: '25 Sep 2026', title: 'National Seminar on Modern Pedagogical Tools', category: 'Events', description: 'Two-day seminar on innovative teaching methods.' },
    { date: '20 Sep 2026', title: 'Admissions Open for Session 2026-27', category: 'Academic', description: 'Apply online for all UG and PG programs.', pdf_url: '#' },
    { date: '15 Sep 2026', title: 'Post-Matric Scholarship Deadline Extended', category: 'Academic', description: 'New last date: 30 Oct 2026.', pdf_url: '#' },
    { date: '10 Sep 2026', title: 'Annual Sports Meet 2026', category: 'Events', description: 'Inter-college sports competition from 5-7 Oct.' },
    { date: '05 Sep 2026', title: "Teacher's Day Celebration", category: 'Events', description: 'Cultural program organized by students.' },
  ];

  const cats = ['All', 'Academic', 'Events', 'Press'];
  const filtered = filter === 'All' ? news : news.filter(n => n.category === filter);

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">News & Events</h1>
          <p className="text-gray-200">Latest circulars and updates</p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                filter === c ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {filtered.map((n, i) => (
            <NoticeCard key={i} notice={n} />
          ))}
        </div>
      </div>
    </div>
  );
}