import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

const DEMO_ARTISAN = {
  id: '65e000000000000000000001',
  _id: '65e000000000000000000001',
  name: 'Radha Devi',
  email: 'radha.devi@kalasetu.org',
  role: 'artisan',
  craftSpecialty: 'Jaipur Traditional Blue Pottery',
  craftLineage: '3rd-generation heritage potter of Sanganer',
  experienceYears: 22,
  location: 'Sanganer, Jaipur, Rajasthan',
  region: 'Rajasthan',
  phone: '+91 98290 12345',
  bio: 'Specializing in GI-tagged quartz pottery, Persian turquoise glazes, and eco-friendly lead-free botanical colors.',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
};

const DEMO_BUYER = {
  id: '65e000000000000000000002',
  _id: '65e000000000000000000002',
  name: 'Priya Sharma',
  email: 'priya.sharma@buyer.com',
  role: 'buyer',
  location: 'Bandra West, Mumbai, Maharashtra',
  region: 'Maharashtra',
  phone: '+91 98111 22334',
  bio: 'Passionate collector of authentic Indian handlooms, folk paintings, and regional tribal brassware.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  shippingAddress: {
    fullName: 'Priya Sharma',
    phone: '+91 98111 22334',
    street: 'Flat 402, Sea Breeze Apts, Perry Cross Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kalasetu_user');
    return saved ? JSON.parse(saved) : DEMO_ARTISAN;
  });
  const [token, setToken] = useState(() => localStorage.getItem('kalasetu_token') || 'demo_token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('kalasetu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kalasetu_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('kalasetu_token', token);
    } else {
      localStorage.removeItem('kalasetu_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.auth.login(email, password);
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      }
      return { success: false, message: res.data?.message || 'Login failed' };
    } catch (error) {
      // Fallback
      const targetUser = email.toLowerCase().includes('buyer') ? DEMO_BUYER : DEMO_ARTISAN;
      setUser(targetUser);
      setToken('demo_token');
      return { success: true, user: targetUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.auth.register(userData);
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      }
      return { success: false, message: res.data?.message || 'Registration failed' };
    } catch (error) {
      const newUser = {
        id: 'usr_' + Date.now(),
        ...userData,
        avatar: userData.role === 'buyer'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
      };
      setUser(newUser);
      setToken('demo_token');
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = async (role = 'artisan') => {
    setLoading(true);
    try {
      const res = await api.auth.demoLogin(role);
      if (res.data?.success) {
        setUser(res.data.user);
        setToken(res.data.token);
        return { success: true, user: res.data.user };
      }
    } catch (e) {
      // fallback
    } finally {
      const target = role === 'buyer' ? DEMO_BUYER : DEMO_ARTISAN;
      setUser(target);
      setToken('demo_token');
      setLoading(false);
      return { success: true, user: target };
    }
  };

  const switchRole = (newRole) => {
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.auth.updateProfile(profileData);
      if (res.data?.success) {
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
    } catch (e) {
      setUser(prev => ({ ...prev, ...profileData }));
      return { success: true, user: { ...user, ...profileData } };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kalasetu_user');
    localStorage.removeItem('kalasetu_token');
  };

  const isArtisan = user?.role === 'artisan';
  const isBuyer = user?.role === 'buyer';

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      loginDemo,
      switchRole,
      updateProfile,
      logout,
      isArtisan,
      isBuyer,
      DEMO_ARTISAN,
      DEMO_BUYER
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
