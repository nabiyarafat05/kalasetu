import React from 'react';
import { ArrowUpRight, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';

export const Footer = ({ currentTab, setCurrentTab, isArtisan }) => {
  const handleNavigate = (tab) => {
    if (!setCurrentTab) return;
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const homeTab = isArtisan ? 'dashboard' : 'marketplace';

  return (
    <footer className="mt-16 border-t border-terracotta-100 bg-gradient-to-br from-terracotta-700 via-terracotta-600 to-sandalwood-500 px-4 pb-6 pt-10 text-white shadow-[0_-4px_20px_rgba(200,90,50,0.15)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl shadow-sm shadow-terracotta-500/20">
                🪔
              </div>
              <div>
                <p className="font-serif text-2xl font-extrabold tracking-tight text-white">KALASETU</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-terracotta-100">Crafting digital opportunity</p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-terracotta-50">
              Bridging traditional craftsmanship with digital opportunity, helping artisans present their work with clarity, confidence, and fairer market access.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleNavigate('about')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                About Us <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-terracotta-50/90">
              <li><button type="button" onClick={() => handleNavigate(homeTab)} className="transition hover:text-white">Home</button></li>
              <li><button type="button" onClick={() => handleNavigate('marketplace')} className="transition hover:text-white">Marketplace</button></li>
              <li><button type="button" onClick={() => handleNavigate('about')} className="transition hover:text-white">About Us</button></li>
              <li><button type="button" onClick={() => handleNavigate('contact')} className="transition hover:text-white">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">For Artisans</h3>
            <ul className="mt-4 space-y-3 text-sm text-terracotta-50/90">
              <li><button type="button" onClick={() => handleNavigate('add-product')} className="transition hover:text-white">Add Product</button></li>
              <li><button type="button" onClick={() => handleNavigate('dashboard')} className="transition hover:text-white">My Products</button></li>
              <li><button type="button" onClick={() => handleNavigate('catalog')} className="transition hover:text-white">AI Catalog Generator</button></li>
              <li><button type="button" onClick={() => handleNavigate('pricing')} className="transition hover:text-white">Price Suggestion</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">For Buyers</h3>
            <ul className="mt-4 space-y-3 text-sm text-terracotta-50/90">
              <li><button type="button" onClick={() => handleNavigate('marketplace')} className="transition hover:text-white">Explore Products</button></li>
              <li><button type="button" onClick={() => handleNavigate('favourites')} className="transition hover:text-white">Favourites</button></li>
              <li><button type="button" onClick={() => handleNavigate('orders')} className="transition hover:text-white">Orders</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-white/15 pt-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-terracotta-50/90">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-terracotta-100" />
                <a href="mailto:radha.devi@kalasetu.org" className="transition hover:text-white">radha.devi@kalasetu.org</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-terracotta-100" />
                <a href="tel:+919829012345" className="transition hover:text-white">+91 98290 12345</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-terracotta-100" />
                <span>Sanganer, Jaipur, Rajasthan</span>
              </li>
            </ul>
          </div>

          <div className="md:text-right">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-terracotta-50">Support</h3>
            <div className="mt-4 flex items-center justify-start gap-2 text-sm text-terracotta-50/90 md:justify-end">
              <MessageSquareText className="h-4 w-4 text-terracotta-100" />
              <button type="button" onClick={() => handleNavigate('contact')} className="transition hover:text-white">Send feedback</button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 text-center text-xs text-terracotta-100">
          © 2026 KalaSetu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
