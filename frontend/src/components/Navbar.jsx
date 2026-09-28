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
  Home,
  ShoppingCart,
  Heart,
  ShieldCheck,
  MessageSquareText,
  PanelLeft,
  X,
  ChevronDown
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

  const handleGlobalLanguageToggle = () => {
    toggleLanguage();
    const targetLang = lang === 'en' ? 'hi' : 'en';
    const selectField = document.querySelector('.goog-te-combo');
    if (selectField) {
      selectField.value = targetLang;
      selectField.dispatchEvent(new Event('change'));
    }
  };

  const readPageHelp = () => {
    const helpMessages = {
      dashboard: lang === 'hi'
        ? 'नमस्ते! यह आपके लिए कल्याण सेतु छात्र पोर्टल है। यहाँ आप सब्सिडी योजनाओं, पात्रता स्थिति और लाभ की जानकारी आसानी से देख सकते हैं।'
        : 'Welcome to Kalyan Setu. Here you can review your scholarship applications, eligibility status, and scheme benefits in one place.',
      'document-upload': lang === 'hi'
        ? 'यहाँ आप DigiLocker से ST/PVTG प्रमाणपत्र और आय प्रमाणपत्र को सुरक्षित रूप से सत्यापित कर सकते हैं।'
        : 'Use this section to verify ST/PVTG caste and income credentials from DigiLocker and secure document authentication.',
      'jago-chatbot': lang === 'hi'
        ? 'जागो एआई आपकी पात्रता, एप्लिकेशन स्थिति और दस्तावेज़ आवश्यकताओं के बारे में लिखित या ध्वनि भाषा में सहायता करता है।'
        : 'JAGO AI helps students check eligibility, application status, and required documents using text or voice guidance.'
    };

    speakText(helpMessages[currentTab] || helpMessages.dashboard);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-terracotta-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-2 py-2 sm:gap-4">

          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('dashboard')} 
            className="flex min-w-0 flex-1 items-center gap-1 pr-1 cursor-pointer group sm:gap-3 sm:pr-0"
          >
            <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-terracotta-100 group-hover:scale-105 transition transform overflow-hidden sm:h-16 sm:w-16">
              <img
                src="/kalasetu-logo.jpeg"
                alt="Kalyan Setu logo"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="shrink-0 whitespace-nowrap font-serif text-lg font-extrabold tracking-tight text-terracotta-700 sm:text-2xl">
                  {lang === 'hi' ? 'कल्याण सेतु' : 'Kalyan Setu'}
                </span>
                <span className="hidden text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border sm:inline-flex bg-emerald-100 text-emerald-800 border-emerald-300">
                  {lang === 'hi' ? 'छात्र योजना' : 'Scholarship'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                {lang === 'hi' ? 'अनुदान, प्रमाणपत्र और सहायता के लिए एक Unified पोर्टल' : 'Unified support for scholarships, verification, and student assistance'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-khadi/70 p-1.5 rounded-full border border-terracotta-100/80">
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                currentTab === 'dashboard'
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
              }`}
            >
              <Home className="w-4 h-4" />
              {lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
            </button>

            <button
              onClick={() => handleNavClick('document-upload')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                currentTab === 'document-upload'
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {lang === 'hi' ? 'DigiLocker सत्यापन' : 'DigiLocker Verification'}
            </button>

            <button
              onClick={() => handleNavClick('jago-chatbot')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition ${
                currentTab === 'jago-chatbot'
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : 'text-indigoClay-800 hover:text-terracotta-600 hover:bg-white/80'
              }`}
            >
              <MessageSquareText className="w-4 h-4 text-sandalwood-600" />
              {lang === 'hi' ? 'JAGO AI सहायक' : 'JAGO AI Assistant'}
            </button>
          </nav>
          {/* Right Action Icons */}
          <div className="ml-1 flex shrink-0 items-center gap-1 sm:ml-auto sm:gap-3">

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('favourites')}
              title={t('favourites')}
              className={`shrink-0 p-2.5 rounded-full border transition flex items-center justify-center relative shadow-xs ${
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

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              title={t('cart')}
              className="shrink-0 p-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition flex items-center justify-center relative shadow-xs"
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
              className="hidden shrink-0 p-2.5 rounded-full bg-sandalwood-50 border border-sandalwood-200 text-sandalwood-800 hover:bg-sandalwood-100 transition items-center justify-center shadow-xs sm:flex"
            >
              <Volume2 className="w-4 h-4 text-sandalwood-700" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={handleGlobalLanguageToggle}
              className="hidden shrink-0 items-center gap-1.5 px-3 py-2 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-800 hover:bg-terracotta-100 font-bold text-xs transition shadow-xs sm:flex"
            >
              <Languages className="w-4 h-4 text-terracotta-600" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
            {/* User Profile Pill */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-full hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
                >
                  <img
                    src={user.name === 'Radha Devi' ? '/radha-devi.jpeg' : (user.avatar || (isBuyer ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'))}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-sandalwood-300 ring-1 ring-terracotta-200"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-indigoClay-900 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-terracotta-600 font-bold uppercase tracking-wider">{user.role || 'Artisan'}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                </button>

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

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="shrink-0 rounded-xl p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">

          {/* Quick Language Toggle & Voice Guide in Mobile Menu */}
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <button
              onClick={handleGlobalLanguageToggle}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-terracotta-50 border border-terracotta-200 text-terracotta-800 font-bold text-xs shadow-xs"
            >
              <Languages className="w-4 h-4 text-terracotta-600" />
              <span>{lang === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}</span>
            </button>
            <button
              onClick={readPageHelp}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sandalwood-50 border border-sandalwood-200 text-sandalwood-800 font-bold text-xs shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-sandalwood-700" />
              <span>{lang === 'hi' ? 'सुने' : 'Listen'}</span>
            </button>
          </div>

          {/* Role Switcher Pill */}
          <div className="p-3 bg-khadi/60 rounded-2xl border border-terracotta-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 font-bold uppercase block">{lang === 'hi' ? 'वर्तमान अनुभव' : 'Current Experience'}</span>
              <span className="text-xs font-bold text-indigoClay-900">{isArtisan ? (lang === 'hi' ? 'कारीगर स्टूडियो' : 'Artisan Studio') : (lang === 'hi' ? 'शिल्प बाजार' : 'Craft Marketplace')}</span>
            </div>
            <button
              onClick={toggleAppRole}
              className="px-3 py-1.5 rounded-xl bg-terracotta-600 text-white text-[11px] font-bold shadow-xs"
            >
              {isArtisan ? (lang === 'hi' ? 'खरीदार पर जाएं' : 'Switch to Buyer') : (lang === 'hi' ? 'कारीगर पर जाएं' : 'Switch to Artisan')}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => handleNavClick('marketplace')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                currentTab === 'marketplace' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
              }`}
            >
              <Store className="w-4 h-4 text-sandalwood-500" />
              {t('marketplace')}
            </button>

            {isArtisan && (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                    currentTab === 'dashboard' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  {t('dashboard')}
                </button>

                <button
                  onClick={() => handleNavClick('add-product')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                    currentTab === 'add-product' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  {t('addProduct')}
                </button>

                <button
                  onClick={() => handleNavClick('catalog')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                    currentTab === 'catalog' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                  }`}
                >
                  <Wand2 className="w-4 h-4 text-sandalwood-500" />
                  {t('createCatalog')}
                </button>

                <button
                  onClick={() => handleNavClick('enhancer')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                    currentTab === 'enhancer' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  {t('enhanceImage')}
                </button>

                <button
                  onClick={() => handleNavClick('pricing')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                    currentTab === 'pricing' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
                  }`}
                >
                  <Coins className="w-4 h-4 text-sandalwood-600" />
                  {t('priceSuggest')}
                </button>
              </>
            )}

            <button
              onClick={() => handleNavClick('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-left ${
                currentTab === 'orders' ? 'bg-terracotta-600 text-white' : 'text-gray-700 hover:bg-terracotta-50'
              }`}
            >
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              {t('orders')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};