import { createContext, useContext, useState, useCallback } from 'react';
import { login as loginRequest } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('deskflow_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (username, password) => {
    setLoading(true);
    setError('');
    try {
      const data = await loginRequest(username, password);
      localStorage.setItem('deskflow_token', data.token);
      localStorage.setItem('deskflow_user', JSON.stringify(data.user));
      setUser(data.user);
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to sign in. Please try again.';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('deskflow_token');
    localStorage.removeItem('deskflow_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
