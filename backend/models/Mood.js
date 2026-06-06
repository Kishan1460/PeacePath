import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moodType: { 
    type: String, 
    required: true, 
    enum: ['Happy', 'Sad', 'Stressed', 'Relaxed', 'Anxious', 'Calm'] 
  },
  note: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const Mood = mongoose.model('Mood', MoodSchema);
export default Mood;