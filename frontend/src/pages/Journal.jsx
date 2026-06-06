import { useState, useEffect, useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodContext, setMoodContext] = useState('Neutral');
  const [editingId, setEditingId] = useState(null);

  const { API } = useContext(WellnessContext);

  const fetchJournals = async () => {
    try {
      const res = await API.get('/journals');
      setEntries(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setMoodContext('Neutral');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        await API.put(`/journals/${editingId}`, {
          title,
          content,
          moodContext,
        });
      } else {
        await API.post('/journals', {
          title,
          content,
          moodContext,
        });
      }

      resetForm();
      fetchJournals();
    } catch (err) {
      console.error(err);
      alert('Failed to save journal entry.');
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setTitle(entry.title);
    setContent(entry.content);
    setMoodContext(entry.moodContext);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this journal entry?'
    );

    if (!confirmed) return;

    try {
      await API.delete(`/journals/${id}`);
      fetchJournals();

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      alert('Could not delete journal entry.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Journal Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4"
      >
        <h2 className="text-2xl font-bold">
          {editingId
            ? 'Update Your Journal Entry'
            : 'Write a Mindful Journal Entry'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry Title"
            required
            className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <select
            value={moodContext}
            onChange={(e) => setMoodContext(e.target.value)}
            className="p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option>Neutral</option>
            <option>Happy</option>
            <option>Sad</option>
            <option>Anxious</option>
            <option>Relaxed</option>
          </select>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          placeholder="Empty your thoughts onto the page here..."
          required
          className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl cursor-pointer"
          >
            {editingId ? 'Update Entry' : 'Commit to Cloud Log'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Journal Entries */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">
          Your Saved Journal Entries ({entries.length})
        </h2>

        {entries.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-gray-500">
            No journal entries yet. Start writing your first one.
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex justify-between items-start"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex gap-2 items-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {entry.title}
                  </h3>

                  <span className="text-xs px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                    {entry.moodContext}
                  </span>
                </div>

                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {entry.content}
                </p>

                <span className="text-xs text-gray-400 block">
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-4 ml-4">
                <button
                  onClick={() => handleEdit(entry)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(entry._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  Erase
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}