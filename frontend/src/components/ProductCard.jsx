import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, MapPin, Tag, ArrowUpRight, CheckCircle2, ShoppingBag, Eye, Edit3 } from 'lucide-react';

export const ProductCard = ({ product, onViewDetails, onEdit, onToggleStatus }) => {
  const { lang, t } = useLanguage();

  const isSold = product.status === 'sold';
  const displayImage = product.enhancedImageUrl || product.imageUrl;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-terracotta-100 shadow-craft hover:shadow-craft-hover transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={displayImage}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition duration-500 ${
            isSold ? 'grayscale-[40%] opacity-85' : ''
          }`}
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-xs backdrop-blur-md flex items-center gap-1 ${
            isSold
              ? 'bg-gray-800/80 text-gray-200 border border-gray-600'
              : 'bg-emerald-800/85 text-emerald-100 border border-emerald-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isSold ? 'bg-gray-400' : 'bg-emerald-400 animate-pulse'}`}></span>
            {isSold ? t('sold') : t('active')}
          </span>

          {product.enhancedImageUrl && (
            <span className="bg-sandalwood-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-200" />
              AI Enhanced
            </span>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/95 backdrop-blur-md text-terracotta-800 font-extrabold text-sm sm:text-base px-3 py-1 rounded-xl shadow-md border border-terracotta-100">
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Craft Origin */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5 gap-2">
            <span className="font-semibold text-terracotta-700 truncate">{product.category}</span>
            {product.location && (
              <span className="flex items-center gap-1 text-[11px] text-gray-500 truncate">
                <MapPin className="w-3 h-3 text-sandalwood-500 flex-shrink-0" />
                {product.location.split(',')[0]}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-base text-indigoClay-900 line-clamp-1 group-hover:text-terracotta-600 transition cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {lang === 'hi' && product.hindiDescription ? product.hindiDescription : product.description}
          </p>
        </div>

        {/* Bottom Card Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          {/* Quick Status Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStatus(product.id || product._id);
            }}
            className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition flex items-center gap-1 ${
              isSold
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-terracotta-600" />
            <span>{isSold ? t('markAsActive') : t('markAsSold')}</span>
          </button>

          {/* Action Buttons: Edit & View */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              title={t('editProduct')}
              className="p-1.5 rounded-lg text-gray-500 hover:text-terracotta-600 hover:bg-terracotta-50 transition"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onViewDetails(product)}
              className="px-3 py-1.5 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
            >
              <span>{t('viewDetails')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
