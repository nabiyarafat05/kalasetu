import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Save,
  ArrowRight,
  Home,
  Check
} from 'lucide-react';

export const ProfilePage = ({ onBack }) => {
  const { lang, t } = useLanguage();
  const { user, isArtisan, isBuyer, switchRole, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    region: user?.region || 'Rajasthan',
    bio: user?.bio || '',
    craftSpecialty: user?.craftSpecialty || '',
    craftLineage: user?.craftLineage || '',
    shippingAddress: {
      fullName: user?.shippingAddress?.fullName || user?.name || '',
      phone: user?.shippingAddress?.phone || user?.phone || '',
      street: user?.shippingAddress?.street || '',
      city: user?.shippingAddress?.city || '',
      state: user?.shippingAddress?.state || '',
      postalCode: user?.shippingAddress?.postalCode || '',
      country: 'India'
    }
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      addToast(
        lang === 'hi' ? 'प्रोफाइल सफलतापूर्वक अपडेट हो गई!' : 'Profile updated successfully!',
        'success'
      );
    } catch (err) {
      addToast('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = () => {
    const nextRole = isArtisan ? 'buyer' : 'artisan';
    switchRole(nextRole);
    addToast(
      lang === 'hi'
        ? `रोल बदला गया: ${nextRole === 'artisan' ? 'कारीगर' : 'खरीदार'}`
        : `Switched role to ${nextRole === 'artisan' ? 'Artisan / Seller' : 'Conscious Buyer'}`,
      'info'
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-200 shadow-craft space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"}
              alt={user?.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-sandalwood-300 ring-2 ring-terracotta-200 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-extrabold text-indigoClay-900">
                  {user?.name}
                </h1>
                <span className="bg-terracotta-100 text-terracotta-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {user?.role || 'Artisan'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="p-3 rounded-2xl bg-khadi border border-terracotta-200 text-center space-y-1">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Switch Mode</span>
            <button
              type="button"
              onClick={handleToggleRole}
              className="px-4 py-1.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-xs transition"
            >
              {isArtisan ? 'Switch to Buyer Mode' : 'Switch to Artisan Mode'}
            </button>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                Location (City / State)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                Indian Craft Region
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              />
            </div>
          </div>

          {/* Artisan specific fields */}
          {isArtisan && (
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div>
                <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                  Craft Specialty
                </label>
                <input
                  type="text"
                  name="craftSpecialty"
                  value={formData.craftSpecialty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                  Heritage Craft Story & Bio
                </label>
                <textarea
                  rows={3}
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Buyer Delivery Address */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold text-indigoClay-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-terracotta-600" />
              <span>Default Delivery Address</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <input
                  type="text"
                  name="street"
                  placeholder="Street / House Number"
                  value={formData.shippingAddress.street}
                  onChange={handleAddressChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.shippingAddress.city}
                  onChange={handleAddressChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="PIN Code"
                  value={formData.shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Saving...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
