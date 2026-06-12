import rateLimit from 'express-rate-limit';

export const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute tracking window
  max: 20, // Limit each IP address to 20 requests per window
  message: {
    success: false,
    message: 'You are moving a bit fast. Take a deep breath and try chatting again in a few minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});