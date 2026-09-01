import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useFavourite } from '../context/FavouriteContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { CheckoutModal } from '../components/CheckoutModal';
import { ShareModal } from '../components/ShareModal';
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  ShieldCheck,
  MapPin,
  Sparkles,
  Languages,
  Package,
  Sliders,
  MessageSquare,
  Award,
  Check
} from 'lucide-react';

export const BuyerProductDetail = ({ product, onBack, onSelectArtisan }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { isFavourite, toggleFavourite } = useFavourite();

  const [activeLangTab, setActiveLangTab] = useState('en');
  const [showSlider, setShowSlider] = useState(Boolean(product.enhancedImageUrl));
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const productId = product.id || product._id;
  const isFav = isFavourite(productId);
  const directArtisanShare = Math.round((product.price || 0) * 0.85);

  const handleBuyNow = () => {
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppChat = () => {
    const text = `Namaste! I am interested in purchasing your handcrafted "${product.name}" (₹${product.price}) from KalaSetu. Can you share more details?`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 bg-white px-4 py-2.5 rounded-2xl border border-terracotta-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToMarketplace')}</span>
        </button>

        <button
          onClick={() => toggleFavourite(product)}
          className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
            isFav
              ? 'bg-red-50 border-red-300 text-red-600'
              : 'bg-white border-gray-200 text-gray-700 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          <span>{isFav ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
        </button>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image & AI Slider */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-3 rounded-3xl border border-terracotta-100 shadow-sm">
            {showSlider && product.enhancedImageUrl ? (
              <BeforeAfterSlider
                originalImage={product.imageUrl}
                enhancedImage={product.enhancedImageUrl}
                aspectRatio="aspect-square"
              />
            ) : (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.enhancedImageUrl || product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {product.enhancedImageUrl && (
              <div className="mt-3 flex items-center justify-between px-2">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-sandalwood-500" />
                  AI Studio Verified
                </span>
                <button
                  type="button"
                  onClick={() => setShowSlider(!showSlider)}
                  className="text-xs font-bold text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{showSlider ? 'Static Photo' : 'Compare Before/After'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Artisan Profile Link Card */}
          <div
            onClick={() => onSelectArtisan && onSelectArtisan(product.artisanId || product.userId)}
            className="p-5 rounded-3xl bg-white border border-terracotta-200 shadow-craft hover:shadow-craft-hover cursor-pointer transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-serif text-xl font-bold border border-terracotta-300 flex-shrink-0">
                🪔
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Created by Master Artisan</span>
                <h4 className="font-bold text-sm sm:text-base text-indigoClay-900 group-hover:text-terracotta-600 transition">
                  {product.artisanName || 'Radha Devi'}
                </h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-terracotta-600" />
                  <span>{product.location || 'Rajasthan, India'}</span>
                </p>
              </div>
            </div>

            <span className="text-xs font-bold text-terracotta-700 group-hover:translate-x-1 transition">
              View Artisan →
            </span>
          </div>
        </div>

        {/* Right Column: Pricing & Descriptions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-terracotta-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-800 font-bold text-xs">
                {product.category}
              </span>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Fair Trade Certified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-indigoClay-900 leading-tight">
              {product.name}
            </h1>

            {/* Price & Direct Artisan Share */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-terracotta-800">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-500 font-medium">Free safe eco-packaging & shipping</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-bold">✨ Direct Artisan Living Share:</span>
                <span className="font-extrabold text-sm">₹{directArtisanShare.toLocaleString('en-IN')} (85%)</span>
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="py-3.5 px-4 rounded-2xl bg-indigoClay-900 hover:bg-indigoClay-950 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 transform active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('addToCart')}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-3.5 px-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 transform active:scale-98"
              >
                <span>{t('buyNow')}</span>
              </button>
            </div>

            {/* WhatsApp Direct Inquiry Button */}
            <button
              type="button"
              onClick={handleWhatsAppChat}
              className="w-full py-2.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'कारीगर से व्हाट्सएप पर बात करें' : 'Chat with Artisan on WhatsApp'}</span>
            </button>
          </div>

          {/* Bilingual Descriptions Tabs */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-sm text-indigoClay-900 flex items-center gap-2">
                <Languages className="w-4 h-4 text-terracotta-600" />
                <span>{t('productDescription')}</span>
              </h3>

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
                  हिन्दी
                </button>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {activeLangTab === 'hi'
                ? product.hindiDescription || product.description
                : product.description}
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-3xl p-6 border border-terracotta-100 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-indigoClay-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-terracotta-600" />
              <span>Craft & Material Details</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('material')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{product.material || 'Organic Materials'}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('dimensions')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{product.dimensions || 'Standard'}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('weight')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{product.weight || '500g'}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">{t('craftType')}</span>
                <span className="font-semibold text-indigoClay-900 mt-0.5 block">{product.craftType || 'Traditional Craft'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          items={[
            {
              productId: product.id || product._id,
              name: product.name,
              price: product.price,
              quantity: 1,
              imageUrl: product.enhancedImageUrl || product.imageUrl,
              artisanId: product.artisanId || product.userId,
              artisanName: product.artisanName
            }
          ]}
          totalAmount={product.price}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
};
