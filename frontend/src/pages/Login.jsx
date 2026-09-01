import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, ShieldCheck, UserCheck, Lock, Mail, Store, User } from 'lucide-react';

export const Login = ({ onNavigateToRegister, onLoginSuccess }) => {
  const { lang, t } = useLanguage();
  const { login, loginDemo, loading } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('radha.devi@kalasetu.org');
  const [password, setPassword] = useState('demo_password_123');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      addToast(
        lang === 'hi' ? 'नमस्ते! कला सेतु में आपका स्वागत है।' : 'Welcome back to KalaSetu!',
        'success'
      );
      if (onLoginSuccess) onLoginSuccess(res.user);
    } else {
      addToast(res.message || 'Invalid login details', 'error');
    }
  };

  const handleDemoArtisan = async () => {
    const res = await loginDemo('artisan');
    addToast(
      lang === 'hi' ? '⚡ राधा देवी (जयपुर ब्लू पॉटरी) के रूप में लॉगिन किया गया!' : '⚡ Logged in as Demo Artisan: Radha Devi (Jaipur)',
      'success'
    );
    if (onLoginSuccess) onLoginSuccess(res.user);
  };

  const handleDemoBuyer = async () => {
    const res = await loginDemo('buyer');
    addToast(
      lang === 'hi' ? '⚡ प्रिया शर्मा (कला प्रेमी खरीदार) के रूप में लॉगिन किया गया!' : '⚡ Logged in as Demo Buyer: Priya Sharma (Mumbai)',
      'success'
    );
    if (onLoginSuccess) onLoginSuccess(res.user);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-white rounded-3xl border border-terracotta-200 shadow-craft animate-fadeIn space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-terracotta-600 to-sandalwood-400 flex items-center justify-center text-white text-3xl shadow-md">
          🪔
        </div>
        <h1 className="text-2xl font-serif font-extrabold text-terracotta-800">
          {t('login')}
        </h1>
        <p className="text-xs text-gray-500">
          {lang === 'hi' ? 'कारीगर या खरीदार के रूप में प्रवेश करें' : 'Sign in as an artisan or conscious craft collector'}
        </p>
      </div>

      {/* 1-Click Dual Demo Access for Reviewers & Hackathon */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sandalwood-50 via-terracotta-50 to-khadi border border-sandalwood-300 space-y-2.5 text-center">
        <span className="text-[11px] font-bold text-terracotta-800 uppercase tracking-wider block">
          ⚡ 1-Click Demo Accounts (Instant Testing)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDemoArtisan}
            className="py-2.5 px-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 transform active:scale-95"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t('demoArtisanLogin')}</span>
          </button>

          <button
            type="button"
            onClick={handleDemoBuyer}
            className="py-2.5 px-3 rounded-xl bg-indigoClay-900 hover:bg-indigoClay-950 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5 transform active:scale-95"
          >
            <Store className="w-3.5 h-3.5 text-sandalwood-300" />
            <span>{t('demoBuyerLogin')}</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              placeholder="user@kalasetu.org"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <span>{t('login')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Switch to Register */}
      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          New to KalaSetu?{' '}
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="font-bold text-terracotta-700 hover:underline"
          >
            {t('register')}
          </button>
        </p>
      </div>
    </div>
  );
};
