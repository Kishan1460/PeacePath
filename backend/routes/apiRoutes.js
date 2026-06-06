import express from 'express';
import { handleGeminiChat, getDailyAffirmation, getMindfulExercises } from '../controllers/apiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { chatRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Apply auth security across all external service routes
router.use(protect);

router.post('/chat', chatRateLimiter, handleGeminiChat);
router.get('/affirmations', getDailyAffirmation);
router.get('/exercises', getMindfulExercises);

export default router;