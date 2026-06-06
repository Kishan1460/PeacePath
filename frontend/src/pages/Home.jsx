import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center max-w-3xl mx-auto py-12 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          A small step toward <span className="text-emerald-600">wellness starts today</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Track your emotional landscape, pen your thoughts, and converse with an AI companion tailored to your mental well-being.
        </p>
        <div>
          <Link to="/mood" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            Start Your Wellness Journey
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-2xl shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
          <p className="text-gray-600">Log your daily emotions visually and uncover pattern trends over time.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">✍️</div>
          <h3 className="text-xl font-semibold mb-2">Guided Journal</h3>
          <p className="text-gray-600">A secure space to empty your mind and save your core life reflections.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-xs border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="text-xl font-semibold mb-2">AI Companion</h3>
          <p className="text-gray-600">Engage in mindful, non-judgmental conversations whenever you need a listening ear.</p>
        </div>
      </section>
    </div>
  );
}