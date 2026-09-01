import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import {
  Sparkles,
  Languages,
  Volume2,
  User as UserIcon,
  LogOut,
  PlusCircle,
  Wand2,
  Coins,
  Image as ImageIcon,
  Menu,
  X,
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Store,
  PackageCheck,
  UserCheck,
  ChevronDown,
  Layers,
  Sparkle
} from 'lucide-react';

export const Navbar = ({ currentTab, setCurrentTab }) => {
  const { lang, toggleLanguage, t, speakText } = useLanguage();
  const { user, isArtisan, isBuyer, switchRole, loginDemo, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { favCount } = useFavourite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAppRole = () => {
    if (isArtisan) {
      switchRole('buyer');
      setCurrentTab('marketplace');
    } else {
      switchRole('artisan');
      setCurrentTab('dashboard');
    }
    setUserDropdownOpen(false);
  };

  const readPageHelp = () => {
    const helpMessages = {
      dashboard: lang === 'hi' 
        ? 'नमस्ते! यह आपका कला सेतु कारीगर डैशबोर्ड है। यहाँ आप उत्पाद जोड़ सकते हैं, एआई टूल्स चला सकते हैं और नए ऑर्डर देख सकते हैं।' 
        : 'Welcome to your KalaSetu Artisan Dashboard. Manage your crafts, generate multilingual catalogs, and view customer orders.',
      marketplace: lang === 'hi'
        ? 'यह कला सेतु का हाट बाजार है। यहाँ आप भारत भर के उस्ताद कारीगरों के प्रामाणिक हस्तशिल्प देख और खरीद सकते हैं।'
        : 'Welcome to the KalaSetu Artisan Marketplace. Browse authentic handcrafted products directly from master Indian artisans.',
      catalog: lang === 'hi'
        ? 'यहाँ आप बोलकर या लिखकर अपने शिल्प का अंग्रेजी और हिन्दी में सुंदर कैटलॉग बना सकते हैं।'
        : 'Generate professional bilingual product descriptions in English and Hindi using AI.',
      enhancer: lang === 'hi'
        ? 'यहाँ अपने हस्तशिल्प की फोटो को स्टूडियो जैसा साफ और आकर्षक बनाएं।'
        : 'Enhance your craft photos with studio lighting and clean backgrounds.',
      pricing: lang === 'hi'
        ? 'यहाँ अपने हस्तशिल्प का उचित मूल्य और अपनी मजदूरी का सही हिसाब लगाएं।'
        : 'Calculate fair-trade living wage pricing for your handcrafted products.',
      orders: lang === 'hi'
        ? 'यहाँ अपने सभी ऑर्डर और डिलीवरी की स्थिति देखें।'
        : 'Track your orders and purchase requests in real-time.'
    };

    speakText(helpMessages[currentTab] || helpMessages.marketplace);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-terracotta-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick(isArtisan ? 'dashboard' : 'marketplace')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-terracotta-600 to-sandalwood-400 flex items-center justify-center text-white shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition transform">
              <span className="text-2xl">🪔</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-extrabold tracking-tight text-terracotta-700">
                  {lang === 'hi' ? 'कला सेतु' : 'KalaSetu'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                  isArtisan
                    ? 'bg-sandalwood-100 text-sandalwood-800 border-sandalwood-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {isArtisan ? (lang === 'hi' ? 'कारीगर' : 'Artisan') : (lang === 'hi' ? 'हाट बाजार' : 'Marketplace')}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-khadi/70 p-1.5 rounded-full border border-terracotta-100/80">
            {/* Common / Buyer links */}
            <button
              onClick={() => handleNavClick('marketplace')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                currentTab === 'marketplace'
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
              }`}
            >
              <Store className="w-4 h-4 text-sandalwood-500" />
              {t('marketplace')}
            </button>

            {/* Artisan specific links */}
            {isArtisan && (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                    currentTab === 'dashboard'
                      ? 'bg-terracotta-600 text-white shadow-sm'
                      : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {t('dashboard')}
                </button>

                <button
                  onClick={() => handleNavClick('add-product')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                    currentTab === 'add-product'
                      ? 'bg-terracotta-600 text-white shadow-sm'
                      : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  {t('addProduct')}
                </button>

                <button
                  onClick={() => handleNavClick('catalog')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                    currentTab === 'catalog'
                      ? 'bg-terracotta-600 text-white shadow-sm'
                      : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
                  }`}
                >
                  <Wand2 className="w-4 h-4 text-sandalwood-500" />
                  {t('createCatalog')}
                </button>

                <button
                  onClick={() => handleNavClick('enhancer')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                    currentTab === 'enhancer'
                      ? 'bg-terracotta-600 text-white shadow-sm'
                      : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  {t('enhanceImage')}
                </button>

                <button
                  onClick={() => handleNavClick('pricing')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                    currentTab === 'pricing'
                      ? 'bg-terracotta-600 text-white shadow-sm'
                      : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
                  }`}
                >
                  <Coins className="w-4 h-4 text-sandalwood-600" />
                  {t('priceSuggest')}
                </button>
              </>
            )}

            {/* Orders Tab */}
            <button
              onClick={() => handleNavClick('orders')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                currentTab === 'orders'
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
              }`}
            >
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              {t('orders')}
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Icon with badge */}
            <button
              onClick={() => handleNavClick('favourites')}
              title={t('favourites')}
              className={`p-2.5 rounded-full border transition flex items-center justify-center relative shadow-xs ${
                currentTab === 'favourites'
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'bg-white border-gray-200 text-gray-700 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${favCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favCount}
                </span>
              )}
            </button>

            {/* Cart Icon with live badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              title={t('cart')}
              className="p-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition flex items-center justify-center relative shadow-xs"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Voice Help Reader */}
            <button
              onClick={readPageHelp}
              title="Voice Guide / बोलकर सुनें"
              className="p-2.5 rounded-full bg-sandalwood-50 border border-sandalwood-200 text-sandalwood-800 hover:bg-sandalwood-100 transition flex items-center justify-center shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-sandalwood-700" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-800 hover:bg-terracotta-100 font-bold text-xs transition shadow-xs"
            >
              <Languages className="w-4 h-4 text-terracotta-600" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* User Profile Pill & Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-full hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
                >
                  <img
                    src={user.avatar || (isBuyer ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80")}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-sandalwood-300 ring-1 ring-terracotta-200"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-indigoClay-900 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-terracotta-600 font-bold uppercase tracking-wider">{user.role || 'Artisan'}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={toggleAppRole}
                      className="w-full px-4 py-2.5 text-left text-xs font-bold text-terracotta-700 hover:bg-terracotta-50 flex items-center justify-between transition"
                    >
                      <span>{isArtisan ? t('switchToBuyer') : t('switchToArtisan')}</span>
                      <Sparkles className="w-3.5 h-3.5 text-sandalwood-500" />
                    </button>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span>{lang === 'hi' ? 'मेरी प्रोफाइल' : 'My Profile & Address'}</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('orders')}
                      className="w-full px-4 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <PackageCheck className="w-4 h-4 text-gray-400" />
                      <span>{t('orders')}</span>
                    </button>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="px-4 py-2 rounded-full bg-terracotta-600 text-white font-bold text-xs hover:bg-terracotta-700 transition shadow-sm"
              >
                {t('login')}
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-5 space-y-2 shadow-xl animate-fadeIn">
          {/* Role switcher toggle pill */}
          <div className="p-3 bg-khadi rounded-2xl border border-terracotta-200 flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Current Experience</span>
              <span className="text-xs font-bold text-indigoClay-900">{isArtisan ? 'Artisan Studio' : 'Craft Marketplace'}</span>
            </div>
            <button
              onClick={toggleAppRole}
              className="px-3 py-1.5 rounded-xl bg-terracotta-600 text-white text-[11px] font-bold shadow-xs"
            >
              {isArtisan ? 'Switch to Buyer' : 'Switch to Artisan'}
            </button>
          </div>

          <button
            onClick={() => handleNavClick('marketplace')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
              currentTab === 'marketplace' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
            }`}
          >
            <Store className="w-5 h-5 text-sandalwood-500" />
            {t('marketplace')}
          </button>

          {isArtisan && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                  currentTab === 'dashboard' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                }`}
              >
                <Home className="w-5 h-5" />
                {t('dashboard')}
              </button>

              <button
                onClick={() => handleNavClick('add-product')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                  currentTab === 'add-product' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                }`}
              >
                <PlusCircle className="w-5 h-5 text-terracotta-500" />
                {t('addProduct')}
              </button>

              <button
                onClick={() => handleNavClick('catalog')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                  currentTab === 'catalog' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                }`}
              >
                <Wand2 className="w-5 h-5 text-sandalwood-500" />
                {t('createCatalog')}
              </button>

              <button
                onClick={() => handleNavClick('enhancer')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                  currentTab === 'enhancer' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                }`}
              >
                <ImageIcon className="w-5 h-5 text-emerald-600" />
                {t('enhanceImage')}
              </button>

              <button
                onClick={() => handleNavClick('pricing')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
                  currentTab === 'pricing' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                }`}
              >
                <Coins className="w-5 h-5 text-sandalwood-600" />
                {t('priceSuggest')}
              </button>
            </>
          )}

          <button
            onClick={() => handleNavClick('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
              currentTab === 'orders' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
            }`}
          >
            <PackageCheck className="w-5 h-5 text-emerald-600" />
            {t('orders')}
          </button>

          <button
            onClick={() => handleNavClick('favourites')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left ${
              currentTab === 'favourites' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
            }`}
          >
            <Heart className="w-5 h-5 text-red-500" />
            {t('favourites')} ({favCount})
          </button>
        </div>
      )}
    </header>
  );
};
