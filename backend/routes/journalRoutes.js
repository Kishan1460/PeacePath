import express from 'express';
import { createJournal, getJournals, updateJournal, deleteJournal } from '../controllers/journalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Secure all endpoints below this line
router.route('/').post(createJournal).get(getJournals);
router.route('/:id').put(updateJournal).delete(deleteJournal);

export default router;