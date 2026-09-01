import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ShareModal } from '../components/ShareModal';
import { PriceGauge } from '../components/PriceGauge';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Tag,
  ShieldCheck,
  Languages,
  Package,
  Layers,
  Award,
  Sliders
} from 'lucide-react';

export const ProductDetail = ({ product, onBack, onEdit, onProductDeleted, onProductUpdated }) => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();

  const [activeLangTab, setActiveLangTab] = useState('en');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showSlider, setShowSlider] = useState(Boolean(product.enhancedImageUrl));
  const [currentProduct, setCurrentProduct] = useState(product);

  const isSold = currentProduct.status === 'sold';

  const handleToggleStatus = async () => {
    try {
      const res = await api.products.toggleStatus(currentProduct.id || currentProduct._id);
      if (res.data?.success) {
        setCurrentProduct(res.data.data);
        addToast(res.data.message, 'success');
        if (onProductUpdated) onProductUpdated(res.data.data);
      }
    } catch (error) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(t('deleteConfirm'))) {
      try {
        const res = await api.products.delete(currentProduct.id || currentProduct._id);
        if (res.data?.success) {
          addToast('Product removed from your catalog', 'success');
          if (onProductDeleted) onProductDeleted(currentProduct.id || currentProduct._id);
        }
      } catch (error) {
        addToast('Failed to delete product', 'error');
      }
    }
  };

  const aiCatalog = currentProduct.aiCatalogData;
  const priceData = currentProduct.priceSuggestion;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 bg-white px-3.5 py-2 rounded-xl border border-terracotta-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToDashboard')}</span>
        </button>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition"
            title={t('shareOnWhatsApp')}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t('shareOnWhatsApp')}</span>
          </button>

          <button
            onClick={() => onEdit(currentProduct)}
            className="p-2.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 border border-terracotta-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">{t('editProduct')}</span>
          </button>

          <button
            onClick={handleDelete}
            className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition"
            title={t('delete')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Gallery & Before/After Slider */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-3 rounded-3xl border border-terracotta-100 shadow-sm">
            {showSlider && currentProduct.enhancedImageUrl ? (
              <BeforeAfterSlider
                originalImage={currentProduct.imageUrl}
                enhancedImage={currentProduct.enhancedImageUrl}
                aspectRatio="aspect-square"
              />
            ) : (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={currentProduct.enhancedImageUrl || currentProduct.imageUrl}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Slider Switch if enhanced photo exists */}
            {currentProduct.enhancedImageUrl && (
              <div className="mt-3 flex items-center justify-between px-2">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-sandalwood-500" />
                  AI Studio Enhancement
                </span>
                <button
                  type="button"
                  onClick={() => setShowSlider(!showSlider)}
                  className="text-xs font-bold text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{showSlider ? 'View Static Photo' : 'Compare Before/After'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Artisan Heritage Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-khadi to-sandalwood-50/50 border border-terracotta-200 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-serif text-lg font-bold border border-terracotta-300 flex-shrink-0">
              🪔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-indigoClay-900">
                  {currentProduct.artisanName || 'Radha Devi'}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Verified Master Artisan
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-600" />
                <span>{currentProduct.location || 'Jaipur, Rajasthan, India'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Bilingual AI Descriptions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Status */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-terracotta-100 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-800 font-bold text-xs">
                {currentProduct.category}
              </span>

              {/* Status Switcher Button */}
              <button
                onClick={handleToggleStatus}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition ${
                  isSold
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isSold ? t('sold') : t('active')}</span>
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-indigoClay-900 leading-tight">
              {currentProduct.name}
            </h1>

            {/* Price Badge */}
            <div className="flex items-baseline gap-3 pt-2 border-t border-gray-100">
              <span className="text-3xl font-extrabold text-terracotta-700">
                ₹{currentProduct.price?.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Direct Artisan Fair Price
              </span>
            </div>
          </div>

          {/* Bilingual Descriptions Tabs (English / हिन्दी) */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-indigoClay-900 flex items-center gap-2">
                <Languages className="w-4 h-4 text-terracotta-600" />
                <span>{t('productDescription')}</span>
              </h3>

              {/* Language Switch Pills */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeLangTab === 'en' ? 'bg-terracotta-600 text-white' : 'text-gray-600 hover:text-terracotta-600'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setActiveLangTab('hi')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeLangTab === 'hi' ? 'bg-terracotta-600 text-white font-devanagari' : 'text-gray-600 hover:text-terracotta-600 font-devanagari'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            {/* Description Text */}
            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {activeLangTab === 'hi'
                ? currentProduct.hindiDescription || currentProduct.description
                : currentProduct.description}
            </div>

            {/* Bullet Points if AI Catalog generated */}
            {aiCatalog?.bulletPoints && aiCatalog.bulletPoints.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Key Craft Highlights:
                </span>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {aiCatalog.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-terracotta-600 font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Product Specifications Grid */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta-100 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-indigoClay-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-terracotta-600" />
              <span>Craft Specifications</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('material')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{currentProduct.material || 'Organic Materials'}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('dimensions')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{currentProduct.dimensions || 'Standard Size'}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('weight')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{currentProduct.weight || '500g'}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('craftType')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{currentProduct.craftType || 'Traditional Craft'}</span>
              </div>
            </div>
          </div>

          {/* Pricing Rationale Component if available */}
          {priceData && (
            <PriceGauge priceData={priceData} />
          )}
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal product={currentProduct} onClose={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};
