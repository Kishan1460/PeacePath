import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

import apiRoutes from './routes/apiRoutes.js';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import journalRoutes from './routes/journalRoutes.js';

connectDB();

const app = express();

// Security & Parsing Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// home route 
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Mental Wellness API is running',
    environment: process.env.NODE_ENV,
  });
});

// API Entry Routes
app.use('/auth', authRoutes);
app.use('/moods', moodRoutes);
app.use('/journals', journalRoutes);
app.use('/api', apiRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));