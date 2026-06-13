import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { WellnessProvider, WellnessContext } from './context/WellnessContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MoodTracker from './pages/MoodTracker';
import Journal from './pages/Journal';
import Dashboard from './pages/Dashboard';
import ChatBot from './pages/ChatbotPage';

function ProtectedRoute({ children }) {
  const { token, loading } = useContext(WellnessContext);
  if (loading) return <div className="text-center mt-20 font-medium">Calming workspace initializing...</div>;
  return token ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-white to-wellness-mint text-wellness-slate">
      <Navbar />
      <main className="grow container mx-auto px-4 mt-16 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mood" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <WellnessProvider>
      <Router>
        <AppContent />
      </Router>
    </WellnessProvider>
  );
}