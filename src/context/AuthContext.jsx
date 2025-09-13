// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = cargando
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const API_BASE =
    (import.meta.env && import.meta.env.VITE_API_BASE) ||
    (apiClient?.defaults?.baseURL ?? '');

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    (async () => {
      if (!API_BASE) {
        if (!mounted) return;
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const { data } = await apiClient.get('/auth/me', {
          signal: controller.signal,
          timeout: 4000,
          withCredentials: true,
        });

        if (!mounted) return;

        if (data?.ok) {
          setIsAuthenticated(true);
          setUser(data.user ?? null);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch {
        if (!mounted) return;
        setIsAuthenticated(false);
        setUser(null);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [API_BASE]);

  const login = async (email, password) => {
    const { data } = await apiClient.post(
      '/auth/login',
      { email, password },
      { withCredentials: true, timeout: 6000 }
    );

    if (data?.ok) {
      setIsAuthenticated(true);
      setUser(data.user);

      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/client/dashboard', { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout', null, {
        withCredentials: true,
        timeout: 4000,
      });
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login', { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
