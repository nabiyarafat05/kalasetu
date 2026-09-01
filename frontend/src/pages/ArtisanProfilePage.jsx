import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { BuyerProductCard } from '../components/BuyerProductCard';
import {
  ArrowLeft,
  MapPin,
  Award,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Package,
  Calendar,
  Layers
} from 'lucide-react';

export const ArtisanProfilePage = ({ artisanId, onBack, onSelectProduct }) => {
  const { lang, t } = useLanguage();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisanDetails = async () => {
      setLoading(true);
      try {
        const res = await api.artisans.getById(artisanId);
        if (res.data?.success) {
          setArtisan(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch artisan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanDetails();
  }, [artisanId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 text-center space-y-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  if (!artisan) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta-700 hover:text-terracotta-800 bg-white px-4 py-2.5 rounded-2xl border border-terracotta-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToMarketplace')}</span>
        </button>
      </div>

      {/* Artisan Banner & Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-200 shadow-craft relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={artisan.avatar}
            alt={artisan.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-sandalwood-300 ring-2 ring-terracotta-200 shadow-lg flex-shrink-0"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Master Artisan</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-indigoClay-900">
              {artisan.name}
            </h1>

            <p className="text-sm font-bold text-terracotta-700">
              {artisan.craftSpecialty}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                {artisan.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sandalwood-600" />
                {artisan.experienceYears || 20}+ Years Experience
              </span>
            </div>
          </div>
        </div>

        {/* Bio and Craft Lineage */}
        <div className="p-5 rounded-2xl bg-khadi border border-terracotta-100 space-y-3">
          <h3 className="font-bold text-xs text-terracotta-800 uppercase tracking-wider">
            {t('artisanStory')} & Heritage Lineage
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
            "{artisan.bio}"
          </p>

          {artisan.craftLineage && (
            <div className="pt-2 border-t border-terracotta-200/60 text-xs text-gray-600 font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-sandalwood-600 flex-shrink-0" />
              <span><strong>Lineage:</strong> {artisan.craftLineage}</span>
            </div>
          )}

          {artisan.awards && (
            <div className="text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Recognitions:</strong> {artisan.awards}</span>
            </div>
          )}
        </div>
      </div>

      {/* Artisan Product Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-indigoClay-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-terracotta-600" />
            <span>Handcrafted by {artisan.name}</span>
          </h2>
          <span className="text-xs text-gray-500 font-bold">{artisan.products?.length || 0} Crafts</span>
        </div>

        {artisan.products && artisan.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artisan.products.map((product) => (
              <BuyerProductCard
                key={product.id || product._id}
                product={product}
                onViewDetails={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 p-6">
            <p className="text-xs text-gray-500">No active products listed currently by this artisan.</p>
          </div>
        )}
      </div>
    </div>
  );
};
