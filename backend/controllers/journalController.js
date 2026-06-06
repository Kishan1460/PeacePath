import Journal from '../models/Journal.js';

export const createJournal = async (req, res, next) => {
  try {
    const { title, content, moodContext } = req.body;
    if (!title || !content) {
      res.status(400);
      throw new Error('Missing core journal fields (Title/Content)');
    }

    const journal = await Journal.create({ userId: req.user._id, title, content, moodContext });
    res.status(201).json({ success: true, data: journal });
  } catch (error) { next(error); }
};

export const getJournals = async (req, res, next) => {
  try {
    const journals = await Journal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: journals.length, data: journals });
  } catch (error) { next(error); }
};

export const updateJournal = async (req, res, next) => {
  try {
    const { title, content, moodContext } = req.body;
    let journal = await Journal.findById(req.params.id);

    if (!journal) {
      res.status(404);
      throw new Error('Target log structure update route missing reference model');
    }

    if (journal.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Ownership security credential check failed');
    }

    journal.title = title || journal.title;
    journal.content = content || journal.content;
    journal.moodContext = moodContext || journal.moodContext;

    const updatedJournal = await journal.save();
    res.json({ success: true, data: updatedJournal });
  } catch (error) { next(error); }
};

export const deleteJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      res.status(404);
      throw new Error('Log item pointer resource target missing');
    }

    if (journal.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Resource manipulation authorization mismatch');
    }

    await journal.deleteOne();
    res.json({ success: true, message: 'Journal resource structure deleted successfully' });
  } catch (error) { next(error); }
};