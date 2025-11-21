import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  location?: string;
  phoneNumber?: string;
  farmSize?: string;
  joinedDate?: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  updateProfile: (updated: Partial<SignupPayload>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      try { localStorage.setItem('user', JSON.stringify(user)); } catch {}
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/farmer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
console.log(data)
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      const t = data.token || data.accessToken || null;
      setToken(t);

      // Derive a user object from several possible backend response shapes.
      // Some backends return { user } or { userInfo }, others may return the
      // DTO (e.g. FarmerLoginDto) containing `email` and optionally `name`.
      let userFromResponse: any = null;
      if (data.user) userFromResponse = data.user;
      else if (data.userInfo) userFromResponse = data.userInfo;
      else if (data.email) userFromResponse = { email: data.email, name: data.name };
      setUser(userFromResponse);
      // Note: we intentionally do not store raw passwords even if returned.
    } finally {
      setLoading(false);
    }
  }

  async function signup(payload: SignupPayload) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/farmer/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const signupError: any = new Error(data?.message || 'Signup failed');
        // attach field-level errors if backend provides them
        signupError.fieldErrors = data?.errors || data?.fieldErrors || null;
        throw signupError;
      }
      const t = data.token || data.accessToken || null;
      setToken(t);

      // Prefer full user object returned by backend, fall back to payload
      let userFromResponse: any = null;
      if (data.user) userFromResponse = data.user;
      else if (data.userInfo) userFromResponse = data.userInfo;
      else userFromResponse = {
        name: payload.name,
        email: payload.email,
        location: payload.location,
        phoneNumber: payload.phoneNumber,
        farmSize: payload.farmSize,
        joinedDate: data.joinedDate || payload.joinedDate || new Date().toLocaleDateString(),
      };

      setUser(userFromResponse);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updated: Partial<SignupPayload>) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/farmer/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Update failed');

      const updatedUser = data.user || data.data || { ...user, ...updated };
      setUser(updatedUser);
      // Persist updated user
      try { localStorage.setItem('user', JSON.stringify(updatedUser)); } catch {}
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
