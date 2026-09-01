import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Sparkles } from 'lucide-react';

const REGIONS = [
  { id: 'All', name: 'All India Crafts', hiName: 'सभी भारतीय शिल्प', icon: '🇮🇳' },
  { id: 'Rajasthan', name: 'Rajasthan', hiName: 'राजस्थान', specialty: 'Blue Pottery & Block Print', icon: '🏺' },
  { id: 'Kashmir', name: 'Kashmir', hiName: 'कश्मीर', specialty: 'Pashmina & Sozni Needlework', icon: '🧣' },
  { id: 'Uttar Pradesh', name: 'Uttar Pradesh', hiName: 'उत्तर प्रदेश', specialty: 'Saharanpur Wood & Brass', icon: '🪵' },
  { id: 'Bihar', name: 'Bihar (Mithila)', hiName: 'बिहार (मिथिला)', specialty: 'Madhubani Painting on Silk', icon: '🎨' },
  { id: 'Chhattisgarh', name: 'Chhattisgarh (Bastar)', hiName: 'छत्तीसगढ़ (बस्तर)', specialty: 'Dhokra Lost-Wax Brass', icon: '🎺' },
  { id: 'Karnataka', name: 'Karnataka', hiName: 'कर्नाटक', specialty: 'Channapatna Lacquer Toys', icon: '🧸' }
];

export const RegionFilter = ({ selectedRegion, onSelectRegion }) => {
  const { lang } = useLanguage();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
          <span>{lang === 'hi' ? 'शिल्प क्षेत्र के अनुसार खोजें' : 'Explore by Craft Region'}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {REGIONS.map((reg) => {
          const isSelected = selectedRegion === reg.id || (selectedRegion === 'all' && reg.id === 'All');
          return (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 border shadow-xs ${
                isSelected
                  ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-md'
                  : 'bg-white text-indigoClay-800 border-terracotta-100 hover:border-terracotta-300 hover:bg-terracotta-50/50'
              }`}
            >
              <span className="text-sm">{reg.icon}</span>
              <span>{lang === 'hi' ? reg.hiName : reg.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
