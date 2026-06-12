import { useState, useRef, useEffect, useContext } from 'react';
import { WellnessContext } from '../context/WellnessContext';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI wellness guide. How are you holding up today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { API } = useContext(WellnessContext);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const res = await API.post('/api/chat', { message: userMessage });
      setMessages(prev => [...prev, { sender: 'ai', text: res.data.response }]);
    } catch (err) {
      const fallbackError = err.response?.data?.message || 'Connection lost. Take a deep breath.';
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackError, isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden animate-fade-in">
      {/* Header Panel */}
      <div className="bg-emerald-700 p-4 text-white flex items-center gap-3">
        <span className="text-2xl">✨</span>
        <div>
          <h2 className="font-bold text-lg">Mindful Assistant</h2>
          <p className="text-xs text-emerald-100">Powered by Gemini AI • Continuous Support</p>
        </div>
      </div>

      {/* Conversation Thread Window */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50">
        {messages.map((m, index) => (
          <div key={index} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs ${
              m.sender === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : m.isError ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none'
                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 text-gray-400 text-xs px-4 py-2 rounded-xl italic animate-pulse">
              Assistant is typing mindfully...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input Bar */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what is on your mind..."
          disabled={isTyping}
          className="flex-grow p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:bg-gray-50"
        />
        <button 
          type="submit" 
          disabled={isTyping || !input.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-xl text-sm font-semibold cursor-pointer disabled:bg-gray-200 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}