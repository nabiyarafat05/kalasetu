import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { CaptureModal } from '../components/CaptureModal';
import {
  Camera,
  Wand2,
  Coins,
  Plus,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Package,
  Layers,
  Image as ImageIcon,
  PackageCheck,
  Store,
  ChevronRight
} from 'lucide-react';

export const Dashboard = ({ onNavigate, onSelectProduct, onEditProduct }) => {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'sold'
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);

  const categories = [
    'All',
    'Pottery & Ceramics',
    'Textiles & Handloom',
    'Woodwork & Carvings',
    'Paintings & Folk Art',
    'Metalcraft & Brass',
    'Jewelry & Beads'
  ];

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes] = await Promise.all([
        api.products.getAll({ artisanId: user?.id || user?._id }),
        api.orders.getArtisanOrders()
      ]);

      if (prodRes.data?.success) {
        setProducts(prodRes.data.data);
      }
      if (orderRes.data?.success) {
        setIncomingOrders(orderRes.data.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleToggleStatus = async (productId) => {
    try {
      const res = await api.products.toggleStatus(productId);
      if (res.data?.success) {
        addToast(res.data.message, 'success');
        fetchDashboardData();
      }
    } catch (error) {
      addToast('Failed to update product status', 'error');
    }
  };

  const handleCaptureProceed = (capturedImage) => {
    setIsCaptureModalOpen(false);
    onNavigate('add-product', { capturedImage });
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const s = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      p.name?.toLowerCase().includes(s) ||
      p.description?.toLowerCase().includes(s) ||
      p.craftType?.toLowerCase().includes(s) ||
      p.location?.toLowerCase().includes(s);

    return matchesTab && matchesCategory && matchesSearch;
  });

  // Calculate stats
  const totalCount = products.length;
  const activeCount = products.filter((p) => p.status === 'active').length;
  const soldCount = products.filter((p) => p.status === 'sold').length;
  const totalRevenue = products.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const pendingOrdersCount = incomingOrders.filter(o => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. Artisan Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-terracotta-700 via-terracotta-600 to-sandalwood-500 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute right-10 top-0 text-white/10 text-9xl font-serif pointer-events-none select-none">
          🪔
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-3 border border-white/30 text-white">
            <Sparkles className="w-3.5 h-3.5 text-sandalwood-300" />
            <span>{lang === 'hi' ? 'एआई डिजिटल कारीगर प्लेटफॉर्म' : 'AI-Powered Digital Artisan Hub'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-white leading-tight">
            {t('welcome')}, {user?.name || 'Radha Devi'} 🙏
          </h1>

          <p className="mt-2 text-sm sm:text-base text-terracotta-100 font-medium leading-relaxed">
            {lang === 'hi'
              ? `${user?.location || 'जयपुर'} के आपके पारंपरिक ${user?.craftSpecialty || 'हस्तशिल्प'} को दुनिया भर के ग्राहकों तक पहुँचाने के लिए आपका स्वागत है।`
              : `Digitize your handcrafted heritage from ${user?.location || 'Jaipur, Rajasthan'}, enhance your craft photography, and reach conscious buyers worldwide.`}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-black/25 backdrop-blur-md px-3 py-1 rounded-full font-semibold border border-white/20">
              📍 {user?.location || 'Jaipur, Rajasthan'}
            </span>
            <span className="bg-black/25 backdrop-blur-md px-3 py-1 rounded-full font-semibold border border-white/20">
              🎨 {user?.craftSpecialty || 'Traditional Indian Handicrafts'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Incoming Orders Alert Banner (If orders exist) */}
      {incomingOrders.length > 0 && (
        <div
          onClick={() => onNavigate('orders')}
          className="p-5 rounded-3xl bg-emerald-50 border border-emerald-300 shadow-sm cursor-pointer hover:bg-emerald-100/80 transition flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-emerald-950">
                  {lang === 'hi' ? `आपके पास ${pendingOrdersCount} नए खरीद अनुरोध हैं!` : `You have ${pendingOrdersCount} customer orders to fulfill!`}
                </h3>
                <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Live Orders
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5">
                {lang === 'hi' ? 'ऑर्डर विवरण देखने और निर्माण स्थिति अपडेट करने के लिए टैप करें' : 'Tap to view customer delivery details and update crafting status'}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
            <span>{t('incomingOrders')}</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      )}

      {/* 3. Quick Action Tiles */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-indigoClay-900 mb-3 flex items-center gap-2">
          <Layers className="w-5 h-5 text-terracotta-600" />
          <span>{t('quickActions')}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Tile 1: Capture Product */}
          <button
            onClick={() => setIsCaptureModalOpen(true)}
            className="group p-4 rounded-2xl bg-white border border-terracotta-100 shadow-sm hover:shadow-craft-hover hover:border-terracotta-400 transition-all text-left flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-2xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center group-hover:scale-110 transition">
              <Camera className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-indigoClay-900 group-hover:text-terracotta-600 transition">
                {t('captureProduct')}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Instant Camera</p>
            </div>
          </button>

          {/* Tile 2: Create AI Catalog */}
          <button
            onClick={() => onNavigate('catalog')}
            className="group p-4 rounded-2xl bg-white border border-terracotta-100 shadow-sm hover:shadow-craft-hover hover:border-terracotta-400 transition-all text-left flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-2xl bg-sandalwood-50 text-sandalwood-600 flex items-center justify-center group-hover:scale-110 transition">
              <Wand2 className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-indigoClay-900 group-hover:text-terracotta-600 transition">
                {t('createCatalog')}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">EN & हिन्दी Voice</p>
            </div>
          </button>

          {/* Tile 3: AI Price Suggest */}
          <button
            onClick={() => onNavigate('pricing')}
            className="group p-4 rounded-2xl bg-white border border-terracotta-100 shadow-sm hover:shadow-craft-hover hover:border-terracotta-400 transition-all text-left flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <Coins className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-indigoClay-900 group-hover:text-terracotta-600 transition">
                {t('priceSuggest')}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Fair Living Wage</p>
            </div>
          </button>

          {/* Tile 4: AI Image Enhancer */}
          <button
            onClick={() => onNavigate('enhancer')}
            className="group p-4 rounded-2xl bg-white border border-terracotta-100 shadow-sm hover:shadow-craft-hover hover:border-terracotta-400 transition-all text-left flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-2xl bg-indigoClay-50 text-indigoClay-600 flex items-center justify-center group-hover:scale-110 transition">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-indigoClay-900 group-hover:text-terracotta-600 transition">
                {t('enhanceImage')}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Studio Lighting</p>
            </div>
          </button>

          {/* Tile 5: Add New Product */}
          <button
            onClick={() => onNavigate('add-product')}
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-terracotta-600 to-terracotta-700 text-white shadow-md hover:shadow-lg transition-all text-left flex flex-col justify-between"
          >
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-sm text-white">
                {t('addProduct')}
              </h3>
              <p className="text-[11px] text-terracotta-100 mt-0.5">Publish Craft</p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-terracotta-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>{t('statsTotal')}</span>
            <Package className="w-4 h-4 text-terracotta-500" />
          </div>
          <p className="text-2xl font-extrabold text-indigoClay-900 mt-2">{totalCount}</p>
          <span className="text-[11px] text-gray-400 mt-0.5 block">Handcrafted items</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-terracotta-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>{t('statsActive')}</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-700 mt-2">{activeCount}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Live in Marketplace</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-terracotta-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>{t('statsSold')}</span>
            <CheckCircle2 className="w-4 h-4 text-sandalwood-600" />
          </div>
          <p className="text-2xl font-extrabold text-sandalwood-800 mt-2">{soldCount}</p>
          <span className="text-[11px] text-gray-400 mt-0.5 block">Completed sales</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-terracotta-100 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
            <span>{t('statsRevenue')}</span>
            <TrendingUp className="w-4 h-4 text-terracotta-600" />
          </div>
          <p className="text-2xl font-extrabold text-terracotta-700 mt-2">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] text-gray-400 mt-0.5 block">Catalog valuation</span>
        </div>
      </div>

      {/* 5. Products Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-indigoClay-900 font-serif">
              {t('myProducts')}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {lang === 'hi' ? 'अपने सभी हस्तशिल्प उत्पादों को प्रबंधित करें' : 'Manage, edit and showcase your digital artisan inventory'}
            </p>
          </div>

          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-terracotta-200 text-xs sm:text-sm text-indigoClay-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-xs"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-gray-200">
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-xs text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'all' ? 'bg-terracotta-600 text-white' : 'text-gray-600 hover:text-terracotta-600'
              }`}
            >
              {t('allProducts')} ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'active' ? 'bg-terracotta-600 text-white' : 'text-gray-600 hover:text-terracotta-600'
              }`}
            >
              {t('activeProducts')} ({activeCount})
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'sold' ? 'bg-terracotta-600 text-white' : 'text-gray-600 hover:text-terracotta-600'
              }`}
            >
              {t('soldProducts')} ({soldCount})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-indigoClay-900 font-medium focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-xs cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-4">
                <div className="aspect-square bg-gray-200 rounded-xl"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id || product._id}
                product={product}
                onViewDetails={onSelectProduct}
                onEdit={onEditProduct}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-terracotta-200 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-terracotta-50 text-terracotta-600 mx-auto flex items-center justify-center mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-indigoClay-900">{t('noProductsFound')}</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {t('createFirstProduct')}
            </p>
            <button
              onClick={() => onNavigate('add-product')}
              className="mt-5 px-6 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addProduct')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Capture Modal */}
      {isCaptureModalOpen && (
        <CaptureModal
          onClose={() => setIsCaptureModalOpen(false)}
          onProceedToProduct={handleCaptureProceed}
        />
      )}
    </div>
  );
};
