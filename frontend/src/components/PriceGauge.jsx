import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, TrendingUp, Sparkles, Award, IndianRupee } from 'lucide-react';

export const PriceGauge = ({ priceData }) => {
  const { lang, t } = useLanguage();

  if (!priceData) return null;

  const min = priceData.minimumPrice || 0;
  const rec = priceData.recommendedPrice || 0;
  const max = priceData.maximumPrice || 0;
  const breakdown = priceData.breakdown || {};

  return (
    <div className="bg-white rounded-2xl p-5 border border-terracotta-200 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-indigoClay-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-terracotta-600" />
            <span>{t('priceSuggest')}</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {lang === 'hi' ? 'कारीगर की आजीविका और बाजार के अनुसार उचित मूल्य' : 'Fair trade pricing based on artisan labor standards'}
          </p>
        </div>

        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Fair Trade Certified
        </span>
      </div>

      {/* 3 Price Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Minimum Fair Price */}
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
            {t('minPrice')}
          </span>
          <div className="text-lg font-bold text-gray-800 mt-1">
            ₹{min.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            {lang === 'hi' ? 'लागत + मूल मजदूरी' : 'Break-even + Living Wage'}
          </p>
        </div>

        {/* Recommended Retail (Highlight) */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-terracotta-500 to-terracotta-600 text-white text-center shadow-md transform sm:-translate-y-1 relative ring-2 ring-terracotta-300">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-sandalwood-400 text-indigoClay-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            Recommended
          </div>
          <span className="text-[11px] font-bold text-terracotta-100 uppercase tracking-wider block mt-1">
            {t('recPrice')}
          </span>
          <div className="text-2xl font-extrabold text-white mt-1">
            ₹{rec.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-terracotta-100 font-medium mt-0.5">
            {breakdown.profitMarginPercent ? `${breakdown.profitMarginPercent}% Net Margin` : 'Fair Living Profit'}
          </p>
        </div>

        {/* Premium / Maximum */}
        <div className="p-3.5 rounded-xl bg-sandalwood-50/70 border border-sandalwood-200 text-center">
          <span className="text-[11px] font-semibold text-sandalwood-800 uppercase tracking-wider block">
            {t('maxPrice')}
          </span>
          <div className="text-lg font-bold text-sandalwood-900 mt-1">
            ₹{max.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-sandalwood-700 mt-0.5">
            {lang === 'hi' ? 'होटल / विदेशी बाजार' : 'Boutique / Luxury Tier'}
          </p>
        </div>
      </div>

      {/* Visual Cost & Margin Breakdown */}
      {breakdown.rawMaterial && (
        <div className="pt-2 border-t border-gray-100 space-y-3">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            {t('marginBreakdown')}
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-500 text-[10px] block">Raw Material</span>
              <span className="font-bold text-gray-800">₹{breakdown.rawMaterial}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-700 text-[10px] block font-semibold">{t('fairWage')}</span>
              <span className="font-bold text-emerald-900">₹{breakdown.fairLaborWage}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-gray-500 text-[10px] block">{t('packagingFee')}</span>
              <span className="font-bold text-gray-800">₹{breakdown.packagingDelivery}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-sandalwood-50 border border-sandalwood-200">
              <span className="text-sandalwood-800 text-[10px] block font-semibold">{t('netProfit')}</span>
              <span className="font-bold text-sandalwood-900">₹{breakdown.artisanNetProfit}</span>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Box */}
      <div className="p-3.5 rounded-xl bg-khadi border border-terracotta-100 text-xs text-indigoClay-900 leading-relaxed">
        <span className="font-bold text-terracotta-700 block mb-1">
          💡 {t('pricingExplanation')}:
        </span>
        <p>{lang === 'hi' && priceData.hindiExplanation ? priceData.hindiExplanation : priceData.explanation}</p>
      </div>
    </div>
  );
};
