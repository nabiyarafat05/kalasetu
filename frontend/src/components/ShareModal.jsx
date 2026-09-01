import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { X, Share2, Copy, Check, MessageSquare, Download } from 'lucide-react';

export const ShareModal = ({ product, onClose }) => {
  const { lang, t } = useLanguage();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const pitchText = product.aiCatalogData?.whatsappPitch || 
    `✨ *${product.name}* ✨\nAuthentic Indian Handcraft (${product.category})\nPrice: ₹${product.price}\nDirect from artisan ${product.artisanName || 'KalaSetu'}.\nDM to purchase!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    addToast(t('copied'), 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(pitchText)}`;
    window.open(url, '_blank');
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

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-indigoClay-900">
              {lang === 'hi' ? 'व्हाट्सएप / सोशल मीडिया पर शेयर करें' : 'Share Artisan Product'}
            </h3>
            <p className="text-xs text-gray-500">Ready-to-post high-converting message for buyers</p>
          </div>
        </div>

        {/* Card Preview */}
        <div className="p-4 rounded-2xl bg-khadi border border-terracotta-100 mb-4 flex items-center gap-4">
          <img
            src={product.enhancedImageUrl || product.imageUrl}
            alt={product.name}
            className="w-20 h-20 rounded-xl object-cover border border-terracotta-200 flex-shrink-0"
          />
          <div>
            <h4 className="font-bold text-sm text-indigoClay-900">{product.name}</h4>
            <p className="text-xs text-terracotta-700 font-bold mt-0.5">₹{product.price?.toLocaleString('en-IN')}</p>
            <span className="inline-block mt-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Fair Trade Artisan Made
            </span>
          </div>
        </div>

        {/* Pitch Text Box */}
        <div className="relative mb-5">
          <textarea
            readOnly
            value={pitchText}
            rows={5}
            className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-800 focus:outline-none resize-none leading-relaxed"
          />
          <button
            onClick={handleCopy}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-xs flex items-center gap-1.5 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t('copied') : t('copyToClipboard')}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('shareOnWhatsApp')}</span>
          </button>

          <button
            onClick={handleCopy}
            className="py-3 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <Copy className="w-4 h-4" />
            <span>{t('copyToClipboard')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
