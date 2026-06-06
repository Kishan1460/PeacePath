import express from 'express';
import { addMood, getMoods, deleteMood } from '../controllers/moodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Secure all endpoints below this line
router.route('/').post(addMood).get(getMoods);
router.route('/:id').delete(deleteMood);

export default router;