import React from 'react';
import { ArrowUpRight, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = ({ currentTab, setCurrentTab, isArtisan }) => {
  const { lang } = useLanguage();
  const isHindi = lang === 'hi';
  const handleNavigate = (tab) => {
    if (!setCurrentTab) return;
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const homeTab = isArtisan ? 'dashboard' : 'marketplace';

  return (
    <footer className="mt-16 border-t border-terracotta-100 bg-gradient-to-br from-terracotta-700 via-terracotta-600 to-sandalwood-500 px-4 pb-6 pt-10 text-white shadow-[0_-4px_20px_rgba(200,90,50,0.15)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl shadow-sm shadow-terracotta-500/20">
                🪔
              </div>
              <div>
                <p className="font-serif text-2xl font-extrabold tracking-tight text-white">KALASETU</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta-100">{isHindi ? 'डिजिटल अवसरों की रचना' : 'Crafting digital opportunity'}</p>
              </div>
            </div>

            <p className="mt-3 max-w-md text-sm leading-6 text-terracotta-50 sm:mt-4 sm:leading-7">
              {isHindi ? 'पारंपरिक कारीगरी को डिजिटल अवसरों से जोड़कर कारीगरों को अपना काम बेहतर ढंग से प्रस्तुत करने और उचित बाजार तक पहुंचने में सहायता।' : 'Bridging traditional craftsmanship with digital opportunity, helping artisans present their work with clarity, confidence, and fairer market access.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
              <button
                type="button"
                onClick={() => handleNavigate('about')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                {isHindi ? 'हमारे बारे में' : 'About Us'} <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                {isHindi ? 'संपर्क करें' : 'Contact Us'} <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">{isHindi ? 'त्वरित लिंक' : 'Quick Links'}</h3>
            <ul className="mt-3 space-y-2 text-sm text-terracotta-50/90 sm:mt-4 sm:space-y-3">
              <li><button type="button" onClick={() => handleNavigate(homeTab)} className="transition hover:text-white">{isHindi ? 'होम' : 'Home'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('marketplace')} className="transition hover:text-white">{isHindi ? 'हाट बाजार' : 'Marketplace'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('about')} className="transition hover:text-white">{isHindi ? 'हमारे बारे में' : 'About Us'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('contact')} className="transition hover:text-white">{isHindi ? 'संपर्क करें' : 'Contact Us'}</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">{isHindi ? 'कारीगरों के लिए' : 'For Artisans'}</h3>
            <ul className="mt-3 space-y-2 text-sm text-terracotta-50/90 sm:mt-4 sm:space-y-3">
              <li><button type="button" onClick={() => handleNavigate('add-product')} className="transition hover:text-white">{isHindi ? 'उत्पाद जोड़ें' : 'Add Product'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('dashboard')} className="transition hover:text-white">{isHindi ? 'मेरे उत्पाद' : 'My Products'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('catalog')} className="transition hover:text-white">{isHindi ? 'एआई कैटलॉग जनरेटर' : 'AI Catalog Generator'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('pricing')} className="transition hover:text-white">{isHindi ? 'मूल्य सुझाव' : 'Price Suggestion'}</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">{isHindi ? 'खरीदारों के लिए' : 'For Buyers'}</h3>
            <ul className="mt-3 space-y-2 text-sm text-terracotta-50/90 sm:mt-4 sm:space-y-3">
              <li><button type="button" onClick={() => handleNavigate('marketplace')} className="transition hover:text-white">{isHindi ? 'उत्पाद खोजें' : 'Explore Products'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('favourites')} className="transition hover:text-white">{isHindi ? 'पसंदीदा' : 'Favourites'}</button></li>
              <li><button type="button" onClick={() => handleNavigate('orders')} className="transition hover:text-white">{isHindi ? 'ऑर्डर' : 'Orders'}</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/15 pt-5 md:mt-10 md:grid-cols-[1.2fr_0.8fr] md:gap-5 md:pt-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">{isHindi ? 'संपर्क' : 'Contact'}</h3>
            <ul className="mt-3 space-y-2 text-sm text-terracotta-50/90 sm:mt-4 sm:space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-terracotta-100" />
                <a href="mailto:support@kalasetu.org" className="transition hover:text-white">support@kalasetu.org</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-terracotta-100" />
                <a href="tel:+919829012345" className="transition hover:text-white">+91 98290 12345</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-terracotta-100" />
                <span>{isHindi ? 'लखनऊ, उत्तर प्रदेश, भारत' : 'Lucknow, Uttar Pradesh, India'}</span>
              </li>
            </ul>
          </div>

          <div className="md:text-right">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">{isHindi ? 'सहायता' : 'Support'}</h3>
            <div className="mt-3 flex items-center justify-start gap-2 text-sm text-terracotta-50/90 sm:mt-4 md:justify-end">
              <MessageSquareText className="h-4 w-4 text-terracotta-100" />
              <a href="mailto:support@kalasetu.org?subject=Kala%20Setu%20Feedback%20/%20Support" className="transition hover:text-white">{isHindi ? 'प्रतिक्रिया भेजें' : 'Send feedback'}</a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/15 pt-4 text-center text-xs text-terracotta-100 md:mt-8">
          © 2026 KalaSetu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};