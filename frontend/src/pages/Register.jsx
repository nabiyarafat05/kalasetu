import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, User, Mail, Lock, MapPin, Tag, Store, ShieldCheck } from 'lucide-react';

export const Register = ({ onNavigateToLogin, onRegisterSuccess }) => {
  const { lang, t } = useLanguage();
  const { register, loading } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'artisan', // 'artisan' or 'buyer'
    craftSpecialty: 'Traditional Indian Handicrafts',
    location: 'Rajasthan, India',
    region: 'Rajasthan',
    phone: '+91 '
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role,
      location: role === 'artisan' ? 'Rajasthan, India' : 'Mumbai, India'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.success) {
      addToast(
        lang === 'hi'
          ? `नमस्ते! आपका ${formData.role === 'buyer' ? 'खरीदार' : 'कारीगर'} खाता बन गया है।`
          : `Welcome! Your ${formData.role === 'buyer' ? 'buyer' : 'artisan'} account has been created.`,
        'success'
      );
      if (onRegisterSuccess) onRegisterSuccess(res.user);
    } else {
      addToast(res.message || 'Registration failed', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 sm:p-8 bg-white rounded-3xl border border-terracotta-200 shadow-craft animate-fadeIn space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-terracotta-600 to-sandalwood-400 flex items-center justify-center text-white text-3xl shadow-md">
          🪔
        </div>
        <h1 className="text-2xl font-serif font-extrabold text-terracotta-800">
          {t('register')}
        </h1>
        <p className="text-xs text-gray-500">
          {lang === 'hi' ? 'कारीगर या खरीदार के रूप में खाता बनाएं' : 'Join KalaSetu to sell or discover Indian craftsmanship'}
        </p>
      </div>

      {/* Role Selection Pills */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider">
          Select Your Role *
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleRoleSelect('artisan')}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
              formData.role === 'artisan'
                ? 'bg-terracotta-50 border-terracotta-500 text-terracotta-900 ring-2 ring-terracotta-200'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">🪔</span>
            <span className="text-xs font-bold">{t('roleArtisan')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('buyer')}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
              formData.role === 'buyer'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Store className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold">{t('roleBuyer')}</span>
          </button>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={formData.role === 'buyer' ? 'e.g. Priya Sharma' : 'e.g. Sunil Kumar'}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="user@kalasetu.org"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
            Password *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>
        </div>

        {formData.role === 'artisan' && (
          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              Craft Tradition / Specialty
            </label>
            <input
              type="text"
              name="craftSpecialty"
              value={formData.craftSpecialty}
              onChange={handleChange}
              placeholder="e.g. Jaipur Blue Pottery"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              Location / City
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Jaipur, Rajasthan"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <span>{t('register')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="font-bold text-terracotta-700 hover:underline"
          >
            {t('login')}
          </button>
        </p>
      </div>
    </div>
  );
};
