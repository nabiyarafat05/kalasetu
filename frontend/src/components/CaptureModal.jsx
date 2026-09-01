import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Camera, Upload, Sparkles, X, ArrowRight, Image as ImageIcon } from 'lucide-react';

export const CaptureModal = ({ onClose, onProceedToProduct }) => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();
  const [preview, setPreview] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const fileInputRef = useRef(null);

  const samplePhotos = [
    { label: 'Jaipur Pottery', url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pashmina Shawl', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Wood Carving', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80' },
    { label: 'Madhubani Art', url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (url) => {
    setPreview(url);
  };

  const handleProceed = () => {
    if (!preview) {
      addToast(lang === 'hi' ? 'कृपया पहले एक फोटो चुनें या खींचें' : 'Please capture or select a photo first', 'error');
      return;
    }
    onProceedToProduct(preview);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-terracotta-200 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-terracotta-100 text-terracotta-700">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-indigoClay-900">
              {t('captureProduct')}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'hi' ? 'अपने शिल्प की फोटो खींचें या फोन से चुनें' : 'Snap a fresh photo of your craft or pick from gallery'}
            </p>
          </div>
        </div>

        {/* Image Preview Box or Capture Zone */}
        <div className="mb-4">
          {preview ? (
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 border border-terracotta-200 shadow-inner group">
              <img src={preview} alt="Captured preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full text-xs font-bold transition shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-terracotta-300 hover:border-terracotta-500 rounded-2xl p-8 text-center cursor-pointer bg-terracotta-50/40 hover:bg-terracotta-50 transition group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
                className="hidden"
              />
              <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-md flex items-center justify-center text-terracotta-600 mb-3 group-hover:scale-110 transition">
                <Camera className="w-7 h-7" />
              </div>
              <p className="font-bold text-sm text-indigoClay-900">
                {lang === 'hi' ? 'कैमरा खोलें या फोटो चुनें' : 'Open Camera or Select Photo'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Supports Mobile Camera & Photos</p>
            </div>
          )}
        </div>

        {/* Quick Sample Presets */}
        {!preview && (
          <div className="mb-5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
              {lang === 'hi' ? 'या डेमो क्राफ्ट फोटो चुनें:' : 'Or pick a demo craft photo:'}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {samplePhotos.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSample(item.url)}
                  className="rounded-xl overflow-hidden border border-gray-200 hover:border-terracotta-500 cursor-pointer transition transform hover:scale-105 aspect-square bg-gray-100 relative group"
                >
                  <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold py-0.5 text-center truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          disabled={!preview}
          onClick={handleProceed}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition ${
            preview
              ? 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>{lang === 'hi' ? 'उत्पाद विवरण में आगे बढ़ें' : 'Continue to Create Product'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
