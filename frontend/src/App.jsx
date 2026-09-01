import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider, useCart } from './context/CartContext';
import { FavouriteProvider, useFavourite } from './context/FavouriteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { MarketplaceHome } from './pages/MarketplaceHome';
import { AddProduct } from './pages/AddProduct';
import { ProductDetail } from './pages/ProductDetail';
import { BuyerProductDetail } from './pages/BuyerProductDetail';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { OrdersPage } from './pages/OrdersPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AICatalogGenerator } from './pages/AICatalogGenerator';
import { ImageEnhancer } from './pages/ImageEnhancer';
import { PriceSuggestion } from './pages/PriceSuggestion';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import {
  Home,
  Store,
  PlusCircle,
  Wand2,
  Image as ImageIcon,
  Coins,
  PackageCheck,
  Heart,
  ShoppingCart,
  User as UserIcon
} from 'lucide-react';

function MainApp() {
  const { lang, t } = useLanguage();
  const { user, isArtisan, isBuyer } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { favCount } = useFavourite();

  // Navigation state
  const [currentTab, setCurrentTab] = useState(isArtisan ? 'dashboard' : 'marketplace');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArtisanId, setSelectedArtisanId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [pendingDraft, setPendingDraft] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Navigation handlers
  const handleNavigate = (tab, extraParams = {}) => {
    if (extraParams.capturedImage) {
      setCapturedImage(extraParams.capturedImage);
      setProductToEdit(null);
    }
    if (extraParams.product) {
      setSelectedProduct(extraParams.product);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBuyerProduct = (product) => {
    setSelectedProduct(product);
    setCurrentTab('buyer-product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtisanProduct = (product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArtisan = (artisanId) => {
    setSelectedArtisanId(artisanId);
    setCurrentTab('artisan-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setCurrentTab('add-product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyAIToProduct = (draftData) => {
    setPendingDraft(draftData);
    setProductToEdit(draftData);
    setCurrentTab('add-product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSaved = (savedProduct) => {
    setSelectedProduct(savedProduct);
    setProductToEdit(null);
    setPendingDraft(null);
    setCapturedImage(null);
    setCurrentTab('product-detail');
  };

  const handleProductDeleted = () => {
    setSelectedProduct(null);
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-khadi font-sans selection:bg-terracotta-200">
      
      {/* Top Navigation Bar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-12 flex-1 w-full">
        
        {/* Marketplace Home (Buyer Discovery) */}
        {currentTab === 'marketplace' && (
          <MarketplaceHome
            onSelectProduct={handleSelectBuyerProduct}
            onSelectArtisan={handleSelectArtisan}
          />
        )}

        {/* Buyer Product Detail */}
        {currentTab === 'buyer-product-detail' && selectedProduct && (
          <BuyerProductDetail
            product={selectedProduct}
            onBack={() => setCurrentTab('marketplace')}
            onSelectArtisan={handleSelectArtisan}
          />
        )}

        {/* Public Master Artisan Profile */}
        {currentTab === 'artisan-profile' && selectedArtisanId && (
          <ArtisanProfilePage
            artisanId={selectedArtisanId}
            onBack={() => setCurrentTab('marketplace')}
            onSelectProduct={handleSelectBuyerProduct}
          />
        )}

        {/* Artisan Seller Dashboard */}
        {currentTab === 'dashboard' && (
          <Dashboard
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectArtisanProduct}
            onEditProduct={handleEditProduct}
          />
        )}

        {/* Add / Edit Product */}
        {currentTab === 'add-product' && (
          <AddProduct
            initialData={productToEdit || pendingDraft}
            capturedImage={capturedImage}
            onCancel={() => {
              setProductToEdit(null);
              setPendingDraft(null);
              setCapturedImage(null);
              setCurrentTab(isArtisan ? 'dashboard' : 'marketplace');
            }}
            onSaved={handleProductSaved}
          />
        )}

        {/* Artisan Product Detail & Management */}
        {currentTab === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentTab('dashboard')}
            onEdit={handleEditProduct}
            onProductDeleted={handleProductDeleted}
            onProductUpdated={(updated) => setSelectedProduct(updated)}
          />
        )}

        {/* Orders Page (Two-Sided) */}
        {currentTab === 'orders' && (
          <OrdersPage onSelectProduct={handleSelectBuyerProduct} />
        )}

        {/* Wishlist / Favourites */}
        {currentTab === 'favourites' && (
          <FavouritesPage
            onBack={() => setCurrentTab('marketplace')}
            onSelectProduct={handleSelectBuyerProduct}
            onSelectArtisan={handleSelectArtisan}
          />
        )}

        {/* User Profile */}
        {currentTab === 'profile' && (
          <ProfilePage onBack={() => setCurrentTab(isArtisan ? 'dashboard' : 'marketplace')} />
        )}

        {/* AI Studio: Catalog Generator */}
        {currentTab === 'catalog' && (
          <AICatalogGenerator onApplyToProduct={handleApplyAIToProduct} />
        )}

        {/* AI Studio: Image Enhancer */}
        {currentTab === 'enhancer' && (
          <ImageEnhancer onApplyToProduct={handleApplyAIToProduct} />
        )}

        {/* AI Studio: Price Suggestion */}
        {currentTab === 'pricing' && (
          <PriceSuggestion onApplyToProduct={handleApplyAIToProduct} />
        )}

        {/* Auth: Login */}
        {currentTab === 'login' && (
          <Login
            onNavigateToRegister={() => setCurrentTab('register')}
            onLoginSuccess={(loggedInUser) => {
              if (loggedInUser?.role === 'buyer') {
                setCurrentTab('marketplace');
              } else {
                setCurrentTab('dashboard');
              }
            }}
          />
        )}

        {/* Auth: Register */}
        {currentTab === 'register' && (
          <Register
            onNavigateToLogin={() => setCurrentTab('login')}
            onRegisterSuccess={(newUser) => {
              if (newUser?.role === 'buyer') {
                setCurrentTab('marketplace');
              } else {
                setCurrentTab('dashboard');
              }
            }}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Mobile Bottom Sticky Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-terracotta-100 py-2 px-3 z-40 shadow-xl flex items-center justify-around">
        
        {/* Marketplace Tab */}
        <button
          onClick={() => {
            setCurrentTab('marketplace');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold transition ${
            currentTab === 'marketplace' ? 'text-terracotta-600' : 'text-gray-500'
          }`}
        >
          <Store className="w-5 h-5" />
          <span>{lang === 'hi' ? 'हाट बाजार' : 'Marketplace'}</span>
        </button>

        {/* Artisan Tools or Wishlist based on role */}
        {isArtisan ? (
          <>
            <button
              onClick={() => {
                setCurrentTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold transition ${
                currentTab === 'dashboard' ? 'text-terracotta-600' : 'text-gray-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>{t('dashboard')}</span>
            </button>

            <button
              onClick={() => {
                setProductToEdit(null);
                setPendingDraft(null);
                setCapturedImage(null);
                setCurrentTab('add-product');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold transition ${
                currentTab === 'add-product' ? 'text-terracotta-600' : 'text-gray-500'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>{t('addProduct')}</span>
            </button>

            <button
              onClick={() => {
                setCurrentTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold transition ${
                currentTab === 'catalog' ? 'text-terracotta-600' : 'text-gray-500'
              }`}
            >
              <Wand2 className="w-5 h-5 text-sandalwood-500" />
              <span>{lang === 'hi' ? 'एआई कैटलॉग' : 'AI Studio'}</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setCurrentTab('favourites');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold transition relative ${
                currentTab === 'favourites' ? 'text-terracotta-600' : 'text-gray-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${favCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              <span>{lang === 'hi' ? 'पसंदीदा' : 'Wishlist'}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold text-gray-500 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 right-2 bg-emerald-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span>{t('cart')}</span>
            </button>
          </>
        )}

        {/* Orders Tab */}
        <button
          onClick={() => {
            setCurrentTab('orders');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl text-[10px] font-bold transition ${
            currentTab === 'orders' ? 'text-terracotta-600' : 'text-gray-500'
          }`}
        >
          <PackageCheck className="w-5 h-5" />
          <span>{t('orders')}</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <FavouriteProvider>
              <MainApp />
            </FavouriteProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
