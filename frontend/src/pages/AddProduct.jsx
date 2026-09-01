import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Camera,
  Upload,
  Coins,
  Wand2,
  Check,
  ArrowLeft,
  X,
  Languages,
  Info,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

export const AddProduct = ({ initialData, capturedImage, onCancel, onSaved }) => {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    hindiDescription: initialData?.hindiDescription || '',
    category: initialData?.category || 'Pottery & Ceramics',
    material: initialData?.material || '',
    dimensions: initialData?.dimensions || '',
    weight: initialData?.weight || '',
    craftType: initialData?.craftType || user?.craftSpecialty || 'Traditional Indian Handicrafts',
    location: initialData?.location || user?.location || 'Jaipur, Rajasthan',
    price: initialData?.price || '',
    imageUrl: initialData?.imageUrl || capturedImage || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    enhancedImageUrl: initialData?.enhancedImageUrl || '',
    status: initialData?.status || 'active',
    aiCatalogData: initialData?.aiCatalogData || null,
    priceSuggestion: initialData?.priceSuggestion || null
  });

  const [loading, setLoading] = useState(false);
  const [aiCatalogLoading, setAiCatalogLoading] = useState(false);
  const [aiPriceLoading, setAiPriceLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialData?.enhancedImageUrl || initialData?.imageUrl || capturedImage || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'
  );

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

  const sampleImages = [
    { label: 'Blue Pottery Vase', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pashmina Shawl', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Wooden Figurine', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80' },
    { label: 'Madhubani Silk', url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dhokra Brass Art', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Helper 1: Generate Catalog Descriptions in EN & HI
  const handleGenerateAICatalog = async () => {
    if (!formData.name && !formData.category) {
      addToast(lang === 'hi' ? 'कृपया पहले उत्पाद का नाम या श्रेणी दर्ज करें' : 'Please provide product name or category first', 'error');
      return;
    }

    setAiCatalogLoading(true);
    try {
      const res = await api.ai.generateCatalog({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        material: formData.material,
        craftType: formData.craftType,
        location: formData.location,
        artisanName: user?.name || 'Radha Devi'
      });

      if (res.data?.success) {
        const catalog = res.data.data;
        setFormData((prev) => ({
          ...prev,
          name: prev.name || catalog.generatedTitle,
          description: catalog.englishDescription,
          hindiDescription: catalog.hindiDescription,
          aiCatalogData: catalog
        }));
        addToast(
          lang === 'hi' ? '✨ एआई ने अंग्रेजी और हिन्दी में विवरण तैयार कर दिया!' : '✨ AI Catalog generated in English & Hindi!',
          'success'
        );
      }
    } catch (error) {
      console.error('AI Catalog Error:', error);
      addToast('Failed to generate AI catalog', 'error');
    } finally {
      setAiCatalogLoading(false);
    }
  };

  // AI Helper 2: Calculate Fair Living Wage Price
  const handleCalculateAIPrice = async () => {
    setAiPriceLoading(true);
    try {
      const res = await api.ai.getPriceSuggestion({
        category: formData.category,
        material: formData.material || 'Traditional Natural Material',
        rawMaterialCost: 350,
        productionCost: 450,
        laborHours: 6,
        craftComplexity: 'intricate'
      });

      if (res.data?.success) {
        const pricing = res.data.data;
        setFormData((prev) => ({
          ...prev,
          price: pricing.recommendedPrice,
          priceSuggestion: pricing
        }));
        addToast(
          lang === 'hi'
            ? `💡 एआई ने ₹${pricing.recommendedPrice} उचित मूल्य सुझाया!`
            : `💡 AI suggested fair retail price: ₹${pricing.recommendedPrice}`,
          'success'
        );
      }
    } catch (error) {
      addToast('Failed to fetch price suggestion', 'error');
    } finally {
      setAiPriceLoading(false);
    }
  };

  // Submit & Save Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      addToast(lang === 'hi' ? 'कृपया उत्पाद का नाम और मूल्य भरें' : 'Please fill product name and price', 'error');
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isEditing) {
        res = await api.products.update(initialData.id || initialData._id, formData);
      } else {
        res = await api.products.create(formData);
      }

      if (res.data?.success) {
        // Trigger celebratory confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        addToast(
          isEditing
            ? (lang === 'hi' ? 'उत्पाद सफलतापूर्वक अपडेट किया गया!' : 'Product updated successfully!')
            : (lang === 'hi' ? 'उत्पाद सफलतापूर्वक प्रकाशित किया गया!' : 'Product published to KalaSetu catalog!'),
          'success'
        );

        if (onSaved) onSaved(res.data.data);
      } else {
        addToast(res.data?.message || 'Error saving product', 'error');
      }
    } catch (error) {
      console.error('Save error:', error);
      addToast('Failed to save product to database', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 bg-white px-3.5 py-2 rounded-xl border border-terracotta-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToDashboard')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {isEditing ? t('editProduct') : t('addProduct')}
          </span>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-200 shadow-craft space-y-8">
        
        {/* Form Title */}
        <div className="border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-serif font-extrabold text-indigoClay-900">
            {isEditing ? t('editProduct') : t('addProduct')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {lang === 'hi'
              ? 'अपने हस्तशिल्प की जानकारी दर्ज करें। आप एआई की सहायता से तुरंत आकर्षक विवरण और उचित मूल्य भी पा सकते हैं।'
              : 'Enter your handicraft details. Use our built-in AI helpers to weave bilingual descriptions and fair trade pricing.'}
          </p>
        </div>

        {/* 1. Photo Upload & Preview Section */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider">
            {t('uploadImage')} *
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {/* Image Box */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-terracotta-300 flex items-center justify-center group shadow-inner">
              <img
                src={imagePreview}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 text-white font-bold text-xs flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition backdrop-blur-xs gap-2"
              >
                <Camera className="w-6 h-6" />
                <span>{lang === 'hi' ? 'फोटो बदलें' : 'Change Photo'}</span>
              </button>
            </div>

            {/* Upload controls & Sample Picker */}
            <div className="md:col-span-2 space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 border border-terracotta-200 text-terracotta-800 text-xs font-bold flex items-center gap-2 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'डिवाइस से फोटो चुनें' : 'Upload from Device'}</span>
                </button>
              </div>

              {/* Sample Craft photos for quick selection */}
              <div>
                <span className="text-[11px] font-bold text-gray-500 block mb-1.5">
                  {lang === 'hi' ? 'या डेमो क्राफ्ट फोटो चुनें:' : 'Or choose sample craft image:'}
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImagePreview(s.url);
                        setFormData((prev) => ({ ...prev, imageUrl: s.url }));
                      }}
                      className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-terracotta-500 focus:border-terracotta-600 transition relative"
                    >
                      <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Product Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('productName')} *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Royal Jaipur Blue Pottery Floral Vase"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm font-medium text-indigoClay-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('category')} *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-sm font-medium text-indigoClay-900 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. AI Catalog Generator Helper Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sandalwood-50 via-terracotta-50 to-khadi border border-terracotta-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shadow-sm">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-indigoClay-900">
                {lang === 'hi' ? 'एआई से द्विभाषी विवरण बनाएं' : 'AI Multilingual Catalog Assistant'}
              </h4>
              <p className="text-[11px] text-gray-600">
                {lang === 'hi' ? '१-क्लिक में अंग्रेजी और हिन्दी में सुंदर विवरण पाएं' : 'Automatically weaves English and Hindi descriptions with SEO'}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={aiCatalogLoading}
            onClick={handleGenerateAICatalog}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
          >
            {aiCatalogLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t('generatingCatalog')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-sandalwood-300" />
                <span>{lang === 'hi' ? 'एआई विवरण जनरेट करें' : 'Generate AI Catalog'}</span>
              </>
            )}
          </button>
        </div>

        {/* 4. Product Descriptions (English & Hindi) */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-indigoClay-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>{t('englishVersion')}</span>
                <span className="text-[10px] text-gray-400 font-normal">(E-Commerce Ready)</span>
              </label>
            </div>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your handicraft, design motifs, technique..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-xs sm:text-sm text-indigoClay-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-terracotta-600" />
              <span>{t('hindiVersion')}</span>
            </label>
            <textarea
              name="hindiDescription"
              rows={3}
              value={formData.hindiDescription}
              onChange={handleInputChange}
              placeholder="अपने हस्तशिल्प का हिन्दी विवरण..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 focus:border-transparent text-xs sm:text-sm text-indigoClay-900 font-devanagari"
            />
          </div>
        </div>

        {/* 5. Craft Specifications (Material, Dimensions, Weight, Origin) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('material')}
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="e.g. Pure Sheesham Wood"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs sm:text-sm text-indigoClay-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('dimensions')}
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder="e.g. 10 x 5 x 5 inches"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs sm:text-sm text-indigoClay-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('weight')}
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g. 650g"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs sm:text-sm text-indigoClay-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('location')}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Jaipur, Rajasthan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs sm:text-sm text-indigoClay-900"
            />
          </div>
        </div>

        {/* 6. Pricing & AI Price Helper */}
        <div className="p-5 rounded-2xl bg-sandalwood-50/60 border border-sandalwood-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider">
                {t('price')} (₹ INR) *
              </label>
              <p className="text-[11px] text-gray-500">
                {lang === 'hi' ? 'कारीगर का उचित खुदरा बिक्री मूल्य' : 'Fair-trade retail price in Indian Rupees'}
              </p>
            </div>

            <button
              type="button"
              disabled={aiPriceLoading}
              onClick={handleCalculateAIPrice}
              className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
            >
              <Coins className="w-4 h-4 text-sandalwood-300" />
              <span>{lang === 'hi' ? 'एआई उचित मूल्य सुझाव' : 'Ask AI Price Helper'}</span>
            </button>
          </div>

          <div className="relative max-w-xs">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-terracotta-700 text-lg">
              ₹
            </span>
            <input
              type="number"
              name="price"
              required
              min="1"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="1850"
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-sandalwood-300 font-extrabold text-lg text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 bg-white"
            />
          </div>
        </div>

        {/* 7. Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs sm:text-sm hover:bg-gray-50 transition"
          >
            {t('cancel')}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition transform active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Saving to Catalog...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEditing ? t('saveProduct') : t('saveProduct')}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
