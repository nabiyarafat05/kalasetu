import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BuyerProductCard } from '../components/BuyerProductCard';
import { RegionFilter } from '../components/RegionFilter';
import {
  Store,
  Sparkles,
  Search,
  SlidersHorizontal,
  MapPin,
  ShieldCheck,
  Award,
  ArrowRight,
  Heart,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const MarketplaceHome = ({ onSelectProduct, onSelectArtisan }) => {
  const { lang, t } = useLanguage();
  const { isBuyer, isArtisan } = useAuth();

  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [priceSort, setPriceSort] = useState('newest');

  const categories = [
    'All',
    'Pottery & Ceramics',
    'Textiles & Handloom',
    'Woodwork & Carvings',
    'Paintings & Folk Art',
    'Metalcraft & Brass',
    'Jewelry & Beads'
  ];

  const fetchMarketplaceData = async () => {
    setLoading(true);
    try {
      const [prodRes, artRes] = await Promise.all([
        api.products.getAll({
          category: selectedCategory,
          region: selectedRegion,
          search: searchTerm,
          sort: priceSort,
          status: 'active'
        }),
        api.artisans.getAll()
      ]);

      if (prodRes.data?.success) {
        setProducts(prodRes.data.data);
      }
      if (artRes.data?.success) {
        setArtisans(artRes.data.data);
      }
    } catch (error) {
      console.error('Marketplace fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceData();
  }, [selectedCategory, selectedRegion, priceSort, searchTerm]);

  return (
    <div className="space-y-10 animate-fadeIn pb-16">
      
      {/* 1. Hero Marketplace Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-terracotta-800 via-indigoClay-900 to-terracotta-900 text-white p-6 sm:p-10 shadow-xl">
        {/* Background ambient lighting */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-sandalwood-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-8 bottom-4 text-8xl text-white/5 font-serif select-none pointer-events-none">
          🪔
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/20 text-sandalwood-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'सीधे उस्ताद कारीगरों से खरीदारी' : 'Direct Artisan-to-Consumer Fair Trade'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white leading-tight">
            {lang === 'hi' ? 'भारतीय धरोहर व हस्तशिल्प का जीवंत हाट' : 'Preserving Timeless Indian Craftsmanship'}
          </h1>

          <p className="text-xs sm:text-base text-terracotta-100 font-medium leading-relaxed">
            {lang === 'hi'
              ? 'जयपुर की ब्लू पॉटरी, कश्मीर का पश्मीना, सहारनपुर की काष्ठकला और मिथिला की लोककला—सीधे कारीगरों से उचित मूल्य पर पाएं।'
              : 'Every purchase directly provides sustainable living wages to rural artisan families. Discover authentic GI-tagged masterpieces.'}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-xs">
            <span className="bg-emerald-800/60 backdrop-blur-md px-3 py-1 rounded-full font-bold border border-emerald-500/40 flex items-center gap-1.5 text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              85% Direct Artisan Wage
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-semibold border border-white/20">
              🌿 100% Eco-Friendly Materials
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full font-semibold border border-white/20">
              📜 Verified GI Heritage
            </span>
          </div>
        </div>
      </div>

      {/* 2. Regional Craft Explorer Filter */}
      <RegionFilter
        selectedRegion={selectedRegion}
        onSelectRegion={(reg) => setSelectedRegion(reg)}
      />

      {/* 3. Search Bar, Category Pills & Sort Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative max-w-lg w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchMarketplace')}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-terracotta-200 text-xs sm:text-sm text-indigoClay-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-xs"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Sort:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="bg-white border border-gray-200 text-xs rounded-xl px-3 py-2 text-indigoClay-900 font-bold focus:ring-2 focus:ring-terracotta-500 shadow-xs"
            >
              <option value="newest">✨ Newest Additions</option>
              <option value="price_low">₹ Price: Low to High</option>
              <option value="price_high">₹ Price: High to Low</option>
              <option value="name">🔤 Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition border ${
                selectedCategory === cat
                  ? 'bg-indigoClay-900 text-white border-indigoClay-900 shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat === 'All' ? t('allCategories') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-indigoClay-900">
            {lang === 'hi' ? 'उपलब्ध प्रामाणिक हस्तशिल्प' : 'Authentic Handcrafted Treasures'}
          </h2>
          <span className="text-xs text-gray-500 font-semibold">{products.length} items</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-4 border border-gray-100 animate-pulse space-y-4">
                <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <BuyerProductCard
                key={product.id || product._id}
                product={product}
                onViewDetails={onSelectProduct}
                onSelectArtisan={onSelectArtisan}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-terracotta-200 p-8">
            <span className="text-4xl block mb-2">🏺</span>
            <h3 className="font-bold text-lg text-indigoClay-900">{t('noProductsFound')}</h3>
            <p className="text-xs text-gray-500 mt-1">Try changing your category or regional filter.</p>
          </div>
        )}
      </div>

      {/* 5. Featured Master Artisans Section */}
      {artisans.length > 0 && (
        <div className="pt-8 border-t border-terracotta-200/60 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-indigoClay-900">
                {t('meetTheArtisans')}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === 'hi' ? 'पीढ़ियों से भारतीय संस्कृति को संजोए रखने वाले हमारे शिल्पकार' : 'Generations of indigenous craft mastery and cultural heritage'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {artisans.map((artisan) => (
              <div
                key={artisan.id || artisan._id}
                onClick={() => onSelectArtisan(artisan.id || artisan._id)}
                className="bg-white rounded-3xl p-5 border border-terracotta-100 shadow-craft hover:shadow-craft-hover transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-sandalwood-300 ring-2 ring-terracotta-100 group-hover:scale-105 transition"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-indigoClay-900 group-hover:text-terracotta-600 transition truncate">
                      {artisan.name}
                    </h3>
                    <p className="text-xs text-terracotta-700 font-semibold truncate mt-0.5">
                      {artisan.craftSpecialty}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                      <MapPin className="w-3 h-3 text-sandalwood-500" />
                      {artisan.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                  "{artisan.bio}"
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-semibold">{artisan.productCount || 0} Crafts Available</span>
                  <span className="font-bold text-terracotta-700 group-hover:translate-x-1 transition flex items-center gap-1">
                    <span>{t('viewArtisanShop')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
