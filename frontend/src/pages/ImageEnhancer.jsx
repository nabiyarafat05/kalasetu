import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import {
  Sparkles,
  Upload,
  Camera,
  Download,
  Sliders,
  CheckCircle2,
  Sun,
  ShieldCheck,
  PlusCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ImageEnhancer = ({ onApplyToProduct }) => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const [originalImage, setOriginalImage] = useState(
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'
  );
  const [enhancedImage, setEnhancedImage] = useState(
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=90&sat=20&con=15'
  );
  const [activePreset, setActivePreset] = useState('studio-white');
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    lightingImprovement: '+32% Studio Key Light',
    contrastScore: 'Optimal (1:4.8)',
    clutterReduction: '95% Clutter Cleaned',
    ecommerceReadyScore: '98/100'
  });

  const presets = [
    {
      id: 'studio-white',
      name: 'Studio White Backdrop',
      desc: 'Removes background clutter & simulates bright diffuser studio lighting',
      icon: '✨'
    },
    {
      id: 'warm-craft',
      name: 'Warm Artisanal Glow',
      desc: 'Enhances natural terracotta, wood tones and cultural warmth',
      icon: '🪔'
    },
    {
      id: 'marketplace',
      name: 'E-Commerce Crisp Pro',
      desc: 'Maximizes high-contrast edge sharpness for online buyers',
      icon: '🛍️'
    }
  ];

  const samplePhotos = [
    { label: 'Jaipur Blue Pottery', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80' },
    { label: 'Kashmir Pashmina', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Saharanpur Wood', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dhokra Brass Art', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result);
        triggerEnhancement(reader.result, activePreset);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerEnhancement = async (imgUrl, preset) => {
    setLoading(true);
    try {
      const res = await api.ai.enhanceImage({
        imageUrl: imgUrl,
        preset
      });

      if (res.data?.success) {
        setEnhancedImage(res.data.data.enhancedImageUrl);
        if (res.data.data.metrics) {
          setMetrics(res.data.data.metrics);
        }
        addToast(
          lang === 'hi' ? '✨ फोटो को सफलतापूर्वक स्टूडियो ग्रेड में बदला गया!' : '✨ Image enhanced for professional e-commerce!',
          'success'
        );
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      addToast('Failed to enhance image', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (presetId) => {
    setActivePreset(presetId);
    triggerEnhancement(originalImage, presetId);
  };

  const handleSelectSample = (sampleUrl) => {
    setOriginalImage(sampleUrl);
    triggerEnhancement(sampleUrl, activePreset);
  };

  const handleUseInProduct = () => {
    onApplyToProduct({
      imageUrl: originalImage,
      enhancedImageUrl: enhancedImage
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-terracotta-700 via-indigoClay-900 to-terracotta-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sandalwood-300" />
            <span>AI Studio Photography</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold leading-tight">
            {t('enhanceImage')}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-terracotta-100 font-medium">
            {lang === 'hi'
              ? 'साधारण मोबाइल फोटो को पेशेवर ई-कॉमर्स कैटलॉग फोटो में बदलें। बैकग्राउंड की गंदगी हटाएं और स्टूडियो लाइटिंग पाएं।'
              : 'Turn rustic smartphone handicraft photos into crisp, studio-lit e-commerce ready product images.'}
          </p>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Comparison Slider */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-terracotta-200 shadow-craft">
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white gap-3 animate-fadeIn">
                  <span className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                  <p className="text-xs font-bold">{t('enhancing')}</p>
                </div>
              )}

              <BeforeAfterSlider
                originalImage={originalImage}
                enhancedImage={enhancedImage}
                aspectRatio="aspect-square"
              />
            </div>

            {/* Photo Picker Tools */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-800 border border-terracotta-200 font-bold text-xs flex items-center gap-2 transition"
              >
                <Camera className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपनी फोटो अपलोड करें' : 'Upload Your Craft Photo'}</span>
              </button>

              <button
                onClick={handleUseInProduct}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{lang === 'hi' ? 'उत्पाद में जोड़ें' : 'Attach to Product'}</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Craft Samples */}
          <div className="bg-white p-4 rounded-2xl border border-terracotta-100 shadow-xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
              {lang === 'hi' ? 'डेमो क्राफ्ट फोटो आजमाएं:' : 'Try with authentic demo craft photos:'}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {samplePhotos.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(s.url)}
                  className="rounded-xl overflow-hidden aspect-square border-2 border-transparent hover:border-terracotta-500 focus:border-terracotta-600 transition relative group"
                >
                  <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold py-0.5 text-center truncate">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Presets & Quality Metrics */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* AI Enhancement Presets */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-indigoClay-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-terracotta-600" />
              <span>{lang === 'hi' ? 'एआई लाइटिंग और बैकग्राउंड प्रीसेट' : 'Enhancement Presets'}</span>
            </h3>

            <div className="space-y-2.5">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                    activePreset === preset.id
                      ? 'bg-terracotta-50/80 border-terracotta-500 ring-2 ring-terracotta-200'
                      : 'bg-gray-50/70 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{preset.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-indigoClay-900">
                        {preset.name}
                      </h4>
                      {activePreset === preset.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-terracotta-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{preset.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Quality & E-Commerce Readiness Metrics */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-indigoClay-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>E-Commerce Readiness Score</span>
              </h3>
              <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {metrics.ecommerceReadyScore}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Lighting Level</span>
                <span className="font-bold text-indigoClay-900 mt-0.5 block">{metrics.lightingImprovement}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Background Clutter</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">{metrics.clutterReduction}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Contrast Balance</span>
                <span className="font-bold text-indigoClay-900 mt-0.5 block">{metrics.contrastScore}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Resolution</span>
                <span className="font-bold text-indigoClay-900 mt-0.5 block">300 DPI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
