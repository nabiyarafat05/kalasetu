import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Heart, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="mt-16 bg-white border-t border-terracotta-100 py-8 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        
        {/* Left Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🪔</span>
          <span className="font-serif font-extrabold text-terracotta-700 text-sm">KalaSetu (कला सेतु)</span>
          <span className="text-gray-400">| Empowering Indian Artisans</span>
        </div>

        {/* Middle Fair Trade Badge */}
        <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fair Trade Certified & Multilingual AI</span>
        </div>

        {/* Right Heart note */}
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>for Indian Micro-Entrepreneurs</span>
        </div>
      </div>
    </footer>
  );
};
