import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useFavourite } from '../context/FavouriteContext';
import { api } from '../services/api';
import { BuyerProductCard } from '../components/BuyerProductCard';
import {
  Heart,
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const FavouritesPage = ({ onBack, onSelectProduct, onSelectArtisan }) => {
  const { lang, t } = useLanguage();
  const { favouriteIds } = useFavourite();
  const [favProducts, setFavProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      setLoading(true);
      try {
        const res = await api.products.getAll();
        if (res.data?.success) {
          const matching = res.data.data.filter(p =>
            favouriteIds.includes((p.id || p._id).toString())
          );
          setFavProducts(matching);
        }
      } catch (e) {
        console.error('Failed to fetch wishlist products:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchFavs();
  }, [favouriteIds]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 bg-white px-4 py-2.5 rounded-2xl border border-terracotta-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToMarketplace')}</span>
        </button>

        <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200 font-bold text-xs">
          <Heart className="w-4 h-4 fill-red-500" />
          <span>{favouriteIds.length} {t('favourites')}</span>
        </div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-indigoClay-900">
          {t('favourites')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {lang === 'hi' ? 'आपके सहेजे गए पसंदीदा हस्तशिल्प और कलाकृतियां' : 'Handcrafted pieces you love and wish to bring home'}
        </p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => (
            <div key={n} className="bg-white rounded-3xl p-4 border border-gray-100 animate-pulse space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : favProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favProducts.map((product) => (
            <BuyerProductCard
              key={product.id || product._id}
              product={product}
              onViewDetails={onSelectProduct}
              onSelectArtisan={onSelectArtisan}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-terracotta-200 p-8 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-base text-indigoClay-900">{t('noFavourites')}</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Click the heart icon on any craft to save it here for later.
          </p>
          <button
            onClick={onBack}
            className="mt-2 px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-md transition"
          >
            Explore Marketplace
          </button>
        </div>
      )}
    </div>
  );
};
