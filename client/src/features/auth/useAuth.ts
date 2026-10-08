import { useState, useEffect, useCallback } from 'react';
import { getMe } from '../../services/authApi';
import type { Admin } from '../../types';

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    admin: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const load = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setState({ admin: null, isAuthenticated: false, isLoading: false });
      return;
    }
    try {
      const admin = await getMe();
      setState({ admin, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('token');
      setState({ admin: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({ admin: null, isAuthenticated: false, isLoading: false });
    window.location.href = '/login';
  }, []);

  return { ...state, logout, reload: load };
}
