import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: [true, 'Journal title is required'] },
  content: { type: String, required: [true, 'Journal content body is required'] },
  moodContext: { type: String, default: 'Neutral' }
}, { timestamps: true });

const Journal = mongoose.model('Journal', JournalSchema);
export default Journal;