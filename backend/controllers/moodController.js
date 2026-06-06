import Mood from '../models/Mood.js';

export const addMood = async (req, res, next) => {
  try {
    const { moodType, note, date } = req.body;
    if (!moodType) {
      res.status(400);
      throw new Error('Mood metric type indicator classification is required');
    }

    const mood = await Mood.create({ userId: req.user._id, moodType, note, date });
    res.status(201).json({ success: true, data: mood });
  } catch (error) { next(error); }
};

export const getMoods = async (req, res, next) => {
  try {
    const moods = await Mood.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ success: true, count: moods.length, data: moods });
  } catch (error) { next(error); }
};

export const deleteMood = async (req, res, next) => {
  try {
    const mood = await Mood.findById(req.params.id);
    if (!mood) {
      res.status(404);
      throw new Error('Mood log entry resource location not found');
    }

    if (mood.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User identity verification failed for this data object');
    }

    await mood.deleteOne();
    res.json({ success: true, message: 'Mood log entry dropped successfully' });
  } catch (error) { next(error); }
};