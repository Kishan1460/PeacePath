import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WellnessContext } from '../context/WellnessContext';

export default function Navbar() {
  const { token, logout } = useContext(WellnessContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path 
      ? 'text-emerald-600 font-semibold md:border-b-2 md:border-emerald-600 md:pb-1' 
      : 'text-gray-600 hover:text-emerald-600 transition-colors';

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 w-full z-50 min-h-16 flex flex-col justify-center">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="text-xl font-bold text-emerald-700 tracking-tight flex items-center gap-2 select-none">
          🌱 HealthTech
        </Link>

        {/* Hamburger Menu Toggle Button (Visible on mobile/tablet screens only) */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-600 hover:text-emerald-600 focus:outline-none p-2 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            {isOpen ? (
              // "X" Close Icon
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger Lines Icon
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Inline Navigation Bar (Hidden on mobile screens) */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          <Link to="/" className={isActive('/')}>Home</Link>
          {token ? (
            <>
              <Link to="/mood" className={isActive('/mood')}>Moods</Link>
              <Link to="/journal" className={isActive('/journal')}>Journals</Link>
              <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
              <Link to="/chat" className={isActive('/chat')}>AI Assistant</Link>
              <button onClick={handleLogout} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive('/login')}>Sign In</Link>
              <Link to="/register" className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-all shadow-xs">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Context Dropdown Overlay Drawer Menu (Toggled via hamburger state) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 flex flex-col gap-4 text-sm font-medium animate-fade-in shadow-xl absolute top-16 left-0 w-full z-40">
          <Link to="/" onClick={closeMenu} className={`pb-2 border-b border-gray-50 ${isActive('/')}`}>Home</Link>
          {token ? (
            <>
              <Link to="/mood" onClick={closeMenu} className={`pb-2 border-b border-gray-50 ${isActive('/mood')}`}>Moods</Link>
              <Link to="/journal" onClick={closeMenu} className={`pb-2 border-b border-gray-50 ${isActive('/journal')}`}>Journals</Link>
              <Link to="/dashboard" onClick={closeMenu} className={`pb-2 border-b border-gray-50 ${isActive('/dashboard')}`}>Dashboard</Link>
              <Link to="/chat" className={isActive('/chat')}>AI Assistant</Link>
              <button onClick={handleLogout} className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className={`pb-2 border-b border-gray-50 ${isActive('/login')}`}>Sign In</Link>
              <Link to="/register" onClick={closeMenu} className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-md">
                Register Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}