import { useState, useEffect, useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ moods: 0, journals: 0, latestMood: 'None' });
  const { API, user } = useContext(WellnessContext);

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const [moodRes, journalRes] = await Promise.all([
          API.get('/moods'),
          API.get('/journals')
        ]);
        const moodList = moodRes.data.data;
        setMetrics({
          moods: moodList.length,
          journals: journalRes.data.data.length,
          latestMood: moodList[0] ? moodList[0].moodType : 'Not logged yet'
        });
      } catch (err) { console.error('Error hydrating structural summaries.'); }
    };
    fetchDashboardSummary();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">Welcome Back, <span className="text-emerald-700">{user?.name}</span></h1>
        <p className="text-gray-500">Here is your live mental well-being dashboard data overview tracking matrix.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Recorded Moods</h3>
          <p className="text-4xl font-bold mt-2 text-emerald-600">{metrics.moods}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Cloud Journal Logs</h3>
          <p className="text-4xl font-bold mt-2 text-gray-800">{metrics.journals}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Latest Logged Feeling</h3>
          <p className="text-4xl font-bold mt-2 text-indigo-600">{metrics.latestMood}</p>
        </div>
      </div>
    </div>
  );
}