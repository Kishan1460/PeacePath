import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WellnessContext = createContext();

// Backend URL from environment variable
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const WellnessProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Axios instance
  const API = axios.create({
    baseURL: BACKEND_URL,
  });

  API.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get('/auth/user');
        setUser(res.data);
      } catch (err) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser({
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
    });
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await API.post('/auth/register', {
      name,
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser({
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email,
    });

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <WellnessContext.Provider
      value={{ user, token, login, register, logout, loading, API }}
    >
      {children}
    </WellnessContext.Provider>
  );
};