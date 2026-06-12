import { useState, useEffect, useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ moods: 0, journals: 0, latestMood: 'None' });
  const [affirmation, setAffirmation] = useState({ text: 'Loading...', author: '' });
  const [exercises, setExercises] = useState([]);
  const [uiLoading, setUiLoading] = useState(true);
  const { API, user } = useContext(WellnessContext);

  useEffect(() => {
    const hydrateDashboardData = async () => {
      try {
        const [moodRes, journalRes, affirmationRes, exerciseRes] = await Promise.all([
          API.get('/moods'),
          API.get('/journals'),
          API.get('/api/affirmations'),
          API.get('/api/exercises')
        ]);

        const moodList = moodRes.data.data;
        setMetrics({
          moods: moodList.length,
          journals: journalRes.data.data.length,
          latestMood: moodList[0] ? moodList[0].moodType : 'Not logged yet'
        });

        setAffirmation({
          text: affirmationRes.data.affirmation,
          author: affirmationRes.data.author
        });

        setExercises(exerciseRes.data.data);
      } catch (err) {
        console.error('Error hydrating dashboard features:', err);
      } finally {
        setUiLoading(false);
      }
    };

    hydrateDashboardData();
  }, []);

  if (uiLoading) {
    return <div className="text-center mt-20 text-gray-500 font-medium">Loading your mindful space...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto px-2">
      {/* Welcome Banner Header */}
      <header className="bg-emerald-50 border border-emerald-100/50 p-6 rounded-2xl">
        <h1 className="text-3xl font-bold">Welcome Back, <span className="text-emerald-700">{user?.name}</span></h1>
        <p className="text-sm text-gray-600 mt-1">Here is your live mental well-being dashboard and personalized support toolkit.</p>
      </header>

      {/* Dynamic Third-Party Affirmation Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs relative overflow-hidden text-center max-w-3xl mx-auto">
        <span className="text-3xl text-emerald-200 block mb-2">“</span>
        <p className="text-lg font-medium text-gray-800 italic px-4">"{affirmation.text}"</p>
        <span className="text-xs text-emerald-600 block mt-2 font-semibold tracking-wider">— {affirmation.author}</span>
      </div>

      {/* Core Analytic Metric Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Recorded Moods</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-600">{metrics.moods}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cloud Journal Logs</h3>
          <p className="text-4xl font-bold mt-2 text-gray-800">{metrics.journals}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Latest Logged Feeling</h3>
          <p className="text-4xl font-bold mt-2 text-indigo-600">{metrics.latestMood}</p>
        </div>
      </div>

      {/* Mindful Activities & Structured Relaxation Guides Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Recommended Mindfulness Exercises</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exercises.map((ex) => (
            <div key={ex.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-md">{ex.type}</span>
                <span className="text-xs text-gray-400 font-medium">{ex.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800">{ex.title}</h3>
              <ol className="text-sm text-gray-600 space-y-1.5 pl-4 list-decimal">
                {ex.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}