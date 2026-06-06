import { GoogleGenAI } from '@google/genai';
import * as axiosModule from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Safe wrapper to handle Axios default exports seamlessly in ES Modules
const axios = axiosModule.default || axiosModule;

/**
 * Initialize the modern Google Gen AI SDK.
 * By passing an empty object or omitting parameters, it automatically 
 * extracts your "GEMINI_API_KEY" directly from your process.env configuration.
 */
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

/**
 * AI Mental Wellness Assistant Chatbot
 * POST /api/chat
 */
export const handleGeminiChat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      res.status(400);
      throw new Error('Please provide a message for the wellness assistant.');
    }

    // Generate a response using the new Gemini
    const responseInstance = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `You are an empathetic, compassionate, and gentle mental wellness assistant. Your goal is to actively listen, 
                            validate feelings, and provide safe, mindful micro-exercises (like deep breathing or grounding techniques). 
                            You are NOT a doctor or a replacement for clinical therapy. If a user describes severe self-harm or critical
                            medical distress, provide warm support alongside immediate professional helpline resources. Keep responses under 
                            4 sentences.`,
      }
    });

    // Extract the text output from the new response format structure cleanly
    const aiResponseText = responseInstance.text;

    if (!aiResponseText) {
      throw new Error('The new Gemini engine returned an empty text frame.');
    }

    res.status(200).json({
      success: true,
      response: aiResponseText.trim()
    });

  } catch (error) {
    console.error(`New Gemini SDK Error: ${error.message}`);
    res.status(502);
    next(new Error('Our wellness assistant is resting right now. Please try chatting in a moment.'));
  }
};


 // Fetch Daily Affirmations (ZenQuotes integration)
 //  GET /api/affirmations
export const getDailyAffirmation = async (req, res, next) => {
  try {
    const apiResponse = await axios.get('https://zenquotes.io/api/random', { timeout: 4000 });
    
    if (apiResponse.data && apiResponse.data[0]) {
      const { q: quote, a: author } = apiResponse.data[0];
      return res.status(200).json({ success: true, affirmation: quote, author: author });
    }
    
    throw new Error('Invalid quote data schema format.');
  } catch (error) {
    console.error(`Third-Party API Downtime: ${error.message}`);
    res.status(200).json({
      success: true,
      affirmation: "Be gentle with yourself. You are doing the best you can with what you have.",
      author: "Mental Wellness Guide (Fallback)"
    });
  }
};

/**
 * Mindfulness Exercises Endpoint
 * GET /api/exercises
 */
export const getMindfulExercises = (req, res) => {
  const structuredExercises = [
    {
      id: "ex_1",
      title: "4-7-8 Deep Grounding Breath",
      type: "Breathing",
      duration: "3 minutes",
      steps: [
        "Inhale through your nose quietly for 4 seconds.",
        "Hold your breath calmly for 7 seconds.",
        "Exhale entirely through your mouth making a whoosh sound for 8 seconds.",
        "Repeat the cycle 4 times."
      ]
    },
    {
      id: "ex_2",
      title: "5-4-3-2-1 Sensory Reset",
      type: "Mindfulness",
      duration: "5 minutes",
      steps: [
        "Acknowledge 5 things you can see around you.",
        "Acknowledge 4 things you can physically touch.",
        "Acknowledge 3 things you can hear.",
        "Acknowledge 2 things you can smell.",
        "Acknowledge 1 thing you can taste."
      ]
    }
  ];

  res.status(200).json({ success: true, data: structuredExercises });
};