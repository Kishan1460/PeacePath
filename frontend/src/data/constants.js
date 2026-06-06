// ─── Mood Options ──────────────────────────────────────────────────
export const MOODS = [
  { emoji: "😊", label: "Happy",   color: "#c8963e", bg: "#fffbea" },
  { emoji: "😌", label: "Calm",    color: "#7d9b76", bg: "#edf5eb" },
  { emoji: "😔", label: "Sad",     color: "#5f7fc9", bg: "#eef2ff" },
  { emoji: "😰", label: "Anxious", color: "#c9685f", bg: "#fff1f0" },
  { emoji: "😤", label: "Angry",   color: "#c97a3e", bg: "#fff7ed" },
  { emoji: "😴", label: "Tired",   color: "#8e76b5", bg: "#f5f0ff" },
];

// ─── Weekly Mood Data (dummy chart data) ───────────────────────────
export const WEEK_MOODS = [
  { day: "Mon", score: 4, mood: "😊", label: "Happy" },
  { day: "Tue", score: 3, mood: "😌", label: "Calm"  },
  { day: "Wed", score: 2, mood: "😔", label: "Sad"   },
  { day: "Thu", score: 3, mood: "😌", label: "Calm"  },
  { day: "Fri", score: 5, mood: "😊", label: "Happy" },
  { day: "Sat", score: 4, mood: "😊", label: "Happy" },
  { day: "Sun", score: 3, mood: "😌", label: "Calm"  },
];

// ─── Wellness Quotes ────────────────────────────────────────────────
export const QUOTES = [
  "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, or frustrated. Having feelings doesn't make you a negative person.",
  "Healing takes time, and asking for help is a courageous step.",
  "Self-care is not selfish. You cannot pour from an empty cup.",
  "Every day may not be good, but there is something good in every day.",
  "Be gentle with yourself. You are a child of the universe.",
  "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
];

// ─── Daily Affirmations ─────────────────────────────────────────────
export const AFFIRMATIONS = [
  "I am enough, exactly as I am today.",
  "I give myself permission to rest and heal.",
  "My feelings are valid and worthy of attention.",
  "I am growing stronger with each passing day.",
  "I deserve kindness — especially from myself.",
  "Today I choose peace over perfection.",
  "I am resilient, I am capable, I am whole.",
];

// ─── Sample Journal Entries ─────────────────────────────────────────
export const SAMPLE_ENTRIES = [
  {
    id: 1,
    title: "A quiet morning",
    text: "Woke up early and sat by the window with tea. The light was soft and golden. I felt something close to peace — a stillness I haven't felt in weeks.",
    date: "May 27, 2026",
    mood: "😌",
    moodLabel: "Calm",
  },
  {
    id: 2,
    title: "Hard day at work",
    text: "Presentation didn't go as planned. I kept second-guessing myself. Trying to remind myself that one bad day doesn't define my whole journey.",
    date: "May 25, 2026",
    mood: "😔",
    moodLabel: "Sad",
  },
  {
    id: 3,
    title: "Weekend walk",
    text: "Long walk in the park — no music, no phone. Just the sound of birds and my own thoughts, which weren't that bad actually.",
    date: "May 23, 2026",
    mood: "😊",
    moodLabel: "Happy",
  },
];

// ─── Navigation Links ───────────────────────────────────────────────
export const NAV_LINKS = [
  { path: "/",          label: "Home"      },
  { path: "/mood",      label: "Mood"      },
  { path: "/journal",   label: "Journal"   },
  { path: "/chatbot",   label: "Chatbot"   },
  { path: "/dashboard", label: "Dashboard" },
];

// ─── Homepage Feature Cards ─────────────────────────────────────────
export const FEATURES = [
  {
    icon: "🌿",
    bg: "bg-green-50",
    name: "Mood Tracker",
    path: "/mood",
    desc: "Log how you feel each day with gentle prompts. Spot patterns and understand what lifts your energy.",
  },
  {
    icon: "✍️",
    bg: "bg-yellow-50",
    name: "Daily Journal",
    path: "/journal",
    desc: "Write freely in a distraction-free, private space. Your thoughts are safe and always yours to keep.",
  },
  {
    icon: "💬",
    bg: "bg-indigo-50",
    name: "AI Companion",
    path: "/chatbot",
    desc: "Chat with an empathetic AI trained in mental wellness. A listening ear — always available.",
  },
  {
    icon: "📊",
    bg: "bg-orange-50",
    name: "Dashboard",
    path: "/dashboard",
    desc: "View your weekly emotional overview, revisit journal highlights, and celebrate your progress.",
  },
];