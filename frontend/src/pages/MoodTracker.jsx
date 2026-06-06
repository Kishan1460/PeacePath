import { useState, useEffect, useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';

const MOODS = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-100 border-green-400' },
  { emoji: '😌', label: 'Relaxed', color: 'bg-blue-100 border-blue-400' },
  { emoji: '😐', label: 'Calm', color: 'bg-gray-100 border-gray-400' },
  { emoji: '😰', label: 'Stressed', color: 'bg-purple-100 border-purple-400' },
  { emoji: '😢', label: 'Sad', color: 'bg-indigo-100 border-indigo-400' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState([]);
  const { API } = useContext(WellnessContext);

  const fetchMoodHistory = async () => {
    try {
      const res = await API.get('/moods');
      setHistory(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMoodHistory(); }, []);

  const handleSaveMood = async (e) => {
    e.preventDefault();
    if (!selectedMood) return alert("Please select a mood.");
    try {
      await API.post('/moods', { moodType: selectedMood, note });
      setNote('');
      setSelectedMood(null);
      fetchMoodHistory();
    } catch (err) { alert("Error saving mood."); }
  };

  const handleDeleteMood = async (id) => {
    try {
      await API.delete(`/moods/${id}`);
      fetchMoodHistory();
    } catch (err) { alert("Failed to delete log entry."); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in px-2">
      {/* 
        CHANGED: Shifted main breakpoint to lg-grid instead of md-grid.
        This prevents cards from becoming squished columns on small laptops/tablets.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Card Form */}
        <form onSubmit={handleSaveMood} className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">How are you feeling today?</h2>
            
            {/* 
              FIXED DESIGN SYSTEM GRID:
              No matter the size, emojis now stick to a uniform 5-column grid track layout.
              They scale seamlessly down together without breaking positions or splitting rows.
            */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full justify-items-center">
              {MOODS.map((m) => (
                <button 
                  key={m.label} 
                  type="button" 
                  onClick={() => setSelectedMood(m.label)}
                  className={`w-full max-w-16 aspect-square text-2xl sm:text-3xl flex items-center justify-center rounded-xl transition-all border-2 shrink-0 ${
                    selectedMood === m.label 
                      ? m.color + ' scale-110 shadow-xs' 
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                  title={m.label}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <textarea 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              rows="3"
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 resize-none" 
              placeholder="What's causing this emotion?..." 
            />
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl cursor-pointer transition-colors">
              Save Log
            </button>
          </div>
        </form>

        {/* History Log Feed Display */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col space-y-4">
          <h2 className="text-xl font-bold">Mood Tracking Log Feed</h2>
          <div className="overflow-y-auto max-h-[360px] space-y-3 pr-1">
            {history.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No cloud metrics saved yet.</p>
            ) : (
              history.map((item) => (
                <div key={item._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <span className="font-semibold text-emerald-700 text-sm">{item.moodType}</span>
                    <p className="text-sm text-gray-600 mt-0.5">{item.note || <span className="text-gray-300 italic">No notes attached</span>}</p>
                    <span className="text-[11px] text-gray-400 block mt-1">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <button onClick={() => handleDeleteMood(item._id)} className="text-red-400 hover:text-red-600 text-xs font-semibold cursor-pointer p-2">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}