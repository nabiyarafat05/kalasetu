import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import {
  Heart,
  ShoppingCart,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Check
} from 'lucide-react';

export const BuyerProductCard = ({ product, onViewDetails, onSelectArtisan }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { isFavourite, toggleFavourite } = useFavourite();

  const productId = product.id || product._id;
  const isFav = isFavourite(productId);
  const displayImage = product.enhancedImageUrl || product.imageUrl;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleFavourite(product);
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-terracotta-100/80 shadow-craft hover:shadow-craft-hover transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />

        {/* Top Badges: Category & Wishlist */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
            {product.category}
          </span>

          <button
            type="button"
            onClick={handleToggleFav}
            className={`pointer-events-auto w-9 h-9 rounded-full flex items-center justify-center transition backdrop-blur-md shadow-md ${
              isFav
                ? 'bg-red-500 text-white'
                : 'bg-white/85 text-gray-700 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* AI Enhanced Tag */}
        {product.enhancedImageUrl && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-sandalwood-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-200" />
              Studio Verified
            </span>
          </div>
        )}

        {/* Regional GI Tag Origin */}
        {product.region && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-white/90 backdrop-blur-md text-indigoClay-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-gray-200">
              <MapPin className="w-3 h-3 text-terracotta-600" />
              {product.region}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Artisan Profile Link */}
          <div
            onClick={(e) => {
              if (onSelectArtisan && (product.artisanId || product.userId)) {
                e.stopPropagation();
                onSelectArtisan(product.artisanId || product.userId);
              }
            }}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-terracotta-600 transition mb-1"
          >
            <span className="font-serif text-terracotta-700 font-bold">🪔 {product.artisanName || 'Master Artisan'}</span>
            <span className="text-[10px] text-gray-400">• {product.location?.split(',')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base text-indigoClay-900 line-clamp-1 group-hover:text-terracotta-600 transition">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {lang === 'hi' && product.hindiDescription ? product.hindiDescription : product.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-gray-400 font-medium block">{t('price')}</span>
            <div className="text-base sm:text-lg font-extrabold text-terracotta-800">
              ₹{product.price?.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm transform active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">{t('addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
