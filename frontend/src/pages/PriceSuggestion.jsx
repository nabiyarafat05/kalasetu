import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { PriceGauge } from '../components/PriceGauge';
import {
  Coins,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  IndianRupee,
  Layers,
  HelpCircle
} from 'lucide-react';

export const PriceSuggestion = ({ onApplyToProduct }) => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    category: 'Pottery & Ceramics',
    material: 'Natural Clay & Organic Glazes',
    rawMaterialCost: 400,
    productionCost: 550,
    laborHours: 7,
    craftComplexity: 'intricate' // 'standard', 'intricate', 'masterpiece'
  });

  const [loading, setLoading] = useState(false);
  const [pricingResult, setPricingResult] = useState({
    minimumPrice: 1350,
    recommendedPrice: 1850,
    maximumPrice: 2450,
    breakdown: {
      rawMaterial: 400,
      fairLaborWage: 550,
      packagingDelivery: 114,
      platformFee: 148,
      artisanNetProfit: 638,
      profitMarginPercent: 35
    },
    explanation: 'Based on ₹400 raw material expenditure and 7 hours of skilled intricate craftsmanship (fair living wage calculated at ₹550), the recommended fair-trade retail price is ₹1,850. This yields a fair net profit of ₹638 (35% margin) after covering packaging and platform fees.',
    hindiExplanation: '₹400 कच्ची सामग्री लागत और 7 घंटे की कुशल कारीगरी (उचित मजदूरी ₹550) के आधार पर, सुझाई गई उचित बिक्री दर ₹1,850 है। इसमें पैकेजिंग और सभी खर्च निकालने के बाद कारीगर को ₹638 का शुद्ध लाभ मिलेगा।'
  });

  const categories = [
    'Pottery & Ceramics',
    'Textiles & Handloom',
    'Woodwork & Carvings',
    'Paintings & Folk Art',
    'Metalcraft & Brass',
    'Jewelry & Beads',
    'Leather & Footwear',
    'Other Handicrafts'
  ];

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);
    try {
      const res = await api.ai.getPriceSuggestion(formData);
      if (res.data?.success) {
        setPricingResult(res.data.data);
        addToast(
          lang === 'hi'
            ? `💡 एआई ने ₹${res.data.data.recommendedPrice} का उचित मूल्य सुझाया!`
            : `💡 Fair living wage price calculated: ₹${res.data.data.recommendedPrice}`,
          'success'
        );
      }
    } catch (error) {
      console.error('Pricing error:', error);
      addToast('Failed to calculate price suggestion', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!pricingResult) return;
    onApplyToProduct({
      category: formData.category,
      material: formData.material,
      price: pricingResult.recommendedPrice,
      priceSuggestion: pricingResult
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-terracotta-700 to-sandalwood-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Coins className="w-3.5 h-3.5 text-sandalwood-300" />
            <span>Fair Trade Living Wage Algorithm</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold leading-tight">
            {t('priceSuggest')}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-emerald-100 font-medium">
            {lang === 'hi'
              ? 'कारीगरों को उनकी मेहनत और कला का सही दाम मिलना चाहिए। अपनी लागत और समय दर्ज करें, एआई पारदर्शी और टिकाऊ मूल्य सुझाएगा।'
              : 'Empowering artisans with fair living wages. Enter raw costs and crafting hours to generate sustainable, market-tested pricing.'}
          </p>
        </div>
      </div>

      {/* Pricing Calculator Inputs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-200 shadow-craft space-y-6">
        <h3 className="font-bold text-base sm:text-lg text-indigoClay-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-terracotta-600" />
          <span>{lang === 'hi' ? 'लागत और कारीगरी का विवरण' : 'Cost & Labor Inputs'}</span>
        </h3>

        <form onSubmit={handleCalculate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 bg-white font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('material')}
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                placeholder="e.g. Sheesham Wood, Brass, Silk"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('rawMaterialCost')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-500">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.rawMaterialCost}
                  onChange={(e) => setFormData({ ...formData, rawMaterialCost: Number(e.target.value) })}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('laborHours')} (Hours)
              </label>
              <input
                type="number"
                required
                min="1"
                max="300"
                value={formData.laborHours}
                onChange={(e) => setFormData({ ...formData, laborHours: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('craftComplexity')}
              </label>
              <select
                value={formData.craftComplexity}
                onChange={(e) => setFormData({ ...formData, craftComplexity: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 bg-white font-medium"
              >
                <option value="standard">{t('standard')}</option>
                <option value="intricate">{t('intricate')}</option>
                <option value="masterpiece">{t('masterpiece')}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t('calculatingPrice')}</span>
              </>
            ) : (
              <>
                <Coins className="w-5 h-5 text-sandalwood-300" />
                <span>{lang === 'hi' ? 'उचित मूल्य की गणना करें' : 'Calculate Fair Living Wage Price'}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Price Gauge Component */}
      {pricingResult && (
        <div className="space-y-4">
          <PriceGauge priceData={pricingResult} />

          <div className="flex justify-end">
            <button
              onClick={handleApply}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === 'hi' ? 'इस मूल्य के साथ नया उत्पाद बनाएं' : 'Create Product with this Fair Price'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
